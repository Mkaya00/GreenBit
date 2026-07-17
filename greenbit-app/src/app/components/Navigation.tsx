import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
        {/* SOL: Logo */}
        <Link href="/" className="flex items-center gap-1 sm:gap-2 group flex-shrink-0">
          <span className="text-xl sm:text-3xl">🌱</span>
          <span className="text-base sm:text-2xl font-bold text-green-700 group-hover:text-green-800 transition whitespace-nowrap">
            GreenBit
          </span>
        </Link>

        {/* SAĞ: Menü Linkleri */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link 
            href="/" 
            className="hidden sm:inline text-gray-700 hover:text-green-700 font-medium transition whitespace-nowrap text-sm sm:text-base"
          >
            Ana Sayfa
          </Link>
          <Link 
            href="/analyze-page" 
            className="bg-white border border-green-600 text-green-700 hover:bg-green-50 font-semibold px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg transition whitespace-nowrap text-xs sm:text-base"
          >
            AI Analiz
          </Link>
          <Link 
            href="/upload" 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg transition shadow whitespace-nowrap text-xs sm:text-base"
          >
            Dosya Yükle
          </Link>
        </div>

      </div>
    </nav>
  );
}