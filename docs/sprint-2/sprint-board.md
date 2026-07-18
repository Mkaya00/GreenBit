# Sprint 2 - Sprint Board

**Not:** Bu dosya, Notion'daki canlı Kanban board'un [Notion linki](https://great-colony-435.notion.site/GreenBit-Sprint-Board-398dd1e285178028bf86e87825e031e8) üzerindeki 16 Temmuz 2026 tarihli durumunun statik kaydıdır. Güncel ve etkileşimli board için Notion linkine bakınız.

---

## To Do

- **US-006:** Llama Fine-Tuning (özel model eğitimi)
  - Araştırıldı ve detaylı bir plan çıkarıldı (bkz. [fine-tuning araştırması](fine-tuning-arastirmasi.md)).
  - Gerçekçi süre tahmini 10-16 gün olarak belirlendi; bu, bir sprint'in neredeyse tamamına denk gelmektedir.
  - Risk/fayda değerlendirmesi sonucu bu sprint kapsamı dışında bırakıldı, bağımsız bir öğrenme hedefi olarak planlanmaktadır.
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
  - Sistem promptuna sabit yanıt formatı eklenerek çıktı kalitesi ve tutarlılığı artırıldı.
  - AI cevabından "önerilen prompt" otomatik çıkarılıp kopyalanabilir ayrı bir kutuda gösterilmeye başlandı
 
  - **US-007:** Öneri Agent'ı (RAG)
  - Basitleştirilmiş bir RAG mimarisi uygulandı: `lib/promptRules.ts` içinde yapılandırılmış bir prompt yazma kuralları deposu oluşturuldu (kural adı, açıklama, iyi/kötü örnek).
  - `api/analyze/route.ts` içinde basit bir retrieval mantığı (`getRelevantRules`) kuruldu; kullanıcı promptuna göre ilgili kurallar seçilip modele bağlam (context) olarak veriliyor.
  - Sistem promptuna "sadece verilen bağlama dayan, uydurma" kısıtlaması eklendi.
  - Test edildi: model artık analizlerinde doğrudan kural adlarına ve örneklere atıfta bulunuyor (retrieval'in gerçekten kullanıldığının kanıtı).

*Not: Tam vektör veritabanı (embedding, hibrit arama) kullanılmadı; anahtar kelime tabanlı basit bir retrieval mantığı tercih edildi. Bu, kapsam ve süreye uygun, RAG'ın temel prensiplerini doğru şekilde uygulayan bir yaklaşımdır.*

---

## Ek: Kalite ve Tasarım İyileştirmeleri (17 Temmuz)

Zorunlu User Story'lerin dışında, ürün kalitesini artıran şu çalışmalar tamamlandı:

- Kritik bug düzeltmeleri (sonsuz loading durumu, eksik JSX etiketleri)
- Responsive/mobil tasarım düzeltmeleri
- Edge case testleri (geçersiz dosya formatları)
- Baştan sona tutarlı bir tasarım dili: özel renk paleti, Inter font, lucide-react ikon kütüphanesi

---

## Sprint 3'e Aktarılanlar

- **US-008:** AI Agent Orkestrasyonu — Sprint 2 süresi RAG/fine-tuning denemelerine ayrıldığından Sprint 3 backlog'una alındı.

---

## Notlar

- Planlamada US-006/007 (fine-tuning, RAG) zorunlu hedeften çıkarılmış, zaman ve kaynak elverdiğince denenecek ekstra hedefler olarak yeniden önceliklendirilmiştir.