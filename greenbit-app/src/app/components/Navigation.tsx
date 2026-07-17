import Link from "next/link";
import { Leaf, Bot, Upload } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
        {/* SOL: Logo */}
        <Link href="/" className="flex items-center gap-1 sm:gap-2 group flex-shrink-0">
          <Leaf className="w-5 h-5 sm:w-7 sm:h-7 text-[#1B4332]" strokeWidth={2} />
          <span className="text-base sm:text-2xl font-medium text-[#1B4332] transition whitespace-nowrap">
            GreenBit
          </span>
        </Link>

        {/* SAĞ: Menü Linkleri */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link 
            href="/" 
            className="hidden sm:inline text-gray-700 hover:text-[#1B4332] font-medium transition whitespace-nowrap text-sm sm:text-base"
          >
            Ana Sayfa
          </Link>
          <Link 
            href="/analyze-page" 
            className="flex items-center gap-1.5 border border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332]/5 font-medium px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition whitespace-nowrap text-xs sm:text-base"
          >
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
            AI Analiz
          </Link>
          <Link 
            href="/upload" 
            className="flex items-center gap-1.5 bg-[#1B4332] hover:bg-[#14332A] text-white font-medium px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition whitespace-nowrap text-xs sm:text-base"
          >
            <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
            Dosya Yükle
          </Link>
        </div>

      </div>
    </nav>
  );
}