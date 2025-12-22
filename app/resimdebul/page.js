"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ResimdeBulPage({
  visibleGames = ["teapot", "ant", "rhino", "pen", "frog", "raccoon"],
  embedded = false,
} = {}) {
  const [gameState, setGameState] = useState("menu"); // menu, playing, found, timeout
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [teapotFound, setTeapotFound] = useState(false);
  const [teapotPosition, setTeapotPosition] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [clickAttempts, setClickAttempts] = useState(0);

  // İkinci resim için yeni state'ler
  const [secondImageFound, setSecondImageFound] = useState(false);
  const [secondImagePosition, setSecondImagePosition] = useState(null);
  const [secondImageClickAttempts, setSecondImageClickAttempts] = useState(0);

  // Üçüncü resim (gergedan) için yeni state'ler
  const [thirdImageFound, setThirdImageFound] = useState(false);
  const [thirdImagePosition, setThirdImagePosition] = useState(null);
  const [thirdImageClickAttempts, setThirdImageClickAttempts] = useState(0);

  // Dördüncü resim (kalem) için yeni state'ler
  const [fourthImageFound, setFourthImageFound] = useState(false);
  const [fourthImagePosition, setFourthImagePosition] = useState(null);
  const [fourthImageClickAttempts, setFourthImageClickAttempts] = useState(0);

  // Beşinci resim (kurbağa) için yeni state'ler
  const [fifthImageFound, setFifthImageFound] = useState(false);
  const [fifthImagePosition, setFifthImagePosition] = useState(null);
  const [fifthImageClickAttempts, setFifthImageClickAttempts] = useState(0);

  // Altıncı resim (rakun) için yeni state'ler
  const [sixthImageFound, setSixthImageFound] = useState(false);
  const [sixthImagePosition, setSixthImagePosition] = useState(null);
  const [sixthImageClickAttempts, setSixthImageClickAttempts] = useState(0);

  const [currentImage, setCurrentImage] = useState(1); // 1: çaydanlık, 2: karınca, 3: gergedan, 4: kalem, 5: kurbağa, 6: rakun
  const [selectedGame, setSelectedGame] = useState(null); // null, "teapot", "ant", "rhino", "pen", "frog", "raccoon"

  const imageRef = useRef(null);
  const secondImageRef = useRef(null);
  const thirdImageRef = useRef(null);
  const fourthImageRef = useRef(null);
  const fifthImageRef = useRef(null);
  const sixthImageRef = useRef(null);
  const router = useRouter();

  // Resim yüklendiğinde boyutları al
  const handleImageLoad = () => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    }
  };

  // İkinci resim yüklendiğinde boyutları al
  const handleSecondImageLoad = () => {
    if (secondImageRef.current) {
      const { naturalWidth, naturalHeight } = secondImageRef.current;
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    }
  };

  // Üçüncü resim yüklendiğinde boyutları al
  const handleThirdImageLoad = () => {
    if (thirdImageRef.current) {
      const { naturalWidth, naturalHeight } = thirdImageRef.current;
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    }
  };

  // Dördüncü resim yüklendiğinde boyutları al
  const handleFourthImageLoad = () => {
    if (fourthImageRef.current) {
      const { naturalWidth, naturalHeight } = fourthImageRef.current;
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    }
  };

  // Beşinci resim yüklendiğinde boyutları al
  const handleFifthImageLoad = () => {
    if (fifthImageRef.current) {
      const { naturalWidth, naturalHeight } = fifthImageRef.current;
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    }
  };

  // Altıncı resim yüklendiğinde boyutları al
  const handleSixthImageLoad = () => {
    if (sixthImageRef.current) {
      const { naturalWidth, naturalHeight } = sixthImageRef.current;
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    }
  };

  // Çaydanlık pozisyonunu resimdeki işaretli konuma ayarla
  useEffect(() => {
    if (gameStarted) {
      if (selectedGame === "teapot") {
        setTeapotPosition({ x: 79, y: 27 });
      } else if (selectedGame === "ant") {
        setSecondImagePosition({ x: 56, y: 20 });
      } else if (selectedGame === "rhino") {
        setThirdImagePosition({ x: 60, y: 20 });
      } else if (selectedGame === "pen") {
        setFourthImagePosition({ x: 35, y: 60 });
      } else if (selectedGame === "frog") {
        setFifthImagePosition({ x: 90, y: 15 });
      } else if (selectedGame === "raccoon") {
        setSixthImagePosition({ x: 24, y: 20 }); // Rakun pozisyonu - siz güncelleyeceksiniz
      }
    }
  }, [gameStarted, selectedGame]);

  // Çaydanlık oyununu başlat
  const startTeapotGame = () => {
    setSelectedGame("teapot");
    setGameStarted(true);
    setGameState("playing");
    setTimeLeft(0);
    setScore(0);
    setTeapotFound(false);
    setClickAttempts(0);
    setCurrentImage(1);
  };

  // Karınca oyununu başlat
  const startAntGame = () => {
    setSelectedGame("ant");
    setGameStarted(true);
    setGameState("playing");
    setTimeLeft(0);
    setScore(0);
    setSecondImageFound(false);
    setSecondImageClickAttempts(0);
    setCurrentImage(2);
  };

  // Gergedan oyununu başlat
  const startRhinoGame = () => {
    setSelectedGame("rhino");
    setGameStarted(true);
    setGameState("playing");
    setTimeLeft(0);
    setScore(0);
    setThirdImageFound(false);
    setThirdImageClickAttempts(0);
    setCurrentImage(3);
  };

  // Kalem oyununu başlat
  const startPenGame = () => {
    setSelectedGame("pen");
    setGameStarted(true);
    setGameState("playing");
    setTimeLeft(0);
    setScore(0);
    setFourthImageFound(false);
    setFourthImageClickAttempts(0);
    setCurrentImage(4);
  };

  // Kurbağa oyununu başlat
  const startFrogGame = () => {
    setSelectedGame("frog");
    setGameStarted(true);
    setGameState("playing");
    setTimeLeft(0);
    setScore(0);
    setFifthImageFound(false);
    setFifthImageClickAttempts(0);
    setCurrentImage(5);
  };

  // Rakun oyununu başlat
  const startRaccoonGame = () => {
    setSelectedGame("raccoon");
    setGameStarted(true);
    setGameState("playing");
    setTimeLeft(0);
    setScore(0);
    setSixthImageFound(false);
    setSixthImageClickAttempts(0);
    setCurrentImage(6);
  };

  // Oyunu yeniden başlat
  const restartGame = () => {
    setGameStarted(false);
    setGameState("playing");
    setTimeLeft(0);
    setScore(0);
    setTeapotFound(false);
    setSecondImageFound(false);
    setThirdImageFound(false);
    setFourthImageFound(false);
    setFifthImageFound(false);
    setSixthImageFound(false);
    setClickAttempts(0);
    setSecondImageClickAttempts(0);
    setThirdImageClickAttempts(0);
    setFourthImageClickAttempts(0);
    setFifthImageClickAttempts(0);
    setSixthImageClickAttempts(0);
    setCurrentImage(1);
    setSelectedGame(null);
  };

  // Ana menüye dön
  const goToMenu = () => {
    setGameState("menu");
    setGameStarted(false);
    setTeapotFound(false);
    setSecondImageFound(false);
    setThirdImageFound(false);
    setFourthImageFound(false);
    setFifthImageFound(false);
    setSixthImageFound(false);
    setClickAttempts(0);
    setSecondImageClickAttempts(0);
    setThirdImageClickAttempts(0);
    setFourthImageClickAttempts(0);
    setFifthImageClickAttempts(0);
    setSixthImageClickAttempts(0);
    setScore(0);
    setTimeLeft(0);
    setSelectedGame(null);
  };

  // Çaydanlığı bul - İşaretli alan kontrolü
  const handleImageClick = (event) => {
    if (!gameStarted || teapotFound || selectedGame !== "teapot") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // İşaretli alan içinde tıklama kontrolü - Daha küçük tolerans
    if (
      teapotPosition &&
      Math.abs(x - teapotPosition.x) < 5 &&
      Math.abs(y - teapotPosition.y) < 5
    ) {
      setTeapotFound(true);
      setScore(100 + Math.floor(timeLeft / 10) * 10);
      setGameState("found");
    } else {
      setClickAttempts((prev) => prev + 1);

      const clickedElement = event.target;
      clickedElement.style.transform = "scale(0.95)";
      clickedElement.style.transition = "transform 0.1s";

      setTimeout(() => {
        clickedElement.style.transform = "scale(1)";
      }, 100);
    }
  };

  // İkinci resimdeki karıncayı bul
  const handleSecondImageClick = (event) => {
    if (!gameStarted || secondImageFound || selectedGame !== "ant") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Karınca pozisyonu kontrolü - %7 hassasiyet
    if (
      secondImagePosition &&
      Math.abs(x - secondImagePosition.x) < 7 &&
      Math.abs(y - secondImagePosition.y) < 7
    ) {
      setSecondImageFound(true);
      setScore(100 + Math.floor(timeLeft / 10) * 10);
      setGameState("found");
    } else {
      setSecondImageClickAttempts((prev) => prev + 1);

      const clickedElement = event.target;
      clickedElement.style.transform = "scale(0.95)";
      clickedElement.style.transition = "transform 0.1s";

      setTimeout(() => {
        clickedElement.style.transform = "scale(1)";
      }, 100);
    }
  };

  // Üçüncü resimdeki gergedanı bul
  const handleThirdImageClick = (event) => {
    if (!gameStarted || thirdImageFound || selectedGame !== "rhino") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Gergedan pozisyonu kontrolü - %5 hassasiyet
    if (
      thirdImagePosition &&
      Math.abs(x - thirdImagePosition.x) < 5 &&
      Math.abs(y - thirdImagePosition.y) < 5
    ) {
      setThirdImageFound(true);
      setScore(100 + Math.floor(timeLeft / 10) * 10);
      setGameState("found");
    } else {
      setThirdImageClickAttempts((prev) => prev + 1);

      const clickedElement = event.target;
      clickedElement.style.transform = "scale(0.95)";
      clickedElement.style.transition = "transform 0.1s";

      setTimeout(() => {
        clickedElement.style.transform = "scale(1)";
      }, 100);
    }
  };

  // Dördüncü resimdeki kalemi bul
  const handleFourthImageClick = (event) => {
    if (!gameStarted || fourthImageFound || selectedGame !== "pen") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Kalem pozisyonu kontrolü - %8 hassasiyet
    if (
      fourthImagePosition &&
      Math.abs(x - fourthImagePosition.x) < 8 &&
      Math.abs(y - fourthImagePosition.y) < 8
    ) {
      setFourthImageFound(true);
      setScore(100 + Math.floor(timeLeft / 10) * 10);
      setGameState("found");
    } else {
      setFourthImageClickAttempts((prev) => prev + 1);

      const clickedElement = event.target;
      clickedElement.style.transform = "scale(0.95)";
      clickedElement.style.transition = "transform 0.1s";

      setTimeout(() => {
        clickedElement.style.transform = "scale(1)";
      }, 100);
    }
  };

  // Beşinci resimdeki kurbağayı bul
  const handleFifthImageClick = (event) => {
    if (!gameStarted || fifthImageFound || selectedGame !== "frog") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Kurbağa pozisyonu kontrolü - %5 hassasiyet
    if (
      fifthImagePosition &&
      Math.abs(x - fifthImagePosition.x) < 5 &&
      Math.abs(y - fifthImagePosition.y) < 5
    ) {
      setFifthImageFound(true);
      setScore(100 + Math.floor(timeLeft / 10) * 10);
      setGameState("found");
    } else {
      setFifthImageClickAttempts((prev) => prev + 1);

      const clickedElement = event.target;
      clickedElement.style.transform = "scale(0.95)";
      clickedElement.style.transition = "transform 0.1s";

      setTimeout(() => {
        clickedElement.style.transform = "scale(1)";
      }, 100);
    }
  };

  // Altıncı resimdeki rakunu bul
  const handleSixthImageClick = (event) => {
    if (!gameStarted || sixthImageFound || selectedGame !== "raccoon") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Rakun pozisyonu kontrolü - %4 hassasiyet
    if (
      sixthImagePosition &&
      Math.abs(x - sixthImagePosition.x) < 4 &&
      Math.abs(y - sixthImagePosition.y) < 4
    ) {
      setSixthImageFound(true);
      setScore(100 + Math.floor(timeLeft / 10) * 10);
      setGameState("found");
    } else {
      setSixthImageClickAttempts((prev) => prev + 1);

      const clickedElement = event.target;
      clickedElement.style.transform = "scale(0.95)";
      clickedElement.style.transition = "transform 0.1s";

      setTimeout(() => {
        clickedElement.style.transform = "scale(1)";
      }, 100);
    }
  };

  // Ana sayfaya dön
  const goHome = () => {
    router.push("/");
  };

  // Ana menü ekranı
  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Görseldeki Etkinlikleri Bul
            </h1>
            <p className="text-xl text-gray-600">
              Her resimdeki gizli etkinlikleri bul ve üzerine tıkla!
            </p>
          </div>

          {/* Ana Sayfa Butonu */}
          {!embedded && (
            <div className="mb-8 text-center">
              <button
                onClick={goHome}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
              >
                🏠 Ana Sayfa
              </button>
            </div>
          )}

          {/* Etkinlik Seçimi */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {/* Çaydanlık Etkinliği */}
            {visibleGames.includes("teapot") && (
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">🫖</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Çaydanlık Bulma
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Oyun alanında gizlenmiş çaydanlığı bul ve üzerine tıkla!
                  </p>
                  <button
                    onClick={startTeapotGame}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-base transition-colors duration-200 shadow-lg w-full"
                  >
                    🎮 Başlat
                  </button>
                </div>
              </div>
            )}

            {/* Karınca Etkinliği */}
            {visibleGames.includes("ant") && (
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">🐜</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Karınca Bulma
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Ateşböcekleri arasında gizlenmiş karıncayı bul ve üzerine
                    tıkla!
                  </p>
                  <button
                    onClick={startAntGame}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-base transition-colors duration-200 shadow-lg w-full"
                  >
                    🎮 Başlat
                  </button>
                </div>
              </div>
            )}

            {/* Gergedan Etkinliği */}
            {visibleGames.includes("rhino") && (
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">🦏</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Gergedan Bulma
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Resimde gizlenmiş gergedanı bul ve üzerine tıkla!
                  </p>
                  <button
                    onClick={startRhinoGame}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-base transition-colors duration-200 shadow-lg w-full"
                  >
                    🎮 Başlat
                  </button>
                </div>
              </div>
            )}

            {/* Kalem Etkinliği */}
            {visibleGames.includes("pen") && (
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">✏️</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Kalem Bulma
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Resimde gizlenmiş kalemi bul ve üzerine tıkla!
                  </p>
                  <button
                    onClick={startPenGame}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg text-base transition-colors duration-200 shadow-lg w-full"
                  >
                    🎮 Başlat
                  </button>
                </div>
              </div>
            )}

            {/* Kurbağa Etkinliği */}
            {visibleGames.includes("frog") && (
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">🐸</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Kurbağa Bulma
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Resimde gizlenmiş kurbağayı bul ve üzerine tıkla!
                  </p>
                  <button
                    onClick={startFrogGame}
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg text-base transition-colors duration-200 shadow-lg w-full"
                  >
                    🎮 Başlat
                  </button>
                </div>
              </div>
            )}

            {/* Rakun Etkinliği */}
            {visibleGames.includes("raccoon") && (
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">🦝</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Rakun Bulma
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Resimde gizlenmiş rakunu bul ve üzerine tıkla!
                  </p>
                  <button
                    onClick={startRaccoonGame}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg text-base transition-colors duration-200 shadow-lg w-full"
                  >
                    🎮 Başlat
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {selectedGame === "teapot"
              ? "Çaydanlık Bulma"
              : selectedGame === "ant"
              ? "Karınca Bulma"
              : selectedGame === "rhino"
              ? "Gergedan Bulma"
              : selectedGame === "pen"
              ? "Kalem Bulma"
              : selectedGame === "frog"
              ? "Kurbağa Bulma"
              : "Rakun Bulma"}
          </h1>
          <p className="text-lg text-gray-600">
            {selectedGame === "teapot"
              ? "Oyun alanında gizlenmiş çaydanlığı bul ve üzerine tıkla!"
              : selectedGame === "ant"
              ? "Ateşböcekleri arasında gizlenmiş karıncayı bul ve üzerine tıkla!"
              : selectedGame === "rhino"
              ? "Resimde gizlenmiş gergedanı bul ve üzerine tıkla!"
              : selectedGame === "pen"
              ? "Resimde gizlenmiş kalemi bul ve üzerine tıkla!"
              : selectedGame === "frog"
              ? "Resimde gizlenmiş kurbağayı bul ve üzerine tıkla!"
              : "Resimde gizlenmiş rakunu bul ve üzerine tıkla!"}
          </p>
        </div>

        {/* Kontrol Butonları */}
        <div className="mb-6 text-center space-x-4">
          <button
            onClick={goToMenu}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            📋 Etkinlik Seçimi
          </button>
          {!embedded && (
            <button
              onClick={goHome}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              🏠 Ana Sayfa
            </button>
          )}
        </div>

        {/* Oyun Kontrolleri */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">🎯</div>
              <div className="text-lg font-semibold text-green-800">
                {score}
              </div>
              <div className="text-sm text-green-600">Puan</div>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {selectedGame === "teapot"
                  ? "🫖"
                  : selectedGame === "ant"
                  ? "🐜"
                  : selectedGame === "rhino"
                  ? "🦏"
                  : selectedGame === "pen"
                  ? "✏️"
                  : selectedGame === "frog"
                  ? "🐸"
                  : "🦝"}
              </div>
              <div className="text-lg font-semibold text-purple-800">
                {selectedGame === "teapot"
                  ? teapotFound
                    ? "1/1"
                    : "0/1"
                  : selectedGame === "ant"
                  ? secondImageFound
                    ? "1/1"
                    : "0/1"
                  : selectedGame === "rhino"
                  ? thirdImageFound
                    ? "1/1"
                    : "0/1"
                  : selectedGame === "pen"
                  ? fourthImageFound
                    ? "1/1"
                    : "0/1"
                  : selectedGame === "frog"
                  ? fifthImageFound
                    ? "1/1"
                    : "0/1"
                  : sixthImageFound
                  ? "1/1"
                  : "0/1"}
              </div>
              <div className="text-sm text-purple-600">
                {selectedGame === "teapot"
                  ? "Çaydanlık"
                  : selectedGame === "ant"
                  ? "Karınca"
                  : selectedGame === "rhino"
                  ? "Gergedan"
                  : selectedGame === "pen"
                  ? "Kalem"
                  : selectedGame === "frog"
                  ? "Kurbağa"
                  : "Rakun"}
              </div>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">🎯</div>
              <div className="text-lg font-semibold text-orange-800">
                {selectedGame === "teapot"
                  ? clickAttempts
                  : selectedGame === "ant"
                  ? secondImageClickAttempts
                  : selectedGame === "rhino"
                  ? thirdImageClickAttempts
                  : selectedGame === "pen"
                  ? fourthImageClickAttempts
                  : selectedGame === "frog"
                  ? fifthImageClickAttempts
                  : sixthImageClickAttempts}
              </div>
              <div className="text-sm text-orange-600">Deneme</div>
            </div>
          </div>
        </div>

        {/* Çaydanlık Oyunu */}
        {selectedGame === "teapot" && (
          <div className="relative bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Oyun Alanında Çaydanlığı Ara!
              </h2>
              {!teapotFound && (
                <p className="text-gray-600">
                  Resimdeki gizli çaydanlığı bul ve üzerine tıkla!
                </p>
              )}
              {teapotFound && (
                <p className="text-green-600 font-semibold">
                  🎉 Tebrikler! Çaydanlığı buldun!
                </p>
              )}
            </div>

            {/* Resim Konteyneri */}
            <div className="relative w-full max-w-4xl mx-auto">
              <img
                ref={imageRef}
                src="/caydanlik.png"
                alt="Oyun alanında gizlenmiş çaydanlık"
                className="w-full h-auto rounded-lg shadow-lg border-4 border-blue-200 cursor-crosshair select-none"
                onLoad={handleImageLoad}
                onClick={handleImageClick}
                draggable={false}
              />

              {/* Bulunan Çaydanlık */}
              {teapotFound && teapotPosition && (
                <div
                  className="absolute w-16 h-16"
                  style={{
                    left: `${teapotPosition.x}%`,
                    top: `${teapotPosition.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <div className="w-full h-full border-4 border-green-500 rounded-full flex items-center justify-center bg-green-100 bg-opacity-50 shadow-lg animate-pulse">
                    <div className="text-green-600 text-lg font-bold">✅</div>
                  </div>
                </div>
              )}

              {/* Hassasiyet Göstergesi */}
              {!teapotFound && (
                <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg text-xs font-bold">
                  🎯 Hassasiyet: %5
                </div>
              )}
            </div>

            {/* Oyun İpuçları */}
            {!teapotFound && (
              <div className="mt-4 bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
                <p className="text-blue-800 font-semibold">
                  İpucu: Çaydanlık figürünü bul ve üzerine tıkla!
                  <br />
                  <span className="text-sm">
                    Çaydanlık, resimde mavi daire ile işaretlenmiş alanda
                    gizlenmiş! Büyük ağacın gövdesinde, işaretli bölgeyi bul ve
                    tıkla!
                  </span>
                  <br />
                  <span className="text-xs text-red-600 mt-2 block">
                    ⚠️ Yanlış tıklamalar: {clickAttempts} | Tolerans: %5
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Karınca Oyunu */}
        {selectedGame === "ant" && (
          <div className="relative bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Ateşböcekleri Arasında Karıncayı Ara!
              </h2>
              {!secondImageFound && (
                <p className="text-gray-600">
                  Ateşböcekleri arasında gizlenmiş karıncayı bul ve üzerine
                  tıkla!
                </p>
              )}
              {secondImageFound && (
                <p className="text-green-600 font-semibold">
                  🎉 Tebrikler! Karıncayı buldun!
                </p>
              )}
            </div>

            {/* İkinci Resim Konteyneri */}
            <div className="relative w-full max-w-4xl mx-auto">
              <img
                ref={secondImageRef}
                src="/karinca.png"
                alt="Ateşböcekleri arasında gizlenmiş karınca"
                className="w-full h-auto rounded-lg shadow-lg border-4 border-yellow-200 cursor-crosshair select-none"
                onLoad={handleSecondImageLoad}
                onClick={handleSecondImageClick}
                draggable={false}
              />

              {/* Bulunan Karınca */}
              {secondImageFound && secondImagePosition && (
                <div
                  className="absolute w-16 h-16"
                  style={{
                    left: `${secondImagePosition.x}%`,
                    top: `${secondImagePosition.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <div className="w-full h-full border-4 border-green-500 rounded-full flex items-center justify-center bg-green-100 bg-opacity-50 shadow-lg animate-pulse">
                    <div className="text-green-600 text-lg font-bold">✅</div>
                  </div>
                </div>
              )}

              {/* Hassasiyet Göstergesi */}
              {!secondImageFound && (
                <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg text-xs font-bold">
                  🎯 Hassasiyet: %7
                </div>
              )}
            </div>

            {/* Oyun İpuçları */}
            {!secondImageFound && (
              <div className="mt-4 bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 text-center">
                <p className="text-yellow-800 font-semibold">
                  İpucu: Ateşböcekleri arasında gizlenmiş karıncayı bul!
                  <br />
                  <span className="text-sm">
                    Karınca, ateşböceklerinden farklı olarak 6 bacaklı ve farklı
                    vücut yapısına sahip! Kırmızı-mavi daire ile işaretlenmiş
                    alanda gizlenmiş.
                  </span>
                  <br />
                  <span className="text-xs text-red-600 mt-2 block">
                    ⚠️ Yanlış tıklamalar: {secondImageClickAttempts} | Tolerans:
                    %7
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Gergedan Oyunu */}
        {selectedGame === "rhino" && (
          <div className="relative bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Resimde Gergedanı Ara!
              </h2>
              {!thirdImageFound && (
                <p className="text-gray-600">
                  Resimde gizlenmiş gergedanı bul ve üzerine tıkla!
                </p>
              )}
              {thirdImageFound && (
                <p className="text-green-600 font-semibold">
                  🎉 Tebrikler! Gergedanı buldun!
                </p>
              )}
            </div>

            {/* Üçüncü Resim Konteyneri */}
            <div className="relative w-full max-w-4xl mx-auto">
              <img
                ref={thirdImageRef}
                src="/gergedan.png"
                alt="Resimde gizlenmiş gergedan"
                className="w-full h-auto rounded-lg shadow-lg border-4 border-orange-200 cursor-crosshair select-none"
                onLoad={handleThirdImageLoad}
                onClick={handleThirdImageClick}
                draggable={false}
              />

              {/* Bulunan Gergedan */}
              {thirdImageFound && thirdImagePosition && (
                <div
                  className="absolute w-16 h-16"
                  style={{
                    left: `${thirdImagePosition.x}%`,
                    top: `${thirdImagePosition.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <div className="w-full h-full border-4 border-green-500 rounded-full flex items-center justify-center bg-green-100 bg-opacity-50 shadow-lg animate-pulse">
                    <div className="text-green-600 text-lg font-bold">✅</div>
                  </div>
                </div>
              )}

              {/* Hassasiyet Göstergesi */}
              {!thirdImageFound && (
                <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg text-xs font-bold">
                  🎯 Hassasiyet: %5
                </div>
              )}
            </div>

            {/* Oyun İpuçları */}
            {!thirdImageFound && (
              <div className="mt-4 bg-orange-100 border-2 border-orange-300 rounded-lg p-4 text-center">
                <p className="text-orange-800 font-semibold">
                  İpucu: Resimde gizlenmiş gergedanı bul!
                  <br />
                  <span className="text-sm">
                    Gergedan, resimde işaretlenmiş alanda gizlenmiş! Dikkatli
                    bak ve doğru yeri bul!
                  </span>
                  <br />
                  <span className="text-xs text-red-600 mt-2 block">
                    ⚠️ Yanlış tıklamalar: {thirdImageClickAttempts} | Tolerans:
                    %5
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Kalem Oyunu */}
        {selectedGame === "pen" && (
          <div className="relative bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Resimde Kalemi Ara!
              </h2>
              {!fourthImageFound && (
                <p className="text-gray-600">
                  Resimde gizlenmiş kalemi bul ve üzerine tıkla!
                </p>
              )}
              {fourthImageFound && (
                <p className="text-green-600 font-semibold">
                  🎉 Tebrikler! Kalemi buldun!
                </p>
              )}
            </div>

            {/* Dördüncü Resim Konteyneri */}
            <div className="relative w-full max-w-4xl mx-auto">
              <img
                ref={fourthImageRef}
                src="/kalem.png"
                alt="Resimde gizlenmiş kalem"
                className="w-full h-auto rounded-lg shadow-lg border-4 border-pink-200 cursor-crosshair select-none"
                onLoad={handleFourthImageLoad}
                onClick={handleFourthImageClick}
                draggable={false}
              />

              {/* Bulunan Kalem */}
              {fourthImageFound && fourthImagePosition && (
                <div
                  className="absolute w-16 h-16"
                  style={{
                    left: `${fourthImagePosition.x}%`,
                    top: `${fourthImagePosition.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <div className="w-full h-full border-4 border-green-500 rounded-full flex items-center justify-center bg-green-100 bg-opacity-50 shadow-lg animate-pulse">
                    <div className="text-green-600 text-lg font-bold">✅</div>
                  </div>
                </div>
              )}

              {/* Hassasiyet Göstergesi */}
              {!fourthImageFound && (
                <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg text-xs font-bold">
                  🎯 Hassasiyet: %6
                </div>
              )}
            </div>

            {/* Oyun İpuçları */}
            {!fourthImageFound && (
              <div className="mt-4 bg-pink-100 border-2 border-pink-300 rounded-lg p-4 text-center">
                <p className="text-pink-800 font-semibold">
                  İpucu: Resimde gizlenmiş kalemi bul!
                  <br />
                  <span className="text-sm">
                    Kalem, resimde işaretlenmiş alanda gizlenmiş! Dikkatli bak
                    ve doğru yeri bul!
                  </span>
                  <br />
                  <span className="text-xs text-red-600 mt-2 block">
                    ⚠️ Yanlış tıklamalar: {fourthImageClickAttempts} | Tolerans:
                    %6
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Kurbağa Oyunu */}
        {selectedGame === "frog" && (
          <div className="relative bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Resimde Kurbağayı Ara!
              </h2>
              {!fifthImageFound && (
                <p className="text-gray-600">
                  Resimde gizlenmiş kurbağayı bul ve üzerine tıkla!
                </p>
              )}
              {fifthImageFound && (
                <p className="text-green-600 font-semibold">
                  🎉 Tebrikler! Kurbağayı buldun!
                </p>
              )}
            </div>

            {/* Beşinci Resim Konteyneri */}
            <div className="relative w-full max-w-4xl mx-auto">
              <img
                ref={fifthImageRef}
                src="/kurbaga.png"
                alt="Resimde gizlenmiş kurbağa"
                className="w-full h-auto rounded-lg shadow-lg border-4 border-teal-200 cursor-crosshair select-none"
                onLoad={handleFifthImageLoad}
                onClick={handleFifthImageClick}
                draggable={false}
              />

              {/* Bulunan Kurbağa */}
              {fifthImageFound && fifthImagePosition && (
                <div
                  className="absolute w-16 h-16"
                  style={{
                    left: `${fifthImagePosition.x}%`,
                    top: `${fifthImagePosition.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <div className="w-full h-full border-4 border-green-500 rounded-full flex items-center justify-center bg-green-100 bg-opacity-50 shadow-lg animate-pulse">
                    <div className="text-green-600 text-lg font-bold">✅</div>
                  </div>
                </div>
              )}

              {/* Hassasiyet Göstergesi */}
              {!fifthImageFound && (
                <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg text-xs font-bold">
                  🎯 Hassasiyet: %5
                </div>
              )}
            </div>

            {/* Oyun İpuçları */}
            {!fifthImageFound && (
              <div className="mt-4 bg-teal-100 border-2 border-teal-300 rounded-lg p-4 text-center">
                <p className="text-teal-800 font-semibold">
                  İpucu: Resimde gizlenmiş kurbağayı bul!
                  <br />
                  <span className="text-sm">
                    Kurbağa, resimde işaretlenmiş alanda gizlenmiş! Dikkatli bak
                    ve doğru yeri bul!
                  </span>
                  <br />
                  <span className="text-xs text-red-600 mt-2 block">
                    ⚠️ Yanlış tıklamalar: {fifthImageClickAttempts} | Tolerans:
                    %5
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Rakun Oyunu */}
        {selectedGame === "raccoon" && (
          <div className="relative bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Resimde Rakunu Ara!
              </h2>
              {!sixthImageFound && (
                <p className="text-gray-600">
                  Resimde gizlenmiş rakunu bul ve üzerine tıkla!
                </p>
              )}
              {sixthImageFound && (
                <p className="text-green-600 font-semibold">
                  🎉 Tebrikler! Rakunu buldun!
                </p>
              )}
            </div>

            {/* Altıncı Resim Konteyneri */}
            <div className="relative w-full max-w-4xl mx-auto">
              <img
                ref={sixthImageRef}
                src="/rakun.png"
                alt="Resimde gizlenmiş rakun"
                className="w-full h-auto rounded-lg shadow-lg border-4 border-indigo-200 cursor-crosshair select-none"
                onLoad={handleSixthImageLoad}
                onClick={handleSixthImageClick}
                draggable={false}
              />

              {/* Bulunan Rakun */}
              {sixthImageFound && sixthImagePosition && (
                <div
                  className="absolute w-16 h-16"
                  style={{
                    left: `${sixthImagePosition.x}%`,
                    top: `${sixthImagePosition.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <div className="w-full h-full border-4 border-green-500 rounded-full flex items-center justify-center bg-green-100 bg-opacity-50 shadow-lg animate-pulse">
                    <div className="text-green-600 text-lg font-bold">✅</div>
                  </div>
                </div>
              )}

              {/* Hassasiyet Göstergesi */}
              {!sixthImageFound && (
                <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg text-xs font-bold">
                  🎯 Hassasiyet: %4
                </div>
              )}
            </div>

            {/* Oyun İpuçları */}
            {!sixthImageFound && (
              <div className="mt-4 bg-indigo-100 border-2 border-indigo-300 rounded-lg p-4 text-center">
                <p className="text-indigo-800 font-semibold">
                  İpucu: Resimde gizlenmiş rakunu bul!
                  <br />
                  <span className="text-sm">
                    Rakun, resimde işaretlenmiş alanda gizlenmiş! Dikkatli bak
                    ve doğru yeri bul!
                  </span>
                  <br />
                  <span className="text-xs text-red-600 mt-2 block">
                    ⚠️ Yanlış tıklamalar: {sixthImageClickAttempts} | Tolerans:
                    %4
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Oyun Sonu Mesajları */}
        {gameState === "found" && (
          <div className="bg-green-100 border-4 border-green-300 rounded-lg p-8 text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Tebrikler!{" "}
              {selectedGame === "teapot"
                ? "Çaydanlığı"
                : selectedGame === "ant"
                ? "Karıncayı"
                : selectedGame === "rhino"
                ? "Gergedanı"
                : selectedGame === "pen"
                ? "Kalemi"
                : selectedGame === "frog"
                ? "Kurbağayı"
                : "Rakunu"}{" "}
              Buldun!
            </h2>
            <p className="text-xl text-green-700 mb-6">
              Toplam Puanın: <span className="font-bold">{score}</span>
            </p>
            <p className="text-md text-green-600 mb-6">
              Toplam Deneme:{" "}
              <span className="font-bold">
                {selectedGame === "teapot"
                  ? clickAttempts
                  : selectedGame === "ant"
                  ? secondImageClickAttempts
                  : selectedGame === "rhino"
                  ? thirdImageClickAttempts
                  : selectedGame === "pen"
                  ? fourthImageClickAttempts
                  : selectedGame === "frog"
                  ? fifthImageClickAttempts
                  : sixthImageClickAttempts}
              </span>
            </p>
            <div className="space-x-4">
              <button
                onClick={restartGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
              >
                🔄 Tekrar Oyna
              </button>
              <button
                onClick={goToMenu}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
              >
                📋 Etkinlik Seçimi
              </button>
              <button
                onClick={goHome}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
              >
                🏠 Ana Sayfa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
