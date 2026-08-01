# Sprint 3 - Retrospective 

**Sprint Süresi:** 20 Temmuz 2026 – 2 Ağustos 2026
**Retrospective Tarihi:** 1 Ağustos 2026

## İyi Gidenler
- Agent Orkestrasyonu ve Sohbet Arayüzü, planlanandan hızlı tamamlandı.
- Model enerji tablosundaki eksiklik fark edilip düzeltildi (proaktif kalite kontrolü).

## Zorlanılanlar
-Tarayıcı localStorage 5MB limitine takılması (Çoklu dosya geçmişi eklendiğinde taşma yaşanması).

## Aksiyon Maddeleri
- Tüm hedefler tamamlandığı için projeyi stabil şekilde yayında tutmak ve kısıtlı tarayıcı belleği (localStorage) yönetimi tecrübesini gelecekteki projelere aktarmak.

## 23 Temmuz Notu

**İyi giden:** Performans ve şeffaflık konusundaki geri bildirimler (kullanıcının kendi gözlemleri) hızlıca değerlendirilip aksiyona dönüştürüldü — bu, çevik/agile çalışmanın iyi bir örneği.

## 25 Temmuz Notu

**İyi giden:** Planlanan 5 bonus özelliğin hepsi tek günde tamamlandı — net bir liste yapıp önceliklendirmenin faydası görüldü.

## 26 Temmuz Notu

**İyi giden:** Yeni özellik eklemek yerine bir gün tamamen kaliteye ayrıldı — bu, "hızlı ilerleme" ile "sağlamlık" arasında bilinçli bir denge kurma örneği oldu. Testler sırasında elle hesaplama yapıp siteyle karşılaştırmak, güvenilir bir doğrulama yöntemi olarak işe yaradı.

## 27 Temmuz Notu

**İyi giden:** Deploy öncesi güvenlik önlemleri erkenden planlandı.

## 28 Temmuz Notu

**İyi giden:** Deploy sırasında karşılaşılan sorunlar (env variable, model adı, güvenlik kontrolü) sistematik olarak (loglara bakarak) teşhis edilip çözüldü — rastgele deneme yerine kanıta dayalı debug yapıldı.

## 29 Temmuz Notu

**İyi giden:** Kullanıcı geri bildirimleri (arkadaşlar) ve harici bir UX/UI raporu birlikte değerlendirilip önceliklendirildi. Büyük bir özellik isteği (çoklu dosya yönetimi) için kapsam bilinçli olarak küçültülüp riskli olmayan bir versiyonu uygulandı.

## 30 Temmuz Notu
 
**Zorlanılan:** Çoklu dosya geçmişi özelliği localStorage limitine takıldı — özellik kaldırılmak zorunda kalındı. Bu, tarayıcı depolama sınırlamalarının (5MB) büyük dosyalarla çalışırken göz önünde bulundurulması gerektiğini gösterdi.

## 31 Temmuz Notu

**İyi giden:** Son kontrollerde kritik hata bulunmadı — önceki günlerde yapılan kapsamlı testlerin etkisi görüldü.

## 1 Ağustos Notu

**İyi giden:** Tüm Sprint 3 hedefleri (5 planlı + 25 bonus iş) başarıyla tamamlandı. Deploy, test, kalite kontrolü ve video zamanında bitirildi.
**Genel Sprint 3 değerlendirmesi:** Sprint boyunca çevik çalışma prensipleri uygulandı — günlük notlar tutuldu, geri bildirimler hızla aksiyona dönüştürüldü, teknik riskler (localStorage taşması, güvenlik kontrolü) bilinçli kararlarla yönetildi.