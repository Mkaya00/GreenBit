# Sprint 1 Planning

**Sprint Süresi:** 19 Haziran 2026 – 5 Temmuz 2026 (2 hafta)  
**Sprint Hedefi:** ChatGPT/Claude export dosyası yüklenebilen, içeriğini analiz edip karbon ayak izini hesaplayan ve temel dashboard'da gösteren çalışan bir MVP teslim etmek.

---

## Sprint Backlog (Bu sprintte yapılacaklar)

| ID | User Story | Tahmini Süre | Durum |
|---|---|---|---|
| US-001 | Dosya yükleme | 2 gün |  Tamamlandı |
| US-002 | Dosya parse (ChatGPT JSON) | 2 gün |  Tamamlandı |
| US-003 | Karbon hesaplama motoru | 3 gün |  Tamamlandı |
| US-004 | Temel dashboard UI | 3 gün |  Tamamlandı |
| EXTRA | Landing page (anasayfa) | 1 gün |  Tamamlandı |
| EXTRA | GitHub dokümantasyon güncellemeleri | sürekli |  Devam ediyor |

---

##  Sprint Sonunda Görmek İstediklerimiz (Definition of Done)

- [ ] Vercel'de canlı bir URL var, sayfa açılıyor
- [ ] Kullanıcı ChatGPT export dosyasını yükleyebiliyor
- [ ] Yüklenen dosya backend'de parse ediliyor
- [ ] Token/kWh/CO2 hesaplamaları doğru çalışıyor
- [ ] Dashboard'da en az 3 grafik var (zaman serisi, model dağılımı, toplam metrikler)
- [ ] Tüm kod GitHub'da, commit'ler düzenli
- [ ] Bu klasördeki tüm Scrum dokümanları güncel

---

##  Teknik Görevler

### Backend
- Next.js 14 projesi kurulumu
- API route: `/api/upload`
- API route: `/api/analyze`
- Karbon hesaplama modülü: `lib/carbon.ts`
- ChatGPT JSON parser: `lib/parsers/chatgpt.ts`

### Frontend
- Landing page (`/`)
- Dashboard sayfası (`/dashboard`)
- Dosya yükleme komponenti (`<FileUpload />`)
- Grafik komponentleri (Recharts ile)
- Layout, navigation, footer

### DevOps
- Vercel'e ilk deploy
- Domain ayarlama (opsiyonel)

---

##  Notlar

- Hafta sonu da çalışılacak çünkü tek kişiyim
- Cursor + Claude kullanılacak (AI destekli geliştirme)
- Her gün en az 1 commit hedefli
- Bloklayıcı durumlar GitHub Issues'a kaydedilecek