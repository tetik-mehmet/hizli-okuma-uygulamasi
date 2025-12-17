import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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

    const { email, password } = await request.json();

    console.log("=== LOGIN DEBUG ===");
    console.log("Login isteği alındı:", { email });

    // Kullanıcıyı bul
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ Kullanıcı bulunamadı:", email);
      return NextResponse.json(
        { message: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    console.log("✅ Kullanıcı bulundu:", user.email);

    // Şifreyi kontrol et
    const isValidPassword = await bcrypt.compare(password, user.password);

    console.log("Şifre kontrolü:", isValidPassword);

    if (!isValidPassword) {
      console.log("❌ Şifre yanlış");
      return NextResponse.json(
        { message: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    console.log("✅ Şifre doğru, giriş yapılıyor");

    // JWT token oluştur (7 gün geçerli)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log("✅ Kullanıcı giriş yaptı:", { email, userId: user._id });

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

    return NextResponse.json({
      message: "Giriş başarılı!",
      token,
      user: {
        id: user._id,
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
    console.error("Login error:", error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
