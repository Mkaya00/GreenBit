# Fine-Tuning Araştırması ve Kararı

**Tarih:** 16 Temmuz 2026

## Amaç

Llama 3'ü, GreenBit'in prompt analiz görevine özel olarak eğitmek (fine-tuning) araştırıldı. Bu belge, planlanan süreci ve bu sprint'te uygulanmama kararının gerekçesini kaydeder.

## Planlanan Süreç

1. **Veri Seti Hazırlama:** Prompt-analiz çiftlerinden oluşan 200-500 örneklik bir eğitim veri seti (RAG denemeleri sırasında üretilen örnekler temel alınabilir).
2. **Ortam Kurulumu:** Python, PyTorch (CUDA), Hugging Face (transformers, peft, accelerate), Unsloth kütüphaneleri, 4060 GPU'lu makinede.
3. **Model Seçimi:** Llama 3.2 3B (küçük, hızlı eğitilebilir, LoRA ile uyumlu).
4. **LoRA ile Eğitim:** Modelin tamamı değil, küçük bir adaptör katmanı eğitilecek (düşük maliyetli fine-tuning yöntemi).
5. **Test ve Karşılaştırma:** Eğitim öncesi/sonrası model çıktıları karşılaştırılacak.
6. **Ollama Entegrasyonu:** Eğitilen model GGUF formatına çevrilip Ollama'ya tanıtılacak.

## Gerçekçi Zaman Tahmini

Python ve makine öğrenmesi araçlarına yeni başlayan biri için:

| Aşama | Tahmini Süre |
|---|---|
| Python temelleri | 2-3 gün |
| Ortam kurulumu | 1-2 gün |
| Veri seti hazırlama | 3-5 gün |
| Eğitim ve deneme-yanılma | 3-4 gün |
| Test ve entegrasyon | 1-2 gün |
| **Toplam** | **15-20 gün** |

## Karar

Sprint 2'nin kalan süresi (3 gün) bu süreç için yetersiz bulunmuştur. Ayrıca değerlendirme sürecinin GitHub reposu ve dokümantasyon üzerinden yapılacağı, Bu doğrultuda risk/fayda dengesi değerlendirilmiş; yarım kalmış veya hatalı bir fine-tuning denemesi yerine, RAG (US-007) gibi daha düşük riskli ve süreye uygun bir AI geliştirmesi tercih edilmiştir.

Fine-tuning, ileride zaman ve öğrenme fırsatı olarak (Sprint 3 sonrası veya kişisel gelişim hedefi olarak) değerlendirilebilir.