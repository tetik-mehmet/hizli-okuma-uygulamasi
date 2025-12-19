import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { checkAdminAccess } from "@/lib/adminAuth";

/**
 * GET /api/admin/users
 * Kullanıcıları listeleme - arama ve filtreleme desteği ile
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
    const search = searchParams.get("search") || "";
    const subscriptionStatus = searchParams.get("subscriptionStatus") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Arama ve filtreleme için query oluştur
    let query = {};

    // Arama (email, name, surname'e göre)
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { surname: { $regex: search, $options: "i" } },
      ];
    }

    // Abonelik durumu filtresi
    if (subscriptionStatus !== "all") {
      if (subscriptionStatus === "active") {
        query.subscriptionStatus = "active";
        query.isSubscribed = true;
      } else if (subscriptionStatus === "expired") {
        query.subscriptionStatus = "expired";
      } else if (subscriptionStatus === "none") {
        query.$or = [
          { subscriptionStatus: "none" },
          { subscriptionStatus: { $exists: false } },
        ];
      } else if (subscriptionStatus === "freeTrial") {
        query.freeTrialStarted = true;
      }
    }

    // Toplam kullanıcı sayısını al
    const totalUsers = await User.countDocuments(query);

    // Kullanıcıları getir (şifre hariç)
    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Güvenli kullanıcı verileri (şifre zaten select ile çıkarıldı)
    const safeUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      surname: user.surname,
      email: user.email,
      createdAt: user.createdAt,
      isSubscribed: user.isSubscribed || false,
      subscriptionType: user.subscriptionType || null,
      subscriptionStartDate: user.subscriptionStartDate || null,
      subscriptionEndDate: user.subscriptionEndDate || null,
      subscriptionStatus: user.subscriptionStatus || "none",
      freeTrialStarted: user.freeTrialStarted || false,
      freeTrialEndDate: user.freeTrialEndDate || null,
    }));

    return NextResponse.json({
      users: safeUsers,
      pagination: {
        page,
        limit,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error("Admin users API error:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

