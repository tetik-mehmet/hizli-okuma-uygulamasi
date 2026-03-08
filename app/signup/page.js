"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import {
  User,
  Mail,
  Lock,
  Shield,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  BadgeCheck,
  Zap,
  BookOpen,
  TrendingUp,
  Phone,
  X,
} from "lucide-react";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [profileAnimation, setProfileAnimation] = useState(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const router = useRouter();

  // Lottie animasyonunu yükle
  useEffect(() => {
    fetch("/Profile.json")
      .then((res) => res.json())
      .then((data) => setProfileAnimation(data))
      .catch((err) => console.error("Lottie animation load error:", err));
  }, []);

  // Şifre güçlülük kontrolü
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "", icon: null };

    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    };

    const passedChecks = Object.values(checks).filter(Boolean).length;
    let strength = 0;

    if (checks.length) strength++;
    if (checks.lowercase && checks.uppercase) strength++;
    if (checks.number) strength++;
    if (password.length >= 12) strength++;

    const levels = [
      {
        label: "Çok Zayıf",
        color: "bg-red-500",
        textColor: "text-red-600",
        icon: "🔴",
      },
      {
        label: "Zayıf",
        color: "bg-orange-500",
        textColor: "text-orange-600",
        icon: "🟠",
      },
      {
        label: "Orta",
        color: "bg-yellow-500",
        textColor: "text-yellow-600",
        icon: "🟡",
      },
      {
        label: "İyi",
        color: "bg-blue-500",
        textColor: "text-blue-600",
        icon: "🔵",
      },
      {
        label: "Güçlü",
        color: "bg-green-500",
        textColor: "text-green-600",
        icon: "🟢",
      },
    ];

    const level = levels[Math.min(strength, 4)];
    return {
      strength,
      ...level,
      checks,
      passedChecks,
      totalChecks: 4,
    };
  };

  const passwordStrength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Gerçek zamanlı validasyon
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!form.name.trim()) {
      errors.name = "Ad alanı zorunludur.";
      isValid = false;
    }

    if (!form.surname.trim()) {
      errors.surname = "Soyad alanı zorunludur.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errors.email = "E-posta alanı zorunludur.";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      errors.email = "Geçerli bir e-posta adresi girin.";
      isValid = false;
    }

    // Telefon numarası validasyonu (zorunlu)
    if (!form.phone.trim()) {
      errors.phone = "Telefon numarası alanı zorunludur.";
      isValid = false;
    } else {
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;
      const cleanPhone = form.phone.replace(/\s/g, "");
      if (!phoneRegex.test(form.phone)) {
        errors.phone = "Geçerli bir telefon numarası girin.";
        isValid = false;
      } else if (cleanPhone.length < 10) {
        errors.phone = "Telefon numarası en az 10 karakter olmalıdır.";
        isValid = false;
      }
    }

    if (!form.password) {
      errors.password = "Şifre alanı zorunludur.";
      isValid = false;
    } else if (form.password.length < 8) {
      errors.password = "Şifre en az 8 karakter olmalıdır.";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // API endpoint'i buraya gelecek
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          surname: form.surname,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Başarılı kayıt
        setSuccess(true);
        setForm({ name: "", surname: "", email: "", phone: "", password: "" });

        // 2 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // Hata durumu
        setError(
          data.message || "Kayıt işlemi başarısız. Lütfen tekrar deneyin."
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-slate-100 flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-inter">
      {/* Arka plan dekoratif elementler */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center relative z-10">
        {/* Sol Taraf - İçerik */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1"
        >
          {/* Lottie Animasyonu */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 max-w-full">
              {profileAnimation ? (
                <Lottie
                  animationData={profileAnimation}
                  loop={true}
                  autoplay={true}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Fayda Listesi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-3 md:space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
              Neden Hızlı Okuma?
            </h3>
            {[
              {
                icon: Zap,
                title: "Okuma Hızınızı Artırın",
                description:
                  "Gelişmiş tekniklerle okuma hızınızı 3 katına çıkarın",
                color: "from-orange-400 to-orange-600",
              },
              {
                icon: BookOpen,
                title: "Anlama Becerinizi Geliştirin",
                description:
                  "Hızlı okurken anlama oranınızı koruyun ve geliştirin",
                color: "from-[#1a2a5e] to-[#2d4a9e]",
              },
              {
                icon: TrendingUp,
                title: "Başarıya Ulaşın",
                description: "Sınavlarda ve iş hayatında avantaj kazanın",
                color: "from-orange-500 to-[#1a2a5e]",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-300"
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}
                >
                  <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1 text-sm md:text-base">
                    {benefit.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>

        {/* Sağ Taraf - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto lg:max-w-none order-1 lg:order-2"
        >
          <div className="bg-gradient-to-br from-white/95 via-slate-50/95 to-orange-50/95 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-orange-200/40 space-y-6">
            {/* Başlık Bölümü */}
            <div className="text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center mb-2"
              >
                <img
                  src="/gercek_logo.png"
                  alt="Logo"
                  className="w-60 h-60 sm:w-72 sm:h-72 object-contain"
                />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#1a2a5e] to-[#f26522] bg-clip-text text-transparent">
                Hesap Oluştur
              </h2>
              <p className="text-gray-600 text-sm">
                Hızlı okuma yolculuğunuza başlayın
              </p>
            </div>

            {/* Güvenlik Rozetleri */}
            <div className="flex items-center justify-center gap-4 py-3 bg-gradient-to-r from-orange-50/80 to-slate-50/80 rounded-xl border border-orange-200/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[#1a2a5e]">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium">SSL Güvenli</span>
              </div>
              <div className="w-px h-4 bg-orange-200"></div>
              <div className="flex items-center gap-2 text-[#1a2a5e]">
                <BadgeCheck className="w-4 h-4" />
                <span className="text-xs font-medium">
                  Verileriniz Korunuyor
                </span>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Ad Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#f26522]" />
                  Ad
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Adınızı girin"
                    className={`w-full px-4 py-3.5 pl-12 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base text-black placeholder:text-gray-500 placeholder:opacity-70 ${
                      fieldErrors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-orange-200 focus:border-[#1a2a5e] focus:ring-4 focus:ring-[#1a2a5e]/10"
                    }`}
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {fieldErrors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.name}
                  </motion.p>
                )}
              </div>

              {/* Soyad Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#f26522]" />
                  Soyad
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="surname"
                    placeholder="Soyadınızı girin"
                    className={`w-full px-4 py-3.5 pl-12 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base text-black placeholder:text-gray-500 placeholder:opacity-70 ${
                      fieldErrors.surname
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-orange-200 focus:border-[#1a2a5e] focus:ring-4 focus:ring-[#1a2a5e]/10"
                    }`}
                    value={form.surname}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {fieldErrors.surname && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.surname}
                  </motion.p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#f26522]" />
                  E-posta
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="ornek@email.com"
                    className={`w-full px-4 py-3.5 pl-12 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base text-black placeholder:text-gray-500 placeholder:opacity-70 ${
                      fieldErrors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-orange-200 focus:border-[#1a2a5e] focus:ring-4 focus:ring-[#1a2a5e]/10"
                    }`}
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {fieldErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.email}
                  </motion.p>
                )}
              </div>

              {/* Telefon Numarası Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#f26522]" />
                  Telefon Numarası
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+90 555 123 4567 veya 0555 123 4567"
                    className={`w-full px-4 py-3.5 pl-12 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base text-black placeholder:text-gray-500 placeholder:opacity-70 ${
                      fieldErrors.phone
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-orange-200 focus:border-[#1a2a5e] focus:ring-4 focus:ring-[#1a2a5e]/10"
                    }`}
                    value={form.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {fieldErrors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.phone}
                  </motion.p>
                )}
              </div>

              {/* Şifre Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <motion.div
                    animate={{
                      scale: form.password ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Lock className="w-4 h-4 text-[#f26522]" />
                  </motion.div>
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="En az 8 karakter - Güçlü şifre oluşturun"
                    className={`w-full px-4 py-3.5 pl-12 pr-12 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base text-black placeholder:text-gray-500 placeholder:opacity-70 ${
                      fieldErrors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : form.password && passwordStrength.strength >= 3
                        ? "border-[#f26522] focus:border-[#f26522] focus:ring-orange-100"
                        : "border-orange-200 focus:border-[#1a2a5e] focus:ring-4 focus:ring-[#1a2a5e]/10"
                    }`}
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <motion.div
                    animate={{
                      color:
                        form.password && passwordStrength.strength >= 3
                          ? "#f26522"
                          : form.password
                          ? "#1a2a5e"
                          : "#9ca3af",
                      scale: form.password ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  >
                    <Lock className="w-5 h-5" />
                  </motion.div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Şifre Güçlülük Göstergesi */}
                {form.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    {/* Güç Bar */}
                    <div className="space-y-2">
                      <div className="flex gap-1.5 h-3">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <motion.div
                            key={level}
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                level <= passwordStrength.strength
                                  ? "100%"
                                  : "0%",
                            }}
                            transition={{ duration: 0.4, delay: level * 0.1 }}
                            className={`flex-1 rounded-full ${
                              level <= passwordStrength.strength
                                ? passwordStrength.color
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700">
                          Şifre Gücü
                        </p>
                        <motion.span
                          key={passwordStrength.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`text-sm font-bold ${passwordStrength.textColor}`}
                        >
                          {passwordStrength.label}
                        </motion.span>
                      </div>
                    </div>

                    {/* Şifre Gereksinimleri */}
                    <div className="space-y-2 pt-2 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">
                        Şifre Gereksinimleri:
                      </p>
                      <div className="grid grid-cols-1 gap-1.5">
                        {[
                          {
                            label: "En az 8 karakter",
                            check: passwordStrength.checks.length,
                          },
                          {
                            label: "Büyük ve küçük harf",
                            check:
                              passwordStrength.checks.uppercase &&
                              passwordStrength.checks.lowercase,
                          },
                          {
                            label: "En az bir rakam",
                            check: passwordStrength.checks.number,
                          },
                        ].map((req, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-xs"
                          >
                            {req.check ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              </motion.div>
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span
                              className={
                                req.check
                                  ? "text-green-700 font-medium line-through"
                                  : "text-gray-600"
                              }
                            >
                              {req.label}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Güçlü Şifre Feedback */}
                    {passwordStrength.strength >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-2 mt-2"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        >
                          <Shield className="w-4 h-4 text-green-600" />
                        </motion.div>
                        <p className="text-xs font-semibold text-green-700">
                          Mükemmel! Şifreniz güçlü ve güvenli.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {fieldErrors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.password}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#1a2a5e] to-[#f26522] hover:from-[#152050] hover:to-[#d4561a] text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
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
                    Kayıt Yapılıyor...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Ücretsiz Başla
                  </>
                )}
              </motion.button>

              {/* Hata Mesajı */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Başarı Mesajı */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-700 text-sm font-semibold">
                      Kayıt başarılı!
                    </p>
                    <p className="text-green-600 text-xs mt-1">
                      Giriş sayfasına yönlendiriliyorsunuz...
                    </p>
                  </div>
                </motion.div>
              )}
            </form>

            {/* Giriş Linki */}
            <div className="pt-4 border-t border-orange-100">
              <p className="text-sm text-center text-gray-600">
                Zaten hesabınız var mı?{" "}
                <a
                  href="/login"
                  className="text-[#f26522] font-semibold hover:text-[#d4561a] hover:underline transition-colors"
                >
                  Giriş Yap
                </a>
              </p>
            </div>

            {/* Gizlilik Notu */}
            <p className="text-xs text-center text-gray-500 pt-2">
              Kayıt olarak{" "}
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-[#f26522] hover:underline font-medium"
              >
                Gizlilik Politikası
              </button>
              &apos;nı kabul etmiş olursunuz.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Gizlilik Politikası Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[9999] sm:max-w-4xl sm:w-full max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-orange-50 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#1a2a5e] to-[#f26522]">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Gizlilik Politikası
                  </h2>
                </div>
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Kapat"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <div className="max-w-3xl mx-auto space-y-6 text-gray-700">
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#f26522] font-semibold text-sm">1</span>
                      Genel Bilgiler
                    </h3>
                    <p className="text-base leading-relaxed pl-10">
                      Odak Anatolia Akademi olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemiz ve mobil platformlarımız aracılığıyla toplanan bilgilerin nasıl toplandığını, kullanıldığını, korunduğunu ve paylaşıldığını açıklar.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#f26522] font-semibold text-sm">2</span>
                      Toplanan Bilgiler
                    </h3>
                    <p className="text-base leading-relaxed pl-10 mb-3">Platformumuzda aşağıdaki bilgileri toplayabiliriz:</p>
                    <ul className="list-disc list-inside space-y-2 pl-10 text-base leading-relaxed">
                      <li>Ad, soyad, e-posta adresi, telefon numarası</li>
                      <li>Kullanıcı adı, parola</li>
                      <li>IP adresi, tarayıcı bilgisi, cihaz türü</li>
                      <li>Eğitim geçmişi ve platform üzerindeki etkileşim bilgileri</li>
                      <li>Geri bildirimler, yorumlar veya destek talepleri</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#f26522] font-semibold text-sm">3</span>
                      Bilgilerin Kullanım Amaçları
                    </h3>
                    <p className="text-base leading-relaxed pl-10 mb-3">Toplanan bilgiler şu amaçlarla kullanılabilir:</p>
                    <ul className="list-disc list-inside space-y-2 pl-10 text-base leading-relaxed">
                      <li>Üyelik ve kimlik doğrulama süreçlerinin yürütülmesi</li>
                      <li>Eğitim içeriklerine erişim ve kullanıcı deneyiminin geliştirilmesi</li>
                      <li>Sistem güvenliği ve performans optimizasyonu</li>
                      <li>Kullanıcılara bilgilendirme, duyuru ve kampanya iletimi</li>
                      <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#f26522] font-semibold text-sm">4</span>
                      Verilerin Saklanması ve Güvenliği
                    </h3>
                    <p className="text-base leading-relaxed pl-10">
                      Verileriniz güvenli sunucularda, şifrelenmiş bağlantılar (SSL) aracılığıyla korunur. Kredi kartı veya ödeme bilgileri, yalnızca ödeme sağlayıcısı tarafından işlenir ve sistemimizde saklanmaz. Veriler, yasal süre boyunca saklanır ve süresi dolduğunda güvenli şekilde silinir.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#f26522] font-semibold text-sm">5</span>
                      Bilgilerin Paylaşımı
                    </h3>
                    <p className="text-base leading-relaxed pl-10 mb-3">Kişisel verileriniz, yalnızca aşağıdaki durumlarda paylaşılabilir:</p>
                    <ul className="list-disc list-inside space-y-2 pl-10 text-base leading-relaxed">
                      <li>Yasal yükümlülük gereği resmi kurumlarla,</li>
                      <li>Hizmet aldığımız iş ortakları (barındırma, e-posta, güvenlik sağlayıcıları) ile,</li>
                      <li>Açık rızanızla belirttiğiniz üçüncü taraflarla.</li>
                    </ul>
                    <p className="text-base leading-relaxed pl-10 mt-3 font-semibold text-gray-900">
                      Hiçbir durumda kişisel verileriniz üçüncü kişilere satılmaz.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#f26522] font-semibold text-sm">6</span>
                      Çocukların Gizliliği
                    </h3>
                    <p className="text-base leading-relaxed pl-10">
                      Odak Anatolia Akademi, 18 yaşından küçük kişilerden bilerek veri toplamaz. Yanlışlıkla alınan bilgiler tespit edildiğinde derhal silinir.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#f26522] font-semibold text-sm">7</span>
                      Haklarınız
                    </h3>
                    <p className="text-base leading-relaxed pl-10 mb-3">
                      KVKK madde 11 kapsamında, kişisel verilerinizle ilgili: Bilgi talep etme, düzeltme veya silinmesini isteme, işlenmesine itiraz etme haklarına sahipsiniz.
                    </p>
                    <p className="text-base leading-relaxed pl-10">
                      Taleplerinizi{" "}
                      <a href="mailto:info@odakanatolia.com" className="text-[#f26522] hover:underline font-semibold">
                        info@odakanatolia.com
                      </a>{" "}
                      adresine gönderebilirsiniz.
                    </p>
                  </section>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                <motion.button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="px-6 py-3 bg-gradient-to-r from-[#1a2a5e] to-[#f26522] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Kapat
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
