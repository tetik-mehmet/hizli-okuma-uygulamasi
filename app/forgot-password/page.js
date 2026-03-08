"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Mail, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
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
      {/* Animated Gradient Background Blobs */}
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
          {/* Outer Glow Layer */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>

          {/* Main Glass Card */}
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
            <div className="absolute inset-[1px] bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

            {/* Shine Effect */}
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
                  <Mail className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Şifremi Unuttum
                </h1>
                <p className="text-white/70 text-sm">
                  E-posta adresinizi girin, sıfırlama bağlantısı gönderelim
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
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
                        E-posta Gönderildi!
                      </p>
                      <p className="text-green-300/80 text-sm leading-relaxed">
                        {message}
                      </p>
                    </div>
                    <p className="text-center text-white/50 text-xs">
                      Gelen kutunuzu ve spam klasörünüzü kontrol edin.
                    </p>
                    <Link href="/login">
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-lg text-center cursor-pointer"
                      >
                        Giriş Sayfasına Dön
                      </motion.div>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    {/* Email Input */}
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
                        E-posta Adresi
                      </motion.label>
                      <motion.div
                        className="relative group"
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
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
                          required
                          className="relative w-full px-4 py-3.5 pl-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 text-white placeholder:text-white/40 shadow-lg"
                        />
                        <motion.div
                          animate={{
                            color: focusedInput === "email" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                            scale: focusedInput === "email" ? 1.1 : 1,
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2"
                        >
                          <Mail className="w-5 h-5 transition-colors" />
                        </motion.div>
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
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            Sıfırlama Bağlantısı Gönder
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>

                    {/* Back to Login */}
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
