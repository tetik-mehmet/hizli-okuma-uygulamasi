"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Exercise2() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [size, setSize] = useState(50);
  const [showInstructions, setShowInstructions] = useState(false);
  const [fishColor, setFishColor] = useState("orange");
  const [routeType, setRouteType] = useState("figure8"); // Yeni rota türü state'i
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  // Balık renk paleti
  const fishColors = {
    orange: {
      body: "#FF6B35",
      tail: "#E55A2B",
      fin: "#E55A2B",
    },
    blue: {
      body: "#3498DB",
      tail: "#2980B9",
      fin: "#2980B9",
    },
    green: {
      body: "#2ECC71",
      tail: "#27AE60",
      fin: "#27AE60",
    },
    purple: {
      body: "#9B59B6",
      tail: "#8E44AD",
      fin: "#8E44AD",
    },
    red: {
      body: "#E74C3C",
      tail: "#C0392B",
      fin: "#C0392B",
    },
    pink: {
      body: "#E91E63",
      tail: "#C2185B",
      fin: "#C2185B",
    },
  };

  // Rota türleri
  const routeTypes = {
    figure8: {
      name: "8 Şekli",
      description: "Klasik 8 şekli rota",
      icon: "∞",
    },
    square: {
      name: "Kare",
      description: "Kare çevresinde hareket",
      icon: "⬜",
    },
    zigzag: {
      name: "Zigzag",
      description: "Yatay zigzag hareket",
      icon: "⚡",
    },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawFish = (x, y, angle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Seçilen renge göre balık çizimi
      const colors = fishColors[fishColor];

      // Balık gövdesi
      ctx.fillStyle = colors.body;
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.6, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Balık kuyruğu
      ctx.fillStyle = colors.tail;
      ctx.beginPath();
      ctx.moveTo(-size * 0.8, 0);
      ctx.lineTo(-size * 1.2, -size * 0.3);
      ctx.lineTo(-size * 1.2, size * 0.3);
      ctx.closePath();
      ctx.fill();

      // Balık gözü - koyu mavi (sabit)
      ctx.fillStyle = "#2C3E50";
      ctx.beginPath();
      ctx.arc(size * 0.3, -size * 0.2, size * 0.1, 0, 2 * Math.PI);
      ctx.fill();

      // Balık yüzgeci
      ctx.fillStyle = colors.fin;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.4);
      ctx.lineTo(size * 0.2, -size * 0.6);
      ctx.lineTo(size * 0.4, -size * 0.4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Rota çizim fonksiyonları
    const drawFigure8 = (ctx, centerX, centerY, radius, t) => {
      const x = centerX + radius * Math.sin(t);
      const y = centerY + radius * Math.sin(t) * Math.cos(t);

      // Balığın yönünü hesapla
      const dx = radius * Math.cos(t);
      const dy =
        radius * (Math.cos(t) * Math.cos(t) - Math.sin(t) * Math.sin(t));
      const angle = Math.atan2(dy, dx);

      return { x, y, angle };
    };

    const drawLShape = (ctx, centerX, centerY, radius, t) => {
      // Dikdörtgen çevresi için 8 aşamalı hareket
      const cycle = t % (2 * Math.PI);
      let x, y, angle;

      if (cycle < Math.PI / 4) {
        // 1. aşama: Sağa doğru yatay hareket (üst kenar)
        const progress = cycle / (Math.PI / 4);
        x = centerX - radius * 0.6 + radius * 1.2 * progress;
        y = centerY - radius * 0.6;
        angle = 0; // Sağa doğru
      } else if (cycle < Math.PI / 2) {
        // 2. aşama: Aşağı doğru dikey hareket (sağ kenar)
        const progress = (cycle - Math.PI / 4) / (Math.PI / 4);
        x = centerX + radius * 0.6;
        y = centerY - radius * 0.6 + radius * 1.2 * progress;
        angle = Math.PI / 2; // Aşağı doğru
      } else if (cycle < (3 * Math.PI) / 4) {
        // 3. aşama: Sola doğru yatay hareket (alt kenar)
        const progress = (cycle - Math.PI / 2) / (Math.PI / 4);
        x = centerX + radius * 0.6 - radius * 1.2 * progress;
        y = centerY + radius * 0.6;
        angle = Math.PI; // Sola doğru
      } else if (cycle < Math.PI) {
        // 4. aşama: Yukarı doğru dikey hareket (sol kenar)
        const progress = (cycle - (3 * Math.PI) / 4) / (Math.PI / 4);
        x = centerX - radius * 0.6;
        y = centerY + radius * 0.6 - radius * 1.2 * progress;
        angle = -Math.PI / 2; // Yukarı doğru
      } else if (cycle < (5 * Math.PI) / 4) {
        // 5. aşama: Sağa doğru yatay hareket (sol kenar üst kısmı)
        const progress = (cycle - Math.PI) / (Math.PI / 4);
        x = centerX - radius * 0.6 + radius * 1.2 * progress;
        y = centerY - radius * 0.6;
        angle = 0; // Sağa doğru
      } else if (cycle < (3 * Math.PI) / 2) {
        // 6. aşama: Aşağı doğru dikey hareket (sağ kenar)
        const progress = (cycle - (5 * Math.PI) / 4) / (Math.PI / 4);
        x = centerX + radius * 0.6;
        y = centerY - radius * 0.6 + radius * 1.2 * progress;
        angle = Math.PI / 2; // Aşağı doğru
      } else if (cycle < (7 * Math.PI) / 4) {
        // 7. aşama: Sola doğru yatay hareket (alt kenar)
        const progress = (cycle - (3 * Math.PI) / 2) / (Math.PI / 4);
        x = centerX + radius * 0.6 - radius * 1.2 * progress;
        y = centerY + radius * 0.6;
        angle = Math.PI; // Sola doğru
      } else {
        // 8. aşama: Yukarı doğru dikey hareket (sol kenar)
        const progress = (cycle - (7 * Math.PI) / 4) / (Math.PI / 4);
        x = centerX - radius * 0.6;
        y = centerY + radius * 0.6 - radius * 1.2 * progress;
        angle = -Math.PI / 2; // Yukarı doğru
      }

      return { x, y, angle };
    };

    const drawZigzag = (ctx, centerX, centerY, radius, t) => {
      const frequency = 3; // Zigzag sıklığı
      const x = centerX + radius * 0.8 * Math.sin(t);
      const y = centerY + radius * 0.6 * Math.sin(t * frequency);

      // Balığın yönünü hesapla
      const dx = radius * 0.8 * Math.cos(t);
      const dy = radius * 0.6 * frequency * Math.cos(t * frequency);
      const angle = Math.atan2(dy, dx);

      return { x, y, angle };
    };

    // Rota izini çizme fonksiyonları
    const drawFigure8Path = (ctx, centerX, centerY, radius) => {
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const t2 = (i / 100) * 2 * Math.PI;
        const x2 = centerX + radius * Math.sin(t2);
        const y2 = centerY + radius * Math.sin(t2) * Math.cos(t2);
        if (i === 0) {
          ctx.moveTo(x2, y2);
        } else {
          ctx.lineTo(x2, y2);
        }
      }
    };

    const drawLShapePath = (ctx, centerX, centerY, radius) => {
      ctx.beginPath();

      // Tam dikdörtgen çevresi çizimi
      // Üst kenar
      ctx.moveTo(centerX - radius * 0.6, centerY - radius * 0.6);
      ctx.lineTo(centerX + radius * 0.6, centerY - radius * 0.6);

      // Sağ kenar
      ctx.lineTo(centerX + radius * 0.6, centerY + radius * 0.6);

      // Alt kenar
      ctx.lineTo(centerX - radius * 0.6, centerY + radius * 0.6);

      // Sol kenar (kapatma)
      ctx.lineTo(centerX - radius * 0.6, centerY - radius * 0.6);
    };

    const drawZigzagPath = (ctx, centerX, centerY, radius) => {
      const frequency = 3;
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const t2 = (i / 100) * 2 * Math.PI;
        const x2 = centerX + radius * 0.8 * Math.sin(t2);
        const y2 = centerY + radius * 0.6 * Math.sin(t2 * frequency);
        if (i === 0) {
          ctx.moveTo(x2, y2);
        } else {
          ctx.lineTo(x2, y2);
        }
      }
    };

    // Deniz arka planı (gradient, dalga çizgileri ve kabarcıklar)
    const drawSeaBackground = (ctx, canvas, t) => {
      // Arka plan gradyanı
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0ea5e9"); // cyan-500
      gradient.addColorStop(0.5, "#0284c7"); // sky-600
      gradient.addColorStop(1, "#0c4a6e"); // slate-900 mavi ton
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Işık huzmeleri (çok hafif)
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 3; i++) {
        const baseX = (i * canvas.width) / 3 + ((t * 20) % (canvas.width / 3));
        ctx.beginPath();
        ctx.moveTo(baseX - 60, 0);
        ctx.lineTo(baseX + 20, 0);
        ctx.lineTo(baseX + 120, canvas.height);
        ctx.lineTo(baseX - 100, canvas.height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Yüzey dalgaları (sine çizgileri)
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = "#e0f2fe"; // açık mavi
      for (let j = 0; j < 4; j++) {
        const y = 30 + j * 18;
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 6) {
          const wave = Math.sin((x + t * 120 + j * 80) * 0.02) * 3;
          ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Kabarcıklar
      ctx.save();
      ctx.fillStyle = "#e0f2fe";
      ctx.globalAlpha = 0.35;
      const bubbleCount = 18;
      for (let k = 0; k < bubbleCount; k++) {
        const seed = k * 97.123;
        const x = ((seed * 53.7) % canvas.width) + Math.sin(t * 0.8 + k) * 8;
        const speedY = 20 + (seed % 20); // 20-40 arası
        let y = canvas.height - ((t * speedY + seed) % (canvas.height + 40));
        const r = 2 + (seed % 5) * 0.7;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        // kabarcık parlak kenar
        ctx.beginPath();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = "#ffffff";
        ctx.arc(x - r * 0.4, y - r * 0.4, r * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = "#e0f2fe";
      }
      ctx.restore();
    };

    const drawSquare = (ctx, centerX, centerY, radius, t) => {
      // Kare çevresi için 8 aşamalı hareket
      const cycle = t % (2 * Math.PI);
      let x, y, angle;

      if (cycle < Math.PI / 4) {
        // 1. aşama: Sağa doğru yatay hareket (üst kenar)
        const progress = cycle / (Math.PI / 4);
        x = centerX - radius * 0.6 + radius * 1.2 * progress;
        y = centerY - radius * 0.6;
        angle = 0; // Sağa doğru
      } else if (cycle < Math.PI / 2) {
        // 2. aşama: Aşağı doğru dikey hareket (sağ kenar)
        const progress = (cycle - Math.PI / 4) / (Math.PI / 4);
        x = centerX + radius * 0.6;
        y = centerY - radius * 0.6 + radius * 1.2 * progress;
        angle = Math.PI / 2; // Aşağı doğru
      } else if (cycle < (3 * Math.PI) / 4) {
        // 3. aşama: Sola doğru yatay hareket (alt kenar)
        const progress = (cycle - Math.PI / 2) / (Math.PI / 4);
        x = centerX + radius * 0.6 - radius * 1.2 * progress;
        y = centerY + radius * 0.6;
        angle = Math.PI; // Sola doğru
      } else if (cycle < Math.PI) {
        // 4. aşama: Yukarı doğru dikey hareket (sol kenar)
        const progress = (cycle - (3 * Math.PI) / 4) / (Math.PI / 4);
        x = centerX - radius * 0.6;
        y = centerY + radius * 0.6 - radius * 1.2 * progress;
        angle = -Math.PI / 2; // Yukarı doğru
      } else if (cycle < (5 * Math.PI) / 4) {
        // 5. aşama: Sağa doğru yatay hareket (sol kenar üst kısmı)
        const progress = (cycle - Math.PI) / (Math.PI / 4);
        x = centerX - radius * 0.6 + radius * 1.2 * progress;
        y = centerY - radius * 0.6;
        angle = 0; // Sağa doğru
      } else if (cycle < (3 * Math.PI) / 2) {
        // 6. aşama: Aşağı doğru dikey hareket (sağ kenar)
        const progress = (cycle - (5 * Math.PI) / 4) / (Math.PI / 4);
        x = centerX + radius * 0.6;
        y = centerY - radius * 0.6 + radius * 1.2 * progress;
        angle = Math.PI / 2; // Aşağı doğru
      } else if (cycle < (7 * Math.PI) / 4) {
        // 7. aşama: Sola doğru yatay hareket (alt kenar)
        const progress = (cycle - (3 * Math.PI) / 2) / (Math.PI / 4);
        x = centerX + radius * 0.6 - radius * 1.2 * progress;
        y = centerY + radius * 0.6;
        angle = Math.PI; // Sola doğru
      } else {
        // 8. aşama: Yukarı doğru dikey hareket (sol kenar)
        const progress = (cycle - (7 * Math.PI) / 4) / (Math.PI / 4);
        x = centerX - radius * 0.6;
        y = centerY + radius * 0.6 - radius * 1.2 * progress;
        angle = -Math.PI / 2; // Yukarı doğru
      }

      return { x, y, angle };
    };

    const drawSquarePath = (ctx, centerX, centerY, radius) => {
      ctx.beginPath();

      // Kare çevresi çizimi
      // Üst kenar
      ctx.moveTo(centerX - radius * 0.6, centerY - radius * 0.6);
      ctx.lineTo(centerX + radius * 0.6, centerY - radius * 0.6);

      // Sağ kenar
      ctx.lineTo(centerX + radius * 0.6, centerY + radius * 0.6);

      // Alt kenar
      ctx.lineTo(centerX - radius * 0.6, centerY + radius * 0.6);

      // Sol kenar (kapatma)
      ctx.lineTo(centerX - radius * 0.6, centerY - radius * 0.6);
    };

    const animate = (timestamp) => {
      if (!isPlaying) return;

      const canvas = canvasRef.current;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.6;

      // Zaman bazlı animasyon
      const t = timestamp * 0.001 * speed;

      let fishPosition;
      let drawPathFunction;

      // Seçilen rotaya göre balık pozisyonunu hesapla
      switch (routeType) {
        case "figure8":
          fishPosition = drawFigure8(ctx, centerX, centerY, radius, t);
          drawPathFunction = () =>
            drawFigure8Path(ctx, centerX, centerY, radius);
          break;
        case "square":
          fishPosition = drawSquare(ctx, centerX, centerY, radius, t);
          drawPathFunction = () =>
            drawSquarePath(ctx, centerX, centerY, radius);
          break;
        case "zigzag":
          fishPosition = drawZigzag(ctx, centerX, centerY, radius, t);
          drawPathFunction = () =>
            drawZigzagPath(ctx, centerX, centerY, radius);
          break;
        default:
          fishPosition = drawFigure8(ctx, centerX, centerY, radius, t);
          drawPathFunction = () =>
            drawFigure8Path(ctx, centerX, centerY, radius);
      }

      // Canvas'ı temizle ve deniz arka planını çiz
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSeaBackground(ctx, canvas, t);

      // Rota izini çiz (daha belirgin)
      const colors = fishColors[fishColor];
      // Alt katman: kalın ve yumuşak ışıltı
      ctx.save();
      ctx.strokeStyle = colors.body;
      ctx.lineWidth = 6;
      ctx.globalAlpha = 0.35;
      ctx.shadowColor = colors.body;
      ctx.shadowBlur = 10;
      drawPathFunction();
      ctx.stroke();
      ctx.restore();

      // Üst katman: ince ve daha opak çizgi
      ctx.save();
      ctx.strokeStyle = colors.body;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.85;
      drawPathFunction();
      ctx.stroke();
      ctx.restore();

      // Balığı çiz
      drawFish(fishPosition.x, fishPosition.y, fishPosition.angle);

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed, size, fishColor, routeType]); // routeType dependency eklendi

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setSpeed(2);
    setSize(50);
    setFishColor("orange");
    setRouteType("figure8"); // Varsayılan rota
    timeRef.current = 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-8">
      {/* Geri Dön Butonu - Sol üst köşe */}
      <button
        onClick={() => router.push("/panel")}
        className="fixed top-6 left-6 z-50 bg-black/50 backdrop-blur-xl px-4 py-3 rounded-full shadow-lg text-white font-bold text-sm border border-white/20 hover:bg-black/70 transition-all duration-300 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Geri Dön
      </button>
      <div className="max-w-4xl mx-auto">
        {/* Egzersiz Talimatları - Info Hover */}
        <div className="flex justify-start mb-6 relative group">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-800 mr-3">
              Egzersiz Talimatları
            </span>
            <div className="relative">
              <span
                className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                tabIndex={0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              {/* Hover ile açılan kutu */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-5 z-10 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform scale-95 group-hover:scale-100">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-semibold mr-3 mt-0.5">
                      1
                    </span>
                    <span>
                      Balığı gözlerinizle takip edin, başınızı hareket
                      ettirmeyin
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-semibold mr-3 mt-0.5">
                      2
                    </span>
                    <span>
                      Farklı rotaları deneyerek göz kaslarınızı çalıştırın
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-semibold mr-3 mt-0.5">
                      3
                    </span>
                    <span>Hızı kademeli olarak artırın</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-semibold mr-3 mt-0.5">
                      4
                    </span>
                    <span>Günde 5-10 dakika yapın</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-semibold mr-3 mt-0.5">
                      5
                    </span>
                    <span>Gözleriniz yorulursa ara verin</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tüm Kontroller Üstte - Yatay Düzen */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Rota Seçimi */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mr-2">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">Rota</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(routeTypes).map(([routeKey, routeInfo]) => (
                  <button
                    key={routeKey}
                    onClick={() => setRouteType(routeKey)}
                    className={`w-full p-2 rounded-lg border text-xs transition-all duration-200 hover:scale-105 ${
                      routeType === routeKey
                        ? "border-emerald-400 bg-emerald-100 shadow-sm"
                        : "border-gray-200 hover:border-emerald-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{routeInfo.icon}</span>
                      <span className="font-medium text-gray-700">
                        {routeInfo.name}
                      </span>
                      {routeType === routeKey && (
                        <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Balık Rengi */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-100">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg flex items-center justify-center mr-2">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">Renk</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(fishColors).map(([colorName, colors]) => (
                  <button
                    key={colorName}
                    onClick={() => setFishColor(colorName)}
                    className={`relative w-full p-2 rounded-lg border transition-all duration-200 hover:scale-105 ${
                      fishColor === colorName
                        ? "border-gray-400 shadow-sm scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors.body }}
                          ></div>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors.tail }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700 capitalize whitespace-nowrap">
                          {colorName === "orange"
                            ? "Turuncu"
                            : colorName === "blue"
                            ? "Mavi"
                            : colorName === "green"
                            ? "Yeşil"
                            : colorName === "purple"
                            ? "Mor"
                            : colorName === "red"
                            ? "Kırmızı"
                            : colorName === "pink"
                            ? "Pembe"
                            : colorName}
                        </span>
                      </div>
                      {fishColor === colorName && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hız Kontrolü */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center mr-2">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">Hız</h3>
                </div>
                <div className="bg-white px-2 py-1 rounded-full border border-indigo-200">
                  <span className="text-xs font-bold text-indigo-600">
                    {speed}x
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #818cf8 0%, #818cf8 ${
                    ((speed - 0.5) / 4.5) * 100
                  }%, #e0e7ff ${((speed - 0.5) / 4.5) * 100}%, #e0e7ff 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.5x</span>
                <span>5x</span>
              </div>
            </div>

            {/* Balık Boyutu */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mr-2">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">Boyut</h3>
                </div>
                <div className="bg-white px-2 py-1 rounded-full border border-purple-200">
                  <span className="text-xs font-bold text-purple-600">
                    {size}px
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                step="5"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${
                    ((size - 30) / 50) * 100
                  }%, #e9d5ff ${((size - 30) / 50) * 100}%, #e9d5ff 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>30px</span>
                <span>80px</span>
              </div>
            </div>
          </div>

          {/* Canvas ve Kontrol Butonları */}
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-4">
              <canvas
                ref={canvasRef}
                width={600}
                height={450}
                className="border-2 border-indigo-200 rounded-lg bg-indigo-50"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={toggleAnimation}
                className={`relative group px-8 py-3 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isPlaying
                    ? "bg-gradient-to-r from-red-500 to-red-600 shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="flex items-center justify-center">
                  <div
                    className={`w-6 h-6 mr-2 rounded-full flex items-center justify-center ${
                      isPlaying ? "bg-red-400" : "bg-orange-400"
                    }`}
                  >
                    {isPlaying ? (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-3 h-3 text-white ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                  <span>{isPlaying ? "Durdur" : "Başlat"}</span>
                </div>
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${
                    isPlaying
                      ? "from-red-400 to-red-500"
                      : "from-orange-400 to-orange-500"
                  } opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
              </button>

              <button
                onClick={resetAnimation}
                className="relative group px-8 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 mr-2 rounded-full bg-indigo-400 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <span>Sıfırla</span>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
