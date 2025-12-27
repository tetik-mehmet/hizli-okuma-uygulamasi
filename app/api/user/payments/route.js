import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * GET /api/user/payments
 * Kullanıcının ödeme geçmişini döndürür
 */
export async function GET(request) {
  try {
    if (!JWT_SECRET) {
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
        { message: "Oturum süreniz dolmuş. Lütfen tekrar giriş yapın." },
        { status: 401 }
      );
    }

    // Ödeme kayıtlarını getir
    const payments = await Payment.find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    // Güvenli veri döndür
    const safePayments = payments.map((payment) => ({
      id: payment._id.toString(),
      subscriptionType: payment.subscriptionType,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      paymentMethod: payment.paymentMethod,
      subscriptionStartDate: payment.subscriptionStartDate,
      subscriptionEndDate: payment.subscriptionEndDate,
      createdAt: payment.createdAt,
    }));

    return NextResponse.json({
      payments: safePayments,
    });
  } catch (error) {
    console.error("User payments API error:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

