"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  ArrowLeft as ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";

export default function ParagrafEgzersizi({
  visibleCount = null,
  visibleIndexes = null,
  embedded = false,
}) {
  const [cevaplar, setCevaplar] = useState({});
  const [gonderildi, setGonderildi] = useState(false);
  const [dogruSayisi, setDogruSayisi] = useState(0);
  const [mevcutParagraf, setMevcutParagraf] = useState(0);

  const paragraflar = [
    {
      baslik: "FAZLA SESSİZ KALMAK",
      icerik: [
        "Bir canavar, bir bölgeyi kendine yurt edinmiş ve insanları korkutmuş, sayısız zararlar vermişti. İnsanlar onunla mücadele etmeye çalışmışlar ama başa çıkamamışlar. Sonunda bir grup, yaşlı bir kadıya danışmaya karar vermiş.",
        "Kadı, canavarın bölgesine gitmiş ve onu beklemiş. Canavar görününce, kadı sakin bir şekilde ona yaşamak ve beslenmek için böyle şiddete gerek olmadığını, insanlara zarar vermenin ve öldürmenin yanlış olduğunu söylemiş.",
        "Canavar, kadının sözlerinden çok etkilenmiş ve artık kimseye zarar vermemeye çalışmış. Ancak bu sefer insanlar zalim olmuş ve canavara zarar vermeye başlamışlar, ona taş atmışlar.",
        "Canavar da bu sefer kadıya sığınmış ve insanların ona yaptığı zararlardan şikayet etmiş. Kadı, dikkatle dinledikten sonra şöyle cevap vermiş:",
        "&ldquo;– Ben sana sokma, öldürme! dedim. Tislama! Dişlerini gösterme! demedim ki...&rdquo;",
      ],
      dogruCevaplar: {
        soru1: "c",
        soru2: "b",
        soru3: "b",
        soru4: "c",
        soru5: "b",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Aşağıdakilerden hangisi okuduğunuz metnin başlığıdır?",
          secenekler: {
            a: "Fazla sesli olmak",
            b: "Alçak sesli olmak",
            c: "Fazla sessiz kalmak",
            d: "Yüksek sesli olmak",
          },
        },
        {
          id: "soru2",
          soru: "Okuduğunuz metnin kahramanlarından değildir?",
          secenekler: {
            a: "Halk",
            b: "Hayvanlar",
            c: "Canavar",
            d: "Kadı",
          },
        },
        {
          id: "soru3",
          soru: "Canavar ile mücadele edip başa çıkamayanlar kimlerdir?",
          secenekler: {
            a: "Hayvanlar",
            b: "İnsanlar",
            c: "Kadı",
            d: "Bitkiler",
          },
        },
        {
          id: "soru4",
          soru: "Canavarın yaşamak ve beslenmek için neye ihtiyacı yoktur?",
          secenekler: {
            a: "Yemek yemeye",
            b: "Barınmaya",
            c: "İnsanlarla anlaşmaya",
            d: "Su içmeye",
          },
        },
        {
          id: "soru5",
          soru: "Canavar insanların ona yaptıklarından sonra kime sığınmıştır?",
          secenekler: {
            a: "Arkadaşına",
            b: "Kadıya",
            c: "Hayvanlara",
            d: "Evine",
          },
        },
      ],
    },
    {
      baslik: "GURURLU GÜL",
      icerik: [
        "İlkbaharda güzel bir gül, kendi güzelliğiyle övünüyor ve etrafındaki bitkilere bakıp şöyle diyordu: &ldquo;Ne kadar da güzelim! Bütün bitkilerden daha güzelim!&rdquo; Sonra da kaktüse bakıp şöyle dedi: &ldquo;Sen ne kadar da çirkin ve korkunçsun! Dikenlerin insanların ellerine batıyor ve onları korkutuyor.&rdquo; Meşe ağacı gülün bu sözlerini duydu ve ona şöyle dedi: &ldquo;Gül, sen neden bu kadar gururlusun?&rdquo;",
        "Diğer çiçekler ve meşe ağacı gülün bu sözlerine çok şaşırdılar. Her bitkinin kendine özgü güzelliği olduğunu söylediler ama gül onları dinlemedi. Yaz geldi ve kuraklık başladı. Gül susuzluktan solmaya başladı.",
        "Gül, küçük serçelerin kaktüsün gövdesini gagaladığını ve su içtiklerini gördü. Çok şaşırdı ve meşe ağacına şöyle dedi: &ldquo;Serçeler ne yapıyor?&rdquo; Meşe ağacı şöyle cevap verdi: &ldquo;Kaktüsten su içiyorlar.&rdquo; Gül şaşkınlıkla şöyle dedi: &ldquo;Kaktüsün suyu mu var?&rdquo; Meşe ağacı şöyle dedi: &ldquo;Evet, var. Serçeler aracılığıyla kaktüsten su isteyebilirsin.&rdquo;",
        "Gül, kaktüs hakkında söylediği kötü sözler için çok pişman oldu. Her bitkinin kendine özgü güzelliği olduğunu anladı. Kaktüs de serçeler aracılığıyla güle su gönderdi ve gül solmaktan kurtuldu.",
      ],
      dogruCevaplar: {
        soru1: "b",
        soru2: "a",
        soru3: "d",
        soru4: "b",
        soru5: "d",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Gül niçin kendiyle övünüyor?",
          secenekler: {
            a: "Bülbül ona aşık olduğu için",
            b: "Bütün bitkilerden güzel olduğu için",
            c: "Yaprakları yeşil olduğu için",
            d: "Rengi kırmızı olduğu için",
          },
        },
        {
          id: "soru2",
          soru: "Gül, neden kaktüsün çirkin olduğunu düşünüyor?",
          secenekler: {
            a: "Kaktüsün dikenleri korkunç gözüküyor diye",
            b: "Kaktüsün dikenleri insanların ellerine batıyor diye",
            c: "Kaktüsün rengi kırmızı değil diye",
            d: "Kaktüs ilkbaharda çiçek açmıyor diye",
          },
        },
        {
          id: "soru3",
          soru: "Gül neden solmaya başlamış?",
          secenekler: {
            a: "Kış geldiği ve üzerine kar yağdığı için",
            b: "Yağmurdan ıslanıp hasta olduğu için",
            c: "Etrafı sarmaşıklarla sarıldığı için",
            d: "Yaz geldiği ve susuz kaldığı için",
          },
        },
        {
          id: "soru4",
          soru: "Serçeler niçin kaktüsün gövdesini gagalıyorlar?",
          secenekler: {
            a: "Kaktüsün dikenlerini yok etmek için",
            b: "Kaktüsün gövdesinden su içmek için",
            c: "Gülün intikamını almak için",
            d: "Karınlarını doyurmak için",
          },
        },
        {
          id: "soru5",
          soru: "Gül nasıl solmaktan kurtulmuş?",
          secenekler: {
            a: "Meşe ağacı yapraklarındaki suyu vermiş",
            b: "Bülbül güle gölden su taşımış",
            c: "Küçük bir bulut gelip yağmur olmuş",
            d: "Kaktüs serçelerle güle su göndermiş",
          },
        },
      ],
    },
    {
      baslik: "YAKUP'UN ŞEFTALİ BAHÇESİ",
      icerik: [
        "Yakup ile annesi, köyün kenarında küçük bir evde yaşıyorlardı. Evin çevresi bahçeydi. Yakup'un annesi buraya, mevsimine göre çeşit çeşit sebze ekerdi. Yetişen ürünlerin bir bölümünü yer, kalanını pazar yerinde satardı.",
        "Bir yaz günü annesi pazara sebze satmaya gitmişti. Dönüşte kazandığı parayla iki kilo şeftali satın aldı. Köy pazarına şeftali çok seyrek gelirdi. Akşamüstü eve dönen Yakup, şeftalileri görünce çok sevindi. Bir oturuşta dört beş şeftali birden yedi, tadı damağında kaldı. Ağzının çevresini temizlerken: -Anne, dedi, bizim köyde yetişmez mi şeftali? -Yok, dedi anası.",
        "Yakup: -Neden, diye üsteledi. Annesi: -Bilmem, belki de köyün toprağı uygun değildir. Yakup devam etti: -Neden olmasın ki, denemeli bir kez. Annesi: -Olur tabi, diye onayladı oğlunu.",
        "İlkbahar gelince, anne oğul kasabaya indiler. Tarım memurluğuna gidip on tane şeftali fidanı satın aldılar. Bahçelerinin boş yerlerine bu fidanları diktiler. Yakup fidanları suladı. Fidanlardan üçü kurudu, diğerleri büyümeye devam etti. Yakup sevinçten uçuyordu.",
        "Böylece iki yıl geçti. Şeftali fidanları büyüyüp gelişti. Bir bahar günü ağaçları pembe pembe çiçekler açtı. Yakup ile annesi o gün bayram ettiler. Çiçek demek meyve demekti. Yakup'un en çok sevdiği meyve de şeftaliydi.",
      ],
      dogruCevaplar: {
        soru1: "a",
        soru2: "c",
        soru3: "d",
        soru4: "b",
        soru5: "d",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Yakup ile annesi nerede yaşıyorlardı?",
          secenekler: {
            a: "Köyün kenarında küçük bir evde",
            b: "Şeftali bahçesinde",
            c: "Pazar yerinde",
            d: "Köyün ortasındaki büyük evde",
          },
        },
        {
          id: "soru2",
          soru: "Annesi pazardan ne satın alıyor?",
          secenekler: {
            a: "İki kilo meyve",
            b: "Sebze ve meyve",
            c: "İki kilo şeftali",
            d: "İki kilo elma",
          },
        },
        {
          id: "soru3",
          soru: "Yakup ne yapmayı deniyor?",
          secenekler: {
            a: "Hemen şeftalileri yemeyi",
            b: "Annesine yardım etmeyi",
            c: "Annesi ile pazara gitmeyi",
            d: "Köyün toprağına şeftali dikmeyi",
          },
        },
        {
          id: "soru4",
          soru: "Bu kararını Yakup nasıl uyguluyor?",
          secenekler: {
            a: "İlk önce annesini kandırıyor",
            b: "Tarım memurluğuna gidiyor",
            c: "Arkadaşlarıyla konuşuyor",
            d: "Parasını biriktiriyor",
          },
        },
        {
          id: "soru5",
          soru: "Yakup kaç tane şeftali fidanı alıyor?",
          secenekler: {
            a: "On beş",
            b: "On iki",
            c: "On üç",
            d: "On",
          },
        },
      ],
    },
    {
      baslik: "BAŞARILI İNSAN DENEME CESARETİNE SAHİPTİR",
      icerik: [
        "Başarının temelinde; başarı ışığını yakalayabilmek ve bu ışığın aydınlığından yararlanabilmek, yolumuzu aydınlatabilmek için özveri, sabır, etkili çalışma, zorluklarla mücadele gücü, deneme cesareti, tevekkül gibi değerler vardır. İnsanın kişisel yetenek ve potansiyelinin farkında olmaması, buna inanmaması kişiyi başarıdan uzak tutar. İnsan kategorize edilmesinde de bu düşünce etkendir. Kişinin yetenek ve potansiyeline inanmaması, kendini tanımaması, onun kendini diğerleri sınıfına koymasına sebep olacaktır. Mutlu olanlar-mutsuz olanlar, başarılı olanlar -başarısızlar, yönetenler- yönetilenler, zenginler-fakirler vs. şeklinde oluşturduğu sınıflarda kendini hep olumsuzlar grubuna dahil eder.",
        "Deneme cesareti olmayan insanların zihinleri, yürekleri, korkularla, endişelerle doludur. Kendilerine inanmazlar ve en önemlisi kendilerinden korkarlar.",
        "İstanbul'un fethinde gemileri karadan yürüterek Haliç'e indirilmesi, fethin gerçekleştirilmesini sağlamıştır. Fatih Sultan Mehmet Han (II.Mehmet)'ın deneme cesareti sayesinde gemiler karadan yürütülmüş, İstanbul fethedilmiş ve bir çağ kapanmış yeniçağ başlamıştır.",
        "Her insan deneme cesareti sayesinde fetihler yapabilir, hayatında yeniçağlar başlatabilir. Eli kolu bağlı durmak, hiçbir şey yapmamak yerine cesaretini toplayarak hareket eden insanlar diğerleri onu gıpta ile izlerken ödüllerini mutlaka alırlar. Ödül ne mi? Başarı.",
        "Başarı ve başarısızlık arasında çok ince bir çizgi vardır. Akılla deneme cesaretini birleştirmiş insanlar, çizginin hep başarı tarafında olacaklardır. Er ya da geç!",
        "Tercihlerini cesaretle deneme yönünde kullanan insanlar, hayattaki en renkli başarıları yaşarlar. Karşılaştıkları her zorluğu, sıkıntıyı, er ya da geç bu özellikleriyle aşarlar.",
        "Hani Türkçe'mizde bir söz vardır: &ldquo;Bilmemek ayıp değil öğrenmemek ayıp&rdquo; diye. Buna ilave yaparak &ldquo;Öğrenmek için de harekete geçmek değil, eli kolu bağlı durmak ve denemekten korkmak ayıp&rdquo; olarak kullanırız.",
        "Başarısızlık korkusu birçok insanın elini kolunu bağlayan bir sonuçtur. Bu korku kişiyi denemekten, harekete geçmekten alıkoyar. Denemeyi göze alamayan, kendine bu fırsatı tanımayan, tercihini deneme cesaretini kullanma yönünde yapmayan insan; kendini, başarı potansiyelini yok olmaya mahkum etmiştir.",
      ],
      dogruCevaplar: {
        soru1: "a",
        soru2: "c",
        soru3: "b",
        soru4: "a",
        soru5: "a",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Yukarıdaki parçada yazar neyi ele almaktadır?",
          secenekler: {
            a: "Deneme cesareti",
            b: "Korku",
            c: "Başarısızlık",
            d: "Başarı",
          },
        },
        {
          id: "soru2",
          soru: "Başarı ışığının aydınlığından yararlanabilmek için aşağıdaki değerlerden hangisi geçerli değildir?",
          secenekler: {
            a: "Özveri ve sabır",
            b: "Deneme cesareti",
            c: "Kıskançlık ve hasret",
            d: "Zorluklarla mücadele gücü",
          },
        },
        {
          id: "soru3",
          soru: "Kişinin kendisini diğerleri sınıfına koymasının sebebi nedir?",
          secenekler: {
            a: "Diğer insanları yakından tanıması",
            b: "Kendi yetenek ve potansiyeline inanmaması",
            c: "Diğerlerinin yaptıklarına hayran olması",
            d: "Kendisinin diğerlerinden daha başarılı olduğuna inanması",
          },
        },
        {
          id: "soru4",
          soru: "Deneme cesareti sayesinde büyük fetihler yapan kişi kimdir?",
          secenekler: {
            a: "II. Mehmet",
            b: "Sarı Mehmet",
            c: "V. Mehmet",
            d: "Başkan Mehmet",
          },
        },
        {
          id: "soru5",
          soru: "Bu parçanın başlığı ve yazarı kimdir?",
          secenekler: {
            a: "Başarılı insan deneme cesaretine sahiptir. Niyazi Fırat Eres",
            b: "Başarısız insan hiç bir şeye cesaret edemez. Niyazi Fırat",
            c: "Deneme Cesareti. Enes Fırat",
            d: "İstemek başarmanın yarısıdır. Niyazi Fırat Başarı",
          },
        },
      ],
    },
    {
      baslik: "ÇATLAK KOVA",
      icerik: [
        "Hindistan'da bir sucu varmış. İki büyük kova ile evine su taşırmış. Kovaların biri mükemmel, diğeri ise çatlakmış. Mükemmel kova her seferinde tam dolu olarak eve ulaşırken, çatlak kova sadece yarısı kadar su getiriyormuş.",
        "İki sene boyunca bu durum böyle devam etmiş. Çatlak kova, kendisinin sadece yarısı kadar su getirebilmesi yüzünden kendini yetersiz hissetmiş ve sucudan özür dilemeye karar vermiş.",
        "Sucuya şöyle demiş: &ldquo;Kendimden utanıyorum ve senden özür diliyorum.&rdquo; Sucu sordu: &ldquo;Neden utanıyorsun?&rdquo; Kova cevap verdi: &ldquo;Çünkü iki senedir çatlağım yüzünden suyun yarısını eve ulaştıramıyorum. Kusurum yüzünden senin emeğinin tam karşılığını alamıyorsun.&rdquo;",
        "Sucu kovaya şöyle dedi: &ldquo;Eve giderken yol kenarında gördüğün çiçekleri fark ettin mi?&rdquo; Kova evet dedi. Sucu devam etti: &ldquo;Tepeyi tırmanırken senin tarafında çiçekler var, diğer tarafta yok. Bunun sebebi senin kusurun. Her gün senin tarafından çiçekleri suluyorum.&rdquo;",
        "Sucu çiçekleri toplayıp patronun sofrasına süs olarak koyuyormuş. Çatlak kova artık kusurunun faydaya çevrildiğini anlamış. Herkesin kusurları olabilir ama önemli olan bu kusurları faydaya çevirebilmektir.",
      ],
      dogruCevaplar: {
        soru1: "a",
        soru2: "b",
        soru3: "c",
        soru4: "b",
        soru5: "a",
        soru6: "a",
        soru7: "a",
        soru8: "c",
        soru9: "b",
        soru10: "a",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Hikaye hangi ülkede geçiyor?",
          secenekler: {
            a: "Hindistan",
            b: "Arabistan",
            c: "Habeşistan",
          },
        },
        {
          id: "soru2",
          soru: "Kovanın kusuru neymiş?",
          secenekler: {
            a: "Sapı yokmuş",
            b: "Çatlakmış",
            c: "Fazla ağırmış",
          },
        },
        {
          id: "soru3",
          soru: "Kusurlu kova dayanamayıp sucudan özür dilemeye kalkıncaya kadar kaç sene çalışmış?",
          secenekler: {
            a: "4",
            b: "3",
            c: "2",
          },
        },
        {
          id: "soru4",
          soru: "İçinde bulunduğu durum bu kovayı nasıl etkilemiş?",
          secenekler: {
            a: "Kızdırmış",
            b: "Utandırmış",
            c: "Ümitlendirmiş",
          },
        },
        {
          id: "soru5",
          soru: "Kusurlu kova sucu için ne düşünerek, üzülüyormuş?",
          secenekler: {
            a: "Sucu çok çalıştığı halde benim yüzümden emeğinin tam karşılığını alamıyor",
            b: "O çok çalışıp, az maaş alıyor",
            c: "Patronu ona çok kötü davranıyor",
          },
        },
        {
          id: "soru6",
          soru: "Sucu, kovaya neyi hatırlatmış?",
          secenekler: {
            a: "Eve giderken yol kenarında görülen çiçekleri",
            b: "Geçen yıllarda ne güzel günler yaşadıklarını",
            c: "Sıkıntılarla dolu geçen günleri",
          },
        },
        {
          id: "soru7",
          soru: "Tepeyi tırmanırken çatlak kova tarafında neler varmış?",
          secenekler: {
            a: "Çiçekler",
            b: "Taşlar",
            c: "Ağaçlar",
          },
        },
        {
          id: "soru8",
          soru: "Kovanın kusurunu farkeden sucu ne yapmış?",
          secenekler: {
            a: "Kovaya çok kötü bir şekilde kızmış",
            b: "Onu azarlayıp, bir köşeye fırlatıp atmış",
            c: "Kusurunu faydaya çevirmeyi düşünmüş",
          },
        },
        {
          id: "soru9",
          soru: "Sucu çiçekleri ne yapmış?",
          secenekler: {
            a: "Koparıp yol kenarlarını temizlemiş",
            b: "Patronun sofrasına süs olarak koymuş",
            c: "Pazara götürüp satarak, para kazanmış",
          },
        },
        {
          id: "soru10",
          soru: "Parçanın verdiği ders nedir?",
          secenekler: {
            a: "Kusurlarımızı bilip, faydaya çevirmeliyiz",
            b: "Kovalar çatlarsa onları çöpe atmalıyız",
            c: "İnsanlara güzel davranmalıyız",
          },
        },
      ],
    },
    {
      baslik: "BAŞARABİLECEĞİNE İNANIRSAN BAŞARIRSIN",
      icerik: [
        "Başarı, kişisel refahı ifade eder. Güzel bir ev, tatiller, seyahatler, yeni deneyimler, mali güvenlik ve çocuklarınız için en iyisini sağlamak anlamına gelir. Aynı zamanda takdir edilmek, liderlik yapmak ve profesyonel ve sosyal hayatta saygı görmek demektir. Endişelerden, korkulardan, hayal kırıklığından ve başarısızlıktan özgür olmak anlamına gelir. Başarı, kişisel saygı, sürekli gerçek mutluluk ve tatmin bulmak ve size bağımlı olanlar için daha fazlasını yapmak demektir. Başarı, kazanmak demektir.",
        "Her insan başarıyı ve hayatın sunabileceği en iyisini arzular. Hiç kimse mücadele etmek, sıradan bir hayat yaşamak veya ikinci sınıf bir vatandaş gibi hissetmek ve bu şekilde devam etmeye zorlanmak istemez.",
        "Gerçekten inanırsanız, bir dağı yerinden oynatabilirsiniz. Birçok insan bir dağı yerinden oynatabileceklerine inanmaz ve bu yüzden denemez bile. Sadece bir dağa &ldquo;yerinden kalk&rdquo; demek saçma ve imkansızdır.",
        "Bu görüşü savunan insanlar inanç ile arzuyu karıştırır. Sadece bir şeyi arzulamak bir dağı yerinden oynatamaz, sizi üst düzey bir yönetici pozisyonuna, beş yatak odalı ve üç banyolu bir eve veya yüksek bir gelire götüremez. Arzu tek başına sizi bir liderlik pozisyonuna yerleştiremez.",
      ],
      dogruCevaplar: {
        soru1: "b",
        soru2: "b",
        soru3: "a",
        soru4: "c",
        soru5: "b",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Başarı neyi ifade eder?",
          secenekler: {
            a: "Refah ve huzuru",
            b: "Harika ve olumlu şeyi",
            c: "Huzur ve olumlu şeyi",
            d: "Güzel ve harika şeyi",
          },
        },
        {
          id: "soru2",
          soru: "Başarı ne demek değildir?",
          secenekler: {
            a: "Taktir edilmek",
            b: "İnsanlar tarafından sayılmak",
            c: "Kişisel saygı",
            d: "Dağı yerinden oynatabilmek",
          },
        },
        {
          id: "soru3",
          soru: "Her insan hangi duyguyu yaşamak istemez?",
          secenekler: {
            a: "Kaybetme duygusu",
            b: "Başarılı olma duygusu",
            c: "Saygılı olma duygusu",
            d: "İkinci sınıflık duygusu",
          },
        },
        {
          id: "soru4",
          soru: "İnsan ne yapmayı denemez?",
          secenekler: {
            a: "Saygı duymayı",
            b: "Başarılı olmayı",
            c: "Dağı yerinden oynatabileceğini",
            d: "Lider olmayı",
          },
        },
        {
          id: "soru5",
          soru: "Arzu olmakla kendimizi nerede bulamayız?",
          secenekler: {
            a: "Liderlik pozisyonunda",
            b: "Başarılı insan pozisyonunda",
            c: "Saygı duyulan pozisyonda",
            d: "Kazanmak pozisyonunda",
          },
        },
      ],
    },
    {
      baslik: "SALYANGOZ VE EVİ",
      icerik: [
        "Salyangozları bilir misiniz? Onlar da tıpkı kaplumbağalar gibi evlerini sırtlarında taşırlar.",
        "Bir zamanlar, evini sırtında taşımaktan hoşlanmayan sevimsiz bir salyangoz yaşarmış. Üstelik evinin rengi de hiç hoşuna gitmezmiş. Bizim salyangoz, kelebek ve uğurböceğini çok severmiş. Arada bir onlarla dertleşir, sırtında taşıdığı evi onlara şikâyet edermiş. &ldquo;Ah keşke!&rdquo; dermiş. &ldquo;Evimi sırtımda taşımak zorunda olmasaydım. Hadi taşıyorum, bari sizinki gibi bol desenli ve renkli olsaydı.&rdquo;",
        "Kelebek ve uğurböceği bir gün salyangoza; &ldquo;Sevgili arkadaşımız!&rdquo; demişler. &ldquo;Hani evim renkli olsun diyorsun ya, biz çaresini bulduk. Ressam olan bir tırtıl var. Seni ona götürürsek eğer, evini rengarenk boyar.&rdquo; Salyangoz buna çok sevinmiş. &ldquo;Ne duruyoruz! Hemen gidelim.&rdquo; demiş. Böylece düşmüşler yola.",
        "Tırtılın kapısını çalmışlar. Gelen misafirleri dinleyen tırtıl, boyalarını ve fırçasını alıp çalışmaya başlamış. Sonunda salyangozun evine çok güzel desenler çizmiş. Salyangoz yeni görüntüsünü beğenmiş beğenmesine ama yine de evinin sırtında olması onu çok üzüyormuş.",
        "Dönüş yolculuğunda üç arkadaş şiddetli bir yağmura yakalanmış. Kelebek ve uğurböceği öyle ıslanmışlar ki, sele kapılmaktan zor kurtulmuşlar. Oysa salyangoz hemencecik evinin içine girmiş.",
        "Yağmur dinip de evinden dışarı çıkınca, arkadaşlarının perişan halini görüp üzülmüş. Sonra da kendi kendine şöyle düşünmüş: -&ldquo;İyi ki saklanabileceğim bir evim var. Rengi olmasa da beni yağmurdan koruyor ya.&rdquo;",
        "Sevimli salyangoz bu olaydan sonra bir daha hiç üzülmemiş.",
      ],
      dogruCevaplar: {
        soru1: "a",
        soru2: "d",
        soru3: "a",
        soru4: "c",
        soru5: "c",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Salyangozun sorunu nedir?",
          secenekler: {
            a: "Evini sırtında taşımaktan hoşlanmamaktadır",
            b: "Arkadaşı olmadığı için sıkılmaktadır",
            c: "Günü çok kötü geçmiştir",
            d: "Yağmurda ıslanmıştır",
          },
        },
        {
          id: "soru2",
          soru: "Salyangoz kimleri çok severmiş?",
          secenekler: {
            a: "Küçük böcekleri",
            b: "Onu sevenleri",
            c: "Herkesi",
            d: "Kelebek ve uğurböceğini",
          },
        },
        {
          id: "soru3",
          soru: "Salyangoz neye çok sevinmiş?",
          secenekler: {
            a: "Tırtılın evini rengarenk boyayacak olmasına",
            b: "Başkalarının da kusurları olmasına",
            c: "Okula gidecek olmasına",
            d: "Arkadaşlarının onu çok sevmesine",
          },
        },
        {
          id: "soru4",
          soru: "Üç arkadaşın başına dönüş yolunda nasıl bir felaket gelmiş?",
          secenekler: {
            a: "Yollarını kaybetmişler",
            b: "Paralarını kaybetmiş, aç kalmışlar",
            c: "Çok şiddetli bir yağmura yakalanmışlar",
            d: "Kaza geçirmişler",
          },
        },
        {
          id: "soru5",
          soru: "Metnin ana düşüncesi nedir?",
          secenekler: {
            a: "Arkadaşlarımızla iyi geçinmeliyiz",
            b: "Dostluk her zaman iyidir",
            c: "Her özelliğimizin bir değeri vardır",
            d: "Başkalarının kötü durumuna üzülmemeliyiz",
          },
        },
      ],
    },
    {
      baslik: "ÜÇ EVLAT",
      icerik: [
        "Üç kadın çeşme başında su dolduruyorlardı. Birinci kadın oğlunu methediyordu:",
        "&ldquo;– Benim oğlum çok marifetlidir. Cambazdır o. İp üzerinde bir yürüse de görseniz.&rdquo;",
        "İkinci kadın da oğlunu övüyordu:",
        "&ldquo;– Benim oğlumun sesi çok güzeldir. Tıpkı bir bülbül gibi şakır.&rdquo;",
        "Üçüncü kadına sordular:",
        "&ldquo;– Sen neden oğlunu methetmiyorsun?&rdquo;",
        "Kadın cevap verdi:",
        "&ldquo;– Benim oğlumun hiçbir marifeti yoktur.&rdquo;",
        "Kadınlar kovaları doldurup evlerine dönmeye başladılar. Kovalar ağırdı. Sırtları ağrı içindeydi. Çocukları onları karşılamaya geldi.",
        "Birinci çocuk ellerini üzerinde havaya kalkmış, çeşitli marifetler gösteriyordu. İkinci çocuk altın gibi bir sesle öyle güzel şarkılar söyledi ki, kadınlar hayran kaldılar. Üçüncü çocuk koşarak geldi, annesinin elinden kovayı aldı ve eve kadar taşıdı.",
        "Kadınlar ihtiyar bir adama sordular:",
        "&ldquo;– Bizim çocuklarımız hakkında ne düşünüyorsun?&rdquo;",
        "İhtiyar adam cevap verdi:",
        "&ldquo;– Çocuklarınızı tanımıyorum. Yalnız biri vardı, annesinin elinden kovayı alıp eve taşıdı. Onu çok beğendim.&rdquo;",
      ],
      dogruCevaplar: {
        soru1: "a",
        soru2: "c",
        soru3: "d",
        soru4: "c",
        soru5: "c",
      },
      sorular: [
        {
          id: "soru1",
          soru: "İlk kadın oğlunu nasıl methediyor?",
          secenekler: {
            a: "Çok marifetlidir",
            b: "Çalışkandır",
            c: "Bülbül gibi sesi vardır",
            d: "Çok hızlıdır",
          },
        },
        {
          id: "soru2",
          soru: "İkinci kadın oğlunun neyini övüyor?",
          secenekler: {
            a: "Çalışkanlığını",
            b: "Güzelliğini",
            c: "Sesini",
            d: "Üstünlüğünü",
          },
        },
        {
          id: "soru3",
          soru: "Kadınlar kovaları taşımaktan nereleri ağrı içindeydi?",
          secenekler: {
            a: "Elleri",
            b: "Kolları",
            c: "Ayakları",
            d: "Sırtları",
          },
        },
        {
          id: "soru4",
          soru: "İkinci çocuk koşarak ne yaptı?",
          secenekler: {
            a: "Annesini elinden kovaları aldı",
            b: "Kadınlara dans etti",
            c: "Bülbül gibi sesiyle güzel şarkılar söyledi",
            d: "Elleri havaya kaldırdı",
          },
        },
        {
          id: "soru5",
          soru: "İhtiyar adam hangi çocuğu beğendi?",
          secenekler: {
            a: "Dans eden çocuğu",
            b: "Güzel şarkılar söyleyen çocuğu",
            c: "Annesinin elinden kovayı alan çocuğu",
            d: "En güzel olan çocuğu",
          },
        },
      ],
    },
    {
      baslik: "FİNCAN TAKIMI",
      icerik: [
        "Kapıyı iki çocuk çalmış. Eski gazete istiyorlarmış. Onları içeri davet ettim. Kakao yaptım, reçel ve ekmek ikram ettim. Misafirler şöminenin önünde karınlarını doyurdular.",
        "Erkek çocuk bana sordu:",
        "&ldquo;– Siz zengin misiniz?&rdquo;",
        "Kız çocuk da şöyle dedi:",
        "&ldquo;– Sizin ne güzel fincan takımınız var!&rdquo;",
        "Çocuklar gittikten sonra kendi mavi fincan ve tabaklarımı düşündüm. Ne kadar da zenginmişim! Çocukların halıdaki çamurlu ayak izlerini silmedim. Bu hissi unutmamak için.",
      ],
      dogruCevaplar: {
        soru1: "a",
        soru2: "c",
        soru3: "a",
        soru4: "b",
        soru5: "c",
        soru6: "b",
        soru7: "a",
        soru8: "c",
        soru9: "a",
        soru10: "c",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Kapıyı kim çalmış?",
          secenekler: {
            a: "İki çocuk çalmış",
            b: "Komşunun kızı çalmış",
            c: "Sütçü amca çalmış",
          },
        },
        {
          id: "soru2",
          soru: "Kadın gelenlere ne ikram ediyor?",
          secenekler: {
            a: "Çay demliyor",
            b: "Kek ikram ediyor",
            c: "Kakao yapıyor",
          },
        },
        {
          id: "soru3",
          soru: "Halıdaki izler nasıl oluşmuş?",
          secenekler: {
            a: "Islak ayakkabılar yüzünden",
            b: "Dökülen çaydan dolayı",
            c: "Kek düştüğü için",
          },
        },
        {
          id: "soru4",
          soru: "Misafirler şöminenin önünde ne yapmış?",
          secenekler: {
            a: "Oyun oynamışlar",
            b: "Karınlarını doyurmuşlar",
            c: "Ellerini ve ayaklarını ısıtmışlar",
          },
        },
        {
          id: "soru5",
          soru: "Erkek çocuk kadına ne sormuş?",
          secenekler: {
            a: "Çocuğunuz var mı?",
            b: "Bir fincan daha alabilir miyim?",
            c: "Siz zengin misiniz?",
          },
        },
        {
          id: "soru6",
          soru: "Çocuklar ne yapmayı unutmuşlar?",
          secenekler: {
            a: "Hoşçakalın demeyi",
            b: "Teşekkür etmeyi",
            c: "Kapıyı kapatmayı",
          },
        },
        {
          id: "soru7",
          soru: "Fincanlar hangi renkteymiş?",
          secenekler: {
            a: "Mavi",
            b: "Sarı",
            c: "Kırmızı",
          },
        },
        {
          id: "soru8",
          soru: "Kadın bu ziyaretten niçin çok memnun olmuş?",
          secenekler: {
            a: "Onları çok özlediği için",
            b: "Çocukları çok sevdiği için",
            c: "Elindekilerle mutlu olmayı öğrendiği için",
          },
        },
        {
          id: "soru9",
          soru: "Kadın, elindeki zenginliklerin çokluğunu unutmamak için ne yapmış?",
          secenekler: {
            a: "Çocukların ayak izlerini silmemiş",
            b: "Bunları hemen günlüğüne yazmış",
            c: "Bütün komşularına olanları anlatmış",
          },
        },
        {
          id: "soru10",
          soru: "Parçanın adı nedir?",
          secenekler: {
            a: "Fakir çocuklar",
            b: "Çocuklarla bir anım",
            c: "Fincan takımı",
          },
        },
      ],
    },
    {
      baslik: "SAĞIRIN HASTA ZİYARETİ",
      icerik: [
        "Komşunun hasta olduğunu öğrenen iyi kalpli sağır adam, onu ziyaret etmeye karar verdi. Ziyaret sırasında ne konuşacağını, komşusunun ne cevap vereceğini düşündü. Sağır olduğu için konuşmaları yanlış anlayacağını biliyordu.",
        "Hasta komşusunun yanına gitti ve nasıl olduğunu sordu. Hasta:",
        "&ldquo;– Ölüyorum!&rdquo; dedi.",
        "Sağır adam bunu yanlış anladı ve:",
        "&ldquo;– Oh oh, çok memnun oldum!&rdquo; diye cevap verdi.",
        "Sonra hastaya ne yiyip ne içtiğini sordu. Hasta öfkeyle:",
        "&ldquo;– Zehir!&rdquo; dedi.",
        "Sağır adam bunu da yanlış anladı ve:",
        "&ldquo;– Afiyet olsun!&rdquo; dedi.",
        "Hastaya gelen doktor hakkında da konuştular. Sağır adam doktorun bilgili ve tecrübeli olduğunu söyledi.",
        "Bu hikaye Mevlana'nın Mesnevi'sinden alınmıştır. Duygu kulağı sağır olsa bile, gönül kulağı açık olmalıdır. Çünkü gönül kulağı her şeyi işitir ve anlar.",
      ],
      dogruCevaplar: {
        soru1: "b",
        soru2: "c",
        soru3: "d",
        soru4: "a",
        soru5: "b",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Komşunun en önemli özelliği nedir?",
          secenekler: {
            a: "Hasta olması",
            b: "Sağır olması",
            c: "Sesinin çıkmaması",
            d: "Ziyarete gitmesi",
          },
        },
        {
          id: "soru2",
          soru: "Komşunun nasılsınız sorusuna hasta ne cevap vermektedir?",
          secenekler: {
            a: "İyiyim",
            b: "Hastayım",
            c: "Ölüyorum",
            d: "Sağırım",
          },
        },
        {
          id: "soru3",
          soru: "Komşunun ne yiyip ne içiyorsun sorusuna hasta ne cevap vermiştir?",
          secenekler: {
            a: "Yemek yiyorum",
            b: "Su içiyorum",
            c: "Hiç bir şey yiyemiyorum",
            d: "Zehir yiyorum",
          },
        },
        {
          id: "soru4",
          soru: "Hastaya gelen doktorun, komşu nasıl bir doktor olduğunu söyler?",
          secenekler: {
            a: "Bilgili ve Tecrübeli",
            b: "Çalışkan ve Dürüst",
            c: "Çalışkan ve Tecrübeli",
            d: "Bilgili ve Çalışkan",
          },
        },
        {
          id: "soru5",
          soru: "Metnin ana fikri nedir?",
          secenekler: {
            a: "Duygu kulağının açık olması",
            b: "Gönül kulağının açık olması",
            c: "Gönül kulağının kapalı olması",
            d: "Duygu kulağının işitmesi",
          },
        },
      ],
    },
    {
      baslik: "CAHİL PRENS",
      icerik: [
        "Çok akıllı bir kral varmış. Yakışıklı ama cahil ve tembel bir oğlu varmış. Kral oğlunun bu hali karşısında çok üzülüyormuş. Çünkü onun tek hayali oğlunun büyük bir alim olmasıymış. Öldükten sonra ülkesini cahil bir krala bırakmak istemiyormuş. Oğlunu düzeltemeyince ülkesindeki büyücüye gitmiş. Büyücü krala şöyle demiş: &ldquo;Dünyada çok güzel ama başarısız ve cahil insanlar var. Çok çirkin ama akıllı ve çalışkan insanlar da var.&rdquo; Kral bu sözlerden biraz rahatlamış ve sarayına dönmüş.",
        "Bir süre sonra kral oğluna bir hoca tutmaya karar vermiş. Ülkedeki bütün hocaları çağırmış ve en çirkin olanını seçmiş. Bu hoca çok akıllı ve çalışkanmış. Prens hoca tutulduğunu duyunca ders almak istememiş. &ldquo;Ben bu halimle mutluyum&rdquo; demiş ve babasının odasından çıkmış. Ama yeni hoca vazgeçmeye niyetli değilmiş.",
        "Günlük derslere rağmen prens hala uyum sağlayamıyormuş. Sonunda hoca sabrını kaybetmiş ve prense bir tokat atmış. Tokat karşısında şaşıran prens hiçbir şey söylemeden oturmuş ve yavaş yavaş okuma yazma öğrenmeye başlamış. Uzun bir süre sonra genç prens kitaplar okumaya ve çeşitli sorular sormaya başlamış. Kral bu gelişmeye çok sevinmiş ve hocaya tonlarca hediye vermiş. Prens istenen duruma gelince hoca saraydan uzaklaştırılmış. Genç yaşına rağmen prens gerçekten büyük bir alim olmuş.",
        "Bu masal çocuklara istedikleri her şeyi başarabileceklerini, azimle hiçbir şeyin imkansız olmadığını öğretir.",
      ],
      dogruCevaplar: {
        soru1: "c",
        soru2: "b",
        soru3: "d",
        soru4: "b",
        soru5: "a",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Kralın oğlunun özelliklerinden biridir?",
          secenekler: {
            a: "Akıllı ve zeki olması",
            b: "Sabırlı ve tembel olması",
            c: "Cahil ve yakışıklı olması",
            d: "Çalışkan ve miskin olması",
          },
        },
        {
          id: "soru2",
          soru: "Kral neden oğlunun bu özelliklere sahip olmasını istiyor?",
          secenekler: {
            a: "Ülkesini yakışıklı bir kralın yönetmesini istediği için",
            b: "Ülkesini cahil bir krala bırakmak istemediği için",
            c: "Ülkesini korumak istediği için",
            d: "Ülkesini sevdiği için",
          },
        },
        {
          id: "soru3",
          soru: "Kralın tek hayali nedir?",
          secenekler: {
            a: "Oğlunun kendinden sonra tahta geçmesi",
            b: "Oğlunun diğer çocuklar gibi yakışıklı olması",
            c: "Oğlunun güzel bir kızla evlenmesi",
            d: "Oğlunun büyük bir alim olması",
          },
        },
        {
          id: "soru4",
          soru: "Kral derdini kime anlatmış?",
          secenekler: {
            a: "Hocaya",
            b: "Büyücüye",
            c: "Vezire",
            d: "Oğluna",
          },
        },
        {
          id: "soru5",
          soru: "Prens ne zaman okumaya yazmaya başlamış?",
          secenekler: {
            a: "Öğretmen, prense tokat attıktan sonra",
            b: "Babası oğluna kızdıktan sonra",
            c: "Aklı başına geç geldikten sonra",
            d: "Büyücü büyü yaptıktan sonra",
          },
        },
      ],
    },
    {
      baslik: "RESİM YAPMAYA AŞIK BİR RESSAM",
      icerik: [
        "Ankara'da Pirinç Han'da Kemal Çelik adında bir ressamla tanıştım. Onun atölyesine gittiğimde, 60-65 yaşlarında görünen ama kendini 32 yaşında niteleyen bir adamla karşılaştım. Kemal Çelik Artvin'liymiş ve resim yapmaya aşık bir sanatçıymış.",
        "Kemal Bey, 40 yaşından sonra üniversiteye girmiş ve resim eğitimi almış. Ona göre sanatın en güzel yanı, insanı zengin ve mutlu yaşatmasıymış. Müzelerin değerli olmasının sebebi de içlerinde sanat yapıtlarının bulunmasıymış.",
        "Kemal Çelik'in atölyesi, Pirinç Han'ın bir köşesinde yer alıyor. Burada günlerini resim yaparak geçiriyor ve sanatın insan hayatına kattığı değerleri anlatıyor. Onun için yaş, sadece bir sayıdan ibaret. Asıl önemli olan sanata olan tutkusu ve yaratıcılığı.",
        "Rasim YILMAZ",
      ],
      dogruCevaplar: {
        soru1: "a",
        soru2: "c",
        soru3: "b",
        soru4: "c",
        soru5: "b",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Metinde adı geçen Pirinç Han nerededir?",
          secenekler: {
            a: "Ankara/ Ulus",
            b: "Trabzon/ Yorma",
            c: "Tekirdağ/ Çorlu",
            d: "Sinop/ Boyabat",
          },
        },
        {
          id: "soru2",
          soru: "Yazar ve arkadaşları çaycıya kimi soruyor?",
          secenekler: {
            a: "Kemal Unakıtan",
            b: "Kemal Derviş",
            c: "Kemal Çelik",
            d: "Kemal Sunal",
          },
        },
        {
          id: "soru3",
          soru: "Kemal Çelik kimdir?",
          secenekler: {
            a: "Terzi",
            b: "Ressam",
            c: "Kaynakçı",
            d: "Heykeltıraş",
          },
        },
        {
          id: "soru4",
          soru: "Kemal Çelik kaç yaşlarındadır?",
          secenekler: {
            a: "50-55",
            b: "40-50",
            c: "60-65",
            d: "65-70",
          },
        },
        {
          id: "soru5",
          soru: "Kemal Çelik kendini kaç yaşında nitelendiriyor?",
          secenekler: {
            a: "30",
            b: "20",
            c: "32",
            d: "47",
          },
        },
        {
          id: "soru6",
          soru: "Kemal Çelik nerelidir?",
          secenekler: {
            a: "Artvin",
            b: "Rize",
            c: "Sinop",
            d: "Trabzon",
          },
        },
        {
          id: "soru7",
          soru: "Kemal Bey kaç yaşından sonra üniversiteye girmiştir?",
          secenekler: {
            a: "30 yaşından sonra",
            b: "20 yaşından sonra",
            c: "35 yaşından sonra",
            d: "40 yaşından sonra",
          },
        },
        {
          id: "soru8",
          soru: "Müzeler niçin değerlidir?",
          secenekler: {
            a: "Taş ve beton yığını oldukları için",
            b: "Güzel oldukları için",
            c: "Tarihi oldukları için",
            d: "İçlerinde sanat yapıtları olduğu için",
          },
        },
        {
          id: "soru9",
          soru: "Metnin yazarı kimdir?",
          secenekler: {
            a: "Rasim Üstün",
            b: "Recep Yokuş",
            c: "Rasim Yılmaz",
            d: "Remzi Yıkılmaz",
          },
        },
        {
          id: "soru10",
          soru: "Kemal Bey'e göre sanatın en güzel yanı nedir?",
          secenekler: {
            a: "Güzelliğe hitap etmesi",
            b: "İnsanı zengin ve mutlu yaşatması",
            c: "Yaratıcılığı geliştirmesi",
            d: "Estetik bir değer olması",
          },
        },
      ],
    },
    {
      baslik: "HAZIRA KONMAK",
      icerik: [
        "Atlas Okyanusu'nda bir ada varmış. Bu adada insanlar yaşarmış. Bu insanlar maymunların düşürdüğü hindistan cevizleri ile beslenirlermiş. Maymunlar hastalanıp ölünce, insanlar da açlıktan ölmüşler.",
        "Dünyanın nimetleri ancak çalışanlara nasip olur. Mutlu ve başarılı bir hayat sürmek için çalışmak şarttır. Hazine ancak çok çalışana görünür. Başarı, üstün yetenekli olmaya değil, gösterdiğiniz irade gücü, azim ve çabanın miktarına bağlıdır.",
        "Toplum hayatına katılacak insan kendine şu soruyu sormalıdır: 'Ben nasıl çalışacağım?' Büyüklerimiz 'Emek olmadan yemek olmaz' derler. 'Çalışmakta rahmet ve bereket vardır' diye de eklerler. Çalışmayan hayatın nimetlerinden yoksun kalır.",
        "Hayat tembeller için sert ve acımasızdır. Hayatla çalışarak mücadele etmek gerekir. Çünkü hayat çetin bir mücadelenin yapıldığı bir güreş minderi gibidir.",
        "Ekmeğini kazanmayan, başkalarının sırtından geçinmeye çalışan kimse, hayatın nimetlerinden mahrum kalır.",
      ],
      dogruCevaplar: {
        soru1: "c",
        soru2: "b",
        soru3: "b",
        soru4: "c",
        soru5: "a",
        soru6: "d",
        soru7: "b",
        soru8: "b",
        soru9: "d",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Ada hangi okyanustaydı?",
          secenekler: {
            a: "Atlantik",
            b: "Afrika",
            c: "Atlas",
            d: "Antartika",
          },
        },
        {
          id: "soru2",
          soru: "İnsanlar adada ne ile beslenirlermiş?",
          secenekler: {
            a: "Avladıkları hayvanlarla",
            b: "Hindistan cevizleri ile",
            c: "Kendi yaptıkları yiyeceklerle",
            d: "Deniz ürünleriyle",
          },
        },
        {
          id: "soru3",
          soru: "Adada insanlar dışında hangi hayvan yaşamaktadır?",
          secenekler: {
            a: "Papağanlar",
            b: "Maymunlar",
            c: "Yılanlar",
            d: "Timsahlar",
          },
        },
        {
          id: "soru4",
          soru: "Mutlu ve başarılı bir hayat sürmenin şartı nedir?",
          secenekler: {
            a: "Beslenmek",
            b: "Uyumak",
            c: "Çalışmak",
            d: "Dürüst olmak",
          },
        },
        {
          id: "soru5",
          soru: "Hazine ancak kime görünür?",
          secenekler: {
            a: "Çok çalışana",
            b: "Mutlu hayat sürene",
            c: "Dürüst olana",
            d: "Eziyet çekene",
          },
        },
        {
          id: "soru6",
          soru: "Başarı neye bağlıdır?",
          secenekler: {
            a: "Üstün yetenekli olmaya",
            b: "Çok çalışmaya",
            c: "Mücadele etmeye",
            d: "Gösterdiğiniz irade gücü, azim ve çabanın miktarına",
          },
        },
        {
          id: "soru7",
          soru: "Toplum hayatına katılacak insan kendine hangi soruyu sormalıdır?",
          secenekler: {
            a: "Ben nasıl yarolacağım?",
            b: "Ben nasıl çalışacağım?",
            c: "Ben nasıl barınacağım?",
            d: "Ben nasıl yaşayacağım?",
          },
        },
        {
          id: "soru8",
          soru: "Aşağıdakilerden hangisi metinde geçen büyüklerimizin söylediği sözlerden değildir?",
          secenekler: {
            a: "Emek olmadan yemek olmaz",
            b: "İşleyen demir pas tutmaz",
            c: "Çalışmakta rahmet ve bereket vardır",
            d: "Çalışmayan hayatın nimetlerinden yoksun kalır",
          },
        },
        {
          id: "soru9",
          soru: "Metinde hayatla ilgili aşağıdakilerden hangisi geçmemektedir?",
          secenekler: {
            a: "Hayat sert ve acımasız bir törpü",
            b: "Hayat çetin bir mücadelenin yapıldığı bir güreş minderi",
            c: "Hayat tembeller için sert ve acımasız",
            d: "Hayatla çalışarak mücadele etmek çok zor",
          },
        },
      ],
    },
    {
      baslik: "KRAL VE YOKSUL ŞEKERCİ",
      icerik: [
        "Kentin kenar mahallesinde karısıyla yaşayan yoksul bir şekercinin geçimi, her gün evinin mutfağında Akide şekeri yapıp sokaklarda satmasına bağlıymış. Fakir olsalar da mutlularmış.",
        "Şekercinin karısı öyle güzelmiş ki şöhreti dillere düşmüş. Bir gün kralın adamları onu bahçede görüp hayran kalmış ve hemen saraya dönerek krala haber vermişler.",
        "Kral, kadını derhal saraya getirmelerini emretmiş. Kadının güzelliğine vurulan kral ona âşık olmuş; kadın ise kocasını unutamamış.",
        "Yoksul şekinci günlerce beklemiş; sonunda Akide şekerleriyle sarayın önüne gitmiş. Kral şekercinin kıyafetlerini giyip 'Akide şeker taze!' diye bağırarak sokağa çıkmış, kadının kalbinin kime ait olduğunu anlamaya çalışmış.",
        "Kadın, şekercinin gözlerini görünce onu tanımış. Kral gerçeği anlayıp kadını kocasına geri vermiş, onlara hediyeler göndererek mutlu olmalarını sağlamış. (Uygur Masalı)",
      ],
      dogruCevaplar: {
        soru1: "d",
        soru2: "a",
        soru3: "b",
        soru4: "d",
        soru5: "c",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Yoksul şekercİ her gün evinin mutfağında ne yapardı?",
          secenekler: {
            a: "Pamuk şekeri",
            b: "Elma şekeri",
            c: "Nane şekeri",
            d: "Akide şekeri",
          },
        },
        {
          id: "soru2",
          soru: "Kral, yoksul şekercinin karısını neden derhal saraya getirmelerini emretmiş?",
          secenekler: {
            a: "Güzeller güzeli ay parçası bir kadın olduğu için",
            b: "Şekercinin karısı çok hamarat olduğu için",
            c: "Kralın sevdiği bir kadın olmadığı için",
            d: "Güneş gibi parlayan bir eş olduğu için",
          },
        },
        {
          id: "soru3",
          soru: "Yoksul şekercİ karısını görmek için nereye gidiyor?",
          secenekler: {
            a: "Evlerinin önüne",
            b: "Sarayın önüne",
            c: "Kralın yanına",
            d: "Dükkânın önüne",
          },
        },
        {
          id: "soru4",
          soru: "Yoksul şekercinin kıyafetlerini giyen kral, sokakta ne satmaya çalışmıştır?",
          secenekler: {
            a: "Pamuk şekeri",
            b: "Elma şekeri",
            c: "Kestane şekeri",
            d: "Akide şekeri",
          },
        },
        {
          id: "soru5",
          soru: "Okuduğunuz metnin konusu nedir?",
          secenekler: {
            a: "Yoksul şekercinin karısını mutlu edememesi",
            b: "Kralların sözünün her yerde dinlenmesi",
            c: "Yoksul şekercinin karısını bulmaya çalışması",
            d: "İnsanların ne olursa olsun sevdiklerinden vazgeçememesi",
          },
        },
      ],
    },
    {
      baslik: "TÜRKLERİN İSLAMİYET'İ KABULÜ",
      icerik: [
        "Türklerin İslamiyet'i kabulü, Orta Asya'da 8. ve 9. yüzyıllarda başlamış ve 10. yüzyılda hız kazanmıştır. Özellikle Karahanlılar, İslamiyet'i devlet dini olarak benimseyen ilk Türk devleti olmuştur. Bu kabulün temel nedenlerinden biri, İslamiyet'in Türklerin yaşam tarzına uygun değerler içermesiydi. Ayrıca ticaret yollarında Müslümanlarla yapılan temaslar da bu süreci hızlandırdı. İslamiyet'in kabulüyle birlikte Türkler, hem kültürel hem de siyasi olarak İslam dünyasında önemli bir rol oynamaya başladı.",
      ],
      dogruCevaplar: {
        soru1: "b",
        soru2: "a",
        soru3: "b",
        soru4: "b",
        soru5: "b",
        soru6: "b",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Ne oldu?",
          secenekler: {
            a: "Türkler göçebe yaşamı bıraktı",
            b: "Türkler İslamiyet'i kabul etti",
            c: "Türkler Avrupa'ya göç etti",
            d: "Türkler Hristiyanlığı kabul etti",
          },
        },
        {
          id: "soru2",
          soru: "Nerede oldu?",
          secenekler: {
            a: "Orta Asya'da",
            b: "Avrupa'da",
            c: "Kuzey Amerika'da",
            d: "Anadolu'da",
          },
        },
        {
          id: "soru3",
          soru: "Ne zaman oldu?",
          secenekler: {
            a: "5. yüzyılda",
            b: "8-10. yüzyıllar arasında",
            c: "12. yüzyılda",
            d: "15. yüzyılda",
          },
        },
        {
          id: "soru4",
          soru: "Nasıl oldu?",
          secenekler: {
            a: "Zorla kabul ettirildi",
            b: "Ticaret, kültürel etkileşim ve uygun değerler sayesinde",
            c: "Savaş yoluyla",
            d: "Avrupa etkisiyle",
          },
        },
        {
          id: "soru5",
          soru: "Neden oldu?",
          secenekler: {
            a: "Türklerin göçebe hayatı bırakmak istemesi",
            b: "İslamiyet'in Türklerin değerleriyle uyumlu olması",
            c: "Bizans'ın baskısı",
            d: "Moğolların zorlaması",
          },
        },
        {
          id: "soru6",
          soru: "Kim kabul etti?",
          secenekler: {
            a: "Bizanslılar",
            b: "Karahanlılar",
            c: "Osmanlılar",
            d: "Selçuklular",
          },
        },
      ],
    },
    {
      baslik: "TANZİMAT EDEBİYATI",
      icerik: [
        "Tanzimat Edebiyatı, 19. yüzyılda Osmanlı İmparatorluğu'nda ortaya çıkan, Batı etkisi altında gelişen ilk Türk edebiyatıdır. Tanzimat Fermanı'nın ilanıyla birlikte sosyal, siyasi ve kültürel alanlarda meydana gelen değişiklikler edebiyata da yansımıştır. Şinasi, Namık Kemal, Ziya Paşa gibi önemli isimler, edebiyatı halkı bilinçlendirmek ve özgürlük fikirlerini yaymak için bir araç olarak kullanmışlardır. Bu dönemde roman, tiyatro (oyun) ve makale gibi türler Türk edebiyatına ilk kez girmiştir.",
      ],
      dogruCevaplar: {
        soru1: "b",
        soru2: "b",
        soru3: "c",
        soru4: "a",
        soru5: "a",
        soru6: "b",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Ne oldu?",
          secenekler: {
            a: "Halk edebiyatı gelişti",
            b: "Tanzimat Edebiyatı ortaya çıktı",
            c: "Divan Edebiyatı sona erdi",
            d: "Servet-i Fünun başladı",
          },
        },
        {
          id: "soru2",
          soru: "Nerede oldu?",
          secenekler: {
            a: "İran'da",
            b: "Osmanlı İmparatorluğu'nda",
            c: "Avrupa'da",
            d: "Selçuklu döneminde",
          },
        },
        {
          id: "soru3",
          soru: "Ne zaman oldu?",
          secenekler: {
            a: "15. yüzyılda",
            b: "16. yüzyılda",
            c: "19. yüzyılda",
            d: "20. yüzyılda",
          },
        },
        {
          id: "soru4",
          soru: "Nasıl oldu?",
          secenekler: {
            a: "Batı etkisiyle yeni türlerin denenmesiyle",
            b: "Halk hikâyeleriyle",
            c: "Sadece şiirlerle",
            d: "Yalnızca sözlü kültürle",
          },
        },
        {
          id: "soru5",
          soru: "Neden oldu?",
          secenekler: {
            a: "Avrupa'daki gelişmeler ve Osmanlı'daki toplumsal değişimler nedeniyle",
            b: "Anadolu'nun işgal edilmesi",
            c: "Türklerin göçebe hayatı",
            d: "Şairlerin isteğiyle",
          },
        },
        {
          id: "soru6",
          soru: "Kim yazdı?",
          secenekler: {
            a: "Mevlana ve Yunus Emre",
            b: "Şinasi, Namık Kemal, Ziya Paşa",
            c: "Orhan Veli ve Melih Cevdet",
            d: "Ahmet Arif",
          },
        },
      ],
    },
    {
      baslik: "FOTOSENTEZ",
      icerik: [
        "Fotosentez, bitkilerin güneş ışığı kullanarak kendi besinlerini ürettikleri süreçtir. Bu süreçte bitkiler, karbondioksit ve suyu kullanarak glikoz ve oksijen üretirler. Bu süreç sadece bitkiler için değil, aynı zamanda insanlar ve hayvanlar için de çok önemlidir çünkü atmosfere oksijen sağlar. Dünya'da yaşam fotosentez olmadan mümkün olmazdı.",
      ],
      dogruCevaplar: {
        soru1: "b",
        soru2: "b",
        soru3: "b",
        soru4: "a",
        soru5: "b",
        soru6: "c",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Ne oldu?",
          secenekler: {
            a: "Bitkiler oksijen tüketti",
            b: "Bitkiler fotosentez yaparak besin üretti",
            c: "Hayvanlar besin üretti",
            d: "Su buharlaştı",
          },
        },
        {
          id: "soru2",
          soru: "Nerede olur?",
          secenekler: {
            a: "Hayvanların vücudunda",
            b: "Bitkilerin yapraklarında",
            c: "Toprak altında",
            d: "Denizlerde",
          },
        },
        {
          id: "soru3",
          soru: "Ne zaman olur?",
          secenekler: {
            a: "Geceleri",
            b: "Gündüz, ışık varken",
            c: "Kış mevsiminde",
            d: "Yağmur sonrası",
          },
        },
        {
          id: "soru4",
          soru: "Nasıl olur?",
          secenekler: {
            a: "Güneş ışığı, karbondioksit ve su kullanılarak",
            b: "Yalnızca su ile",
            c: "Yalnızca oksijenle",
            d: "Yalnızca gövdeyle",
          },
        },
        {
          id: "soru5",
          soru: "Neden önemlidir?",
          secenekler: {
            a: "Bitkiler için güzellik sağlar",
            b: "Oksijen ürettiği ve yaşamı devam ettirdiği için",
            c: "Sadece besin oluşturduğu için",
            d: "Yağmur yağdırdığı için",
          },
        },
        {
          id: "soru6",
          soru: "Kim yapar?",
          secenekler: {
            a: "Hayvanlar",
            b: "İnsanlar",
            c: "Bitkiler",
            d: "Böcekler",
          },
        },
      ],
    },
    {
      baslik: "NEWTON'UN YERÇEKİMİ KANUNU",
      icerik: [
        "17. yüzyılda Isaac Newton, yerçekimi kanununu ortaya koyarak bilim tarihinde büyük bir çığır açtı. Rivayete göre Newton, bir elmanın ağaçtan düşmesini gözlemleyerek bu konu üzerinde düşünmeye başlamış ve evrensel çekim kanununu geliştirmiştir. Newton'a göre her cisim, kütlesiyle doğru orantılı olarak birbirini çeker. Bu keşif, yalnızca dünyadaki olayları değil, gezegenlerin hareketlerini de açıklamaya yardımcı olmuştur.",
      ],
      dogruCevaplar: {
        soru1: "b",
        soru2: "b",
        soru3: "c",
        soru4: "a",
        soru5: "b",
        soru6: "b",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Ne oldu?",
          secenekler: {
            a: "Elektrik bulundu",
            b: "Yerçekimi kanunu keşfedildi",
            c: "DNA bulundu",
            d: "Buhar makinesi icat edildi",
          },
        },
        {
          id: "soru2",
          soru: "Nerede oldu?",
          secenekler: {
            a: "Amerika'da",
            b: "İngiltere'de",
            c: "Fransa'da",
            d: "Almanya'da",
          },
        },
        {
          id: "soru3",
          soru: "Ne zaman oldu?",
          secenekler: {
            a: "15. yüzyılda",
            b: "16. yüzyılda",
            c: "17. yüzyılda",
            d: "19. yüzyılda",
          },
        },
        {
          id: "soru4",
          soru: "Nasıl oldu?",
          secenekler: {
            a: "Elmanın düşmesi üzerine gözlem ve deneylerle",
            b: "Kimyasal deneylerle",
            c: "Astronomların isteğiyle",
            d: "Rastlantı sonucu",
          },
        },
        {
          id: "soru5",
          soru: "Neden önemlidir?",
          secenekler: {
            a: "Yalnızca elmaların düşmesini açıklamak için",
            b: "Evrensel çekimi açıklayarak bilime yön verdiği için",
            c: "Bitkilerin büyümesini sağladığı için",
            d: "Elektriği bulmaya yaradığı için",
          },
        },
        {
          id: "soru6",
          soru: "Kim keşfetti?",
          secenekler: {
            a: "Galileo",
            b: "Isaac Newton",
            c: "Edison",
            d: "Einstein",
          },
        },
      ],
    },
    {
      baslik: "MATBAANIN İCADI",
      icerik: [
        "15. yüzyılda Avrupa'da Johannes Gutenberg tarafından geliştirilen matbaa, bilginin hızlı ve ucuz bir şekilde yayılmasını sağladı. Daha önce elle kopyalanan eserler artık kısa sürede basılabiliyordu, bu da kültürel ve bilimsel gelişmeleri hızlandırdı. Matbaanın icadı, Rönesans ve Reform hareketlerinin yayılmasında büyük rol oynamıştır.",
      ],
      dogruCevaplar: {
        soru1: "b",
        soru2: "b",
        soru3: "b",
        soru4: "b",
        soru5: "b",
        soru6: "b",
      },
      sorular: [
        {
          id: "soru1",
          soru: "Ne oldu?",
          secenekler: {
            a: "Kağıt icat edildi",
            b: "Matbaa icat edildi",
            c: "Telgraf bulundu",
            d: "Buhar makinesi icat edildi",
          },
        },
        {
          id: "soru2",
          soru: "Nerede oldu?",
          secenekler: {
            a: "Çin'de",
            b: "Avrupa'da, Almanya'da",
            c: "Osmanlı'da",
            d: "Amerika'da",
          },
        },
        {
          id: "soru3",
          soru: "Ne zaman oldu?",
          secenekler: {
            a: "12. yüzyılda",
            b: "15. yüzyılda",
            c: "17. yüzyılda",
            d: "19. yüzyılda",
          },
        },
        {
          id: "soru4",
          soru: "Nasıl oldu?",
          secenekler: {
            a: "El yazması çoğaltılarak",
            b: "Hareketli harf sisteminin geliştirilmesiyle",
            c: "Matbaacılar tarafından ezberlenerek",
            d: "Elektrik kullanılarak",
          },
        },
        {
          id: "soru5",
          soru: "Neden önemlidir?",
          secenekler: {
            a: "Kitapları süslemek için",
            b: "Bilginin hızla yayılmasını sağladığı için",
            c: "Savaşlarda kullanıldığı için",
            d: "Para basmak için",
          },
        },
        {
          id: "soru6",
          soru: "Kim icat etti?",
          secenekler: {
            a: "Edison",
            b: "Gutenberg",
            c: "Newton",
            d: "Tesla",
          },
        },
      ],
    },
  ];

  const gosterilecekParagraflar = visibleIndexes
    ? paragraflar.filter((_, i) => visibleIndexes.includes(i))
    : visibleCount
    ? paragraflar.slice(0, visibleCount)
    : paragraflar;

  const mevcutParagrafData = gosterilecekParagraflar[mevcutParagraf];

  const cevapSec = (soruId, cevap) => {
    if (!gonderildi) {
      setCevaplar((prev) => ({
        ...prev,
        [soruId]: cevap,
      }));
    }
  };

  const cevaplariKontrolEt = () => {
    let dogru = 0;
    Object.keys(mevcutParagrafData.dogruCevaplar).forEach((soruId) => {
      if (cevaplar[soruId] === mevcutParagrafData.dogruCevaplar[soruId]) {
        dogru++;
      }
    });
    setDogruSayisi(dogru);
    setGonderildi(true);
  };

  const getCevapDurumu = (soruId, secilenCevap) => {
    if (!gonderildi) return "";
    const dogruCevap = mevcutParagrafData.dogruCevaplar[soruId];
    if (secilenCevap === dogruCevap) return "dogru";
    if (secilenCevap && secilenCevap !== dogruCevap) return "yanlis";
    return "";
  };

  const sonrakiParagraf = () => {
    if (mevcutParagraf < gosterilecekParagraflar.length - 1) {
      setMevcutParagraf(mevcutParagraf + 1);
      setCevaplar({});
      setGonderildi(false);
      setDogruSayisi(0);
    }
  };

  const oncekiParagraf = () => {
    if (mevcutParagraf > 0) {
      setMevcutParagraf(mevcutParagraf - 1);
      setCevaplar({});
      setGonderildi(false);
      setDogruSayisi(0);
    }
  };

  return (
    <div
      className={`${
        embedded ? "min-h-[600px]" : "min-h-screen"
      } bg-gradient-to-br from-blue-50 to-indigo-100 py-8`}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Geri Dön Butonu */}
        {!embedded && (
          <Link
            href="/odak"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Egzersizlere Dön
          </Link>
        )}

        <motion.div
          key={mevcutParagraf}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Paragraf Navigasyonu */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={oncekiParagraf}
              disabled={mevcutParagraf === 0}
              className="flex items-center text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Önceki Paragraf
            </button>

            <div className="text-sm text-gray-600">
              Paragraf {mevcutParagraf + 1} / {gosterilecekParagraflar.length}
            </div>

            <button
              onClick={sonrakiParagraf}
              disabled={mevcutParagraf === gosterilecekParagraflar.length - 1}
              className="flex items-center text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Sonraki Paragraf
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Paragraf Okuma Egzersizi
          </h1>

          {/* Paragraf Bölümü */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-red-600 text-center mb-4">
              {mevcutParagrafData.baslik}
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {mevcutParagrafData.icerik.map((paragraf, index) => (
                <p
                  key={index}
                  className={
                    index === mevcutParagrafData.icerik.length - 1
                      ? "pl-4 italic text-gray-600"
                      : ""
                  }
                  dangerouslySetInnerHTML={{ __html: paragraf }}
                />
              ))}
            </div>
          </div>

          {/* Sorular Bölümü */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Aşağıdaki soruları cevaplayınız:
            </h3>

            {mevcutParagrafData.sorular.map((soru, index) => (
              <motion.div
                key={soru.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <h4 className="font-medium text-gray-800 mb-4">
                  {index + 1}. {soru.soru}
                </h4>

                <div className="space-y-3">
                  {Object.entries(soru.secenekler).map(([harf, secenek]) => {
                    const durum = getCevapDurumu(soru.id, harf);
                    return (
                      <button
                        key={harf}
                        onClick={() => cevapSec(soru.id, harf)}
                        disabled={gonderildi}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          cevaplar[soru.id] === harf
                            ? durum === "dogru"
                              ? "border-green-500 bg-green-50"
                              : durum === "yanlis"
                              ? "border-red-500 bg-red-50"
                              : "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${gonderildi ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">
                            {harf.toUpperCase()}) {secenek}
                          </span>
                          {gonderildi &&
                            cevaplar[soru.id] === harf &&
                            (durum === "dogru" ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            ))}
                          {gonderildi &&
                            harf ===
                              mevcutParagrafData.dogruCevaplar[soru.id] &&
                            cevaplar[soru.id] !== harf && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Kontrol Butonu */}
          {!gonderildi && (
            <div className="mt-8 text-center">
              <button
                onClick={cevaplariKontrolEt}
                disabled={
                  Object.keys(cevaplar).length <
                  mevcutParagrafData.sorular.length
                }
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Cevapları Kontrol Et
              </button>
            </div>
          )}

          {/* Sonuç Bölümü */}
          {gonderildi && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg text-center"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Sonucunuz
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                {dogruSayisi}/{mevcutParagrafData.sorular.length} doğru cevap
              </p>
              <div className="text-3xl font-bold text-blue-600">
                %{(dogruSayisi / mevcutParagrafData.sorular.length) * 100}{" "}
                Başarı
              </div>
              {dogruSayisi === mevcutParagrafData.sorular.length && (
                <p className="text-green-600 font-medium mt-2">
                  Mükemmel! Tüm soruları doğru cevapladınız!
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
