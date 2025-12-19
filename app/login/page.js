"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Eğer kullanıcı zaten giriş yapmışsa genel sayfasına yönlendir
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

        // Basit localStorage kaydetme
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("isLoggedIn", "true");

        if (data.user) {
          localStorage.setItem("userName", data.user.name || "");
          localStorage.setItem("userSurname", data.user.surname || "");
          // Abonelik bilgilerini kaydet
          localStorage.setItem("isSubscribed", data.user.isSubscribed ? "true" : "false");
          localStorage.setItem("subscriptionType", data.user.subscriptionType || "");
          localStorage.setItem("subscriptionEndDate", data.user.subscriptionEndDate || "");
          localStorage.setItem("subscriptionStatus", data.user.subscriptionStatus || "none");
          // Ücretsiz deneme bilgilerini kaydet
          localStorage.setItem("freeTrialStarted", data.user.freeTrialStarted ? "true" : "false");
          localStorage.setItem("freeTrialEndDate", data.user.freeTrialEndDate || "");
        }

        console.log("🚀 Genel sayfasına yönlendiriliyor...");

        // replace kullanarak geri tuşuyla login sayfasına dönülemeyecek şekilde yönlendir
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 flex flex-col items-center justify-center p-6 text-gray-800 font-sans relative overflow-hidden">
      {/* Arka plan resmi */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login_arka_plan.avif"
          alt="Giriş sayfası arka planı"
          fill
          priority
          className="object-cover"
        />
        {/* Yarı saydam overlay - okunabilirlik için */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Ana içerik */}
      <div className="relative z-10 w-full max-w-md">
        {/* Ana Sayfaya Dön Butonu */}
        <Link
          href="/"
          className="mb-6 flex items-center gap-2 text-white hover:text-amber-200 transition-colors duration-200 drop-shadow-lg group self-start"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-200">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm sm:text-base">Ana Sayfaya Dön</span>
        </Link>

        {/* Login form kartı */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
          {/* Cam efekti için ek katman */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl"></div>

          {/* İçerik */}
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-2 drop-shadow-lg">
                Giriş Yap
              </h2>
              <p className="text-amber-800 text-sm drop-shadow-md">
                Size verilen şifre ve mail adresinizle giriş yapabilirsiniz.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-amber-900 drop-shadow-sm">
                  E-posta
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    className="w-full px-4 py-3 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent bg-white/20 backdrop-blur-sm transition-all duration-300 text-base placeholder:text-amber-600 text-amber-900 shadow-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ fontFamily: "var(--font-family)" }}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs text-amber-700">📧</span>
                  </div>
                </div>
              </div>

              {/* Password input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-amber-900 drop-shadow-sm">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrenizi girin"
                    className="w-full px-4 py-3 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent bg-white/20 backdrop-blur-sm transition-all duration-300 text-base placeholder:text-amber-600 text-amber-900 shadow-lg pr-20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ fontFamily: "var(--font-family)" }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-700 hover:text-amber-800 transition-colors duration-200 text-sm font-medium drop-shadow-sm"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? "Gizle" : "Göster"}
                  </button>
                </div>
              </div>

              {/* Hesabınız yoksa üye ol */}
              <div className="text-center">
                <p className="text-amber-800 text-sm mb-1">
                  Hesabınız yoksa{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-amber-900 hover:text-amber-950 hover:underline transition-colors duration-200"
                  >
                    üye ol
                  </Link>
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-amber-900 font-semibold py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:opacity-75 border border-white/30"
                disabled={loading}
                style={{ fontFamily: "var(--font-family)" }}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-amber-900 inline"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-95"
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
                ) : null}
                {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </button>

              {/* Error message */}
              {error && (
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-amber-900 px-4 py-3 rounded-xl text-sm text-center drop-shadow-lg">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
