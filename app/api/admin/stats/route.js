import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/Payment";
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

    // Son 30 günlük kullanıcı artış grafiği verisi
    const userGrowthData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const count = await User.countDocuments({
        createdAt: { $gte: date, $lt: nextDate },
      });

      userGrowthData.push({
        date: date.toISOString().split("T")[0],
        count,
      });
    }

    // Abonelik dağılımı
    const quarterlySubscriptions = await User.countDocuments({
      subscriptionType: "quarterly",
      subscriptionStatus: "active",
    });

    const subscriptionDistribution = {
      monthly: monthlySubscriptions,
      quarterly: quarterlySubscriptions,
      yearly: yearlySubscriptions,
    };

    // Aylık gelir (son 12 ay)
    const monthlyRevenue = [];
    const prices = { monthly: 1899, quarterly: 5299, yearly: 19999 };

    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setMonth(nextDate.getMonth() + 1);

      const payments = await Payment.find({
        createdAt: { $gte: date, $lt: nextDate },
        status: "completed",
      }).lean();

      const revenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

      monthlyRevenue.push({
        month: date.toISOString().split("T")[0],
        revenue,
        count: payments.length,
      });
    }

    // Toplam gelir
    const totalRevenue = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        activeSubscriptions,
        expiredSubscriptions,
        noSubscription,
        freeTrialUsers,
        activeFreeTrial,
        monthlySubscriptions,
        quarterlySubscriptions,
        yearlySubscriptions,
        recentUsers,
        lastWeekUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
        userGrowthData,
        subscriptionDistribution,
        monthlyRevenue,
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

