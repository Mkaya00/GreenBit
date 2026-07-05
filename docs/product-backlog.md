# Product Backlog — GreenBit

Bu belge, GreenBit projesinin tüm yapılacak işlerini içerir. Önceliklere göre sıralanmıştır.

> **Format:** Her madde bir "user story" şeklinde yazılmıştır.  
> *Kullanıcı olarak [X yapabilmek istiyorum] çünkü [Y sebebiyle].*

---

##  Yüksek Öncelik (Sprint 1)

### US-001: Dosya Yükleme
**Kullanıcı olarak** ChatGPT/Claude export dosyamı yükleyebilmek istiyorum,  
**çünkü** AI kullanımımı analiz ettirmek istiyorum.
**Sprint 1 gerçekleşme:** JSON formatı desteği, 50MB boyut sınırı, format doğrulama ve hata bildirimi tamamlandı. Ayrıca sürükle-bırak (drag & drop) özelliği eklendi. ZIP/CSV desteği ve progress bar Sprint 2'ye planlandı.

**Kabul kriterleri:**
- ZIP, JSON, CSV formatları desteklenir
- Dosya boyutu maksimum 50MB
- Yükleme sırasında progress bar gösterilir
- Hatalı format durumunda kullanıcı bilgilendirilir

### US-002: Dosya Parse
**Sistem olarak** yüklenen dosyayı analiz edebilmek istiyorum,  
**çünkü** içindeki konuşma verilerini çıkarmam gerekiyor.
**Sprint 1 gerçekleşme:** ChatGPT conversations.json parse ediliyor; konuşma sayısı, model dağılımı, tarih aralığı ve mesaj sayısı çıkarılıyor. Parse hataları try/catch ile yakalanıp kullanıcıya bildiriliyor.

**Kabul kriterleri:**
- ChatGPT `conversations.json` parse edilir
- Konuşma sayısı, model, tarih, mesaj uzunlukları çıkarılır
- Parse hataları loglanır

### US-003: Karbon Hesaplama
**Sistem olarak** her konuşmanın enerji ve karbon değerini hesaplayabilmek istiyorum,  
**çünkü** kullanıcıya net rakam göstermem gerekiyor.
**Sprint 1 gerçekleşme:** Green Algorithms metodolojisiyle model bazlı kWh ve CO2 hesabı yapılıyor. Kahve, ampul, telefon ve ağaç eşdeğeri metrikleri türetiliyor. Token tahmini şu an sabit ortalama (200 token/mesaj) ile yapılıyor; gerçek sayım için tiktoken entegrasyonu Sprint 2'ye planlandı.

**Kabul kriterleri:**
- Token sayısı tahmin edilir (tiktoken veya benzeri)
- Model bazlı kWh formülü uygulanır (Green Algorithms metodolojisi)
- CO2 eşdeğeri hesaplanır
- Ağaç eşdeğeri gibi anlaşılır metrikler türetilir

### US-004: Temel Dashboard
**Kullanıcı olarak** AI kullanımımın özetini görsel olarak görmek istiyorum,  
**çünkü** durumumu hızlıca anlamak istiyorum.

**Kabul kriterleri:**
- Toplam token, kWh, CO2 kartları
- Zaman serisi grafiği (Recharts)
- Model dağılımı pie chart
- Sade ve okunabilir tasarım

---

##  Orta Öncelik (Sprint 2)

### US-005: Prompt Verimlilik Analizi
**Kullanıcı olarak** hangi prompt'larımın verimsiz olduğunu öğrenmek istiyorum,  
**çünkü** daha iyi yazmayı öğrenmek istiyorum.

### US-006: Llama Fine-Tuning
**Sistem olarak** prompt verimliliği için özel bir model eğitmek istiyorum,  
**çünkü** ince ayarlı, alana özel öneriler vermem gerekiyor.

### US-007: Öneri Agent'ı (RAG)
**Kullanıcı olarak** kişiselleştirilmiş optimizasyon önerileri almak istiyorum,  
**çünkü** karbonumu azaltacak somut adımlar lazım.

### US-008: AI Agent Orkestrasyonu
**Sistem olarak** birden fazla agent'ı koordine edebilmek istiyorum,  
**çünkü** karmaşık görevleri verimli bölmem gerekiyor.

---

##  Düşük Öncelik (Sprint 3)

### US-009: Sohbet Arayüzü
**Kullanıcı olarak** doğal dilde sorularımı sormak istiyorum,  
**çünkü** dashboard'a bakmak yerine konuşmak daha kolay.

### US-010: PDF Rapor
**Kullanıcı olarak** raporumu PDF olarak indirebilmek istiyorum,  
**çünkü** paylaşmak veya saklamak istiyorum.

### US-011: Canlıya Alma
**Sistem olarak** Vercel'e deploy edilmek istiyorum,  
**çünkü** herkesin erişebilmesi gerekiyor.

### US-012: Demo Video
**Tanıtım olarak** 3 dakikalık demo video çekilmek istiyorum,  
**çünkü** bootcamp teslimi için zorunlu.

---

## Sprint Hedefleri Özeti

- **Sprint 1:** US-001, US-002, US-003, US-004 → Çalışan MVP
- **Sprint 2:** US-005, US-006, US-007, US-008 → AI gücüyle akıllandırma  
- **Sprint 3:** US-009, US-010, US-011, US-012 → Teslim