# Product Backlog — GreenBit

Bu belge, GreenBit projesinin tüm yapılacak işlerini içerir. Önceliklere göre sıralanmıştır.

> **Format:** Her madde bir "user story" şeklinde yazılmıştır.  
> *Kullanıcı olarak [X yapabilmek istiyorum] çünkü [Y sebebiyle].*

---

## Backlog Dağıtma Mantığı

Bu proje tek kişi tarafından yürütüldüğü için önceliklendirme, **"önce çalışan bir temel, sonra üzerine değer katma"** prensibiyle yapıldı. User story'ler 3 sprint'e şu mantıkla dağıtıldı:

**Sprint 1 — Çalışan MVP (Temel):**
Önce ürünün "iskeleti" kuruldu. Kullanıcının bir dosya yükleyip (US-001), sistemin onu okuyup (US-002), karbon hesabı yapıp (US-003) sonucu görselleştirmesi (US-004) — bu dört adım ürünün en temel değer zinciri. Teknik bağımlılık da bunu gerektirdi: parse olmadan hesaplama, hesaplama olmadan dashboard olamaz.

**Sprint 2 — Yapay Zeka Katmanı (Değer):**
Temel MVP çalıştıktan sonra, projeyi öne çıkaracak yapay zeka özellikleri planlandı: prompt analizi (US-005), Llama fine-tuning (US-006), öneri agent'ı/RAG (US-007), agent orkestrasyonu (US-008). Bunlar çalışan bir veri temeli gerektirdiği için Sprint 1 sonrasına bırakıldı.

**Sprint 3 — Cila ve Teslim (Sunum):**
En son, ürünü sunuma hazır hale getirecek işler: sohbet arayüzü (US-009), PDF rapor (US-010), deploy (US-011), demo video (US-012). Ayrıca sprint sırasında fark edilen ihtiyaçlarla bonus özellikler eklendi (US-013, US-014, US-015). Deploy, yarım değil olgun bir ürünü yayınlamak adına bilinçli olarak sona bırakıldı.

**Önceliklendirme kriterleri:**
1. **Teknik bağımlılık:** Bir özellik başkasına muhtaçsa, önce temel olan yapıldı.
2. **Değer zinciri:** Kullanıcıya en temel faydayı veren çekirdek akış önce kuruldu.
3. **Puan ağırlığı:** Yüksek puanlı AI öğeleri, sağlam bir temel üstüne inşa edilecek şekilde konumlandırıldı.

---

## Yüksek Öncelik (Sprint 1)

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
**Sprint 1 gerçekleşme:** Green Algorithms metodolojisiyle model bazlı kWh ve CO2 hesabı yapılıyor. Kahve, ampul, telefon ve ağaç eşdeğeri metrikleri türetiliyor. Token tahmini şu an sabit ortalama (200 token/mesaj) ile yapılıyor.

**Kabul kriterleri:**
- Token sayısı tahmin edilir
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

## Orta Öncelik (Sprint 2)

### US-005: Prompt Verimlilik Analizi
**Kullanıcı olarak** hangi prompt'larımın verimsiz olduğunu öğrenmek istiyorum,  
**çünkü** daha iyi yazmayı öğrenmek istiyorum.
**Sprint 2 gerçekleşme:** Llama 3 (8B) lokal olarak entegre edildi. Kullanıcının yüklediği gerçek verilerden prompt'lar çıkarılıp analiz ediliyor; açıklık, token verimliliği ve rol tanımlama gibi kriterlere göre yapılandırılmış geri bildirim veriliyor. Somut, kopyalanabilir bir "önerilen prompt" de üretiliyor.

### US-006: Llama Fine-Tuning
**Sistem olarak** prompt verimliliği için özel bir model eğitmek istiyorum,  
**çünkü** ince ayarlı, alana özel öneriler vermem gerekiyor.
**Sprint 2 gerçekleşme:** Süreç detaylı araştırıldı (veri hazırlama, LoRA, Hugging Face); gerçekçi süre tahmini 10-16 gün olarak belirlendi. Bu süre tek sprint'e sığmadığından, bilinçli bir kapsam kararıyla ertelendi.

### US-007: Öneri Agent'ı (RAG)
**Kullanıcı olarak** kişiselleştirilmiş optimizasyon önerileri almak istiyorum,  
**çünkü** karbonumu azaltacak somut adımlar lazım.
**Sprint 2 gerçekleşme:** Basitleştirilmiş bir RAG mimarisi kuruldu: yapılandırılmış bir prompt kuralları deposu, kullanıcı sorgusuna göre ilgili kuralları getiren bir retrieval mekanizması ve modelin yalnızca sağlanan bağlama dayanmasını sağlayan bir kısıtlama. Test edildi ve doğrulandı.

### US-008: AI Agent Orkestrasyonu
**Sistem olarak** birden fazla agent'ı koordine edebilmek istiyorum,  
**çünkü** karmaşık görevleri verimli bölmem gerekiyor.
**Sprint 2 gerçekleşme:** Sprint 2 kapsamında ele alınmadı; Sprint 3 backlog'una aktarıldı.
**Sprint 3 gerçekleşme:** Prompt analiz, model önerisi ve verimlilik skorunu koordine eden bir orkestrasyon sistemi kuruldu. Üç "alt agent" tek bir birleşik raporda sunuluyor. Daha sonra paralel API çağrılarıyla (US-015) hızlandırıldı.

---

## Düşük Öncelik (Sprint 3)

### US-009: Sohbet Arayüzü
**Kullanıcı olarak** doğal dilde sorularımı sormak istiyorum,  
**çünkü** dashboard'a bakmak yerine konuşmak daha kolay.
**Sprint 3 gerçekleşme:** Kullanıcı, yüklediği verisi hakkında doğal dilde soru sorup, gerçek veriye dayalı cevap alabiliyor.

### US-010: PDF Rapor
**Kullanıcı olarak** raporumu PDF olarak indirebilmek istiyorum,  
**çünkü** paylaşmak veya saklamak istiyorum.
**Sprint 3 gerçekleşme:** Print-özel CSS ile, navigation ve butonlar gizlenerek temiz bir rapor çıktısı sağlandı; tarayıcının "PDF olarak kaydet" özelliğiyle indirilebiliyor.

### US-011: Canlıya Alma
**Sistem olarak** projemin canlıda erişilebilir olmasını istiyorum,  
**çünkü** herkesin erişebilmesi gerekiyor.
**Durum:** Devam ediyor. Öncelik: Oracle Cloud Always Free; yedek planlar: Groq API, ücretli VPS.

### US-012: Demo Video
**Tanıtım olarak** 3 dakikalık demo video çekilmek istiyorum,  
**çünkü** bootcamp teslimi için zorunlu.
**Durum:** Planlanıyor, diğer işler bitince yapılacak.

### US-013: Su Ayak İzi Hesaplayıcı
**Kullanıcı olarak** AI kullanımımın su tüketimini de görmek istiyorum,  
**çünkü** karbon dışında su da önemli bir çevresel kaynak.
**Sprint 3 gerçekleşme:** Planlanmamış, sprint sırasında eklenen bir bonus özellik. Enerji tüketiminden yola çıkarak (1 kWh ≈ 1.8 litre su) tahmini su tüketimi hesaplanıp Dashboard ve Upload sonuç ekranına eklendi.

### US-014: Agent Orkestrasyonu Görsel Durum Göstergeleri
**Kullanıcı olarak** agent analizinin hangi aşamada olduğunu görmek istiyorum,  
**çünkü** sürecin şeffaf olmasını istiyorum.
**Sprint 3 gerçekleşme:** Planlanmamış, sprint sırasında eklenen bir bonus özellik. 3 agent'ın çalışma durumunu gösteren ikonlu, animasyonlu kutular eklendi.

### US-015: Performans İyileştirmesi (Agent Paralelleştirme)
**Sistem olarak** agent analizini daha hızlı tamamlamak istiyorum,  
**çünkü** kullanıcı deneyimi bekleme süresinden olumsuz etkileniyor.
**Sprint 3 gerçekleşme:** Planlanmamış, kullanıcı geri bildirimiyle fark edilen bir iyileştirme. İki agent çağrısı `Promise.all` ile paralelleştirilerek toplam süre yaklaşık yarıya indirildi.

---

## Sprint Hedefleri Özeti

- **Sprint 1:** US-001, US-002, US-003, US-004 → Çalışan MVP
- **Sprint 2:** US-005, US-006, US-007 (US-008 ertelendi) → AI gücüyle akıllandırma  
- **Sprint 3:** US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015 → Teslim + bonus özellikler