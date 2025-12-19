import jwt from "jsonwebtoken";

/**
 * Admin yetkilendirme utility fonksiyonları
 * Environment variable'dan admin e-posta kontrolü yapar
 */

/**
 * Kullanıcının admin olup olmadığını kontrol eder
 * @param {string} email - Kontrol edilecek e-posta adresi
 * @returns {boolean} - Admin ise true, değilse false
 */
export function isAdmin(email) {
  if (!email) return false;
  
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("ADMIN_EMAIL environment variable tanımlı değil");
    return false;
  }
  
  return email.toLowerCase().trim() === adminEmail.toLowerCase().trim();
}

/**
 * Request'ten kullanıcı e-postasını alır ve admin kontrolü yapar
 * @param {Request} request - Next.js request objesi
 * @returns {Object} - { isAdmin: boolean, email: string | null, error: string | null }
 */
export async function checkAdminAccess(request) {
  try {
    // JWT token'ı cookie veya header'dan al
    const token = 
      request.cookies?.get("authToken")?.value ||
      request.headers?.get("authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return {
        isAdmin: false,
        email: null,
        error: "Token bulunamadı",
      };
    }
    
    // JWT'yi decode et
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
      return {
        isAdmin: false,
        email: null,
        error: "JWT_SECRET tanımlı değil",
      };
    }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userEmail = decoded.email;
      
      return {
        isAdmin: isAdmin(userEmail),
        email: userEmail,
        error: null,
      };
    } catch (error) {
      return {
        isAdmin: false,
        email: null,
        error: "Geçersiz token",
      };
    }
  } catch (error) {
    console.error("checkAdminAccess error:", error);
    return {
      isAdmin: false,
      email: null,
      error: "Sunucu hatası",
    };
  }
}

/**
 * Client-side admin kontrolü (localStorage'dan)
 * @returns {boolean} - Admin ise true, değilse false
 */
export function isAdminClient() {
  if (typeof window === "undefined") return false;
  
  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) return false;
  
  // Client-side'da environment variable'a erişemeyiz
  // Bu yüzden sadece localStorage'dan kontrol ederiz
  // Gerçek kontrol server-side'da yapılmalı
  return false; // Client-side'da her zaman false döner, güvenlik için
}

