"use client";

import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useState, useEffect } from "react";
import Link from "next/link";
import { parseChatGPTExport } from '../lib/parsers/chatgpt';
import { loadingMessages } from '../lib/loadingMessages';
import { BarChart3, Bot, Upload, MessageSquare, Cpu, Gauge, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [agentResult, setAgentResult] = useState<any>(null);
  const [isAgentAnalyzing, setIsAgentAnalyzing] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem("greenbit_conversations");

    if (savedData) {
      const conversations = JSON.parse(savedData);
      const result = parseChatGPTExport(conversations);
      setData(result);
    }

    setLoading(false);
  }, []);

   useEffect(() => {
  if (!isAnalyzing && !isAgentAnalyzing) {
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
}, [isAnalyzing, isAgentAnalyzing]);

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

        // Baştan, ortadan ve sondan birer örnek al (daha temsili)
      const samplePrompts = userPrompts.length <= 3
      ? userPrompts
      : [
          userPrompts[0],
          userPrompts[Math.floor(userPrompts.length / 2)],
          userPrompts[userPrompts.length - 1],
      ];
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

  const handleAgentAnalysis = async () => {
    setIsAgentAnalyzing(true);
    setAgentResult(null);
    try {
      const savedData = localStorage.getItem("greenbit_conversations");
      if (!savedData) {
        setIsAgentAnalyzing(false);
        return;
      }
      const conversations = JSON.parse(savedData);
      const userPrompts: string[] = [];
      const modelCounts: Record<string, number> = {};
      conversations.forEach((conv: any) => {
        if (!conv.mapping) return;
        Object.values(conv.mapping).forEach((node: any) => {
          if (node?.message?.metadata?.model_slug) {
            const slug = node.message.metadata.model_slug;
            modelCounts[slug] = (modelCounts[slug] || 0) + 1;
          }
          if (node?.message?.author?.role === "user" && node?.message?.content?.parts) {
            const text = node.message.content.parts.join(" ");
            if (text.trim().length > 0) userPrompts.push(text);
          }
        });
      });
      const response = await fetch("/api/agent-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompts, modelCounts }),
      });
      const data = await response.json();
      setAgentResult(data);
    } catch (error) {
      setAgentResult({ error: "Agent analizi başarısız oldu." });
    }
    setIsAgentAnalyzing(false);
  };

  if (loading) {
    return (
      <main className="p-8 min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Yükleniyor...</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="p-8 min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#1B4332]/10 flex items-center justify-center mb-4">
          <BarChart3 className="w-8 h-8 text-[#1B4332]" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-medium text-gray-800 mb-2">Henüz veri yok</h2>
        <p className="text-gray-500 mb-6">Dashboard'ı görmek için önce bir dosya yüklemelisin.</p>
        <Link
          href="/upload"
          className="inline-flex items-center gap-2 bg-[#1B4332] hover:bg-[#14332A] text-white font-medium py-3 px-8 rounded-full transition"
        >
          <Upload className="w-4 h-4" strokeWidth={2} />
          Dosya yükle
        </Link>
      </main>
    );
  }

  const { summaryData, modelDistribution, timelineData } = data;

  const mostUsedModel = modelDistribution.reduce((max: any, model: any) =>
    model.value > (max?.value || 0) ? model : max
  , null);

  const suggestionMatches = aiAnalysis.match(/Öneri:\s*([^\n*]*)/g);
  const lastSuggestion = suggestionMatches ? suggestionMatches[suggestionMatches.length - 1].replace(/^Öneri:\s*/, "").trim() : "";

  return (
    <main className="p-8 min-h-screen bg-[#FAFAF8] text-gray-800">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-medium text-[#1B4332]">GreenBit Dashboard</h1>
            <p className="text-gray-500 mt-1">Yapay zeka kullanımının çevresel etkisi</p>
          </div>
          <button
            onClick={() => window.print()}
            className="text-sm text-[#1B4332] border border-[#1B4332] hover:bg-[#1B4332]/5 px-4 py-2 rounded-full transition whitespace-nowrap"
          >
            Raporu yazdır
          </button>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
    <h3 className="text-gray-500 text-sm font-medium mb-2">Toplam işlenen token</h3>
    <p className="text-4xl font-medium text-gray-800">{summaryData.totalTokens}</p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
    <h3 className="text-gray-500 text-sm font-medium mb-2">Harcanan enerji (kWh)</h3>
    <p className="text-4xl font-medium text-[#1B4332]">{summaryData.totalEnergy}</p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
    <h3 className="text-gray-500 text-sm font-medium mb-2">Karbon ayak izi (g CO2)</h3>
    <p className="text-4xl font-medium text-[#1B4332]">{summaryData.totalCO2}</p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
    <h3 className="text-gray-500 text-sm font-medium mb-2">Su tüketimi (litre)</h3>
    <p className="text-4xl font-medium text-[#1B4332]">{summaryData.totalWater}</p>
  </div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-700 mb-6 text-center">Model kullanım dağılımı (mesaj sayısı)</h3>
            {mostUsedModel && (
              <p className="text-center text-sm text-[#1B4332] mb-4">
                En çok kullanılan: <span className="font-medium">{mostUsedModel.name}</span>
              </p>
            )}
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
            <h3 className="text-lg font-medium text-gray-700 mb-6">Zaman içinde karbon salınımı (g CO2)</h3>
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
                    stroke="#1B4332"
                    strokeWidth={3}
                    dot={{ fill: '#1B4332', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Analiz Bölümü */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="text-2xl font-medium text-[#1B4332] flex items-center gap-2">
                <Bot className="w-6 h-6" strokeWidth={1.5} />
                AI prompt analizi
              </h3>
              <p className="text-gray-500 text-sm mt-1">Sayısal metrikler (token, CO2, enerji) tüm verinizi kapsar. Performans nedeniyle, promptlarınızdan temsili bir örnek (baş, orta, son) derinlemesine analiz edilmektedir.</p>
            </div>
            <button
              onClick={handleAiAnalysis}
              disabled={isAnalyzing}
              className="bg-[#1B4332] hover:bg-[#14332A] text-white font-medium py-3 px-8 rounded-full transition disabled:opacity-50 whitespace-nowrap"
            >
              {isAnalyzing ? "Analiz ediliyor..." : "Verilerimi analiz et"}
            </button>
          </div>

          {isAnalyzing && (
            <div className="mt-4 flex items-center gap-3 text-gray-600 bg-[#FAFAF8] p-4 rounded-lg border border-gray-100">
              <div className="w-5 h-5 border-2 border-[#1B4332] border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
              <span className="text-sm">{loadingMessages[loadingMessageIndex]}</span>
            </div>
          )}

          {aiAnalysis && (
            <div className="mt-4 space-y-4">
              <div className="bg-[#FAFAF8] p-6 rounded-lg border border-gray-100">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{aiAnalysis.replace(/\*\*/g, "")}</p>
              </div>

              {lastSuggestion.length > 0 && (
                <div className="bg-[#1B4332]/5 border border-[#1B4332]/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-[#1B4332]">Önerilen prompt</h4>
                    <button
                      onClick={() => navigator.clipboard.writeText(lastSuggestion)}
                      className="text-xs text-[#1B4332] hover:text-[#14332A] font-medium underline"
                    >
                      Kopyala
                    </button>
                  </div>
                  <p className="text-gray-800 text-sm whitespace-pre-wrap">{lastSuggestion}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Agent Orkestrasyonu Bölümü */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="text-2xl font-medium text-[#1B4332]">
                Agent Orkestrasyonu
              </h3>
              <p className="text-gray-500 text-sm mt-1">Birden fazla uzman agent koordine edilerek kapsamlı bir rapor oluşturulur.</p>
            </div>
            <button
              onClick={handleAgentAnalysis}
              disabled={isAgentAnalyzing}
              className="bg-[#1B4332] hover:bg-[#14332A] text-white font-medium py-3 px-8 rounded-full transition disabled:opacity-50 whitespace-nowrap"
            >
              {isAgentAnalyzing ? "Analiz ediliyor..." : "Kapsamlı Analiz Yap"}
            </button>
          </div>

          {(isAgentAnalyzing || agentResult) && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Agent 1: Prompt Analiz */}
          <div className="bg-[#FAFAF8] p-4 rounded-lg border border-gray-100 flex items-center gap-2">
            {isAgentAnalyzing ? (
              <div className="w-4 h-4 border-2 border-[#1B4332] border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#1B4332] flex-shrink-0" strokeWidth={2} />
            )}
            <MessageSquare className="w-4 h-4 text-[#1B4332] flex-shrink-0" strokeWidth={2} />
            <span className="text-xs font-medium text-gray-700">Prompt Analiz Uzmanı</span>
          </div>

          {/* Agent 2: Model Önerisi */}
          <div className="bg-[#FAFAF8] p-4 rounded-lg border border-gray-100 flex items-center gap-2">
            {isAgentAnalyzing ? (
              <div className="w-4 h-4 border-2 border-[#1B4332] border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#1B4332] flex-shrink-0" strokeWidth={2} />
            )}
            <Cpu className="w-4 h-4 text-[#1B4332] flex-shrink-0" strokeWidth={2} />
            <span className="text-xs font-medium text-gray-700">Model Öneri Uzmanı</span>
          </div>

          {/* Agent 3: Verimlilik Skoru */}
          <div className="bg-[#FAFAF8] p-4 rounded-lg border border-gray-100 flex items-center gap-2">
            {isAgentAnalyzing ? (
              <div className="w-4 h-4 border-2 border-[#1B4332] border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#1B4332] flex-shrink-0" strokeWidth={2} />
            )}
            <Gauge className="w-4 h-4 text-[#1B4332] flex-shrink-0" strokeWidth={2} />
            <span className="text-xs font-medium text-gray-700">Verimlilik Hesaplayıcı</span>
          </div>
        </div>
      )}

      {agentResult && !agentResult.error && (
        <div className="mt-4 space-y-4">
          <div className="bg-[#FAFAF8] p-6 rounded-lg border border-gray-100">
            <h4 className="text-sm font-medium text-[#1B4332] mb-2">Verimlilik Skoru</h4>
            <p className="text-3xl font-medium text-[#1B4332]">{agentResult.efficiencyScore}/100</p>
          </div>
          <div className="bg-[#FAFAF8] p-6 rounded-lg border border-gray-100">
            <h4 className="text-sm font-medium text-[#1B4332] mb-2">Prompt Analizi</h4>
            <p className="text-gray-800 text-sm whitespace-pre-wrap">{agentResult.promptAnalysis}</p>
          </div>
          <div className="bg-[#FAFAF8] p-6 rounded-lg border border-gray-100">
            <h4 className="text-sm font-medium text-[#1B4332] mb-2">Model Önerisi</h4>
            <p className="text-gray-800 text-sm whitespace-pre-wrap">{agentResult.modelAdvice}</p>
          </div>
        </div>
      )}


          {agentResult?.error && (
            <p className="mt-4 text-red-600 text-sm">{agentResult.error}</p>
          )}
        </div>

      </div>
    </main>
  );
}