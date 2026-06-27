export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-3xl text-center">
        <div className="text-6xl mb-4">🌱</div>
        <h1 className="text-7xl font-bold text-green-700 mb-4">
          GreenBit
        </h1>
        <h2 className="text-2xl text-gray-700 mb-6 font-light">
          Yapay Zeka Karbon Ayak İzi Platformu
        </h2>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          ChatGPT, Claude ve diğer yapay zeka servislerini kullanırken oluşan 
          enerji tüketiminizi ölçün, optimize edin ve sürdürülebilirlik 
          raporlarınızı otomatik oluşturun.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition">
            Hemen Başla
          </button>
          <button className="bg-white hover:bg-gray-50 text-green-600 font-semibold px-8 py-3 rounded-lg shadow border border-green-200 transition">
            Daha Fazla Bilgi
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-12">
          🌍 Sürdürülebilir bir dijital gelecek için
        </p>
      </div>
    </main>
  );
}