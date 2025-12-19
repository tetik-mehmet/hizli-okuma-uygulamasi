import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { checkAdminAccess } from "@/lib/adminAuth";

/**
 * GET /api/admin/stats
 * İstatistikler endpoint
 */
export async function GET(request) {
  try {
    // Admin kontrolü
    const adminCheck = await checkAdminAccess(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json(
        { message: "Yetkisiz erişim. Admin yetkisi gereklidir." },
        { status: 403 }
      );
    }

    await connectDB();

    // Toplam kullanıcı sayısı
    const totalUsers = await User.countDocuments({});

    // Aktif abonelik sayısı
    const activeSubscriptions = await User.countDocuments({
      subscriptionStatus: "active",
      isSubscribed: true,
    });

    // Süresi dolmuş abonelik sayısı
    const expiredSubscriptions = await User.countDocuments({
      subscriptionStatus: "expired",
    });

    // Abonelik olmayan kullanıcı sayısı
    const noSubscription = await User.countDocuments({
      $or: [
        { subscriptionStatus: "none" },
        { subscriptionStatus: { $exists: false } },
      ],
    });

    // Free trial başlatmış kullanıcı sayısı
    const freeTrialUsers = await User.countDocuments({
      freeTrialStarted: true,
    });

    // Aktif free trial (süresi dolmamış) kullanıcı sayısı
    const now = new Date();
    const activeFreeTrial = await User.countDocuments({
      freeTrialStarted: true,
      freeTrialEndDate: { $gt: now },
    });

    // Aylık abonelik sayısı
    const monthlySubscriptions = await User.countDocuments({
      subscriptionType: "monthly",
      subscriptionStatus: "active",
    });

    // Yıllık abonelik sayısı
    const yearlySubscriptions = await User.countDocuments({
      subscriptionType: "yearly",
      subscriptionStatus: "active",
    });

    // Son 30 günde kayıt olan kullanıcı sayısı
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Son 7 günde kayıt olan kullanıcı sayısı
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const lastWeekUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        activeSubscriptions,
        expiredSubscriptions,
        noSubscription,
        freeTrialUsers,
        activeFreeTrial,
        monthlySubscriptions,
        yearlySubscriptions,
        recentUsers,
        lastWeekUsers,
      },
    });
  } catch (error) {
    console.error("Admin stats API error:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

