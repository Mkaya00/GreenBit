"use client";

import { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { loadingMessages } from '../lib/loadingMessages';

export default function AnalyzePage() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
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
  }, [loading]);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      setAnswer(data.answer || "Cevap alınamadı.");
    } catch (error) {
      setAnswer("Yapay zeka analizi şu anda kullanılamıyor. Bu özellik lokal bir AI modeli (Ollama) gerektirir. Diğer özellikler (dosya yükleme, grafikler) normal çalışmaya devam eder.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-medium text-[#1B4332] mb-2 flex items-center gap-2">
          <Bot className="w-7 h-7" strokeWidth={1.5} />
          AI prompt test
        </h1>
        <p className="text-gray-500 mb-8">
          Bir prompt yaz, yapay zeka verimliliğini analiz etsin.
          Yüklediğin dosyanın otomatik analizi için Dashboard'u kullan.
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Buraya bir prompt yaz..."
          className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B4332] resize-none text-gray-900 bg-white"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 bg-[#1B4332] hover:bg-[#14332A] text-white font-medium py-3 px-8 rounded-full transition disabled:opacity-50"
        >
          {loading ? "Analiz ediliyor..." : "Analiz et"}
        </button>

        {loading && (
          <div className="mt-4 flex items-center gap-3 text-gray-600 bg-white p-4 rounded-lg border border-gray-100">
            <div className="w-5 h-5 border-2 border-[#1B4332] border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            <span className="text-sm">{loadingMessages[loadingMessageIndex]}</span>
          </div>
        )}

        {answer && (
          <div className="mt-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Yapay zeka cevabı</h3>
            <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
          </div>
        )}

      </div>
    </main>
  );
}