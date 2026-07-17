"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculateMetricsForModel } from '../lib/carbon';
import { CheckCircle2, Globe, Coffee, Lightbulb, Smartphone, TreePine, BarChart3, Upload } from "lucide-react";

// --- TİPLER ---
type AnalysisResult = {
  totalConversations: number;
  totalMessages: number;
  models: string[];
  dateRange: { start: string; end: string; };
  estimatedTokens: number;
  estimatedKwh: number;
  estimatedCo2: number;
};

export default function UploadPage() {
  // STATE'LER
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const router = useRouter();

  // DOSYA İŞLEME VE HESAPLAMA
  const processFile = (file: File) => {
    setError(null);

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      setError("Hatalı format. Lütfen sadece .json uzantılı veri dosyasını yükleyin.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("Dosya çok büyük. Sistemimiz şu an için maksimum 50MB dosyaları desteklemektedir.");
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        if (!Array.isArray(data)) throw new Error("Geçerli bir ChatGPT dışa aktarma dosyası değil.");

        localStorage.setItem("greenbit_conversations", JSON.stringify(data));

        const totalConversations = data.length;
        let totalMessages = 0;
        const modelCounts: Record<string, number> = {};
        let earliestTime = Infinity;
        let latestTime = 0;

        data.forEach((conversation: any) => {
          if (conversation.mapping) {
            Object.values(conversation.mapping).forEach((node: any) => {
              if (node?.message?.metadata?.model_slug) {
                const slug = node.message.metadata.model_slug;
                modelCounts[slug] = (modelCounts[slug] || 0) + 1;
                totalMessages += 1;
              }
            });
          }
          if (conversation.create_time) {
            earliestTime = Math.min(earliestTime, conversation.create_time);
            latestTime = Math.max(latestTime, conversation.create_time);
          }
        });

        const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString('tr-TR');

        let totalTokens = 0;
        let totalEnergyWh = 0;
        let totalCO2 = 0;

        Object.keys(modelCounts).forEach((model) => {
          const metrics = calculateMetricsForModel(modelCounts[model], model);
          totalTokens += metrics.tokens;
          totalEnergyWh += metrics.energyWh;
          totalCO2 += metrics.co2;
        });

        setTimeout(() => {
          setResult({
            totalConversations,
            totalMessages,
            models: Object.keys(modelCounts),
            dateRange: {
              start: formatDate(earliestTime),
              end: formatDate(latestTime),
            },
            estimatedTokens: totalTokens,
            estimatedKwh: totalEnergyWh / 1000,
            estimatedCo2: totalCO2,
          });
          setIsLoading(false);
        }, 1500);

      } catch (err) {
        setError("Dosya ayrıştırılamadı. Geçerli bir JSON olduğundan emin olun.");
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Dosya okunurken sistemsel bir hata oluştu.");
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <section className="flex-grow py-12 px-8">
        <div className="max-w-7xl mx-auto">

          {!result ? (
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Sol Kolon: Bilgi ve Rehber */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h1 className="text-4xl font-medium text-gray-900 tracking-tight mb-4">
                    Verilerinizi analiz edin
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    GreenBit, gizliliğinizi ön planda tutar. Yüklediğiniz dosyalar sunucularımızda saklanmaz, sadece tarayıcınızda anlık olarak işlenir ve karbon ayak iziniz hesaplanır.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-medium text-gray-800 mb-6">Verimi nasıl indiririm?</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-medium text-sm">1</div>
                      <div>
                        <p className="font-medium text-gray-800">Ayarlara gidin</p>
                        <p className="text-sm text-gray-500 mt-1">ChatGPT sol alt köşesinden profilinize tıklayın ve Settings (Ayarlar) menüsünü açın.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-medium text-sm">2</div>
                      <div>
                        <p className="font-medium text-gray-800">Veriyi dışa aktarın</p>
                        <p className="text-sm text-gray-500 mt-1">Data Controls (Veri Kontrolleri) sekmesine geçip "Export Data" butonuna tıklayın.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-medium text-sm">3</div>
                      <div>
                        <p className="font-medium text-gray-800">Dosyayı yükleyin</p>
                        <p className="text-sm text-gray-500 mt-1">E-postanıza gelen ZIP dosyasını açın ve içindeki <span className="font-mono text-[#1B4332] bg-[#1B4332]/5 px-1 rounded">.json</span> dosyasını yandaki alana bırakın.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ Kolon: Sürükle Bırak Alanı */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[2rem] p-2 shadow-sm border border-gray-100">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      relative rounded-[1.5rem] border-2 border-dashed h-[500px] flex flex-col items-center justify-center p-12 text-center transition-all duration-300 ease-out cursor-pointer
                      ${isDragging ? "border-[#1B4332] bg-[#1B4332]/5 scale-[0.99]" : "border-gray-200 bg-gray-50 hover:border-[#1B4332]/50 hover:bg-[#1B4332]/5"}
                    `}
                  >
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={isLoading}
                    />

                    <div className="relative z-0 flex flex-col items-center">
                      <div className={`
                        relative flex items-center justify-center w-24 h-24 mb-6 rounded-full transition-all duration-500
                        ${isDragging ? "bg-[#1B4332]/10 scale-110" : "bg-white shadow-sm"}
                      `}>
                        <Upload className={`w-9 h-9 transition-colors duration-300 ${isDragging ? "text-[#1B4332]" : "text-gray-400"}`} strokeWidth={1.5} />
                      </div>

                      {isLoading ? (
                        <div className="space-y-3">
                          <h3 className="text-xl font-medium text-[#1B4332]">Analiz ediliyor...</h3>
                          <p className="text-sm text-gray-500">Yapay zeka ayak iziniz hesaplanıyor, lütfen bekleyin.</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <h3 className="text-2xl font-medium text-gray-800">
                            <span className="text-[#1B4332]">Tıklayın</span> veya sürükleyin
                          </h3>
                          <p className="text-gray-500 max-w-sm mx-auto">
                            Sadece <span className="font-mono text-sm text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">.json</span> formatındaki dosyalar kabul edilmektedir.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3">
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Yükleme hatası</h3>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (

            /* DURUM 2: SONUÇLAR */
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="w-14 h-14 text-[#1B4332]" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-medium text-[#1B4332]">Analiz tamamlandı!</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1B4332]/5 p-4 rounded-lg text-center">
                  <div className="text-3xl font-medium text-[#1B4332]">{result.totalConversations}</div>
                  <div className="text-sm text-gray-600">Konuşma</div>
                </div>
                <div className="bg-[#1B4332]/5 p-4 rounded-lg text-center">
                  <div className="text-3xl font-medium text-[#1B4332]">{result.totalMessages}</div>
                  <div className="text-sm text-gray-600">Mesaj</div>
                </div>
              </div>

              <div className="bg-[#FAFAF8] rounded-lg p-6 mb-6 border border-gray-100">
                <h4 className="text-lg font-medium text-[#1B4332] mb-4 text-center flex items-center justify-center gap-2">
                  <Globe className="w-5 h-5" strokeWidth={2} />
                  Tahmini karbon ayak izin
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center border border-gray-100">
                    <div className="text-2xl font-medium text-[#1B4332]">
                      {result.estimatedTokens.toLocaleString('tr-TR')}
                    </div>
                    <div className="text-xs text-gray-600">Toplam token</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center border border-gray-100">
                    <div className="text-2xl font-medium text-[#1B4332]">
                      {result.estimatedKwh.toFixed(3)}
                    </div>
                    <div className="text-xs text-gray-600">kWh enerji</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center border border-gray-100">
                    <div className="text-2xl font-medium text-[#1B4332]">
                      {result.estimatedCo2.toFixed(2)}g
                    </div>
                    <div className="text-xs text-gray-600">CO2 salımı</div>
                  </div>
                </div>

                {/* ANLAŞILIR KARŞILAŞTIRMALAR */}
                <div className="mt-6 bg-white rounded-lg p-4 border border-gray-100">
                  <p className="text-sm font-medium text-[#1B4332] mb-3 text-center flex items-center justify-center gap-2">
                    <Lightbulb className="w-4 h-4" strokeWidth={2} />
                    Bu ne kadar?
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-[#1B4332] flex-shrink-0" strokeWidth={2} />
                      <span><strong>{(result.estimatedCo2 / 50).toFixed(1)}</strong> bardak kahve üretimine eşit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[#1B4332] flex-shrink-0" strokeWidth={2} />
                      <span><strong>{Math.round(result.estimatedKwh * 1000 / 60)}</strong> dakika 60W ampul yakmakla aynı</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#1B4332] flex-shrink-0" strokeWidth={2} />
                      <span><strong>{Math.round(result.estimatedKwh * 1000 / 5)}</strong> kez telefon şarj etmeye eşit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TreePine className="w-4 h-4 text-[#1B4332] flex-shrink-0" strokeWidth={2} />
                      <span>Bir ağacın <strong>{(result.estimatedCo2 / 22000 * 365).toFixed(1)}</strong> günlük emişine eşit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DASHBOARD'A GEÇİŞ BUTONU */}
              <div className="mt-8 text-center border-t border-gray-100 pt-6">
                <p className="text-gray-600 mb-4">Grafikler ve zaman çizelgeleri için detaylı görünüme geçin:</p>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="inline-flex items-center gap-2 bg-[#1B4332] hover:bg-[#14332A] text-white font-medium py-3 px-8 rounded-full transition"
                >
                  <BarChart3 className="w-4 h-4" strokeWidth={2} />
                  Detaylı dashboard'a geç
                </button>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => setResult(null)}
                  className="text-gray-500 hover:text-gray-700 underline text-sm"
                >
                  Farklı dosya yükle
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 GreenBit</p>
          <p className="text-sm text-gray-400 font-medium">Yapay Zeka Karbon Ayak İzi Platformu</p>
        </div>
      </footer>

    </main>
  );
}