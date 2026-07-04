"use client";

// LineChart ve ilgili bileşenleri de ekledik
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

// ==========================================
// 1. HESAPLAMA MOTORU
// ==========================================
const MODEL_ENERGY_RATES: Record<string, number> = {
  "gpt-4": 30,
  "gpt-4o": 15,
  "gpt-4o-mini": 3,
  "gpt-3.5-turbo": 5,
  "claude-3-opus": 25,
  "claude-3-sonnet": 10,
  "default": 15
};

function calculateMetricsForModel(messageCount: number, modelSlug: string) {
  const tokens = messageCount * 200;
  const energyRate = MODEL_ENERGY_RATES[modelSlug] || MODEL_ENERGY_RATES["default"];
  const energyWh = (tokens / 1000) * energyRate;
  const co2 = energyWh * 0.4;
  return { tokens, energyWh, co2 };
}

// ==========================================
// 2. PARSER MOTORU (Tarih Hesaplaması Eklendi)
// ==========================================
const COLORS = ['#16a34a', '#4ade80', '#86efac', '#22c55e', '#15803d'];

function parseChatGPTExport(conversations: any[]) {
  const modelCounts: Record<string, number> = {};
  const timeSeriesData: Record<string, number> = {}; // Gün bazlı CO2 tutmak için
  let totalMessages = 0;

  conversations.forEach((conv) => {
    if (!conv.mapping) return;
    
    // Tarihi çevirme (Unix Timestamp -> Gün/Ay)
    let dateStr = "Bilinmiyor";
    if (conv.create_time) {
      const dateObj = new Date(conv.create_time * 1000);
      dateStr = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`; // Örn: "1/6"
    }

    let convCO2 = 0;

    Object.values(conv.mapping).forEach((node: any) => {
      if (node.message && node.message.metadata && node.message.metadata.model_slug) {
        const modelSlug = node.message.metadata.model_slug;
        modelCounts[modelSlug] = (modelCounts[modelSlug] || 0) + 1;
        totalMessages += 1;
        
        // Sadece bu mesajın CO2'sini hesapla ve sohbete ekle
        const msgMetrics = calculateMetricsForModel(1, modelSlug);
        convCO2 += msgMetrics.co2;
      }
    });

    // Bu sohbetin toplam CO2'sini o güne yaz
    if (convCO2 > 0) {
      timeSeriesData[dateStr] = (timeSeriesData[dateStr] || 0) + convCO2;
    }
  });

  // Toplam metrikler ve Pasta Grafik datası
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
    },
    modelDistribution,
    timelineData // Yeni eklenen veri
  };
}

// ==========================================
// 3. ÖRNEK VERİ SETİ (Orijinal create_time eklendi)
// ==========================================
const rawConversations = [
  {
    "title": "Python liste sorusu",
    "create_time": 1717200000,
    "mapping": {
      "msg-1": { "author": { "role": "user" }, "content": "Python...", "message": { "metadata": { "model_slug": "gpt-4" } } },
      "msg-2": { "author": { "role": "assistant" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4" } } }
    }
  },
  {
    "title": "React bileşen sorusu",
    "create_time": 1717800000,
    "mapping": {
      "msg-1": { "author": { "role": "user" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4o-mini" } } },
      "msg-2": { "author": { "role": "assistant" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4o-mini" } } },
      "msg-3": { "author": { "role": "user" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4o-mini" } } },
      "msg-4": { "author": { "role": "assistant" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4o-mini" } } }
    }
  },
  {
    "title": "TypeScript type sorusu",
    "create_time": 1718400000,
    "mapping": {
      "msg-1": { "author": { "role": "user" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4" } } },
      "msg-2": { "author": { "role": "assistant" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4" } } },
      "msg-3": { "author": { "role": "user" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4" } } },
      "msg-4": { "author": { "role": "assistant" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4" } } }
    }
  },
  {
    "title": "Next.js App Router",
    "create_time": 1719000000,
    "mapping": {
      "msg-1": { "author": { "role": "user" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4o" } } },
      "msg-2": { "author": { "role": "assistant" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4o" } } }
    }
  },
  {
    "title": "Tailwind ile stil verme",
    "create_time": 1719600000,
    "mapping": {
      "msg-1": { "author": { "role": "user" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4o-mini" } } },
      "msg-2": { "author": { "role": "assistant" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4o-mini" } } },
      "msg-3": { "author": { "role": "user" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4o-mini" } } },
      "msg-4": { "author": { "role": "assistant" }, "content": "...", "message": { "metadata": { "model_slug": "gpt-4o-mini" } } }
    }
  }
];

// ==========================================
// 4. ARAYÜZ (MAIN COMPONENT)
// ==========================================
export default function Dashboard() {
  const { summaryData, modelDistribution, timelineData } = parseChatGPTExport(rawConversations);

  return (
    <main className="p-8 min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold text-green-700">GreenBit Dashboard</h1>
          <p className="text-gray-500 mt-1">Yapay zeka kullanımının çevresel etkisi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Toplam İşlenen Token</h3>
            <p className="text-4xl font-bold text-gray-800">{summaryData.totalTokens}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Harcanan Enerji (kWh)</h3>
            <p className="text-4xl font-bold text-yellow-500">{summaryData.totalEnergy}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Karbon Ayak İzi (g CO2)</h3>
            <p className="text-4xl font-bold text-green-600">{summaryData.totalCO2}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">Model Kullanım Dağılımı (Mesaj Sayısı)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modelDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {modelDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* YENİ EKLENEN: Zaman Serisi Grafiği */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-full min-h-[300px]">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">Zaman İçinde Karbon Salınımı (g CO2)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="co2" 
                    stroke="#16a34a" 
                    strokeWidth={3} 
                    dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}