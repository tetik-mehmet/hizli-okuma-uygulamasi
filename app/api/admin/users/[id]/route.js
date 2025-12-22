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
    if (email !== undefined) {
      // Email boş string olamaz
      if (email === "" || (email && email.trim() === "")) {
        return NextResponse.json(
          { message: "E-posta adresi boş olamaz" },
          { status: 400 }
        );
      }
      // Email'i normalize et (trim ve lowercase)
      const normalizedEmail = email.trim().toLowerCase();
      // Email değiştiriliyorsa benzersizlik kontrolü yap
      if (normalizedEmail !== user.email) {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
          return NextResponse.json(
            { message: "Bu e-posta adresi zaten kullanılıyor" },
            { status: 400 }
          );
        }
        user.email = normalizedEmail;
      }
    }

    // Diğer alanları güncelle
    if (name !== undefined && name !== null && name.trim() !== "") {
      user.name = name.trim();
    }
    if (surname !== undefined && surname !== null && surname.trim() !== "") {
      user.surname = surname.trim();
    }
    
    // isSubscribed ve subscriptionStatus'u tutarlı tutmak için önce subscriptionStatus'u kontrol et
    // subscriptionStatus değiştiyse isSubscribed'ı ona göre ayarla
    if (subscriptionStatus !== undefined) {
      // Enum kontrolü - mongoose validation yapacak ama daha iyi hata mesajı için kontrol ediyoruz
      const validStatuses = ["active", "expired", "none"];
      if (!validStatuses.includes(subscriptionStatus)) {
        return NextResponse.json(
          { message: `Geçersiz abonelik durumu: ${subscriptionStatus}` },
          { status: 400 }
        );
      }
      user.subscriptionStatus = subscriptionStatus;
      
      // Abonelik durumuna göre isSubscribed'ı otomatik güncelle
      if (subscriptionStatus === "active") {
        user.isSubscribed = true;
      } else if (subscriptionStatus === "expired" || subscriptionStatus === "none") {
        // Eğer isSubscribed açıkça false olarak gönderilmediyse, duruma göre ayarla
        if (isSubscribed === undefined) {
          user.isSubscribed = false;
        } else {
          user.isSubscribed = Boolean(isSubscribed);
        }
      }
    } else if (isSubscribed !== undefined) {
      // Sadece isSubscribed değiştiyse subscriptionStatus'u güncelle
      user.isSubscribed = Boolean(isSubscribed);
      if (isSubscribed && user.subscriptionStatus !== "active") {
        user.subscriptionStatus = "active";
      } else if (!isSubscribed && user.subscriptionStatus === "active") {
        user.subscriptionStatus = "none";
      }
    }
    if (subscriptionType !== undefined) {
      if (subscriptionType === "") {
        user.subscriptionType = null;
      } else {
        // Enum kontrolü - mongoose validation yapacak ama daha iyi hata mesajı için kontrol ediyoruz
        const validTypes = ["monthly", "quarterly", "yearly"];
        if (!validTypes.includes(subscriptionType)) {
          return NextResponse.json(
            { message: `Geçersiz abonelik tipi: ${subscriptionType}` },
            { status: 400 }
          );
        }
        user.subscriptionType = subscriptionType;
      }
    }
    if (subscriptionStartDate !== undefined) {
      if (subscriptionStartDate) {
        const startDate = new Date(subscriptionStartDate);
        if (isNaN(startDate.getTime())) {
          return NextResponse.json(
            { message: "Geçersiz abonelik başlangıç tarihi formatı" },
            { status: 400 }
          );
        }
        user.subscriptionStartDate = startDate;
      } else {
        user.subscriptionStartDate = null;
      }
    }
    if (subscriptionEndDate !== undefined) {
      if (subscriptionEndDate) {
        const endDate = new Date(subscriptionEndDate);
        if (isNaN(endDate.getTime())) {
          return NextResponse.json(
            { message: "Geçersiz abonelik bitiş tarihi formatı" },
            { status: 400 }
          );
        }
        user.subscriptionEndDate = endDate;
      } else {
        user.subscriptionEndDate = null;
      }
    }
    if (freeTrialStarted !== undefined) {
      user.freeTrialStarted = Boolean(freeTrialStarted);
    }
    if (freeTrialEndDate !== undefined) {
      if (freeTrialEndDate) {
        const trialEndDate = new Date(freeTrialEndDate);
        if (isNaN(trialEndDate.getTime())) {
          return NextResponse.json(
            { message: "Geçersiz free trial bitiş tarihi formatı" },
            { status: 400 }
          );
        }
        user.freeTrialEndDate = trialEndDate;
      } else {
        user.freeTrialEndDate = null;
      }
    }

    // Abonelik tipine göre otomatik tarih hesaplama
    // Eğer abonelik aktif yapılıyorsa ve gerekli bilgiler varsa tarihleri otomatik hesapla
    if (
      (subscriptionStatus === "active" || user.subscriptionStatus === "active") &&
      user.subscriptionType &&
      user.isSubscribed
    ) {
      // Eğer başlangıç tarihi yoksa bugünü ayarla
      if (!user.subscriptionStartDate) {
        user.subscriptionStartDate = new Date();
      }

      // Eğer bitiş tarihi yoksa veya abonelik tipi değiştiyse yeniden hesapla
      if (!user.subscriptionEndDate || subscriptionType !== undefined) {
        const startDate = user.subscriptionStartDate;
        const endDate = new Date(startDate);

        switch (user.subscriptionType) {
          case "monthly":
            endDate.setDate(endDate.getDate() + 30);
            break;
          case "quarterly":
            endDate.setDate(endDate.getDate() + 90);
            break;
          case "yearly":
            endDate.setDate(endDate.getDate() + 365);
            break;
        }

        user.subscriptionEndDate = endDate;
      }
    }

    // Validation hatalarını yakalamak için try-catch
    try {
      // Debug: Kullanıcı verilerini logla
      console.log("User data before save:", {
        subscriptionType: user.subscriptionType,
        subscriptionStatus: user.subscriptionStatus,
        isSubscribed: user.isSubscribed,
      });
      
      // Debug: Schema'yı kontrol et
      const schema = User.schema;
      const subscriptionTypePath = schema.path("subscriptionType");
      if (subscriptionTypePath) {
        console.log("SubscriptionType enum values:", subscriptionTypePath.enumValues);
      }
      
      await user.save();
    } catch (saveError) {
      console.error("User save validation error:", saveError);
      console.error("Error details:", {
        name: saveError.name,
        message: saveError.message,
        errors: saveError.errors,
      });
      
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

