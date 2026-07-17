"use client";

import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useState, useEffect } from "react";
import { parseChatGPTExport } from '../lib/parsers/chatgpt';
import { loadingMessages } from '../lib/loadingMessages';

export default function Dashboard() {
  // State: analiz sonuçlarını tutacak
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // AI Analiz State'leri
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Veri yükleme (localStorage'dan)
  useEffect(() => {
    const savedData = localStorage.getItem("greenbit_conversations");

    if (savedData) {
      const conversations = JSON.parse(savedData);
      const result = parseChatGPTExport(conversations);
      setData(result);
    }

    setLoading(false);
  }, []);

  // Loading mesajlarını döndürür (AI analiz sırasında)
  useEffect(() => {
    if (!isAnalyzing) {
      setLoadingMessageIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => {
        let next = Math.floor(Math.random() * loadingMessages.length);
        while (next === prev) {
          next = Math.floor(Math.random() * loadingMessages.length);
        }
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleAiAnalysis = async () => {
    setIsAnalyzing(true);
    setAiAnalysis("");

    try {
      const savedData = localStorage.getItem("greenbit_conversations");
      if (!savedData) {
        setAiAnalysis("Analiz edilecek veri bulunamadı. Lütfen önce bir dosya yükleyin.");
        setIsAnalyzing(false);
        return;
      }

      const conversations = JSON.parse(savedData);
      const userPrompts: string[] = [];

      conversations.forEach((conv: any) => {
        if (!conv.mapping) return;
        Object.values(conv.mapping).forEach((node: any) => {
          if (node?.message?.author?.role === "user" && node?.message?.content?.parts) {
            const text = node.message.content.parts.join(" ");
            if (text.trim().length > 0) userPrompts.push(text);
          }
        });
      });

      if (userPrompts.length === 0) {
        setAiAnalysis("Yüklenen dosyada analiz edilecek bir kullanıcı mesajı bulunamadı.");
        setIsAnalyzing(false);
        return;
      }

      const samplePrompts = userPrompts.slice(0, 3);
      const combinedPrompt = samplePrompts.map((p, i) => `${i + 1}. ${p}`).join("\n");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: combinedPrompt }),
      });

      const resData = await response.json();
      setAiAnalysis(resData.answer || "Cevap alınamadı.");
      setIsAnalyzing(false);
    } catch (error) {
      setAiAnalysis("Yapay zeka analizi şu anda kullanılamıyor. Bu özellik lokal bir AI modeli (Ollama) gerektirir. Diğer özellikler (grafikler, hesaplamalar) normal çalışmaya devam eder.");
      setIsAnalyzing(false);
    }
  };

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
        <a href="/upload" className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full transition"></a>
        📤 Dosya Yükle
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
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

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

        {/* AI Analiz Bölümü */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-green-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                🤖 AI Prompt Analizi
              </h3>
              <p className="text-gray-500 text-sm mt-1">Geçmiş verileriniz taranarak token/enerji israfı analiz edilir. Lokal yapay zeka modeli kullanıldığından analiz birkaç saniye sürebilir.</p>
            </div>
            <button
              onClick={handleAiAnalysis}
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition disabled:opacity-50 whitespace-nowrap shadow-md"
            >
              {isAnalyzing ? "Analiz Ediliyor..." : "Verilerimi Analiz Et"}
            </button>
          </div>

          {isAnalyzing && (
            <div className="mt-4 flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
              <span className="text-sm">{loadingMessages[loadingMessageIndex]}</span>
            </div>
          )}

          {aiAnalysis && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{aiAnalysis}</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}