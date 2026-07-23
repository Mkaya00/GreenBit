// src/app/lib/parsers/chatgpt.ts
import { calculateMetricsForModel } from '../carbon';

// Grafikte her modele farklı yeşil tonu vermek için renk paleti
const COLORS = ['#16a34a', '#4ade80', '#86efac', '#22c55e', '#15803d'];

export function parseChatGPTExport(conversations: any[]) {
  const modelCounts: Record<string, number> = {};
  const timeSeriesData: Record<string, number> = {}; // Gün bazlı CO2

  conversations.forEach((conv) => {
    if (!conv.mapping) return;

    // Tarihi çevirme (Unix Timestamp -> Gün/Ay)
    let dateStr = "Bilinmiyor";
    if (conv.create_time) {
      const dateObj = new Date(conv.create_time * 1000);
      dateStr = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
    }

    let convCO2 = 0;

    Object.values(conv.mapping).forEach((node: any) => {
      if (node.message && node.message.metadata && node.message.metadata.model_slug) {
        const modelSlug = node.message.metadata.model_slug;
        modelCounts[modelSlug] = (modelCounts[modelSlug] || 0) + 1;

        const msgMetrics = calculateMetricsForModel(1, modelSlug);
        convCO2 += msgMetrics.co2;
      }
    });

    if (convCO2 > 0) {
      timeSeriesData[dateStr] = (timeSeriesData[dateStr] || 0) + convCO2;
    }
  });

  // Toplam metrikler ve pasta grafik datası
  let totalTokens = 0;
  let totalEnergyWh = 0;
  let totalCO2 = 0;
  let totalWaterLiters = 0;
  let colorIndex = 0;

  const modelDistribution = Object.keys(modelCounts).map((model) => {
    const count = modelCounts[model];
    const metrics = calculateMetricsForModel(count, model);

    totalTokens += metrics.tokens;
    totalEnergyWh += metrics.energyWh;
    totalCO2 += metrics.co2;
    totalWaterLiters += metrics.waterLiters;

    const result = {
      name: model,
      value: count,
      color: COLORS[colorIndex % COLORS.length]
    };
    colorIndex++;
    return result;
  });

  // Çizgi grafik için datayı formatla
  const timelineData = Object.keys(timeSeriesData).map(date => ({
    date,
    co2: Number(timeSeriesData[date].toFixed(2))
  }));

  return {
    summaryData: {
      totalTokens: totalTokens.toLocaleString('tr-TR'),
      totalEnergy: (totalEnergyWh / 1000).toFixed(4),
      totalCO2: totalCO2.toFixed(2),
      totalWater: totalWaterLiters.toFixed(2),
    },
    modelDistribution,
    timelineData
  };
}