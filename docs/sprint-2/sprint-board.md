# Sprint 2 - Sprint Board

**Not:** Bu dosya, Notion'daki canlı Kanban board'un [buraya Notion linkini ekle] belirli bir andaki (13 Temmuz 2026) durumunun statik kaydıdır. Güncel ve etkileşimli board için Notion linkine bakınız.

---

## To Do

- **US-006:** Llama Fine-Tuning (özel model eğitimi)
- **US-007:** Öneri Agent'ı (RAG ile bilgi tabanlı öneri sistemi)
- **US-008:** AI Agent Orkestrasyonu

---

## In Progress

- **US-005:** Prompt Verimlilik Analizi
  - Temel işlev tamamlandı: Llama 3 (8B) lokal olarak bağlandı, sistem promptu ile "prompt analiz uzmanı" davranışı kazandırıldı, kullanıcının yüklediği gerçek verilerden prompt çıkarıp analiz eden panel Dashboard'a entegre edildi.
  - Devam eden geliştirmeler: token tasarrufu sayısal göstergesi, model öneri sistemi, sistem promptunun netleştirilmesi.

---

## Done

- **REF:** lib/ Refactor
  - `calculateMetricsForModel` ve `parseChatGPTExport` merkezi hale getirildi (`lib/carbon.ts`, `lib/parsers/chatgpt.ts`).
  - Dashboard ve Upload sayfaları bu merkezi modüllerden besleniyor, kod tekrarı ve buna bağlı hesaplama tutarsızlığı giderildi.

---

## Notlar

- Değerlendirme sürecinde final sunumunun yalnızca ilk 10'a kalan projelerde yapılacağı öğrenilmiştir. Bu doğrultuda US-006/007/008 (fine-tuning, RAG, agent orkestrasyonu) zorunlu hedeften çıkarılmış, zaman ve kaynak elverdiğince denenecek ekstra hedefler olarak yeniden önceliklendirilmiştir. Öncelik, US-005'in sağlamlaştırılması ve dokümantasyonun güçlendirilmesine verilmiştir.