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
- RAG (US-007) denendi ve başarıyla tamamlandı: `lib/promptRules.ts` içinde yapılandırılmış bir prompt kuralları deposu oluşturuldu; `api/analyze/route.ts` içinde bu depodan ilgili kuralları getiren basit bir retrieval mantığı kuruldu. Test sonucunda model, analizlerinde doğrudan kural adlarına ve örneklere atıfta bulunarak cevap üretti.
- Fine-tuning (US-006) araştırıldı: gerekli adımlar (veri hazırlama, ortam kurulumu, LoRA eğitimi, Ollama entegrasyonu) ve gerçekçi süre tahmini (10-16 gün) belgelendi. Süre kısıtı nedeniyle bu sprint'te uygulanmaması, bilinçli bir kapsam kararı olarak kaydedildi.

**Sıradaki:** Zaman kalırsa fine-tuning (US-006) denenecek; aksi halde Sprint 2 kapanış hazırlıkları yapılacak.

**Engeller:** Yok.

---

## 17 Temmuz 2026 (Cuma)

**Son çalışılan gün (16 Temmuz):** RAG (US-007) tamamlandı, fine-tuning araştırması yapıldı.

**Bugün ne yapıldı:**
- Dashboard'da kritik bir bug tespit edilip düzeltildi: eksik bir `useEffect` nedeniyle sayfa sonsuza kadar "Yükleniyor..." durumunda kalıyordu.
- `handleAiAnalysis` fonksiyonundaki hatalı `return` kullanımı nedeniyle oluşabilecek sonsuz loading riski giderildi.
- AI analizi için animasyonlu loading ekranı eklendi (dönen spinner + rastgele eğitici mesajlar).
- Responsive/mobil tasarım testi yapıldı; navigation menüsünün taştığı, dashboard başlığının kayıp olduğu, özet kartlarının sıkıştığı tespit edilip düzeltildi.
- İki edge case testi yapıldı (geçersiz dosya formatı, uyumsuz JSON), ikisi de beklenen hata mesajlarını doğru gösterdi.
- Proje genelinde kapsamlı bir tasarım yenilemesi yapıldı: Inter font, özel renk paleti (#1B4332), lucide-react ikon kütüphanesi (emoji yerine) tüm sayfalarda (Navigation, Ana Sayfa, Upload, Dashboard, Analyze-Page) uygulandı.
- AI analiz sisteminin çıktı kalitesi iyileştirildi: sistem promptuna sabit bir yanıt formatı ("Uyum / Açıklama / Öneri") eklendi, modelin uydurma örnek üretmesi engellendi.
- AI analiz sonucundan otomatik "önerilen prompt" çıkarıp ayrı, kopyalanabilir bir kutuda gösteren özellik eklendi.

**Engeller:** Kod düzenleme sırasında tekrarlayan bir kopyala-yapıştır sorunu (`<a>` etiketinin kaybolması) yaşandı; kalıcı çözüm olarak projede `<a>` yerine Next.js `<Link>` bileşeni kullanılması standart hale getirildi.

---

## 18 Temmuz 2026 (Cumartesi)

**Son çalışılan gün (17 Temmuz):** Kritik bug düzeltmeleri, responsive düzeltmeler, edge case testleri ve kapsamlı UI/UX yenilemesi tamamlandı.

**Bugün ne yapıldı:**
- Sprint 2 dokümantasyonu 17 Temmuz'daki gelişmelerle güncellendi.
- Sprint 2'nin genel son kontrolü için hazırlık yapılıyor (sprint bitişi: 19 Temmuz).

**Engeller:** Yok.