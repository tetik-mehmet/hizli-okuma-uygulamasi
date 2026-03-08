import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "E-posta adresi gereklidir." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Güvenlik: kullanıcı bulunsun ya da bulunmasın aynı mesajı ver
    if (!user) {
      return NextResponse.json(
        {
          message:
            "Eğer bu e-posta adresi kayıtlıysa, şifre sıfırlama bağlantısı gönderildi.",
        },
        { status: 200 }
      );
    }

    // Token üret (32 byte hex = 64 karakter)
    const rawToken = crypto.randomBytes(32).toString("hex");
    // DB'de hash'li saklayarak güvenliği artır
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // Token'ı ve expire süresini kaydet (1 saat)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`;

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: user.email,
      subject: "Şifre Sıfırlama Talebi — Hızlı Okuma",
      html: `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Şifre Sıfırlama</title>
        </head>
        <body style="margin:0;padding:0;background-color:#1a0a00;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a0a00;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03));border:1px solid rgba(255,255,255,0.12);border-radius:24px;overflow:hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#b45309,#d97706,#ea580c);padding:40px 32px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">
                        🔐 Şifre Sıfırlama
                      </h1>
                      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">
                        Hızlı Okuma Platformu
                      </p>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding:40px 32px;">
                      <p style="margin:0 0 16px;color:rgba(255,255,255,0.9);font-size:16px;line-height:1.6;">
                        Merhaba <strong style="color:#fbbf24;">${user.name}</strong>,
                      </p>
                      <p style="margin:0 0 24px;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;">
                        Hesabınız için şifre sıfırlama talebinde bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz.
                      </p>
                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding:8px 0 32px;">
                            <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#b45309,#d97706,#ea580c);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:12px;letter-spacing:0.3px;">
                              Şifremi Sıfırla →
                            </a>
                          </td>
                        </tr>
                      </table>
                      <!-- Warning Box -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px 24px;">
                            <p style="margin:0 0 8px;color:rgba(255,255,255,0.9);font-size:14px;font-weight:600;">
                              ⏰ Önemli Bilgiler
                            </p>
                            <ul style="margin:0;padding:0 0 0 20px;color:rgba(255,255,255,0.65);font-size:13px;line-height:1.8;">
                              <li>Bu bağlantı <strong style="color:#fbbf24;">1 saat</strong> geçerlidir.</li>
                              <li>Bu talebi siz yapmadıysanız bu e-postayı yoksayabilirsiniz.</li>
                              <li>Şifreniz sıfırlanana kadar mevcut şifreniz korunacaktır.</li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                      <!-- Fallback Link -->
                      <p style="margin:24px 0 0;color:rgba(255,255,255,0.45);font-size:12px;line-height:1.6;word-break:break-all;">
                        Buton çalışmıyorsa şu bağlantıyı tarayıcınıza yapıştırın:<br/>
                        <span style="color:#fbbf24;">${resetUrl}</span>
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
                      <p style="margin:0;color:rgba(255,255,255,0.35);font-size:12px;">
                        © ${new Date().getFullYear()} Hızlı Okuma Platformu. Tüm hakları saklıdır.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend e-posta hatası:", error);
      // Token'ı temizle ki geçersiz bir token DB'de kalmasın
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      return NextResponse.json(
        { message: "E-posta gönderilemedi. Lütfen tekrar deneyin." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Eğer bu e-posta adresi kayıtlıysa, şifre sıfırlama bağlantısı gönderildi.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password hatası:", error);
    return NextResponse.json(
      { message: "Sunucu hatası. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
