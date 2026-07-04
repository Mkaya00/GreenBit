"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        const jsonData = JSON.parse(content);
        
        localStorage.setItem("greenbit_conversations", JSON.stringify(jsonData));
        
        // Yapay bir yükleme süresi ekleyerek analiz ediliyor hissiyatını güçlendiriyoruz
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
        
      } catch (err) {
        setError("Dosya ayrıştırılamadı. Geçerli bir ChatGPT dışa aktarma dosyası olduğundan emin olun.");
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      setError("Dosya okunurken sistemsel bir hata oluştu.");
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F8FAFC]"> {/* Modern, çok açık gri arka plan */}

      {/* Ana İçerik */}
      <section className="flex-grow py-12 px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Sol Kolon: Bilgi ve Rehber (SaaS Profesyonelliği) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                  Verilerinizi Analiz Edin
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  GreenBit, gizliliğinizi ön planda tutar. Yüklediğiniz dosyalar sunucularımızda saklanmaz, sadece tarayıcınızda anlık olarak işlenir ve karbon ayak iziniz hesaplanır.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Verimi Nasıl İndiririm?</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <p className="font-semibold text-gray-800">Ayarlara Gidin</p>
                      <p className="text-sm text-gray-500 mt-1">ChatGPT sol alt köşesinden profilinize tıklayın ve Settings (Ayarlar) menüsünü açın.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <p className="font-semibold text-gray-800">Veriyi Dışa Aktarın</p>
                      <p className="text-sm text-gray-500 mt-1">Data Controls (Veri Kontrolleri) sekmesine geçip "Export Data" butonuna tıklayın.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <p className="font-semibold text-gray-800">Dosyayı Yükleyin</p>
                      <p className="text-sm text-gray-500 mt-1">E-postanıza gelen ZIP dosyasını açın ve içindeki <span className="font-mono text-green-600 bg-green-50 px-1 rounded">.json</span> dosyasını yandaki alana bırakın.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Kolon: Sürükle Bırak Alanı */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2rem] p-2 shadow-2xl shadow-green-900/5 border border-gray-100">
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    relative rounded-[1.5rem] border-2 border-dashed h-[500px] flex flex-col items-center justify-center p-12 text-center transition-all duration-300 ease-out cursor-pointer
                    ${isDragging 
                      ? "border-green-500 bg-green-50/50 scale-[0.99]" 
                      : "border-gray-200 bg-gray-50 hover:border-green-400 hover:bg-green-50/20"
                    }
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
                    {/* Animasyonlu İkon Arka Planı */}
                    <div className={`
                      relative flex items-center justify-center w-24 h-24 mb-6 rounded-full transition-all duration-500
                      ${isDragging ? "bg-green-100 scale-110" : "bg-white shadow-sm"}
                    `}>
                      <div className={`absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping ${isDragging ? 'block' : 'hidden'}`}></div>
                      <svg className={`w-10 h-10 transition-colors duration-300 ${isDragging ? "text-green-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    
                    {isLoading ? (
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-green-600">Analiz Ediliyor...</h3>
                        <p className="text-sm text-gray-500">Yapay zeka ayak iziniz hesaplanıyor, lütfen bekleyin.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-gray-800">
                          <span className="text-green-600">Tıklayın</span> veya sürükleyin
                        </h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                          Sadece <span className="font-mono text-sm text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">.json</span> formatındaki dosyalar kabul edilmektedir (Maksimum 50MB).
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hata Mesajı */}
              {error && (
                <div className="mt-6 animate-in slide-in-from-top-2 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-bold text-red-800">Yükleme Hatası</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 GreenBit 
          </p>
          <p className="text-sm text-gray-400 font-medium">
            Yapay Zeka Karbon Ayak İzi Platformu
          </p>
        </div>
      </footer>
      
    </main>
  );
}