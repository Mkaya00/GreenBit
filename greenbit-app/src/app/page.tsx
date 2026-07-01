import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* HERO BÖLÜMÜ */}
      <section className="min-h-screen flex items-center justify-center p-8">
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
            <Link 
              href="/upload"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition"
            >
              Hemen Başla
            </Link>
            <a 
              href="#features"
              className="bg-white hover:bg-gray-50 text-green-600 font-semibold px-8 py-3 rounded-lg shadow border border-green-200 transition"
            >
              Daha Fazla Bilgi
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-12">
            🌍 Sürdürülebilir bir dijital gelecek için
          </p>
        </div>
      </section>

      {/* ÖZELLİKLER BÖLÜMÜ */}
      <section id="features" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            GreenBit Ne Yapar?
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Yapay zeka kullanımınızı üç temel değer üzerinden yönetin
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Özellik 1: Ölçüm */}
            <div className="bg-green-50 p-8 rounded-2xl border border-green-100 hover:shadow-lg transition">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-green-700 mb-3">Ölçüm</h3>
              <p className="text-gray-600 leading-relaxed">
                ChatGPT ve Claude kullanımınızın token, kWh ve CO2 salımlarını 
                gerçek zamanlı takip edin.
              </p>
            </div>

            {/* Özellik 2: Prompt Koçluğu */}
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-3">Prompt Koçluğu</h3>
              <p className="text-gray-600 leading-relaxed">
                Yapay zeka destekli analizle daha verimli prompt yazma önerileri alın. 
                Hem karbon tasarrufu, hem daha iyi sonuçlar.
              </p>
            </div>

            {/* Özellik 3: Akıllı Öneriler */}
            <div className="bg-teal-50 p-8 rounded-2xl border border-teal-100 hover:shadow-lg transition">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-teal-700 mb-3">Akıllı Öneriler</h3>
              <p className="text-gray-600 leading-relaxed">
                Hangi modelleri, hangi saatlerde ve nasıl kullanmanız gerektiği 
                konusunda kişiselleştirilmiş öneriler.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-800 text-white py-8 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            © 2026 GreenBit — Sakarya Üniversitesi YBS
          </p>
          <p className="text-xs text-green-200 mt-2">
            Yapay Zeka ve Teknoloji Akademisi 2026 Bootcamp Projesi
          </p>
        </div>
      </footer>
    </main>
  );
}