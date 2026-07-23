// src/app/api/agent-analyze/route.ts
// Agent Orkestrasyonu: birden fazla "uzman" agent'ı koordine eder

import { calculateMetricsForModel } from '../../lib/carbon';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userPrompts, modelCounts } = body as { userPrompts: string[]; modelCounts: Record<string, number> };

    // ==========================================
    // Talimatları Hazırla (henüz gönderilmiyor)
    // ==========================================
    const samplePrompts = userPrompts.slice(0, 3);
    const combinedPrompt = samplePrompts.map((p: string, i: number) => `${i + 1}. ${p}`).join("\n");

    const promptAnalysisInstruction = `Sen bir prompt analiz uzmanısın. Aşağıdaki promptları kısaca (2-3 madde) değerlendir: açıklık ve token verimliliği açısından. Kısa ve net ol. Türkçe cevap ver.\n\nPromptlar:\n${combinedPrompt}`;

    const modelList = Object.entries(modelCounts)
      .map(([model, count]) => `${model}: ${count} mesaj`)
      .join(", ");

    const modelAdviceInstruction = `Sen bir yapay zeka model seçimi danışmanısın. Kullanıcının kullandığı modeller ve mesaj sayıları: ${modelList}.
Eğer güçlü/pahalı modeller (gpt-4 gibi) çok kullanılıyorsa, daha ucuz/verimli alternatifler (gpt-4o-mini gibi) öner.
2-3 cümlede, somut bir tavsiye ver. Türkçe cevap ver.`;

    // ==========================================
    // AGENT 1 + AGENT 2: PARALEL Çalıştır (hız için)
    // ==========================================
    const [promptAnalysisResponse, modelAdviceResponse] = await Promise.all([
      fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "llama3.1", prompt: promptAnalysisInstruction, stream: false }),
      }),
      fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "llama3.1", prompt: modelAdviceInstruction, stream: false }),
      }),
    ]);

    const [promptAnalysisData, modelAdviceData] = await Promise.all([
      promptAnalysisResponse.json(),
      modelAdviceResponse.json(),
    ]);

    // ==========================================
    // AGENT 3: Verimlilik Skoru (carbon.ts verisiyle, gerçek enerji hesabı)
    // ==========================================
    let totalEnergyWh = 0;
    let totalMsgsForEnergy = 0;

    Object.entries(modelCounts).forEach(([model, count]) => {
      const metrics = calculateMetricsForModel(count as number, model);
      totalEnergyWh += metrics.energyWh;
      totalMsgsForEnergy += count as number;
    });

    const avgEnergyPerMessage = totalMsgsForEnergy > 0 ? totalEnergyWh / totalMsgsForEnergy : 0;

    const bestPerMessage = 0.6;
    const worstPerMessage = 6;

    let efficiencyScore = Math.round(
      100 - ((avgEnergyPerMessage - bestPerMessage) / (worstPerMessage - bestPerMessage)) * 100
    );
    efficiencyScore = Math.max(0, Math.min(100, efficiencyScore));

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