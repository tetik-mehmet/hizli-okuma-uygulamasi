import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();

    let { name, surname, email, password } = await request.json();

    // Email'i normalize et (lowercase ve trim)
    email = email.trim().toLowerCase();
    name = name.trim();
    surname = surname.trim();
    password = password.trim();

    console.log("=== SIGNUP DEBUG ===");
    console.log("Signup isteği alındı:", { email, name, surname });

    // Email kontrolü
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log("❌ Kullanıcı zaten mevcut:", email);
      return NextResponse.json(
        { message: "Bu e-posta adresi zaten kayıtlı." },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 12);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("✅ Yeni kullanıcı kaydedildi:", { email, name, surname });
    console.log("=== SIGNUP DEBUG END ===");

    return NextResponse.json({ message: "Kayıt başarılı!" }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
