// src/app/api/analyze/route.ts
import { promptRules, PromptRule } from '../../lib/promptRules';

// RAG: Basit "getirme" (retrieval) mantığı — prompt'a göre ilgili kuralları seç
function getRelevantRules(prompt: string): PromptRule[] {
  const lowerPrompt = prompt.toLowerCase();
  const selected: PromptRule[] = [];

  // Uzunluk kuralı her zaman eklenir (token verimliliği hep ilgili)
  selected.push(promptRules.find(r => r.kategori === "uzunluk")!);

  // Model ile ilgili kelimeler geçiyorsa model seçimi kuralını ekle
  if (lowerPrompt.includes("model") || lowerPrompt.includes("gpt") || lowerPrompt.includes("claude")) {
    selected.push(promptRules.find(r => r.kategori === "modelSecimi")!);
  }

  // Kısa prompt ise (6 kelimeden az) muhtemelen belirsizdir, netlik kuralını ekle
  if (prompt.trim().split(/\s+/).length < 6) {
    selected.push(promptRules.find(r => r.kategori === "netlik")!);
  }

  // Rol/bağlam kuralı her zaman faydalıdır
  selected.push(promptRules.find(r => r.kategori === "rolVeBaglam")!);

  // Tek odak kuralı her zaman faydalıdır
  selected.push(promptRules.find(r => r.kategori === "tekOdak")!);

  return selected;
}

// Seçilen kuralları okunabilir bir metne (context) dönüştür
function formatRulesAsContext(rules: PromptRule[]): string {
  return rules.map(rule => `
Kural Adı: ${rule.kuralAdi}
Açıklama: ${rule.aciklama}
İyi Örnek: ${rule.iyiOrnek}
Kötü Örnek: ${rule.kotuOrnek}
`).join("\n---\n");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userPrompt = body.prompt;

    // Basit token tahmini: ortalama 4 karakter ≈ 1 token
    const estimatedTokens = Math.ceil(userPrompt.length / 4);

    // RAG: İlgili kuralları getir (retrieval)
    const relevantRules = getRelevantRules(userPrompt);
    const context = formatRulesAsContext(relevantRules);

    // Sistem promptu: RAG mantığıyla, SADECE verilen bağlama dayanarak analiz et
    const systemInstruction = `Sen bir yapay zeka prompt analiz uzmanısın. Görevin, sana verilen prompt'u, AŞAĞIDA SAĞLANAN KURALLARA dayanarak değerlendirmektir.

BAĞLAM (Prompt Yazma Kuralları):
${context}

UYACAĞIN KESİN KURALLAR:
1. Değerlendirmeni SADECE yukarıdaki bağlamda verilen kurallara dayandır. Bağlam dışında kendi bilgini uydurma.
2. Analiz ederken ilgili kuralın "İyi Örnek" ve "Kötü Örnek" kısımlarına atıfta bulunarak farkı göster.
3. Bu prompt yaklaşık ${estimatedTokens} token uzunluğunda. Kısaltılabilirse kısaltılmış halini yaz ve yaklaşık token sayısını tahmin et.
4. Cevabını TÜRKÇE, kısa ve madde madde ver.

Analiz edilecek prompt:`;

    const fullPrompt = `${systemInstruction}\n\n"${userPrompt}"`;

    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1",
        prompt: fullPrompt,
        stream: false,
      }),
    });

    const data = await ollamaResponse.json();
    return Response.json({ answer: data.response });

  } catch (error) {
    return Response.json(
      { error: "Llama'ya bağlanılamadı. Ollama çalışıyor mu?" },
      { status: 500 }
    );
  }
}