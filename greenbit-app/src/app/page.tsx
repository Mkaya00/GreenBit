"use client";

import { useState } from "react";

type AnalysisResult = {
  totalConversations: number;
  totalMessages: number;
  models: string[];
  dateRange: {
    start: string;
    end: string;
  };
  // YENİ EKLENENLER
  estimatedTokens: number;
  estimatedKwh: number;
  estimatedCo2: number;
};

export default function UploadPage() {
  // STATE'ler
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Dosya seçildiğinde çalışır
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };
// ============================================
// KARBON HESAPLAMA SABİTLERİ
// Kaynak: Green Algorithms (Lannelongue et al., 2021)
// Detaylı belge: docs/methodology.md
// ============================================

// Her modelin enerji tüketimi (Wh / 1000 token)
const MODEL_ENERGY = {
  "gpt-4": 30,           // Yüksek tüketim - eski büyük model
  "gpt-4o": 15,          // Orta tüketim - verimli büyük model
  "gpt-4o-mini": 3,      // Düşük tüketim - küçük model
  "gpt-3.5-turbo": 5,    // Düşük-orta tüketim
  "claude-3-opus": 25,   // Yüksek tüketim - büyük Anthropic modeli
  "claude-3-sonnet": 10, // Orta tüketim
  "default": 15,         // Bilinmeyen model için ortalama
};

// CO2 katsayısı (gram / Wh)
// Kaynak: IEA World Energy Outlook 2023
const CO2_PER_WH = 0.4;  // Dünya ortalaması: ~400g CO2 / kWh

// Ortalama mesaj başına token
// (İleride tiktoken ile gerçek hesaplanacak)
const AVG_TOKENS_PER_MESSAGE = 200;



  // "Analiz Et" butonuna basınca çalışır
  const handleAnalyze = async () => {
    if (!file) return;

    setAnalyzing(true);
    setError(null);

    try {
      // Dosyayı metin olarak oku
      const text = await file.text();
      
      // JSON parse et
      const data = JSON.parse(text);

      // Bu bir dizi mi kontrol et (ChatGPT format)
      if (!Array.isArray(data)) {
        throw new Error("Dosya beklenen formatta değil. ChatGPT export dosyası olmalı.");
      }

      // İSTATİSTİKLERİ ÇIKAR
      const totalConversations = data.length;
      let totalMessages = 0;
      const modelsSet = new Set<string>();
      let earliestTime = Infinity;
      let latestTime = 0;

      // Her konuşmayı gez
      data.forEach((conversation: any) => {
        // Mesaj sayısını hesapla
        if (conversation.mapping) {
          const messages = Object.values(conversation.mapping);
          totalMessages += messages.length;

          // Kullanılan modelleri topla
          messages.forEach((msg: any) => {
            if (msg?.message?.metadata?.model_slug) {
              modelsSet.add(msg.message.metadata.model_slug);
            }
          });
        }

        // Tarih aralığı
        if (conversation.create_time) {
          earliestTime = Math.min(earliestTime, conversation.create_time);
          latestTime = Math.max(latestTime, conversation.create_time);
        }
      });

      // Timestamp'i tarihe çevir
      const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString('tr-TR');
      };

// KARBON HESAPLAMA
let totalEnergy = 0; // Wh cinsinden
const modelsList = Array.from(modelsSet);

// Her mesaj için ortalama enerji hesabı
const messagesPerModel = Math.floor(totalMessages / (modelsList.length || 1));

modelsList.forEach((model) => {
  // Model bilinmiyorsa varsayılan değer
  const energyPer1000Tokens = MODEL_ENERGY[model as keyof typeof MODEL_ENERGY] 
    || MODEL_ENERGY.default;
  
  // Bu modelin toplam token'i
  const modelTokens = messagesPerModel * AVG_TOKENS_PER_MESSAGE;
  
  // Enerji hesabı: (token / 1000) × Wh
  const modelEnergy = (modelTokens / 1000) * energyPer1000Tokens;
  
  totalEnergy += modelEnergy;
});

const estimatedTokens = totalMessages * AVG_TOKENS_PER_MESSAGE;
const estimatedKwh = totalEnergy / 1000; // Wh → kWh
const estimatedCo2 = totalEnergy * CO2_PER_WH; // Wh × (g/Wh) = g CO2      
      
setResult({
  totalConversations,
  totalMessages,
  models: Array.from(modelsSet),
  dateRange: {
    start: formatDate(earliestTime),
    end: formatDate(latestTime),
  },
  // YENİ
  estimatedTokens,
  estimatedKwh,
  estimatedCo2,
});
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Bilinmeyen hata";
      setError(`Analiz hatası: ${errorMessage}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* BAŞLIK */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📤</div>
          <h1 className="text-5xl font-bold text-green-700 mb-4">
            AI Kullanım Verini Yükle
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            ChatGPT export dosyanı yükle, GreenBit analiz etsin.
          </p>
        </div>

        {/* İÇERİK KUTUSU */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          {/* HATA MESAJI */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
              ❌ {error}
            </div>
          )}

          {/* DOSYA SEÇİLMEDİ - Seçme Ekranı */}
          {!file && (
            <div className="text-center">
              <div className="text-6xl mb-4">📁</div>
              <p className="text-gray-700 text-lg mb-6">
                ChatGPT'den indirdiğin JSON dosyasını seç
              </p>
              
              <label className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg cursor-pointer transition">
                Dosya Seç
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".json"
                />
              </label>
              
              <p className="text-sm text-gray-500 mt-4">
                Desteklenen format: JSON (conversations.json)
              </p>
            </div>
          )}

          {/* DOSYA SEÇİLDİ - Analiz Ekranı */}
          {file && !result && (
            <div className="text-center">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Dosya Hazır
              </h3>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6 text-left inline-block">
                <p className="text-gray-700 mb-2">
                  <strong>📄 Ad:</strong> {file.name}
                </p>
                <p className="text-gray-700">
                  <strong>📏 Boyut:</strong> {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-lg transition"
                >
                  {analyzing ? "Analiz ediliyor..." : "Analiz Et →"}
                </button>
                <button
                  onClick={() => { setFile(null); setResult(null); }}
                  className="text-gray-500 hover:text-gray-700 underline"
                >
                  Farklı dosya seç
                </button>
              </div>
            </div>
          )}

          {/* ANALİZ SONUCU */}
          {result && (
            <div>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-700">
                  Analiz Tamamlandı!
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-700">
                    {result.totalConversations}
                  </div>
                  <div className="text-sm text-gray-600">Konuşma</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-emerald-700">
                    {result.totalMessages}
                  </div>
                  <div className="text-sm text-gray-600">Mesaj</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>📅 Tarih Aralığı:</strong>
                </p>
                <p className="text-gray-700">
                  {result.dateRange.start} - {result.dateRange.end}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>🤖 Kullanılan Modeller:</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.models.length > 0 ? (
                    result.models.map((model) => (
                      <span key={model} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                        {model}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">Model bilgisi yok</span>
                  )}
                </div>
              </div>
{/* KARBON HESAPLAMA SONUCU */}
<div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-6 mb-6">
  <h4 className="text-lg font-bold text-green-800 mb-4 text-center">
    🌍 Tahmini Karbon Ayak İzin
  </h4>
  
  <div className="grid grid-cols-3 gap-4">
    <div className="bg-white p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-green-700">
        {result.estimatedTokens.toLocaleString('tr-TR')}
      </div>
      <div className="text-xs text-gray-600">Toplam Token</div>
    </div>
    
    <div className="bg-white p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-emerald-700">
        {result.estimatedKwh.toFixed(3)}
      </div>
      <div className="text-xs text-gray-600">kWh Enerji</div>
    </div>
    
    <div className="bg-white p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-teal-700">
        {result.estimatedCo2.toFixed(2)}g
      </div>
      <div className="text-xs text-gray-600">CO2 Salımı</div>
    </div>
  </div>
  
  {/* ANLAŞILIR KARŞILAŞTIRMALAR */}
<div className="mt-6 bg-white bg-opacity-70 rounded-lg p-4">
  <p className="text-sm font-semibold text-green-800 mb-3 text-center">
    💡 Bu ne kadar?
  </p>
  <div className="space-y-2 text-sm text-gray-700">
    <div className="flex items-start gap-2">
      <span className="text-lg">☕</span>
      <span>
        <strong>{(result.estimatedCo2 / 50).toFixed(1)}</strong> bardak kahve üretiminin karbon salımına eşit
      </span>
    </div>
    <div className="flex items-start gap-2">
      <span className="text-lg">💡</span>
      <span>
        <strong>{Math.round(result.estimatedKwh * 1000 / 60)}</strong> dakika 60W ampul yakmakla aynı enerji
      </span>
    </div>
    <div className="flex items-start gap-2">
      <span className="text-lg">📱</span>
      <span>
        <strong>{Math.round(result.estimatedKwh * 1000 / 5)}</strong> kez telefon şarj etmekle aynı enerji
      </span>
    </div>
    <div className="flex items-start gap-2">
      <span className="text-lg">🌳</span>
      <span>
        Bir ağacın <strong>{(result.estimatedCo2 / 22000 * 365).toFixed(1)}</strong> günlük CO2 emiş kapasitesine eşit
      </span>
    </div>
  </div>
</div>

  <p className="text-xs text-gray-600 text-center mt-4">
    Green Algorithms metodolojisi ile hesaplanmıştır. Tahminidir.
  </p>
</div>
              <div className="text-center">
                <button
                  onClick={() => { setFile(null); setResult(null); }}
                  className="text-gray-500 hover:text-gray-700 underline"
                >
                  Farklı dosya yükle
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}