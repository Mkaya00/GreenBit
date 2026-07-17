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
    const systemInstruction = `Sen bir yapay zeka prompt analiz uzmanısın. Görevin, SADECE aşağıdaki BAĞLAM'da verilen kurallara dayanarak, kullanıcının verdiği gerçek prompt'u değerlendirmektir.

    BAĞLAM (Prompt Yazma Kuralları):
    ${context}
    
    Her ilgili kural için TAM OLARAK şu formatı kullan:
    
    [Kural Adı]
    Uyum: Evet / Kısmen / Hayır
    Açıklama: (1 cümle, neden)
    
    En sonda:
    Öneri: (kullanıcının prompt'unun düzeltilmiş, kısaltılmış hali)
    
    KESİN KURALLAR:
    - Kendi uydurduğun örnek cümleler ÜRETME, sadece kullanıcının gerçek prompt'unu değerlendir.
    - Bu prompt yaklaşık ${estimatedTokens} token uzunluğunda.
    - Cevabını TÜRKÇE ver, gereksiz uzatma, yazım hatası yapma.
    
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
      { error: "Yapay zeka analizi şu anda kullanılamıyor. Bu özellik lokal bir AI modeli (Ollama) gerektirir." },
      { status: 500 }
    );
  }
}