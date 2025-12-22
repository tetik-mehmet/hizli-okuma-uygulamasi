"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  LogIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [studentAnimation, setStudentAnimation] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Client-side only render için mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Floating particles için random pozisyonları sadece client-side'da oluştur
  const particlePositions = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, [mounted]);

  // Lottie animasyonunu yükle
  useEffect(() => {
    fetch("/student.json")
      .then((res) => res.json())
      .then((data) => setStudentAnimation(data))
      .catch((err) => console.error("Lottie animation load error:", err));
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const authToken = localStorage.getItem("authToken");

    if (isLoggedIn === "true" && authToken) {
      router.replace("/genel");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("🚀 Login isteği gönderiliyor...");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("🔍 Login response:", data);

      if (response.ok) {
        console.log("✅ Login başarılı, localStorage'a kaydediliyor...");

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("isLoggedIn", "true");

        if (data.user) {
          localStorage.setItem("userName", data.user.name || "");
          localStorage.setItem("userSurname", data.user.surname || "");
          localStorage.setItem(
            "isSubscribed",
            data.user.isSubscribed ? "true" : "false"
          );
          localStorage.setItem(
            "subscriptionType",
            data.user.subscriptionType || ""
          );
          localStorage.setItem(
            "subscriptionEndDate",
            data.user.subscriptionEndDate || ""
          );
          localStorage.setItem(
            "subscriptionStatus",
            data.user.subscriptionStatus || "none"
          );
          localStorage.setItem(
            "freeTrialStarted",
            data.user.freeTrialStarted ? "true" : "false"
          );
          localStorage.setItem(
            "freeTrialEndDate",
            data.user.freeTrialEndDate || ""
          );
        }

        console.log("🚀 Genel sayfasına yönlendiriliyor...");
        router.replace("/genel");
      } else {
        console.log("❌ Login failed:", data.message);
        setError(
          data.message || "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin."
        );
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-inter">
      {/* Animated Gradient Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 50, 0],
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

      {/* Floating Particles - Client-side only to prevent hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: pos.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
      >
        <motion.div
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 backdrop-blur-md rounded-full p-2.5 border border-white/20 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.div>
        <span className="font-semibold text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Ana Sayfa
        </span>
      </Link>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
      >
        {/* Form Container */}
        <div className="relative">
          {/* Multi-layer Glassmorphic Card */}
          <div className="relative">
            {/* Outer Glow Layer */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>

            {/* Main Glass Card - Layer 1 */}
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
              {/* Inner Glass Layer - Layer 2 */}
              <div className="absolute inset-[1px] bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

              {/* Shine Effect Layer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "linear",
                }}
              />

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Header with Icon */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500/30 to-amber-500/30 rounded-2xl mb-4 backdrop-blur-sm border border-white/20 shadow-xl relative overflow-hidden"
                  >
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 blur-xl"></div>
                    <LogIn className="w-10 h-10 text-white relative z-10" />
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Hoş Geldiniz
                  </h1>
                  <p className="text-white/70 text-sm">
                    Hesabınıza giriş yapın ve yolculuğunuza devam edin
                  </p>
                </motion.div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Email Input - Floating Style */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <motion.label
                      className="text-sm font-medium text-white/90 flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Mail className="w-4 h-4" />
                      E-posta
                    </motion.label>
                    <motion.div
                      className="relative group"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Input Glow on Focus */}
                      <AnimatePresence>
                        {focusedInput === "email" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/50 to-amber-500/50 rounded-xl blur-md"
                          />
                        )}
                      </AnimatePresence>

                      <input
                        type="email"
                        placeholder="ornek@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        className="relative w-full px-4 py-3.5 pl-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 text-white placeholder:text-white/40 shadow-lg"
                      />
                      <motion.div
                        animate={{
                          color:
                            focusedInput === "email"
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(255,255,255,0.4)",
                          scale: focusedInput === "email" ? 1.1 : 1,
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                      >
                        <Mail className="w-5 h-5 transition-colors" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Password Input - Floating Style */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <motion.label
                      className="text-sm font-medium text-white/90 flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Lock className="w-4 h-4" />
                      Şifre
                    </motion.label>
                    <motion.div
                      className="relative group"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Input Glow on Focus */}
                      <AnimatePresence>
                        {focusedInput === "password" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/50 to-orange-500/50 rounded-xl blur-md"
                          />
                        )}
                      </AnimatePresence>

                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifrenizi girin"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        className="relative w-full px-4 py-3.5 pl-12 pr-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 text-white placeholder:text-white/40 shadow-lg"
                      />
                      <motion.div
                        animate={{
                          color:
                            focusedInput === "password"
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(255,255,255,0.4)",
                          scale: focusedInput === "password" ? 1.1 : 1,
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                      >
                        <Lock className="w-5 h-5 transition-colors" />
                      </motion.div>
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    {/* Button Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "linear",
                      }}
                    />
                    {/* Button Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-amber-400/0 to-orange-400/0 group-hover:from-yellow-400/30 group-hover:via-amber-400/30 group-hover:to-orange-400/30 transition-all duration-300 rounded-xl blur-xl"></div>

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          Giriş Yapılıyor...
                        </>
                      ) : (
                        <>
                          Giriş Yap
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm text-center shadow-lg"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Signup Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative pt-4"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <span className="text-xs text-white/60 font-medium">
                        veya
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>

                    <Link href="/signup" className="group block">
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-white/10 p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "linear",
                          }}
                        />

                        <div className="relative z-10 flex items-center justify-center gap-3">
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
                            <Sparkles className="w-4 h-4 text-white" />
                          </motion.div>
                          <span className="text-white font-bold text-sm sm:text-base">
                            Hesabınız yok mu?{" "}
                            <span className="text-yellow-200">Üye Ol</span>
                          </span>
                          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                        </div>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-amber-400/0 to-orange-400/0 group-hover:from-yellow-400/20 group-hover:via-amber-400/20 group-hover:to-orange-400/20 transition-all duration-300 rounded-xl blur-sm"></div>
                      </motion.div>

                      <p className="text-center mt-2 text-xs text-white/50">
                        Ücretsiz kayıt ol ve hızlı okuma yolculuğuna başla
                      </p>
                    </Link>
                  </motion.div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Student Animation - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="hidden lg:flex items-center justify-center"
        >
          {studentAnimation ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.7,
                type: "spring",
                stiffness: 150,
              }}
              className="w-96 h-96 md:w-[500px] md:h-[500px] relative"
            >
              <Lottie
                animationData={studentAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
              className="w-96 h-96 md:w-[500px] md:h-[500px] flex items-center justify-center"
            >
              <div className="w-24 h-24 border-4 border-white/30 border-t-white/70 rounded-full animate-spin"></div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}
