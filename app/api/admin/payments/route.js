import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { checkAdminAccess } from "@/lib/adminAuth";

/**
 * GET /api/admin/payments
 * Ödeme kayıtlarını listeleme
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

    // Query parametrelerini al
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const status = searchParams.get("status") || "all";
    const subscriptionType = searchParams.get("subscriptionType") || "all";

    // Query oluştur
    let query = {};

    if (status !== "all") {
      query.status = status;
    }

    if (subscriptionType !== "all") {
      query.subscriptionType = subscriptionType;
    }

    // Toplam kayıt sayısı
    const totalPayments = await Payment.countDocuments(query);

    // Ödemeleri getir
    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("userId", "name surname email")
      .lean();

    // Güvenli veri döndür
    const safePayments = payments.map((payment) => ({
      id: payment._id.toString(),
      userId: payment.userId?._id?.toString() || payment.userId?.toString(),
      userName: payment.userId?.name || "",
      userSurname: payment.userId?.surname || "",
      email: payment.email,
      subscriptionType: payment.subscriptionType,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      paymentMethod: payment.paymentMethod,
      transactionId: payment.transactionId,
      subscriptionStartDate: payment.subscriptionStartDate,
      subscriptionEndDate: payment.subscriptionEndDate,
      notes: payment.notes,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    }));

    return NextResponse.json({
      payments: safePayments,
      pagination: {
        page,
        limit,
        total: totalPayments,
        totalPages: Math.ceil(totalPayments / limit),
      },
    });
  } catch (error) {
    console.error("Admin payments API error:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

