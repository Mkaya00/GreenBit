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
  
  export function calculateMetricsForModel(messageCount: number, modelSlug: string) {
    // Adım 1: Token Tahmini (Ortalama 200 token/mesaj)
    const tokens = messageCount * 200;
  
    // Adım 2: Enerji Hesabı
    const energyRate = MODEL_ENERGY_RATES[modelSlug] || MODEL_ENERGY_RATES["default"];
    const energyWh = (tokens / 1000) * energyRate;
  
    // Adım 3: CO2 Hesabı (0.4 çarpanı)
    const co2 = energyWh * 0.4;
  
    return {
      tokens,
      energyWh,
      energyKWh: energyWh / 1000,
      co2
    };
  }