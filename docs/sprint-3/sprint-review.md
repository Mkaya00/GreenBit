# Sprint 3 - Review (Devam Ediyor)

## Tamamlanan İşler (22 Temmuz itibarıyla)

- **US-008: AI Agent Orkestrasyonu** — Prompt analiz, model önerisi ve verimlilik skorunu koordine eden bir orkestrasyon sistemi kuruldu. Üç "alt agent" tek bir birleşik raporda sunuluyor.
- **US-009: Sohbet Arayüzü** — Kullanıcı, yüklediği verisi hakkında doğal dilde soru sorup, gerçek veriye dayalı cevap alabiliyor.
- **Yan iyileştirme:** Model enerji hesaplama tablosu, gelecekteki/bilinmeyen modelleri de akıllıca tahmin edecek şekilde güncellendi.

## Devam Eden/Planlanan

- US-010: PDF Rapor
- US-011: Canlıya Alma (Deploy) — Oracle Cloud denemesi sürüyor, Groq/VPS yedek planları belirlendi.
- US-012: Demo Video

## 23 Temmuz Güncellemesi

- US-010 (PDF Rapor) tamamlandı.
- Performans iyileştirmesi: Agent Orkestrasyonu paralel çağrılarla hızlandırıldı.
- Analiz kapsamı şeffaflaştırıldı (temsili örnekleme + açıklayıcı not).
- Bonus özellikler eklendi: Su Ayak İzi Hesaplayıcı, Agent görsel durum göstergeleri.

## 25 Temmuz Güncellemesi

- 5 bonus özellik daha eklendi: "Ne Olurdu?" Simülatörü, Yıllık Projeksiyon, Sohbet Hafızası, Su Karşılaştırmaları, Başarı Rozetleri.
- Verimlilik Skoru artık anında (buton beklemeden) gösteriliyor.

## 26 Temmuz Güncellemesi

- Kapsamlı test günü: tüm sayfalar ve özellikler sistematik olarak test edildi, iki farklı senaryoyla (düşük/yüksek verimlilik) hesaplamalar doğrulandı.
- 9'dan fazla küçük hata (metin, regex, görsel tutarlılık) bulunup düzeltildi.
- Verimlilik Skoru'na teşvik edici mesaj eklendi.
- Hesaplama Metodolojisi belgesine su tüketimi bölümü eklendi.

## 27 Temmuz Güncellemesi

- Deploy planlaması yapıldı: Groq ve Vercel hesapları oluşturuldu.

## 28 Temmuz Güncellemesi

- **US-011: Deploy tamamlandı.** Proje canlıya alındı (green-bit-seven.vercel.app).
- Groq API entegrasyonu, güvenlik kontrolü, Web Analytics ve Speed Insights eklendi.

## 29 Temmuz Güncellemesi

- Kritik mimari düzeltme: sayfalar arası veri kaybı sorunu çözüldü.
- Sohbet deneyimi ve veri doğruluğu iyileştirildi.
- UI/UX cilası: rozet/badge tasarımı ve accordion eklendi (harici bir UX raporu doğrultusunda).
- Ana sayfa doğruluk düzeltmesi (Claude ifadesi kaldırıldı, roadmap notu eklendi).
- Geçmiş Analizler ve Çoklu Dosya Geçmişi özellikleri eklendi.