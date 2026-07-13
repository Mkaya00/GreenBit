// src/app/api/analyze/route.ts

// Bu fonksiyon, /api/analyze adresine POST isteği geldiğinde çalışır
export async function POST(request: Request) {
    try {
      // 1. Tarayıcıdan gelen veriyi al (kullanıcının prompt'u)
      const body = await request.json();
      const userPrompt = body.prompt;

// Basit token tahmini: ortalama 4 karakter ≈ 1 token
const estimatedTokens = Math.ceil(userPrompt.length / 4);

const systemInstruction = `Sen bir yapay zeka prompt analiz uzmanısın. Görevin, sana verilen prompt'u değerlendirmek.

Bu prompt yaklaşık ${estimatedTokens} token uzunluğunda.

Şunları analiz et:
1. Prompt yeterince açık ve net mi?
2. Gereksiz uzun mu, kısaltılabilir mi? Eğer kısaltılabilirse, kısaltılmış halini yaz ve yaklaşık kaç token'a ineceğini tahmin et.
3. Nasıl daha iyi yazılabilir? Somut bir öneri ver.

Cevabını TÜRKÇE, kısa ve madde madde ver. Analiz edilecek prompt:`;

// Sistem talimatı + kullanıcı promptunu birleştir
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
  
      // 2. Ollama'nın cevabını al
      const data = await ollamaResponse.json();
  
      // 3. Cevabı tarayıcıya geri gönder
      return Response.json({ answer: data.response });
  
    } catch (error) {
      // Bir şeyler ters giderse hata mesajı dön
      return Response.json(
        { error: "Llama'ya bağlanılamadı. Ollama çalışıyor mu?" },
        { status: 500 }
      );
    }
  }