#  Daily Scrum Notes — Sprint 1

> Her gün 3 soruyu cevaplıyorum:  
> 1. Dün ne yaptım?  
> 2. Bugün ne yapacağım?  
> 3. Bir engel (blocker) var mı?

---

## 25 Haziran 2026 (Sprint Başlangıcı)

- **Dün:** Sprint Planning yaptım, dokümanları hazırladım.
- **Bugün:** Next.js projesini kuracağım, ilk commit'i atacağım.
- **Engel:** Yok.

## 27 Haziran 2026

- **Bugün (27 Haziran):** Next.js sunucusu başarıyla çalıştırıldı (localhost:3000). İlk kod değişiklikleri yapıldı. `src/app/page.tsx` dosyası tamamen yeniden yazıldı: GreenBit landing page'in ilk versiyonu hazır (yeşil tema, başlık, alt başlık, açıklama, butonlar). HTML etiketleri (h1, h2, p, button, div, main), JSX yazımı, Tailwind CSS class'ları (text-6xl, font-bold, text-green-600, bg-gradient, flex, items-center, justify-center, rounded-lg) öğrenildi. Hot reload sihri canlı tecrübe edildi. Local vs Network vs Production farkları, IP vs Port kavramları kavrandı.
- **Yarın:** Landing page'e detaylar eklenecek (özellikler bölümü, footer). Dosya yükleme sayfası (`/upload`) iskeleti kurulacak. Vercel'e ilk deploy denenecek.
- **Engel:** Yok.

- **Dün (25 Haziran):** GitHub repo açıldı, README ve Scrum dokümanları hazırlandı. Git, GitHub, Markdown, Commit/Push kavramları öğrenildi. 4 commit atıldı.
- **Bugün:** Node.js ve npm kuruldu (Homebrew ile). Next.js projesi `greenbit-app/` klasörüne kuruldu. TypeScript, ESLint, Tailwind CSS, App Router, AGENTS.md ayarları seçildi. İlk `npm run dev` başarılı, localhost:3000 çalıştı. Frontend/Backend, Node.js, npm, Next.js, React, Tailwind kavramları öğrenildi.
- **Not:** Git config'i güncellendi, artık Mkaya00 olarak commit atılıyor.
- **Yarın:** Tekrar okuma yapılacak, kavramlar pekişecek. İlk kod değişiklikleri yapılacak, landing page tasarımına başlanacak.
- **Engel:** Yok.

---

## 28-30 Haziran 2026 (Ara Verildi)

- **Durum:** TÜBİTAK yükümlülükleri nedeniyle 3 gün proje çalışmasına ara verildi.
- **Not:** Scrum'da böyle durumlar planlamada dikkate alınır. Sprint 1'in kalan 5 günü ile hedeflere ulaşılacak.

---

## 1 Temmuz 2026

- **Son 3 gün:** TÜBİTAK için ara verildi.
- **Bugün:** Projeye geri dönüş yapıldı. Landing page kontrol edildi, `npm run dev` başarıyla çalıştırıldı. Daily scrum ve sprint board güncellendi.Landing page'e "GreenBit Ne Yapar?" özellikler bölümü ve footer eklendi. Yeni sayfa `/upload` oluşturuldu (US-001). React State (useState), Client Component ("use client"), Event Handling (onChange), Koşullu Gösterim (conditional rendering) kavramları öğrenildi ve uygulandı. Kullanıcı dosya seçince ekranda ad, boyut ve tür bilgileri görünüyor. TypeScript tipleri (File | null) ile güvenlik sağlandı.
- **Yarın:** Landing page'e navigation menü eklenecek (ana sayfa ↔ upload sayfası). Upload sayfasına drag & drop özelliği ve dosya format doğrulaması eklenecek. Ana sayfadan upload sayfasına geçiş linki koyulacak.
- **Engel:** Yok. Ara sonrası kaldığım yerden devam ediyorum.

---

## 2-3 Temmuz 2026
- **Dün:** Upload sayfasının temel UI'ı tamamlandı.
- **Bugün:** Green Algorithms metodolojisi koda dökülerek karbon hesaplama motoru (carbon.ts) yazıldı. Kullanıcının günlük hayattan metrikler (kahve, ampul) görebileceği UI eklendi. Recharts kütüphanesi ile Dashboard grafikleri tasarlandı.
- **Engel:** Yok, hesaplama mantığı başarılı.

---

## 4 Temmuz 2026
- **Dün:** Hesaplama motoru ve UI bileşenleri tamamlandı.
- **Bugün:** Git versiyon kontrolünde yaşanan sayfa yönlendirme (routing) karışıklığı "Fix Forward" stratejisiyle temizlendi. Ana sayfa, Upload ve Dashboard UI profesyonel commit mesajlarıyla (atomic commits) GitHub'a eklendi. 50 MB JSON dosya sınırının MVP için bilinçli bir teknik borç (technical debt) olarak bırakılmasına karar verildi. Tüm Scrum belgeleri güncellendi.
- **Yarın:** Sprint 1 resmi olarak kapanacak. Proje Vercel üzerinden canlıya alınacak.
- **Engel:** Yok. Sprint hedefine ulaşıldı!

## 5 Temmuz 2026 
- **Dün:** UI bileşenleri ve commit'ler tamamlandı.
- **Bugün:** Dashboard, localStorage + useEffect kullanılarak gerçek kullanıcı verisine bağlandı. Upload sayfasında analiz edilen veri artık Dashboard'da dinamik grafiklere yansıyor (sabit örnek veri kaldırıldı). localStorage ile sayfa arası veri paylaşımı, useEffect ile tarayıcı tarafında veri okuma kavramları öğrenildi ve uygulandı. Scrum belgeleri gerçek mimari kararlarla (client-side yaklaşım) uyumlu hale getirildi. Sprint 1 resmi olarak kapatıldı.
- **Sprint 2 (yarın):** lib/ modüllerinin ortak kullanımı (refactor), AI Agent mimarisi araştırması, Llama fine-tuning.
- **Engel:** Yok. Sprint 1 hedeflerine ulaşıldı (4/4 User Story).


---