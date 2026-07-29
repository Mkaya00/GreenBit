**Not:** 20-21 Temmuz günlerinde çalışmaya ara verildi.


## 22 Temmuz 2026 (Çarşamba)

**Son çalışılan gün (19 Temmuz):** Sprint 2 teslim edildi, mentörden 6/6 tam puan alındı.

**Bugün ne yapıldı:**
- Agent Orkestrasyonu (US-008) tamamlandı: prompt analiz, model önerisi ve verimlilik skorunu koordine eden bir sistem kuruldu.
- `lib/carbon.ts`'teki model enerji tablosunun güncel olmadığı (gpt-5 serisi modelleri tanımadığı) fark edildi; isim tabanlı akıllı tahmin mantığı (`estimateEnergyRate`) eklenerek düzeltildi.
- Sohbet Arayüzü (US-009) tamamlandı: kullanıcı, verisi hakkında doğal dilde soru sorup cevap alabiliyor.
- Loading mesajları iki panel arasında tutarlı hale getirildi.
- Notion board'a Sprint 3 bölümü eklendi, ekran görüntüsü alındı.

**Engeller:** Yok.

## 23 Temmuz 2026 (Perşembe)

**Son çalışılan gün (22 Temmuz):** Agent Orkestrasyonu ve Sohbet Arayüzü tamamlandı.

**Bugün ne yapıldı:**
- US-010 (PDF Rapor) tamamlandı: print-özel CSS ile temiz, profesyonel rapor çıktısı sağlandı.
- Agent Orkestrasyonu, paralel API çağrılarıyla (`Promise.all`) hızlandırıldı.
- Dashboard'daki AI Analiz paneli, daha temsili bir örnekleme (baş/orta/son prompt) yapacak şekilde geliştirildi; kullanıcıya analiz kapsamı hakkında şeffaf bir not eklendi.
- Bonus: Su Ayak İzi Hesaplayıcı eklendi — enerji tüketiminden yola çıkarak veri merkezi su tüketimini tahmin eden bir metrik, hem Dashboard hem Upload sonuç ekranına entegre edildi.
- Bonus: Agent Orkestrasyonu için görsel durum göstergeleri eklendi (3 agent'ın çalışma durumunu gösteren ikonlu kutular).

**Engeller:** Yok.

## 25 Temmuz 2026 (Cumartesi)

**Son çalışılan gün (23 Temmuz):** PDF Rapor, hız iyileştirmesi, Su Ayak İzi ve Agent Görselleştirme tamamlandı.

**Bugün ne yapıldı:**
- "Ne Olurdu?" Simülatörü eklendi: kullanıcının mevcut kullanımını en verimli model senaryosuyla karşılaştırıyor.
- Yıllık Projeksiyon eklendi: mevcut kullanım hızına göre 1 yıllık CO2 tahmini.
- Sohbet Arayüzüne hafıza eklendi: önceki mesajlar artık dikkate alınıyor.
- Su tüketimi için somut karşılaştırmalar eklendi (bardak, duş).
- Başarı Rozetleri eklendi: kullanım desenine göre otomatik kazanılan rozetler.
- Bonus: Verimlilik Skoru artık Agent Orkestrasyonu çalıştırılmadan, anında dashboard'da gösteriliyor.
**Ayrıca aynı gün eklenen 5 UI/UX iyileştirmesi:**
- Scroll-to-top butonu (uzun sayfada hızlı üste dönüş)
- Kartlara fade-in giriş animasyonu
- Hamburger mobil menü (küçük ekranlarda)
- Dashboard'a hızlı gezinme menüsü (Özet/Grafikler/AI Analiz/Ekstra)
- İskelet (skeleton) yükleme ekranı

**Engeller:** Kod ekleme sırasında birkaç kopyala-yapıştır karışıklığı yaşandı (hesaplama/görsel kodlarının yanlış yere yerleşmesi); adım adım kontrol ederek düzeltildi.

## 26 Temmuz 2026 (Pazar)

**Son çalışılan gün (25 Temmuz):** 6 yeni özellik + 5 UI iyileştirmesi tamamlandı.

**Bugün ne yapıldı:**
- Kapsamlı test günü: tüm sayfalar, tüm özellikler tek tek test edildi.
- Test dosyalarıyla (düşük verimlilik + yüksek verimlilik senaryoları) tüm hesaplamalar elle doğrulandı — token, enerji, CO2, su tüketimi, verimlilik skoru, "Ne Olurdu?" simülatörü, yıllık projeksiyon, rozetler; hepsi matematiksel olarak doğru bulundu.
- Bulunan ve düzeltilen hatalar:
  - Ana sayfa metni güncellendi (su tüketimi eklendiği belirtildi).
  - Sitede yumuşak kaydırma (smooth scroll) davranışı eklendi.
  - Kopyala butonlarına görsel geri bildirim eklendi (Dashboard ve Analyze-page).
  - Sohbet gönder butonunun şekli düzeltildi (tam yuvarlak).
  - Önerilen prompt çıkarma mantığı (regex), çok satırlı cevaplarda çalışmadığı fark edilip daha esnek hale getirildi.
  - AI cevaplarındaki markdown yıldızları ve madde işaretleri, dört farklı gösterim noktasında (AI Analiz, Agent Orkestrasyonu'nun iki kartı, Analyze-page) temizlendi.
  - Verimlilik Skoru'na, skor seviyesine göre teşvik edici/yönlendirici bir mesaj eklendi.
- Mobil görünüm (Navigation, Upload sonuç ekranı, Dashboard) kontrol edildi, sorunsuz bulundu.

**Engeller:** Yok.


## 27 Temmuz 2026 (Pazartesi)

**Son çalışılan gün (26 Temmuz):** Kapsamlı test günü tamamlandı, 9+ küçük hata düzeltildi.

**Bugün ne yapıldı:**
- Deploy planlaması yapıldı: Groq ve Vercel hesapları oluşturuldu.
- Deploy güvenliği üzerine değerlendirme yapıldı (API kötüye kullanımı, kota riskleri tartışıldı).

**Engeller:** Yok.

## 28 Temmuz 2026 (Salı)

**Son çalışılan gün (27 Temmuz):** Deploy planlaması ve hesap kurulumları tamamlandı.

**Bugün ne yapıldı:**
- **US-011: Deploy TAMAMLANDI.** Proje Vercel'e deploy edildi (green-bit-seven.vercel.app).
- Kodda Ollama'dan Groq API'ye geçiş yapıldı: ortak bir `callLLM` fonksiyonu yazılarak, lokal ortamda Ollama, canlı ortamda Groq otomatik olarak kullanılacak şekilde tasarlandı.
- Groq API anahtarı Vercel ortam değişkenlerine eklendi; model adı güncellendi (`openai/gpt-oss-120b`).
- Vercel Web Analytics ve Speed Insights entegre edildi.
- `robots.txt` eklenerek site arama motorlarından gizlendi.
- API Route'lara host tabanlı güvenlik kontrolü eklendi, test edilip doğrulandı.

**Engeller:** İlk güvenlik kontrolü denemesi yanlış yapılandırma nedeniyle canlı siteyi geçici olarak bozdu; `host` header tabanlı daha sağlam bir yönteme geçilerek çözüldü.

## 29 Temmuz 2026 (Çarşamba)

**Son çalışılan gün (28 Temmuz):** Deploy tamamlandı, güvenlik kontrolü doğrulandı.

**Bugün ne yapıldı:**
- **Kritik mimari düzeltme:** Sayfalar arası veri kaybı sorunu çözüldü (Sohbet, AI Analiz, Agent Orkestrasyonu, Upload sonuçları artık kalıcı).
- Sohbet deneyimi iyileştirmeleri: örnek soru önerileri, veri göstergesi, dosya adı, temizle butonu.
- Sohbet veri doğruluğu düzeltmesi: su tüketimi, CO2, gün aralığı, yıllık projeksiyon artık gerçek değerlerle hesaplanıp gönderiliyor.
- Hydration hatası düzeltildi.
- Android/karanlık mod uyumluluğu için önlem eklendi.
- UI/UX cilası: analiz sonuçları renkli rozetlere (badge) dönüştürüldü, uzun açıklamalar accordion yapısına alındı.
- Floating "Sohbete Git" butonu eklendi.
- Ana sayfa doğruluk düzeltmesi: yanlış "Claude" ifadeleri kaldırıldı, gelecek platform roadmap notu eklendi.
- Geçmiş Analizler özelliği ve Çoklu dosya geçmişi özellikleri eklendi.

**Engeller:** Kod ekleme sırasında birkaç kez React Hooks kuralı yanlışlıkla ihlal edildi, fark edilip düzeltildi.