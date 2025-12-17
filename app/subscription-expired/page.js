"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Check, Crown, AlertCircle, Sparkles } from "lucide-react";

export default function SubscriptionExpiredPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [freeTrialLoading, setFreeTrialLoading] = useState(false);
  const [error, setError] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("none");
  const [freeTrialStarted, setFreeTrialStarted] = useState(false);
  const [freeTrialEndDate, setFreeTrialEndDate] = useState(null);
  const [userName, setUserName] = useState("");

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
    setSubscriptionStatus(status || "none");

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
    localStorage.removeItem("subscriptionEndDate");
    localStorage.removeItem("subscriptionStatus");
    localStorage.removeItem("freeTrialStarted");
    localStorage.removeItem("freeTrialEndDate");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Kullanıcı Bilgisi */}
        {userName && (
          <div className="max-w-2xl mx-auto mb-6 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Hoş geldiniz</p>
              <p className="text-xl font-bold text-gray-900">{userName}</p>
            </div>
          </div>
        )}

        {/* Uyarı Mesajı */}
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Aboneliğiniz Aktif Değil
          </h1>
          <p className="text-lg text-gray-600">
            İçeriklere erişmek için abonelik satın almanız gerekmektedir. Size
            en uygun planı seçin ve hızlı okuma yolculuğunuza devam edin.
          </p>
        </div>

        {/* Ücretsiz Deneme Seçeneği */}
        {!freeTrialStarted && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 sm:p-8 shadow-lg text-white">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                    <Sparkles className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">Ücretsiz Deneme</h2>
                  </div>
                  <p className="text-green-50 text-sm sm:text-base">
                    7 gün boyunca Exercise4 ve Exercise5 egzersizlerine ücretsiz
                    erişim sağlayın. Platformumuzu deneyin, beğenirseniz
                    abonelik satın alabilirsiniz.
                  </p>
                </div>
                <button
                  onClick={handleStartFreeTrial}
                  disabled={freeTrialLoading || loading}
                  className="bg-white text-green-600 font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
                >
                  {freeTrialLoading ? (
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
                      Başlatılıyor...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Ücretsiz Denemeyi Başlat
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ücretsiz Deneme Aktif Uyarısı */}
        {freeTrialStarted && freeTrialEndDate && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Ücretsiz Deneme Aktif!</h2>
              </div>
              <p className="text-green-50">
                Bitiş Tarihi:{" "}
                {new Date(freeTrialEndDate).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <Link
                href="/free-trial"
                className="inline-block mt-4 bg-white text-green-600 font-semibold px-6 py-2 rounded-xl hover:bg-green-50 transition-colors"
              >
                Ücretsiz Deneme Sayfasına Git
              </Link>
            </div>
          </div>
        )}

        {/* Fiyatlandırma Paketleri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto mb-8">
          {/* Aylık Paket */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Aylık Paket
              </h3>
              <div className="mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-orange-600">
                  1299₺
                </span>
                <span className="text-gray-600 text-lg ml-2">/ay</span>
              </div>
              <p className="text-gray-600 text-sm">
                Aylık abonelik ile tüm içeriklere erişim
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Tüm hızlı okuma egzersizleri",
                "Konsantrasyon geliştirme teknikleri",
                "Anlama oranı artırma alıştırmaları",
                "7/24 platform erişimi",
                "İlerleme takibi",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePurchase("monthly")}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "İşleniyor..." : "Abone Ol"}
            </button>
          </div>

          {/* Yıllık Paket - Öne Çıkan */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 sm:p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-orange-400 relative transform scale-105 sm:scale-100">
            {/* Popüler Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-yellow-400 text-orange-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Popüler
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Yıllık Paket
              </h3>
              <div className="mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-white">
                  13999₺
                </span>
                <span className="text-orange-100 text-lg ml-2">/yıl</span>
              </div>
              <p className="text-orange-100 text-sm">
                Yıllık abonelik ile avantajlı fiyat
              </p>
              <div className="mt-2 inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-xs font-semibold">
                  Aylık 1166₺&apos;ye denk gelir
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Tüm hızlı okuma egzersizleri",
                "Konsantrasyon geliştirme teknikleri",
                "Anlama oranı artırma alıştırmaları",
                "7/24 platform erişimi",
                "İlerleme takibi",
                "Öncelikli destek",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                <a
                  href="https://hipnodilakademi.net/danismanlik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm sm:text-base underline underline-offset-2 decoration-yellow-300 hover:text-yellow-200 transition-colors"
                >
                  Hipnodil Akademi öğrenci danışmanlık merkezinden %10 indirim
                  fırsatı
                </a>
              </li>
            </ul>

            <button
              onClick={() => handlePurchase("yearly")}
              disabled={loading}
              className="w-full bg-white text-orange-600 font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "İşleniyor..." : "Abone Ol"}
            </button>
          </div>
        </div>

        {/* Hata Mesajı */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-center">
              {error}
            </div>
          </div>
        )}

        {/* Çıkış Butonu */}
        <div className="max-w-md mx-auto text-center">
          <button
            onClick={handleLogout}
            className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}
