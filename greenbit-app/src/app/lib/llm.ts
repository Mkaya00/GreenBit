// src/app/lib/llm.ts
// Ortak LLM çağrı fonksiyonu: canlıda Groq, lokalde Ollama kullanır

export async function callLLM(prompt: string): Promise<string> {
    const groqKey = process.env.GROQ_API_KEY;
  
    if (groqKey) {
      // CANLI ORTAM: Groq kullan
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b",
          messages: [{ role: "user", content: prompt }],
          stream: false,
        }),
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "";
    } else {
      // LOKAL ORTAM: Ollama kullan
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "llama3.1", prompt, stream: false }),
      });
      const data = await response.json();
      return data.response || "";
    }
  }