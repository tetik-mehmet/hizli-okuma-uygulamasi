import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { checkAdminAccess } from "@/lib/adminAuth";

/**
 * GET /api/admin/users/export
 * Kullanıcı listesini CSV olarak export et
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

    // Tüm kullanıcıları getir
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    // CSV başlıkları
    const headers = [
      "ID",
      "Ad",
      "Soyad",
      "Email",
      "Telefon",
      "Kayıt Tarihi",
      "Abonelik Durumu",
      "Abonelik Tipi",
      "Abonelik Başlangıç",
      "Abonelik Bitiş",
      "Free Trial Başlatıldı",
      "Free Trial Bitiş",
    ];

    // CSV satırları
    const rows = users.map((user) => [
      user._id.toString(),
      user.name || "",
      user.surname || "",
      user.email || "",
      user.phone || "",
      user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("tr-TR")
        : "",
      user.subscriptionStatus || "none",
      user.subscriptionType || "",
      user.subscriptionStartDate
        ? new Date(user.subscriptionStartDate).toLocaleDateString("tr-TR")
        : "",
      user.subscriptionEndDate
        ? new Date(user.subscriptionEndDate).toLocaleDateString("tr-TR")
        : "",
      user.freeTrialStarted ? "Evet" : "Hayır",
      user.freeTrialEndDate
        ? new Date(user.freeTrialEndDate).toLocaleDateString("tr-TR")
        : "",
    ]);

    // CSV içeriği oluştur
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // BOM ekle (Excel için Türkçe karakter desteği)
    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvContent;

    // Response döndür
    return new NextResponse(csvWithBOM, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="kullanicilar_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export users error:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

