#  Sprint 1 Retrospective

---

## İyi Giden (Keep)
- Ekip üyelerinin eksikliğine rağmen Scrum dokümanlarının (Daily, Board, Review) şeffaf ve eksiksiz tutulması.
- Git geçmişinin (atomic commits ve İngilizce convention) sektörel standartlarda profesyonelce yönetilmesi.
- UI/UX tarafında projeyi öne çıkaracak (kahve/ampul karşılaştırması gibi) yaratıcı metriklerin hızlıca koda dökülmesi.

## İyileştirilebilir (Improve)
- TÜBİTAK yükümlülükleri araya girdiği için sprint ortasında projeye 3 gün ara verilmek zorunda kalındı. Bu durum son günlerde zaman sıkışıklığı yarattı.
- lib/ altında oluşturulan hesaplama modülleri (carbon.ts, chatgpt.ts) henüz sayfalara entegre edilmedi;
 kod tekrarı sayfa bileşenleri içinde kaldı. Bu refactor Sprint 2'ye planlandı.

##  Sonraki Sprint İçin Aksiyonlar (Action Items)
- lib/carbon.ts ve lib/parsers/chatgpt.ts modüllerini sayfalara entegre ederek 
kod tekrarını gidermek (refactor) Sprint 2'nin ilk işi.
- Sprint 2'de zaman yönetimini daha dengeli ayarlamak ve olası kesintiler için buffer (yedek) zaman bırakmak.
- Vercel CI/CD pipeline'ını kurarak her commit'te otomatik canlıya alma (deploy) sürecini oturtmak.
- Llama fine-tuning ve prompt analizi (US-005, US-006) için teorik araştırmalara ilk günden başlamak.