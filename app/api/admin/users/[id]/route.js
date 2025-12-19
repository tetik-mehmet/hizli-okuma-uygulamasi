import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { checkAdminAccess } from "@/lib/adminAuth";
import mongoose from "mongoose";

/**
 * PUT /api/admin/users/[id]
 * Kullanıcı güncelleme
 */
export async function PUT(request, { params }) {
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

    // Next.js 15+ için params promise olarak gelebilir, hem promise hem obje olarak handle et
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    const body = await request.json();

    console.log("Update request - ID:", id);
    console.log("Update request - Body:", JSON.stringify(body, null, 2));

    // ID geçerliliğini kontrol et
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Geçersiz kullanıcı ID'si" },
        { status: 400 }
      );
    }

    // Güncellenebilir alanlar
    let {
      name,
      surname,
      email,
      isSubscribed,
      subscriptionType,
      subscriptionStartDate,
      subscriptionEndDate,
      subscriptionStatus,
      freeTrialStarted,
      freeTrialEndDate,
    } = body;

    // Boş string'leri null'a çevir (enum validation için)
    if (subscriptionType === "") subscriptionType = null;
    if (subscriptionStartDate === "") subscriptionStartDate = null;
    if (subscriptionEndDate === "") subscriptionEndDate = null;
    if (freeTrialEndDate === "") freeTrialEndDate = null;

    // Kullanıcıyı bul
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Email değişikliği kontrolü (eğer email değiştiriliyorsa, yeni email'in benzersiz olması gerekir)
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "Bu e-posta adresi zaten kullanılıyor" },
          { status: 400 }
        );
      }
      user.email = email;
    }

    // Diğer alanları güncelle
    if (name !== undefined && name !== null) user.name = name;
    if (surname !== undefined && surname !== null) user.surname = surname;
    if (isSubscribed !== undefined) user.isSubscribed = Boolean(isSubscribed);
    if (subscriptionType !== undefined) {
      user.subscriptionType = subscriptionType === "" ? null : subscriptionType;
    }
    if (subscriptionStartDate !== undefined) {
      user.subscriptionStartDate = subscriptionStartDate
        ? new Date(subscriptionStartDate)
        : null;
    }
    if (subscriptionEndDate !== undefined) {
      user.subscriptionEndDate = subscriptionEndDate
        ? new Date(subscriptionEndDate)
        : null;
    }
    if (subscriptionStatus !== undefined) {
      user.subscriptionStatus = subscriptionStatus;
    }
    if (freeTrialStarted !== undefined) {
      user.freeTrialStarted = Boolean(freeTrialStarted);
    }
    if (freeTrialEndDate !== undefined) {
      user.freeTrialEndDate = freeTrialEndDate
        ? new Date(freeTrialEndDate)
        : null;
    }

    // Validation hatalarını yakalamak için try-catch
    try {
      await user.save();
    } catch (saveError) {
      console.error("User save validation error:", saveError);
      if (saveError.name === "ValidationError") {
        const errors = Object.values(saveError.errors).map((err) => err.message);
        return NextResponse.json(
          { message: `Doğrulama hatası: ${errors.join(", ")}` },
          { status: 400 }
        );
      }
      throw saveError;
    }

    // Güvenli kullanıcı verisi döndür
    const safeUser = {
      id: user._id.toString(),
      name: user.name,
      surname: user.surname,
      email: user.email,
      createdAt: user.createdAt,
      isSubscribed: user.isSubscribed,
      subscriptionType: user.subscriptionType,
      subscriptionStartDate: user.subscriptionStartDate,
      subscriptionEndDate: user.subscriptionEndDate,
      subscriptionStatus: user.subscriptionStatus,
      freeTrialStarted: user.freeTrialStarted,
      freeTrialEndDate: user.freeTrialEndDate,
    };

    return NextResponse.json({
      message: "Kullanıcı başarıyla güncellendi",
      user: safeUser,
    });
  } catch (error) {
    console.error("Admin user update error:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { 
        message: "Sunucu hatası",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/users/[id]
 * Kullanıcı silme
 */
export async function DELETE(request, { params }) {
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

    // Next.js 15+ için params promise olarak gelebilir, hem promise hem obje olarak handle et
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;

    // ID geçerliliğini kontrol et
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Geçersiz kullanıcı ID'si" },
        { status: 400 }
      );
    }

    // Kullanıcıyı bul ve sil
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Kullanıcı başarıyla silindi",
    });
  } catch (error) {
    console.error("Admin user delete error:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

