"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function AnalysisText({ text }: { text: string }) {
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({});

  if (!text) return null;

  const rawLines = text.split("\n").filter((l) => l.trim().length > 0);
  type Section = { status: string; body: string[] };
  const sections: Section[] = [];
  const introLines: string[] = [];

  rawLines.forEach((line) => {
    const match = line.match(/Uyum:\s*(Evet|Hayır|Kısmen)/i);
    if (match) {
      sections.push({ status: match[1], body: [] });
    } else if (sections.length > 0) {
      sections[sections.length - 1].body.push(line);
    } else {
      introLines.push(line);
    }
  });

  const toggle = (i: number) => setOpenIndexes((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="space-y-2">
      {introLines.map((line, i) => (
        <p key={`intro-${i}`} className="text-gray-800 text-sm leading-relaxed">{line}</p>
      ))}

      {/* Ekran görünümü */}
      <div className="print:hidden space-y-2">
        {sections.map((section, i) => {
          const isPositive = section.status.toLowerCase() === "evet";
          const isPartial = section.status.toLowerCase() === "kısmen";
          const colorClass = isPositive ? "bg-green-100 text-green-800" : isPartial ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800";
          const Icon = isPositive ? CheckCircle2 : isPartial ? AlertTriangle : XCircle;
          const label = isPositive ? "Uyumlu" : isPartial ? "Kısmen Uyumlu" : "Uyumsuz";
          const isOpen = !!openIndexes[i];

          return (
            <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#FAFAF8] hover:bg-gray-100 transition text-left"
              >
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                  <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  {label}
                </span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {isOpen && (
                <div className="px-3 py-2 space-y-1">
                  {section.body.map((line, j) => (
                    <p key={j} className="text-gray-800 text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Yazdırma görünümü — her şey açık, düz metin */}
      <div className="hidden print:block space-y-3">
        {sections.map((section, i) => {
          const isPositive = section.status.toLowerCase() === "evet";
          const isPartial = section.status.toLowerCase() === "kısmen";
          const label = isPositive ? "✓ Uyumlu" : isPartial ? "~ Kısmen Uyumlu" : "✗ Uyumsuz";

          return (
            <div key={i} className="border-b border-gray-200 pb-2">
              <p className="text-xs font-medium text-gray-700 mb-1">{label}</p>
              {section.body.map((line, j) => (
                <p key={j} className="text-gray-800 text-sm leading-relaxed">{line}</p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}