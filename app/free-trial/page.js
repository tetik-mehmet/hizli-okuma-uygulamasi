"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Brain,
  ArrowRight,
  CheckCircle,
  Zap,
  Eye,
  Activity,
} from "lucide-react";

export default function FreeTrialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [freeTrialStarted, setFreeTrialStarted] = useState(false);
  const [freeTrialEndDate, setFreeTrialEndDate] = useState(null);
  const [freeTrialExpired, setFreeTrialExpired] = useState(false);

  useEffect(() => {
    // Giriş kontrolü
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const authToken = localStorage.getItem("authToken");

    if (!isLoggedIn || !authToken) {
      router.push("/login");
      return;
    }

    // Ücretsiz deneme bilgisini kontrol et
    const freeTrialStartedLocal =
      localStorage.getItem("freeTrialStarted") === "true";
    const freeTrialEndDateLocal = localStorage.getItem("freeTrialEndDate");

    if (freeTrialStartedLocal && freeTrialEndDateLocal) {
      const endDate = new Date(freeTrialEndDateLocal);
      const now = new Date();
      if (endDate > now) {
        setFreeTrialStarted(true);
        setFreeTrialEndDate(freeTrialEndDateLocal);
      } else {
        // Deneme süresi dolmuş
        setFreeTrialExpired(true);
      }
    }
  }, [router]);

  const handleStartFreeTrial = async () => {
    setLoading(true);
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

      console.log("Token gönderiliyor:", token ? "Token mevcut" : "Token yok");

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
      } else {
        // Token geçersizse login sayfasına yönlendir
        if (response.status === 401) {
          setError(
            "Oturum süreniz dolmuş. Giriş sayfasına yönlendiriliyorsunuz..."
          );
          // localStorage'ı temizle
          localStorage.removeItem("authToken");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userName");
          localStorage.removeItem("userSurname");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          // Deneme süresi dolmuş mu kontrol et
          if (data.expired) {
            setFreeTrialExpired(true);
          }
          setError(data.message || "Ücretsiz deneme başlatılamadı.");
        }
      }
    } catch (error) {
      console.error("Free trial start error:", error);
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const exercises = [
    {
      id: "exercise4",
      title: "Logo Hafıza Egzersizi",
      description: "Logoları görüp hatırlama becerinizi test edin",
      icon: Brain,
      link: "/genel/bolum1/hafiza/exercise4",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "exercises",
      title: "Hızlı Okuma Egzersizi",
      description:
        "Rastgele konumlarda beliren kelimeleri hızlıca okuyup algılayın",
      icon: Zap,
      link: "/genel/bolum1/exercises",
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "exercise2",
      title: "Görsel Takip Egzersizi",
      description:
        "Hareketli balığı takip ederek göz takibi ve odaklanma becerinizi geliştirin",
      icon: Eye,
      link: "/genel/bolum1/exercise2",
      color: "from-teal-500 to-cyan-600",
    },
    {
      id: "kaybolan-metin",
      title: "Kaybolan Metin Egzersizi",
      description:
        "Kelimelerin kaybolduğu metinleri okuyarak hızlı okuma becerinizi geliştirin",
      icon: Eye,
      link: "/genel/bolum1/kaybolan-metin",
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: "sagsol",
      title: "Sağ-Sol Beyin Egzersizi",
      description: "Görsel hafıza ve beyin koordinasyonunuzu güçlendirin",
      icon: Activity,
      link: "/sagsol",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Ücretsiz Deneme
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Platformumuzu 7 gün boyunca ücretsiz deneyin. Logo Hafıza, Hızlı
            Okuma, Görsel Takip, Kaybolan Metin ve Sağ-Sol Beyin egzersizlerine
            erişim sağlayın!
          </p>
        </div>

        {/* Ücretsiz Deneme Durumu */}
        {freeTrialStarted && freeTrialEndDate && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6" />
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
          </div>
        )}

        {/* Deneme Süresi Dolmuş Mesajı */}
        {freeTrialExpired && !freeTrialStarted && (
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 mb-8 text-white text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-2xl font-bold">
                Ücretsiz Deneme Süreniz Dolmuş
              </h2>
            </div>
            <p className="text-orange-50 mb-6 text-lg">
              Ücretsiz deneme süreniz tamamlandı. Tüm içeriklere erişmek için
              abonelik satın almanız gerekmektedir.
            </p>
            <Link
              href="/subscription-expired"
              className="inline-block bg-white text-orange-600 font-semibold text-lg px-8 py-3 rounded-xl hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Abonelik Paketlerini Görüntüle →
            </Link>
          </div>
        )}

        {/* Ücretsiz Deneme Başlat Butonu */}
        {!freeTrialStarted && !freeTrialExpired && (
          <div className="text-center mb-12">
            <button
              onClick={handleStartFreeTrial}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
            >
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
                  Başlatılıyor...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Ücretsiz Denemeyi Başlat
                </>
              )}
            </button>
            {error && !freeTrialExpired && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-center max-w-md mx-auto">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Egzersizler */}
        {freeTrialStarted && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {exercises.map((exercise) => {
              const IconComponent = exercise.icon;
              return (
                <Link
                  key={exercise.id}
                  href={exercise.link}
                  className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 hover:border-green-300"
                >
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${exercise.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {exercise.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {exercise.description}
                  </p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Egzersize Başla</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bilgi Notu */}
        {freeTrialStarted && (
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-blue-800">
              <strong>Not:</strong> Ücretsiz deneme süresi boyunca sadece Logo
              Hafıza, Hızlı Okuma, Görsel Takip, Kaybolan Metin ve Sağ-Sol Beyin
              egzersizlerine erişebilirsiniz. Tüm içeriklere erişmek için
              abonelik satın almanız gerekmektedir.
            </p>
            <Link
              href="/subscription-expired"
              className="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-800 hover:underline"
            >
              Abonelik Paketlerini Görüntüle →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
