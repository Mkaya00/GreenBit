# Sprint 2 - Sprint Board

**Not:** Bu dosya, Notion'daki canlı Kanban board'un [Notion linki](https://great-colony-435.notion.site/GreenBit-Sprint-Board-398dd1e285178028bf86e87825e031e8) üzerindeki 16 Temmuz 2026 tarihli durumunun statik kaydıdır. Güncel ve etkileşimli board için Notion linkine bakınız.

---

## To Do

- **US-006:** Llama Fine-Tuning (özel model eğitimi) — ekstra hedef
- **US-007:** Öneri Agent'ı (RAG ile bilgi tabanlı öneri sistemi) — ekstra hedef

---

## In Progress

*(--)*

---

## Done

- **REF:** lib/ Refactor
  - `calculateMetricsForModel` ve `parseChatGPTExport` merkezi hale getirildi (`lib/carbon.ts`, `lib/parsers/chatgpt.ts`).
  - Dashboard ve Upload sayfaları bu merkezi modüllerden besleniyor, kod tekrarı ve buna bağlı hesaplama tutarsızlığı giderildi.

- **US-005:** Prompt Verimlilik Analizi
  - Llama 3 (8B) lokal olarak bağlandı, sistem promptu ile "prompt analiz uzmanı" davranışı kazandırıldı.
  - Kullanıcının yüklediği gerçek verilerden prompt çıkarıp analiz eden panel Dashboard'a entegre edildi.
  - Token tasarrufu sayısal tahmini ve kısaltılmış prompt önerisi eklendi.

---

## Sprint 3'e Aktarılanlar

- **US-008:** AI Agent Orkestrasyonu — Sprint 2 süresi RAG/fine-tuning denemelerine ayrıldığından Sprint 3 backlog'una alındı.

---

## Notlar

- Planlamada US-006/007 (fine-tuning, RAG) zorunlu hedeften çıkarılmış, zaman ve kaynak elverdiğince denenecek ekstra hedefler olarak yeniden önceliklendirilmiştir.