"use client";

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function AnalysisText({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const match = line.match(/Uyum:\s*(Evet|Hayır|Kısmen)/i);
        if (match) {
          const status = match[1];
          const isPositive = status.toLowerCase() === "evet";
          const isPartial = status.toLowerCase() === "kısmen";
          const colorClass = isPositive
            ? "bg-green-100 text-green-800"
            : isPartial
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800";
            const Icon = isPositive ? CheckCircle2 : isPartial ? AlertTriangle : XCircle;
          const label = isPositive ? "Uyumlu" : isPartial ? "Kısmen Uyumlu" : "Uyumsuz";
          return (
            <span key={i} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
              <Icon className="w-3.5 h-3.5" strokeWidth={2} />
              {label}
            </span>
          );
        }
        return line.trim().length > 0 ? (
          <p key={i} className="text-gray-800 text-sm leading-relaxed">{line}</p>
        ) : null;
      })}
    </div>
  );
}