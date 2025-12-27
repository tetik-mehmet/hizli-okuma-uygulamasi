import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { checkAdminAccess } from "@/lib/adminAuth";
import { logActivity, getClientIp, getUserAgent } from "@/lib/activityLogger";
import mongoose from "mongoose";

/**
 * POST /api/admin/users/bulk
 * Toplu kullanıcı işlemleri
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

    const body = await request.json();
    const { action, userIds } = body;

    if (!action || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { message: "Geçersiz istek. Action ve userIds gerekli." },
        { status: 400 }
      );
    }

    // ID'leri validate et
    const validIds = userIds.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );

    if (validIds.length === 0) {
      return NextResponse.json(
        { message: "Geçerli kullanıcı ID'si bulunamadı." },
        { status: 400 }
      );
    }

    let result = { updated: 0, failed: 0, errors: [] };

    switch (action) {
      case "cancel_subscription":
        // Toplu abonelik iptali
        const cancelResult = await User.updateMany(
          { _id: { $in: validIds } },
          {
            $set: {
              subscriptionStatus: "none",
              isSubscribed: false,
            },
          }
        );
        result.updated = cancelResult.modifiedCount;

        // Aktivite log
        await logActivity({
          userId: adminCheck.email,
          userEmail: adminCheck.email,
          action: "admin_action",
          description: `Toplu abonelik iptali: ${validIds.length} kullanıcı`,
          ipAddress: getClientIp(request),
          userAgent: getUserAgent(request),
          metadata: {
            action: "bulk_cancel_subscription",
            userIds: validIds,
            count: validIds.length,
          },
        });
        break;

      case "delete":
        // Toplu silme
        const deleteResult = await User.deleteMany({
          _id: { $in: validIds },
        });
        result.updated = deleteResult.deletedCount;

        // Aktivite log
        await logActivity({
          userId: adminCheck.email,
          userEmail: adminCheck.email,
          action: "admin_action",
          description: `Toplu kullanıcı silme: ${validIds.length} kullanıcı`,
          ipAddress: getClientIp(request),
          userAgent: getUserAgent(request),
          metadata: {
            action: "bulk_delete",
            userIds: validIds,
            count: validIds.length,
          },
        });
        break;

      case "activate_subscription":
        // Toplu abonelik aktifleştirme
        const activateResult = await User.updateMany(
          { _id: { $in: validIds } },
          {
            $set: {
              subscriptionStatus: "active",
              isSubscribed: true,
            },
          }
        );
        result.updated = activateResult.modifiedCount;

        // Aktivite log
        await logActivity({
          userId: adminCheck.email,
          userEmail: adminCheck.email,
          action: "admin_action",
          description: `Toplu abonelik aktifleştirme: ${validIds.length} kullanıcı`,
          ipAddress: getClientIp(request),
          userAgent: getUserAgent(request),
          metadata: {
            action: "bulk_activate_subscription",
            userIds: validIds,
            count: validIds.length,
          },
        });
        break;

      default:
        return NextResponse.json(
          { message: "Geçersiz işlem tipi." },
          { status: 400 }
        );
    }

    return NextResponse.json({
      message: "Toplu işlem başarıyla tamamlandı",
      result,
    });
  } catch (error) {
    console.error("Bulk operations error:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

