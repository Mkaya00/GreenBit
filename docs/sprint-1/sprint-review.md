# Sprint 1 Review

---

## Tamamlananlar
- Next.js ve Tailwind CSS altyapısı başarıyla kuruldu.
- GreenBit Landing Page (Ana Sayfa) tasarımı tamamlandı.
- Yükleme sayfası (Upload UI) ve "💡 Bu ne kadar?" gibi günlük hayat karbon karşılaştırma metrikleri eklendi.
- Green Algorithms metodolojisine dayalı karbon hesaplama motoru entegre edildi.
- Recharts kullanılarak veri görselleştirme (Dashboard) özellikleri koda eklendi.
- Versiyon kontrolü (Git) hataları "Fix Forward" stratejisiyle temizlenip profesyonel commit geçmişi oluşturuldu.

## Mimari Kararlar ve Sprint 2'ye Devredilenler
- **Client-side (tarayıcı içi) mimari tercih edildi:** Sprint 1'de dosya okuma, JSON parse ve karbon hesaplama tamamen tarayıcıda çalışacak şekilde tasarlandı. Bu tercih; MVP için hızlı geliştirme, sıfır sunucu maliyeti ve kullanıcı verisinin sunucuya gönderilmemesi (gizlilik) avantajı sağladı.
- **Sayfa arası veri paylaşımı localStorage ile çözüldü:** Upload sayfası analiz sonucunu localStorage'a kaydediyor, Dashboard bu veriyi okuyup Recharts ile görselleştiriyor.
- **Sprint 2'ye devredilenler:** Kullanıcı hesapları ve veri saklama için backend API + veritabanı entegrasyonu, gerçek token sayacı (tiktoken), lib/ altındaki hesaplama modüllerinin ortak kullanımı (refactor).

## Sayısal Sonuçlar
- Tamamlanan story sayısı: 4 / 4 (Sprint 1 kapsamı) — US-001, US-002, US-003, US-004
- Not: US-005 (Llama fine-tuning) ve US-006 (prompt analizi) Sprint 2 kapsamındadır.
- Yapılan commit sayısı: 20 (Yaklaşık)
- GitHub Issues kapatılan: 0 (Bireysel ilerlendiği için süreç doğrudan Git commit mesajlarıyla yönetildi)

## Demo Notları
MVP arayüz ve hesaplama motoru lokalde (localhost:3000) başarıyla test edildi. Upload → analiz → Dashboard akışı uçtan uca çalışıyor. Vercel canlıya alma Sprint 3'e planlanmıştır; deploy sonrası link README'ye eklenecektir.