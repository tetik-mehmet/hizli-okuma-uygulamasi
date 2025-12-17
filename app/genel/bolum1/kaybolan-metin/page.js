"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KaybolanMetin() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(200); // milisaniye
  const [selectedText, setSelectedText] = useState(0);

  const metinler = [
    {
      baslik: "Teknoloji",
      icerik: `Teknoloji dünyasında her geçen gün yeni gelişmeler yaşanıyor ve bu gelişmeler hayatımızı derinden etkiliyor. Yapay zeka, makine öğrenmesi ve derin öğrenme alanlarında elde edilen başarılar, bilgisayarların insan zekasına yaklaşmasını sağlıyor. Günlük hayatımızda kullandığımız akıllı telefonlar, ev otomasyon sistemleri ve dijital asistanlar, teknolojinin ne kadar ilerlediğini gösteriyor. İnternet sayesinde bilgiye erişim artık çok daha kolay ve hızlı. Eğitim, sağlık, ulaşım ve iletişim alanlarında teknoloji devrim yaratıyor. Uzay araştırmalarında Mars'a gönderilen robotlar, okyanus derinliklerinde keşif yapan denizaltılar ve yenilenebilir enerji kaynakları, insanlığın geleceğe yönelik umutlarını artırıyor. Ancak teknolojinin bu kadar hızlı ilerlemesi, bazı endişeleri de beraberinde getiriyor. İşsizlik, gizlilik sorunları ve teknoloji bağımlılığı gibi konular, toplumun dikkat etmesi gereken önemli noktalar. Gelecekte robotların işlerimizi devralması, yapay zekanın karar verme süreçlerinde rol alması ve sanal gerçeklik teknolojilerinin eğitimde kullanılması bekleniyor. Bu gelişmeler, insanlığın refah seviyesini artırırken, aynı zamanda yeni zorlukları da beraberinde getirecek. Teknoloji, doğru kullanıldığında insanlığın en büyük dostu olabilir.`,
    },
    {
      baslik: "Doğa ve Çevre",
      icerik: `Dünyamızın doğal güzellikleri ve çevre sorunları günümüzde herkesin ilgisini çekiyor. Ormanlar, okyanuslar, dağlar ve çöller gibi ekosistemler, milyonlarca yıldır evrim geçirerek bugünkü halini almış. İklim değişikliği, küresel ısınma ve çevre kirliliği gibi sorunlar, tüm canlıların yaşamını tehdit ediyor. Yenilenebilir enerji kaynakları olan güneş, rüzgar ve hidroelektrik enerji, fosil yakıtların yerini almaya başlıyor. Biyolojik çeşitlilik, dünya üzerindeki yaşamın devamı için kritik öneme sahip. Her gün yok olan türler, ekosistem dengesini bozuyor ve zincirleme reaksiyonlara neden oluyor. Sürdürülebilir tarım yöntemleri, organik üretim ve geri dönüşüm gibi uygulamalar, çevre dostu yaşam tarzının temelini oluşturuyor. Su kaynaklarının korunması, hava kalitesinin iyileştirilmesi ve atık yönetimi, gelecek nesillere yaşanabilir bir dünya bırakmanın anahtarı. Doğa ile uyum içinde yaşamak, insanlığın en büyük sorumluluğu haline geliyor.`,
    },
    {
      baslik: "Tarih ve Kültür",
      icerik: `İnsanlık tarihi, binlerce yıllık bir yolculuk boyunca sayısız medeniyet, savaş ve barış dönemlerini içeriyor. Antik Mısır, Roma İmparatorluğu, Osmanlı Devleti gibi büyük imparatorluklar, dünya tarihine damga vurmuş. Her kültürün kendine özgü sanat, müzik, edebiyat ve mimari anlayışı bulunuyor. Müzeler, kütüphaneler ve tarihi yapılar, geçmişin izlerini günümüze taşıyor. Arkeolojik kazılar, eski uygarlıkların yaşam tarzları hakkında değerli bilgiler veriyor. Dünya üzerindeki farklı dinler, inanç sistemleri ve felsefi düşünceler, insanlığın manevi arayışlarını yansıtıyor. Geleneksel el sanatları, yerel mutfaklar ve halk oyunları, kültürel mirasın canlı örneklerini oluşturuyor. Tarih boyunca yaşanan savaşlar, barış anlaşmaları ve diplomatik ilişkiler, günümüz dünya düzeninin temellerini atıyor. Geçmişten ders almak, geleceği daha iyi şekillendirmenin en etkili yolu olarak görülüyor.`,
    },
    {
      baslik: "Bilim ve Keşif",
      icerik: `Bilim dünyası, sürekli gelişen araştırmalar ve keşiflerle insanlığın ufkunu genişletiyor. Fizik, kimya, biyoloji ve matematik gibi temel bilimler, evrenin sırlarını çözmeye çalışıyor. Uzay araştırmaları, galaksiler, yıldızlar ve gezegenler hakkında yeni bilgiler sunuyor. DNA araştırmaları, genetik hastalıkların tedavisinde umut verici sonuçlar elde ediyor. Nanoteknoloji, tıp ve elektronik alanlarında devrim yaratıyor. Kuantum fiziği, bilgisayar teknolojilerinde yeni kapılar açıyor. İklim bilimi, dünya üzerindeki değişimleri analiz ederek gelecekteki riskleri öngörüyor. Arkeoloji, eski uygarlıkların gizemlerini çözmeye devam ediyor. Okyanus bilimi, deniz altındaki yaşamı ve kaynakları keşfediyor. Her yeni buluş, insanlığın bilgi birikimini artırıyor ve yaşam kalitesini yükseltiyor. Bilimsel araştırmalar, sürdürülebilir kalkınma ve global problemlerin çözümü için kritik öneme sahip.`,
    },
    {
      baslik: "Sağlık ve Spor",
      icerik: `Sağlıklı yaşam, günümüzde herkesin öncelik verdiği konular arasında yer alıyor. Düzenli egzersiz yapmak, kalp sağlığını koruyor ve kas gücünü artırıyor. Beslenme alışkanlıkları, vücudun ihtiyaç duyduğu vitamin ve mineralleri sağlıyor. Uyku düzeni, zihinsel ve fiziksel performansı doğrudan etkiliyor. Stres yönetimi, modern yaşamın getirdiği zorluklarla başa çıkmanın en etkili yolu. Spor yapmak, endorfin hormonunun salgılanmasını sağlayarak mutluluk hissini artırıyor. Yoga ve meditasyon, zihin-beden uyumunu geliştiriyor. Su tüketimi, vücudun toksinlerden arınmasını sağlıyor. Düzenli sağlık kontrolleri, hastalıkların erken teşhisinde büyük önem taşıyor. Sosyal ilişkiler, ruh sağlığının korunmasında kritik rol oynuyor. Çevre kirliliği ve hava kalitesi, solunum sistemi sağlığını doğrudan etkiliyor. Teknoloji kullanımı, göz sağlığı ve duruş bozukluklarına neden olabiliyor. Dengeli yaşam tarzı, uzun ve kaliteli bir hayatın anahtarı olarak görülüyor.`,
    },
    {
      baslik: "Eğitim ve Öğrenme",
      icerik: `Eğitim, insanlığın gelişimi ve ilerlemesi için en temel araç olarak kabul ediliyor. Okul öncesi eğitim, çocukların sosyal ve bilişsel becerilerini geliştiriyor. İlkokul yılları, temel okuma yazma ve matematik becerilerinin kazanıldığı dönem oluyor. Ortaokul ve lise eğitimi, gençlerin ilgi alanlarını keşfetmelerini sağlıyor. Üniversite eğitimi, mesleki uzmanlık ve araştırma becerilerini geliştiriyor. Online eğitim platformları, öğrenme sürecini daha esnek ve erişilebilir hale getiriyor. Yabancı dil öğrenimi, global iletişim ve kariyer fırsatlarını artırıyor. Mesleki eğitim, iş piyasasının ihtiyaç duyduğu becerileri kazandırıyor. Sürekli öğrenme, değişen dünya koşullarına uyum sağlamanın en etkili yolu. Öğretmenler, öğrencilerin potansiyellerini ortaya çıkarmada kilit rol oynuyor. Ebeveynler, çocuklarının eğitim sürecinde aktif destek sağlıyor. Teknoloji, eğitimde yeni öğretim yöntemleri ve araçları sunuyor. Eğitimde kalite, bir ülkenin gelişmişlik seviyesinin en önemli göstergesi olarak kabul ediliyor.`,
    },
    {
      baslik: "Sanat ve Yaratıcılık",
      icerik: `Sanat, insanlığın duygularını ve düşüncelerini ifade etmenin en etkili yollarından biri olarak kabul ediliyor. Resim, heykel ve mimari gibi görsel sanatlar, estetik zevki geliştiriyor ve yaratıcılığı artırıyor. Müzik, ruh halini iyileştiriyor ve stresi azaltıyor. Edebiyat, farklı dünyaları keşfetmemizi ve empati kurmamızı sağlıyor. Tiyatro ve sinema, hikaye anlatımının en etkileyici formları olarak öne çıkıyor. Dans, vücut dilini geliştiriyor ve özgüveni artırıyor. Fotoğrafçılık, anları ölümsüzleştiriyor ve farklı bakış açıları sunuyor. El sanatları, geleneksel tekniklerin korunmasını sağlıyor. Dijital sanat, teknoloji ile yaratıcılığı birleştiriyor. Grafik tasarım, iletişim ve pazarlama alanlarında büyük önem taşıyor. Moda tasarımı, kişisel ifade ve stil geliştirmede rol oynuyor. Sanat terapisi, ruh sağlığının iyileştirilmesinde etkili yöntemler sunuyor. Yaratıcılık, problem çözme ve yenilikçi düşünme becerilerini geliştiriyor. Sanat eğitimi, çocukların hayal gücünü ve özgüvenini artırıyor.`,
    },
    {
      baslik: "Seyahat ve Macera",
      icerik: `Seyahat etmek, dünyayı keşfetmenin ve farklı kültürleri tanımanın en etkili yolu olarak kabul ediliyor. Her ülkenin kendine özgü tarihi, mimarisi ve mutfağı bulunuyor. Doğa yürüyüşleri, dağ tırmanışları ve kamp yapmak, macera ruhunu canlandırıyor. Deniz tatilleri, plajlar ve su sporları, rahatlama ve eğlence sunuyor. Şehir turları, müzeler ve tarihi yerler, geçmişin izlerini takip etmemizi sağlıyor. Yerel pazarlar, el sanatları ve geleneksel yemekler, kültürel deneyimler sunuyor. Ulaşım araçları, seyahat planlamasında büyük önem taşıyor. Konaklama seçenekleri, bütçe ve tercihlere göre çeşitlilik gösteriyor. Seyahat belgeleri, vize işlemleri ve sağlık sigortası, güvenli seyahat için gerekli. Dil bariyeri, yerel halkla iletişim kurmada zorluk yaratabiliyor. Fotoğraf çekmek, anıları ölümsüzleştirmenin en güzel yolu. Seyahat günlükleri, deneyimleri kaydetmek ve paylaşmak için ideal. Her yeni destinasyon, farklı bakış açıları ve yaşam tarzları sunuyor. Seyahat, kişisel gelişim ve dünya görüşünü genişletmede büyük rol oynuyor.`,
    },
    {
      baslik: "Evren ve Uzay (400 Kelime)",
      icerik: `Evren, milyarlarca yıldır var olan ve sürekli genişleyen muazzam bir yapı olarak karşımıza çıkıyor. Galaksiler, yıldızlar, gezegenler ve diğer gök cisimleri, bu kozmik dansın temel unsurlarını oluşturuyor. Samanyolu Galaksisi, içinde bulunduğumuz yıldız sistemini barındıran devasa bir spiral yapı olarak biliniyor. Güneş sistemimiz, merkezinde parlak bir yıldız olan Güneş ve etrafında dönen sekiz gezegen ile sayısız asteroid, kuyruklu yıldız ve meteor parçasından meydana geliyor. Dünya, yaşamın var olduğu bilinen tek gezegen olarak, su, oksijen ve uygun sıcaklık koşulları sayesinde canlı türlerine ev sahipliği yapıyor. Ay, Dünya'nın tek doğal uydusu olarak gelgit olaylarını etkiliyor ve gece gökyüzünde parlak bir ışık kaynağı olarak görünüyor. Mars, kızıl gezegen olarak bilinen ve gelecekte insan kolonilerinin kurulması planlanan en yakın komşumuz olarak dikkat çekiyor. Jüpiter ve Satürn, gaz devleri olarak bilinen ve çok sayıda uyduya sahip olan devasa gezegenler olarak tanınıyor. Uranüs ve Neptün, buz devleri olarak sınıflandırılan ve güneş sisteminin en uzak köşelerinde yer alan gezegenler olarak biliniyor. Asteroid kuşağı, Mars ve Jüpiter arasında yer alan ve milyonlarca küçük gök cismini barındıran bir bölge olarak tanımlanıyor. Kuiper Kuşağı, Neptün'ün ötesinde yer alan ve cüce gezegen Plüton'un da bulunduğu buzlu gök cisimlerinin yoğun olduğu bir alan olarak biliniyor. Oort Bulutu, güneş sisteminin en dış sınırlarında yer alan ve kuyruklu yıldızların kaynağı olarak kabul edilen varsayımsal bir bölge olarak tanımlanıyor. Yıldızlar, hidrojen ve helyum atomlarının füzyon reaksiyonları sonucunda enerji üreten ve ışık saçan gök cisimleri olarak biliniyor. Süpernovalar, büyük yıldızların yaşamlarının sonunda patlaması sonucu oluşan ve evrene ağır elementleri saçan muazzam patlamalar olarak tanımlanıyor. Kara delikler, çok yoğun kütleye sahip olan ve ışığın bile kaçamadığı gizemli gök cisimleri olarak biliniyor. Nötron yıldızları, süpernova patlamaları sonucunda oluşan ve çok yoğun madde içeren yıldız kalıntıları olarak tanımlanıyor. Pulsarlar, hızlı dönen nötron yıldızları olarak ve düzenli radyo dalgaları yayınlayan gök cisimleri olarak biliniyor. Kuasarlar, çok uzak galaksilerin merkezlerinde yer alan ve muazzam miktarda enerji yayan aktif gök cisimleri olarak tanımlanıyor. Karanlık madde ve karanlık enerji, evrenin büyük bir kısmını oluşturduğu düşünülen ancak henüz tam olarak anlaşılamayan gizemli kavramlar olarak biliniyor. Kozmik mikrodalga arka plan radyasyonu, Büyük Patlama'dan kalan ve evrenin erken dönemlerine ışık tutan önemli bir kanıt olarak kabul ediliyor.`,
    },
    {
      baslik: "İnsan Beyni ve Zeka (400 Kelime)",
      icerik: `İnsan beyni, bilinen evrendeki en karmaşık ve gizemli organ olarak karşımıza çıkıyor. Yaklaşık 86 milyar nöron ve bunlar arasındaki trilyonlarca bağlantı içeren bu muazzam yapı, düşünme, öğrenme, hatırlama ve yaratıcılık gibi tüm zihinsel işlevlerin merkezi olarak işlev görüyor. Beyin, üç ana bölümden oluşuyor: beyin sapı, limbik sistem ve serebral korteks olarak sınıflandırılıyor. Beyin sapı, nefes alma, kalp atışı ve uyku gibi temel yaşam fonksiyonlarını kontrol eden hayati bir bölüm olarak tanımlanıyor. Limbik sistem, duygular, hafıza ve motivasyon gibi psikolojik süreçleri yöneten ve insan davranışlarını şekillendiren önemli bir yapı olarak biliniyor. Serebral korteks, beynin en gelişmiş bölümü olarak ve düşünme, planlama, problem çözme ve dil gibi yüksek bilişsel işlevlerden sorumlu olan kısmı olarak tanımlanıyor. Beynin sol ve sağ yarımküreleri, farklı işlevler üstleniyor ve birbirleriyle sürekli iletişim halinde bulunuyor. Sol yarımküre, mantıksal düşünme, matematik ve dil işlevlerinde uzmanlaşmış olarak biliniyor. Sağ yarımküre, yaratıcılık, mekansal algı ve sanatsal yeteneklerde öne çıkıyor ve bütünsel düşünme becerilerini geliştiriyor. Nöronlar, beyin hücreleri olarak bilinen ve elektrokimyasal sinyaller aracılığıyla bilgi ileten temel birimler olarak tanımlanıyor. Sinapslar, nöronlar arasındaki bağlantı noktaları olarak ve bilgi transferinin gerçekleştiği kritik bölgeler olarak biliniyor. Nöroplastisite, beynin öğrenme ve deneyim sonucunda kendini yeniden şekillendirebilme yeteneği olarak ve yaşam boyu süren bir süreç olarak tanımlanıyor. Hafıza, bilgilerin kodlanması, saklanması ve geri çağrılması süreçlerini içeren karmaşık bir zihinsel işlev olarak biliniyor. Kısa süreli hafıza, sınırlı kapasiteye sahip olan ve bilgileri kısa süre saklayabilen geçici bir depolama sistemi olarak tanımlanıyor. Uzun süreli hafıza, sınırsız kapasiteye sahip olan ve bilgileri kalıcı olarak saklayabilen kalıcı bir depolama sistemi olarak biliniyor. Zeka, öğrenme, anlama, problem çözme ve uyum sağlama yeteneklerini kapsayan çok boyutlu bir kavram olarak tanımlanıyor. Çoklu zeka teorisi, insanların farklı alanlarda farklı zeka türlerine sahip olduğunu öne süren ve geleneksel zeka anlayışını genişleten bir yaklaşım olarak biliniyor. Duygusal zeka, kendi duygularını ve başkalarının duygularını anlama, yönetme ve etkili iletişim kurma yeteneği olarak tanımlanıyor. Yaratıcı zeka, yeni fikirler üretme, orijinal çözümler bulma ve yenilikçi yaklaşımlar geliştirme yeteneği olarak biliniyor. Beyin gelişimi, genetik faktörler, çevresel uyaranlar ve deneyimler gibi birçok faktörden etkileniyor ve yaşam boyu devam eden dinamik bir süreç olarak tanımlanıyor. Erken çocukluk dönemi, beyin gelişiminin en hızlı olduğu ve kritik dönemler olarak bilinen önemli bir zaman dilimi olarak kabul ediliyor. Uyku, beynin kendini yenilediği, bilgileri işlediği ve hafızayı güçlendirdiği vazgeçilmez bir süreç olarak tanımlanıyor. Beslenme, beyin sağlığı için gerekli olan vitamin, mineral ve antioksidanların sağlanmasında kritik öneme sahip olan bir faktör olarak biliniyor. Egzersiz, beyin fonksiyonlarını iyileştiren, hafızayı güçlendiren ve bilişsel performansı artıran önemli bir aktivite olarak kabul ediliyor.`,
    },
  ];

  const kelimeler = metinler[selectedText].icerik.split(" ");

  useEffect(() => {
    let interval;
    if (isPlaying && currentIndex < kelimeler.length) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    } else if (currentIndex >= kelimeler.length) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, speed, kelimeler.length]);

  const baslat = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const durdur = () => {
    setIsPlaying(false);
  };

  const sifirla = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const metinDegistir = (yeniIndex) => {
    setSelectedText(yeniIndex);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Geri Dön Butonu - Sol üst köşe */}
      <button
        onClick={() => router.push("/panel")}
        className="fixed top-6 left-6 z-50 bg-black/50 backdrop-blur-xl px-4 py-3 rounded-full shadow-lg text-white font-bold text-sm border border-white/20 hover:bg-black/70 transition-all duration-300 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Geri Dön
      </button>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Kaybolan Metin Egzersizi
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col items-center gap-4">
            <label className="text-gray-700 font-medium text-lg">
              Metin Seçin:
            </label>
            <select
              value={selectedText}
              onChange={(e) => metinDegistir(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 min-w-[200px]"
            >
              {metinler.map((metin, index) => (
                <option key={index} value={index}>
                  {metin.baslik}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
            {metinler[selectedText].baslik}
          </h2>
          <div className="text-lg leading-relaxed text-gray-800 min-h-[200px] flex flex-wrap items-start">
            {kelimeler.map((kelime, index) => (
              <span
                key={index}
                className={`mr-2 mb-2 transition-all duration-300 ${
                  index < currentIndex
                    ? "opacity-0 transform translate-x-4"
                    : "opacity-100"
                }`}
              >
                {kelime}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <button
              onClick={baslat}
              disabled={isPlaying}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Başlat
            </button>
            <button
              onClick={durdur}
              disabled={!isPlaying}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Durdur
            </button>
            <button
              onClick={sifirla}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Sıfırla
            </button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <label className="text-gray-700 font-medium">Hız: {speed}ms</label>
            <input
              type="range"
              min="100"
              max="500"
              step="50"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between w-64 text-sm text-gray-600">
              <span>Hızlı</span>
              <span>Yavaş</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              İlerleme: {currentIndex} / {kelimeler.length} kelime
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentIndex / kelimeler.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
