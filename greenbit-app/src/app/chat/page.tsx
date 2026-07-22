"use client";

import { useState } from "react";
import { Bot, Send } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const savedData = localStorage.getItem("greenbit_conversations");
      if (!savedData) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Henüz bir veri göremiyorum,Önce Dosya Yükle sayfasından bir dosya yükler misin? Sonra seninle verilerin hakkında rahatça konuşabiliriz!" },
        ]);
        setLoading(false);
        return;
      }

      // Basit özet çıkar (dashboard'daki parseChatGPTExport'un basitleştirilmişi)
      const conversations = JSON.parse(savedData);
      const modelCounts: Record<string, number> = {};
      let totalMessages = 0;

      conversations.forEach((conv: any) => {
        if (!conv.mapping) return;
        Object.values(conv.mapping).forEach((node: any) => {
          if (node?.message?.metadata?.model_slug) {
            const slug = node.message.metadata.model_slug;
            modelCounts[slug] = (modelCounts[slug] || 0) + 1;
            totalMessages += 1;
          }
        });
      });

      const dataSummary = {
        totalTokens: (totalMessages * 200).toLocaleString("tr-TR"),
        totalEnergy: "hesaplanıyor",
        totalCO2: "hesaplanıyor",
        modelDistribution: Object.entries(modelCounts).map(([name, value]) => ({ name, value })),
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, dataSummary }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.answer || "Cevap alınamadı." }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sohbet şu anda kullanılamıyor. Ollama çalışıyor mu?" },
      ]);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-medium text-[#1B4332] mb-2 flex items-center gap-2">
          <Bot className="w-7 h-7" strokeWidth={1.5} />
          Sohbet
        </h1>
        <p className="text-gray-500 mb-8">Verilerin hakkında doğal dilde soru sor.</p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-4 min-h-[300px] space-y-4">
          {messages.length === 0 && (
            <p className="text-gray-400 text-sm">Henüz bir mesaj yok. Bir soru yazarak başla.</p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg text-sm ${
                msg.role === "user" ? "bg-[#1B4332]/5 ml-auto max-w-[80%]" : "bg-[#FAFAF8] max-w-[80%]"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <p className="text-gray-400 text-sm">Yazıyor...</p>}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Bir soru yaz..."
            className="flex-1 p-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#1B4332] text-gray-900"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-[#1B4332] hover:bg-[#14332A] text-white p-3 rounded-full transition disabled:opacity-50"
          >
            <Send className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </main>
  );
}