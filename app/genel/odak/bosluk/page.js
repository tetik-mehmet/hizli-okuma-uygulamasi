"use client";
import { useState } from "react";

export default function BoslukDoldurma({
  embedded = false,
  visibleExercises = [1, 2, 3, 4, 5],
  defaultExercise = 1,
} = {}) {
  const [currentExercise, setCurrentExercise] = useState(defaultExercise);
  const [answers1, setAnswers1] = useState({});
  const [answers2, setAnswers2] = useState({});
  const [answers3, setAnswers3] = useState({});
  const [answers4, setAnswers4] = useState({});
  const [answers5, setAnswers5] = useState({});
  const [showResults1, setShowResults1] = useState(false);
  const [showResults2, setShowResults2] = useState(false);
  const [showResults3, setShowResults3] = useState(false);
  const [showResults4, setShowResults4] = useState(false);
  const [showResults5, setShowResults5] = useState(false);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);
  const [draggedWord, setDraggedWord] = useState(null);

  // İlk egzersiz - Akdeniz İklimi
  const words1 = [
    { id: 1, word: "Yağışlı" },
    { id: 2, word: "Yunanistan" },
    { id: 3, word: "Akdeniz" },
    { id: 4, word: "Kuraklık" },
    { id: 5, word: "Ekonomik" },
    { id: 6, word: "Keçiboynuzu" },
    { id: 7, word: "30° ile 40°" },
    { id: 8, word: "Maki" },
    { id: 9, word: "Turunçgiller" },
    { id: 10, word: "Turizm" },
    { id: 11, word: "İklim" },
    { id: 12, word: "Don" },
  ];

  const text1 = `Akdeniz iklimi, adını ..... bölgesinden alan ve dünyanın birçok yerinde görülen ılıman bir ..... tipidir. Bu iklimin en belirgin özelliği, yazların sıcak ve kurak, kışların ise ılık ve ..... geçmesidir. Akdeniz iklimi, genellikle ..... enlemleri arasında, karaların batı kıyılarında görülür. Türkiye'de başta Akdeniz Bölgesi olmak üzere, Ege ve Güney Marmara bölgelerinde de bu iklimin etkisi hissedilir. Bu iklim tipinde yaz aylarında sıcaklık genellikle 30°C'nin üzerine çıkar. ....., yaz boyunca yağışın neredeyse hiç düşmemesi anlamına gelir. Kışın ise sıcaklık düşer ama genellikle ..... olayları yaşanmaz. Ortalama kış sıcaklıkları 10°C civarındadır ve yağışlar genellikle bu dönemde görülür. Akdeniz ikliminin bitki örtüsü ..... olarak bilinir. Maki, kısa boylu, her mevsim yeşil kalan çalı türlerinden oluşur. Zeytin, defne, ..... ve kocayemiş gibi bitkiler bu iklimin karakteristik türlerindendir. Ayrıca bu bölgelerde zeytin, ....., incir, üzüm ve sebze-meyve tarımı da yaygındır. Tarım, yıl boyunca yapılabildiği için bölge ekonomisine önemli katkı sağlar.

Dünya genelinde Akdeniz iklimi; İspanya, İtalya, ....., Kaliforniya (ABD), Şili'nin orta kesimleri, Güney Avustralya ve Güney Afrika gibi bölgelerde de görülür. Bu yerlerde de benzer iklim özellikleri ve bitki örtüsü hâkimdir. Akdeniz iklimi, hem tarımsal üretim hem de ..... açısından büyük avantajlar sağlar. Uzun yaz mevsimi ve bol güneşli günler, bu bölgeleri turistler için cazip kılar. Bu nedenle Akdeniz iklimine sahip olan ülkelerde yaz turizmi oldukça gelişmiştir. Sonuç olarak, Akdeniz iklimi hem doğal güzellikleri hem de ..... potansiyeli ile dikkat çeken, ılıman ve yaşamaya elverişli bir iklim tipidir.`;

  const correctAnswers1 = {
    BLANK1: "Akdeniz",
    BLANK2: "İklim",
    BLANK3: "yağışlı",
    BLANK4: "30° ile 40°",
    BLANK5: "Kuraklık",
    BLANK6: "don",
    BLANK7: "Maki",
    BLANK8: "keçiboynuzu",
    BLANK9: "Turunçgiller",
    BLANK10: "Yunanistan",
    BLANK11: "turizm",
    BLANK12: "ekonomik",
  };

  // İkinci egzersiz - Yapay Zeka
  const words2 = [
    { id: 1, word: "İnsanlar" },
    { id: 2, word: "Problem" },
    { id: 3, word: "Teknoloji" },
    { id: 4, word: "Temelinde" },
    { id: 5, word: "Yapay Zeka" },
    { id: 6, word: "Doktorlara" },
    { id: 7, word: "Müşteri" },
    { id: 8, word: "Katkı" },
    { id: 9, word: "Performanslarını" },
    { id: 10, word: "Veri Güvenliği" },
    { id: 11, word: "Gelecekte" },
    { id: 12, word: "Önem" },
  ];

  const text2 = `Yapay zeka, makineleri ..... gibi düşünebilmesini, öğrenmesini, karar verebilmesini ve hatta ..... çözebilmesini amaçlayan bir ..... alanıdır. ....., bilgisayarların büyük veri kümelerini analiz ederek kalıplar oluşturması ve bu kalıplar üzerinden tahminlerde bulunması yatar. Günümüzde .....; sağlık hizmetlerinden otonom araçlara, finansal analizlerden müşteri hizmetlerine kadar çok geniş bir alanda kullanılmaktadır. Örneğin, hastalık teşhisinde ..... yardımcı olabilir, üretim hatlarındaki arızaları önceden tespit edebilir ya da ..... davranışlarını analiz ederek şirketlerin stratejilerini belirlemelerine ..... sağlayabilir. Derin öğrenme ve makine öğrenmesi gibi alt dalları sayesinde yapay zeka sistemleri, deneyimlerinden öğrenerek ..... sürekli geliştirebilir. Bununla birlikte, Yapay zekanın gelişimi bazı etik tartışmaları da beraberinde getirmektedir. Özellikle ....., mahremiyet, algoritmik önyargılar ve otomasyonun iş gücü üzerindeki etkileri gibi konular, bu teknolojinin sorumlu bir şekilde geliştirilmesini ve kullanılmasını gerektirir. ..... yapay zekanın insan yaşamını daha da kolaylaştırması beklenmekte, ancak bu sürecin dikkatle yönetilmesi büyük ..... taşımaktadır.`;

  const correctAnswers2 = {
    BLANK1: "İnsanlar",
    BLANK2: "Problem",
    BLANK3: "Teknoloji",
    BLANK4: "Temelinde",
    BLANK5: "Yapay Zeka",
    BLANK6: "Doktorlara",
    BLANK7: "Müşteri",
    BLANK8: "Katkı",
    BLANK9: "Performanslarını",
    BLANK10: "Veri Güvenliği",
    BLANK11: "Gelecekte",
    BLANK12: "Önem",
  };

  // Üçüncü egzersiz - Vincent van Gogh
  const words3 = [
    { id: 1, word: "30 Mart 1853'te" },
    { id: 2, word: "2.100" },
    { id: 3, word: "Renk" },
    { id: 4, word: "Milyonlarca" },
    { id: 5, word: "Van Gogh Müzesi" },
    { id: 6, word: "Karamsar" },
    { id: 7, word: "Paris" },
    { id: 8, word: "Yıldızlı Gece" },
    { id: 9, word: "Van Gogh" },
    { id: 10, word: "Ruhsal" },
    { id: 11, word: "Yağlı Boya" },
    { id: 12, word: "Japon" },
  ];

  const text3 = `Vincent van Gogh, 19. yüzyılın en önemli ressamlarından biridir. ..... Hollanda'nın Zundert kasabasında doğmuştur. Sanat yaşamı boyunca pek çok zorluk yaşamış, ancak bugün dünyanın en tanınan sanatçılarından biri olmuştur. Van Gogh'un eserleri, özellikle ..... kullanımı ve fırça darbeleriyle dikkat çeker. ....., gençliğinde çeşitli işler yaptıktan sonra resme yönelmiştir. İlk dönem eserlerinde daha koyu ve ..... renkler kullanmıştır. En bilinen ilk dönem çalışmalarından biri "Patates Yiyenler" adlı tablodur. Ancak .....'e taşındıktan sonra Empresyonizm (izlenimcilik) ve ..... sanatı ile tanışmış, bu da sanat anlayışını derinden etkilemiştir. Bu dönemden sonra eserlerinde daha canlı renkler ve ışık ön plana çıkmıştır.

Van Gogh, hayatı boyunca yaklaşık ..... eser üretmiştir. Bunların yaklaşık 860'ı ..... tablo, geri kalanı ise çizim, eskiz ve suluboya resimlerdir. En ünlü tablolarından bazıları şunlardır: ..... Ayçiçekleri, Kendi Portreleri, Buğday Tarlası ve Kargalar.

Van Gogh'un yaşamı ne yazık ki oldukça zorluydu. ..... sorunlar yaşadığı için zaman zaman hastaneye yatırıldı. Hayatının büyük kısmında yoksulluk çekmiş, eserlerini satamamıştır. Sadece bir tablosu, yaşamı boyunca satılabilmiştir. Van Gogh, 29 Temmuz 1890'da, henüz 37 yaşındayken hayatını kaybetmiştir. Bugün, Van Gogh'un eserleri ..... dolara alıcı bulmakta ve dünyanın en önemli müzelerinde sergilenmektedir. Onun sanat anlayışı, birçok modern sanatçıyı etkilemiştir. Amsterdam'daki ....., sanatçının hayatını ve eserlerini detaylı şekilde sergileyen en önemli kurumlardan biridir.`;

  const correctAnswers3 = {
    BLANK1: "30 Mart 1853'te",
    BLANK2: "Renk",
    BLANK3: "Van Gogh",
    BLANK4: "Karamsar",
    BLANK5: "Paris",
    BLANK6: "Japon",
    BLANK7: "2.100",
    BLANK8: "Yağlı Boya",
    BLANK9: "Yıldızlı Gece",
    BLANK10: "Ruhsal",
    BLANK11: "Milyonlarca",
    BLANK12: "Van Gogh Müzesi",
  };

  // Dördüncü egzersiz - Coğrafi Keşifler
  const words4 = [
    { id: 1, word: "İpek ve Baharat" },
    { id: 2, word: "Harita" },
    { id: 3, word: "Kristof Kolomb" },
    { id: 4, word: "Deniz" },
    { id: 5, word: "Hristiyanlığı" },
    { id: 6, word: "Coğrafi Keşifler" },
    { id: 7, word: "Pusula" },
    { id: 8, word: "Sömürgecilik" },
    { id: 9, word: "Kıtalar" },
    { id: 10, word: "Gümüş" },
    { id: 11, word: "Hindistan" },
    { id: 12, word: "Avrupalı" },
  ];

  const text4 = `..... 15. ve 17. yüzyıllar arasında ..... denizcilerin yeni ticaret yolları bulmak ve bilinmeyen yerleri keşfetmek amacıyla yaptıkları uzun deniz yolculuklarına verilen isimdir. Bu keşifler, dünya tarihini kökten değiştiren olaylar arasında yer alır. Coğrafi Keşiflerin başlamasında birçok neden vardır. ..... Yolları'nın Türk ve Müslüman devletlerin kontrolünde olması, Avrupalıları deniz yoluyla Hindistan ve Çin'e ulaşmaya yöneltmiştir. Ayrıca, ..... ve ..... gibi denizcilik araçlarının gelişmesi de bu keşiflerin yapılmasını kolaylaştırmıştır. İnsanların yeni yerler görme, zengin olma ve ..... yayma arzusu da önemli etkenlerdendir. ..... 1492 yılında Amerika kıtasına ulaşan ilk Avrupalı'dır. Aslında .....'a ulaştığını sanmıştır. Vasco da Gama 1498 yılında Ümit Burnu'nu dolaşarak Hindistan'a ..... yoluyla ulaşan ilk kişidir. Sonuç olarak, yeni ..... , okyanuslar ve deniz yolları keşfedildi. Avrupa'nın ekonomik gücü arttı, ..... dönemi başladı. Altın, ..... ve değerli madenler Avrupa'ya taşındı.`;

  const correctAnswers4 = {
    BLANK1: "Coğrafi Keşifler",
    BLANK2: "Avrupalı",
    BLANK3: "İpek ve Baharat",
    BLANK4: "Pusula",
    BLANK5: "Harita",
    BLANK6: "Hristiyanlığı",
    BLANK7: "Kristof Kolomb",
    BLANK8: "Hindistan",
    BLANK9: "Deniz",
    BLANK10: "Kıtalar",
    BLANK11: "Sömürgecilik",
    BLANK12: "Gümüş",
  };

  // Beşinci egzersiz - Mimar Sinan
  const words5 = [
    { id: 1, word: "Devşirme Sistemi" },
    { id: 2, word: "Estetik" },
    { id: 3, word: "Kervansaraylar" },
    { id: 4, word: "Başmimar" },
    { id: 5, word: "Selimiye Camii" },
    { id: 6, word: "III. Murad" },
    { id: 7, word: "Köprüler" },
    { id: 8, word: "Mühendislik" },
    { id: 9, word: "Osmanlı" },
    { id: 10, word: "Mimar Sinan Türbesi" },
    { id: 11, word: "Sanat" },
    { id: 12, word: "1538" },
  ];

  const text5 = `Mimar Sinan, ..... tarihinin ve dünya mimarlık tarihinin en büyük mimarlarından biridir. 1489 yılında Kayseri'nin Ağırnas köyünde doğduğu kabul edilir. Küçük yaşta ..... ile Osmanlı sarayına alınmış, Yeniçeri Ocağı'na katılmış ve burada ..... eğitimi almıştır. Askeri seferlere katılmış, köprüler, kaleler ve su yolları inşa etmiş; bu deneyimler onun mimarlık yeteneğini geliştirmesinde önemli rol oynamıştır. ..... yılında, Kanuni Sultan Süleyman tarafından ..... olarak atanmıştır. Bu görevini II. Selim ve ..... dönemlerinde de sürdürmüş ve yaklaşık 50 yıl boyunca Osmanlı'nın baş mimarı olmuştur.

Mimar Sinan'ın eserleri sade ama aynı zamanda etkileyici yapısıyla tanınır. En çok dikkat çeken yapılar arasında camiler, medreseler, hamamlar ve türbeler yer alır. Kendisi, 300'den fazla eserin yapımında görev almış, bazı kaynaklara göre bu sayı 375'i geçmektedir. Mimar Sinan'ın en bilinen ve en önemli üç eseri şunlardır: Şehzade Camii (Çıraklık eseri – 1548) Süleymaniye Camii (Kalfalık eseri – 1557) Selimiye Camii (Ustalık eseri – 1575) Özellikle ..... mimarlık tarihinde bir başyapıt olarak kabul edilir. Edirne'de yer alan bu cami, hem mimari açıdan hem de ..... olarak döneminin çok ötesindedir. Devasa kubbesi, ışık kullanımı ve simetrik yapısıyla hayranlık uyandırır. Mimar Sinan, sadece estetik yapılar inşa etmemiş; aynı zamanda dayanıklı, işlevsel ve çevreye uyumlu yapılar yapmıştır. Su kemerleri, ..... ve hamamlar gibi günlük hayatı kolaylaştıran birçok yapı onun mühendislik bilgisini de ortaya koyar. 1588 yılında İstanbul'da vefat eden Mimar Sinan, eserleriyle yüzyıllar boyunca ayakta kalmış ve birçok mimara ilham vermiştir. Mezarının yanında bulunan ..... İstanbul'daki Süleymaniye Camii'nin yakınındadır.

Mimar Sinan, yalnızca Osmanlı'nın değil, dünya mimarlık tarihinin de en büyük ustalarından biridir. Onun eserleri, sadece birer yapı değil, ..... mühendislik ve estetiğin mükemmel birleşimidir. Bugün hâlâ ayakta olan eserleri, onun ne kadar ileri görüşlü ve yetenekli bir mimar olduğunu göstermektedir.`;

  const correctAnswers5 = {
    BLANK1: "Osmanlı",
    BLANK2: "Devşirme Sistemi",
    BLANK3: "Mühendislik",
    BLANK4: "1538",
    BLANK5: "Başmimar",
    BLANK6: "III. Murad",
    BLANK7: "Selimiye Camii",
    BLANK8: "Estetik",
    BLANK9: "Kervansaraylar",
    BLANK10: "Mimar Sinan Türbesi",
    BLANK11: "Sanat",
  };

  const handleDragStart = (e, word) => {
    setDraggedWord(word);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, blankId, exerciseNumber) => {
    e.preventDefault();
    if (draggedWord) {
      // Ses dosyasını çal
      const audio = new Audio("/oturma.mp3");
      audio.play().catch((error) => {
        console.log("Ses çalınamadı:", error);
      });

      if (exerciseNumber === 1) {
        setAnswers1((prev) => ({
          ...prev,
          [blankId]: draggedWord.word,
        }));
      } else if (exerciseNumber === 2) {
        setAnswers2((prev) => ({
          ...prev,
          [blankId]: draggedWord.word,
        }));
      } else if (exerciseNumber === 3) {
        setAnswers3((prev) => ({
          ...prev,
          [blankId]: draggedWord.word,
        }));
      } else if (exerciseNumber === 4) {
        setAnswers4((prev) => ({
          ...prev,
          [blankId]: draggedWord.word,
        }));
      } else {
        setAnswers5((prev) => ({
          ...prev,
          [blankId]: draggedWord.word,
        }));
      }
      setDraggedWord(null);
    }
  };

  const handleWordClick = (word) => {
    setDraggedWord(word);
  };

  const checkAnswers = (exerciseNumber) => {
    if (exerciseNumber === 1) {
      let correct = 0;
      Object.keys(correctAnswers1).forEach((blankId) => {
        if (
          answers1[blankId]?.toLowerCase() ===
          correctAnswers1[blankId].toLowerCase()
        ) {
          correct++;
        }
      });
      setScore1(correct);
      setShowResults1(true);

      // Tüm cevaplar doğruysa success sesi çal
      if (correct === Object.keys(correctAnswers1).length) {
        const audio = new Audio("/success.mp3");
        audio.play().catch((error) => {
          console.log("Success sesi çalınamadı:", error);
        });
      }
    } else if (exerciseNumber === 2) {
      let correct = 0;
      Object.keys(correctAnswers2).forEach((blankId) => {
        if (
          answers2[blankId]?.toLowerCase() ===
          correctAnswers2[blankId].toLowerCase()
        ) {
          correct++;
        }
      });
      setScore2(correct);
      setShowResults2(true);

      // Tüm cevaplar doğruysa success sesi çal
      if (correct === Object.keys(correctAnswers2).length) {
        const audio = new Audio("/success.mp3");
        audio.play().catch((error) => {
          console.log("Success sesi çalınamadı:", error);
        });
      }
    } else if (exerciseNumber === 3) {
      let correct = 0;
      Object.keys(correctAnswers3).forEach((blankId) => {
        if (
          answers3[blankId]?.toLowerCase() ===
          correctAnswers3[blankId].toLowerCase()
        ) {
          correct++;
        }
      });
      setScore3(correct);
      setShowResults3(true);

      // Tüm cevaplar doğruysa success sesi çal
      if (correct === Object.keys(correctAnswers3).length) {
        const audio = new Audio("/success.mp3");
        audio.play().catch((error) => {
          console.log("Success sesi çalınamadı:", error);
        });
      }
    } else if (exerciseNumber === 4) {
      let correct = 0;
      Object.keys(correctAnswers4).forEach((blankId) => {
        if (
          answers4[blankId]?.toLowerCase() ===
          correctAnswers4[blankId].toLowerCase()
        ) {
          correct++;
        }
      });
      setScore4(correct);
      setShowResults4(true);

      // Tüm cevaplar doğruysa success sesi çal
      if (correct === Object.keys(correctAnswers4).length) {
        const audio = new Audio("/success.mp3");
        audio.play().catch((error) => {
          console.log("Success sesi çalınamadı:", error);
        });
      }
    } else {
      let correct = 0;
      Object.keys(correctAnswers5).forEach((blankId) => {
        if (
          answers5[blankId]?.toLowerCase() ===
          correctAnswers5[blankId].toLowerCase()
        ) {
          correct++;
        }
      });
      setScore5(correct);
      setShowResults5(true);

      // Tüm cevaplar doğruysa success sesi çal
      if (correct === Object.keys(correctAnswers5).length) {
        const audio = new Audio("/success.mp3");
        audio.play().catch((error) => {
          console.log("Success sesi çalınamadı:", error);
        });
      }
    }
  };

  const resetExercise = (exerciseNumber) => {
    if (exerciseNumber === 1) {
      setAnswers1({});
      setShowResults1(false);
      setScore1(0);
    } else if (exerciseNumber === 2) {
      setAnswers2({});
      setShowResults2(false);
      setScore2(0);
    } else if (exerciseNumber === 3) {
      setAnswers3({});
      setShowResults3(false);
      setScore3(0);
    } else if (exerciseNumber === 4) {
      setAnswers4({});
      setShowResults4(false);
      setScore4(0);
    } else {
      setAnswers5({});
      setShowResults5(false);
      setScore5(0);
    }
    setDraggedWord(null);
  };

  const renderTextWithBlanks = (
    text,
    correctAnswers,
    answers,
    exerciseNumber
  ) => {
    const blankIds = Object.keys(correctAnswers);
    let currentBlankIndex = 0;

    return text.split(".....").map((part, index) => {
      if (index === text.split(".....").length - 1) {
        return <span key={index}>{part}</span>;
      }

      const blankId = blankIds[currentBlankIndex];
      const answer = answers[blankId];
      const showResults =
        exerciseNumber === 1
          ? showResults1
          : exerciseNumber === 2
          ? showResults2
          : exerciseNumber === 3
          ? showResults3
          : exerciseNumber === 4
          ? showResults4
          : showResults5;
      const isCorrect =
        showResults &&
        answer?.toLowerCase() === correctAnswers[blankId].toLowerCase();
      const isIncorrect =
        showResults &&
        answer &&
        answer.toLowerCase() !== correctAnswers[blankId].toLowerCase();

      currentBlankIndex++;

      return (
        <span key={index}>
          {part}
          <span
            className={`inline-block w-32 h-10 mx-2 border-2 rounded-md text-center leading-8 font-medium cursor-pointer transition-all duration-200 ${
              answer
                ? isCorrect
                  ? "border-green-500 bg-green-100 text-green-800"
                  : isIncorrect
                  ? "border-red-500 bg-red-100 text-red-800"
                  : "border-blue-500 bg-blue-100 text-blue-800"
                : "border-dashed border-gray-300 bg-gray-50 text-gray-400 hover:border-blue-400"
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, blankId, exerciseNumber)}
            onClick={() =>
              !answer &&
              draggedWord &&
              handleDrop({ preventDefault: () => {} }, blankId, exerciseNumber)
            }
          >
            {answer || "..... boşluk"}
          </span>
        </span>
      );
    });
  };

  const renderExercise = (exerciseNumber) => {
    const words =
      exerciseNumber === 1
        ? words1
        : exerciseNumber === 2
        ? words2
        : exerciseNumber === 3
        ? words3
        : exerciseNumber === 4
        ? words4
        : words5;
    const text =
      exerciseNumber === 1
        ? text1
        : exerciseNumber === 2
        ? text2
        : exerciseNumber === 3
        ? text3
        : exerciseNumber === 4
        ? text4
        : text5;
    const correctAnswers =
      exerciseNumber === 1
        ? correctAnswers1
        : exerciseNumber === 2
        ? correctAnswers2
        : exerciseNumber === 3
        ? correctAnswers3
        : exerciseNumber === 4
        ? correctAnswers4
        : correctAnswers5;
    const answers =
      exerciseNumber === 1
        ? answers1
        : exerciseNumber === 2
        ? answers2
        : exerciseNumber === 3
        ? answers3
        : exerciseNumber === 4
        ? answers4
        : answers5;
    const showResults =
      exerciseNumber === 1
        ? showResults1
        : exerciseNumber === 2
        ? showResults2
        : exerciseNumber === 3
        ? showResults3
        : exerciseNumber === 4
        ? showResults4
        : showResults5;
    const score =
      exerciseNumber === 1
        ? score1
        : exerciseNumber === 2
        ? score2
        : exerciseNumber === 3
        ? score3
        : exerciseNumber === 4
        ? score4
        : score5;
    const title =
      exerciseNumber === 1
        ? "AKDENİZ İKLİMİ"
        : exerciseNumber === 2
        ? "YAPAY ZEKA"
        : exerciseNumber === 3
        ? "VINCENT VAN GOGH"
        : exerciseNumber === 4
        ? "COĞRAFİ KEŞİFLER"
        : "MİMAR SİNAN";
    const description =
      exerciseNumber === 1
        ? "Aşağıdaki kelimeleri metinde uygun görülen yerlere sürükleyip bırakınız."
        : exerciseNumber === 2
        ? "Aşağıdaki kelimeleri metinde uygun görülen yerlere yerleştiriniz."
        : exerciseNumber === 3
        ? "Aşağıdaki kelimeleri metinde uygun görülen yerlere yerleştiriniz."
        : exerciseNumber === 4
        ? "Aşağıdaki kelimeleri metinde uygun görülen yerlere yerleştiriniz."
        : "Aşağıdaki kelimeleri metinde uygun görülen yerlere yerleştiriniz.";

    return (
      <div className="space-y-8">
        {/* Kelime Tablosu */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Kullanılacak Kelimeler
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {words.map((word) => (
              <div
                key={word.id}
                className={`bg-blue-50 p-3 rounded-lg text-center cursor-move transition-all duration-200 hover:bg-blue-100 hover:shadow-md ${
                  draggedWord?.id === word.id
                    ? "ring-2 ring-blue-400 bg-blue-200"
                    : ""
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, word)}
                onClick={() => handleWordClick(word)}
              >
                <span className="text-sm font-medium text-blue-800">
                  {word.word}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Metin */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed text-justify">
              {renderTextWithBlanks(
                text,
                correctAnswers,
                answers,
                exerciseNumber
              )}
            </div>
          </div>
        </div>

        {/* Kontrol Butonları */}
        <div className="flex justify-center gap-4">
          {!showResults ? (
            <button
              onClick={() => checkAnswers(exerciseNumber)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
            >
              Cevapları Kontrol Et
            </button>
          ) : (
            <>
              <button
                onClick={() => resetExercise(exerciseNumber)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
              >
                Yeniden Başla
              </button>
              <div className="bg-blue-100 border border-blue-300 rounded-lg px-6 py-3">
                <span className="text-blue-800 font-semibold">
                  Puan: {score}/{Object.keys(correctAnswers).length}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Sonuçlar */}
        {showResults && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Sonuçlar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(correctAnswers).map((blankId, index) => {
                const userAnswer = answers[blankId] || "";
                const correctAnswer = correctAnswers[blankId];
                const isCorrect =
                  userAnswer.toLowerCase() === correctAnswer.toLowerCase();

                return (
                  <div
                    key={blankId}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">
                        Boşluk {index + 1}:
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          isCorrect ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isCorrect ? "✓ Doğru" : "✗ Yanlış"}
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">
                        Sizin cevabınız:{" "}
                        <span className="font-medium">
                          {userAnswer || "(boş)"}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-green-600 font-medium">
                          Doğru cevap: {correctAnswer}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Boşluk Doldurma Alıştırması
          </h1>
          <p className="text-gray-600">
            Dört farklı konuda boşluk doldurma alıştırması yapabilirsiniz.
          </p>
        </div>

        {/* Egzersiz Seçimi */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {visibleExercises.includes(1) && (
            <button
              onClick={() => setCurrentExercise(1)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentExercise === 1
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              Egzersiz 1: Akdeniz İklimi
            </button>
          )}
          {visibleExercises.includes(2) && (
            <button
              onClick={() => setCurrentExercise(2)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentExercise === 2
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              Egzersiz 2: Yapay Zeka
            </button>
          )}
          {visibleExercises.includes(3) && (
            <button
              onClick={() => setCurrentExercise(3)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentExercise === 3
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              Egzersiz 3: Vincent van Gogh
            </button>
          )}
          {visibleExercises.includes(4) && (
            <button
              onClick={() => setCurrentExercise(4)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentExercise === 4
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              Egzersiz 4: Coğrafi Keşifler
            </button>
          )}
          {visibleExercises.includes(5) && (
            <button
              onClick={() => setCurrentExercise(5)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentExercise === 5
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              Egzersiz 5: Mimar Sinan
            </button>
          )}
        </div>

        {/* Egzersiz İçeriği */}
        {currentExercise === 1 ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                AKDENİZ İKLİMİ
              </h2>
              <p className="text-gray-600">
                Aşağıdaki kelimeleri metinde uygun görülen yerlere sürükleyip
                bırakınız.
              </p>
            </div>
            {renderExercise(1)}
          </div>
        ) : currentExercise === 2 ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                YAPAY ZEKA
              </h2>
              <p className="text-gray-600">
                Aşağıdaki kelimeleri metinde uygun görülen yerlere
                yerleştiriniz.
              </p>
            </div>
            {renderExercise(2)}
          </div>
        ) : currentExercise === 3 ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                VINCENT VAN GOGH
              </h2>
              <p className="text-gray-600">
                Aşağıdaki kelimeleri metinde uygun görülen yerlere
                yerleştiriniz.
              </p>
            </div>
            {renderExercise(3)}
          </div>
        ) : currentExercise === 4 ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                COĞRAFİ KEŞİFLER
              </h2>
              <p className="text-gray-600">
                Aşağıdaki kelimeleri metinde uygun görülen yerlere
                yerleştiriniz.
              </p>
            </div>
            {renderExercise(4)}
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                MİMAR SİNAN
              </h2>
              <p className="text-gray-600">
                Aşağıdaki kelimeleri metinde uygun görülen yerlere
                yerleştiriniz.
              </p>
            </div>
            {renderExercise(5)}
          </div>
        )}
      </div>
    </div>
  );
}
