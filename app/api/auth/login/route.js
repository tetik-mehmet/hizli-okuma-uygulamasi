import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { logActivity, getClientIp, getUserAgent } from "@/lib/activityLogger";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    // JWT_SECRET kontrolü
    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined");
      return NextResponse.json(
        { message: "Sunucu yapılandırma hatası: JWT_SECRET eksik" },
        { status: 500 }
      );
    }

    // MongoDB bağlantısı
    try {
      await connectDB();
      console.log("✅ MongoDB bağlantısı başarılı");
    } catch (dbError) {
      console.error("❌ MongoDB bağlantı hatası:", dbError);
      return NextResponse.json(
        { message: "Veritabanı bağlantı hatası" },
        { status: 500 }
      );
    }

    // Request body kontrolü
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("❌ Request body parse hatası:", parseError);
      return NextResponse.json(
        { message: "Geçersiz istek formatı" },
        { status: 400 }
      );
    }

    let { email, password } = body;

    // Email ve password kontrolü
    if (!email || !password) {
      console.error("❌ Eksik bilgiler:", { email: !!email, password: !!password });
      return NextResponse.json(
        { message: "E-posta ve şifre gereklidir." },
        { status: 400 }
      );
    }

    // Email'i normalize et (lowercase ve trim)
    email = email.trim().toLowerCase();
    password = password.trim();

    console.log("=== LOGIN DEBUG ===");
    console.log("Login isteği alındı:", { email: email, passwordLength: password.length });
    console.log("Aranan email (normalized):", email);

    // Veritabanında tüm kullanıcıları kontrol et (debug için)
    const allUsers = await User.find({}).select("email");
    console.log("Veritabanındaki email'ler:", allUsers.map(u => u.email));

    // Kullanıcıyı bul (email lowercase ile kaydedilmiş olmalı)
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log("❌ Kullanıcı bulunamadı:", email);
      console.log("Aranan email:", email);
      console.log("Veritabanındaki email sayısı:", allUsers.length);
      return NextResponse.json(
        { message: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    console.log("✅ Kullanıcı bulundu:", user.email);
    console.log("Kullanıcı ID:", user._id);
    console.log("Kullanıcı şifre hash'i var mı:", !!user.password);
    console.log("Kullanıcı şifre hash uzunluğu:", user.password ? user.password.length : 0);

    // Şifreyi kontrol et
    console.log("Şifre karşılaştırması yapılıyor...");
    console.log("Girilen şifre uzunluğu:", password.length);
    const isValidPassword = await bcrypt.compare(password, user.password);

    console.log("Şifre kontrolü sonucu:", isValidPassword);

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
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log("✅ Kullanıcı giriş yaptı:", { email, userId: user._id });

    // Abonelik durumunu kontrol et (ÖNCE yapılmalı)
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

    // Aktivite log kaydet (SONRA yapılmalı)
    await logActivity({
      userId: user._id.toString(),
      userEmail: user.email,
      action: "login",
      description: "Kullanıcı giriş yaptı",
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
      metadata: {
        subscriptionStatus: subscriptionStatus,
      },
    });

    return NextResponse.json({
      message: "Giriş başarılı!",
      token,
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
    console.error("❌ Login error:", error);
    console.error("Error stack:", error.stack);
    console.error("Error message:", error.message);
    return NextResponse.json(
      { 
        message: "Sunucu hatası",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
