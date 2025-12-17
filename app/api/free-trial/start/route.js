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
      console.log("Token doğrulandı:", {
        userId: decoded.userId,
        email: decoded.email,
      });
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

    // Ücretsiz deneme zaten başlatılmış mı kontrol et
    if (user.freeTrialStarted) {
      const now = new Date();
      if (user.freeTrialEndDate && new Date(user.freeTrialEndDate) > now) {
        // Ücretsiz deneme hala aktif
        return NextResponse.json({
          message: "Ücretsiz deneme zaten aktif.",
          freeTrial: {
            freeTrialStarted: user.freeTrialStarted,
            freeTrialEndDate: user.freeTrialEndDate,
          },
        });
      } else {
        // Ücretsiz deneme süresi dolmuş - tekrar başlatılamaz
        return NextResponse.json(
          {
            message: "Ücretsiz deneme süreniz dolmuş. Abonelik satın alarak platforma devam edebilirsiniz.",
            expired: true,
          },
          { status: 400 }
        );
      }
    }

    // Ücretsiz deneme başlat (7 gün)
    const now = new Date();
    const freeTrialEndDate = new Date();
    freeTrialEndDate.setDate(freeTrialEndDate.getDate() + 7);

    user.freeTrialStarted = true;
    user.freeTrialEndDate = freeTrialEndDate;

    await user.save();

    console.log("✅ Ücretsiz deneme başlatıldı:", {
      email: user.email,
      freeTrialEndDate,
    });

    return NextResponse.json({
      message: "Ücretsiz deneme başarıyla başlatıldı!",
      freeTrial: {
        freeTrialStarted: user.freeTrialStarted,
        freeTrialEndDate: user.freeTrialEndDate,
      },
    });
  } catch (error) {
    console.error("Free trial start error:", error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
