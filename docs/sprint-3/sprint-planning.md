# Sprint 3 Planning

**Sprint Süresi:** 20 Temmuz 2026 – 2 Ağustos 2026 (2 hafta)
**Sprint Hedefi:** Ürünü teslime hazırlamak — sohbet arayüzü, PDF rapor, canlıya alma (deploy), agent orkestrasyonu ve demo video.

---

## Sprint Backlog

| ID | User Story | Öncelik |
|---|---|---|
| US-008 | AI Agent Orkestrasyonu (Sprint 2'den devir) | Yüksek |
| US-009 | Sohbet Arayüzü | Yüksek |
| US-010 | PDF Rapor | Orta |
| US-011 | Canlıya Alma (Deploy) | Yüksek (riskli) |
| US-012 | Demo Video | Düşük (en son) |

---

## Deploy Stratejisi

1. **Öncelik:** Oracle Cloud Always Free (ücretsiz, lokal Ollama ile tam gizlilik)
2. **Yedek 1:** Groq API (ücretsiz, açık kaynak model barındırma)
3. **Yedek 2:** Ücretli VPS (Hetzner/Contabo, ~4-6 Euro/ay)


---

## Not: Sprint Sırasında Eklenen Ekstra İşler

Plan dışında, sprint ilerledikçe şu bonus özellikler eklendi: Su Ayak İzi Hesaplayıcı, Agent Orkestrasyonu görsel durum göstergeleri, performans iyileştirmeleri. Detaylar için daily-scrum-notes ve sprint-review dosyalarına bakınız.

25 Temmuz'da ayrıca: "Ne Olurdu?" Simülatörü, Yıllık Projeksiyon, Sohbet Hafızası, Su Karşılaştırmaları, Başarı Rozetleri eklendi.
26 Temmuz'da: Kapsamlı test ve kalite kontrolü günü yapıldı — yeni özellik eklenmedi, mevcut özellikler sistematik olarak doğrulandı ve küçük hatalar düzeltildi.
27 Temmuz'da: Deploy planlaması, Groq/Vercel hesap kurulumları yapıldı.
28 Temmuz'da: US-011 (Deploy) tamamlandı — Groq + Vercel entegrasyonu, güvenlik kontrolü.
29 Temmuz'da: Kritik state management düzeltmesi, sohbet iyileştirmeleri, UI cilası (rozet/accordion), geçmiş analizler,çoklu dosya geçmişi özellikleri ve  kalite kontrolü düzeltmeleri yapıldı.
30 Temmuz'da: localStorage taşma hatası düzeltildi, çoklu dosya geçmişi özelliği kaldırıldı, belgeler güncellendi ve güvenilir cevap vermeyen 3 soru kaldırıldı.
