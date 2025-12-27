import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { checkAdminAccess } from "@/lib/adminAuth";
import { logActivity, getClientIp, getUserAgent } from "@/lib/activityLogger";
import bcrypt from "bcryptjs";

/**
 * POST /api/admin/users/import
 * CSV'den kullanıcı import et
 */
export async function POST(request) {
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

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "Dosya bulunamadı." },
        { status: 400 }
      );
    }

    // Dosyayı oku
    const text = await file.text();
    const lines = text.split("\n").filter((line) => line.trim());

    if (lines.length < 2) {
      return NextResponse.json(
        { message: "CSV dosyası boş veya geçersiz." },
        { status: 400 }
      );
    }

    // Başlıkları al
    const headers = lines[0]
      .split(",")
      .map((h) => h.replace(/^"|"$/g, "").trim());

    // Verileri parse et
    const users = [];
    const errors = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i]
        .split(",")
        .map((v) => v.replace(/^"|"$/g, "").trim());

      try {
        const userData = {};
        headers.forEach((header, index) => {
          userData[header] = values[index] || "";
        });

        // Gerekli alanları kontrol et
        if (!userData.Email || !userData.Ad || !userData.Soyad) {
          errors.push(`Satır ${i + 1}: Eksik bilgi (Email, Ad, Soyad gerekli)`);
          continue;
        }

        // Kullanıcı zaten var mı kontrol et
        const existingUser = await User.findOne({
          email: userData.Email.toLowerCase(),
        });

        if (existingUser) {
          errors.push(
            `Satır ${i + 1}: ${userData.Email} zaten kayıtlı, atlandı`
          );
          continue;
        }

        users.push({
          name: userData.Ad,
          surname: userData.Soyad,
          email: userData.Email.toLowerCase(),
          phone: userData.Telefon || "",
          subscriptionStatus: userData["Abonelik Durumu"] || "none",
          subscriptionType: userData["Abonelik Tipi"] || null,
          isSubscribed: userData["Abonelik Durumu"] === "active",
        });
      } catch (error) {
        errors.push(`Satır ${i + 1}: Parse hatası - ${error.message}`);
      }
    }

    // Kullanıcıları kaydet
    let imported = 0;
    for (const userData of users) {
      try {
        // Geçici şifre (kullanıcı ilk girişte değiştirmeli)
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const user = new User({
          ...userData,
          password: hashedPassword,
        });

        await user.save();
        imported++;
      } catch (error) {
        errors.push(
          `Kullanıcı kaydedilemedi (${userData.email}): ${error.message}`
        );
      }
    }

    // Aktivite log
    await logActivity({
      userId: adminCheck.email,
      userEmail: adminCheck.email,
      action: "admin_action",
      description: `Kullanıcı import: ${imported} kullanıcı eklendi`,
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
      metadata: {
        action: "import_users",
        imported,
        errors: errors.length,
      },
    });

    return NextResponse.json({
      message: "Import tamamlandı",
      imported,
      errors: errors.length,
      errorDetails: errors.slice(0, 10), // İlk 10 hatayı göster
    });
  } catch (error) {
    console.error("Import users error:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

