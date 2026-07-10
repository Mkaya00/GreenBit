// src/app/api/analyze/route.ts

// Bu fonksiyon, /api/analyze adresine POST isteği geldiğinde çalışır
export async function POST(request: Request) {
    try {
      // 1. Tarayıcıdan gelen veriyi al (kullanıcının prompt'u)
      const body = await request.json();
      const userPrompt = body.prompt;
  
      // 2. Ollama'ya (Llama'ya) istek gönder
      const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.2",
          prompt: userPrompt,
          stream: false,
        }),
      });
  
      // 3. Ollama'nın cevabını al
      const data = await ollamaResponse.json();
  
      // 4. Cevabı tarayıcıya geri gönder
      return Response.json({ answer: data.response });
  
    } catch (error) {
      // Bir şeyler ters giderse hata mesajı dön
      return Response.json(
        { error: "Llama'ya bağlanılamadı. Ollama çalışıyor mu?" },
        { status: 500 }
      );
    }
  }