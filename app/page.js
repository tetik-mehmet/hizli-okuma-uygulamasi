"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StructuredData, {
  CourseSchema,
  EducationalServiceSchema,
} from "./components/StructuredData";
import {
  BookOpen,
  Lightbulb,
  Brain,
  Target,
  Zap,
  Star,
  Clock,
  TrendingUp,
  Award,
  Users,
  Check,
  Crown,
  ArrowRight,
  GraduationCap,
  FlaskConical,
  BarChart3,
  Briefcase,
  FileText,
} from "lucide-react";

// Okuma Simülasyonu Komponenti - Soldan Sağa Akan Metin
function ReadingSimulation({ text, speed }) {
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    // Hız hesaplama: kelime/dk -> piksel/saniye
    // Ortalama kelime uzunluğu: 5 karakter
    // Her karakter yaklaşık 14px (text-xl için)
    const wordsPerSecond = speed / 60;
    const avgCharsPerWord = 5;
    const charsPerSecond = wordsPerSecond * avgCharsPerWord;
    const pixelsPerSecond = charsPerSecond * 14; // Her karakter ~14px
    const pixelsPerFrame = pixelsPerSecond / 60; // 60 FPS

    const interval = setInterval(() => {
      setPosition((prev) => {
        const newPosition = prev + pixelsPerFrame;
        // Metin uzunluğunu hesapla (yaklaşık)
        const words = text.split(" ");
        const estimatedWidth = words.length * 120; // Her kelime ~120px
        const maxPosition = estimatedWidth + 800; // Ekstra alan

        if (newPosition >= maxPosition) {
          // Metin bittiğinde başa dön
          return 0;
        }
        return newPosition;
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(interval);
  }, [speed, text, isPlaying]);

  // Metni kelimelere böl
  const words = text.split(" ");
  // Hangi kelime merkezde (odak noktasında)
  const centerWordIndex = Math.floor(position / 120); // Her kelime ~120px

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Odak Noktası Çizgisi - Merkez */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-500 transform -translate-x-1/2 z-20 shadow-lg"></div>

      {/* Odak Noktası Göstergesi - Merkez */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
        <motion.div
          className="w-4 h-4 bg-orange-500 rounded-full shadow-xl border-2 border-white"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Metin Konteyneri */}
      <div className="relative w-full h-32 sm:h-40 flex items-center overflow-hidden">
        {/* Akan Metin */}
        <div
          className="absolute whitespace-nowrap flex items-center gap-2 sm:gap-3"
          style={{
            left: `calc(50% - ${position}px)`,
            transition: "none", // Smooth animasyon için transition kaldırıldı
          }}
        >
          {words.map((word, index) => {
            const distance = Math.abs(index - centerWordIndex);
            const isCurrent = index === centerWordIndex;
            const isPast = index < centerWordIndex;
            const isFuture = index > centerWordIndex;

            return (
              <span
                key={`${word}-${index}`}
                className={`text-lg sm:text-xl md:text-2xl font-medium font-inter transition-all duration-200 ${
                  isCurrent
                    ? "text-orange-600 font-bold text-2xl sm:text-3xl drop-shadow-lg"
                    : isPast
                    ? "text-gray-400 opacity-40"
                    : "text-gray-700 opacity-60"
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Sol ve Sağ Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-50 via-blue-50/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-orange-50 via-orange-50/50 to-transparent z-10 pointer-events-none"></div>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [readingSpeed, setReadingSpeed] = useState(160);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);

  // Ücretsiz deneme butonuna tıklandığında giriş kontrolü yap
  const handleFreeTrialClick = (e) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const authToken = localStorage.getItem("authToken");

    if (!isLoggedIn || !authToken) {
      // Giriş yapılmamışsa login sayfasına yönlendir
      router.push("/login");
    } else {
      // Giriş yapılmışsa free-trial sayfasına yönlendir
      router.push("/free-trial");
    }
  };

  // Okuma hızı animasyonu - 220'den 480'e (sonsuz döngü)
  useEffect(() => {
    let interval;
    let timeout;

    const animateSpeed = () => {
      setIsAnimating(true);
      const duration = 3000; // 3 saniyede tamamlansın
      const startSpeed = 160;
      const endSpeed = 480;
      const steps = 60;
      const increment = (endSpeed - startSpeed) / steps;
      let currentStep = 0;

      interval = setInterval(() => {
        currentStep++;
        const newSpeed = Math.round(startSpeed + increment * currentStep);
        setReadingSpeed(newSpeed);

        if (currentStep >= steps) {
          clearInterval(interval);
          // Biraz bekleyip tekrar başlat
          timeout = setTimeout(() => {
            setReadingSpeed(160);
            setIsAnimating(false);
            // Tekrar başlat
            setTimeout(animateSpeed, 1000);
          }, 2000);
        }
      }, duration / steps);
    };

    // İlk animasyonu başlat
    timeout = setTimeout(animateSpeed, 1000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  // Okuma simülasyonu için örnek metin - Uzun paragraf
  const sampleText =
    "Hızlı okuma becerisi kazanarak zamanınızı verimli kullanın. Bilimsel tekniklerle okuma hızınızı artırın ve daha fazla öğrenin. Konsantrasyon geliştirerek anlama oranınızı yükseltin. Göz hareketlerini optimize ederek okuma verimliliğinizi maksimuma çıkarın. Her gün düzenli pratik yaparak kendinizi geliştirin ve hayatınızda fark yaratın. Hızlı okuma sadece hız değil, aynı zamanda anlama ve özümseme sanatıdır. ";

  // Özellikler bölümü için veriler - Turuncu + Mavi Paleti
  const features = [
    {
      icon: Zap,
      title: "Hızlı Okuma Teknikleri",
      description:
        "Göz hareketlerini optimize ederek okuma hızınızı 3-5 kat artırın.",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: Brain,
      title: "Konsantrasyon Geliştirme",
      description:
        "Dikkat dağınıklığını azaltarak daha iyi odaklanma becerileri kazanın.",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Target,
      title: "Anlama Oranı Artışı",
      description:
        "Hızlı okurken anlama kapasitenizi koruyarak bilgiyi daha iyi özümseyin.",
      color: "from-orange-500 to-orange-700",
    },
    {
      icon: Clock,
      title: "Zaman Tasarrufu",
      description:
        "Günlük okuma sürenizi yarıya indirerek daha fazla içeriğe ulaşın.",
      color: "from-blue-400 to-blue-600",
    },
  ];

  // Kullanıcı Segmentasyonu için veriler
  const userSegments = [
    {
      icon: GraduationCap,
      title: "Öğrenciler için",
      description:
        "Ders kitaplarını ve akademik metinleri hızlı okuyarak daha fazla konu öğrenin. Sınavlarda zaman kazanın ve notlarınızı yükseltin.",
      benefits: [
        "Ders kitaplarını 2 kat hızlı okuyun",
        "Sınavlarda zaman tasarrufu",
        "Daha fazla konu öğrenme fırsatı",
        "Akademik başarı artışı",
      ],
      color: "from-blue-500 to-blue-700",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      icon: Briefcase,
      title: "Profesyoneller için",
      description:
        "Raporları, e-postaları ve iş dokümanlarını hızlı okuyarak verimliliğinizi artırın. Karar alma süreçlerinizi hızlandırın.",
      benefits: [
        "İş dokümanlarını hızlı analiz edin",
        "Günlük okuma yükünü azaltın",
        "Daha hızlı karar alma",
        "Kariyer gelişiminde avantaj",
      ],
      color: "from-orange-500 to-orange-700",
      bgColor: "from-orange-50 to-orange-100",
    },
    {
      icon: FileText,
      title: "Sınavlara hazırlananlar için",
      description:
        "KPSS, YKS, ALES ve diğer sınavlarda soruları hızlı okuyup anlayarak zaman kazanın. Başarı oranınızı artırın.",
      benefits: [
        "Sınav sorularını hızlı anlama",
        "Zaman yönetimi avantajı",
        "Daha fazla soru çözme şansı",
        "Sınav başarısı artışı",
      ],
      color: "from-purple-500 to-purple-700",
      bgColor: "from-purple-50 to-purple-100",
    },
  ];

  // Avantajlar bölümü için veriler
  const benefits = [
    {
      icon: TrendingUp,
      title: "Performans Artışı",
      description:
        "Okuma hızınızı artırarak akademik ve profesyonel performansınızı yükseltin.",
    },
    {
      icon: Award,
      title: "Sertifikalı Eğitim",
      description:
        "Uzman eğitmenler tarafından hazırlanmış, kanıtlanmış tekniklerle öğrenin.",
    },
    {
      icon: Users,
      title: "Kişiselleştirilmiş Program",
      description:
        "Seviyenize uygun, adım adım ilerleyen özelleştirilmiş eğitim programı.",
    },
    {
      icon: Star,
      title: "Pratik Alıştırmalar",
      description:
        "Günlük hayatta uygulayabileceğiniz, etkili ve eğlenceli alıştırmalar.",
    },
  ];

  // Animasyon varyantları - Gelişmiş Scroll Animasyonları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom easing
      },
    },
  };

  // Slide from left variant
  const slideLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Slide from right variant
  const slideRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Scale up variant
  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-orange-50 text-gray-800 overflow-x-hidden font-inter">
      {/* Structured Data for SEO */}
      <StructuredData
        data={CourseSchema({
          name: "Hızlı Okuma Eğitimi",
          description:
            "Okuma hızınızı 3 kat artıran, anlama oranınızı koruyan bilimsel hızlı okuma teknikleri eğitimi. Öğrenciler, profesyoneller ve sınav hazırlığı yapanlar için özel programlar.",
          price: "1899",
          priceCurrency: "TRY",
        })}
      />
      <StructuredData data={EducationalServiceSchema()} />
      {/* Header - Sadece Anasayfada */}
      <Header />

      {/* Hero Section - Modern 2025 Design */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        {/* Arka plan dekoratif elementler */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Sol Taraf - İçerik */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center lg:text-left"
            >
              {/* Ana Başlık - Ölçülebilir Fayda Odaklı - Kelime Bazlı Animasyon */}
              <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 font-inter leading-tight">
                {["Dakikada", "3", "Kat"].map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="inline-block mr-2"
                  >
                    <span className="text-orange-600">{word}</span>
                    {index < 2 && " "}
                  </motion.span>
                ))}
                <br />
                {["Daha", "Hızlı", "Oku"].map((word, index) => (
                  <motion.span
                    key={index + 3}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className="inline-block mr-2"
                  >
                    <span className="text-gray-800">{word}</span>
                    {index < 2 && " "}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Alt Başlık - Net Ölçülebilir Mesaj */}
              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold mb-3 sm:mb-4 font-inter"
              >
                <span className="text-orange-600 font-bold">
                  {readingSpeed}
                </span>{" "}
                kelime/dk ile{" "}
                <span className="text-blue-600 font-bold">günde 30 dakika</span>{" "}
                kazan
              </motion.p>

              {/* İkinci Alt Başlık - Formül */}
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium mb-6 sm:mb-8 font-inter"
              >
                <span className="text-orange-600 font-semibold">
                  Hızlı Okuma
                </span>{" "}
                + <span className="text-blue-600 font-semibold">Anlama</span> ={" "}
                <span className="text-green-600 font-semibold">
                  Gerçek Verim
                </span>
              </motion.p>

              {/* Canlı Sayaç Kartı */}
              <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
                <motion.div
                  className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-orange-400"
                  animate={{
                    boxShadow: [
                      "0 20px 40px rgba(249, 115, 22, 0.3)",
                      "0 25px 50px rgba(249, 115, 22, 0.4)",
                      "0 20px 40px rgba(249, 115, 22, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                    <div className="text-center lg:text-left">
                      <p className="text-white/90 text-sm sm:text-base font-medium mb-2 font-inter">
                        Başlangıç Hızı
                      </p>
                      <p className="text-3xl sm:text-4xl font-bold text-white font-inter">
                        160
                      </p>
                      <p className="text-white/80 text-xs sm:text-sm font-inter">
                        kelime/dk
                      </p>
                    </div>
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 flex-shrink-0" />
                    </motion.div>
                    <div className="text-center lg:text-left">
                      <p className="text-white/90 text-sm sm:text-base font-medium mb-2 font-inter">
                        Hedef Hız
                      </p>
                      <motion.p
                        key={readingSpeed}
                        initial={{ scale: 1.2, color: "#fef3c7" }}
                        animate={{ scale: 1, color: "#ffffff" }}
                        className="text-3xl sm:text-4xl font-bold font-inter"
                      >
                        {readingSpeed}
                      </motion.p>
                      <p className="text-white/80 text-xs sm:text-sm font-inter">
                        kelime/dk
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-orange-400/30">
                    <p className="text-white/90 text-sm sm:text-base text-center lg:text-left font-inter">
                      ⚡ <span className="font-semibold">3 kat hız</span> ile{" "}
                      <span className="font-semibold">günde 30 dakika</span>{" "}
                      kazanın
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Açıklama - Somut Fayda Odaklı */}
              <motion.div
                variants={itemVariants}
                className="mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0"
              >
                <p className="text-base sm:text-lg text-gray-700 mb-3 leading-relaxed font-inter font-semibold">
                  📚 160 kelime/dk → 480 kelime/dk
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-inter">
                  Bilimsel tekniklerle okuma hızınızı{" "}
                  <span className="font-semibold text-orange-600">3 kat</span>{" "}
                  artırın. Anlama oranınızı koruyarak{" "}
                  <span className="font-semibold text-blue-600">
                    günde 30 dakika
                  </span>{" "}
                  kazanın.
                </p>
              </motion.div>

              {/* CTA Buttons - Doğru Hiyerarşi */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center lg:justify-start"
              >
                {/* Primary CTA - Ücretsiz Denemeye Başla - Mavi */}
                <motion.button
                  onClick={handleFreeTrialClick}
                  className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg sm:text-xl px-10 sm:px-14 py-5 sm:py-6 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 group overflow-hidden font-inter w-full sm:w-auto cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(37, 99, 235, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <motion.div
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <Zap className="w-6 h-6 sm:w-7 sm:h-7" />
                    </motion.div>
                    Ücretsiz Denemeye Başla
                  </span>
                </motion.button>

                {/* Secondary CTA - Nasıl Çalışır? - Turuncu Outline */}
                <motion.button
                  onClick={() => {
                    const featuresSection = document.getElementById("features");
                    if (featuresSection) {
                      featuresSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="relative bg-white text-orange-600 font-semibold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-orange-500/20 hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 group overflow-hidden font-inter border-2 border-orange-500 w-full sm:w-auto"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 15px 30px rgba(249, 115, 22, 0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <motion.div
                      whileHover={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                    >
                      <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    </motion.div>
                    Nasıl Çalışır?
                  </span>
                </motion.button>
              </motion.div>

              {/* Tertiary CTA - Giriş Yap (Link Stilinde) - Mavi */}
              <motion.div
                variants={itemVariants}
                className="mt-4 flex items-center justify-center lg:justify-start"
              >
                <Link href="/login">
                  <motion.button
                    className="text-gray-600 hover:text-blue-600 font-medium text-sm sm:text-base transition-colors duration-200 font-inter flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Zaten hesabınız var mı?{" "}
                    <span className="text-blue-600 font-semibold underline">
                      Giriş Yap
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Sağ Taraf - Animasyonlu Okuma Simülasyonu */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-gray-200">
                {/* Simülasyon Başlığı */}
                <div className="mb-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-inter">
                    Canlı Okuma Deneyimi
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-inter">
                    Metni takip edin ve okumaya çalışın
                  </p>
                </div>

                {/* Okuma Alanı */}
                <div className="relative bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-6 sm:p-8 min-h-[250px] sm:min-h-[300px] border-2 border-gray-200 overflow-hidden">
                  {/* Kelime Akışı Animasyonu */}
                  <ReadingSimulation text={sampleText} speed={readingSpeed} />

                  {/* Hız Göstergesi */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 z-30">
                    <p className="text-sm sm:text-base font-bold text-gray-900 font-inter">
                      <span className="text-orange-600">{readingSpeed}</span>{" "}
                      kelime/dk
                    </p>
                  </div>
                </div>

                {/* Bilgi Notu */}
                <div className="mt-6 text-center">
                  <p className="text-xs sm:text-sm text-gray-600 font-inter">
                    👆 Merkez çizgideki kelimeleri takip ederek okuyun
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kullanıcı Segmentasyonu - User Segmentation */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-inter"
            >
              <span className="text-orange-600">Size</span>{" "}
              <span className="text-blue-600">Özel</span>{" "}
              <span className="text-orange-600">Çözümler</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-inter"
            >
              Hangi gruptansınız? Size en uygun faydaları keşfedin
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {userSegments.map((segment, index) => {
              const IconComponent = segment.icon;
              const animationVariant =
                index === 0
                  ? slideLeftVariants
                  : index === 1
                  ? scaleUpVariants
                  : slideRightVariants;

              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={animationVariant}
                  className={`group relative bg-gradient-to-br ${segment.bgColor} p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-gray-200 overflow-hidden`}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Arka plan dekoratif gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${segment.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    {/* İkon */}
                    <motion.div
                      className={`inline-flex p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${segment.color} mb-6 shadow-lg`}
                      whileHover={{
                        scale: 1.15,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 },
                      }}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </motion.div>

                    {/* Başlık */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-inter">
                      {segment.title}
                    </h3>

                    {/* Açıklama */}
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-inter">
                      {segment.description}
                    </p>

                    {/* Faydalar Listesi */}
                    <ul className="space-y-3 mb-6">
                      {segment.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-start gap-3"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          </motion.div>
                          <span className="text-gray-700 text-sm sm:text-base font-inter">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Butonu */}
                    <motion.button
                      onClick={handleFreeTrialClick}
                      className={`w-full bg-gradient-to-r ${segment.color} text-white font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 font-inter`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Hemen Başla
                    </motion.button>
                  </div>

                  {/* Dekoratif köşe elementi */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${segment.color} opacity-5 rounded-bl-full`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Güven Unsurları - Trust Elements */}
      <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {/* 12.000+ Kullanıcı */}
            <motion.div
              variants={scaleUpVariants}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="inline-flex p-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 mb-3 sm:mb-4 shadow-lg"
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 },
                }}
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 font-inter"
              >
                12.000+
              </motion.div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium font-inter">
                Aktif Kullanıcı
              </p>
            </motion.div>

            {/* 250+ Okul */}
            <motion.div
              variants={scaleUpVariants}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="inline-flex p-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-3 sm:mb-4 shadow-lg"
                whileHover={{
                  scale: 1.15,
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.3 },
                }}
              >
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 font-inter"
              >
                110+
              </motion.div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium font-inter">
                Okul Ortaklığı
              </p>
            </motion.div>

            {/* Bilimsel Testlerle Kanıtlandı */}
            <motion.div
              variants={scaleUpVariants}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="inline-flex p-3 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 mb-3 sm:mb-4 shadow-lg"
                whileHover={{
                  scale: 1.15,
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 0.3 },
                }}
              >
                <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 font-inter"
              >
                Bilimsel Testlerle
              </motion.div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium font-inter">
                Kanıtlandı
              </p>
            </motion.div>

            {/* Ortalama %85 Hız Artışı */}
            <motion.div
              variants={scaleUpVariants}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="inline-flex p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 mb-3 sm:mb-4 shadow-lg"
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 },
                }}
              >
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 font-inter"
              >
                %85
              </motion.div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium font-inter">
                Ortalama Hız Artışı
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sosyal Kanıt Bölümü */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Kullanıcı yorumu + güçlü cümle */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 mb-4">
                <Star className="w-4 h-4 text-orange-500" />
                <span className="text-xs sm:text-sm font-semibold text-orange-700 font-inter">
                  Sosyal Kanıt
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-inter">
                20.000+ öğrenci dakikada daha hızlı okuyor
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-6 font-inter">
                <span className="font-semibold text-orange-600">
                  20.000+ öğrenci
                </span>{" "}
                ve{" "}
                <span className="font-semibold text-blue-600">
                  yüzlerce öğretmen
                </span>{" "}
                düzenli egzersizlerle okuma hızını ortalama{" "}
                <span className="font-semibold text-green-600">%42</span>{" "}
                artırdığını bildiriyor.
              </p>
              <div className="bg-gradient-to-br from-orange-50 to-blue-50 border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-sm font-bold">
                      M
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      S
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-800 italic mb-3 font-inter">
                  “Daha önce bir sayfayı bitirmek dakikalarımı alıyordu. Şimdi
                  aynı sürede 3 kat daha fazla metin okuyup{" "}
                  <span className="font-semibold">anladığımı hissediyorum</span>
                  . Sınavlarda zaman baskısı neredeyse yok oldu.”
                </p>
                <p className="text-xs sm:text-sm text-gray-600 font-inter">
                  Ayşe K. – 11. sınıf YKS öğrencisi
                </p>
              </div>
            </motion.div>

            {/* Mikro sosyal kanıt kartları */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-orange-500" />
                  <p className="text-sm font-semibold text-gray-900 font-inter">
                    Kaç kişi kullanıyor?
                  </p>
                </div>
                <p className="text-2xl font-bold text-gray-900 font-inter">
                  20.000+
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 font-inter">
                  Aktif öğrenci ve yetişkin kullanıcı
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="w-6 h-6 text-blue-500" />
                  <p className="text-sm font-semibold text-gray-900 font-inter">
                    Kimler için uygun?
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-inter">
                  İlkokul, ortaokul, lise, üniversite ve yoğun okuma yapan tüm
                  profesyoneller için uygundur.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <FlaskConical className="w-6 h-6 text-purple-500" />
                  <p className="text-sm font-semibold text-gray-900 font-inter">
                    Bilimsel dayanak
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-inter">
                  Göz hareketleri, odaklanma ve anlama üzerine{" "}
                  <span className="font-semibold">
                    bilimsel araştırmalarla desteklenen
                  </span>{" "}
                  hızlı okuma teknikleri kullanıyoruz.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-green-500" />
                  <p className="text-sm font-semibold text-gray-900 font-inter">
                    Somut sonuçlar
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-inter">
                  Düzenli kullanımda öğrenciler{" "}
                  <span className="font-semibold text-green-600">
                    ilk 6–8 haftada
                  </span>{" "}
                  okuma hızında ve anlama oranında belirgin artış raporluyor.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Etkinlikler ve Verimlilikler */}
      <section
        id="features"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-inter"
            >
              <span className="text-orange-600">Etkinlikler</span> ve{" "}
              <span className="text-blue-600">Verimlilikler</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-inter"
            >
              Platformumuzda sunulan etkili teknikler ve verimlilik artırıcı
              özellikler
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              // Her kart için farklı animasyon yönü
              const animationVariant =
                index % 2 === 0 ? slideLeftVariants : slideRightVariants;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={animationVariant}
                  className="group relative bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg`}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 },
                      }}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 font-inter">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-inter">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section - Fiyatlandırma */}
      <section
        id="pricing"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-inter"
            >
              <span className="text-orange-600">Fiyatlandırma</span>{" "}
              <span className="text-blue-600">Planları</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-inter"
            >
              Size en uygun abonelik planını seçin ve hızlı okuma yolculuğunuza
              başlayın
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* Aylık Paket */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideLeftVariants}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 relative"
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-inter">
                  Aylık Paket
                </h3>
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-orange-600 font-inter">
                    1899₺
                  </span>
                  <span className="text-gray-600 text-lg ml-2 font-inter">
                    /ay
                  </span>
                </div>
                <p className="text-gray-600 text-sm font-inter">
                  Aylık abonelik ile tüm içeriklere erişim
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "📚 Okuma hızını bilimsel egzersizlerle 3 kata kadar çıkar",
                  "🎯 Dikkatini güçlendirerek odak süreni 2–3 kat uzat",
                  "📈 Okuduğunu anlama oranını %30’a kadar artır",
                  "⏰ 7/24 erişimle istediğin zaman, istediğin yerden pratik yap",
                  "✅ İlerlemeni grafiklerle takip ederek motivasyonunu yüksek tut",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base font-inter">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <motion.button
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 font-inter"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Hemen Başla
                </motion.button>
              </Link>
            </motion.div>

            {/* 3 Aylık Paket */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleUpVariants}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 relative"
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-inter">
                  3 Aylık Paket
                </h3>
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-orange-600 font-inter">
                    5299₺
                  </span>
                  <span className="text-gray-600 text-lg ml-2 font-inter">
                    /3 ay
                  </span>
                </div>
                <p className="text-gray-600 text-sm font-inter">
                  3 aylık abonelik ile tüm içeriklere erişim
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "📚 3 ay boyunca okuma hızını 3 kata kadar çıkarma fırsatı",
                  "🎯 Düzenli egzersizlerle sınav ve ders çalışırken odaklanma gücünü artır",
                  "📈 Okuduğunu anlama oranını %30’a kadar yükselt",
                  "⏰ 3 ay kesintisiz erişimle her gün kısa pratiklerle zaman kazan",
                  "✅ İlerleme raporlarınla gelişimini net bir şekilde gör",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base font-inter">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <motion.button
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 font-inter"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Hemen Başla
                </motion.button>
              </Link>
            </motion.div>

            {/* Yıllık Paket - Öne Çıkan (Soft Arka Plan, Güçlü Başlık + Fiyat + CTA) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideRightVariants}
              className="bg-gradient-to-br from-orange-50 via-white to-orange-50 p-6 sm:p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-orange-200 relative transform scale-105 sm:scale-100"
              whileHover={{
                y: -10,
                scale: 1.08,
                transition: { duration: 0.3 },
              }}
            >
              {/* Popüler Badge */}
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg font-inter flex items-center gap-2">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Crown className="w-4 h-4" />
                  </motion.div>
                  Popüler
                </span>
              </motion.div>

              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-2 font-inter">
                  Yıllık Paket
                </h3>
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-orange-600 font-inter">
                    19999₺
                  </span>
                  <span className="text-gray-600 text-lg ml-2 font-inter">
                    /yıl
                  </span>
                </div>
                <p className="text-gray-600 text-sm font-inter">
                  Yıllık abonelik ile %15 tasarruf edin
                </p>
                <div className="mt-2 inline-block bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  <span className="text-orange-700 text-xs font-semibold font-inter">
                    Aylık 1667₺&apos;ye denk gelir
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "📚 12 ay boyunca okuma hızını 3–5 kata kadar çıkarma imkânı",
                  "🎯 Uzun vadeli programla odaklanma ve dikkat süreni kalıcı olarak artır",
                  "📈 Okuduğunu anlama oranını yıl boyunca düzenli egzersizlerle %30’a kadar yükselt",
                  "⏰ Yıl boyu sınırsız erişimle her gün sadece 15–20 dakikada zaman kazan",
                  "✅ Detaylı ilerleme raporlarıyla gelişimini adım adım takip et",
                  "🤝 Öncelikli destekle sorularına daha hızlı yanıt al",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 text-sm sm:text-base font-inter">
                      {feature}
                    </span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <a
                    href="https://hipnodilakademi.net/danismanlik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-700 text-sm sm:text-base font-inter underline underline-offset-2 decoration-orange-300 hover:text-orange-800 transition-colors"
                  >
                    Hipnodil Akademi öğrenci danışmanlık merkezinden %10 indirim
                    fırsatı
                  </a>
                </li>
              </ul>

              <Link href="/signup">
                <motion.button
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 font-inter"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Hemen Başla
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Karar verdiren mikro bilgiler */}
          <div className="mt-10 sm:mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
              <p className="font-semibold text-gray-900 font-inter">
                İstediğim zaman iptal edebilir miyim?
              </p>
              <p className="text-gray-600 mt-1 font-inter">
                Evet. Aboneliğini dilediğin zaman iptal edebilirsin, sonraki
                dönem için ücret ödemezsin.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
              <p className="font-semibold text-gray-900 font-inter">
                Ücretsiz deneme var mı?
              </p>
              <p className="text-gray-600 mt-1 font-inter">
                Evet. Üyelik oluşturmadan önce{" "}
                <Link
                  href="/subscription-expired"
                  className="font-semibold text-orange-600 underline underline-offset-2 hover:text-orange-700 transition-colors"
                >
                  ücretsiz deneme
                </Link>{" "}
                ile egzersizleri deneyebilirsin.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
              <p className="font-semibold text-gray-900 font-inter">
                Kimler için uygun?
              </p>
              <p className="text-gray-600 mt-1 font-inter">
                İlkokul öğrencilerinden sınav hazırlananlara ve yoğun tempolu
                profesyonellere kadar, okuma hızını ve anlama oranını artırmak
                isteyen herkes için uygundur.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
              <p className="font-semibold text-gray-900 font-inter">
                Mobilde çalışıyor mu?
              </p>
              <p className="text-gray-600 mt-1 font-inter">
                Evet. Tüm egzersizler{" "}
                <span className="font-semibold text-blue-600">
                  telefon, tablet ve bilgisayarda
                </span>{" "}
                sorunsuz çalışacak şekilde tasarlandı.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Kullanıcı Avantajları */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-inter"
            >
              <span className="text-orange-600">Kullanıcı</span>{" "}
              <span className="text-blue-600">Avantajları</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-inter"
            >
              Platformumuzun size sunduğu benzersiz faydalar ve avantajlar
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={itemVariants}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center group"
                >
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-inter">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-inter">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-inter"
            >
              Hızlı Okuma Yolculuğunuza Başlayın
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-orange-50 mb-8 max-w-2xl mx-auto font-inter"
            >
              Okuma hızınızı artırın, daha fazla öğrenin ve hayatınızda fark
              yaratın. Hemen başlayın!
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href="/login">
                <motion.button
                  className="bg-white text-blue-600 font-semibold text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 group overflow-hidden relative font-inter"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </motion.div>
                    Hemen Başla
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Fixed WhatsApp Button - Her zaman görünür */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="relative"
          onMouseEnter={() => setShowWhatsAppTooltip(true)}
          onMouseLeave={() => setShowWhatsAppTooltip(false)}
        >
          <motion.a
            href="https://wa.me/905304784166"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 10px 30px rgba(37, 211, 102, 0.4)",
                "0 15px 40px rgba(37, 211, 102, 0.6)",
                "0 10px 30px rgba(37, 211, 102, 0.4)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </motion.a>

          {/* Tooltip */}
          <AnimatePresence>
            {showWhatsAppTooltip && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-0 mb-3 w-72 z-50"
              >
                <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200/50 p-4 backdrop-blur-sm">
                  <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white border-r border-b border-gray-200/50 rotate-45"></div>
                  <p className="text-base font-semibold text-gray-700 leading-relaxed">
                    Soru ve talepleriniz için teknik destek hattımıza mesaj
                    atabilirsiniz. Ekiplerimiz size en kısa süre içerisinde
                    dönüş yapacaklardır.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </main>
  );
}
