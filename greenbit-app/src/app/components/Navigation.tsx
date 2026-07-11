import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* SOL: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-3xl">🌱</span>
          <span className="text-2xl font-bold text-green-700 group-hover:text-green-800 transition">
            GreenBit
          </span>
        </Link>

        {/* SAĞ: Menü Linkleri */}
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-green-700 font-medium transition"
          >
            Ana Sayfa
          </Link>
          <Link 
            href="/analyze-page" 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition shadow"
          >
             AI Analiz
          </Link>
          <Link 
            href="/upload" 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition shadow"
          >
            Dosya Yükle
          </Link>
        </div>

      </div>
    </nav>
  );
}