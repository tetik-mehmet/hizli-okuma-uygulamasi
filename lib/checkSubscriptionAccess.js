import connectDB from "./mongodb";
import User from "@/models/User";

/**
 * Server-side abonelik erişim kontrolü
 * Middleware'de kullanılır
 */
export async function checkSubscriptionAccess(userId, pathname) {
  try {
    await connectDB();

    const user = await User.findById(userId).select(
      "isSubscribed subscriptionStatus subscriptionEndDate freeTrialStarted freeTrialEndDate"
    );

    if (!user) {
      return { hasAccess: false, reason: "user_not_found" };
    }

    const now = new Date();

    // Abonelik bitiş kontrolü
    if (user.subscriptionEndDate && new Date(user.subscriptionEndDate) < now) {
      if (user.subscriptionStatus === "active") {
        // Abonelik süresi dolmuş, güncelle
        user.subscriptionStatus = "expired";
        user.isSubscribed = false;
        await user.save();
      }
    }

    // Free trial allowed paths
    const FREE_TRIAL_ALLOWED_PATHS = [
      "/exercise4",
      "/genel/bolum1/exercises",
      "/genel/bolum1/kaybolan-metin",
      "/genel/bolum1/exercise2",
      "/sagsol",
      "/free-trial",
      "/subscription-expired",
      "/login",
      "/signup",
    ];

    // /genel altındaki sayfalar için özel kontrol
    if (pathname.startsWith("/genel")) {
      // Aktif abonelik varsa erişim ver
      if (user.isSubscribed && user.subscriptionStatus === "active") {
        return { hasAccess: true };
      }

      // Free trial kontrolü
      if (user.freeTrialStarted && user.freeTrialEndDate) {
        const endDate = new Date(user.freeTrialEndDate);
        if (endDate > now) {
          // Free trial aktif, sadece izin verilen sayfalara erişebilir
          const isAllowed = FREE_TRIAL_ALLOWED_PATHS.some(
            (path) => pathname === path || pathname.startsWith(`${path}/`)
          );
          if (isAllowed) {
            return { hasAccess: true };
          }
        }
      }

      // Erişim yok
      return { hasAccess: false, reason: "subscription_required" };
    }

    // Diğer sayfalar için aktif abonelik yeterli
    if (user.isSubscribed && user.subscriptionStatus === "active") {
      return { hasAccess: true };
    }

    // Free trial kontrolü (genel sayfalar için)
    if (user.freeTrialStarted && user.freeTrialEndDate) {
      const endDate = new Date(user.freeTrialEndDate);
      if (endDate > now) {
        const isAllowed = FREE_TRIAL_ALLOWED_PATHS.some(
          (path) => pathname === path || pathname.startsWith(`${path}/`)
        );
        if (isAllowed) {
          return { hasAccess: true };
        }
      }
    }

    return { hasAccess: false, reason: "subscription_required" };
  } catch (error) {
    console.error("checkSubscriptionAccess error:", error);
    // Hata durumunda erişim verme (güvenlik)
    return { hasAccess: false, reason: "server_error" };
  }
}

