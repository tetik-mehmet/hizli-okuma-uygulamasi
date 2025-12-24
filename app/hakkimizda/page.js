"use client";
import { motion } from "framer-motion";
import {
  Target,
  Brain,
  Zap,
  Eye,
  BookOpen,
  Users,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Clock,
} from "lucide-react";

export default function HakkimizdaPage() {
  const features = [
    {
      icon: Zap,
      title: "Okuma Hızını Artırır",
      description:
        "Anlama oranını koruyarak okuma hızını önemli ölçüde artırır",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Eye,
      title: "Göz-Beyin Koordinasyonu",
      description: "Göz ve beyin koordinasyonunu güçlendirir",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: Brain,
      title: "İç Seslendirmeyi Azaltır",
      description: "Okuma sırasında iç seslendirmeyi minimize eder",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Target,
      title: "Dikkat ve Konsantrasyon",
      description: "Sürdürülebilir dikkat ve konsantrasyon sağlar",
      color: "from-green-400 to-emerald-500",
    },
  ];

  const targetAudience = [
    {
      icon: GraduationCap,
      title: "Öğrenciler",
      description: "Ders çalışma verimliliğini artırın",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: "Sınav Adayları",
      description: "Sınavlarda zaman kazanın ve başarıyı artırın",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Briefcase,
      title: "Profesyoneller",
      description: "Yoğun tempoda çalışanlar için ideal",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Users,
      title: "Akademisyenler",
      description: "Araştırma ve okuma verimliliğini yükseltin",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const principles = [
    "Bilimsel ve uygulamalı teknikler",
    "Her seviyeye uygun içerik",
    "Dijital öğrenme deneyimi",
    "Kısa sürede ölçülebilir gelişim",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative overflow-hidden font-inter">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 30, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16 md:space-y-20"
        >
          {/* Hero Section */}
          <motion.section
            variants={itemVariants}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="relative inline-flex items-center justify-center mb-8"
            >
              <motion.div
                className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-20 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative z-10 inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-full shadow-2xl shadow-blue-500/50">
                <Brain className="w-16 h-16 md:w-20 md:h-20 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200%",
              }}
            >
              Odak Anatolia
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Hızla akan bilgi çağında{" "}
              <span className="font-bold text-blue-600">odaklanmayı</span>,{" "}
              <span className="font-bold text-indigo-600">anlamayı</span> ve{" "}
              <span className="font-bold text-purple-600">
                zihinsel verimliliği
              </span>{" "}
              merkeze alan bir eğitim platformudur.
            </motion.p>
          </motion.section>

          {/* SpeedMind Introduction */}
          <motion.section
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30"
          >
            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    SpeedMind Programı
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Hızlı okumanın ötesine geçen zihinsel gelişim
                  </p>
                </div>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Geliştirdiğimiz{" "}
                <span className="font-bold text-orange-600">SpeedMind</span>{" "}
                programı; hızlı okumanın ötesine geçerek{" "}
                <span className="font-semibold text-indigo-600">
                  zihinsel odak
                </span>
                ,{" "}
                <span className="font-semibold text-purple-600">
                  anlama derinliği
                </span>{" "}
                ve{" "}
                <span className="font-semibold text-blue-600">
                  bilişsel kontrol
                </span>{" "}
                kazandırmayı hedefler. Çünkü bize göre hız, ancak doğru odakla
                birleştiğinde gerçek bir avantaja dönüşür.
              </motion.p>
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section variants={itemVariants} className="space-y-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                SpeedMind Özellikleri
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Bilimsel ve uygulamalı teknikler üzerine inşa edilmiş özellikler
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Program Details */}
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-xl border border-indigo-200/50"
          >
            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                <Lightbulb className="w-8 h-8 text-indigo-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Program Yapısı
                </h2>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                SpeedMind; okuma hızını artırırken anlama oranını koruyan, göz
                ve beyin koordinasyonunu güçlendiren, iç seslendirmeyi azaltan,
                dikkat ve konsantrasyonu sürdürülebilir hâle getiren bilimsel ve
                uygulamalı teknikler üzerine inşa edilmiştir.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {principles.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {principle}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Target Audience */}
          <motion.section variants={itemVariants} className="space-y-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Kimler İçin?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Programımız; her seviyeye uygun şekilde tasarlanmıştır
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {targetAudience.map((audience, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${audience.color} flex items-center justify-center mx-auto mb-4 shadow-md`}
                  >
                    <audience.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {audience.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Mission Statement */}
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-6">
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.3 }}
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Misyonumuz</h2>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl leading-relaxed text-white/95"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.6 }}
              >
                Odak Anatolia olarak biz, hızlı okumanın bir yetenek değil;
                doğru yöntemle herkesin geliştirebileceği bir{" "}
                <span className="font-bold">zihinsel beceri</span> olduğuna
                inanıyoruz.
              </motion.p>

              <motion.p
                className="text-lg md:text-xl leading-relaxed text-white/95 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.6 }}
              >
                SpeedMind ile hedefimiz; sadece daha hızlı okuyan değil, daha
                bilinçli düşünen bireyler yetiştirmektir.
              </motion.p>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            variants={itemVariants}
            className="text-center space-y-8 bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Zamanınızı Yönetin
                </h2>
              </div>

              <div className="space-y-4">
                <motion.p
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200%",
                  }}
                >
                  Odaklanın.
                </motion.p>

                <motion.p
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5,
                  }}
                  style={{
                    backgroundSize: "200%",
                  }}
                >
                  SpeedMind ile zihninizi hızlandırın.
                </motion.p>
              </div>

              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.6 }}
              >
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg md:text-xl px-8 py-4 md:px-12 md:py-5 rounded-2xl shadow-2xl shadow-blue-500/50 hover:shadow-3xl transition-all duration-300 overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6" />
                    Hemen Başlayın
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
