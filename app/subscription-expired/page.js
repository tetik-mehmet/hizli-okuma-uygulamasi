"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Crown,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  Zap,
  Shield,
  ArrowRight,
  X,
  LogOut,
  Star,
  Trophy,
  BookOpen,
  TrendingUp,
  Target,
  PlayCircle,
} from "lucide-react";

export default function SubscriptionExpiredPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [freeTrialLoading, setFreeTrialLoading] = useState(false);
  const [error, setError] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("none");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [freeTrialStarted, setFreeTrialStarted] = useState(false);
  const [freeTrialEndDate, setFreeTrialEndDate] = useState(null);
  const [userName, setUserName] = useState("");
  const [priceCounters, setPriceCounters] = useState({
    monthly: 0,
    quarterly: 0,
    yearly: 0,
  });

  // Generate fixed positions for sparkle animation to avoid hydration mismatch
  const sparklePositions = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    // Giriş kontrolü
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const authToken = localStorage.getItem("authToken");

    if (!isLoggedIn || !authToken) {
      router.push("/login");
      return;
    }

    // Kullanıcı bilgilerini al
    const name = localStorage.getItem("userName");
    const surname = localStorage.getItem("userSurname");
    if (name && surname) {
      setUserName(`${name} ${surname}`);
    } else if (name) {
      setUserName(name);
    }

    const status = localStorage.getItem("subscriptionStatus");
    const subscribed = localStorage.getItem("isSubscribed") === "true";
    const endDate = localStorage.getItem("subscriptionEndDate");
    const type = localStorage.getItem("subscriptionType");

    setSubscriptionStatus(status || "none");
    setIsSubscribed(subscribed);
    setSubscriptionEndDate(endDate);
    setSubscriptionType(type);

    // Ücretsiz deneme durumunu kontrol et
    const freeTrialStartedLocal =
      localStorage.getItem("freeTrialStarted") === "true";
    const freeTrialEndDateLocal = localStorage.getItem("freeTrialEndDate");

    if (freeTrialStartedLocal && freeTrialEndDateLocal) {
      const endDate = new Date(freeTrialEndDateLocal);
      const now = new Date();
      if (endDate > now) {
        setFreeTrialStarted(true);
        setFreeTrialEndDate(freeTrialEndDateLocal);
      }
    }

    // Price counting animation
    const animatePrice = (target, key, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setPriceCounters((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }, 16);
    };

    setTimeout(() => {
      animatePrice(1299, "monthly");
      animatePrice(3699, "quarterly");
      animatePrice(13999, "yearly");
    }, 800);
  }, [router]);

  const handlePurchase = async (subscriptionType) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/subscription/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subscriptionType }),
      });

      const data = await response.json();

      if (response.ok) {
        // Abonelik bilgilerini localStorage'a kaydet
        localStorage.setItem("isSubscribed", "true");
        localStorage.setItem(
          "subscriptionType",
          data.subscription.subscriptionType
        );
        localStorage.setItem(
          "subscriptionStartDate",
          data.subscription.subscriptionStartDate
        );
        localStorage.setItem(
          "subscriptionEndDate",
          data.subscription.subscriptionEndDate
        );
        localStorage.setItem(
          "subscriptionStatus",
          data.subscription.subscriptionStatus
        );

        // Genel sayfasına yönlendir
        router.push("/genel");
      } else {
        setError(data.message || "Abonelik satın alma işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartFreeTrial = async () => {
    setFreeTrialLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (!token || !isLoggedIn) {
        setError("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return;
      }

      const response = await fetch("/api/free-trial/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Ücretsiz deneme bilgilerini localStorage'a kaydet
        localStorage.setItem("freeTrialStarted", "true");
        localStorage.setItem(
          "freeTrialEndDate",
          data.freeTrial.freeTrialEndDate
        );
        setFreeTrialStarted(true);
        setFreeTrialEndDate(data.freeTrial.freeTrialEndDate);

        // Ücretsiz deneme sayfasına yönlendir
        router.push("/free-trial");
      } else {
        if (response.status === 401) {
          setError(
            "Oturum süreniz dolmuş. Giriş sayfasına yönlendiriliyorsunuz..."
          );
          localStorage.removeItem("authToken");
          localStorage.removeItem("isLoggedIn");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          setError(data.message || "Ücretsiz deneme başlatılamadı.");
        }
      }
    } catch (error) {
      console.error("Free trial start error:", error);
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setFreeTrialLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userSurname");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPackages");
    localStorage.removeItem("userData");
    localStorage.removeItem("isSubscribed");
    localStorage.removeItem("subscriptionType");
    localStorage.removeItem("subscriptionStartDate");
    localStorage.removeItem("subscriptionEndDate");
    localStorage.removeItem("subscriptionStatus");
    localStorage.removeItem("freeTrialStarted");
    localStorage.removeItem("freeTrialEndDate");
    router.replace("/login");
  };

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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-inter">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 4,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 md:space-y-12"
        >
          {/* User Greeting - Enhanced */}
          {userName && (
            <motion.div variants={itemVariants} className="text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="inline-block bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-xl border border-white/50 relative overflow-hidden group"
              >
                {/* Subtle background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                <div className="relative z-10">
                  <motion.p
                    className="text-sm text-gray-600 mb-1 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    Hoş geldiniz
                    <Sparkles className="w-3 h-3 text-blue-500" />
                  </motion.p>
                  <motion.p
                    className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200%",
                    }}
                  >
                    {userName}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* 🎉 Hero Section - Başarı Anı (En Önemli) */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-8 pb-8"
          >
            {subscriptionStatus === "active" ? (
              <>
                {/* Confetti/Sparkle Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  {sparklePositions.map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{
                        left: `${pos.left}%`,
                        top: `${pos.top}%`,
                      }}
                      initial={{ opacity: 0, scale: 0, y: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.5, 1, 0],
                        y: [0, -100, -150],
                        x: [0, Math.random() * 100 - 50],
                      }}
                      transition={{
                        duration: 3,
                        delay: pos.delay,
                        repeat: Infinity,
                        repeatDelay: 5,
                      }}
                    />
                  ))}
                </div>

                {/* Hero Icon with Multiple Layers */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="relative inline-flex items-center justify-center mb-8"
                >
                  {/* Outer Glow Ring */}
                  <motion.div
                    className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 opacity-30 blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Middle Ring */}
                  <motion.div
                    className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-green-300 to-emerald-400 opacity-50"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  />
                  {/* Main Icon */}
                  <motion.div
                    className="relative z-10 inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full shadow-2xl shadow-green-500/50"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Trophy className="w-16 h-16 md:w-20 md:h-20 text-white" />
                    </motion.div>
                  </motion.div>
                  {/* Floating Sparkles */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${20 + i * 25}%`,
                        left: `${i % 2 === 0 ? -20 : 120}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Success Message with Celebration */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="space-y-4"
                >
                  <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent mb-4 leading-tight"
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
                    🎉 Tebrikler! 🎉
                  </motion.h1>
                  <motion.p
                    className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    Aboneliğiniz Aktif
                  </motion.p>
                  <motion.p
                    className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    Artık tüm premium içeriklere erişim hakkınız var. Hızlı
                    okuma yolculuğunuzda başarılar dileriz!
                  </motion.p>
                </motion.div>

                {/* 👉 Ana CTA - Tek ve Güçlü */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="pt-6"
                >
                  <Link href="/genel">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white font-bold text-lg md:text-xl px-10 py-5 md:px-12 md:py-6 rounded-2xl shadow-2xl shadow-green-500/50 hover:shadow-3xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Shine Effect */}
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
                        <PlayCircle className="w-6 h-6" />
                        İçeriklere Başla
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>

                {/* 🧭 İkincil Yönlendirmeler - Akıllı Öneriler */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="pt-8 max-w-4xl mx-auto"
                >
                  <p className="text-sm text-gray-500 mb-4 font-medium">
                    Hızlı Başlangıç Önerileri:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        icon: BookOpen,
                        title: "İlk Egzersiz",
                        description: "Hızlı okuma tekniklerini öğren",
                        href: "/genel/bolum1/exercises",
                        color: "from-blue-500 to-indigo-600",
                      },
                      {
                        icon: TrendingUp,
                        title: "İlerlemeni Gör",
                        description: "Gelişimini takip et",
                        href: "/ogrenci-panel",
                        color: "from-purple-500 to-pink-600",
                      },
                      {
                        icon: Target,
                        title: "Hedef Belirle",
                        description: "Kendine hedef koy",
                        href: "/genel",
                        color: "from-orange-500 to-red-600",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group"
                      >
                        <Link href={item.href}>
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div
                              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} mb-3 shadow-md group-hover:shadow-lg transition-shadow`}
                            >
                              <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* 🧾 Abonelik Bilgisi (Secondary) */}
                {subscriptionEndDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="pt-8 max-w-md mx-auto"
                  >
                    <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-xl p-5 border border-green-200/50 shadow-md">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Calendar className="w-5 h-5 text-green-600" />
                        </motion.div>
                        <p className="text-sm font-semibold text-gray-700">
                          Abonelik Bitiş Tarihi
                        </p>
                      </div>
                      <motion.p
                        className="text-xl font-bold text-green-700 mb-2 text-center"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5, type: "spring" }}
                      >
                        {new Date(subscriptionEndDate).toLocaleDateString(
                          "tr-TR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </motion.p>
                      {subscriptionType && (
                        <div className="flex items-center justify-center gap-2">
                          <Crown className="w-4 h-4 text-yellow-500" />
                          <p className="text-xs text-gray-600">
                            Paket:{" "}
                            <span className="font-semibold">
                              {subscriptionType === "monthly"
                                ? "Aylık"
                                : subscriptionType === "yearly"
                                ? "Yıllık"
                                : subscriptionType === "quarterly"
                                ? "3 Aylık"
                                : subscriptionType}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <>
                {/* Pulsing Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="relative inline-flex items-center justify-center mb-8"
                >
                  {/* Outer Pulse */}
                  <motion.div
                    className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-20 blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Middle Ring */}
                  <motion.div
                    className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-blue-300 to-indigo-400 opacity-40"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -360],
                    }}
                    transition={{
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      rotate: {
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  />
                  {/* Main Icon */}
                  <motion.div
                    className="relative z-10 inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-full shadow-2xl shadow-blue-500/50"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
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
                      <Clock className="w-16 h-16 md:w-20 md:h-20 text-white" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="space-y-4"
                >
                  <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight"
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
                    Aboneliğiniz Aktif Değil
                  </motion.h1>
                  <motion.p
                    className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    İçeriklere erişmek için abonelik satın almanız
                    gerekmektedir.
                  </motion.p>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* 👉 Ana CTA - Abonelik Aktif Değilse */}
          {subscriptionStatus !== "active" && (
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-center pb-4"
            >
              <motion.p
                className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Size en uygun planı seçin ve hızlı okuma yolculuğunuza devam
                edin.
              </motion.p>
            </motion.div>
          )}

          {/* 🧭 Rehber / Onboarding - Free Trial (Secondary) */}
          <AnimatePresence>
            {subscriptionStatus !== "active" && !freeTrialStarted && (
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-r from-blue-400/80 via-indigo-400/80 to-purple-400/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-indigo-200/30 relative overflow-hidden"
                >
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-indigo-700" />
                        <h3 className="text-lg font-semibold text-indigo-900">
                          Ücretsiz Deneme
                        </h3>
                      </div>
                      <p className="text-sm text-indigo-800/90">
                        7 gün boyunca Exercise4 ve Exercise5 egzersizlerine
                        ücretsiz erişim sağlayın.
                      </p>
                    </div>
                    <motion.button
                      onClick={handleStartFreeTrial}
                      disabled={freeTrialLoading || loading}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2 text-sm"
                    >
                      {freeTrialLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          Başlatılıyor...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Denemeyi Başlat
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Free Trial Active Notice */}
          <AnimatePresence>
            {freeTrialStarted && freeTrialEndDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center shadow-2xl shadow-green-500/30"
                >
                  <motion.div
                    className="flex items-center justify-center gap-3 mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-8 h-8" />
                    <h2 className="text-3xl font-bold">
                      Ücretsiz Deneme Aktif!
                    </h2>
                  </motion.div>
                  <p className="text-green-50 text-lg mb-6">
                    Bitiş Tarihi:{" "}
                    <span className="font-bold">
                      {new Date(freeTrialEndDate).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                  <Link href="/free-trial">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 bg-white text-green-600 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors shadow-lg"
                    >
                      Ücretsiz Deneme Sayfasına Git
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 🧾 Abonelik Bilgisi - Pricing Cards (Secondary) */}
          {subscriptionStatus !== "active" && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto pt-4"
            >
              {/* Monthly Package */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="text-center mb-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Aylık Paket
                    </h3>
                    <div className="mb-3">
                      <motion.span
                        className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        {priceCounters.monthly}₺
                      </motion.span>
                      <span className="text-gray-600 text-base ml-2">/ay</span>
                    </div>
                    <p className="text-gray-600 text-xs">
                      Aylık abonelik ile tüm içeriklere erişim
                    </p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {[
                      "📚 Okuma hızını bilimsel egzersizlerle 3 kata kadar çıkar",
                      "🎯 Dikkatini güçlendirerek odak süreni 2–3 kat uzat",
                      "📈 Okuduğunu anlama oranını %30'a kadar artır",
                      "⏰ 7/24 erişimle istediğin zaman, istediğin yerden pratik yap",
                      "✅ İlerlemeni grafiklerle takip ederek motivasyonunu yüksek tut",
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          className="flex-shrink-0"
                        >
                          <Check className="w-5 h-5 text-blue-500 mt-0.5" />
                        </motion.div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => handlePurchase("monthly")}
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm"
                  >
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          İşleniyor...
                        </>
                      ) : (
                        <>
                          <Crown className="w-4 h-4" />
                          Abone Ol
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Quarterly Package */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-indigo-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="text-center mb-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      3 Aylık Paket
                    </h3>
                    <div className="mb-3">
                      <motion.span
                        className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        {priceCounters.quarterly}₺
                      </motion.span>
                      <span className="text-gray-600 text-base ml-2">
                        /3 ay
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs">
                      3 aylık abonelik ile tüm içeriklere erişim
                    </p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {[
                      "📚 3 ay boyunca okuma hızını 3 kata kadar çıkarma fırsatı",
                      "🎯 Düzenli egzersizlerle sınav ve ders çalışırken odaklanma gücünü artır",
                      "📈 Okuduğunu anlama oranını %30'a kadar yükselt",
                      "⏰ 3 ay kesintisiz erişimle her gün kısa pratiklerle zaman kazan",
                      "✅ İlerleme raporlarınla gelişimini net bir şekilde gör",
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + index * 0.1 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          className="flex-shrink-0"
                        >
                          <Check className="w-5 h-5 text-indigo-500 mt-0.5" />
                        </motion.div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => handlePurchase("monthly")}
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm"
                  >
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          İşleniyor...
                        </>
                      ) : (
                        <>
                          <Crown className="w-4 h-4" />
                          Abone Ol
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Yearly Package - Featured */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-indigo-300 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Popular Badge */}
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
                    <motion.div
                      animate={{
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Crown className="w-3 h-3" />
                    </motion.div>
                    Popüler
                  </span>
                </motion.div>

                <div className="relative z-10">
                  <div className="text-center mb-5">
                    <h3 className="text-xl font-bold text-indigo-900 mb-3">
                      Yıllık Paket
                    </h3>
                    <div className="mb-3">
                      <motion.span
                        className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                      >
                        {priceCounters.yearly}₺
                      </motion.span>
                      <span className="text-gray-600 text-base ml-2">/yıl</span>
                    </div>
                    <p className="text-gray-600 text-xs mb-2">
                      Yıllık abonelik ile %15 tasarruf edin
                    </p>
                    <motion.div
                      className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full border border-indigo-200"
                      whileHover={{ scale: 1.03 }}
                    >
                      <span className="text-indigo-700 text-xs font-semibold">
                        Aylık 1166₺&apos;ye denk gelir
                      </span>
                    </motion.div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {[
                      "📚 12 ay boyunca okuma hızını 3–5 kata kadar çıkarma imkânı",
                      "🎯 Uzun vadeli programla odaklanma ve dikkat süreni kalıcı olarak artır",
                      "📈 Okuduğunu anlama oranını yıl boyunca düzenli egzersizlerle %30'a kadar yükselt",
                      "⏰ Yıl boyu sınırsız erişimle her gün sadece 15–20 dakikada zaman kazan",
                      "✅ Detaylı ilerleme raporlarıyla gelişimini adım adım takip et",
                      "🤝 Öncelikli destekle sorularına daha hızlı yanıt al",
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          className="flex-shrink-0"
                        >
                          <Check className="w-5 h-5 text-indigo-500 mt-0.5" />
                        </motion.div>
                        <span className="text-gray-800 text-sm font-medium">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="flex-shrink-0"
                      >
                        <Check className="w-5 h-5 text-indigo-500 mt-0.5" />
                      </motion.div>
                      <a
                        href="https://hipnodilakademi.net/danismanlik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-700 text-sm underline underline-offset-2 decoration-indigo-300 hover:text-indigo-800 transition-colors"
                      >
                        Hipnodil Akademi öğrenci danışmanlık merkezinden %10
                        indirim fırsatı
                      </a>
                    </motion.li>
                  </ul>

                  <motion.button
                    onClick={() => handlePurchase("yearly")}
                    disabled={loading}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-3 rounded-xl shadow-md shadow-purple-500/20 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm"
                  >
                    {/* Enhanced Shine Effect for Premium */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          İşleniyor...
                        </>
                      ) : (
                        <>
                          <motion.div
                            animate={{
                              rotate: [0, 15, -15, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <Crown className="w-4 h-4" />
                          </motion.div>
                          Abone Ol
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="max-w-2xl mx-auto"
              >
                <motion.div
                  className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-start gap-4 shadow-lg"
                  animate={{
                    x: [0, -10, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-red-800 font-semibold mb-1">Hata</p>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                  <button
                    onClick={() => setError("")}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logout Button */}
          <motion.div
            variants={itemVariants}
            className="max-w-md mx-auto text-center pt-4"
          >
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-lg border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              Çıkış Yap
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}
