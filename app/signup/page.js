"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  Sparkles,
  BadgeCheck,
  Zap,
  BookOpen,
  TrendingUp,
  Star,
  Users,
  Phone,
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

    // Telefon numarası validasyonu (opsiyonel ama girilmişse format kontrolü)
    if (form.phone.trim()) {
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-inter">
      {/* Arka plan dekoratif elementler */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
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
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: BookOpen,
                title: "Anlama Becerinizi Geliştirin",
                description:
                  "Hızlı okurken anlama oranınızı koruyun ve geliştirin",
                color: "from-blue-400 to-indigo-500",
              },
              {
                icon: TrendingUp,
                title: "Başarıya Ulaşın",
                description: "Sınavlarda ve iş hayatında avantaj kazanın",
                color: "from-green-400 to-emerald-500",
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

          {/* Sosyal Kanıt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/30 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1 md:-space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white flex items-center justify-center text-white font-bold text-xs md:text-sm"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="ml-1 md:ml-2">
                  <div className="flex items-center gap-0.5 md:gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    <span className="font-bold text-gray-800">4.9/5</span> puan
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0 text-xs md:text-sm">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-0.5 md:mb-1">
                    <span className="font-semibold text-xs md:text-sm text-gray-800">
                      Ayşe K.
                    </span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-2.5 h-2.5 md:w-3 md:h-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    &quot;Okuma hızım 2 haftada 3 katına çıktı! Kesinlikle
                    tavsiye ederim.&quot;
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <p className="text-xs md:text-sm text-gray-700">
                  <span className="font-bold text-gray-900">10,000+</span> aktif
                  kullanıcı
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Sağ Taraf - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto lg:max-w-none order-1 lg:order-2"
        >
          <div className="bg-gradient-to-br from-pink-50/95 via-rose-50/95 to-pink-100/95 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-pink-200/30 space-y-6">
            {/* Başlık Bölümü */}
            <div className="text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-2"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Hesap Oluştur
              </h2>
              <p className="text-gray-600 text-sm">
                Hızlı okuma yolculuğunuza başlayın
              </p>
            </div>

            {/* Güvenlik Rozetleri */}
            <div className="flex items-center justify-center gap-4 py-3 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-xl border border-green-200/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-green-700">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium">SSL Güvenli</span>
              </div>
              <div className="w-px h-4 bg-green-200"></div>
              <div className="flex items-center gap-2 text-green-700">
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
                  <User className="w-4 h-4 text-blue-600" />
                  Ad
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Adınızı girin"
                    className={`w-full px-4 py-3.5 pl-12 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base ${
                      fieldErrors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-pink-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                  <User className="w-4 h-4 text-blue-600" />
                  Soyad
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="surname"
                    placeholder="Soyadınızı girin"
                    className={`w-full px-4 py-3.5 pl-12 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base ${
                      fieldErrors.surname
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-pink-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                  <Mail className="w-4 h-4 text-blue-600" />
                  E-posta
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="ornek@email.com"
                    className={`w-full px-4 py-3.5 pl-12 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base ${
                      fieldErrors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-pink-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                  <Phone className="w-4 h-4 text-blue-600" />
                  Telefon Numarası
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+90 555 123 4567 veya 0555 123 4567"
                    className={`w-full px-4 py-3.5 pl-12 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base ${
                      fieldErrors.phone
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-pink-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                    <Lock className="w-4 h-4 text-blue-600" />
                  </motion.div>
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="En az 8 karakter - Güçlü şifre oluşturun"
                    className={`w-full px-4 py-3.5 pl-12 pr-12 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base ${
                      fieldErrors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : form.password && passwordStrength.strength >= 3
                        ? "border-green-300 focus:border-green-500 focus:ring-green-100"
                        : "border-pink-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <motion.div
                    animate={{
                      color:
                        form.password && passwordStrength.strength >= 3
                          ? "#10b981"
                          : form.password
                          ? "#f59e0b"
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
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-center text-gray-600">
                Zaten hesabınız var mı?{" "}
                <a
                  href="/login"
                  className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
                >
                  Giriş Yap
                </a>
              </p>
            </div>

            {/* Gizlilik Notu */}
            <p className="text-xs text-center text-gray-500 pt-2">
              Kayıt olarak{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Kullanım Koşulları
              </a>{" "}
              ve{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Gizlilik Politikası
              </a>
              &apos;nı kabul etmiş olursunuz.
            </p>
          </div>
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
