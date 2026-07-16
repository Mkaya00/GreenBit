// RAG için basit bilgi deposu: prompt yazma kuralları

export interface PromptRule {
    kategori: string;
    kuralAdi: string;
    aciklama: string;
    iyiOrnek: string;
    kotuOrnek: string;
  }
  
  export const promptRules: PromptRule[] = [
    {
      kategori: "netlik",
      kuralAdi: "Netlik ve Görev Tanımı",
      aciklama: "Prompt'ta net bir görev tanımı olmalı, belirsiz ifadelerden kaçınılmalı. Beklenen çıktı formatı belirtilmeli.",
      iyiOrnek: "Python'da bir listeyi büyükten küçüğe sıralayan bir fonksiyon yaz. Fonksiyon adı sort_desc olsun.",
      kotuOrnek: "Bana kod yaz."
    },
    {
      kategori: "uzunluk",
      kuralAdi: "Token Verimliliği",
      aciklama: "Gereksiz nezaket ifadeleri ('lütfen', 'acaba mümkün müdür') ve tekrarlar token israfına yol açar. Kısa ve öz cümleler tercih edilmeli.",
      iyiOrnek: "3 cümlede özetle: [metin]",
      kotuOrnek: "Acaba mümkünse, eğer sakıncası yoksa şu metni benim için özetleyebilir misiniz..."
    },
    {
      kategori: "rolVeBaglam",
      kuralAdi: "Rol Tanımlama (Persona)",
      aciklama: "Modele bir rol verilmesi (örn. 'sen bir öğretmensin') cevap kalitesini ve tutarlılığını artırır.",
      iyiOrnek: "Sen bir Python öğretmenisin. Yeni başlayan birine döngüleri basitçe anlat.",
      kotuOrnek: "Döngüleri anlat."
    },
    {
      kategori: "modelSecimi",
      kuralAdi: "Model Seçimi ve Verimlilik",
      aciklama: "Basit görevler için küçük/ucuz modeller, karmaşık akıl yürütme gerektiren görevler için güçlü modeller tercih edilmelidir. Gereksiz güçlü model kullanımı enerji israfına yol açar.",
      iyiOrnek: "Basit bir metin özeti için gpt-4o-mini yeterlidir.",
      kotuOrnek: "Basit bir toplama işlemi için gpt-4 kullanmak gereksiz kaynak tüketimidir."
    },
    {
      kategori: "tekOdak",
      kuralAdi: "Tek Konuya Odaklanma",
      aciklama: "Birden fazla konuyu (örn. hem oyun hem GitHub sorusu) tek prompt'ta karıştırmak modelin kafasını karıştırır. Her prompt tek bir konuya odaklanmalıdır.",
      iyiOrnek: "GitHub'a ilk yükleyeceğim dosya README.md olmalı mı?",
      kotuOrnek: "Kendini bir yazılımcı gibi düşün, oyun yapacaksın, GitHub'a ilk ekleyeceğin dosya ne olurdu?"
    }
  ];