"use client";

import { useState } from "react";
import { useSearchParams } from 'next/navigation';

export default function AnalyzePage() {
  // State'ler
  const [prompt, setPrompt] = useState("");        // kullanıcının yazdığı
  const [answer, setAnswer] = useState("");        // Llama'nın cevabı
  const [loading, setLoading] = useState(false);   // bekleniyor mu?
  const searchParams = useSearchParams();
const auto = searchParams.get("auto");

  // Butona basınca çalışır
  const handleAnalyze = async () => {
    if (!prompt.trim()) return; // boşsa bir şey yapma

    setLoading(true);
    setAnswer("");

    try {
      // API Route'a (telefon hattı) istek gönder
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      setAnswer(data.answer || "Cevap alınamadı.");
    } catch (error) {
      setAnswer("Hata: Llama'ya bağlanılamadı. Ollama çalışıyor mu?");
    }

    setLoading(false);
  };
  // localStorage'daki yüklenen veriden promptları alıp analiz et
  const handleAnalyzeUploaded = async () => {
    const savedData = localStorage.getItem("greenbit_conversations");

    if (!savedData) {
      setAnswer("Önce 'Dosya Yükle' sayfasından bir dosya yüklemelisin.");
      
      return;
    }

    const conversations = JSON.parse(savedData);
    const userPrompts: string[] = [];

    conversations.forEach((conv: any) => {
      if (!conv.mapping) return;
      Object.values(conv.mapping).forEach((node: any) => {
        if (node?.message?.author?.role === "user" && node?.message?.content?.parts) {
          const text = node.message.content.parts.join(" ");
          if (text.trim().length > 0) {
            userPrompts.push(text);
          }
        }
      });
    });

    if (userPrompts.length === 0) {
      setAnswer("Yüklenen dosyada analiz edilecek prompt bulunamadı.");
      return;
    }

    const samplePrompts = userPrompts.slice(0, 3);
    const combinedPrompt = samplePrompts.map((p, i) => `${i + 1}. ${p}`).join("\n");

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: combinedPrompt }),
      });

      const data = await response.json();
      setAnswer(data.answer || "Cevap alınamadı.");
    } catch (error) {
      setAnswer("Hata: Llama'ya bağlanılamadı. Ollama çalışıyor mu?");
    }

    setLoading(false);
  };
    
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-green-700 mb-2">AI Prompt Analizi</h1>
        <p className="text-gray-500 mb-8">Prompt'unu yaz, yapay zeka analiz etsin.</p>

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

        <button
          onClick={handleAnalyzeUploaded}
          disabled={loading}
          className="mt-4 ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition disabled:opacity-50"
        >
          {loading ? "Analiz ediliyor..." : "📂 Yüklediğim Verilerden Analiz Et"}
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
