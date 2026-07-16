"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [prompt, setPrompt] = useState("");        // kullanıcının yazdığı
  const [answer, setAnswer] = useState("");        // Llama'nın cevabı
  const [loading, setLoading] = useState(false);   // bekleniyor mu?

  // Butona basınca çalışır
  const handleAnalyze = async () => {
    if (!prompt.trim()) return; // boşsa bir şey yapma

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
      setAnswer("Yapay zeka analizi şu anda kullanılamıyor. Bu özellik lokal bir AI modeli (Ollama) gerektirir.Diğer özellikler (dosya yükleme, grafikler) normal çalışmaya devam eder.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-green-700 mb-2">AI Prompt Test</h1>
        <p className="text-gray-500 mb-8">
          Bir prompt yaz, yapay zeka verimliliğini analiz etsin.
          Yüklediğin dosyanın otomatik analizi için Dashboard'u kullan.
        </p>

        {/* Giriş kutusu */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Buraya bir prompt yaz..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 resize-none text-gray-900 bg-white"
        />

        {/* Buton */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full transition disabled:opacity-50"
        >
          {loading ? "Analiz ediliyor..." : "🤖 Analiz Et"}
        </button>

        {/* Cevap */}
        {answer && (
          <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Yapay Zeka Cevabı:</h3>
            <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
          </div>
        )}

      </div>
    </main>
  );
}