/**
 * Kullanıcı erişim kontrolü utility fonksiyonu
 * Free-trial kullanıcıları sadece belirli etkinliklere erişebilir
 */

// Free-trial kullanıcılarının erişebileceği sayfalar
// Sadece bu 4 etkinliğe ve free-trial sayfasına erişebilirler
const FREE_TRIAL_ALLOWED_PATHS = [
  "/exercise4",
  "/genel/bolum1/exercises",
  "/genel/bolum1/kaybolan-metin",
  "/sagsol",
  "/free-trial",
  "/subscription-expired",
  "/login",
  "/signup",
  "/",
];

/**
 * Kullanıcının belirli bir sayfaya erişim yetkisi olup olmadığını kontrol eder
 * @param {string} pathname - Kontrol edilecek sayfa yolu
 * @returns {Object} - { hasAccess: boolean, redirectPath: string, message: string }
 */
export function checkPageAccess(pathname) {
  // Public sayfalar herkese açık
  const publicPaths = ["/", "/login", "/signup", "/free-trial", "/subscription-expired"];
  
  if (publicPaths.includes(pathname)) {
    return {
      hasAccess: true,
      redirectPath: null,
      message: null,
    };
  }

  // localStorage'dan kullanıcı bilgilerini al
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true";
  const isSubscribed = typeof window !== "undefined" && localStorage.getItem("isSubscribed") === "true";
  const subscriptionStatus = typeof window !== "undefined" && localStorage.getItem("subscriptionStatus");
  const freeTrialStarted = typeof window !== "undefined" && localStorage.getItem("freeTrialStarted") === "true";
  const freeTrialEndDate = typeof window !== "undefined" && localStorage.getItem("freeTrialEndDate");

  // Giriş yapmamış kullanıcılar login sayfasına yönlendirilir
  if (!isLoggedIn) {
    return {
      hasAccess: false,
      redirectPath: "/login",
      message: "Bu sayfaya erişmek için giriş yapmanız gerekiyor.",
    };
  }

  // /genel altındaki tüm sayfalar için abonelik kontrolü yapılır
  // Sadece abone olan kullanıcılar /genel altındaki sayfalara erişebilir
  if (pathname.startsWith("/genel")) {
    // Abonelik aktif olan kullanıcılar erişebilir
    if (isSubscribed && subscriptionStatus === "active") {
      return {
        hasAccess: true,
        redirectPath: null,
        message: null,
      };
    }

    // Free-trial kontrolü - sadece belirli sayfalara erişebilir
    if (freeTrialStarted && freeTrialEndDate) {
      const endDate = new Date(freeTrialEndDate);
      const now = new Date();
      
      // Free-trial süresi dolmamışsa
      if (endDate > now) {
        // Sadece izin verilen sayfalara erişebilir
        const isAllowed = FREE_TRIAL_ALLOWED_PATHS.some((path) => {
          return pathname === path || pathname.startsWith(path);
        });

        if (isAllowed) {
          return {
            hasAccess: true,
            redirectPath: null,
            message: null,
          };
        } else {
          return {
            hasAccess: false,
            redirectPath: "/subscription-expired",
            message: "Bu içeriğe erişmek için abonelik satın almanız gerekiyor. Ücretsiz deneme süresince sadece belirli etkinliklere erişebilirsiniz.",
          };
        }
      } else {
        // Free-trial süresi dolmuş
        return {
          hasAccess: false,
          redirectPath: "/subscription-expired",
          message: "Ücretsiz deneme süreniz dolmuş. Tüm içeriklere erişmek için abonelik satın almanız gerekiyor.",
        };
      }
    }

    // /genel altında abonelik yok ve free-trial başlatılmamış
    return {
      hasAccess: false,
      redirectPath: "/subscription-expired",
      message: "Bu içeriğe erişmek için abonelik satın almanız veya ücretsiz denemeyi başlatmanız gerekiyor.",
    };
  }

  // Abonelik aktif olan kullanıcılar diğer tüm sayfalara erişebilir
  if (isSubscribed && subscriptionStatus === "active") {
    return {
      hasAccess: true,
      redirectPath: null,
      message: null,
    };
  }

  // Free-trial kontrolü (genel sayfalar için)
  if (freeTrialStarted && freeTrialEndDate) {
    const endDate = new Date(freeTrialEndDate);
    const now = new Date();
    
    // Free-trial süresi dolmamışsa
    if (endDate > now) {
      // Sadece izin verilen sayfalara erişebilir
      const isAllowed = FREE_TRIAL_ALLOWED_PATHS.some((path) => {
        return pathname === path || pathname.startsWith(path);
      });

      if (isAllowed) {
        return {
          hasAccess: true,
          redirectPath: null,
          message: null,
        };
      } else {
        return {
          hasAccess: false,
          redirectPath: "/subscription-expired",
          message: "Bu içeriğe erişmek için abonelik satın almanız gerekiyor. Ücretsiz deneme süresince sadece belirli etkinliklere erişebilirsiniz.",
        };
      }
    } else {
      // Free-trial süresi dolmuş
      return {
        hasAccess: false,
        redirectPath: "/subscription-expired",
        message: "Ücretsiz deneme süreniz dolmuş. Tüm içeriklere erişmek için abonelik satın almanız gerekiyor.",
      };
    }
  }

  // Abonelik yok ve free-trial başlatılmamış
  return {
    hasAccess: false,
    redirectPath: "/subscription-expired",
    message: "Bu içeriğe erişmek için abonelik satın almanız veya ücretsiz denemeyi başlatmanız gerekiyor.",
  };
}

/**
 * Kullanıcının abonelik durumunu kontrol eder
 * @returns {Object} - { isSubscribed: boolean, hasFreeTrial: boolean, freeTrialExpired: boolean }
 */
export function getUserSubscriptionStatus() {
  if (typeof window === "undefined") {
    return {
      isSubscribed: false,
      hasFreeTrial: false,
      freeTrialExpired: false,
    };
  }

  const isSubscribed = localStorage.getItem("isSubscribed") === "true";
  const subscriptionStatus = localStorage.getItem("subscriptionStatus");
  const freeTrialStarted = localStorage.getItem("freeTrialStarted") === "true";
  const freeTrialEndDate = localStorage.getItem("freeTrialEndDate");

  let hasFreeTrial = false;
  let freeTrialExpired = false;

  if (freeTrialStarted && freeTrialEndDate) {
    const endDate = new Date(freeTrialEndDate);
    const now = new Date();
    hasFreeTrial = endDate > now;
    freeTrialExpired = endDate <= now;
  }

  return {
    isSubscribed: isSubscribed && subscriptionStatus === "active",
    hasFreeTrial,
    freeTrialExpired,
  };
}

