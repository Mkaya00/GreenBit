**Not:** 20-21 Temmuz günlerinde çalışmaya ara verildi.


## 22 Temmuz 2026 (Çarşamba)

**Son çalışılan gün (19 Temmuz):** Sprint 2 teslim edildi, mentörden 6/6 tam puan alındı.

**Bugün ne yapıldı:**
- Agent Orkestrasyonu (US-008) tamamlandı: prompt analiz, model önerisi ve verimlilik skorunu koordine eden bir sistem kuruldu.
- `lib/carbon.ts`'teki model enerji tablosunun güncel olmadığı (gpt-5 serisi modelleri tanımadığı) fark edildi; isim tabanlı akıllı tahmin mantığı (`estimateEnergyRate`) eklenerek düzeltildi.
- Sohbet Arayüzü (US-009) tamamlandı: kullanıcı, verisi hakkında doğal dilde soru sorup cevap alabiliyor.
- Loading mesajları iki panel arasında tutarlı hale getirildi.
- Notion board'a Sprint 3 bölümü eklendi, ekran görüntüsü alındı.

**Engeller:** Yok.

## 23 Temmuz 2026 (Perşembe)

**Son çalışılan gün (22 Temmuz):** Agent Orkestrasyonu ve Sohbet Arayüzü tamamlandı.

**Bugün ne yapıldı:**
- US-010 (PDF Rapor) tamamlandı: print-özel CSS ile temiz, profesyonel rapor çıktısı sağlandı.
- Agent Orkestrasyonu, paralel API çağrılarıyla (`Promise.all`) hızlandırıldı.
- Dashboard'daki AI Analiz paneli, daha temsili bir örnekleme (baş/orta/son prompt) yapacak şekilde geliştirildi; kullanıcıya analiz kapsamı hakkında şeffaf bir not eklendi.
- Bonus: Su Ayak İzi Hesaplayıcı eklendi — enerji tüketiminden yola çıkarak veri merkezi su tüketimini tahmin eden bir metrik, hem Dashboard hem Upload sonuç ekranına entegre edildi.
- Bonus: Agent Orkestrasyonu için görsel durum göstergeleri eklendi (3 agent'ın çalışma durumunu gösteren ikonlu kutular).

**Engeller:** Yok.
