// src/lib/parsers/chatgpt.ts
import { calculateMetricsForModel } from '../carbon';

// Farklı renk kodları oluşturmak için yardımcı bir fonksiyon
const COLORS = ['#16a34a', '#4ade80', '#86efac', '#22c55e', '#15803d'];

export function parseChatGPTExport(conversations: any[]) {
  const modelCounts: Record<string, number> = {};
  let totalMessages = 0;

  // Tüm sohbetleri ve mesajları geziyoruz
  conversations.forEach((conv) => {
    if (!conv.mapping) return;

    Object.values(conv.mapping).forEach((node: any) => {
      // Sadece model bilgisi olan mesajları ayıkla
      if (node.message && node.message.metadata && node.message.metadata.model_slug) {
        const modelSlug = node.message.metadata.model_slug;
        
        if (!modelCounts[modelSlug]) {
          modelCounts[modelSlug] = 0;
        }
        modelCounts[modelSlug] += 1;
        totalMessages += 1;
      }
    });
  });

  // Toplam metrikleri toplayalım
  let totalTokens = 0;
  let totalEnergyWh = 0;
  let totalCO2 = 0;

  let colorIndex = 0;
  const modelDistribution = Object.keys(modelCounts).map((model) => {
    const count = modelCounts[model];
    const metrics = calculateMetricsForModel(count, model);
    
    totalTokens += metrics.tokens;
    totalEnergyWh += metrics.energyWh;
    totalCO2 += metrics.co2;

    const result = {
      name: model,
      value: count, 
      color: COLORS[colorIndex % COLORS.length] // Grafikte her modele farklı yeşil tonu verelim
    };
    colorIndex++;
    
    return result;
  });

  return {
    summaryData: {
      totalTokens: totalTokens.toLocaleString('tr-TR'),
      totalEnergy: (totalEnergyWh / 1000).toFixed(4),
      totalCO2: totalCO2.toFixed(2),
    },
    modelDistribution
  };
}