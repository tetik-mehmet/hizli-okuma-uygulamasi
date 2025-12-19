"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { checkPageAccess } from "@/lib/checkAccess";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function OyunLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Erişim kontrolü
    const accessCheck = checkPageAccess("/oyun");
    if (!accessCheck.hasAccess) {
      router.push(accessCheck.redirectPath || "/subscription-expired");
      return;
    }
  }, [router]);

  return children;
}
