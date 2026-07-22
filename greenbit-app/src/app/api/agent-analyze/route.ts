// src/app/api/agent-analyze/route.ts
// Agent Orkestrasyonu:

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { userPrompts, modelCounts } = body as { userPrompts: string[]; modelCounts: Record<string, number> };
      // ==========================================
      // AGENT 1: Prompt Analiz Uzmanı
      // ==========================================
      const samplePrompts = userPrompts.slice(0, 3);
      const combinedPrompt = samplePrompts.map((p: string, i: number) => `${i + 1}. ${p}`).join("\n");
  
      const promptAnalysisInstruction = `Sen bir prompt analiz uzmanısın. Aşağıdaki promptları kısaca (2-3 madde) değerlendir: açıklık ve token verimliliği açısından. Kısa ve net ol. Türkçe cevap ver.\n\nPromptlar:\n${combinedPrompt}`;
  
      const promptAnalysisResponse = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "llama3.1", prompt: promptAnalysisInstruction, stream: false }),
      });
      const promptAnalysisData = await promptAnalysisResponse.json();
  
      // ==========================================
      // AGENT 2: Model Öneri Uzmanı
      // ==========================================
      const modelList = Object.entries(modelCounts)
        .map(([model, count]) => `${model}: ${count} mesaj`)
        .join(", ");
  
      const modelAdviceInstruction = `Sen bir yapay zeka model seçimi danışmanısın. Kullanıcının kullandığı modeller ve mesaj sayıları: ${modelList}.
  Eğer güçlü/pahalı modeller (gpt-4 gibi) çok kullanılıyorsa, daha ucuz/verimli alternatifler (gpt-4o-mini gibi) öner.
  2-3 cümlede, somut bir tavsiye ver. Türkçe cevap ver.`;
  
      const modelAdviceResponse = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "llama3.1", prompt: modelAdviceInstruction, stream: false }),
      });
      const modelAdviceData = await modelAdviceResponse.json();
  
      // ==========================================
      // AGENT 3: Verimlilik Skoru (Kod ile Hesaplama)
      // ==========================================
      const totalMessages: number = Object.values(modelCounts).reduce((a: any, b: any) => a + b, 0);
      const expensiveModels = ["gpt-4", "claude-3-opus"];
      const expensiveCount: number = Object.entries(modelCounts)
        .filter(([model]) => expensiveModels.includes(model))
        .reduce((sum: number, [, count]) => sum + (count as number), 0);
  
      const expensiveRatio = totalMessages > 0 ? expensiveCount / totalMessages : 0;
      const efficiencyScore = Math.round(100 - expensiveRatio * 60);
  
      // ==========================================
      // SENTEZ: Hepsini Birleştir
      // ==========================================
      return Response.json({
        promptAnalysis: promptAnalysisData.response,
        modelAdvice: modelAdviceData.response,
        efficiencyScore: efficiencyScore,
      });
  
    } catch (error) {
      return Response.json(
        { error: "Agent analizi şu anda kullanılamıyor. Ollama çalışıyor mu?" },
        { status: 500 }
      );
    }
  }