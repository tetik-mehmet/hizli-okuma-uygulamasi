"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

// Basit çoklu masal + 5 soruluk çoktan seçmeli sınav ekranı
export default function MasalSayfasi() {
  const stories = useMemo(
    () => [
      {
        id: "kursun-asker",
        baslik: "Kurşun Asker",
        gorsel: "/kursun.png",
        metin:
          "Kurşun Asker Masalı\n\nEvvel zaman içinde, büyük bir şehirde küçük bir çocuk yaşarmış. Doğum günü geldiğinde ailesi ona çok güzel bir hediye vermiş: kırmızı ve mavi üniformalarıyla parlayan bir kutu dolusu kurşun asker. Hepsi pırıl pırıl, dimdik ve gururluymuş. Ancak askerlerden biri diğerlerinden farklıymış. Kalıbında eksiklik olduğundan yalnızca bir bacağı varmış. Buna rağmen o da diğerleri kadar dik duruyor, cesaretini asla kaybetmiyormuş.\n\nKutudan çıkan askerler odaya dizilince, tek bacaklı asker bir köşeye konmuş. Tam karşısında ise incecik kâğıttan yapılmış zarif bir balerin duruyormuş. Beyaz elbisesi, incecik beline oturmuş, kollarını zarifçe açmış ve bir ayağını öne doğru kaldırmış. Aslında iki ayağı varmış ama kâğıdın kıvrımı yüzünden tek ayağının üstünde duruyormuş. Bunu gören kurşun asker, onun da tek bacaklı olduğunu sanmış ve hemen bir yakınlık hissetmiş. İçinden: “İşte bu! Benim için yaratılmış gibi. Ne kadar asil, ne kadar güzel. Ona kavuşabilsem, sonsuza kadar mutlu olurdum.” diye düşünmüş.\n\nFakat odaya meraklı bir oyuncak kukla hâkimmiş. Kukla, kurşun askerin balerine hayranlıkla bakışlarını fark etmiş. Kıskançlıkla dişlerini gıcırdatmış ve fısıldamış: “Sen haddini bil asker! O incecik balerin sana göre değil. Eğer bakmaya devam edersen başına büyük felaketler gelecek.”\n\nAma kurşun asker hiç aldırmamış. Dimdik durmuş, sadece kalbinin derinliklerinde sevgisini hissetmiş.\n\nGece olduğunda odadaki oyuncaklar canlanırmış. Bebekler şarkı söyler, tahta at zıplar, kuklalar dans edermiş. Yalnız tek bacaklı asker, kımıldamadan hep aynı noktadan balerini izlemeyi sürdürürmüş.\n\nSabah olduğunda çocuklar odaya girip oynamaya başlamış. Meraklı bir çocuk askeri alıp pencerenin kenarına koymuş. O sırada rüzgâr esmiş ve kurşun asker dengesini kaybederek üçüncü kattan aşağıya düşmüş. Koca bir gürültüyle kaldırım taşına çarpmış ama yine de dimdik ayakta kalmış.\n\nBir süre sonra yağan yağmur askerin yanına bir derecik getirmiş. Sokakta oynayan çocuklar onu bulmuş ve kâğıttan yapılmış küçük bir kayığın içine koyarak suya bırakmışlar. “Asker denizlere açılıyor!” diye bağırıyorlarmış. Tek bacaklı asker için bu hem korkutucu hem de heyecan vericiymiş.\n\nKayık sularla birlikte hızla akarken, karanlık bir lağımın içine girmiş. Orada koca bir fare askerin yolunu kesmiş. “Dur bakalım!” demiş fare. “Burası benim bölgem. Geçmek için vergi ödemen gerek.” Ama asker hiç konuşmamış, sadece dimdik durmuş. Kayık hızla akıp gitmiş, fare öfkeden dişlerini gıcırdatmış.\n\nBir süre sonra dere denize açılmış. Kayık dalgalar arasında savrulmuş, kâğıttan yapıldığı için parçalanmaya başlamış. Tek bacaklı asker sulara gömülürken hâlâ balerini düşünüyormuş. O sırada büyük bir balık gelip onu yutmuş!\n\nGünler sonra balık yakalanıp pazara getirilmiş. Tesadüf bu ya, onu alan kadın askeri daha önce düşürdüğü çocuğun annesiymiş. Balığın karnını yardıklarında içinden dimdik duran kurşun asker çıkmış. Çocuklar çok şaşırmış, sevinçle onu yine odaya, balerinin karşısına koymuşlar.\n\nTam her şey normale dönmüşken, kıskanç kukla bir kez daha devreye girmiş. Pencerenin açık kaldığı bir anda ani bir rüzgâr esmiş. Balerin kâğıttan olduğu için hafifmiş, ateşin yandığı sobaya doğru süzülüp düşmüş. Kurşun asker bunu görünce kalbi sızlamış. Fakat kısa bir süre sonra o da rüzgârla devrilmiş, sobanın içine yuvarlanmış.\n\nİki sevgili, alevlerin içinde birleşmişler. Kurşun asker eriyip küçük bir kalbe dönüşmüş, balerinin ise kâğıttan külü, kalbin yanında bir parça kömür gibi kalmış. Artık sonsuza kadar birlikteymişler.",
        sorular: [
          {
            soru: "Kurşun askeri diğerlerinden ayıran özellik nedir?",
            secenekler: [
              "Kılıcı yoktur",
              "Tek bacaklıdır",
              "Boyası silinmiştir",
              "Düşmandır",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Kurşun asker balerinle neden yakınlık hissetti?",
            secenekler: [
              "Aynı renkte oldukları için",
              "Onu da tek bacaklı sandığı için",
              "Kukla istediği için",
              "Şarkı söylediği için",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Asker lağımdaki fareye ne yaptı?",
            secenekler: [
              "Vergi ödedi",
              "Kavga etti",
              "Hiç konuşmadan dimdik durdu",
              "Geri döndü",
            ],
            dogruIndex: 2,
          },
          {
            soru: "Asker denize açılınca başına ne geldi?",
            secenekler: [
              "Kayık fırtınada battı ve balık onu yuttu",
              "Kıyıya ulaştı",
              "Uçtu",
              "Kukla kurtardı",
            ],
            dogruIndex: 0,
          },
          {
            soru: "Masal nasıl sona erdi?",
            secenekler: [
              "Asker saraya yerleşti",
              "Balerin evlendi",
              "İkisi alevlerde birleşti; asker kalbe dönüştü",
              "Fare onları kurtardı",
            ],
            dogruIndex: 2,
          },
        ],
      },
      {
        id: "agustos-bocegi-ve-karinca",
        baslik: "Ağustos Böceği ile Karınca",
        gorsel: "/agustos.png",
        metin:
          "Yaz mevsimi, güneşin parlak ışıklarıyla yeryüzünü ısıtırken, doğa bütün canlılığıyla hayat bulmuştu. Çiçekler rengârenk açıyor, kuşlar cıvıldıyor, ağaçlar yemyeşil yapraklarıyla rüzgârda dans ediyordu. Bu güzel günlerin tadını en çok çıkaranlardan biri de ağustos böceğiydi. Ağustos böceği bütün gün dalların arasında şarkılar söylüyor, cıvıltılarıyla etrafı neşelendiriyordu. Günlerce şarkı söylemekten bıkmıyor, çalışmayı hiç aklına bile getirmiyordu.\n\nAynı ormanda yaşayan karınca ise bambaşka bir hayat sürüyordu. O, sabah erkenden yuvasından çıkıyor, akşam karanlığı bastırana kadar durmaksızın çalışıyordu. Yazın bolluğundan faydalanıp yiyecek topluyor, kış için yuvasına zahire taşıyordu. Her gün biraz daha yorulsa da geleceği düşünerek gayret ediyordu. Karınca, ağustos böceğini gördüğünde ona da öğüt verir, “Bak dostum, yaz günleri çabuk geçer. Kış geldiğinde aç kalmamak için çalışmalısın.” derdi. Fakat ağustos böceği her defasında gülerek, “Kışa daha çok var. Hem sen de biraz şarkı söyle, eğlenmeyi öğren.” diye karşılık verirdi.\n\nZaman hızla akıp geçti. Bir gün güneş eskisi kadar sıcak vurmaz oldu. Ağaçların yaprakları sarardı, rüzgâr serinlemeye başladı. Ağustos böceği hâlâ şarkılar söylüyordu ama artık doğadaki canlılık yavaş yavaş azalıyor, havalar soğuyordu. Sonunda kış kapıya dayandı. Karlar yağdı, dallar çıplaklaştı, hava keskin bir soğuğa büründü.\n\nAğustos böceği, açlık ve soğukla mücadele ederken, yaz günlerinde hiç hazırlık yapmadığını fark etti. Karnı zil çalıyor, şarkı söylemeye mecali kalmıyordu. Çaresizce aklına çalışkan karınca geldi. Onun yuvasına giderek kapısını çaldı. Üşümekten titreyerek, “Sevgili dostum, ben açım. Bana biraz yiyecek verir misin?” diye yalvardı.\n\nKarınca kapıyı aralayarak dışarı baktı. Yaz boyunca çalışmış, yuvasını yiyeceklerle doldurmuştu. Ağustos böceğini görünce içini çekti ve şöyle dedi: “Yazın ben çalışırken sen şarkı söyledin. Şimdi kış geldi. Açlıktan kurtulmak için o zaman düşündün mü?” Ağustos böceği mahcup bir şekilde başını eğdi. Karınca ona ders vermek istiyordu ama kalbi de yumuşaktı. Bir süre düşündü, sonra, “Bu seferlik sana yardım edeceğim. Ama unutma, her mevsimin bir hazırlığı vardır. Sen de bundan sonra zamanını boşa harcama, çalışmayı öğren.” dedi.\n\nAğustos böceği karıncadan aldığı bu dersle, çalışmanın ve geleceği düşünmenin ne kadar önemli olduğunu anladı. O günden sonra artık sadece şarkı söylemekle yetinmedi, yazı da çalışarak değerlendirdi.",
        sorular: [
          {
            soru: "Ağustos böceği yaz boyunca ne yapıyordu?",
            secenekler: [
              "Şarkı söylüyordu",
              "Yiyecek topluyordu",
              "Yuva yapıyordu",
              "Göç ediyordu",
            ],
            dogruIndex: 0,
          },
          {
            soru: "Karınca yazın neden çalışıyordu?",
            secenekler: [
              "Kış için yiyecek hazırlamak için",
              "Daha çok eğlenmek için",
              "Şarkı söylemek için",
              "Yeni yuva kurmak için",
            ],
            dogruIndex: 0,
          },
          {
            soru: "Kış gelince ağustos böceği neden zorlandı?",
            secenekler: [
              "Yolunu kaybetti",
              "Hazırlık yapmadı ve aç kaldı",
              "Karınca ona kızdı",
              "Yuvasını kaybetti",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Karınca ağustos böceğine ne öğüt verdi?",
            secenekler: [
              "Yazın daha çok eğlenmesini",
              "Kışın dışarı çıkmamasını",
              "Her mevsime hazırlık yapmasını ve çalışmayı",
              "Şarkı söylemeyi bırakmasını",
            ],
            dogruIndex: 2,
          },
          {
            soru: "Masalın ana mesajı nedir?",
            secenekler: [
              "Eğlenmek en önemlisidir",
              "Çalışmak ve ileriye dönük plan yapmak önemlidir",
              "Kışlar her zaman kolaydır",
              "Yardım istemek yanlıştır",
            ],
            dogruIndex: 1,
          },
        ],
      },
      {
        id: "keloglan-ve-devler",
        baslik: "Keloğlan ve Devler Padişahı",
        gorsel: "/dev.png",
        metin:
          "Bir varmış bir yokmuş… Evvel zaman içinde, kalbur saman içinde, uzak diyarlarda fakir bir kadınla oğlu Keloğlan yaşarmış. Keloğlan’ın babası küçükken ölmüş, annesiyle kıt kanaat geçinirmiş. Yoksul olmalarına rağmen Keloğlan her zaman neşeli, güler yüzlü ve zekiymiş. Köyde herkes onun saf göründüğünü düşünür ama zekâsı sayesinde en zor işlerin içinden çıkarmış.\n\nBir gün ülkenin padişahı köye haber salar. Komşu diyarlardan devler musallat olmuş, önüne geleni korkutuyormuş. Kim devlerin padişahını yenip ülkeyi kurtarırsa, ona büyük ödüller verileceğini duyurmuş. Köydeki güçlü delikanlılar korkularından ses çıkaramamış. Ama Keloğlan, annesine dönüp, “Ana, ben gider devler padişahını bulur, onunla konuşurum.” demiş. Annesi önce şaşırmış: “Oğul, sen küçücüksün, devler kocaman! Nasıl baş edersin?” demiş. Keloğlan ise: “Korkma ana, akıl kuvvetten büyüktür.” diye cevap vermiş.\n\nBöylece yola koyulmuş. Günlerce yürüyüp dağlar aşmış. Nihayet devler diyarına varmış. Kocaman kayaları yuva edinmiş devler onu görünce kahkahalarla gülmüş: “Şu kel kafalı çocuğa bakın, bize kafa tutmaya gelmiş!” demişler. Fakat Keloğlan yılmamış, kurnazca devlere yaklaşmış. Onlara bilmeceler sormuş, oyunlar oynamış, hatta devleri birbirine düşürmüş. Kısa sürede zekâsıyla devlerin güvenini kazanmış.\n\nSonunda devler padişahının huzuruna çıkmış. Devler padişahı, göklere yükselen boyuyla korkunç görünüyormuş. Gür sesiyle: “Ey küçük insan, bana kafa tutmaya mı geldin?” demiş. Keloğlan ise saygıyla eğilmiş: “Ben seninle savaşmaya değil, konuşmaya geldim. İnsanlarla devler barış içinde yaşasın istiyorum.” diye cevap vermiş. Devler padişahı onun bu cesaretine şaşırmış.\n\nAralarında akıl yarışı başlamış. Padişah, Keloğlan’a zor bilmeceler sormuş; Keloğlan hepsini zekâsıyla çözmüş. Keloğlan da devlere sorular yöneltmiş, onlar bile cevap verememiş. Nihayet devler padişahı, “Sen küçük görünürsün ama aklın koca dağlardan büyükmüş. Ülkeni rahatsız etmeyeceğiz.” diyerek söz vermiş.\n\nKeloğlan köyüne döndüğünde herkes sevinçle karşılamış. Padişah ona büyük ödüller vermek istemiş, fakat Keloğlan yalnızca annesiyle rahat yaşayacağı küçük bir ev istemiş. Çünkü onun için en büyük ödül, annesinin yüzündeki gülümsemeymiş.\n\nO günden sonra Keloğlan’ın adı sadece köyünde değil, bütün ülkede dilden dile dolaşmış. Herkes şunu öğrenmiş: Kuvvet her zaman galip gelmez; asıl güç akıldadır.",
        sorular: [
          {
            soru: "Keloğlan devler diyarına neden gitmiştir?",
            secenekler: [
              "Hazine bulmak için",
              "Ülkeyi kurtarmak ve barış için konuşmak",
              "Padişah olmak için",
              "Annesinden kaçmak için",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Keloğlan devlerle nasıl başa çıkmıştır?",
            secenekler: [
              "Kılıç kullanarak",
              "Kaçarak",
              "Zekâsıyla bilmeceler ve oyunlarla",
              "Büyü yaparak",
            ],
            dogruIndex: 2,
          },
          {
            soru: "Devler padişahıyla aralarında ne olmuştur?",
            secenekler: [
              "Güreş yapmışlardır",
              "Akıl yarışı (bilmeceler) yapmışlardır",
              "Hiç karşılaşmamışlardır",
              "Keloğlan teslim olmuştur",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Devler padişahı ne söz vermiştir?",
            secenekler: [
              "Köye taşınacağım",
              "İnsanları yöneteceğim",
              "Ülkeyi rahatsız etmeyeceğiz",
              "Keloğlan’ı hapse atacağız",
            ],
            dogruIndex: 2,
          },
          {
            soru: "Keloğlan ödül olarak ne istemiştir?",
            secenekler: [
              "Altınlar ve şöhret",
              "İki büyük saray",
              "Annesiyle rahat yaşayacağı küçük bir ev",
              "Komutanlık",
            ],
            dogruIndex: 2,
          },
        ],
      },
      {
        id: "mufasa-ve-simba",
        baslik: "Aslan Kral: Mufasa ve Simba",
        gorsel: "/aslan.png",
        metin:
          "Bir varmış bir yokmuş… Uzak diyarlarda, güneşin altın ışıklarıyla parlayan uçsuz bucaksız bir orman varmış. Bu ormanın ortasında, yüksek kayalıkların tepesinde kudretli bir aslan yaşarmış. Onun adı Mufasa imiş. Mufasa, ormanın kralı olarak bütün canlılara adalet ve merhametle hükmedermiş. Her sabah güneş doğduğunda hayvanlar kayalığın önünde toplanır, krallarını selamlarmış.\n\nMufasa’nın en büyük mutluluğu ise küçük yavrusu Simba’ymış. Doğduğu günden itibaren herkes Simba’nın geleceğin kralı olacağını bilirmiş. Bütün hayvanlar, küçük aslanın gelişini sevinçle karşılamış. Annesi Sarabi, oğluna sevgiyle bakarken, babası Mufasa ona sık sık nasihat edermiş: “Simba, kral olmak yalnızca güç demek değildir. Sorumluluk almak, bütün canlıların dengesini korumak demektir. Hayat bir döngüdür, bizler bu döngünün sadece bir parçasıyız.”\n\nFakat ormanda herkes Simba’nın doğumuna sevinmemiş. Mufasa’nın kardeşi, yani Simba’nın amcası Scar, tahtı gizliden gizliye kendisi istiyormuş. Hırslı ve sinsi bir karakteri olan Scar, bir plan yapmaya koyulmuş. Amacı hem kardeşini hem de küçük Simba’yı ortadan kaldırıp kral olmaktı.\n\nBir gün Scar, Simba’yı kandırıp yasaklı bir bölgeye götürmüş. Orada tehlikeli hayvanlarla karşılaşan Simba, zor anlar yaşamış. Neyse ki Mufasa yetişmiş, oğlunu kurtarmış. Ancak bu olay Scar’ın kötücül planlarını hızlandırmasına sebep olmuş. Çok geçmeden Scar haince bir tuzak kurmuş. Büyük bir ceylan sürüsünü kayalıklardan aşağı sürmüş. Mufasa, Simba’yı kurtarmak için sürüye atlamış ama kendisi kayalıklardan düşerek hayatını kaybetmiş.\n\nSimba, babasının ölümüne çok üzülmüş. Scar ise bu fırsatı değerlendirip küçük aslana, “Baban senin yüzünden öldü. Artık burada kalamazsın.” diyerek onu kandırmış. Zavallı Simba, suçluluk duygusuyla ormandan uzaklara kaçmış.\n\nUzak diyarlarda Simba yeni dostlar edinmiş. Sevimli mirket Timon ve obur ama neşeli yaban domuzu Pumbaa, ona “Hakuna Matata” yani “boş ver, hayatı dert etme” felsefesini öğretmişler. Simba, yıllar geçtikçe büyümüş, güçlü bir aslan olmuş. Ancak içindeki sorumluluk duygusu ve babasının öğütleri hiç silinmemiş.\n\nBir gün eski dostu Nala ile karşılaşmış. Nala ona, Scar’ın krallığında ormanın perişan hale geldiğini, hayvanların aç ve mutsuz olduğunu anlatmış. Simba önce korkmuş, “Ben suçluyum, kral olamam.” demiş. Fakat bilge maymun Rafiki ona gerçeği göstermiş: “Geçmişten kaçamazsın, Simba. Sen Mufasa’nın oğlusun.”\n\nBabasının ruhunu gökyüzünde gören Simba, cesaretini toplamış ve yurduna dönmeye karar vermiş. Kayalıklara vardığında Scar’la yüzleşmiş. Gerçekler ortaya çıkınca Scar’ın hainliği anlaşılmış. İki aslan arasında büyük bir mücadele olmuş. Sonunda Simba zafer kazanmış, Scar ise kendi kötülüğünün kurbanı olmuş.\n\nSimba, kayalığın tepesine çıkıp gökyüzüne kükremiş. O andan itibaren bütün orman onun kralı olduğunu kabul etmiş. Yıllar sonra Simba da kendi yavrusunu kucağına almış. Döngü yeniden başlamış.\n\nBöylece herkes anlamış ki: Gerçek kral, gücüyle değil, adaleti, merhameti ve cesaretiyle hükmeden kişidir.",
        sorular: [
          {
            soru: "Mufasa küçük Simba’ya ne öğütler?",
            secenekler: [
              "Güçlü ol, gerisi önemli değil",
              "Sorumluluk ve dengenin önemi",
              "Herkesi yönet, kimseyi dinleme",
              "Ormandan uzak dur",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Scar’ın amacı nedir?",
            secenekler: [
              "Simba’yı eğitmek",
              "Kral olmak için Mufasa ve Simba’yı devre dışı bırakmak",
              "Ormanı terk etmek",
              "Barış sağlamak",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Simba sürgün yıllarında ne öğrenir?",
            secenekler: [
              "Hakuna Matata ve sorumlulukla yüzleşme",
              "Savaş sanatı",
              "Avcılık sırları",
              "Büyü yapma",
            ],
            dogruIndex: 0,
          },
          {
            soru: "Simba’yı geri dönmeye kim ikna eder?",
            secenekler: ["Scar", "Rafiki ve Nala", "Pumbaa", "Sarabi"],
            dogruIndex: 1,
          },
          {
            soru: "Masalın ana mesajı nedir?",
            secenekler: [
              "Güç her şeydir",
              "Geçmişten kaç, sorunlar çözülür",
              "Adalet, merhamet ve cesaret gerçek liderliği belirler",
              "Yalnızlık en güvenli yoldur",
            ],
            dogruIndex: 2,
          },
        ],
      },
      {
        id: "rapunzel",
        baslik: "Rapunzel",
        gorsel: "/rapunzel.png",
        metin:
          "Bir varmış bir yokmuş… Evvel zaman içinde, büyük bir ormanın içinde, sihirli güçlere sahip bir cadı yaşarmış. Bu cadının gözünden kaçan bir çiftin, çok istediği bir çocuk olmuş. Kadın hamileyken bahçesindeki nadir bitkilerden biri olan rapunzel otunu çok istemiş. Ancak bu bitki cadının bahçesinde yetişiyormuş. Kadın gizlice bahçeye gidip bitkiyi almış ve tatlı bir şekilde yemiş. Cadı bunu fark etmiş ve öfkelenmiş. Kadın çocuğu doğduğunda cadı onu almış ve kendi evine kapatmış.\n\nRapunzel, cadının gözetiminde ormanın ortasındaki yüksek bir kulede büyümüş. Kulenin kapısı yokmuş, sadece tek bir pencere varmış. Rapunzel’in saçları çok uzun ve altın sarısıymış; cadı her geldiğinde, “Rapunzel, saçlarını sarkıt!” diye bağırır, ve Rapunzel saçlarını pencereden aşağı sarkıtarak cadının tırmanmasını sağlarmış. Günler böyle geçip Rapunzel genç bir kız olunca, sesi ormanda dolaşır olmuş. Bir gün bir prens avlanırken Rapunzel’in şarkısını duymuş ve onun kim olduğunu merak etmiş.\n\nPrens, kuleyi bulmuş ama kapıyı açamamış. Uzun, altın sarısı saçlarını gördüğünde cadıdan duyduğu gibi denemiş: “Rapunzel, saçlarını sarkıt!” Rapunzel bunu yapmış ve prens tırmanıp kuleye ulaşmış. Aralarında hemen bir dostluk doğmuş, sonra da aşka dönüşmüş. Prens, Rapunzel’e kaçış planını anlatmış. Ama cadı onları fark etmiş ve öfkeyle Rapunzel’i ormanın en uzak köşesine sürgün etmiş, prensin gözlerini kör etmiş.\n\nRapunzel ormanda zorluklar içinde yaşamış, fakat sevgisi ve umudu hiç azalmamış. Bir gün talihsiz bir şekilde prens ormanda Rapunzel’in sesini duymuş. Yavrular gibi birbirlerini bulmuşlar. Rapunzel’nin gözyaşları prensin gözlerini iyileştirmiş. Sonunda prens ve Rapunzel mutlu bir şekilde saraylarına dönmüşler ve uzun yıllar birlikte huzur içinde yaşamışlar.\n\nBu masal, sabır, umut ve sevginin gücünü anlatır. Her ne kadar kötü güçler plan yapsa da, iyilik ve sevgi her zaman kazanırmış.",
        sorular: [
          {
            soru: "Rapunzel nerede büyümüştür?",
            secenekler: [
              "Kapısı olmayan yüksek bir kulede",
              "Sarayda",
              "Köy evinde",
              "Mağarada",
            ],
            dogruIndex: 0,
          },
          {
            soru: "Prens kuleye nasıl ulaşmıştır?",
            secenekler: [
              "Merdivenle",
              "Halatla",
              "Rapunzel’in saçlarına tırmanarak",
              "Kapıdan girerek",
            ],
            dogruIndex: 2,
          },
          {
            soru: "Cadı onları fark edince ne olmuştur?",
            secenekler: [
              "Rapunzel’i sürgün etmiş ve prensi kör etmiştir",
              "Prensi saraya davet etmiştir",
              "Rapunzel’i evlendirmiştir",
              "Kuleyi yıkmıştır",
            ],
            dogruIndex: 0,
          },
          {
            soru: "Prensin gözleri nasıl iyileşmiştir?",
            secenekler: [
              "Şifalı otlarla",
              "Rapunzel’in gözyaşlarıyla",
              "Bir büyücüyle",
              "Zamanla kendiliğinden",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Masalın ana mesajı nedir?",
            secenekler: [
              "Güç her şeydir",
              "Sabır, umut ve sevgi kazanır",
              "Kader değişmez",
              "Yalnızlık en güvenlidir",
            ],
            dogruIndex: 1,
          },
        ],
      },
      {
        id: "pinokyo",
        baslik: "Pinokyo",
        gorsel: "/pinokyo.png",
        metin:
          "Bir zamanlar, küçük bir kasabada Geppetto adında yaşlı bir marangoz yaşarmış. Geppetto yalnız yaşayan, kalbi sevgi dolu bir adammış. Bir gün tahta parçalarından bir kukla yapmaya karar vermiş. Kukla bitince ona “Pinokyo” adını vermiş. Geppetto, bu kuklanın gerçek bir çocuk olmasını içtenlikle dilemiş. O gece, iyi kalpli bir peri gelmiş ve kuklaya can vermiş. Ancak peri ona bir şart koymuş: Eğer Pinokyo yalan söylemez, çalışkan, dürüst ve iyi bir çocuk olursa, gerçek bir insana dönüşecektir.\n\nPinokyo, artık yürüyebilen ve konuşabilen bir tahta çocuk olmuş. Fakat kalbi saf olsa da, çok meraklı ve çabuk kandırılabilen bir yapısı varmış. Babası gibi sevdiği Geppetto’nun sözlerini dinlemesi gerekirken çoğu zaman yaramazlıklar yapmış. Onun yol göstericisi ise küçük bir cırcır böceği olmuş. Cırcır böceği sürekli Pinokyo’ya doğru yolu göstermeye çalışsa da, Pinokyo çoğu zaman dinlememiş.\n\nBir gün okula gitmesi gerekirken yolda tilki ve kediyle karşılaşmış. Onlar, Pinokyo’ya çok kolay yoldan zengin olabileceğini söylemişler. Pinokyo safça inanıp onlarla gitmiş ama sonunda kandırılmış. Hem parasını kaybetmiş hem de zor durumda kalmış. Bu sırada yalan söylemeye başlamış. Ne zaman yalan söylese, burnu biraz daha uzamış. Bu durum Pinokyo’ya büyük bir ders olmuş çünkü burnu o kadar büyüyormuş ki hareket etmesi bile zorlaşıyormuş.\n\nBaşka bir zaman sirke düşen Pinokyo, kukla olduğu için gösterilere zorlanmış. Çok yorulmuş ve üzülmüş ama yine de babasını düşünmüş. Çünkü Geppetto, onu bulmak için denizlere açılmış ve kaybolmuş. Pinokyo, babasını kurtarmak için cesur bir yolculuğa çıkmış. Yolda birçok tehlike atlatmış; kötü insanlarla karşılaşmış, hapsedilmiş ama sonunda pes etmemiş.\n\nEn büyük sınavı ise denizde olmuş. Babasını ararken büyük bir balinanın karnına düşmüş. Orada Geppetto ile karşılaşmış. İkisi birlikte akıllıca bir plan yaparak balinadan kurtulmuşlar. Pinokyo, babasına kavuştuğunda artık çok şey öğrenmiş.\n\nPeri, onun cesaretini, fedakârlığını ve iyiliğini görmüş. Pinokyo’nun kalbinin gerçekten büyüdüğüne inanmış. Böylece peri dileğini yerine getirmiş ve Pinokyo’yu gerçek bir çocuk yapmış. Geppetto büyük bir sevinçle oğluna sarılmış. Pinokyo da artık yalan söylememenin, çalışkan ve dürüst olmanın değerini bilmiş.\n\nO günden sonra Pinokyo ve Geppetto mutlu, huzurlu bir hayat sürmüşler. Masal, dürüstlüğün, sevginin ve fedakârlığın insanı gerçek anlamda büyüttüğünü anlatır.",
        sorular: [
          {
            soru: "Perinin Pinokyo'ya koyduğu şart nedir?",
            secenekler: [
              "Cesur olmak",
              "Yalan söylememek ve iyi, çalışkan olmak",
              "Zengin olmak",
              "Okula gitmemek",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Pinokyo ne zaman burnu uzar?",
            secenekler: [
              "Koşunca",
              "Yalan söyleyince",
              "Üzülünce",
              "Sevinince",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Tilki ve kedi Pinokyo'yu nasıl kandırır?",
            secenekler: [
              "Okula götürerek",
              "Kolay yoldan zengin olmayı vaat ederek",
              "Balinaya götürerek",
              "Geppetto'yu buldurarak",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Pinokyo babasıyla nerede karşılaşır?",
            secenekler: ["Ormanda", "Sirkte", "Balinanın karnında", "Kasabada"],
            dogruIndex: 2,
          },
          {
            soru: "Masalın ana mesajı nedir?",
            secenekler: [
              "Dürüstlük, sevgi ve fedakârlık insanı büyütür",
              "Para her şeydir",
              "Yalanın faydası vardır",
              "Yalnız kalmak en iyisidir",
            ],
            dogruIndex: 0,
          },
        ],
      },
      {
        id: "kaplumbaga-ile-tavsan",
        baslik: "Kaplumbağa ile Tavşan",
        gorsel: "/tavsan.png",
        metin:
          "Evvel zaman içinde, yemyeşil ormanların birinde hızlı ve kendine çok güvenen bir tavşan yaşarmış. Tavşan, çevresindeki hayvanlara sürekli “Ben en hızlı hayvanım, kimse bana yetişemez!” dermiş. Ormandaki diğer hayvanlar tavşanın bu kibirli tavrından rahatsız olsalar da, genellikle onu dinlemek zorunda kalırlarmış.\n\nAynı ormanda yavaş ama kararlı bir kaplumbağa da yaşarmış. Kaplumbağa, sessiz ve sakin bir yapıya sahipmiş, kimseyle kavga etmezmiş. Her gün sabırla kendi işlerini yapar, yoluna devam edermiş. Tavşan, kaplumbağanın yavaşlığını görünce gülermiş: “Ah kaplumbağa! Sen ne kadar yavaştırsın. Ben bir anda gidebilirim, sen ise günlerce yürürsün!”\n\nBir gün tavşan, kaplumbağaya meydan okumuş: “Seninle yarış yapalım. Göreceğiz kim gerçekten hızlı!” Kaplumbağa, sakin bir şekilde kabul etmiş: “Olur, kabul ediyorum. Yarışın kazananı, hızının yanı sıra sabrını da gösterecek.”\n\nYarış günü ormandaki tüm hayvanlar toplanmış. Tavşan başlangıç çizgisine hızlı bir şekilde atlamış, kaplumbağa ise yavaş ama kararlı adımlarla ilerlemeye başlamış. Tavşan, kısa sürede uzaklaşınca, kaplumbağayı çok geride görünce kendinden emin bir şekilde ağaç altında dinlenmeye karar vermiş. “Kaplumbağa bana asla yetişemez. Biraz kestirip sonra rahatça yarışı kazanırım,” demiş. Tavşan gözlerini kapatıp uyumuş.\n\nKaplumbağa ise durmadan, yavaş ama sürekli adımlarla ilerlemeye devam etmiş. Yol boyunca yorulmuş olsa da asla pes etmemiş. Tavşan uyuduğu için kaplumbağa, onu geçip bitiş çizgisine yaklaşmış. Sonunda sabrın ve kararlılığın gücü sayesinde kaplumbağa bitiş çizgisini geçmiş ve yarışı kazanmış. Tavşan uyanınca neler olduğunu anlamış ve utanç içinde kalmış.\n\nOrmandaki diğer hayvanlar kaplumbağayı tebrik etmişler ve tavşana da önemli bir ders vermişler: “Hız tek başına yeterli değildir. Sabır ve azim, bazen en güçlü yetenekten bile daha değerlidir.” Tavşan bir daha kibirlenmemiş ve kaplumbağaya saygı duymayı öğrenmiş.\n\nBöylece kaplumbağa ile tavşan hikayesi, sabırlı ve kararlı olmanın, aceleci ve kibirli olmaktan daha üstün olduğunu nesiller boyunca anlatan bir masal olarak ormanda yaşamış.",
        sorular: [
          {
            soru: "Tavşanın en büyük hatası nedir?",
            secenekler: [
              "Yarışa geç başlamak",
              "Kibirlenip uyuyakalmak",
              "Parkuru karıştırmak",
              "Yarışa katılmamak",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Kaplumbağa yarışı nasıl kazanır?",
            secenekler: [
              "Kısa yol kullanır",
              "Koşarak",
              "Yavaş ama durmadan ilerleyerek",
              "Tavşanın yardımını alarak",
            ],
            dogruIndex: 2,
          },
          {
            soru: "Tavşan neden dinlenmeye karar verir?",
            secenekler: [
              "Hava çok sıcaktır",
              "Kaplumbağayı çok geride gördüğü için",
              "Ayağı acıdığı için",
              "Yağmur yağdığı için",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Masalın ana mesajı nedir?",
            secenekler: [
              "Hız her şeydir",
              "Sabır ve azim başarı getirir",
              "Yarışlar gereksizdir",
              "Şans kazandırır",
            ],
            dogruIndex: 1,
          },
          {
            soru: "Yarışın hakemleri kimlerdir?",
            secenekler: [
              "Ormandaki hayvanlar",
              "İnsanlar",
              "Kuşlar",
              "Balıklar",
            ],
            dogruIndex: 0,
          },
        ],
      },
      // Yeni masallar buraya benzer yapıda eklenebilir
    ],
    []
  );

  const [aktifMasal, setAktifMasal] = useState(0);
  const [cevaplar, setCevaplar] = useState({}); // {soruIndex: secenekIndex}
  const [gonderildi, setGonderildi] = useState(false);

  const aktif = stories[aktifMasal];

  const dogruSayisi = useMemo(() => {
    if (!gonderildi) return 0;
    return aktif.sorular.reduce((acc, s, i) => {
      return acc + (cevaplar[i] === s.dogruIndex ? 1 : 0);
    }, 0);
  }, [gonderildi, cevaplar, aktif]);

  function cevabiIsaretle(soruIndex, secenekIndex) {
    setCevaplar((prev) => ({ ...prev, [soruIndex]: secenekIndex }));
  }

  function sinaviGonder() {
    setGonderildi(true);
  }

  function sinaviSifirla() {
    setCevaplar({});
    setGonderildi(false);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 font-inter">
      <h1 className="text-2xl font-bold tracking-tight">Masallar ve Test</h1>

      {/* Masal sekmeleri */}
      <div className="mt-6 flex flex-wrap gap-2">
        {stories.map((m, i) => (
          <button
            key={m.id}
            onClick={() => {
              setAktifMasal(i);
              setCevaplar({});
              setGonderildi(false);
            }}
            className={
              "rounded-md border px-3 py-1 text-sm transition " +
              (i === aktifMasal
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-300 hover:bg-gray-50")
            }
          >
            {m.baslik}
          </button>
        ))}
      </div>

      {/* Masal metni */}
      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">{aktif.baslik}</h2>
        {aktif.gorsel ? (
          <div className="mb-4 rounded-md">
            <Image
              src={aktif.gorsel}
              alt={aktif.baslik}
              width={1200}
              height={480}
              className="h-72 w-full object-contain"
              priority
            />
          </div>
        ) : null}
        <article className="prose max-w-none whitespace-pre-wrap leading-7">
          {aktif.metin}
        </article>
      </section>

      {/* Sorular */}
      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Sorular (5 soru)</h3>
        <ol className="space-y-6">
          {aktif.sorular.map((soru, si) => {
            const secili = cevaplar[si];
            const dogru = gonderildi ? soru.dogruIndex : null;
            return (
              <li key={si} className="rounded-md border border-gray-100 p-4">
                <p className="mb-3 font-medium">
                  {si + 1}. {soru.soru}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {soru.secenekler.map((secenek, oi) => {
                    const isSelected = secili === oi;
                    const isCorrect = dogru === oi;
                    const isWrongSelected =
                      gonderildi && isSelected && !isCorrect;
                    return (
                      <label
                        key={oi}
                        className={
                          "flex cursor-pointer items-center gap-2 rounded-md border p-2 text-sm transition " +
                          (gonderildi
                            ? isCorrect
                              ? "border-green-600 bg-green-50"
                              : isWrongSelected
                              ? "border-red-600 bg-red-50"
                              : "border-gray-200"
                            : isSelected
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50")
                        }
                      >
                        <input
                          type="radio"
                          name={`soru-${si}`}
                          className="h-4 w-4"
                          checked={isSelected || false}
                          onChange={() => cevabiIsaretle(si, oi)}
                          disabled={gonderildi}
                        />
                        <span>{secenek}</span>
                      </label>
                    );
                  })}
                </div>
                {gonderildi && (
                  <p className="mt-2 text-sm">
                    {secili === soru.dogruIndex ? (
                      <span className="text-green-700">Doğru</span>
                    ) : secili == null ? (
                      <span className="text-amber-700">Cevaplanmadı</span>
                    ) : (
                      <span className="text-red-700">Yanlış</span>
                    )}
                  </p>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!gonderildi ? (
            <button
              onClick={sinaviGonder}
              className="rounded-md bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
            >
              Gönder
            </button>
          ) : (
            <>
              <div className="text-sm font-medium">
                Skor: {dogruSayisi} / {aktif.sorular.length}
              </div>
              <button
                onClick={sinaviSifirla}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm hover:bg-gray-50"
              >
                Yeniden Dene
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
