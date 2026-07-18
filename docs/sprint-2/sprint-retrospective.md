# Sprint 2 - Retrospective

**Sprint Süresi:** 6 Temmuz 2026 – 19 Temmuz 2026
**Retrospective Tarihi:** 16 Temmuz 2026

---

## Neler İyi Gitti? 

- **Refactor disiplini:** lib/ klasörüne geçiş, kod tekrarını tamamen ortadan kaldırdı ve bu süreçte gizli bir hesaplama tutarsızlığı da tespit edilip düzeltildi. Yeni özellik eklemeden önce teknik borcu ödemek doğru bir sıralama oldu.
- **Kademeli AI entegrasyonu:** Fine-tuning veya RAG gibi karmaşık yöntemlere atlamadan önce sistem promptu ile basit ama etkili bir çözüm denendi ve başarılı oldu. Bu, riski düşük tutan akıllı bir yaklaşımdı.
- **UX'e duyarlılık:** Analiz özelliğinin ayrı bir sayfada kullanıcı akışını bozduğu fark edilip Dashboard'a entegre edilmesi, teknik doğruluğun yanında kullanıcı deneyimine de önem verildiğini gösterdi.
- **Strateji esnekliği:** Değerlendirme kriterlerinin (sunumun yalnızca ilk 10'a yapılacağı) öğrenilmesi üzerine öncelikler gerçekçi biçimde yeniden sıralandı; ekstra hedefler (fine-tuning, RAG, agent) zorunluluktan çıkarılıp öğrenme hedefine dönüştürüldü.

---

## Nerede Zorlanıldı? 

- **Model seçimi:** İlk denenen küçük model (Llama 3.2, 3B) Türkçe çıktıda yetersiz kaldı; daha büyük modele (Llama 3.1, 8B) geçilmesi gerekti. Bu, donanım/performans ile çıktı kalitesi arasında bir denge kurma ihtiyacını gösterdi.
- **Dosya yolu hataları:** Refactor sürecinde göreceli import yolları (`../lib/carbon` vb.) konusunda birden fazla deneme-yanılma yaşandı; klasör yapısının netleştirilmesi zaman aldı.
- **Paralel çalışma karmaşası:** Aynı proje üzerinde farklı oturumlarda çalışıldığında kodun hangi halinin güncel olduğu konusunda kısa süreli bir belirsizlik yaşandı; bu, tek bir çalışma ortamına odaklanmanın önemini gösterdi.

---

## Ne Öğrendildi? 

- API Route kavramı ve neden bir backend "köprüsüne" ihtiyaç duyulduğu (CORS).
- Sistem promptu ile bir LLM'in davranışının nasıl yönlendirilebileceği.
- RAG ve fine-tuning arasındaki temel fark ve her birinin ne zaman tercih edilmesi gerektiği.
- Kod tekrarının (duplication) neden risk taşıdığı ve merkezi mimarinin (Single Source of Truth) pratik faydası.
- Kod düzenlerken tekrarlayan bir kopyala-yapıştır sorunu (`<a>` etiketinin kaybolması) yaşandı; bu, projede `<a>` yerine Next.js `<Link>` bileşeninin standart olarak kullanılmasıyla kalıcı şekilde çözüldü.
- Bir AI özelliğinin gerçek değerinin, kullanılan modelin kendisinden çok, o modelin etrafına kurulan sistemde (prompt mühendisliği, RAG, yapılandırılmış format) olduğu netleşti.
- Kullanıcı arayüzünün "şablon/AI üretimi" hissi vermemesi için tutarlı bir tasarım dilinin (renk, tipografi, ikonografi) önemi deneyimlendi.

---

## Sonraki Sprint İçin Aksiyon Maddeleri

- Tek bir çalışma ortamında (tek oturum/tek makine) ilerlemeye özen gösterilecek; birden fazla ortamda paralel değişiklik yapılmayacak.
- Yeni bir AI özelliği eklenmeden önce, mevcut olanın küçük ölçekte test edilip doğrulanması standart hale getirilecek.
- Sprint 3'te ertelenen AI Agent Orkestrasyonu (US-008) ele alınacak.

---

**Sprint Kapanışı:** 18 Temmuz 2026 — Sprint 2 başarıyla tamamlandı.