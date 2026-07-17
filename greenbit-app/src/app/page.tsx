import Link from "next/link";
import { Leaf, BarChart3, Target, Lightbulb, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* HERO BÖLÜMÜ */}
      <section className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-3xl text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="w-14 h-14 text-[#1B4332]" strokeWidth={1.5} />
          </div>
          <h1 className="text-6xl sm:text-7xl font-medium text-[#1B4332] mb-4 tracking-tight">
            GreenBit
          </h1>
          <h2 className="text-xl sm:text-2xl text-gray-600 mb-6 font-light">
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
              className="flex items-center gap-2 bg-[#1B4332] hover:bg-[#14332A] text-white font-medium px-8 py-3 rounded-full transition"
            >
              Hemen Başla
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            <Link
              href="#features"
              className="bg-white hover:bg-gray-50 text-[#1B4332] font-medium px-8 py-3 rounded-full border border-[#1B4332] transition"
            >
              Daha Fazla Bilgi
            </Link>
            
          </div>
        </div>
      </section>

      {/* ÖZELLİKLER BÖLÜMÜ */}
      <section id="features" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-medium text-center text-gray-800 mb-4">
            GreenBit ne yapar?
          </h2>
          <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
            Yapay zeka kullanımınızı üç temel değer üzerinden yönetin
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Özellik 1: Ölçüm */}
            <div className="bg-[#FAFAF8] p-8 rounded-2xl border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-[#1B4332]/10 flex items-center justify-center mb-5">
                <BarChart3 className="w-6 h-6 text-[#1B4332]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-medium text-[#1B4332] mb-3">Ölçüm</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                ChatGPT ve Claude kullanımınızın token, kWh ve CO2 salımlarını
                gerçek zamanlı takip edin.
              </p>
            </div>

            {/* Özellik 2: Prompt Koçluğu */}
            <div className="bg-[#FAFAF8] p-8 rounded-2xl border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-[#1B4332]/10 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-[#1B4332]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-medium text-[#1B4332] mb-3">Prompt koçluğu</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Yapay zeka destekli analizle daha verimli prompt yazma önerileri alın.
                Hem karbon tasarrufu, hem daha iyi sonuçlar.
              </p>
            </div>

            {/* Özellik 3: Akıllı Öneriler */}
            <div className="bg-[#FAFAF8] p-8 rounded-2xl border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-[#1B4332]/10 flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6 text-[#1B4332]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-medium text-[#1B4332] mb-3">Akıllı öneriler</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Hangi modelleri, hangi saatlerde ve nasıl kullanmanız gerektiği
                konusunda kişiselleştirilmiş öneriler.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1B4332] text-white py-8 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© 2026 GreenBit</p>
          <p className="text-xs text-white/60 mt-2">
            Yapay Zeka Kullanımınızın Çevresel Etkisini Ölçün
          </p>
        </div>
      </footer>
    </main>
  );
}