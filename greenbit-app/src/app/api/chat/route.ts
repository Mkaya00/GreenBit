// src/app/api/chat/route.ts
// Kullanıcının verisiyle ilgili doğal dilde soru-cevap

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { message, dataSummary } = body as {
        message: string;
        dataSummary: {
          totalTokens: string;
          totalEnergy: string;
          totalCO2: string;
          modelDistribution: { name: string; value: number }[];
        };
      };
  
      const modelInfo = dataSummary.modelDistribution
        .map((m) => `${m.name}: ${m.value} mesaj`)
        .join(", ");
  
      const systemInstruction = `Sen GreenBit adlı bir karbon ayak izi platformunun yapay zeka asistanısın. Kullanıcının verileri şöyle:
  - Toplam token: ${dataSummary.totalTokens}
  - Toplam enerji: ${dataSummary.totalEnergy} kWh
  - Toplam CO2: ${dataSummary.totalCO2} g
  - Model kullanımı: ${modelInfo}
  
  Kullanıcının sorusunu, YUKARIDAKİ VERİLERE dayanarak, kısa ve net şekilde cevapla. Veride olmayan bir şey sorulursa, "Bu bilgi elimde yok" de. Türkçe cevap ver.
  
  Kullanıcının sorusu: ${message}`;
  
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "llama3.1", prompt: systemInstruction, stream: false }),
      });
  
      const data = await response.json();
      return Response.json({ answer: data.response });
  
    } catch (error) {
      return Response.json(
        { error: "Sohbet şu anda kullanılamıyor. Ollama çalışıyor mu?" },
        { status: 500 }
      );
    }
  }