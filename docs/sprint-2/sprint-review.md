# Sprint 2 - Review

**Sprint Süresi:** 6 Temmuz 2026 – 19 Temmuz 2026
**Review Tarihi:** 16 Temmuz 2026

---

## Sprint Hedefi (Hatırlatma)

GreenBit'e yapay zeka gücü katmak — Llama 3'ü lokal entegre etmek, prompt verimlilik analizi yapmak ve mümkünse fine-tuning ile özelleştirmek.

---

## Tamamlanan İşler 

### REF — lib/ Refactor
Dashboard, upload ve parser modüllerindeki kod tekrarı giderildi. Tüm karbon hesaplama ve veri ayrıştırma mantığı `lib/carbon.ts` ve `lib/parsers/chatgpt.ts` üzerinden tek merkezden yönetiliyor. Bu süreçte, upload ve dashboard arasında var olan gizli bir hesaplama tutarsızlığı da tespit edilip düzeltildi.

### US-005 — Prompt Verimlilik Analizi
- Ollama üzerinden lokal Llama 3 (başlangıçta 3B, Türkçe kalitesi nedeniyle 8B'ye yükseltildi) projeye entegre edildi.
- `api/analyze/route.ts` ile ilk backend bileşeni (API Route) oluşturuldu.
- Sistem promptu ile model "genel amaçlı asistan"dan "prompt analiz uzmanı"na dönüştürüldü.
- Kullanıcının yüklediği gerçek ChatGPT verisinden promptlar otomatik ayıklanıp analiz ediliyor.
- Analiz sonucuna somut token tasarrufu tahmini ve kısaltılmış prompt önerisi eklendi.
- UX kararı: Analiz, ayrı bir sayfa yerine doğrudan Dashboard'a gömülü bir panel olarak sunuluyor (kullanıcı akışının bölünmemesi için); ayrı `/analyze-page` ise manuel prompt test aracı olarak korunuyor.

---

## Tamamlanmayan / Ertelenen İşler

### US-006 — Llama Fine-Tuning
Sprint planlamasında "iddialı hedef" olarak işaretlenmişti. Değerlendirme sürecinde final sunumunun yalnızca ilk 10 projeye yapılacağı öğrenildi; bu nedenle öncelik, mevcut özelliklerin sağlamlaştırılması ve dokümantasyona kaydırıldı. Fine-tuning, kalan sprint süresinde zaman elverdiğince denenecek bir öğrenme hedefi olarak planlanıyor.

### US-007 — Öneri Agent'ı (RAG)
Aynı gerekçeyle ertelendi; zorunlu teslimat kapsamından çıkarıldı.

### US-008 — AI Agent Orkestrasyonu
Henüz başlanmadı. Sprint 2'nin kalan süresi RAG ve fine-tuning denemelerine ayrıldığından, bu iş kalemi Sprint 3 backlog'una aktarıldı.

---

## Gösterilebilir Çıktı (Demo Niteliğinde)

- Kullanıcı ChatGPT export dosyasını yükler.
- Dashboard'da karbon/enerji/token metrikleri ve zaman serisi grafiği görüntülenir.
- "Verilerimi Analiz Et" butonuyla, kullanıcının gerçek promptları lokal Llama 3 tarafından analiz edilir; açıklık, uzunluk ve token tasarrufu üzerine somut, Türkçe geri bildirim sunulur.

---

## Notlar

Sprint hedefinin temel ve orta katmanları (Katman 1 ve 2) tam olarak tamamlandı. İleri katman (Katman 3 — fine-tuning/RAG) stratejik bir kararla ekstra hedefe alındı; bu değişiklik `sprint-board.md` içinde de belgelenmiştir.