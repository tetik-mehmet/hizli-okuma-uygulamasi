"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);

  useEffect(() => {
    // Sadece anasayfada scroll listener ekle
    if (pathname !== "/") {
      setIsScrolled(false);
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Aktif section'ı belirle
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
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header yüksekliği için offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Özellikler", href: "#features", id: "features" },
    { label: "Fiyatlandırma", href: "#pricing", id: "pricing" },
    { label: "Hakkımızda", href: "/hakkimizda", id: "hakkimizda" },
    {
      label: "SpeedMind Nedir?",
      href: "/speedmind",
      id: "speedmind",
    },
    { label: "İletişim", href: "/iletisim", id: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-2xl shadow-[0_18px_45px_rgba(15,23,42,0.18)] border-b border-gray-200/70"
          : "bg-gradient-to-b from-white/95 via-white/80 to-white/40 backdrop-blur-xl shadow-[0_22px_60px_rgba(15,23,42,0.22)] border-b border-white/60"
      }`}
    >
      {/* Gradient Overlay - Scroll'da kaybolur */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-50/70 via-orange-50/50 to-blue-50/70 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-28 lg:h-32">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 4 }}
                whileTap={{ scale: 0.96 }}
                className="relative"
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                  <Image
                    src="/logo.png"
                    alt="Hızlı Okuma Logo"
                    width={300}
                    height={300}
                    className="w-full h-full object-contain"
                    priority
                    unoptimized
                  />
                </div>
                {/* Logo Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/40 via-orange-400/40 to-blue-400/40 rounded-full blur-xl -z-10"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.18, 1],
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              const isExternal = !item.href.startsWith("#");
              const isContact = item.id === "contact";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  {isExternal ? (
                    <Link href={item.href}>
                      <motion.button
                        className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
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
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                            layoutId="activeSection"
                            initial={false}
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
                      className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
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
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                          layoutId="activeSection"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.button>
                  )}

                  {/* WhatsApp Icon - Only for Contact */}
                  {isContact && (
                    <motion.div
                      className="relative"
                      onMouseEnter={() => setShowWhatsAppTooltip(true)}
                      onMouseLeave={() => setShowWhatsAppTooltip(false)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3 + index * 0.1 + 0.1,
                        duration: 0.5,
                      }}
                    >
                      <motion.a
                        href="https://wa.me/905304784166"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </motion.a>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {showWhatsAppTooltip && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 z-50"
                          >
                            <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200/50 p-4 backdrop-blur-sm">
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-gray-200/50 rotate-45"></div>
                              <p className="text-base font-semibold text-gray-700 leading-relaxed">
                                Soru ve talepleriniz için teknik destek
                                hattımıza mesaj atabilirsiniz. Ekiplerimiz size
                                en kısa süre içerisinde dönüş yapacaklardır.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/login">
                <motion.button
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:text-orange-600 border border-gray-300 hover:border-orange-300 bg-white/50 backdrop-blur-sm"
                      : "text-gray-800 hover:text-orange-600 border border-gray-200 hover:border-orange-300 bg-white/40 backdrop-blur-md"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn className="w-4 h-4" />
                  Giriş Yap
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href="/signup">
                <motion.button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserPlus className="w-4 h-4" />
                  Üye Ol
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 border ${
              isScrolled
                ? "text-gray-700 bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm"
                : "text-gray-800 bg-white/60 backdrop-blur-md border-gray-200/50"
            }`}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

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
              className="fixed top-24 md:top-28 lg:top-32 right-0 bottom-0 w-[280px] sm:w-[320px] max-w-[90vw] bg-white/98 backdrop-blur-xl shadow-2xl z-50 lg:hidden border-l border-gray-200/50 overflow-y-auto"
            >
              <div className="flex flex-col h-full p-4 sm:p-6">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 mb-4 sm:mb-6">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    const isExternal = !item.href.startsWith("#");
                    const isContact = item.id === "contact";

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={isContact ? "flex items-center gap-2" : ""}
                      >
                        {isExternal ? (
                          <Link
                            href={item.href}
                            className={isContact ? "flex-1" : ""}
                          >
                            <motion.button
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`w-full text-left px-4 py-3.5 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                                isActive
                                  ? "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 border border-orange-200"
                                  : "text-gray-700 hover:bg-gray-50 border border-transparent"
                              }`}
                              whileTap={{ scale: 0.98 }}
                            >
                              {item.label}
                            </motion.button>
                          </Link>
                        ) : (
                          <motion.button
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                              isActive
                                ? "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 border border-orange-200"
                                : "text-gray-700 hover:bg-gray-50 border border-transparent"
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            {item.label}
                          </motion.button>
                        )}

                        {/* WhatsApp Icon - Mobile - Only for Contact */}
                        {isContact && (
                          <motion.a
                            href="https://wa.me/905304784166"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300"
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.1 }}
                          >
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                          </motion.a>
                        )}
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4 sm:my-6" />

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 mt-auto pb-4 sm:pb-6">
                  <Link href="/login">
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm"
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                      Giriş Yap
                    </motion.button>
                  </Link>

                  <Link href="/signup">
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all duration-300"
                      whileTap={{ scale: 0.98 }}
                    >
                      <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                      Üye Ol
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Shine Effect on Scroll */}
      {isScrolled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
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
      )}
    </motion.header>
  );
}
