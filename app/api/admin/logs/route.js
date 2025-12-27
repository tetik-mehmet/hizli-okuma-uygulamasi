import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ActivityLog from "@/models/ActivityLog";
import { checkAdminAccess } from "@/lib/adminAuth";

/**
 * GET /api/admin/logs
 * Aktivite loglarını listeleme
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
    const limit = parseInt(searchParams.get("limit") || "100");
    const action = searchParams.get("action") || "all";
    const userId = searchParams.get("userId") || null;

    // Query oluştur
    let query = {};

    if (action !== "all") {
      query.action = action;
    }

    if (userId) {
      query.userId = userId;
    }

    // Toplam log sayısı
    const totalLogs = await ActivityLog.countDocuments(query);

    // Logları getir
    const logs = await ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("userId", "name surname email")
      .lean();

    // Güvenli veri döndür
    const safeLogs = logs.map((log) => ({
      id: log._id.toString(),
      userId: log.userId?._id?.toString() || log.userId?.toString() || null,
      userName: log.userId?.name || "",
      userSurname: log.userId?.surname || "",
      userEmail: log.userEmail || log.userId?.email || "",
      action: log.action,
      description: log.description,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      metadata: log.metadata,
      createdAt: log.createdAt,
    }));

    return NextResponse.json({
      logs: safeLogs,
      pagination: {
        page,
        limit,
        total: totalLogs,
        totalPages: Math.ceil(totalLogs / limit),
      },
    });
  } catch (error) {
    console.error("Admin logs API error:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

