import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

/**
 * POST /api/cron/check-subscriptions
 * Günlük olarak tüm abonelikleri kontrol eder ve süresi dolanları expired yapar
 * Vercel Cron veya external cron service tarafından çağrılmalı
 */
export async function POST(request) {
  try {
    // Güvenlik: Cron secret kontrolü (Vercel Cron için)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const now = new Date();
    let expiredCount = 0;
    let freeTrialExpiredCount = 0;

    // Süresi dolmuş abonelikleri bul ve güncelle
    const expiredSubscriptions = await User.find({
      subscriptionStatus: "active",
      subscriptionEndDate: { $lt: now },
    });

    for (const user of expiredSubscriptions) {
      user.subscriptionStatus = "expired";
      user.isSubscribed = false;
      await user.save();
      expiredCount++;
    }

    // Süresi dolmuş free trial'ları kontrol et
    const expiredFreeTrials = await User.find({
      freeTrialStarted: true,
      freeTrialEndDate: { $lt: now },
    });

    for (const user of expiredFreeTrials) {
      // Free trial süresi dolmuş ama abonelik yoksa, freeTrialStarted'ı false yapabiliriz
      // Ancak bu bilgiyi saklamak için ayrı bir alan eklenebilir (opsiyonel)
      // Şimdilik sadece logluyoruz
      freeTrialExpiredCount++;
    }

    console.log(`✅ Abonelik kontrolü tamamlandı: ${expiredCount} abonelik expired yapıldı, ${freeTrialExpiredCount} free trial süresi doldu`);

    return NextResponse.json({
      success: true,
      message: "Abonelik kontrolü tamamlandı",
      stats: {
        expiredSubscriptions: expiredCount,
        expiredFreeTrials: freeTrialExpiredCount,
      },
    });
  } catch (error) {
    console.error("Cron check-subscriptions error:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "Sunucu hatası",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// GET method da ekleyelim (test için)
export async function GET(request) {
  return POST(request);
}

