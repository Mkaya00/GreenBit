#  GreenBit — Hesaplama Metodolojisi

Bu belge, GreenBit'in kullandığı **karbon ayak izi ve enerji hesaplama** yönteminin bilimsel dayanaklarını içerir.

##  Genel Yaklaşım

GreenBit, kullanıcının yapay zeka kullanım verilerini analiz ederek 3 temel metrik hesaplar:
- **Token** — İşlenen kelime/parça sayısı
- **kWh** — Harcanan elektrik enerjisi
- **CO2** — Salınan karbon miktarı

##  Bilimsel Kaynaklar

Hesaplamalarımız aşağıdaki bilimsel çalışmalara dayanır:

1. **Green Algorithms** — Lannelongue et al. (2021)
   - Kaynak: https://green-algorithms.org
2. **ML CO2 Impact** — Lacoste et al. (2019)
   - Kaynak: https://mlco2.github.io
3. **Cloud Carbon Footprint** — Thoughtworks (2023)
   - Kaynak: https://www.cloudcarbonfootprint.org

## ⚡ Model Enerji Tüketimi

Her yapay zeka modelinin **1000 token başına harcadığı enerji** (Watt-saat cinsinden):

| Model | Enerji (Wh / 1000 token) | Kaynak |
|---|---|---|
| GPT-4 | ~30 | OpenAI teknik raporları + Green Algorithms tahminleri |
| GPT-4o | ~15 | OpenAI verimlilik açıklamaları |
| GPT-4o-mini | ~3 | Küçük model, düşük tüketim |
| GPT-3.5-turbo | ~5 | Eski model, orta tüketim |
| Claude 3 Opus | ~25 | Anthropic teknik raporları |
| Claude 3 Sonnet | ~10 | Anthropic verimlilik verileri |
| Bilinmeyen | ~15 | Ortalama tahmin |

**Not:** Bu değerler tahmindir. Gerçek tüketim; sunucu bölgesi, donanım nesli ve model versiyonuna göre değişir.

## CO2 Dönüşüm Katsayısı

**~400 gram CO2 / kWh**

Bu değer **dünya elektrik şebekesinin karbon yoğunluğu ortalamasıdır.**

Bölgesel farklar:
- 🇸🇪 İsveç (hidroelektrik): ~20g CO2/kWh
- 🇫🇷 Fransa (nükleer): ~60g CO2/kWh
- 🇹🇷 Türkiye: ~450g CO2/kWh
- 🇵🇱 Polonya (kömür): ~750g CO2/kWh

**Kaynak:** IEA (Uluslararası Enerji Ajansı) 2023 raporu.

## Hesaplama Formülü
Adım 1: Token Tahmini
Token = Mesaj Sayısı × Ortalama Token/Mesaj (200)
Adım 2: Enerji Hesabı
Enerji (Wh) = (Token / 1000) × Model Enerji Katsayısı
Adım 3: CO2 Hesabı
CO2 (g) = Enerji (Wh) × 0.4


### Örnek

Kullanıcı **5,000 mesaj** göndermiş, hepsi **GPT-4**:

- Token = 5000 × 200 = **1,000,000 token**
- Enerji = (1,000,000 / 1000) × 30 = **30,000 Wh = 30 kWh**
- CO2 = 30,000 × 0.4 = **12,000g = 12 kg CO2**

##  Karşılaştırma Referansları

Kullanıcıya anlaşılır göstermek için:

| Karşılaştırma | Değer |
|---|---|
| 1 bardak kahve üretimi | ~50g CO2 |
| 1 km araba yolculuğu | ~120g CO2 |
| 60W ampul 1 saat | ~60 Wh |
| Telefon şarjı | ~5 Wh |
| 1 ağacın yıllık CO2 emişi | ~22,000g (22 kg) |

**Kaynak:** OurWorldInData, EPA raporları.

##  Sınırlamalar

Şeffaflık için:

1. **Ortalama token/mesaj** varsayımı basittir. Gerçekte mesaj uzunlukları çok değişir.
2. **Model detayları** OpenAI/Anthropic tarafından tam yayınlanmaz.
3. **Bölgesel enerji karışımı** göz ardı ediliyor (dünya ortalaması).
4. **Soğutma ve altyapı enerjisi** dahil değil (PUE dikkate alınmadı).

Gelecek sürümlerde bu sınırlamalar giderilecek:
- Bölge bazlı hesaplama
- Gerçek token sayısı (tiktoken kütüphanesi)
- PUE (Power Usage Effectiveness) katsayısı

##  Ek Kaynaklar

- OpenAI Environmental Report 2023
- Anthropic Sustainability Statement
- Green Software Foundation Guidelines

---

**Son güncelleme:** 4 Temmuz 2026  
**Yazar:** Mkaya00 (Ege Mert Kaya)