"use client";
import Link from "next/link";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | invalid
  const [message, setMessage] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    setMounted(true);
    if (!token) {
      setStatus("invalid");
      setMessage("Geçersiz bağlantı. Lütfen tekrar şifre sıfırlama talebinde bulunun.");
    }
  }, [token]);

  const particlePositions = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, [mounted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Şifreler eşleşmiyor. Lütfen tekrar kontrol edin.");
      return;
    }

    if (password.length < 6) {
      setStatus("error");
      setMessage("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setStatus("error");
        setMessage(data.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch {
      setStatus("error");
      setMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-inter">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ x: [0, 50, 0], y: [0, -100, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              animate={{ y: [0, -100, 0], opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: pos.duration, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* Back Button */}
      <Link
        href="/login"
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
          Giriş Yap
        </span>
      </Link>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>

          <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
            <div className="absolute inset-[1px] bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
            />

            <div className="relative p-8 md:p-10">
              {/* Header */}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 blur-xl"></div>
                  <Lock className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Yeni Şifre
                </h1>
                <p className="text-white/70 text-sm">
                  Hesabınız için güçlü bir şifre belirleyin
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {/* Geçersiz token durumu */}
                {status === "invalid" && (
                  <motion.div
                    key="invalid"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 text-center">
                      <div className="flex justify-center mb-3">
                        <ShieldAlert className="w-12 h-12 text-red-400" />
                      </div>
                      <p className="text-red-200 font-semibold text-base mb-1">
                        Geçersiz Bağlantı
                      </p>
                      <p className="text-red-300/80 text-sm leading-relaxed">
                        {message}
                      </p>
                    </div>
                    <Link href="/forgot-password">
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-lg text-center cursor-pointer"
                      >
                        Tekrar Talep Gönder
                      </motion.div>
                    </Link>
                  </motion.div>
                )}

                {/* Başarı durumu */}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="flex justify-center mb-3"
                      >
                        <CheckCircle className="w-12 h-12 text-green-400" />
                      </motion.div>
                      <p className="text-green-200 font-semibold text-base mb-1">
                        Şifre Güncellendi!
                      </p>
                      <p className="text-green-300/80 text-sm leading-relaxed">
                        {message}
                      </p>
                    </div>
                    <p className="text-center text-white/50 text-xs">
                      3 saniye içinde giriş sayfasına yönlendirileceksiniz...
                    </p>
                    <Link href="/login">
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-lg text-center cursor-pointer"
                      >
                        Giriş Yap
                      </motion.div>
                    </Link>
                  </motion.div>
                )}

                {/* Form */}
                {(status === "idle" || status === "loading" || status === "error") && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                    onSubmit={handleSubmit}
                  >
                    {/* Yeni Şifre */}
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
                        <Lock className="w-4 h-4" />
                        Yeni Şifre
                      </motion.label>
                      <motion.div
                        className="relative group"
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <AnimatePresence>
                          {focusedInput === "password" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/50 to-amber-500/50 rounded-xl blur-md"
                            />
                          )}
                        </AnimatePresence>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="En az 6 karakter"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocusedInput("password")}
                          onBlur={() => setFocusedInput(null)}
                          required
                          className="relative w-full px-4 py-3.5 pl-12 pr-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 text-white placeholder:text-white/40 shadow-lg"
                        />
                        <motion.div
                          animate={{
                            color: focusedInput === "password" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
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
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    {/* Şifre Tekrar */}
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
                        Şifre Tekrar
                      </motion.label>
                      <motion.div
                        className="relative group"
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <AnimatePresence>
                          {focusedInput === "confirm" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/50 to-orange-500/50 rounded-xl blur-md"
                            />
                          )}
                        </AnimatePresence>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Şifrenizi tekrar girin"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onFocus={() => setFocusedInput("confirm")}
                          onBlur={() => setFocusedInput(null)}
                          required
                          className="relative w-full px-4 py-3.5 pl-12 pr-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 text-white placeholder:text-white/40 shadow-lg"
                        />
                        <motion.div
                          animate={{
                            color: focusedInput === "confirm" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                            scale: focusedInput === "confirm" ? 1.1 : 1,
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2"
                        >
                          <Lock className="w-5 h-5 transition-colors" />
                        </motion.div>
                        <motion.button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm flex items-center gap-2 shadow-lg"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {message}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-amber-400/0 to-orange-400/0 group-hover:from-yellow-400/30 group-hover:via-amber-400/30 group-hover:to-orange-400/30 transition-all duration-300 rounded-xl blur-xl"></div>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === "loading" ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Güncelleniyor...
                          </>
                        ) : (
                          <>
                            Şifremi Güncelle
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center pt-2"
                    >
                      <Link
                        href="/login"
                        className="text-white/60 hover:text-white/90 text-sm transition-colors duration-200 underline underline-offset-4"
                      >
                        Giriş sayfasına geri dön
                      </Link>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white/70 rounded-full animate-spin"></div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
