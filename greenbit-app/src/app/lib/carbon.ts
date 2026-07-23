// src/lib/carbon.ts

// 1000 token başına harcanan enerji (Watt-saat)
const MODEL_ENERGY_RATES: Record<string, number> = {
    "gpt-4": 30,
    "gpt-4o": 15,
    "gpt-4o-mini": 3,
    "gpt-3.5-turbo": 5,
    "claude-3-opus": 25,
    "claude-3-sonnet": 10,
    "default": 15 // Bilinmeyen modeller için
  };
  
  // Bilinmeyen modeller için, isimdeki ipuçlarına göre tahmini oran belirler
function estimateEnergyRate(modelSlug: string): number {
  const slug = modelSlug.toLowerCase();
  if (slug.includes("mini") || slug.includes("nano")) return 4;
  if (slug.includes("opus") || slug.includes("gpt-5") || slug.includes("gpt-4")) return 28;
  if (slug.includes("claude")) return 20;
  return 15; // gerçekten tahmin edilemiyorsa
}

const WATER_LITERS_PER_KWH = 1.8; // Veri merkezi soğutma için ortalama su tüketimi

export function calculateMetricsForModel(messageCount: number, modelSlug: string) {
  const tokens = messageCount * 200;
  const energyRate = MODEL_ENERGY_RATES[modelSlug] || estimateEnergyRate(modelSlug);
  const energyWh = (tokens / 1000) * energyRate;
  const co2 = energyWh * 0.4;
  const energyKWh = energyWh / 1000;
  const waterLiters = energyKWh * WATER_LITERS_PER_KWH;
  return { tokens, energyWh, energyKWh, co2, waterLiters };
}