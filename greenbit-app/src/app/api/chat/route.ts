// src/app/api/chat/route.ts
// Kullanıcının verisiyle ilgili doğal dilde soru-cevap

import { callLLM } from '../../lib/llm';

export async function POST(request: Request) {
  const origin = request.headers.get("origin") || "";
  const host = request.headers.get("host") || "";

  if (origin && !origin.includes(host)) {
    return Response.json({ error: "Yetkisiz istek." }, { status: 403 });
  }
    try {
      const body = await request.json();
      const { message, dataSummary, history } = body as {
        message: string;
        dataSummary: {
          totalTokens: string;
          totalEnergy: string;
          totalCO2: string;
          modelDistribution: { name: string; value: number }[];
        };
        history?: { role: string; text: string }[];
      };
      
      const historyText = (history || [])
        .map((h) => `${h.role === "user" ? "Kullanıcı" : "Asistan"}: ${h.text}`)
        .join("\n");
  
      const modelInfo = dataSummary.modelDistribution
        .map((m) => `${m.name}: ${m.value} mesaj`)
        .join(", ");
  
      const systemInstruction = `Sen GreenBit adlı bir karbon ayak izi platformunun yapay zeka asistanısın. Kullanıcının verileri şöyle:
  - Toplam token: ${dataSummary.totalTokens}
  - Toplam enerji: ${dataSummary.totalEnergy} kWh
  - Toplam CO2: ${dataSummary.totalCO2} g
  - Model kullanımı: ${modelInfo}
  
  Kullanıcının sorusunu, YUKARIDAKİ VERİLERE dayanarak, kısa ve net şekilde cevapla. Veride olmayan bir şey sorulursa, "Bu bilgi elimde yok" de. Önceki konuşmayı da dikkate al. Türkçe cevap ver.

Önceki konuşma:
${historyText}

Kullanıcının yeni sorusu: ${message}`;
  
const answer = await callLLM(systemInstruction);
return Response.json({ answer });
  
    } catch (error) {
      return Response.json(
        { error: "Sohbet şu anda kullanılamıyor. Ollama çalışıyor mu?" },
        { status: 500 }
      );
    }
  }