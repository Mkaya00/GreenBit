# GreenBit

**AI Karbon Ayak İzi & Prompt Verimlilik Platformu**

Yapay Zeka ve Teknoloji Akademisi 2026 Bootcamp Projesi — Yapay Zeka & Veri Bilimi Kategorisi

## Proje Hakkında

GreenBit, yapay zeka kullanımının enerji ve karbon ayak izini ölçen, optimize eden ve raporlayan AI destekli bir platformdur. Kullanıcılar ChatGPT gibi servislerden indirdikleri kullanım verilerini yükler; GreenBit bu veriyi analiz ederek hem sayısal metrikler hem de lokal bir yapay zeka (Llama 3) aracılığıyla prompt verimlilik önerileri sunar.

### Üç Temel Değer

- **Ölçüm:** Token, kWh, CO2 takibi ve zaman içindeki değişimin görselleştirilmesi
- **Prompt Koçluğu:** Lokal Llama 3 modeli ile prompt'ların açıklık, uzunluk ve verimlilik açısından analiz edilmesi
- **Gizlilik Odaklı Mimari:** Dosyalar sunucuya gönderilmez, hesaplamalar ve yapay zeka analizi tarayıcı/lokal ortamda yapılır

## Takım

| Rol | İsim |
|---|---|
| Product Owner | Ege Mert Kaya |
| Scrum Master | Ege Mert Kaya |
| Developer | Ege Mert Kaya |

> Bu proje, ekip üyelerine ulaşılamaması nedeniyle bireysel olarak yürütülmektedir.

---

## Teknoloji Yığını

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Recharts
- **Backend:** Next.js API Routes
- **AI:** Ollama + Llama 3 (lokal çalışan LLM, prompt analizi için)
- **Veri Akışı:** Client-side JSON parsing, localStorage (sunucu tarafı veri saklama yok)

> Not: Fine-tuning ve RAG gibi ileri AI özellikleri Sprint 2'de zaman/kaynak elverdiğince değerlendirilen ekstra hedeflerdir; ana platform yukarıdaki yığınla tam işlevseldir.

---

## Yapay Zeka Özelliği: Prompt Analizi

GreenBit, kullanıcının yüklediği gerçek konuşma geçmişinden promptları ayıklar ve lokal olarak çalışan Llama 3 modeline gönderir. Model:

1. Prompt'un yeterince açık ve net olup olmadığını,
2. Gereksiz uzunluk / token israfı olup olmadığını,
3. Prompt'un nasıl daha verimli yazılabileceğini

değerlendirir ve Türkçe, madde madde bir analiz sunar. Analiz, Dashboard sayfasına gömülü bir panel olarak gerçek veri üzerinden otomatik çalışır; ayrıca `/analyze-page` üzerinden manuel prompt testi de yapılabilir.

### Lokal Çalıştırma (AI özelliği için)

AI destekli analiz özelliğini test etmek için [Ollama](https://ollama.com) kurulu olmalı ve aşağıdaki model indirilmiş olmalıdır:

```bash
ollama pull llama3.1
```

Uygulama çalışırken Ollama'nın arka planda açık olması gerekir (`localhost:11434`).

---

## Sprint Takvimi

| Sprint | Tarih | Hedef |
|---|---|---|
| Sprint 1 | 19 Haz – 5 Tem | Temel altyapı, dosya yükleme, karbon hesaplama, MVP dashboard |
| Sprint 2 | 6 – 19 Tem | Kod tekrarının giderilmesi (refactor), Llama 3 entegrasyonu, prompt verimlilik analizi |
| Sprint 3 | 20 Tem – 2 Ağu | Geliştirme, test ve teslim |

---

## Belgeler

- **[Canlı Sprint Board (Notion)](https://great-colony-435.notion.site/GreenBit-Sprint-Board-398dd1e285178028bf86e87825e031e8)** — yaşayan Kanban board (To Do → In Progress → Done)
- [Product Backlog](docs/product-backlog.md)

**Sprint 1:**
- [Sprint 1 Planning](docs/sprint-1/sprint-planning.md)
- [Sprint 1 Board](docs/sprint-1/sprint-board.md)
- [Daily Scrum Notes](docs/sprint-1/daily-scrum-notes.md)
- [Sprint 1 Review](docs/sprint-1/sprint-review.md)
- [Sprint 1 Retrospective](docs/sprint-1/sprint-retrospective.md)

**Sprint 2:**
- [Sprint 2 Planning](docs/sprint-2/sprint-planning.md)
- [Sprint 2 Board](docs/sprint-2/sprint-board.md)
- [Daily Scrum Notes](docs/sprint-2/daily-scrum-notes.md)

---

## Lisans

MIT License