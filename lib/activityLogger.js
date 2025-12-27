import connectDB from "./mongodb";
import ActivityLog from "@/models/ActivityLog";

/**
 * Aktivite log kaydetme fonksiyonu
 * @param {Object} logData - Log verisi
 */
export async function logActivity(logData) {
  try {
    await connectDB();

    const {
      userId = null,
      userEmail = null,
      action,
      description,
      ipAddress = null,
      userAgent = null,
      metadata = {},
    } = logData;

    const log = new ActivityLog({
      userId,
      userEmail,
      action,
      description,
      ipAddress,
      userAgent,
      metadata,
    });

    await log.save();
  } catch (error) {
    // Log kaydetme hatası uygulamayı durdurmamalı
    console.error("Activity log error:", error);
  }
}

/**
 * Request'ten IP adresini al
 */
export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIp || "unknown";
}

/**
 * Request'ten User-Agent'ı al
 */
export function getUserAgent(request) {
  return request.headers.get("user-agent") || "unknown";
}

