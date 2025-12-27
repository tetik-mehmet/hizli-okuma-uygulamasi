import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * GET /api/user/me
 * Mevcut kullanıcının bilgilerini döndürür
 */
export async function GET(request) {
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
      console.error("Token doğrulama hatası:", error.message);
      return NextResponse.json(
        { message: "Oturum süreniz dolmuş. Lütfen tekrar giriş yapın." },
        { status: 401 }
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

    // Abonelik durumunu kontrol et
    let subscriptionStatus = user.subscriptionStatus || "none";
    if (user.subscriptionEndDate && new Date(user.subscriptionEndDate) < new Date()) {
      subscriptionStatus = "expired";
      // Abonelik süresi dolmuşsa durumu güncelle
      if (user.subscriptionStatus === "active") {
        user.subscriptionStatus = "expired";
        user.isSubscribed = false;
        await user.save();
      }
    }

    // Güvenli kullanıcı verisi döndür
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        surname: user.surname,
        email: user.email,
        isSubscribed: user.isSubscribed || false,
        subscriptionType: user.subscriptionType || null,
        subscriptionStartDate: user.subscriptionStartDate || null,
        subscriptionEndDate: user.subscriptionEndDate || null,
        subscriptionStatus: subscriptionStatus,
        freeTrialStarted: user.freeTrialStarted || false,
        freeTrialEndDate: user.freeTrialEndDate || null,
      },
    });
  } catch (error) {
    console.error("User me API error:", error);
    return NextResponse.json(
      { 
        message: "Sunucu hatası",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

