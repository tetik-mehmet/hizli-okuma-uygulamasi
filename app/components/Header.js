"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
  Crown,
  Home,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const emailFetchedRef = useRef(false); // Email'in API'den çekilip çekilmediğini takip et

  // Kullanıcı durumu kontrolü
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const name = localStorage.getItem("userName");
      const email = localStorage.getItem("userEmail");
      setIsLoggedIn(loggedIn);
      setUserName(name || "");

      // Email'i localStorage'dan oku (hızlı erişim için)
      if (email) {
        setUserEmail(email);
      }

      // Email'i API'den çek (sadece logged in ise ve henüz çekilmediyse)
      if (loggedIn && !emailFetchedRef.current) {
        const token = localStorage.getItem("authToken");
        if (token) {
          emailFetchedRef.current = true; // Çekiliyor işaretini koy
          fetch("/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              throw new Error("Failed to fetch user");
            })
            .then((data) => {
              if (data.user && data.user.email) {
                localStorage.setItem("userEmail", data.user.email);
                setUserEmail(data.user.email);
                // Debug için console'a yazdır
                console.log("User email fetched:", data.user.email);
                console.log(
                  "Is admin email?",
                  data.user.email === "tetikmehmet930@gmail.com"
                );
              }
            })
            .catch((error) => {
              console.error("Email fetch error:", error);
              emailFetchedRef.current = false; // Hata durumunda tekrar denemek için
              // Fallback olarak localStorage'daki email'i kullan
              if (email) {
                setUserEmail(email);
              }
            });
        } else {
          // Token yoksa email'i temizle
          setUserEmail("");
        }
      } else if (!loggedIn) {
        // Logged out ise email'i temizle ve flag'i sıfırla
        setUserEmail("");
        emailFetchedRef.current = false;
      }
    };

    checkAuth();
    // localStorage değişikliklerini dinle (sadece state güncellemeleri için)
    const interval = setInterval(() => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const name = localStorage.getItem("userName");
      const email = localStorage.getItem("userEmail");
      setIsLoggedIn(loggedIn);
      setUserName(name || "");
      if (email) {
        setUserEmail(email);
      } else if (!loggedIn) {
        setUserEmail("");
        emailFetchedRef.current = false;
      }
      // Eğer logged in ama email yoksa ve henüz fetch edilmediyse, tekrar dene
      if (loggedIn && !email && !emailFetchedRef.current) {
        checkAuth();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setIsScrolled(true);
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["features", "pricing"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    // Eğer anasayfada değilsek, önce anasayfaya git
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      // Sayfa yüklendikten sonra scroll yap
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      // Anasayfadaysak direkt scroll yap
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userSurname");
      setIsLoggedIn(false);
      setShowUserMenu(false);
      router.push("/");
    }
  };

  // Breadcrumb oluştur
  const getBreadcrumbs = () => {
    if (pathname === "/") return null;

    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ label: "Ana Sayfa", href: "/" }];

    // Sayfa isimleri mapping
    const pageNames = {
      hakkimizda: "Hakkımızda",
      speedmind: "SpeedMind",
      iletisim: "İletişim",
      login: "Giriş",
      signup: "Kayıt Ol",
      genel: "Genel",
      "ogrenci-panel": "Öğrenci Paneli",
      "yonetim-paneli": "Yönetim Paneli",
      "subscription-expired": "Abonelik",
      "free-trial": "Ücretsiz Deneme",
    };

    let currentPath = "";
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const label =
        pageNames[path] ||
        path
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      breadcrumbs.push({
        label,
        href: currentPath,
        isLast: index === paths.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const navItems = [
    { label: "Özellikler", href: "#features", id: "features" },
    { label: "Fiyatlandırma", href: "#pricing", id: "pricing" },
    { label: "Hakkımızda", href: "/hakkimizda", id: "hakkimizda" },
    { label: "SpeedMind", href: "/speedmind", id: "speedmind" },
    { label: "İletişim", href: "/iletisim", id: "contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "bg-gradient-to-b from-white/95 via-white/90 to-white/70 backdrop-blur-2xl border-b border-white/40"
        }`}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-orange-500/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-28 md:h-32">
            {/* Logo - Optimized Size */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center group">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="relative w-28 h-28 md:w-36 md:h-36">
                    <Image
                      src="/logo.png"
                      alt="Hızlı Okuma - Okuma Hızınızı 3 Kat Artırın"
                      width={144}
                      height={144}
                      className="w-full h-full object-contain"
                      priority
                      unoptimized
                    />
                  </div>
                  {/* Subtle glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-orange-400/20 to-blue-400/20 rounded-full blur-lg -z-10"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-0 absolute left-1/2 -translate-x-1/2 pr-8 xl:pr-12">
              {navItems.map((item, index) => {
                const isActive =
                  activeSection === item.id || pathname.includes(item.id);
                const isExternal = !item.href.startsWith("#");
                const isLast = index === navItems.length - 1;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                    className="flex items-center"
                  >
                    {isExternal ? (
                      <Link href={item.href}>
                        <motion.button
                          className={`relative px-5 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                            isScrolled
                              ? "text-gray-700 hover:text-orange-600"
                              : "text-gray-800 hover:text-orange-600"
                          }`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {item.label}
                          {isActive && (
                            <motion.div
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"
                              layoutId="activeIndicator"
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}
                        </motion.button>
                      </Link>
                    ) : (
                      <motion.button
                        onClick={() => scrollToSection(item.id)}
                        className={`relative px-5 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                          isScrolled
                            ? "text-gray-700 hover:text-orange-600"
                            : "text-gray-800 hover:text-orange-600"
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.label}
                        {isActive && (
                          <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"
                            layoutId="activeIndicator"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.button>
                    )}
                    {/* Modern Divider - Son item'dan önce değilse göster */}
                    {!isLast && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="mx-3 h-5 w-[1.5px] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-200 opacity-90"
                      />
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3 ml-auto pl-8 xl:pl-12">
              {/* Auth Buttons Group */}
              <div className="flex items-center gap-2">
                {isLoggedIn ? (
                  <>
                    {/* User Menu */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 }}
                    >
                      <motion.button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-orange-500/10 border border-gray-200/50 hover:from-blue-500/20 hover:to-orange-500/20 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                          {userName ? userName.charAt(0).toUpperCase() : "K"}
                        </div>
                        <span className="font-medium text-sm text-gray-700 hidden xl:block">
                          {userName || "Kullanıcı"}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      </motion.button>

                      <AnimatePresence>
                        {showUserMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
                          >
                            <div className="p-2">
                              {userEmail &&
                                userEmail.toLowerCase() ===
                                  "tetikmehmet930@gmail.com" && (
                                  <Link href="/yonetim-paneli">
                                    <motion.button
                                      className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-100/50 transition-colors flex items-center gap-3 text-sm text-gray-700"
                                      whileHover={{ x: 4 }}
                                      onClick={() => setShowUserMenu(false)}
                                    >
                                      <Settings className="w-4 h-4" />
                                      Ayarlar
                                    </motion.button>
                                  </Link>
                                )}
                              {userEmail &&
                                userEmail.toLowerCase() ===
                                  "tetikmehmet930@gmail.com" && (
                                  <div className="h-px bg-gray-200/50 my-1" />
                                )}
                              <motion.button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-3 text-sm text-red-600"
                                whileHover={{ x: 4 }}
                              >
                                <LogOut className="w-4 h-4" />
                                Çıkış Yap
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-gray-700 hover:text-orange-600 border border-gray-300/50 hover:border-orange-300 bg-white/50 backdrop-blur-sm transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <LogIn className="w-4 h-4" />
                        Giriş Yap
                      </motion.button>
                    </Link>

                    <Link href="/signup">
                      <motion.button
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <UserPlus className="w-4 h-4" />
                        Üye Ol
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm"
              whileTap={{ scale: 0.95 }}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Breadcrumb - Show only on non-home pages */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3">
            <nav className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center gap-2">
                  {index === 0 ? (
                    <Link
                      href={crumb.href}
                      className="flex items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      <Home className="w-4 h-4" />
                    </Link>
                  ) : crumb.isLast ? (
                    <span className="text-gray-900 font-medium">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                  {!crumb.isLast && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-28 md:top-32 right-0 bottom-0 w-[320px] max-w-[85vw] bg-white/98 backdrop-blur-xl shadow-2xl z-50 lg:hidden border-l border-gray-200/50 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col h-full p-6">
                  {/* User Info (if logged in) */}
                  {isLoggedIn && (
                    <div className="mb-6 pb-6 border-b border-gray-200/50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white font-bold">
                          {userName ? userName.charAt(0).toUpperCase() : "K"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {userName || "Kullanıcı"}
                          </p>
                          <p className="text-xs text-gray-600">Üye</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <nav className="flex flex-col gap-2 mb-6">
                    {navItems.map((item, index) => {
                      const isExternal = !item.href.startsWith("#");
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {isExternal ? (
                            <Link
                              href={item.href}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMobileMenuOpen(false);
                              }}
                              className="block w-full"
                            >
                              <motion.div
                                className="w-full text-left px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-100/50 transition-colors cursor-pointer"
                                whileTap={{ scale: 0.98 }}
                              >
                                {item.label}
                              </motion.div>
                            </Link>
                          ) : (
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                scrollToSection(item.id);
                              }}
                              className="w-full text-left px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-100/50 transition-colors"
                              whileTap={{ scale: 0.98 }}
                            >
                              {item.label}
                            </motion.button>
                          )}
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* CTA Buttons */}
                  {!isLoggedIn ? (
                    <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-gray-200/50">
                      <Link
                        href="/login"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full"
                      >
                        <motion.div
                          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-all cursor-pointer"
                          whileTap={{ scale: 0.98 }}
                        >
                          <LogIn className="w-5 h-5" />
                          Giriş Yap
                        </motion.div>
                      </Link>
                      <Link
                        href="/signup"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full"
                      >
                        <motion.div
                          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg cursor-pointer"
                          whileTap={{ scale: 0.98 }}
                        >
                          <UserPlus className="w-5 h-5" />
                          Üye Ol
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-gray-200/50">
                      {userEmail &&
                        userEmail.toLowerCase() ===
                          "tetikmehmet930@gmail.com" && (
                          <Link
                            href="/yonetim-paneli"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMobileMenuOpen(false);
                            }}
                            className="block w-full"
                          >
                            <motion.div
                              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-all cursor-pointer"
                              whileTap={{ scale: 0.98 }}
                            >
                              <Settings className="w-5 h-5" />
                              Ayarlar
                            </motion.div>
                          </Link>
                        )}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                        whileTap={{ scale: 0.98 }}
                      >
                        <LogOut className="w-5 h-5" />
                        Çıkış Yap
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Click outside to close menus */}
        {showUserMenu && (
          <div
            className="fixed inset-0 z-30"
            onClick={() => {
              setShowUserMenu(false);
            }}
          />
        )}
      </motion.header>
    </>
  );
}
