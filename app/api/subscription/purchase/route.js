import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

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
    if (!subscriptionType || !["monthly", "yearly"].includes(subscriptionType)) {
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
    let subscriptionEndDate = new Date();

    if (subscriptionType === "monthly") {
      subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);
    } else if (subscriptionType === "yearly") {
      subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 365);
    }

    // Kullanıcının abonelik durumunu güncelle
    user.isSubscribed = true;
    user.subscriptionType = subscriptionType;
    user.subscriptionStartDate = subscriptionStartDate;
    user.subscriptionEndDate = subscriptionEndDate;
    user.subscriptionStatus = "active";

    await user.save();

    console.log("✅ Abonelik satın alındı:", {
      email: user.email,
      subscriptionType,
      subscriptionEndDate,
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

