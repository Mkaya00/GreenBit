# Sprint 3 - Review

**Sprint Süresi:** 20 Temmuz 2026 – 2 Ağustos 2026
**Review Tarihi:** 1 Ağustos 2026

## Tamamlanan İşler

- **US-008: AI Agent Orkestrasyonu** — 3 uzman agent paralel çalışarak prompt analizi, model önerisi ve verimlilik skoru üretiyor.
- **US-009: Sohbet Arayüzü** — Kullanıcı, yüklediği verisi hakkında doğal dilde soru sorup gerçek veriye dayalı cevap alabiliyor.
- **US-010: PDF Rapor** — Özel print layout ile temiz rapor çıktısı.
- **US-011: Canlıya Alma (Deploy)** — Groq API + Vercel ile canlıya alındı, güvenlik kontrolü eklendi.
- **US-012: Demo Video** — 3 dakikalık demo çekildi.
- **US-013 – US-030:** 18 bonus özellik ve kalite iyileştirmesi (Su Ayak İzi, Rozetler, Sohbet İyileştirmeleri, UI/UX Cilası, Kalite Kontrolleri ve daha fazlası).

## Kullanıcı Geri Bildirimi

Sprint sırasında proje arkadaşlara test ettirildi. Alınan geri bildirimler:
- Sohbet sayfasının verilerle bağlantılı hissetmediği belirtildi → örnek soru önerileri ve veri göstergesi eklendi.
- Samsung/Android cihazlarda karanlık modda yazılar okunmuyordu → CSS önlemleri eklendi.
- "Dosya Yükle" buton isminin kafa karıştırdığı belirtildi → "Sohbet Geçmişini Yükle" olarak güncellendi.
- Harici bir UX/UI raporu alınarak rozet tasarımı, accordion yapısı ve gizlilik metni tutarsızlığı gibi konular düzeltildi.

## Genel Değerlendirme

Sprint 3, planlanandan çok daha kapsamlı bir sprint oldu. 5 planlı US'nin tamamı bitirildi, bunların üzerine 25 bonus özellik ve iyileştirme eklendi. Proje canlıya alındı ve kullanıcı testlerinden geçti.

---

## Ek: Günlük Güncelleme Detayları

### 23 Temmuz
- US-010 (PDF Rapor) tamamlandı.
- Performans iyileştirmesi: Agent Orkestrasyonu paralel çağrılarla hızlandırıldı.
- Bonus özellikler eklendi: Su Ayak İzi Hesaplayıcı, Agent görsel durum göstergeleri.

### 25 Temmuz
- 5 bonus özellik daha eklendi: "Ne Olurdu?" Simülatörü, Yıllık Projeksiyon, Sohbet Hafızası, Su Karşılaştırmaları, Başarı Rozetleri.

### 26 Temmuz
- Kapsamlı test günü, 9+ hata düzeltildi.

### 27 Temmuz
- Deploy planlaması, Groq ve Vercel hesapları oluşturuldu.

### 28 Temmuz
- US-011: Deploy tamamlandı (green-bit-seven.vercel.app).
- Groq API entegrasyonu, güvenlik kontrolü, Analytics ve Speed Insights eklendi.

### 29 Temmuz
- Sayfalar arası veri kaybı çözüldü, sohbet iyileştirildi, rozet/accordion eklendi, gizlilik metni ve skor kalibrasyonu düzeltildi.

### 30 Temmuz
- localStorage taşma hatası düzeltildi, çoklu dosya geçmişi kaldırıldı.

### 31 Temmuz
- Son kontroller, güvenilir olmayan sohbet soruları kaldırıldı.

### 1 Ağustos
- US-012: Demo Video tamamlandı. Sprint 3 kapanış belgeleri güncellendi.