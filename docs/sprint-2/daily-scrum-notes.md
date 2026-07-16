# Sprint 2 - Daily Scrum Notes

## 10 Temmuz 2026 (Perşembe)

**Dün ne yapıldı:** Sprint 1 tamamlandı, Sprint 2 planlaması yapıldı.

**Bugün ne yapıldı:**
- lib/ refactor tamamlandı: dashboard, upload ve parser artık `lib/carbon.ts` ve `lib/parsers/chatgpt.ts` üzerinden tek merkezden besleniyor. Kod tekrarı giderildi, upload ve dashboard arasındaki hesaplama tutarsızlığı da bu sırada tespit edilip düzeltildi.
- Ollama ve Llama 3 kavramları öğrenildi, lokal ortamda test edildi (`ollama run`, terminal üzerinden ilk cevaplar alındı).

**Engeller:** Import yollarında (`@/lib/carbon` vs göreceli yol) klasör yapısı kaynaklı hatalar yaşandı, çözüldü.

---

## 11 Temmuz 2026 (Cuma)

**Dün ne yapıldı:** lib refactor + Ollama/Llama kavramsal öğrenme.

**Bugün ne yapıldı:**
- İlk backend parçası: `api/analyze/route.ts` (API Route) oluşturuldu. Next.js API Route ile Ollama'ya bağlanan bir "köprü" kuruldu.
- Sistem promptu eklendi: Llama 3, genel amaçlı bir asistandan "prompt analiz uzmanı"na dönüştürüldü.
- Türkçe çıktı kalitesi için model `llama3.2` (3B) yerine `llama3.1` (8B) olarak güncellendi.
- Kullanıcının yüklediği gerçek ChatGPT verilerinden prompt'ları ayıklayıp analiz eden mantık kuruldu.
- UX kararı: Analiz ayrı bir sayfada değil, doğrudan Dashboard içine panel olarak entegre edildi (kullanıcı akışının bölünmemesi için). Ayrı sayfa (`/analyze-page`) ise manuel prompt test aracı olarak sadeleştirildi.
- Navigasyon menüsüne "AI Analiz" bağlantısı eklendi.

**Engeller:** Yok, US-005'in temel işlevi bu gün itibarıyla çalışır durumda.

---

## 13 Temmuz 2026 (Pazartesi)

**Not:** 12 Temmuz (Pazar) günü çalışmaya ara verildi.

**Son çalışılan gün (11 Temmuz, Cuma):** US-005 temel işlevi tamamlandı.

**Bugün ne yapıldı:**
- Sprint 2 Scrum dokümanları (daily scrum notes, sprint board) güncellendi.
- README dosyası Sprint 2 kapsamındaki AI özellikleriyle güncellendi.

**Not:** Değerlendirme sürecinde final sunumunun yalnızca ilk 10'a kalan projelerde yapılacağı öğrenildi. Bu nedenle strateji, dokümantasyonun ve mevcut çalışan özelliklerin sağlamlaştırılmasına ağırlık verecek şekilde güncellendi; RAG ve fine-tuning zorunlu hedeften çıkarılıp "zaman kalırsa denenecek" ekstra hedefe alındı.

---

## 16 Temmuz 2026 (Perşembe)

**Not:** 14-15 Temmuz günlerinde çalışmaya ara verildi.

**Son çalışılan gün (13 Temmuz, Pazartesi):** Sprint 2 dokümanları ve README güncellendi.

**Bugün ne yapıldı:**
- Proje sağlamlık testi yapıldı; tüm özellikler (Ollama, dashboard, AI analiz paneli, manuel test sayfası) çalışır durumda doğrulandı.
- README'ye kullanım/katkı notu eklendi; yanlışlıkla yazılmış kurum bağlantısı (Sakarya Üniversitesi) düzeltildi.
- Notion board güncellendi: US-005 In Progress'ten Done'a taşındı, ekran görüntüsü alındı.
- Sprint 2 Review ve Retrospective belgeleri dolduruldu.
- US-008 (AI Agent Orkestrasyonu) Sprint 3 backlog'una aktarıldı.

**Sıradaki:** RAG (US-007) denemesi ile devam edilecek, ardından zaman kalırsa fine-tuning (US-006) denenecek.

**Engeller:** Yok.