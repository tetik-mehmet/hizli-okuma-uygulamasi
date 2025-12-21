"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeft as ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";

export default function DilbilgisiPage() {
  const [answers, setAnswers] = useState({});
  const [mevcutEtkinlik, setMevcutEtkinlik] = useState(0);

  const etkinlikler = [
    {
      id: 1,
      baslik: "1. Etkinlik - Tema: Okul",
      renk: "blue",
      sorular: [
        {
          id: "activity1_1",
          baslik: "Cümleyi Tamamla:",
          aciklama:
            "Öğrenciler zil çalınca sınıfa koştu. Öğretmen tahtaya döndü ve...",
          tip: "textarea",
          placeholder: "Cümlenin devamını yazın...",
        },
        {
          id: "activity1_2",
          baslik: "Bağlaçla Cümle Birleştir:",
          aciklama: "Derse geç kaldım. Öğretmen bana kızmadı. (oysa)",
          tip: "textarea",
          placeholder: "Cümleleri birleştirin...",
        },
        {
          id: "activity1_3",
          baslik: "Bağlaçla Cümle Birleştir:",
          aciklama: "Sınav zor geçti. Tüm soruları doğru yaptım. (buna rağmen)",
          tip: "textarea",
          placeholder: "Cümleleri birleştirin...",
        },
      ],
    },
    {
      id: 2,
      baslik: "2. Etkinlik - Tema: Doğa",
      renk: "green",
      sorular: [
        {
          id: "activity2_1",
          baslik: "Boşluk Doldur:",
          aciklama:
            "Ağaçların yaprakları ___ rüzgârla birlikte savruluyordu. Gökyüzü ___ gri bulutlarla kaplıydı.",
          tip: "bosluk",
          placeholder: "Boşlukları doldurun...",
        },
        {
          id: "activity2_2",
          baslik: "Zarf-Fiil Kullan:",
          aciklama:
            "(yağmur yağınca, yürürken, duyar duymaz) ifadelerini kullanarak cümle yaz.",
          tip: "textarea",
          placeholder: "Zarf-fiil kullanarak cümleler yazın...",
        },
      ],
    },
    {
      id: 3,
      baslik: "3. Etkinlik - Tema: Macera",
      renk: "purple",
      sorular: [
        {
          id: "activity3_1",
          baslik: "Hikâyeyi Tamamla:",
          aciklama:
            "Ali ve arkadaşları eski haritayı takip ederek ormanın derinliklerine doğru ilerlediler. Haritanın sonunda gizli bir geçit vardı ve...",
          tip: "textarea",
          placeholder: "Hikâyenin devamını yazın...",
        },
        {
          id: "activity3_2",
          baslik: "Cümle Hatalarını Bul ve Düzelt:",
          aciklama: "Macera çok heyecanlıydı çünkü Ali korkmaktan mutlu oldu.",
          tip: "textarea",
          placeholder: "Düzeltilmiş cümleyi yazın...",
        },
        {
          id: "activity3_3",
          baslik: "Cümle Hatalarını Bul ve Düzelt:",
          aciklama:
            "Biz gittiğimiz yerlerde kimseyi görmedik, bu yüzden herkes bizi görmedi.",
          tip: "textarea",
          placeholder: "Düzeltilmiş cümleyi yazın...",
        },
      ],
    },
    {
      id: 4,
      baslik: "4. Etkinlik - Tema: Günlük Yaşam",
      renk: "orange",
      sorular: [
        {
          id: "activity4_1",
          baslik: "Cümleleri Sıralı Hale Getir:",
          aciklama:
            "1. markete / gitti / ve / sonra / Ayşe / manavdan / elma aldı",
          tip: "input",
          placeholder: "Sıralı cümleyi yazın...",
        },
        {
          id: "activity4_2",
          baslik: "Cümleleri Sıralı Hale Getir:",
          aciklama: "2. kitap / kitabı / okurken / dikkatli / okuyucu / anladı",
          tip: "input",
          placeholder: "Sıralı cümleyi yazın...",
        },
      ],
    },
    {
      id: 5,
      baslik: "5. Etkinlik - Tema: Bilim Kurgu",
      renk: "indigo",
      sorular: [
        {
          id: "activity5_1",
          baslik: "Hayal Gücü ile Yaz:",
          aciklama:
            "Yıl 3025... İnsanlar artık başka gezegenlerde yaşamaktadır. Sen Mars'ta yaşayan bir çocuksun. Bugün okulda...",
          tip: "textarea",
          placeholder: "Hikâyenizi yazın...",
        },
        {
          id: "activity5_2",
          baslik: "Zarf-Fiil ile Yaz:",
          aciklama:
            "(Uyanınca, Uzay gemisine binerken, Gökyüzüne bakıp hayal kurarak) ifadelerini kullanarak cümleler yazın:",
          tip: "textarea",
          placeholder: "Zarf-fiilleri kullanarak cümleler yazın...",
        },
      ],
    },
    {
      id: 6,
      baslik: "6. Etkinlik - Tema: Gizem",
      renk: "red",
      sorular: [
        {
          id: "activity6_1",
          baslik: "Gizemi Anlat:",
          aciklama:
            'Zeynep bir sabah odasında tanımadığı bir mektup buldu. Mektupta sadece "Beni saat 10\'da bekle" yazıyordu. O sırada...',
          tip: "textarea",
          placeholder: "Gizemi anlatın...",
        },
        {
          id: "activity6_2",
          baslik: "Karışık Cümleleri Düzelt:",
          aciklama:
            "Gizemli bir şekilde mektup geldiğini Zeynep odasında fark etti.",
          tip: "textarea",
          placeholder: "Düzeltilmiş cümleyi yazın...",
        },
        {
          id: "activity6_3",
          baslik: "Karışık Cümleleri Düzelt:",
          aciklama: "Onu gören yoktu çünkü o kimseyi görmedi.",
          tip: "textarea",
          placeholder: "Düzeltilmiş cümleyi yazın...",
        },
      ],
    },
    {
      id: 7,
      baslik: "7. Etkinlik - Tema: Spor",
      renk: "yellow",
      sorular: [
        {
          id: "activity7_1",
          baslik: "Yarışmayı Anlat:",
          aciklama: "Bugün okulda büyük futbol turnuvası vardı. Takımımız...",
          tip: "textarea",
          placeholder: "Yarışmayı anlatın...",
        },
        {
          id: "activity7_2",
          baslik: "Bağlaçla Açıkla:",
          aciklama: "Takım çok yorulmuştu, ___ pes etmedi.",
          tip: "bosluk",
          placeholder: "Bağlaç yazın...",
        },
        {
          id: "activity7_3",
          baslik: "Bağlaçla Açıkla:",
          aciklama: "Hızlı koşuyordu, ___ topu kontrol edemedi.",
          tip: "bosluk",
          placeholder: "Bağlaç yazın...",
        },
      ],
    },
    {
      id: 8,
      baslik: "8. Etkinlik - Tema: Aile",
      renk: "pink",
      sorular: [
        {
          id: "activity8_1",
          baslik: "Uzun Cümle Yaz:",
          aciklama: "Bugün annemle pazara gittik. Orada...",
          tip: "textarea",
          placeholder: "Uzun cümleyi yazın...",
        },
        {
          id: "activity8_2",
          baslik: "Cümle Uzat:",
          aciklama:
            '"Biz sinemaya gittik." (kim, ne zaman, neden gibi ögelerle genişlet.)',
          tip: "textarea",
          placeholder: "Genişletilmiş cümleyi yazın...",
        },
      ],
    },
    {
      id: 9,
      baslik: "9. Etkinlik - Tema: Teknoloji",
      renk: "teal",
      sorular: [
        {
          id: "activity9_1",
          baslik: "Görsel Etkinlik (hayali):",
          aciklama: "[Görsel: Bilgisayar başında ders çalışan çocuk]",
          tip: "textarea",
          placeholder: "Ne yapıyor olabilir?",
        },
        {
          id: "activity9_2",
          baslik: "Görsel Etkinlik (hayali):",
          aciklama: "[Görsel: Bilgisayar başında ders çalışan çocuk]",
          tip: "textarea",
          placeholder: "Bu çocuk sence ne düşünüyor?",
        },
        {
          id: "activity9_3",
          baslik: "Zarf-Fiil Kullan:",
          aciklama: "Aşağıdaki zarf-fiilleri kullanarak cümleler yazın:",
          tip: "zarf_fiil_liste",
          zarfFiiller: [
            "Bilgisayar başında otururken",
            "Dersi izledikten sonra",
            "Bilgi ararken",
          ],
          placeholder: "Zarf-fiilleri kullanarak cümleler yazın...",
        },
      ],
    },
    {
      id: 10,
      baslik: "10. Etkinlik - Tema: Fantastik",
      renk: "violet",
      sorular: [
        {
          id: "activity10_1",
          baslik: "Hikâyeyi Yaz:",
          aciklama:
            "Sen bir ejderha ile arkadaş oldun. Birlikte uçmaya başladığınız ilk gün...",
          tip: "textarea",
          placeholder: "Hikâyenizi yazın...",
        },
        {
          id: "activity10_2",
          baslik: "Bağlaçla Anlat:",
          aciklama: "Çok yüksekte uçuyorduk, ___ hiç korkmadım.",
          tip: "bosluk",
          placeholder: "Bağlaç yazın...",
        },
        {
          id: "activity10_3",
          baslik: "Bağlaçla Anlat:",
          aciklama: "Ejderha konuşabiliyordu, ___ kimse ona inanmıyordu.",
          tip: "bosluk",
          placeholder: "Bağlaç yazın...",
        },
      ],
    },
  ];

  const mevcutEtkinlikData = etkinlikler[mevcutEtkinlik];

  const handleInputChange = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const sonrakiEtkinlik = () => {
    if (mevcutEtkinlik < etkinlikler.length - 1) {
      setMevcutEtkinlik(mevcutEtkinlik + 1);
    }
  };

  const oncekiEtkinlik = () => {
    if (mevcutEtkinlik > 0) {
      setMevcutEtkinlik(mevcutEtkinlik - 1);
    }
  };

  const getRenkClasses = (renk) => {
    const renkMap = {
      blue: "border-blue-500 bg-blue-50 text-blue-800",
      green: "border-green-500 bg-green-50 text-green-800",
      purple: "border-purple-500 bg-purple-50 text-purple-800",
      orange: "border-orange-500 bg-orange-50 text-orange-800",
      indigo: "border-indigo-500 bg-indigo-50 text-indigo-800",
      red: "border-red-500 bg-red-50 text-red-800",
      yellow: "border-yellow-500 bg-yellow-50 text-yellow-800",
      pink: "border-pink-500 bg-pink-50 text-pink-800",
      teal: "border-teal-500 bg-teal-50 text-teal-800",
      violet: "border-violet-500 bg-violet-50 text-violet-800",
    };
    return renkMap[renk] || "border-gray-500 bg-gray-50 text-gray-800";
  };

  const renderSoru = (soru) => {
    switch (soru.tip) {
      case "textarea":
        return (
          <textarea
            value={answers[soru.id] || ""}
            onChange={(e) => handleInputChange(soru.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder={soru.placeholder}
          />
        );
      case "input":
        return (
          <input
            type="text"
            value={answers[soru.id] || ""}
            onChange={(e) => handleInputChange(soru.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={soru.placeholder}
          />
        );
      case "bosluk":
        return (
          <div className="space-y-2">
            <p className="text-gray-600">
              {soru.aciklama.split("___").map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <input
                      type="text"
                      value={answers[soru.id] || ""}
                      onChange={(e) =>
                        handleInputChange(soru.id, e.target.value)
                      }
                      className="w-24 p-1 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none text-center mx-2"
                      placeholder="___"
                    />
                  )}
                </span>
              ))}
            </p>
          </div>
        );
      case "zarf_fiil_liste":
        return (
          <div className="space-y-4">
            <div className="space-y-3 mb-4">
              {soru.zarfFiiller.map((zarfFiil, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  <span className="text-gray-600">{zarfFiil}</span>
                </div>
              ))}
            </div>
            <textarea
              value={answers[soru.id] || ""}
              onChange={(e) => handleInputChange(soru.id, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder={soru.placeholder}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Geri Dön Butonu */}
        <Link
          href="/odak"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Egzersizlere Dön
        </Link>

        <motion.div
          key={mevcutEtkinlik}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Etkinlik Navigasyonu */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={oncekiEtkinlik}
              disabled={mevcutEtkinlik === 0}
              className="flex items-center text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Önceki Etkinlik
            </button>

            <div className="text-sm text-gray-600">
              Etkinlik {mevcutEtkinlik + 1} / {etkinlikler.length}
            </div>

            <button
              onClick={sonrakiEtkinlik}
              disabled={mevcutEtkinlik === etkinlikler.length - 1}
              className="flex items-center text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Sonraki Etkinlik
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
            Dilbilgisi Dedektifleri
          </h1>
          <h2 className="text-xl text-center text-gray-600 mb-8">
            Türkçe Çalışma Fasikülü
          </h2>

          {/* Mevcut Etkinlik */}
          <div
            className={`mb-8 p-6 border-l-4 ${getRenkClasses(
              mevcutEtkinlikData.renk
            )}`}
          >
            <div className="flex items-center mb-4">
              <div
                className={`w-4 h-4 bg-${mevcutEtkinlikData.renk}-500 mr-3`}
              ></div>
              <h3 className="text-xl font-semibold">
                {mevcutEtkinlikData.baslik}
              </h3>
            </div>

            <div className="space-y-6">
              {mevcutEtkinlikData.sorular.map((soru, index) => (
                <motion.div
                  key={soru.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <h4 className="font-medium text-gray-800 mb-4">
                    {index + 1}. {soru.baslik}
                  </h4>
                  <p className="text-gray-600 mb-4">{soru.aciklama}</p>
                  {renderSoru(soru)}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
