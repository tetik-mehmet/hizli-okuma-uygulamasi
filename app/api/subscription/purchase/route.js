import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/Payment";
import { logActivity, getClientIp, getUserAgent } from "@/lib/activityLogger";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    // JWT_SECRET kontrolü
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return NextResponse.json(
        { message: "Sunucu yapılandırma hatası" },
        { status: 500 }
      );
    }

    await connectDB();

    // Token'ı header'dan al
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Yetkilendirme hatası. Lütfen giriş yapın." },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Token'ı doğrula
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { message: "Geçersiz token. Lütfen tekrar giriş yapın." },
        { status: 401 }
      );
    }

    const { subscriptionType } = await request.json();

    // Abonelik tipi kontrolü
    if (!subscriptionType || !["monthly", "quarterly", "yearly"].includes(subscriptionType)) {
      return NextResponse.json(
        { message: "Geçersiz abonelik tipi." },
        { status: 400 }
      );
    }

    // Kullanıcıyı bul
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı." },
        { status: 404 }
      );
    }

    // Abonelik başlangıç ve bitiş tarihlerini hesapla
    const now = new Date();
    const subscriptionStartDate = now;
    let subscriptionEndDate = new Date(now);

    if (subscriptionType === "monthly") {
      // 1 ay sonrası (gerçek ay hesabı)
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
    } else if (subscriptionType === "quarterly") {
      // 3 ay sonrası
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 3);
    } else if (subscriptionType === "yearly") {
      // 1 yıl sonrası
      subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
    }

    // Fiyat bilgisi
    const prices = {
      monthly: 1899,
      quarterly: 5299,
      yearly: 19999,
    };
    const amount = prices[subscriptionType] || 0;

    // Kullanıcının abonelik durumunu güncelle
    user.isSubscribed = true;
    user.subscriptionType = subscriptionType;
    user.subscriptionStartDate = subscriptionStartDate;
    user.subscriptionEndDate = subscriptionEndDate;
    user.subscriptionStatus = "active";

    await user.save();

    // Ödeme kaydı oluştur
    const payment = new Payment({
      userId: user._id,
      email: user.email,
      subscriptionType,
      amount,
      currency: "TRY",
      status: "completed",
      paymentMethod: "manual",
      subscriptionStartDate,
      subscriptionEndDate,
      notes: "Abonelik satın alma işlemi",
    });

    await payment.save();

    // Aktivite log kaydet
    await logActivity({
      userId: user._id.toString(),
      userEmail: user.email,
      action: "subscription_purchase",
      description: `${subscriptionType} abonelik satın alındı`,
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
      metadata: {
        subscriptionType,
        amount,
        paymentId: payment._id.toString(),
      },
    });

    console.log("✅ Abonelik satın alındı:", {
      email: user.email,
      subscriptionType,
      subscriptionEndDate,
      paymentId: payment._id,
    });

    return NextResponse.json({
      message: "Abonelik başarıyla aktif edildi!",
      subscription: {
        isSubscribed: user.isSubscribed,
        subscriptionType: user.subscriptionType,
        subscriptionStartDate: user.subscriptionStartDate,
        subscriptionEndDate: user.subscriptionEndDate,
        subscriptionStatus: user.subscriptionStatus,
      },
    });
  } catch (error) {
    console.error("Subscription purchase error:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

