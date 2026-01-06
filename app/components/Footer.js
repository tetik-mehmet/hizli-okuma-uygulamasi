"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield } from "lucide-react";

export default function Footer({ fixed = false }) {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <footer
      className={`w-full text-gray-800 font-inter ${
        fixed ? "fixed bottom-0 left-0 z-40" : "relative"
      }`}
    >
      {/* Arka plan ve üst border */}
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-orange-50 border-t border-blue-200/60 shadow-[0_-8px_30px_rgba(15,23,42,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* Üst grid: 3-4 kolon */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10">
            {/* Marka & kısa açıklama */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wide uppercase text-blue-600 bg-blue-50/80 border border-blue-100 rounded-full px-3 py-1">
                  Hızlı Okuma Platformu
                </span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-orange-500 to-blue-700 bg-clip-text text-transparent">
                  Hızlı Okuma Uygulaması
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-md">
                  Okuma hızınızı artırmak, odaklanmanızı güçlendirmek ve anlama
                  oranınızı yükseltmek için bilimsel egzersizlerle tasarlanmış
                  interaktif bir platform.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
                  <span>7/24 çevrimiçi eğitim</span>
                </div>
                <span className="hidden sm:inline text-gray-300">|</span>
                <div className="hidden sm:flex items-center gap-1">
                  <span className="inline-flex h-2 w-2 rounded-full bg-orange-500" />
                  <span>Öğrenciler, veliler ve profesyoneller için</span>
                </div>
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-3">
                Hızlı Linkler
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-blue-600 hover:underline underline-offset-4 transition-colors"
                  >
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    className="text-gray-600 hover:text-blue-600 hover:underline underline-offset-4 transition-colors"
                  >
                    Fiyatlandırma & Abonelik
                  </Link>
                </li>
                <li>
                  <Link
                    href="/iletisim"
                    className="text-gray-600 hover:text-blue-600 hover:underline underline-offset-4 transition-colors"
                  >
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hesap & Hukuki */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-3">
                Hesap & Hukuki
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-blue-600 hover:underline underline-offset-4 transition-colors"
                  >
                    Giriş Yap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-gray-600 hover:text-blue-600 hover:underline underline-offset-4 transition-colors"
                  >
                    Kayıt Ol
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-gray-600 hover:text-blue-600 hover:underline underline-offset-4 transition-colors text-left"
                  >
                    Gizlilik Politikası
                  </button>
                </li>
              </ul>
            </div>

            {/* İletişim & Adres */}
            <div className="md:col-span-1">
              <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-3">
                İletişim
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-medium text-gray-800">
                  Hızlı Okuma Uygulaması
                </p>
                <p>
                  <span className="font-semibold">Adres:</span> İstanbul /
                  Türkiye
                </p>
                <p>
                  <span className="font-semibold">E-posta:</span>{" "}
                  <a
                    href="mailto:info@hizliokuma.app"
                    className="text-blue-600 hover:underline"
                  >
                    info@odakanatolia.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Telefon:</span>{" "}
                  <a
                    href="tel:+905551112233"
                    className="text-blue-600 hover:underline"
                  >
                    +90 (530) 478 41 66
                  </a>
                </p>
              </div>

              {/* Sosyal medya */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  Bizi Takip Edin
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-gray-500 hover:text-blue-500 hover:shadow-md border border-gray-200 transition-all"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 1200 1227"
                      fill="currentColor"
                    >
                      <path d="M1199.61 0H950.13L599.8 464.13L249.87 0H0L491.13 661.13L0 1227H249.87L599.8 762.87L950.13 1227H1200L708.87 565.87L1199.61 0ZM899.87 1117.13L599.8 715.87L299.87 1117.13H134.13L599.8 505.87L1065.87 1117.13H899.87ZM299.87 109.87L599.8 511.13L899.87 109.87H1065.87L599.8 721.13L134.13 109.87H299.87Z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-gray-500 hover:text-blue-600 hover:shadow-md border border-gray-200 transition-all"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-gray-500 hover:text-orange-500 hover:shadow-md border border-gray-200 transition-all"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Alt satır */}
          <div className="mt-8 pt-5 border-t border-blue-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-600">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-gray-800">
                Hızlı Okuma Uygulaması
              </span>
              . Tüm hakları saklıdır.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1">
              <span className="text-[11px] sm:text-xs text-gray-500">
                Eğitimin gücüyle okuma alışkanlığını dönüştür.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gizlilik Politikası Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[9999] sm:max-w-4xl sm:w-full max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-orange-50 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-orange-500">
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
                  {/* 1. Genel Bilgiler */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        1
                      </span>
                      Genel Bilgiler
                    </h3>
                    <p className="text-base leading-relaxed pl-10">
                      Odak Anatolia Akademi olarak, kullanıcılarımızın
                      gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası,
                      web sitemiz ve mobil platformlarımız aracılığıyla toplanan
                      bilgilerin nasıl toplandığını, kullanıldığını, korunduğunu
                      ve paylaşıldığını açıklar.
                    </p>
                  </section>

                  {/* 2. Toplanan Bilgiler */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        2
                      </span>
                      Toplanan Bilgiler
                    </h3>
                    <p className="text-base leading-relaxed pl-10 mb-3">
                      Platformumuzda aşağıdaki bilgileri toplayabiliriz:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-10 text-base leading-relaxed">
                      <li>Ad, soyad, e-posta adresi, telefon numarası</li>
                      <li>Kullanıcı adı, parola</li>
                      <li>IP adresi, tarayıcı bilgisi, cihaz türü</li>
                      <li>
                        Eğitim geçmişi ve platform üzerindeki etkileşim
                        bilgileri
                      </li>
                      <li>Geri bildirimler, yorumlar veya destek talepleri</li>
                    </ul>
                  </section>

                  {/* 3. Bilgilerin Kullanım Amaçları */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        3
                      </span>
                      Bilgilerin Kullanım Amaçları
                    </h3>
                    <p className="text-base leading-relaxed pl-10 mb-3">
                      Toplanan bilgiler şu amaçlarla kullanılabilir:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-10 text-base leading-relaxed">
                      <li>
                        Üyelik ve kimlik doğrulama süreçlerinin yürütülmesi
                      </li>
                      <li>
                        Eğitim içeriklerine erişim ve kullanıcı deneyiminin
                        geliştirilmesi
                      </li>
                      <li>Sistem güvenliği ve performans optimizasyonu</li>
                      <li>
                        Kullanıcılara bilgilendirme, duyuru ve kampanya iletimi
                      </li>
                      <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                    </ul>
                  </section>

                  {/* 4. Verilerin Saklanması ve Güvenliği */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        4
                      </span>
                      Verilerin Saklanması ve Güvenliği
                    </h3>
                    <p className="text-base leading-relaxed pl-10">
                      Verileriniz güvenli sunucularda, şifrelenmiş bağlantılar
                      (SSL) aracılığıyla korunur. Kredi kartı veya ödeme
                      bilgileri, yalnızca ödeme sağlayıcısı (örneğin iyzico,
                      Stripe vb.) tarafından işlenir ve sistemimizde saklanmaz.
                      Veriler, yasal süre boyunca saklanır ve süresi dolduğunda
                      güvenli şekilde silinir.
                    </p>
                  </section>

                  {/* 5. Bilgilerin Paylaşımı */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        5
                      </span>
                      Bilgilerin Paylaşımı
                    </h3>
                    <p className="text-base leading-relaxed pl-10 mb-3">
                      Kişisel verileriniz, yalnızca aşağıdaki durumlarda
                      paylaşılabilir:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-10 text-base leading-relaxed">
                      <li>Yasal yükümlülük gereği resmi kurumlarla,</li>
                      <li>
                        Hizmet aldığımız iş ortakları (barındırma, e-posta,
                        güvenlik sağlayıcıları) ile,
                      </li>
                      <li>Açık rızanızla belirttiğiniz üçüncü taraflarla.</li>
                    </ul>
                    <p className="text-base leading-relaxed pl-10 mt-3 font-semibold text-gray-900">
                      Hiçbir durumda kişisel verileriniz üçüncü kişilere
                      satılmaz.
                    </p>
                  </section>

                  {/* 6. Çocukların Gizliliği */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        6
                      </span>
                      Çocukların Gizliliği
                    </h3>
                    <p className="text-base leading-relaxed pl-10">
                      Hipnodil Akademi, 18 yaşından küçük kişilerden bilerek
                      veri toplamaz. Yanlışlıkla alınan bilgiler tespit
                      edildiğinde derhal silinir.
                    </p>
                  </section>

                  {/* 7. Haklarınız */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        7
                      </span>
                      Haklarınız
                    </h3>
                    <p className="text-base leading-relaxed pl-10 mb-3">
                      KVKK madde 11 kapsamında, kişisel verilerinizle ilgili:
                      Bilgi talep etme, düzeltme veya silinmesini isteme,
                      işlenmesine itiraz etme haklarına sahipsiniz.
                    </p>
                    <p className="text-base leading-relaxed pl-10">
                      Taleplerinizi{" "}
                      <a
                        href="mailto:hipnodilakademi@gmail.com"
                        className="text-blue-600 hover:text-blue-700 hover:underline font-semibold"
                      >
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
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
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
    </footer>
  );
}
