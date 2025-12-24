"use client";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Eye,
  Target,
  BookOpen,
  Users,
  GraduationCap,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Clock,
  Lightbulb,
  ArrowRight,
  Sparkles,
  BarChart3,
  Award,
  Rocket,
} from "lucide-react";
import Link from "next/link";

export default function SpeedMindPage() {
  const whatIsSpeedMind = [
    {
      icon: Zap,
      title: "Hızlı Okuma",
      description:
        "Okuma hızınızı 3-5 kata kadar artırırken anlama oranınızı koruyan teknikler",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Brain,
      title: "Zihinsel Odak",
      description:
        "Dikkat ve konsantrasyonu sürdürülebilir hale getiren bilişsel kontrol teknikleri",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: Eye,
      title: "Göz-Beyin Koordinasyonu",
      description:
        "Göz hareketlerini optimize ederek beyin-beden koordinasyonunu güçlendirir",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Target,
      title: "Anlama Derinliği",
      description:
        "Hızlı okurken metni daha iyi anlamanızı sağlayan bilişsel stratejiler",
      color: "from-green-400 to-emerald-500",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Zaman Tasarrufu",
      description:
        "Okuma hızınızı artırarak daha fazla içeriği daha kısa sürede okuyun",
    },
    {
      icon: BarChart3,
      title: "Verimlilik Artışı",
      description:
        "Ders çalışma, sınav hazırlığı ve iş hayatında verimliliğinizi yükseltin",
    },
    {
      icon: Award,
      title: "Başarı Oranı",
      description:
        "Sınavlarda ve akademik çalışmalarda başarı oranınızı önemli ölçüde artırın",
    },
    {
      icon: Rocket,
      title: "Kariyer Gelişimi",
      description:
        "Profesyonel hayatta hızlı öğrenme ve adaptasyon becerilerinizi geliştirin",
    },
  ];

  const whoCanBenefit = [
    {
      icon: GraduationCap,
      title: "Öğrenciler",
      description:
        "Ders kitaplarını, notları ve akademik metinleri daha hızlı okuyup anlayın. Sınavlarda zaman kazanın ve başarı oranınızı artırın.",
      features: [
        "Ders çalışma verimliliğini artırır",
        "Sınavlarda zaman kazanımı sağlar",
        "Okuma alışkanlığı kazandırır",
        "Öğrenme hızını yükseltir",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: "Sınav Adayları",
      description:
        "KPSS, YKS, ALES, YDS gibi sınavlara hazırlanan adaylar için ideal. Uzun metinleri hızlı okuyup anlayarak sınav başarınızı artırın.",
      features: [
        "Sınav süresini verimli kullanma",
        "Soruları daha hızlı okuma",
        "Anlama oranını koruma",
        "Stres azaltma",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Briefcase,
      title: "Profesyoneller",
      description:
        "Yoğun iş temposunda raporları, e-postaları ve dokümanları hızlı okuyup anlayın. Karar verme süreçlerinizi hızlandırın.",
      features: [
        "İş verimliliğini artırır",
        "Bilgi işleme hızını yükseltir",
        "Karar verme sürecini hızlandırır",
        "Rekabet avantajı sağlar",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Users,
      title: "Akademisyenler",
      description:
        "Araştırma makalelerini, kitapları ve akademik metinleri hızlı okuyup analiz edin. Araştırma verimliliğinizi artırın.",
      features: [
        "Araştırma verimliliğini artırır",
        "Literatür taramasını hızlandırır",
        "Bilgi sentezleme becerisini geliştirir",
        "Yayın sürecini hızlandırır",
      ],
      color: "from-green-500 to-emerald-500",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Değerlendirme",
      description:
        "Mevcut okuma hızınız ve anlama seviyeniz ölçülür, kişisel gelişim planınız oluşturulur",
    },
    {
      step: "2",
      title: "Eğitim",
      description:
        "Bilimsel tekniklerle göz egzersizleri, odaklanma çalışmaları ve hızlı okuma pratikleri yapılır",
    },
    {
      step: "3",
      title: "Pratik",
      description:
        "Günlük egzersizler ve interaktif uygulamalarla becerileriniz pekiştirilir",
    },
    {
      step: "4",
      title: "Gelişim",
      description:
        "İlerlemeniz takip edilir, geri bildirimler alırsınız ve sürekli gelişim sağlarsınız",
    },
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
                className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-20 blur-2xl"
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
              <div className="relative z-10 inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full shadow-2xl shadow-orange-500/50">
                <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight"
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
              SpeedMind Nedir?
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Hızlı okumanın ötesine geçerek{" "}
              <span className="font-bold text-orange-600">zihinsel odak</span>,{" "}
              <span className="font-bold text-red-600">anlama derinliği</span>{" "}
              ve{" "}
              <span className="font-bold text-pink-600">bilişsel kontrol</span>{" "}
              kazandıran bilimsel bir eğitim programıdır.
            </motion.p>
          </motion.section>

          {/* What is SpeedMind */}
          <motion.section variants={itemVariants} className="space-y-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                SpeedMind Ne Sağlar?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hız ve anlamayı birleştiren kapsamlı bir zihinsel gelişim
                programı
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whatIsSpeedMind.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-md`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-xl border border-orange-200/50"
          >
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                SpeedMind&apos;in Faydaları
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Programımızın size sağlayacağı ölçülebilir avantajlar
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4 shadow-md">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* How It Works */}
          <motion.section variants={itemVariants} className="space-y-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Nasıl Çalışır?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                SpeedMind programı 4 adımda gelişim sağlar
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 relative"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 mt-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Who Can Benefit */}
          <motion.section variants={itemVariants} className="space-y-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Kimler Yararlanabilir?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                SpeedMind programı her seviyeden kullanıcı için tasarlanmıştır
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whoCanBenefit.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center shadow-md flex-shrink-0`}
                    >
                      <group.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {group.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Faydalar:
                    </h4>
                    <ul className="space-y-2">
                      {group.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.3 + index * 0.1 + idx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Key Features */}
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-6">
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.6 }}
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Temel Özellikler
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Okuma hızını artırırken anlama oranını korur",
                  "Göz ve beyin koordinasyonunu güçlendirir",
                  "İç seslendirmeyi azaltır",
                  "Dikkat ve konsantrasyonu sürdürülebilir hale getirir",
                  "Bilimsel ve uygulamalı teknikler kullanır",
                  "Her seviyeye uygun içerik sunar",
                  "Dijital öğrenme deneyimi sağlar",
                  "Kısa sürede ölçülebilir gelişim gösterir",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.7 + index * 0.05, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white/95 text-lg leading-relaxed">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
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
              transition={{ delay: 3.1, duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                SpeedMind ile Yolculuğunuza Başlayın
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Hızlı okumanın bir yetenek değil, doğru yöntemle herkesin
                geliştirebileceği bir zihinsel beceri olduğuna inanıyoruz.
              </p>

              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.3, duration: 0.6 }}
              >
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white font-bold text-lg md:text-xl px-8 py-4 md:px-12 md:py-5 rounded-2xl shadow-2xl shadow-orange-500/50 hover:shadow-3xl transition-all duration-300 overflow-hidden group"
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
                      <Rocket className="w-6 h-6" />
                      Ücretsiz Başlayın
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
