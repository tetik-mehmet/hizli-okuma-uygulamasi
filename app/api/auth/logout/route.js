import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { logActivity, getClientIp, getUserAgent } from "@/lib/activityLogger";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json(
        { message: "Sunucu yapılandırma hatası" },
        { status: 500 }
      );
    }

    await connectDB();

    // Token'ı al
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // Token yoksa bile başarılı dön (client-side zaten temizlenmiş olabilir)
      return NextResponse.json({
        message: "Çıkış başarılı",
      });
    }

    const token = authHeader.substring(7);
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      // Token geçersizse bile başarılı dön
      return NextResponse.json({
        message: "Çıkış başarılı",
      });
    }

    const user = await User.findById(decoded.userId);
    if (user) {
      // Logout log kaydet
      await logActivity({
        userId: user._id.toString(),
        userEmail: user.email,
        action: "logout",
        description: "Kullanıcı çıkış yaptı",
        ipAddress: getClientIp(request),
        userAgent: getUserAgent(request),
      });
    }

    return NextResponse.json({
      message: "Çıkış başarılı",
    });
  } catch (error) {
    console.error("Logout error:", error);
    // Hata olsa bile başarılı dön (client-side temizleme yapılacak)
    return NextResponse.json({
      message: "Çıkış başarılı",
    });
  }
}

