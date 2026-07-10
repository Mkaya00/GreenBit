# Sprint 2 Planning

**Sprint Süresi:** 6 Temmuz 2026 – 19 Temmuz 2026 (2 hafta)
**Sprint Hedefi:** GreenBit'e yapay zeka gücü katmak — Llama 3'ü lokal entegre etmek, prompt verimlilik analizi yapmak ve mümkünse fine-tuning ile özelleştirmek.

---

## Sprint Backlog

| ID | User Story | Tahmini Süre | Öncelik |
|---|---|---|---|
| REF | lib/ refactor (kod tekrarını gider) | 1 gün | Yüksek |
| US-005 | Prompt verimlilik analizi | 2 gün | Yüksek |
| US-006 | Llama fine-tuning | 3 gün | Yüksek |
| US-007 | Öneri Agent'ı (RAG) | 2 gün | Orta |
| US-008 | AI Agent orkestrasyonu | 2 gün | Orta |

---

## Kademeli Yaklaşım (Risk Yönetimi)

Yapay zeka özellikleri karmaşık olduğu için 3 katmanlı, riski yönetilen bir strateji izlenecektir:

**Katman 1 (Temel — mutlaka):**
- lib/ refactor
- Ollama + Llama 3 lokal entegrasyonu (soru gönder, cevap al)
- Llama ile temel prompt analizi

**Katman 2 (Orta — hedeflenen):**
- Prompt engineering ile "prompt uzmanı" davranışı
- Kişiselleştirilmiş öneri sistemi
- Chat arayüzü

**Katman 3 (İleri — iddialı hedef):**
- LoRA ile Llama fine-tuning (özel model eğitimi)
- RAG (vektör DB ile bilgi tabanı)
- Çoklu agent orkestrasyonu

Her katman kendi başına gösterilebilir bir çıktı üretir; böylece ileri katmanda takılma durumunda dahi çalışan bir AI özelliği elde edilir.

---

## Definition of Done

- [ ] lib/ modülleri sayfalara entegre edildi, kod tekrarı giderildi
- [ ] Llama 3 lokal olarak projeye bağlandı ve cevap üretiyor
- [ ] Kullanıcı promptları için verimlilik analizi çalışıyor
- [ ] (Hedef) Fine-tuning ile özelleştirilmiş model denendi
- [ ] Tüm kod GitHub'da, commit'ler düzenli
- [ ] Sprint 2 Scrum dokümanları güncel

---

## Teknik Görevler

- lib/carbon.ts ve lib/parsers/chatgpt.ts'i sayfalara entegre et (import)
- Ollama API entegrasyonu (lokal Llama 3 çağrısı)
- Prompt analiz modülü
- (Hedef) Hugging Face + LoRA ile fine-tuning
- Öneri üretim mantığı

---

## Notlar

- Fine-tuning için küçük model (Llama 3.2 3B) ve LoRA yöntemi kullanılacak
- Her AI özelliği eklenirken kod içi Türkçe yorumlarla belgelenecek
- Board Notion'da güncel tutulacak, süreç görüntüleri alınacak