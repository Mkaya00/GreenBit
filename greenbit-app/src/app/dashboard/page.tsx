"use client";

// LineChart ve ilgili bileşenleri de ekledik
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import  { useState, useEffect } from "react";
import { parseChatGPTExport } from '../lib/parsers/chatgpt';

// ==========================================
// 1. ARAYÜZ (MAIN COMPONENT)
// ==========================================

  export default function Dashboard() {
    // State: analiz sonuçlarını tutacak
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const savedData = localStorage.getItem("greenbit_conversations");
      
      if (savedData) {
        const conversations = JSON.parse(savedData);
        const result = parseChatGPTExport(conversations);
        setData(result);
      }
      
      setLoading(false);
    }, []);
  
    // Yükleniyor durumu
    if (loading) {
      return (
        <main className="p-8 min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Yükleniyor...</p>
        </main>
      );
    }
  
    // Veri yoksa uyarı göster
    if (!data) {
      return (
        <main className="p-8 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Henüz veri yok</h2>
          <p className="text-gray-500 mb-6">Dashboard'ı görmek için önce bir dosya yüklemelisin.</p>
          <a 
            href="/upload" 
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full transition"
          >
            📤 Dosya Yükle
          </a>
        </main>
      );
    }
    // Veri var: grafikleri göster
    const { summaryData, modelDistribution, timelineData } = data;
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
                    {modelDistribution.map((entry: any, index: number) => (
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