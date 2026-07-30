"use client";

import { useState, useEffect } from "react";
import { Bot, Send } from "lucide-react";
import { calculateMetricsForModel } from '../lib/carbon';
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  text: string;
};

// Metin içindeki **kalın** kısımları algılayıp HTML'e çeviren fonksiyon
const formatText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const SUGGESTED_QUESTIONS = [
  "En çok hangi model kullanılmış?",
  "Su tüketimim ne kadar?",
  "Nasıl daha verimli olabilirim?",
  "Toplam kaç mesaj gönderdim?",
  "Karbon ayak izim ne kadar?",
  "Verilerim kaç günü kapsıyor?",
  "Yıllık projeksiyonum ne kadar?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataInfo, setDataInfo] = useState<{ conversations: number; messages: number; fileName: string } | null>(null);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [needsData, setNeedsData] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("greenbit_chat_history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("greenbit_chat_history", JSON.stringify(messages));
  }, [messages]);


  useEffect(() => {
    const savedData = localStorage.getItem("greenbit_conversations");
    if (!savedData) {
      setNeedsData(true);
      setMessages((prev) => {
        if (prev.length === 0) {
          return [{ role: "assistant" as const, text: "Henüz bir veri göremiyorum. İşlemlere başlamak için önce bir dosya yüklemelisin." }];
        }
        return prev;
      });
    }
  }, []);



  useEffect(() => {
    const savedData = localStorage.getItem("greenbit_conversations");
    if (savedData) {
      try {
        const conversations = JSON.parse(savedData);
        let totalMessages = 0;
        conversations.forEach((conv: any) => {
          if (!conv.mapping) return;
          Object.values(conv.mapping).forEach((node: any) => {
            if (node?.message?.metadata?.model_slug) totalMessages += 1;
          });
        });
        const fileName = localStorage.getItem("greenbit_filename") || "yüklediğin dosya";
setDataInfo({ conversations: conversations.length, messages: totalMessages, fileName });

      } catch (e) {
        // sessiz geç
      }
    }
  }, []);


  const clearChat = () => {
    setMessages([]);
    setAskedQuestions([]);
    sessionStorage.removeItem("greenbit_chat_history");
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setAskedQuestions((prev) => [...prev, text]);


    const userMessage: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const savedData = localStorage.getItem("greenbit_conversations");
      if (!savedData) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Henüz bir veri göremiyorum, Önce Dosya Yükle sayfasından bir dosya yükler misin? Sonra seninle verilerin hakkında rahatça konuşabiliriz!" },
        ]);
        setLoading(false);
        return;
      }

      const conversations = JSON.parse(savedData);
      const modelCounts: Record<string, number> = {};
      let totalMessages = 0;

      let earliestTime = Infinity;
      let latestTime = 0;

      conversations.forEach((conv: any) => {
        if (!conv.mapping) return;
        Object.values(conv.mapping).forEach((node: any) => {
          if (node?.message?.metadata?.model_slug) {
            const slug = node.message.metadata.model_slug;
            modelCounts[slug] = (modelCounts[slug] || 0) + 1;
            totalMessages += 1;
          }
        });
        if (conv.create_time) {
          earliestTime = Math.min(earliestTime, conv.create_time);
          latestTime = Math.max(latestTime, conv.create_time);
        }
      });

      const daySpan = Math.max(1, Math.ceil((latestTime - earliestTime) / 86400));

      let totalEnergyWh = 0;
      let totalCO2 = 0;
      let totalWaterLiters = 0;

      Object.keys(modelCounts).forEach((model) => {
        const metrics = calculateMetricsForModel(modelCounts[model], model);
        totalEnergyWh += metrics.energyWh;
        totalCO2 += metrics.co2;
        totalWaterLiters += metrics.waterLiters;
      });

      const dataSummary = {
        totalTokens: (totalMessages * 200).toLocaleString("tr-TR"),
        totalEnergy: (totalEnergyWh / 1000).toFixed(3) + " kWh",
        totalCO2: totalCO2.toFixed(2) + " gram",
        totalWater: totalWaterLiters.toFixed(2) + " litre",
        daySpan: daySpan + " gün",
        yearlyProjection: ((totalCO2 / daySpan * 365) / 1000).toFixed(2) + " kg",
        modelDistribution: Object.entries(modelCounts).map(([name, value]) => ({ name, value })),
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, dataSummary, history: messages }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.answer || "Cevap alınamadı." }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sohbet şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin." },
      ]);
    }

    setLoading(false);
  };

  const handleSend = () => sendMessage(input);

  return (
    <main className="min-h-screen bg-[#FAFAF8] p-8">
      <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-2">
      <h1 className="text-3xl font-medium text-[#1B4332] flex items-center gap-2">
        <Bot className="w-7 h-7" strokeWidth={1.5} />
        Sohbet
      </h1>
      {messages.length > 0 && (
        <button
          onClick={clearChat}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Sohbeti Temizle
        </button>
      )}
    </div>
    <p className="text-gray-500 mb-4">Verilerin hakkında doğal dilde soru sor.</p>

        {dataInfo && (
          <div className="mb-4 bg-[#1B4332]/5 border border-[#1B4332]/20 rounded-lg px-4 py-2 text-sm text-[#1B4332]">
              <strong>{dataInfo.fileName}</strong> dosyandaki {dataInfo.conversations} konuşma, {dataInfo.messages} mesaj hakkında soru sorabilirsin
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-4 min-h-[300px] space-y-4">
        {messages.length === 0 && !needsData && (
            <div className="space-y-2">
            <p className="text-gray-400 text-sm">Henüz bir mesaj yok. Bir soru yazarak başla, ya da aşağıdaki örneklerden birine tıkla.</p>
          </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg text-sm text-gray-800 ${
                msg.role === "user" ? "bg-[#1B4332]/5 ml-auto max-w-[80%]" : "bg-[#FAFAF8] max-w-[80%]"
              }`}
            >
              {formatText(msg.text)}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-1.5 p-3 bg-[#FAFAF8] rounded-lg max-w-[80px]">
              <span className="w-2 h-2 bg-[#1B4332] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-2 h-2 bg-[#1B4332] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-2 h-2 bg-[#1B4332] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
          )}
          {needsData && (
            <div className="flex justify-start mt-2">
              <Link href="/upload" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-[#1B4332] bg-[#1B4332]/10 rounded-lg font-medium hover:bg-[#1B4332]/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Hemen Bir Dosya Yükle
              </Link>
            </div>
          )}
        </div>
          
        <div className="flex flex-wrap gap-2 mb-3">
        {SUGGESTED_QUESTIONS.filter((q) => !askedQuestions.includes(q)).map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              className="text-xs bg-white hover:bg-[#1B4332]/5 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Bir soru yaz..."
            className="flex-1 p-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#1B4332] text-gray-900 bg-white"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-[#1B4332] hover:bg-[#14332A] text-white w-12 h-12 flex items-center justify-center rounded-full transition disabled:opacity-50 flex-shrink-0"
          >
            <Send className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </main>
  );
}