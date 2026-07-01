"use client";

import { useState } from "react";

export default function UploadPage() {
  // STATE: Seçilen dosyayı takip ediyoruz
  const [file, setFile] = useState<File | null>(null);

  // FONKSİYON: Dosya seçildiğinde çalışır
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Kullanıcının seçtiği ilk dosya
    if (selectedFile) {
      setFile(selectedFile); // State'i güncelle
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* BAŞLIK BÖLÜMÜ */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📤</div>
          <h1 className="text-5xl font-bold text-green-700 mb-4">
            AI Kullanım Verini Yükle
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            ChatGPT, Claude ve diğer yapay zeka servislerinden indirdiğin 
            <strong> export dosyalarını</strong> yükle. GreenBit karbon ayak izini 
            hesaplayacak ve optimizasyon önerileri sunacak.
          </p>
        </div>

        {/* DOSYA YÜKLEME KUTUSU */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          {/* Eğer dosya seçilmemişse - bu kısım göster */}
          {!file && (
            <div className="text-center">
              <div className="text-6xl mb-4">📁</div>
              <p className="text-gray-700 text-lg mb-6">
                Yüklemek istediğin dosyayı seç
              </p>
              
              <label className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg cursor-pointer transition">
                Dosya Seç
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".json,.zip,.csv"
                />
              </label>
              
              <p className="text-sm text-gray-500 mt-4">
                Desteklenen formatlar: ZIP, JSON, CSV
              </p>
            </div>
          )}

          {/* Eğer dosya seçildiyse - bu kısım göster */}
          {file && (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Dosya Başarıyla Seçildi!
              </h3>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6 text-left inline-block">
                <p className="text-gray-700 mb-2">
                  <strong>📄 Dosya adı:</strong> {file.name}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>📏 Boyut:</strong> {(file.size / 1024).toFixed(2)} KB
                </p>
                <p className="text-gray-700">
                  <strong>🕐 Tür:</strong> {file.type || "Bilinmiyor"}
                </p>
              </div>

              <button
                onClick={() => setFile(null)}
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Farklı bir dosya seç
              </button>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}