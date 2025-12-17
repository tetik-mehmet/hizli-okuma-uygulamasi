"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  Clock,
  Target,
  Trophy,
  Star,
  Play,
  CheckCircle,
  X,
  Zap,
  Heart,
  Puzzle,
  Timer,
  Brain,
  Eye,
  Search,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

const PARAGRAF = `Hızlı okuma, günümüz bilgi çağında oldukça önemli bir beceridir. Her gün karşılaştığımız metinlerin, makalelerin ve kitapların sayısı arttıkça, bu metinleri daha kısa sürede ve daha iyi anlayarak okumak büyük bir avantaj sağlar. Hızlı okuma teknikleri, göz kaslarını güçlendirmek, kelime gruplarını bir arada görmek ve gereksiz iç seslendirmeyi azaltmak gibi yöntemleri içerir. Bu sayede, hem okuma hızınız artar hem de anlama düzeyiniz yükselir. Unutmayın, hızlı okuma sadece daha hızlı göz gezdirmek değil, aynı zamanda okuduğunuzu anlamak ve hatırlamak anlamına gelir. Şimdi bu paragrafı dikkatlice okuyun ve bitirdiğinizde 'Bitti' butonuna basarak okuma sürenizi ölçün. Hedefiniz, her seferinde biraz daha hızlı ve daha iyi anlamak olmalı. Başarılar!`;

const MOTIVASYONLAR = [
  "Harikasın! 🚀",
  "Süper hız! ⚡",
  "Mükemmel odak! 🎯",
  "Bravo! 👏",
  "Okuma şampiyonu! 🏆",
  "İnanılmaz! 🌟",
  "Muhteşem! 🎉",
  "Harika iş! 🎊",
];

const HEDEF_SURE = 20;

const HECE_ALISTIRMASI = [
  { id: 1, heceler: ["RA", "KA", "MA"], cevap: "MAKARA" },
  { id: 2, heceler: ["TAP", "I", "NAK"], cevap: "TAPINAK" },
  { id: 4, heceler: ["REV", "GÖ", "Lİ"], cevap: "GÖREVLİ" },
  { id: 5, heceler: ["LE", "MEK", "İZ"], cevap: "İZLEMEK" },
  { id: 6, heceler: ["MAK", "ĞIR", "ÇA"], cevap: "ÇAĞIRMAK" },
  { id: 7, heceler: ["Cİ", "KAH", "VE"], cevap: "KAHVECİ" },
  { id: 8, heceler: ["GE", "PÜR", "SÜ"], cevap: "SÜPÜRGE" },
  { id: 9, heceler: ["ÇI", "YIK", "KA"], cevap: "KAYIKÇI" },
  { id: 10, heceler: ["O", "CU", "YUN"], cevap: "OYUNCU" },
  { id: 11, heceler: ["LIK", "ME", "ZAR"], cevap: "MEZARLIK" },
  { id: 12, heceler: ["ÇA", "KAN", "LIŞ"], cevap: "ÇALIŞKAN" },
  { id: 13, heceler: ["DİK", "Lİ", "KAT"], cevap: "DİKKATLİ" },
];

// Yeni hece alıştırması verileri (resimdeki veriler)
const HECE_ALISTIRMASI_2 = [
  { id: 1, heceler: ["LIK", "Kİ", "RA"], cevap: "KİRALIK" },
  { id: 2, heceler: ["PI", "ÇAR", "CI"], cevap: "ÇARPICI" },
  { id: 3, heceler: ["ÇIR", "CI", "PI"], cevap: "ÇIRPICI" },
  { id: 4, heceler: ["Sİ", "BE", "Lİ"], cevap: "BESİLİ" },
  { id: 5, heceler: ["U", "LI", "ZAY"], cevap: "UZAYLI" },
  { id: 6, heceler: ["DER", "MEK", "Gİ"], cevap: "GİDERMEK" },
  { id: 7, heceler: ["İH", "YAÇ", "Tİ"], cevap: "İHTİYAÇ" },
  { id: 8, heceler: ["CA", "KIN", "SA"], cevap: "SAKINCA" },
  { id: 9, heceler: ["KUV", "Lİ", "VET"], cevap: "KUVVETLİ" },
  { id: 10, heceler: ["LUK", "ÇO", "CUK"], cevap: "ÇOCUKLUK" },
  { id: 11, heceler: ["Lİ", "MET", "ZAH"], cevap: "ZAHMETLİ" },
  { id: 12, heceler: ["PIŞ", "YA", "KAN"], cevap: "YAPIŞKAN" },
  { id: 13, heceler: ["GE", "Lİ", "DİK"], cevap: "GEDİKLİ" },
];

// 3. sayfa hece alıştırması verileri (resimdeki yeni veriler)
const HECE_ALISTIRMASI_3 = [
  { id: 1, heceler: ["LA", "PA", "MUT"], cevap: "PALAMUT" },
  { id: 2, heceler: ["CA", "KA", "RIN"], cevap: "KARINCA" },
  { id: 3, heceler: ["BEK", "TE", "KÖS"], cevap: "KÖSTEBEK" },
  { id: 4, heceler: ["T", "PET", "ROM"], cevap: "TROMPET" },
  { id: 5, heceler: ["LA", "MU", "MUŞ"], cevap: "MUŞMULA" },
  { id: 6, heceler: ["KİR", "ÇE", "GE"], cevap: "ÇEKİRGE" },
  { id: 7, heceler: ["RA", "RET", "HA"], cevap: "HARARET" },
  { id: 8, heceler: ["LAN", "BU", "TI"], cevap: "BULANTI" },
  { id: 9, heceler: ["B", "ŞİT", "RON"], cevap: "BRONŞİT" },
  { id: 10, heceler: ["ZİT", "NÜ", "Sİ"], cevap: "SİNÜZİT" },
  { id: 11, heceler: ["VİL", "Sİ", "CE"], cevap: "SİVİLCE" },
  { id: 12, heceler: ["TİT", "MEK", "RE"], cevap: "TİTREMEK" },
  { id: 13, heceler: ["YIF", "LIK", "ZA"], cevap: "ZAYIFLIK" },
];

const STROOP_ALISTIRMASI = [
  // Satır 1
  { id: 1, kelime: "KAHVERENGİ", renk: "black" },
  { id: 2, kelime: "MAVİ", renk: "yellow" },
  { id: 3, kelime: "BEYAZ", renk: "orange" },
  { id: 4, kelime: "KIRMIZI", renk: "blue" },
  { id: 5, kelime: "PEMBE", renk: "purple" },
  { id: 6, kelime: "YEŞİL", renk: "gray" },
  { id: 7, kelime: "MÜRDÜM", renk: "black" },

  // Satır 2
  { id: 8, kelime: "GRİ", renk: "red" },
  { id: 9, kelime: "MOR", renk: "red" },
  { id: 10, kelime: "LACİVERT", renk: "green" },
  { id: 11, kelime: "SİYAH", renk: "yellow" },
  { id: 12, kelime: "TURUNCU", renk: "black" },
  { id: 13, kelime: "LİLA", renk: "black" },
  { id: 14, kelime: "HAKİ", renk: "lightblue" },
  { id: 15, kelime: "ANTRASİT", renk: "lightblue" },

  // Satır 3
  { id: 16, kelime: "SARI", renk: "black" },
  { id: 17, kelime: "FUŞYA", renk: "purple" },
  { id: 18, kelime: "KREM", renk: "black" },
  { id: 19, kelime: "BEJ", renk: "yellow" },
  { id: 20, kelime: "TURKUAZ", renk: "green" },
  { id: 21, kelime: "MAVİ", renk: "red" },
  { id: 22, kelime: "BEYAZ", renk: "black" },
  { id: 23, kelime: "SİYAH", renk: "red" },
  { id: 24, kelime: "GRİ", renk: "gray" },

  // Satır 4
  { id: 25, kelime: "KIRMIZI", renk: "green" },
  { id: 26, kelime: "SARI", renk: "lightblue" },
  { id: 27, kelime: "LACİVERT", renk: "black" },
  { id: 28, kelime: "PEMBE", renk: "yellow" },
  { id: 29, kelime: "YEŞİL", renk: "green" },
  { id: 30, kelime: "TURUNCU", renk: "red" },
  { id: 31, kelime: "BEJ", renk: "black" },
  { id: 32, kelime: "MOR", renk: "black" },
];

const MEVSIM_METNI = `Türkiye'de bir yılda dört mevsim vardır. İlkbahar, yaz, sonbahar ve kış. İlkbahar ayları mart, nisan, mayıs aylarıdır. İlkbaharda güneş daha erken doğar ve daha geç batar. Günler uzar. Ağaçlar çiçek açar. Doğa yeşillenir. Hayvanlar kış uykusundan uyanır. Göçmen kuşlar gelir. Sık sık yağmur yağar. Gök gürültüsü ve şimşek olur. Hava ılık olur. İlkbahar temizliği yapılır. Yaz ayları haziran, temmuz, ağustos aylarıdır. Yazda hava ısınır. Okullar tatil olur. Sular ısınır. İnsanlar denize, dağa, ormana gider. Güneş ve deniz sağlığa faydalıdır. Meyveler ve sebzeler olgunlaşır. Bitkiler büyür. Sonbahar ayları eylül, ekim, kasım aylarıdır. Sonbaharda günler kısalır. Hava çok sıcak olmaz. Sık sık yağmur yağar. Kalın giysiler giyilir. Okullar açılır. Kış ayları aralık, ocak, şubat aylarıdır. Kışta hava çok soğur. Günler kısa, geceler uzun olur. Ağaçlar yapraklarını döker. Çam ağacı gibi her zaman yeşil kalan ağaçlar vardır. En kalın giysiler giyilir. Hasta olmamak ve üşümemek için dikkatli olunur.`;

const KELIME_BULMA_ALISTIRMALARI = [
  {
    id: 1,
    baslik: "Mevsim",
    arananKelime: "mevsim",
    metin: `Türkiye'de bir yılda dört mevsim vardır. İlkbahar, yaz, sonbahar ve kış. İlkbahar ayları mart, nisan, mayıs aylarıdır. İlkbaharda güneş daha erken doğar ve daha geç batar. Günler uzar. Ağaçlar çiçek açar. Doğa yeşillenir. Hayvanlar kış uykusundan uyanır. Göçmen kuşlar gelir. Sık sık yağmur yağar. Gök gürültüsü ve şimşek olur. Hava ılık olur. İlkbahar temizliği yapılır. Yaz ayları haziran, temmuz, ağustos aylarıdır. Yazda hava ısınır. Okullar tatil olur. Sular ısınır. İnsanlar denize, dağa, ormana gider. Güneş ve deniz sağlığa faydalıdır. Meyveler ve sebzeler olgunlaşır. Bitkiler büyür. Sonbahar ayları eylül, ekim, kasım aylarıdır. Sonbaharda günler kısalır. Hava çok sıcak olmaz. Sık sık yağmur yağar. Kalın giysiler giyilir. Okullar açılır. Kış ayları aralık, ocak, şubat aylarıdır. Kışta hava çok soğur. Günler kısa, geceler uzun olur. Ağaçlar yapraklarını döker. Çam ağacı gibi her zaman yeşil kalan ağaçlar vardır. En kalın giysiler giyilir. Hasta olmamak ve üşümemek için dikkatli olunur.`,
    dogruCevap: 4,
  },
  {
    id: 2,
    baslik: "Teknoloji",
    arananKelime: "teknoloji",
    metin: `Günümüzde teknoloji hayatımızın vazgeçilmez bir parçası haline gelmiştir. Teknoloji sayesinde iletişim kurmak çok kolaylaştı. Telefonlar, bilgisayarlar ve internet teknolojisi sayesinde dünyanın her yerinden insanlarla anında iletişim kurabiliyoruz. Teknoloji eğitim alanında da büyük kolaylıklar sağlıyor. Öğrenciler teknoloji kullanarak daha etkili öğrenme yapabiliyorlar. Teknoloji sağlık sektöründe de devrim yaratıyor. Modern teknoloji sayesinde hastalıklar daha erken teşhis edilebiliyor. Teknoloji ulaşım alanında da büyük gelişmeler getiriyor. Hızlı trenler, elektrikli araçlar ve uçaklar teknoloji sayesinde geliştirildi. Teknoloji ev hayatımızı da kolaylaştırıyor. Akıllı ev sistemleri teknoloji ile kontrol edilebiliyor. Teknoloji iş dünyasında da verimliliği artırıyor. Teknoloji sayesinde işler daha hızlı ve doğru yapılabiliyor. Teknoloji eğlence sektöründe de büyük yenilikler getiriyor. Teknoloji ile oyunlar daha gerçekçi hale geliyor. Teknoloji gelecekte daha da gelişecek ve hayatımızı daha da kolaylaştıracak.`,
    dogruCevap: 8,
  },
  {
    id: 3,
    baslik: "Spor",
    arananKelime: "spor",
    metin: `Spor sağlıklı bir yaşam için çok önemlidir. Düzenli spor yapmak vücudumuzu güçlendirir. Spor yaparken kalp atışlarımız hızlanır ve kan dolaşımımız artar. Spor yapmak kaslarımızı geliştirir ve kemiklerimizi güçlendirir. Spor yaparken ter atarız ve bu sayede vücudumuzdaki toksinler atılır. Spor yapmak aynı zamanda ruh sağlığımız için de faydalıdır. Spor yaparken endorfin hormonu salgılanır ve bu bizi mutlu eder. Spor yapmak stresi azaltır ve uyku kalitemizi artırır. Spor yapmak sosyal ilişkilerimizi de geliştirir. Takım sporları sayesinde arkadaşlık kurarız. Spor yapmak disiplinli olmamızı sağlar. Spor yaparken hedefler koyarız ve bu hedeflere ulaşmak için çaba gösteririz. Spor yapmak özgüvenimizi artırır. Spor yaparken başarılar elde ederiz ve bu bizi gururlandırır. Spor yapmak yaşam kalitemizi artırır. Spor yapan insanlar daha enerjik ve dinamik olur. Spor yapmak yaşlanmayı geciktirir. Spor yapan insanlar daha uzun ve sağlıklı yaşar.`,
    dogruCevap: 6,
  },
];

const KELIME_TAKIP_ALISTIRMASI = [
  { id: 1, sol: "OVA", sag: "DİŞ" },
  { id: 2, sol: "BUZ", sag: "KUŞ" },
  { id: 3, sol: "KAŞ", sag: "BAŞ" },
  { id: 4, sol: "BEZ", sag: "KEK" },
  { id: 5, sol: "ELMA", sag: "KAYIK" },
  { id: 6, sol: "AYRAN", sag: "VAPUR" },
  { id: 7, sol: "ARABA", sag: "BİNA" },
  { id: 8, sol: "SİTE", sag: "KOLA" },
  { id: 9, sol: "ARI", sag: "KOVAN" },
];

// Yeni harf bulma alıştırması verisi - 4 farklı set
const HARF_BULMA_ALISTIRMALARI = [
  {
    id: 1,
    baslik: "Set 1 - BV Harfleri",
    arananHarf: "BV",
    veriler: [
      "ETETEBVDEFFEYYHUJOOBVYUPRPRBSBSDSDMKKMKMKMKLPLPS",
      "SDSSDTYTYTYBVEREREETTECBCBCBCBCBNMNMKLKLOPOPSYSYSR",
      "ŞKŞKSADSADBEVBEVDEDEBVTYTYUUUOPOPOPÜTÜTFEDFEDNMT",
      "MUVBUVDERTESBVZSCCCCFERTUYYUPBVSSSDDHPLEDVBDVAETT",
      "DVRUBSİRCVVMNNBVLLLLARPPOOZZYYUUUFFFEEESSSKKKLLLAAR",
      "ZZSZSTYUUDVTTBVEEPRTTTYIIBVOOLOKJUUHEEMMUNİLEİİİPPPK",
      "BBBBTTTVVVVEEEŞŞŞLLKKKKHHHBBBBMMMVVVVUUMMMAAAK",
      "ŞEŞEŞTYTYTYIIIPOMUNSSSDCCCBVLKJHGFFFFDDEEEUMOOODEFDR",
      "YPRUBBDDMDVDVBBVERTYYYĞÜÜŞŞĞUOPLKJHGDDHEFKJLBVLLLF",
      "ARTTRADCVVVNBBBNNNHKLĞĞPOIUTUĞÜŞLLĞİÇÖÖÖAEDBBBDVN",
      "TBRBDVMUNNPPRYTIŞŞÇMNBBBVTVĞLKMUVERFDCXPORIFFUULN",
      "ÇZRTÇZEDSCCVVHIUYTREBBDDDCCVVVBBMMÜĞPRBVRUPPUTYBN",
    ],
    dogruCevap: 12,
  },
  {
    id: 2,
    baslik: "Set 2 - AB Harfleri",
    arananHarf: "AB",
    veriler: [
      "KLMNABOPQRSTUVWXYZABDEFGHIJKLMNOPQRSTUVWXYZ",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZABDEFGHIJKLMNOPQRST",
      "XYZABDEFGHIJKLMNOPQRSTUVWXYZABDEFGHIJKLMNOP",
      "MNOPQRSTUVWXYZABDEFGHIJKLMNOPQRSTUVWXYZABDE",
      "FGHIJKLMNOPQRSTUVWXYZABDEFGHIJKLMNOPQRSTUVW",
      "QRSTUVWXYZABDEFGHIJKLMNOPQRSTUVWXYZABDEFGHI",
      "JKLMNOPQRSTUVWXYZABDEFGHIJKLMNOPQRSTUVWXYZAB",
      "DEFGHIJKLMNOPQRSTUVWXYZABDEFGHIJKLMNOPQRSTUV",
      "WXYZABDEFGHIJKLMNOPQRSTUVWXYZABDEFGHIJKLMNO",
      "PQRSTUVWXYZABDEFGHIJKLMNOPQRSTUVWXYZABDEFGH",
      "IJKLMNOPQRSTUVWXYZABDEFGHIJKLMNOPQRSTUVWXYZ",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZABDEFGHIJKLMNOPQR",
    ],
    dogruCevap: 14,
  },
  {
    id: 3,
    baslik: "Set 3 - XY Harfleri",
    arananHarf: "XY",
    veriler: [
      "ABCDEFGHIJKLMNOPQRSTUVWXYZXYDEFGHIJKLMNOPQRSTUV",
      "WXYZXYDEFGHIJKLMNOPQRSTUVWXYZXYDEFGHIJKLMNOP",
      "QRSTUVWXYZXYDEFGHIJKLMNOPQRSTUVWXYZXYDEFGHI",
      "JKLMNOPQRSTUVWXYZXYDEFGHIJKLMNOPQRSTUVWXYZXY",
      "DEFGHIJKLMNOPQRSTUVWXYZXYDEFGHIJKLMNOPQRSTUVW",
      "XYZXYDEFGHIJKLMNOPQRSTUVWXYZXYDEFGHIJKLMNOPQR",
      "STUVWXYZXYDEFGHIJKLMNOPQRSTUVWXYZXYDEFGHIJKL",
      "MNOPQRSTUVWXYZXYDEFGHIJKLMNOPQRSTUVWXYZXYDEF",
      "GHIJKLMNOPQRSTUVWXYZXYDEFGHIJKLMNOPQRSTUVWXYZ",
      "XYDEFGHIJKLMNOPQRSTUVWXYZXYDEFGHIJKLMNOPQRSTUV",
      "WXYZXYDEFGHIJKLMNOPQRSTUVWXYZXYDEFGHIJKLMNOPQ",
      "RSTUVWXYZXYDEFGHIJKLMNOPQRSTUVWXYZXYDEFGHIJK",
    ],
    dogruCevap: 16,
  },
  {
    id: 4,
    baslik: "Set 4 - CD Harfleri",
    arananHarf: "CD",
    veriler: [
      "ABCDEFGHIJKLMNOPQRSTUVWXYZCDEFGHIJKLMNOPQRSTUVW",
      "XYZCDEFGHIJKLMNOPQRSTUVWXYZCDEFGHIJKLMNOPQRST",
      "UVWXYZCDEFGHIJKLMNOPQRSTUVWXYZCDEFGHIJKLMNOP",
      "QRSTUVWXYZCDEFGHIJKLMNOPQRSTUVWXYZCDEFGHIJKL",
      "MNOPQRSTUVWXYZCDEFGHIJKLMNOPQRSTUVWXYZCDEFGH",
      "IJKLMNOPQRSTUVWXYZCDEFGHIJKLMNOPQRSTUVWXYZCDE",
      "FGHIJKLMNOPQRSTUVWXYZCDEFGHIJKLMNOPQRSTUVWXYZ",
      "CDEFGHIJKLMNOPQRSTUVWXYZCDEFGHIJKLMNOPQRSTUVWX",
      "YZCDEFGHIJKLMNOPQRSTUVWXYZCDEFGHIJKLMNOPQRSTUV",
      "WXYZCDEFGHIJKLMNOPQRSTUVWXYZCDEFGHIJKLMNOPQRS",
      "TUVWXYZCDEFGHIJKLMNOPQRSTUVWXYZCDEFGHIJKLMNOP",
      "QRSTUVWXYZCDEFGHIJKLMNOPQRSTUVWXYZCDEFGHIJKLM",
    ],
    dogruCevap: 18,
  },
];

// Çok temel renk kelimeleri (çocukların kesinlikle bileceği)
const STROOP_KELIMELERI = [
  "KIRMIZI",
  "MAVİ",
  "YEŞİL",
  "SARI",
  "MOR",
  "TURUNCU",
  "PEMBE",
  "SİYAH",
  "BEYAZ",
  "GRİ",
  "KAHVERENGİ",
  "LACİVERT",
];

// Temel renkler (CSS renk kodları)
const STROOP_RENKLERI = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "black",
  "white",
  "gray",
  "brown",
  "navy",
];

// Rastgele Stroop alıştırması oluşturma fonksiyonu - DÜZELTİLDİ
const rastgeleStroopOlustur = () => {
  const sonuc = [];

  // Önceden tanımlanmış kelime-renk kombinasyonları (her kelime için farklı renkler)
  const kombinasyonlar = [
    { kelime: "KIRMIZI", renk: "blue" },
    { kelime: "KIRMIZI", renk: "green" },
    { kelime: "KIRMIZI", renk: "yellow" },
    { kelime: "KIRMIZI", renk: "purple" },
    { kelime: "KIRMIZI", renk: "orange" },
    { kelime: "KIRMIZI", renk: "pink" },
    { kelime: "KIRMIZI", renk: "black" },
    { kelime: "KIRMIZI", renk: "gray" },
    { kelime: "KIRMIZI", renk: "brown" },
    { kelime: "KIRMIZI", renk: "navy" },

    { kelime: "MAVİ", renk: "red" },
    { kelime: "MAVİ", renk: "green" },
    { kelime: "MAVİ", renk: "yellow" },
    { kelime: "MAVİ", renk: "purple" },
    { kelime: "MAVİ", renk: "orange" },
    { kelime: "MAVİ", renk: "pink" },
    { kelime: "MAVİ", renk: "black" },
    { kelime: "MAVİ", renk: "gray" },
    { kelime: "MAVİ", renk: "brown" },
    { kelime: "MAVİ", renk: "navy" },

    { kelime: "YEŞİL", renk: "red" },
    { kelime: "YEŞİL", renk: "blue" },
    { kelime: "YEŞİL", renk: "yellow" },
    { kelime: "YEŞİL", renk: "purple" },
    { kelime: "YEŞİL", renk: "orange" },
    { kelime: "YEŞİL", renk: "pink" },
    { kelime: "YEŞİL", renk: "black" },
    { kelime: "YEŞİL", renk: "gray" },
    { kelime: "YEŞİL", renk: "brown" },
    { kelime: "YEŞİL", renk: "navy" },

    { kelime: "SARI", renk: "red" },
    { kelime: "SARI", renk: "blue" },
    { kelime: "SARI", renk: "green" },
    { kelime: "SARI", renk: "purple" },
    { kelime: "SARI", renk: "orange" },
    { kelime: "SARI", renk: "pink" },
    { kelime: "SARI", renk: "black" },
    { kelime: "SARI", renk: "gray" },
    { kelime: "SARI", renk: "brown" },
    { kelime: "SARI", renk: "navy" },

    { kelime: "MOR", renk: "red" },
    { kelime: "MOR", renk: "blue" },
    { kelime: "MOR", renk: "green" },
    { kelime: "MOR", renk: "yellow" },
    { kelime: "MOR", renk: "orange" },
    { kelime: "MOR", renk: "pink" },
    { kelime: "MOR", renk: "black" },
    { kelime: "MOR", renk: "gray" },
    { kelime: "MOR", renk: "brown" },
    { kelime: "MOR", renk: "navy" },

    { kelime: "TURUNCU", renk: "red" },
    { kelime: "TURUNCU", renk: "blue" },
    { kelime: "TURUNCU", renk: "green" },
    { kelime: "TURUNCU", renk: "yellow" },
    { kelime: "TURUNCU", renk: "purple" },
    { kelime: "TURUNCU", renk: "pink" },
    { kelime: "TURUNCU", renk: "black" },
    { kelime: "TURUNCU", renk: "gray" },
    { kelime: "TURUNCU", renk: "brown" },
    { kelime: "TURUNCU", renk: "navy" },

    { kelime: "PEMBE", renk: "red" },
    { kelime: "PEMBE", renk: "blue" },
    { kelime: "PEMBE", renk: "green" },
    { kelime: "PEMBE", renk: "yellow" },
    { kelime: "PEMBE", renk: "purple" },
    { kelime: "PEMBE", renk: "orange" },
    { kelime: "PEMBE", renk: "black" },
    { kelime: "PEMBE", renk: "gray" },
    { kelime: "PEMBE", renk: "brown" },
    { kelime: "PEMBE", renk: "navy" },

    { kelime: "SİYAH", renk: "red" },
    { kelime: "SİYAH", renk: "blue" },
    { kelime: "SİYAH", renk: "green" },
    { kelime: "SİYAH", renk: "yellow" },
    { kelime: "SİYAH", renk: "purple" },
    { kelime: "SİYAH", renk: "orange" },
    { kelime: "SİYAH", renk: "pink" },
    { kelime: "SİYAH", renk: "gray" },
    { kelime: "SİYAH", renk: "brown" },
    { kelime: "SİYAH", renk: "navy" },

    { kelime: "BEYAZ", renk: "red" },
    { kelime: "BEYAZ", renk: "blue" },
    { kelime: "BEYAZ", renk: "green" },
    { kelime: "BEYAZ", renk: "yellow" },
    { kelime: "BEYAZ", renk: "purple" },
    { kelime: "BEYAZ", renk: "orange" },
    { kelime: "BEYAZ", renk: "pink" },
    { kelime: "BEYAZ", renk: "black" },
    { kelime: "BEYAZ", renk: "gray" },
    { kelime: "BEYAZ", renk: "brown" },
    { kelime: "BEYAZ", renk: "navy" },

    { kelime: "GRİ", renk: "red" },
    { kelime: "GRİ", renk: "blue" },
    { kelime: "GRİ", renk: "green" },
    { kelime: "GRİ", renk: "yellow" },
    { kelime: "GRİ", renk: "purple" },
    { kelime: "GRİ", renk: "orange" },
    { kelime: "GRİ", renk: "pink" },
    { kelime: "GRİ", renk: "black" },
    { kelime: "GRİ", renk: "white" },
    { kelime: "GRİ", renk: "brown" },
    { kelime: "GRİ", renk: "navy" },

    { kelime: "KAHVERENGİ", renk: "red" },
    { kelime: "KAHVERENGİ", renk: "blue" },
    { kelime: "KAHVERENGİ", renk: "green" },
    { kelime: "KAHVERENGİ", renk: "yellow" },
    { kelime: "KAHVERENGİ", renk: "purple" },
    { kelime: "KAHVERENGİ", renk: "orange" },
    { kelime: "KAHVERENGİ", renk: "pink" },
    { kelime: "KAHVERENGİ", renk: "black" },
    { kelime: "KAHVERENGİ", renk: "white" },
    { kelime: "KAHVERENGİ", renk: "gray" },
    { kelime: "KAHVERENGİ", renk: "navy" },

    { kelime: "LACİVERT", renk: "red" },
    { kelime: "KAHVERENGİ", renk: "blue" },
    { kelime: "LACİVERT", renk: "green" },
    { kelime: "LACİVERT", renk: "yellow" },
    { kelime: "LACİVERT", renk: "purple" },
    { kelime: "LACİVERT", renk: "orange" },
    { kelime: "LACİVERT", renk: "pink" },
    { kelime: "LACİVERT", renk: "black" },
    { kelime: "LACİVERT", renk: "white" },
    { kelime: "LACİVERT", renk: "gray" },
    { kelime: "LACİVERT", renk: "brown" },
  ];

  // Kombinasyonları karıştır
  const karisikKombinasyonlar = [...kombinasyonlar].sort(
    () => Math.random() - 0.5
  );

  // Tam olarak 30 kombinasyon seç (boş kutu olmaması için)
  for (let i = 0; i < 30; i++) {
    const kombinasyon = karisikKombinasyonlar[i];
    sonuc.push({
      id: i + 1,
      kelime: kombinasyon.kelime,
      renk: kombinasyon.renk,
    });
  }

  return sonuc;
};

// Sembol sayma alıştırması verisi
const SEMBOL_SAYMA_ALISTIRMASI = {
  baslik: "Sembol Sayma Alıştırması",
  aciklama:
    "Aşağıda verilen sembollerden tabloda kaç tane olduğunu en kısa sürede bulmaya çalışın. Bulduğunuz cevapları sembollerin yanına yazın.",
  sure: 45,
  semboller: [
    { id: 1, sembol: "🔵", isim: "Daire", dogruCevap: 7 },
    { id: 2, sembol: "➕", isim: "Artı", dogruCevap: 11 },
    { id: 3, sembol: "✖️", isim: "Çarpı", dogruCevap: 7 },
    { id: 4, sembol: "➡️", isim: "Ok", dogruCevap: 9 },
    { id: 5, sembol: "🟦", isim: "Kare", dogruCevap: 8 },
  ],
  grid: [
    ["", "", "➕", "✖️", "➡️", ""],
    ["➕", "", "➕", "🟦", "➡️", "➕"],
    ["✖️", "🔵", "➡️", "➡️", "", "✖️"],
    ["➕", "➕", "➕", "✖️", "➕", "➕"],
    ["🟦", "✖️", "✖️", "✖️", "🟦", "🟦"],
    ["➡️", "➡️", "➡️", "", "🟦", "🟦"],
    ["🔵", "🔵", "➕", "➕", "✖️", "➡️"],
  ],
};

const YAZIM_ALISTIRMASI = [
  { id: 1, kelimeler: ["manav", "manov", "monav"], dogruIndex: 0 },
  { id: 2, kelimeler: ["kirdele", "kordele", "kurdele"], dogruIndex: 2 },
  { id: 3, kelimeler: ["sorfa", "sofra", "sarfa"], dogruIndex: 1 },
  { id: 4, kelimeler: ["pıçak", "bıçak", "baçak"], dogruIndex: 1 },
  { id: 5, kelimeler: ["saat", "sat", "saatt"], dogruIndex: 0 },
  { id: 6, kelimeler: ["fize", "füzü", "füze"], dogruIndex: 2 },
  { id: 7, kelimeler: ["vaal", "vaad", "vaat"], dogruIndex: 2 },
  { id: 8, kelimeler: ["mekine", "makina", "makine"], dogruIndex: 2 },
  { id: 9, kelimeler: ["dudak", "daduk", "duduk"], dogruIndex: 0 },
  { id: 10, kelimeler: ["meymun", "maymun", "mamun"], dogruIndex: 1 },
  { id: 11, kelimeler: ["zeki", "ziki", "zeke"], dogruIndex: 0 },
  { id: 12, kelimeler: ["zerba", "zabre", "zebra"], dogruIndex: 2 },
  { id: 13, kelimeler: ["komedi", "kumedi", "komedii"], dogruIndex: 0 },
];

export default function Exercise3() {
  const router = useRouter();
  // Ana state'ler
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [motivation, setMotivation] = useState("");
  const intervalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  // Hece alıştırması için state'ler
  const [heceStarted, setHeceStarted] = useState(false);
  const [heceFinished, setHeceFinished] = useState(false);
  const [heceSeconds, setHeceSeconds] = useState(50);
  const [heceAnswers, setHeceAnswers] = useState({});
  const heceIntervalRef = useRef(null);
  const [showHeceResult, setShowHeceResult] = useState(false);
  const [heceScore, setHeceScore] = useState(0);
  const [heceCurrentPage, setHeceCurrentPage] = useState(0); // Yeni: sayfa numarası

  // Stroop alıştırması için state'ler
  const [stroopStarted, setStroopStarted] = useState(false);
  const [stroopFinished, setStroopFinished] = useState(false);
  const [stroopSeconds, setStroopSeconds] = useState(20);
  const stroopIntervalRef = useRef(null);
  const [showStroopResult, setShowStroopResult] = useState(false);
  const [currentStroopData, setCurrentStroopData] = useState([]);

  // Mevsim alıştırması için state'ler
  const [mevsimStarted, setMevsimStarted] = useState(false);
  const [mevsimFinished, setMevsimFinished] = useState(false);
  const [mevsimSeconds, setMevsimSeconds] = useState(30);
  const mevsimIntervalRef = useRef(null);
  const [showMevsimResult, setShowMevsimResult] = useState(false);
  const [mevsimAnswer, setMevsimAnswer] = useState("");
  const [mevsimCorrect, setMevsimCorrect] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(0);

  // Kelime takip alıştırması için state'ler
  const [kelimeTakipStarted, setKelimeTakipStarted] = useState(false);
  const [kelimeTakipFinished, setKelimeTakipFinished] = useState(false);
  const [kelimeTakipSeconds, setKelimeTakipSeconds] = useState(15);
  const kelimeTakipIntervalRef = useRef(null);
  const [showKelimeTakipResult, setShowKelimeTakipResult] = useState(false);

  // Harf bulma alıştırması için state'ler
  const [harfBulmaStarted, setHarfBulmaStarted] = useState(false);
  const [harfBulmaFinished, setHarfBulmaFinished] = useState(false);
  const [harfBulmaSeconds, setHarfBulmaSeconds] = useState(35);
  const harfBulmaIntervalRef = useRef(null);
  const [showHarfBulmaResult, setShowHarfBulmaResult] = useState(false);
  const [harfBulmaScore, setHarfBulmaScore] = useState(0);
  const [selectedHarfBulmaSet, setSelectedHarfBulmaSet] = useState(0);

  // Sembol sayma alıştırması için state'ler
  const [sembolSaymaStarted, setSembolSaymaStarted] = useState(false);
  const [sembolSaymaFinished, setSembolSaymaFinished] = useState(false);
  const [sembolSaymaSeconds, setSembolSaymaSeconds] = useState(45);
  const sembolSaymaIntervalRef = useRef(null);
  const [showSembolSaymaResult, setShowSembolSaymaResult] = useState(false);
  const [sembolSaymaAnswers, setSembolSaymaAnswers] = useState({});
  const [sembolSaymaScore, setSembolSaymaScore] = useState(0);

  // Yazım alıştırması için state'ler
  const [yazimStarted, setYazimStarted] = useState(false);
  const [yazimFinished, setYazimFinished] = useState(false);
  const [yazimSeconds, setYazimSeconds] = useState(20);
  const yazimIntervalRef = useRef(null);
  const [showYazimResult, setShowYazimResult] = useState(false);
  const [yazimAnswers, setYazimAnswers] = useState({});
  const [yazimScore, setYazimScore] = useState(0);

  // Tüm interval'ları temizleyen yardımcı fonksiyon
  const clearAllIntervals = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (heceIntervalRef.current) clearInterval(heceIntervalRef.current);
    if (stroopIntervalRef.current) clearInterval(stroopIntervalRef.current);
    if (mevsimIntervalRef.current) clearInterval(mevsimIntervalRef.current);
    if (kelimeTakipIntervalRef.current)
      clearInterval(kelimeTakipIntervalRef.current);
    if (harfBulmaIntervalRef.current)
      clearInterval(harfBulmaIntervalRef.current);
    if (sembolSaymaIntervalRef.current)
      clearInterval(sembolSaymaIntervalRef.current);
    if (yazimIntervalRef.current) clearInterval(yazimIntervalRef.current);
  };

  // Tüm alıştırmaları sıfırlayan yardımcı fonksiyon
  const resetAllExercises = () => {
    // Hece alıştırması
    setHeceStarted(false);
    setHeceFinished(false);
    setHeceSeconds(50);
    setHeceAnswers({});
    setHeceScore(0);
    setShowHeceResult(false);
    setHeceCurrentPage(0); // Yeni: sayfa numarasını sıfırla

    // Stroop alıştırması
    setStroopStarted(false);
    setStroopFinished(false);
    setStroopSeconds(20);
    setShowStroopResult(false);

    // Mevsim alıştırması
    setMevsimStarted(false);
    setMevsimFinished(false);
    setMevsimSeconds(30);
    setMevsimAnswer("");
    setMevsimCorrect(0);
    setShowMevsimResult(false);

    // Kelime takip alıştırması
    setKelimeTakipStarted(false);
    setKelimeTakipFinished(false);
    setKelimeTakipSeconds(15);
    setShowKelimeTakipResult(false);

    // Harf bulma alıştırması
    setHarfBulmaStarted(false);
    setHarfBulmaFinished(false);
    setHarfBulmaSeconds(35);
    setHarfBulmaScore(0);
    setShowHarfBulmaResult(false);

    // Sembol sayma alıştırması
    setSembolSaymaStarted(false);
    setSembolSaymaFinished(false);
    setSembolSaymaSeconds(45);
    setSembolSaymaAnswers({});
    setSembolSaymaScore(0);
    setShowSembolSaymaResult(false);

    // Yazım alıştırması
    setYazimStarted(false);
    setYazimFinished(false);
    setYazimSeconds(20);
    setYazimAnswers({});
    setYazimScore(0);
    setShowYazimResult(false);
  };

  // Hece alıştırması fonksiyonları
  const handleHeceStart = () => {
    clearAllIntervals();
    setHeceStarted(true);
    setHeceFinished(false);
    setHeceSeconds(50);
    setHeceAnswers({});
    setHeceScore(0);
    setShowHeceResult(false);

    heceIntervalRef.current = setInterval(() => {
      setHeceSeconds((prev) => {
        if (prev <= 1) {
          handleHeceFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleHeceFinish = () => {
    if (heceIntervalRef.current) {
      clearInterval(heceIntervalRef.current);
      heceIntervalRef.current = null;
    }

    setHeceFinished(true);
    setHeceStarted(false);

    let correct = 0;
    // Hangi sayfada olduğumuza göre doğru veriyi seç
    const currentHeceData =
      heceCurrentPage === 0
        ? HECE_ALISTIRMASI
        : heceCurrentPage === 1
        ? HECE_ALISTIRMASI_2
        : HECE_ALISTIRMASI_3;

    // DOM'dan doğrudan input değerlerini oku
    currentHeceData.forEach((item) => {
      const inputElement = document.querySelector(
        `input[data-hece-id="${item.id}"]`
      );
      const userAnswer = inputElement ? inputElement.value : "";
      const cleanUserAnswer = userAnswer.trim().toUpperCase();
      const cleanCorrectAnswer = item.cevap.trim().toUpperCase();

      if (cleanUserAnswer === cleanCorrectAnswer) {
        correct++;
      }
    });

    setHeceScore(correct);
    setShowHeceResult(true);
  };

  const handleHeceAnswerChange = (id, value) => {
    setHeceAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleHeceCloseResult = () => {
    setShowHeceResult(false);
    setHeceFinished(false);
    setHeceStarted(false);
    setHeceSeconds(50);
    if (heceIntervalRef.current) {
      clearInterval(heceIntervalRef.current);
      heceIntervalRef.current = null;
    }
  };

  // Stroop alıştırması fonksiyonları
  const handleStroopStart = () => {
    clearAllIntervals();
    const yeniStroopData = rastgeleStroopOlustur();
    setCurrentStroopData(yeniStroopData);

    setStroopStarted(true);
    setStroopFinished(false);
    setStroopSeconds(20);
    setShowStroopResult(false);

    stroopIntervalRef.current = setInterval(() => {
      setStroopSeconds((prev) => {
        if (prev <= 1) {
          handleStroopFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStroopFinish = () => {
    if (stroopIntervalRef.current) {
      clearInterval(stroopIntervalRef.current);
      stroopIntervalRef.current = null;
    }

    setStroopFinished(true);
    setStroopStarted(false);
    setShowStroopResult(true);
  };

  const handleStroopCloseResult = () => {
    setShowStroopResult(false);
    setStroopFinished(false);
    setStroopStarted(false);
    setStroopSeconds(20);
    if (stroopIntervalRef.current) {
      clearInterval(stroopIntervalRef.current);
      stroopIntervalRef.current = null;
    }
  };

  // Mevsim alıştırması fonksiyonları
  const handleMevsimStart = () => {
    clearAllIntervals();
    setMevsimStarted(true);
    setMevsimFinished(false);
    setMevsimSeconds(30);
    setMevsimAnswer("");
    setMevsimCorrect(0);
    setShowMevsimResult(false);

    mevsimIntervalRef.current = setInterval(() => {
      setMevsimSeconds((prev) => {
        if (prev <= 1) {
          handleMevsimFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleMevsimFinish = () => {
    if (mevsimIntervalRef.current) {
      clearInterval(mevsimIntervalRef.current);
      mevsimIntervalRef.current = null;
    }

    setMevsimFinished(true);
    setMevsimStarted(false);

    const currentExercise = KELIME_BULMA_ALISTIRMALARI[selectedExercise];
    const metinLowerCase = currentExercise.metin.toLowerCase();
    const arananKelimeLowerCase = currentExercise.arananKelime.toLowerCase();

    const kelimeCount = (
      metinLowerCase.match(new RegExp(arananKelimeLowerCase, "g")) || []
    ).length;
    setMevsimCorrect(kelimeCount);
    setShowMevsimResult(true);
  };

  const handleMevsimCloseResult = () => {
    setShowMevsimResult(false);
    setMevsimFinished(false);
    setMevsimSeconds(30);
    if (mevsimIntervalRef.current) {
      clearInterval(mevsimIntervalRef.current);
      mevsimIntervalRef.current = null;
    }
  };

  const handleExerciseChange = (index) => {
    clearAllIntervals();
    resetAllExercises();
    setSelectedExercise(index);
  };

  // Kelime takip alıştırması fonksiyonları
  const handleKelimeTakipStart = () => {
    clearAllIntervals();
    setKelimeTakipStarted(true);
    setKelimeTakipFinished(false);
    setKelimeTakipSeconds(15);
    setShowKelimeTakipResult(false);

    kelimeTakipIntervalRef.current = setInterval(() => {
      setKelimeTakipSeconds((prev) => {
        if (prev <= 1) {
          handleKelimeTakipFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleKelimeTakipFinish = () => {
    if (kelimeTakipIntervalRef.current) {
      clearInterval(kelimeTakipIntervalRef.current);
      kelimeTakipIntervalRef.current = null;
    }

    setKelimeTakipFinished(true);
    setKelimeTakipStarted(false);
    setShowKelimeTakipResult(true);
  };

  const handleKelimeTakipCloseResult = () => {
    setShowKelimeTakipResult(false);
    setKelimeTakipFinished(false);
    setKelimeTakipSeconds(15);
    if (kelimeTakipIntervalRef.current) {
      clearInterval(kelimeTakipIntervalRef.current);
      kelimeTakipIntervalRef.current = null;
    }
  };

  // Harf bulma alıştırması fonksiyonları
  const handleHarfBulmaStart = () => {
    clearAllIntervals();
    setHarfBulmaStarted(true);
    setHarfBulmaFinished(false);
    setHarfBulmaSeconds(35);
    setHarfBulmaScore(0);
    setShowHarfBulmaResult(false);

    harfBulmaIntervalRef.current = setInterval(() => {
      setHarfBulmaSeconds((prev) => {
        if (prev <= 1) {
          handleHarfBulmaFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleHarfBulmaFinish = () => {
    if (harfBulmaIntervalRef.current) {
      clearInterval(harfBulmaIntervalRef.current);
      harfBulmaIntervalRef.current = null;
    }

    setHarfBulmaFinished(true);
    setHarfBulmaStarted(false);

    const currentSet = HARF_BULMA_ALISTIRMALARI[selectedHarfBulmaSet];
    let totalHarf = 0;
    currentSet.veriler.forEach((line) => {
      const regex = new RegExp(currentSet.arananHarf, "g");
      const matches = (line.match(regex) || []).length;
      totalHarf += matches;
    });
    setHarfBulmaScore(totalHarf);
    setShowHarfBulmaResult(true);
  };

  const handleHarfBulmaCloseResult = () => {
    setShowHarfBulmaResult(false);
    setHarfBulmaFinished(false);
    setHarfBulmaSeconds(35);
    if (harfBulmaIntervalRef.current) {
      clearInterval(harfBulmaIntervalRef.current);
      harfBulmaIntervalRef.current = null;
    }
  };

  const handleHarfBulmaSetChange = (index) => {
    clearAllIntervals();
    setSelectedHarfBulmaSet(index);
    setHarfBulmaStarted(false);
    setHarfBulmaFinished(false);
    setHarfBulmaSeconds(35);
    setHarfBulmaScore(0);
    setShowHarfBulmaResult(false);
  };

  // Sembol sayma alıştırması fonksiyonları
  const handleSembolSaymaStart = () => {
    clearAllIntervals();
    setSembolSaymaStarted(true);
    setSembolSaymaFinished(false);
    setSembolSaymaSeconds(45);
    setSembolSaymaAnswers({});
    setSembolSaymaScore(0);
    setShowSembolSaymaResult(false);

    sembolSaymaIntervalRef.current = setInterval(() => {
      setSembolSaymaSeconds((prev) => {
        if (prev <= 1) {
          handleSembolSaymaFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSembolSaymaFinish = () => {
    if (sembolSaymaIntervalRef.current) {
      clearInterval(sembolSaymaIntervalRef.current);
      sembolSaymaIntervalRef.current = null;
    }

    setSembolSaymaFinished(true);
    setSembolSaymaStarted(false);

    let correct = 0;
    SEMBOL_SAYMA_ALISTIRMASI.semboller.forEach((sembol) => {
      const userAnswer = parseInt(sembolSaymaAnswers[sembol.id]) || 0;
      if (userAnswer === sembol.dogruCevap) {
        correct++;
      }
    });
    setSembolSaymaScore(correct);
    setShowSembolSaymaResult(true);
  };

  const handleSembolSaymaAnswerChange = (id, value) => {
    setSembolSaymaAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSembolSaymaCloseResult = () => {
    setShowSembolSaymaResult(false);
    setSembolSaymaFinished(false);
    setSembolSaymaSeconds(45);
    if (sembolSaymaIntervalRef.current) {
      clearInterval(sembolSaymaIntervalRef.current);
      sembolSaymaIntervalRef.current = null;
    }
  };

  // Yazım alıştırması fonksiyonları
  const handleYazimStart = () => {
    clearAllIntervals();
    setYazimStarted(true);
    setYazimFinished(false);
    setYazimSeconds(20);
    setYazimAnswers({});
    setYazimScore(0);
    setShowYazimResult(false);

    yazimIntervalRef.current = setInterval(() => {
      setYazimSeconds((prev) => {
        if (prev <= 1) {
          if (yazimIntervalRef.current) {
            clearInterval(yazimIntervalRef.current);
            yazimIntervalRef.current = null;
          }
          setYazimFinished(true);
          setYazimStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleYazimFinish = () => {
    if (yazimIntervalRef.current) {
      clearInterval(yazimIntervalRef.current);
      yazimIntervalRef.current = null;
    }

    setYazimFinished(true);
    setYazimStarted(false);
  };

  const handleYazimAnswerChange = (id, value) => {
    setYazimAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleYazimCloseResult = () => {
    setShowYazimResult(false);
    setYazimFinished(false);
    setYazimSeconds(20);
    if (yazimIntervalRef.current) {
      clearInterval(yazimIntervalRef.current);
      yazimIntervalRef.current = null;
    }
  };

  // Component unmount olduğunda tüm interval'ları temizle
  useEffect(() => {
    return () => {
      clearAllIntervals();
    };
  }, []);

  // Sonuç kartı açıldığında 4 saniye sonra otomatik kapanma
  useEffect(() => {
    if (showResult) {
      const timeout = setTimeout(() => {
        handleCloseResult();
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [showResult]);

  const hedefDurum =
    seconds <= HEDEF_SURE
      ? "Hedefin altında okudun! 🎉"
      : "Hedefin üstünde okudun. Bir dahaki sefere daha hızlı olabilirsin!";

  // Yazım alıştırması bittiğinde sonucu hesapla
  useEffect(() => {
    if (yazimFinished && !yazimStarted) {
      let correct = 0;
      YAZIM_ALISTIRMASI.forEach((item) => {
        if (yazimAnswers[item.id] === item.dogruIndex) {
          correct++;
        }
      });
      setYazimScore(correct);
      setShowYazimResult(true);
    }
  }, [yazimFinished, yazimStarted, yazimAnswers]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Geri Dön Butonu - Sol üst köşe */}
      <button
        onClick={() => router.push("/panel")}
        style={{
          position: "fixed",
          top: "24px",
          left: "24px",
          zIndex: 1000,
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          padding: "12px 16px",
          borderRadius: "50px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(0, 0, 0, 0.7)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(0, 0, 0, 0.5)";
        }}
      >
        <ArrowLeft size={20} />
        Geri Dön
      </button>

      {/* Mevcut hızlı okuma alıştırması - KALDIRILDI */}

      {/* Yeni hece birleştirme alıştırması */}
      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto 40px auto", // margin'i düzelttim
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)",
          padding: 32,
          border: "3px solid #10b981",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
            position: "relative",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "2rem",
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: 10,
            }}
          >
            <Puzzle size={32} color="#10b981" />
            Hece Birleştirme Alıştırması
            <Puzzle size={32} color="#10b981" />
          </h2>
          <p style={{ fontSize: "1.1em", color: "#64748b", marginBottom: 20 }}>
            Aşağıdaki heceleri karışık olarak verilen kelimeleri anlamlı bir
            kelime oluşturarak boş sütuna yazınız.
          </p>

          {/* Büyük harf uyarısı */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#fef3c7",
              color: "#92400e",
              padding: "12px 20px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: "1.1em",
              border: "2px solid #f59e0b",
              marginBottom: 20,
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.2)",
            }}
          >
            <AlertTriangle size={20} color="#92400e" />
            LÜTFEN BÜYÜK HARFLERLE YAZINIZ
          </div>

          {/* Süre göstergesi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: heceSeconds <= 10 ? "#ef4444" : "#10b981",
              color: "white",
              padding: "8px 16px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: "1.1em",
              transition: "all 0.3s ease",
            }}
          >
            <Timer size={20} />
            Süre: {heceSeconds} sn
          </div>
        </div>

        {/* Hece tablosu */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 16,
            padding: 24,
            border: "2px solid #e2e8f0",
            marginBottom: 24,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "1.1em",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#10b981",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  No
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  Hece 1
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  Hece 2
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  Hece 3
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  Cevabınız
                </th>
              </tr>
            </thead>
            <tbody>
              {(heceCurrentPage === 0
                ? HECE_ALISTIRMASI
                : heceCurrentPage === 1
                ? HECE_ALISTIRMASI_2
                : HECE_ALISTIRMASI_3
              ).map((item) => (
                <tr
                  key={item.id}
                  style={{
                    background: item.id % 2 === 0 ? "#f1f5f9" : "white",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      border: "1px solid #e2e8f0",
                      fontWeight: 600,
                      color: "#1e293b",
                    }}
                  >
                    {item.id}
                  </td>
                  {item.heceler.map((hece, index) => (
                    <td
                      key={index}
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        border: "1px solid #e2e8f0",
                        fontWeight: 600,
                        color: "#3b82f6",
                        fontSize: "1.2em",
                      }}
                    >
                      {hece}
                    </td>
                  ))}
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <input
                      type="text"
                      data-hece-id={item.id}
                      value={heceAnswers[item.id] || ""}
                      onChange={(e) =>
                        handleHeceAnswerChange(item.id, e.target.value)
                      }
                      disabled={!heceStarted || heceFinished}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "2px solid #e2e8f0",
                        borderRadius: 8,
                        fontSize: "1em",
                        textAlign: "center",
                        fontWeight: 600,
                        background:
                          heceStarted && !heceFinished ? "white" : "#f1f5f9",
                        color: "#1e293b",
                      }}
                      placeholder="Cevabınız..."
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kontrol butonları */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {!heceStarted && !heceFinished && (
            <>
              <button
                onClick={handleHeceStart}
                style={{
                  padding: "16px 48px",
                  fontSize: "1.3em",
                  fontWeight: 700,
                  background: "#10b981",
                  color: "#ffffff",
                  border: "3px solid #ffffff",
                  borderRadius: 20,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px 0 rgba(16, 185, 129, 0.3)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow =
                    "0 8px 25px 0 rgba(16, 185, 129, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow =
                    "0 6px 20px 0 rgba(16, 185, 129, 0.3)";
                }}
              >
                <Play size={20} />
                Hece Alıştırmasını Başlat!
              </button>

              {/* Sayfa değiştirme butonları */}
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <button
                  onClick={() => setHeceCurrentPage(0)}
                  style={{
                    padding: "12px 20px",
                    fontSize: "1em",
                    fontWeight: 600,
                    background: heceCurrentPage === 0 ? "#3b82f6" : "#e2e8f0",
                    color: heceCurrentPage === 0 ? "#ffffff" : "#64748b",
                    border: "2px solid #e2e8f0",
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Sayfa 1
                </button>
                <button
                  onClick={() => setHeceCurrentPage(1)}
                  style={{
                    padding: "12px 20px",
                    fontSize: "1em",
                    fontWeight: 600,
                    background: heceCurrentPage === 1 ? "#3b82f6" : "#e2e8f0",
                    color: heceCurrentPage === 1 ? "#ffffff" : "#64748b",
                    border: "2px solid #e2e8f0",
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Sayfa 2
                </button>
                <button
                  onClick={() => setHeceCurrentPage(2)}
                  style={{
                    padding: "12px 20px",
                    fontSize: "1em",
                    fontWeight: 600,
                    background: heceCurrentPage === 2 ? "#3b82f6" : "#e2e8f0",
                    color: heceCurrentPage === 2 ? "#ffffff" : "#64748b",
                    border: "2px solid #e2e8f0",
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Sayfa 3
                </button>
              </div>
            </>
          )}
          {heceStarted && !heceFinished && (
            <button
              onClick={handleHeceFinish}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#ef4444",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(239, 68, 68, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                animation: "pulse 1.5s infinite",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(239, 68, 68, 0.3)";
              }}
            >
              <X size={20} />
              Bitir
            </button>
          )}
        </div>
      </div>

      {/* Hece alıştırması sonuç kartı */}
      {showHeceResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 8px 25px 0 rgba(0,0,0,0.2)",
              padding: "24px 20px 20px 20px",
              minWidth: 400,
              maxWidth: "80vw",
              maxHeight: "80vh",
              textAlign: "center",
              position: "relative",
              border: "2px solid #10b981",
              overflowY: "auto",
            }}
          >
            <button
              onClick={handleHeceCloseResult}
              style={{
                position: "absolute",
                top: 10,
                right: 15,
                background: "#ef4444",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                width: 28,
                height: 28,
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 3px 8px 0 rgba(239, 68, 68, 0.3)",
              }}
              aria-label="Kapat"
              title="Kapat"
            >
              <X size={14} />
            </button>

            <h3
              style={{
                color: "#1e293b",
                fontWeight: 700,
                marginBottom: 16,
                fontSize: "1.5em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Puzzle size={24} color="#10b981" />
              Hece Alıştırması Sonucu!
              <Trophy size={24} color="#f59e0b" />
            </h3>

            <div
              style={{
                fontSize: "1.1em",
                marginBottom: 16,
                background: "#f0fdf4",
                padding: "12px 20px",
                borderRadius: 12,
                border: "2px solid #10b981",
                fontWeight: 700,
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <CheckCircle size={20} color="#10b981" />
              Doğru Cevap: {heceScore} /{" "}
              {
                (heceCurrentPage === 0
                  ? HECE_ALISTIRMASI
                  : heceCurrentPage === 1
                  ? HECE_ALISTIRMASI_2
                  : HECE_ALISTIRMASI_3
                ).length
              }
            </div>

            <div
              style={{
                fontSize: "1em",
                marginBottom: 16,
                background: "#fef3c7",
                padding: "12px 20px",
                borderRadius: 12,
                border: "2px solid #f59e0b",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              {heceScore ===
              (heceCurrentPage === 0
                ? HECE_ALISTIRMASI
                : heceCurrentPage === 1
                ? HECE_ALISTIRMASI_2
                : HECE_ALISTIRMASI_3
              ).length ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Star size={20} color="#f59e0b" />
                  Mükemmel! Tüm kelimeleri doğru birleştirdin! 🎉
                </div>
              ) : heceScore >=
                (heceCurrentPage === 0
                  ? HECE_ALISTIRMASI
                  : heceCurrentPage === 1
                  ? HECE_ALISTIRMASI_2
                  : HECE_ALISTIRMASI_3
                ).length *
                  0.7 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Trophy size={20} color="#f59e0b" />
                  Çok iyi! Daha da gelişebilirsin! 🎉
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Heart size={20} color="#f59e0b" />
                  Daha çok pratik yapabilirsin! 🎉
                </div>
              )}
            </div>

            {/* Detaylı sonuç tablosu - YENİ EKLENDİ */}
            <div style={{ textAlign: "left", marginTop: 20, marginBottom: 20 }}>
              <h4
                style={{
                  color: "#1e293b",
                  fontWeight: 600,
                  marginBottom: 12,
                  fontSize: "1.1em",
                  textAlign: "center",
                }}
              >
                Detaylı Sonuçlar:
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "8px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {(heceCurrentPage === 0
                  ? HECE_ALISTIRMASI
                  : heceCurrentPage === 1
                  ? HECE_ALISTIRMASI_2
                  : HECE_ALISTIRMASI_3
                ).map((item) => {
                  const inputElement = document.querySelector(
                    `input[data-hece-id="${item.id}"]`
                  );
                  const userAnswer = inputElement ? inputElement.value : "";
                  const cleanUserAnswer = userAnswer.trim().toUpperCase();
                  const cleanCorrectAnswer = item.cevap.trim().toUpperCase();
                  const isCorrect = cleanUserAnswer === cleanCorrectAnswer;

                  return (
                    <div
                      key={item.id}
                      style={{
                        background: isCorrect ? "#f0fdf4" : "#fef2f2",
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: `2px solid ${
                          isCorrect ? "#10b981" : "#ef4444"
                        }`,
                        fontSize: "0.9em",
                        position: "relative",
                      }}
                    >
                      <div style={{ marginBottom: "4px" }}>
                        <span style={{ fontWeight: 600, color: "#374151" }}>
                          {item.id}. {item.heceler.join(" + ")} ={" "}
                        </span>
                      </div>

                      <div style={{ marginBottom: "4px" }}>
                        <span style={{ color: "#6b7280", fontSize: "0.85em" }}>
                          Sizin cevabınız:{" "}
                        </span>
                        <span
                          style={{
                            color: isCorrect ? "#059669" : "#dc2626",
                            fontWeight: 600,
                            textDecoration: isCorrect ? "none" : "line-through",
                          }}
                        >
                          {userAnswer || "Boş"}
                        </span>
                      </div>

                      <div>
                        <span style={{ color: "#6b7280", fontSize: "0.85em" }}>
                          Doğru cevap:{" "}
                        </span>
                        <span
                          style={{
                            color: "#059669",
                            fontWeight: 600,
                          }}
                        >
                          {item.cevap}
                        </span>
                      </div>

                      {/* Doğru/Yanlış ikonu */}
                      <div
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: isCorrect ? "#10b981" : "#ef4444",
                          color: "white",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {isCorrect ? "✓" : "✗"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Doğru cevaplar özeti */}
            <div style={{ textAlign: "left", marginTop: 16 }}>
              <h4
                style={{
                  color: "#1e293b",
                  fontWeight: 600,
                  marginBottom: 8,
                  fontSize: "1em",
                  textAlign: "center",
                }}
              >
                Tüm Doğru Cevaplar:
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "6px",
                }}
              >
                {(heceCurrentPage === 0
                  ? HECE_ALISTIRMASI
                  : heceCurrentPage === 1
                  ? HECE_ALISTIRMASI_2
                  : HECE_ALISTIRMASI_3
                ).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "#f8fafc",
                      padding: "6px 10px",
                      borderRadius: 6,
                      border: "1px solid #e2e8f0",
                      fontSize: "0.85em",
                    }}
                  >
                    <strong>{item.id}.</strong> {item.heceler.join(" + ")} ={" "}
                    {item.cevap}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Yeni Stroop efekti alıştırması */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto 80px auto",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)",
          padding: 32,
          border: "3px solid #8b5cf6",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
            position: "relative",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "2rem",
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: 10,
            }}
          >
            <Brain size={32} color="#8b5cf6" />
            Stroop Efekti Alıştırması
            <Eye size={32} color="#8b5cf6" />
          </h2>
          <p style={{ fontSize: "1.1em", color: "#64748b", marginBottom: 15 }}>
            Aşağıdaki alıştırmada hangi renk ile yazıldıysa o şekilde okuyunuz.
          </p>
          <p style={{ fontSize: "1em", color: "#64748b", marginBottom: 20 }}>
            Sağ ve Sol beyin arasındaki bağlantınız yükselecektir. Süre: 20sn
          </p>

          {/* Süre göstergesi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: stroopSeconds <= 5 ? "#ef4444" : "#8b5cf6",
              color: "white",
              padding: "8px 16px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: "1.1em",
              transition: "all 0.3s ease",
            }}
          >
            <Timer size={20} />
            Süre: {stroopSeconds} sn
          </div>
        </div>

        {/* Stroop kelimeleri */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 16,
            padding: 24,
            border: "2px solid #e2e8f0",
            marginBottom: 24,
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {stroopStarted && !stroopFinished && currentStroopData.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "16px",
                width: "100%",
                maxWidth: "800px",
              }}
            >
              {currentStroopData.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "12px 8px",
                    borderRadius: 8,
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "1.1em",
                    color: item.renk,
                    background: "white",
                    border: "2px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    minHeight: "60px", // Minimum yükseklik eklendi
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  {item.kelime || "HATA"} {/* Hata durumu için fallback */}
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "1.2em",
                fontWeight: 600,
              }}
            >
              {stroopFinished
                ? "Alıştırma tamamlandı!"
                : "Başlamak için butona tıklayın"}
            </div>
          )}
        </div>

        {/* Kontrol butonları */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {!stroopStarted && !stroopFinished && (
            <button
              onClick={handleStroopStart}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#8b5cf6",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(139, 92, 246, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(139, 92, 246, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(139, 92, 246, 0.3)";
              }}
            >
              <Play size={20} />
              Stroop Alıştırmasını Başlat!
            </button>
          )}
          {stroopStarted && !stroopFinished && (
            <button
              onClick={handleStroopFinish}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#ef4444",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(239, 68, 68, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                animation: "pulse 1.5s infinite",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(239, 68, 68, 0.3)";
              }}
            >
              <CheckCircle size={20} />
              Bitir
            </button>
          )}
        </div>
      </div>

      {/* Stroop alıştırması sonuç kartı */}
      {showStroopResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 20,
              boxShadow: "0 12px 40px 0 rgba(0,0,0,0.2)",
              padding: "32px 24px 24px 24px",
              minWidth: 320,
              maxWidth: "90vw",
              textAlign: "center",
              position: "relative",
              border: "3px solid #8b5cf6",
            }}
          >
            <button
              onClick={handleStroopCloseResult}
              style={{
                position: "absolute",
                top: 15,
                right: 20,
                background: "#ef4444",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                width: 35,
                height: 35,
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px 0 rgba(239, 68, 68, 0.3)",
              }}
              aria-label="Kapat"
              title="Kapat"
            >
              <X size={18} />
            </button>

            <h3
              style={{
                color: "#1e293b",
                fontWeight: 700,
                marginBottom: 20,
                fontSize: "1.5em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Brain size={24} color="#8b5cf6" />
              Tamamlandı!
            </h3>

            <div
              style={{
                fontSize: "1.2em",
                marginBottom: 16,
                background: "#f0fdf4",
                padding: "12px 20px",
                borderRadius: 12,
                border: "2px solid #10b981",
                fontWeight: 600,
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Timer size={20} color="#10b981" />
              Süre: {20 - stroopSeconds} saniye
            </div>

            <div
              style={{
                fontSize: "1.1em",
                background: "#fef3c7",
                padding: "12px 20px",
                borderRadius: 12,
                border: "2px solid #f59e0b",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Star size={20} color="#f59e0b" />
                Beyin egzersizi tamamlandı! 🧠
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Yeni Kelime Bulma Alıştırması */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto 80px auto",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)",
          padding: 32,
          border: "3px solid #f97316",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
            position: "relative",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "2rem",
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: 10,
            }}
          >
            <Target size={32} color="#f97316" />
            Kelime Bulma Alıştırması
            <Search size={32} color="#f97316" />
          </h2>
          <p style={{ fontSize: "1.1em", color: "#64748b", marginBottom: 15 }}>
            Aşağıdaki metni okumadan hızlı bir şekilde aranan kelimelere
            odaklanıp kaç tane olduğunu bulunuz.
          </p>
          <p style={{ fontSize: "1em", color: "#64748b", marginBottom: 20 }}>
            Göz kaslarınızı güçlendirir ve hızlı tarama becerinizi geliştirir.
            Süre: 30sn
          </p>

          {/* Alıştırma seçici */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            {KELIME_BULMA_ALISTIRMALARI.map((exercise, index) => (
              <button
                key={exercise.id}
                onClick={() => handleExerciseChange(index)}
                disabled={mevsimStarted && !mevsimFinished}
                style={{
                  padding: "10px 20px",
                  fontSize: "1em",
                  fontWeight: 600,
                  background:
                    selectedExercise === index ? "#f97316" : "#f1f5f9",
                  color: selectedExercise === index ? "#ffffff" : "#64748b",
                  border: `2px solid ${
                    selectedExercise === index ? "#f97316" : "#e2e8f0"
                  }`,
                  borderRadius: 12,
                  cursor:
                    mevsimStarted && !mevsimFinished
                      ? "not-allowed"
                      : "pointer",
                  transition: "all 0.3s ease",
                  opacity: mevsimStarted && !mevsimFinished ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!mevsimStarted || mevsimFinished) {
                    e.target.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              >
                {exercise.baslik}
              </button>
            ))}
          </div>

          {/* Aranan kelime göstergesi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#fef3c7",
              color: "#92400e",
              padding: "8px 16px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: "1.2em",
              border: "2px solid #f59e0b",
              marginBottom: 25,
            }}
          >
            <Search size={20} color="#92400e" />
            Aranan Kelime: &ldquo;
            {KELIME_BULMA_ALISTIRMALARI[
              selectedExercise
            ].arananKelime.toUpperCase()}
            &rdquo;
          </div>

          {/* Süre göstergesi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: mevsimSeconds <= 10 ? "#ef4444" : "#f97316",
              color: "white",
              padding: "8px 16px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: "1.1em",
              transition: "all 0.3s ease",
              marginTop: 10, // Yeni eklendi
            }}
          >
            <Timer size={20} />
            Süre: {mevsimSeconds} sn
          </div>
        </div>

        {/* Seçili alıştırmanın metni */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 16,
            padding: 24,
            border: "2px solid #e2e8f0",
            marginBottom: 24,
            minHeight: 300,
            maxHeight: 400,
            overflowY: "auto",
          }}
        >
          {mevsimStarted && !mevsimFinished ? (
            <div
              style={{
                fontSize: "1.2em",
                lineHeight: 1.8,
                color: "#1e293b",
                textAlign: "justify",
                fontWeight: 500,
              }}
            >
              {KELIME_BULMA_ALISTIRMALARI[selectedExercise].metin}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "1.2em",
                fontWeight: 600,
                padding: "40px 20px",
              }}
            >
              {mevsimFinished
                ? "Alıştırma tamamlandı!"
                : "Başlamak için butona tıklayın"}
            </div>
          )}
        </div>

        {/* Kontrol butonları */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {!mevsimStarted && !mevsimFinished && (
            <button
              onClick={handleMevsimStart}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#f97316",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(249, 115, 22, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(249, 115, 22, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(249, 115, 22, 0.3)";
              }}
            >
              <Play size={20} />
              Kelime Bulma Alıştırmasını Başlat!
            </button>
          )}
          {mevsimStarted && !mevsimFinished && (
            <button
              onClick={handleMevsimFinish}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#ef4444",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(239, 68, 68, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                animation: "pulse 1.5s infinite",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(239, 68, 68, 0.3)";
              }}
            >
              <CheckCircle size={20} />
              Bitir
            </button>
          )}
        </div>
      </div>

      {/* Mevsim alıştırması sonuç kartı */}
      {showMevsimResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 20,
              boxShadow: "0 12px 40px 0 rgba(0,0,0,0.2)",
              padding: "40px 32px 32px 32px",
              minWidth: 400,
              maxWidth: "90vw",
              textAlign: "center",
              position: "relative",
              border: "3px solid #f97316",
            }}
          >
            <button
              onClick={handleMevsimCloseResult}
              style={{
                position: "absolute",
                top: 15,
                right: 20,
                background: "#ef4444",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                width: 35,
                height: 35,
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px 0 rgba(239, 68, 68, 0.3)",
              }}
              aria-label="Kapat"
              title="Kapat"
            >
              <X size={18} />
            </button>

            <h3
              style={{
                color: "#1e293b",
                fontWeight: 700,
                marginBottom: 20,
                fontSize: "1.8em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <Target size={28} color="#f97316" />
              Kelime Bulma Sonucu!
              <Trophy size={28} color="#f59e0b" />
            </h3>

            <div
              style={{
                fontSize: "1.3em",
                marginBottom: 20,
                background: "#f0fdf4",
                padding: "15px 25px",
                borderRadius: 16,
                border: "3px solid #10b981",
                fontWeight: 700,
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <CheckCircle size={24} color="#10b981" />
              &ldquo;
              {KELIME_BULMA_ALISTIRMALARI[
                selectedExercise
              ].arananKelime.toUpperCase()}
              &rdquo; kelimesi: {mevsimCorrect} adet
            </div>

            <div
              style={{
                fontSize: "1.2em",
                marginBottom: 20,
                background: "#fef3c7",
                padding: "15px 25px",
                borderRadius: 16,
                border: "3px solid #f59e0b",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              {mevsimCorrect >=
              KELIME_BULMA_ALISTIRMALARI[selectedExercise].dogruCevap * 0.8 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Star size={24} color="#f59e0b" />
                  Mükemmel! Neredeyse tüm kelimeleri buldun! 🎉
                </div>
              ) : mevsimCorrect >=
                KELIME_BULMA_ALISTIRMALARI[selectedExercise].dogruCevap *
                  0.5 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Trophy size={24} color="#f59e0b" />
                  İyi! Daha da gelişebilirsin! 🎉
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Heart size={24} color="#f59e0b" />
                  Daha çok pratik yapabilirsin! 🎉
                </div>
              )}
            </div>

            <div
              style={{
                fontSize: "1.1em",
                background: "#f1f5f9",
                padding: "12px 20px",
                borderRadius: 12,
                border: "2px solid #64748b",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Timer size={20} color="#64748b" />
                Süre: {30 - mevsimSeconds} saniye
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Yeni Kelime Takip Alıştırması */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto 80px auto",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)",
          padding: 32,
          border: "3px solid #06b6d4",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
            position: "relative",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "2rem",
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: 10,
            }}
          >
            <Zap size={32} color="#06b6d4" />
            Kelime Takip Alıştırması
            <Eye size={32} color="#06b6d4" />
          </h2>
          <p style={{ fontSize: "1.1em", color: "#64748b", marginBottom: 15 }}>
            Aşağıdaki kelimeleri ok yönünde takip ederek hızlıca görmeye
            çalışın.
          </p>
          <p style={{ fontSize: "1em", color: "#64748b", marginBottom: 20 }}>
            Göz kaslarınızı güçlendirir ve görsel takip becerinizi geliştirir.
            Süre: 15sn
          </p>

          {/* Süre göstergesi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: kelimeTakipSeconds <= 5 ? "#ef4444" : "#06b6d4",
              color: "white",
              padding: "8px 16px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: "1.1em",
              transition: "all 0.3s ease",
            }}
          >
            <Timer size={20} />
            Süre: {kelimeTakipSeconds} sn
          </div>
        </div>

        {/* Kelime takip alanı */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 16,
            padding: 24,
            border: "2px solid #e2e8f0",
            marginBottom: 24,
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {kelimeTakipStarted && !kelimeTakipFinished ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "20px",
                width: "100%",
                maxWidth: "600px",
              }}
            >
              {KELIME_TAKIP_ALISTIRMASI.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 24px",
                    background: "white",
                    borderRadius: 12,
                    border: "2px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.02)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.4em",
                      fontWeight: 700,
                      color: "#1e293b",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                  >
                    {item.sol}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#06b6d4",
                    }}
                  >
                    <div
                      style={{
                        width: "320px",
                        height: "3px",
                        background: "#06b6d4",
                        borderRadius: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid #06b6d4",
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: "1.4em",
                      fontWeight: 700,
                      color: "#1e293b",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                  >
                    {item.sag}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "1.2em",
                fontWeight: 600,
              }}
            >
              {kelimeTakipFinished
                ? "Alıştırma tamamlandı!"
                : "Başlamak için butona tıklayın"}
            </div>
          )}
        </div>

        {/* Kontrol butonları */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {!kelimeTakipStarted && !kelimeTakipFinished && (
            <button
              onClick={handleKelimeTakipStart}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#06b6d4",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(6, 182, 212, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(6, 182, 212, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(6, 182, 212, 0.3)";
              }}
            >
              <Play size={20} />
              Kelime Takip Alıştırmasını Başlat!
            </button>
          )}
          {kelimeTakipStarted && !kelimeTakipFinished && (
            <button
              onClick={handleKelimeTakipFinish}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#ef4444",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(239, 68, 68, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                animation: "pulse 1.5s infinite",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(239, 68, 68, 0.3)";
              }}
            >
              <CheckCircle size={20} />
              Bitir
            </button>
          )}
        </div>
      </div>

      {/* Kelime takip alıştırması sonuç kartı */}
      {showKelimeTakipResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 20,
              boxShadow: "0 12px 40px 0 rgba(0,0,0,0.2)",
              padding: "32px 24px 24px 24px",
              minWidth: 320,
              maxWidth: "90vw",
              textAlign: "center",
              position: "relative",
              border: "3px solid #06b6d4",
            }}
          >
            <button
              onClick={handleKelimeTakipCloseResult}
              style={{
                position: "absolute",
                top: 15,
                right: 20,
                background: "#ef4444",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                width: 35,
                height: 35,
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px 0 rgba(239, 68, 68, 0.3)",
              }}
              aria-label="Kapat"
              title="Kapat"
            >
              <X size={18} />
            </button>

            <h3
              style={{
                color: "#1e293b",
                fontWeight: 700,
                marginBottom: 20,
                fontSize: "1.5em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Zap size={24} color="#06b6d4" />
              Tamamlandı!
            </h3>

            <div
              style={{
                fontSize: "1.2em",
                marginBottom: 16,
                background: "#f0fdf4",
                padding: "12px 20px",
                borderRadius: 12,
                border: "2px solid #10b981",
                fontWeight: 600,
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Timer size={20} color="#10b981" />
              Süre: {15 - kelimeTakipSeconds} saniye
            </div>

            <div
              style={{
                fontSize: "1.1em",
                background: "#fef3c7",
                padding: "12px 20px",
                borderRadius: 12,
                border: "2px solid #f59e0b",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Star size={20} color="#f59e0b" />
                Görsel takip beceriniz gelişti! 👁️
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Yeni Harf Bulma Alıştırması */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto 80px auto",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)",
          padding: 32,
          border: "3px solid #ec4899",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
            position: "relative",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "2rem",
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: 10,
            }}
          >
            <Search size={32} color="#ec4899" />
            Harf Bulma Alıştırması
            <Target size={32} color="#ec4899" />
          </h2>
          <p style={{ fontSize: "1.1em", color: "#64748b", marginBottom: 15 }}>
            Aşağıda karışık harflerin içine gizlenmiş harfleri verilen sürede
            bulmaya çalışın.
          </p>
          <p style={{ fontSize: "1em", color: "#64748b", marginBottom: 20 }}>
            Görsel algı ve dikkat becerinizi geliştirir. Süre: 35sn
          </p>

          {/* Set seçici */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            {HARF_BULMA_ALISTIRMALARI.map((set, index) => (
              <button
                key={set.id}
                onClick={() => handleHarfBulmaSetChange(index)}
                disabled={harfBulmaStarted && !harfBulmaFinished}
                style={{
                  padding: "10px 20px",
                  fontSize: "1em",
                  fontWeight: 600,
                  background:
                    selectedHarfBulmaSet === index ? "#ec4899" : "#f1f5f9",
                  color: selectedHarfBulmaSet === index ? "#ffffff" : "#64748b",
                  border: `2px solid ${
                    selectedHarfBulmaSet === index ? "#ec4899" : "#e2e8f0"
                  }`,
                  borderRadius: 12,
                  cursor:
                    harfBulmaStarted && !harfBulmaFinished
                      ? "not-allowed"
                      : "pointer",
                  transition: "all 0.3s ease",
                  opacity: harfBulmaStarted && !harfBulmaFinished ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!harfBulmaStarted || harfBulmaFinished) {
                    e.target.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              >
                {set.baslik}
              </button>
            ))}
          </div>

          {/* Aranan harf göstergesi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#fef3c7",
              color: "#92400e",
              padding: "8px 16px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: "1.2em",
              border: "2px solid #f59e0b",
              marginBottom: 25,
            }}
          >
            <Search size={20} color="#92400e" />
            Aranan Harf: &ldquo;
            {HARF_BULMA_ALISTIRMALARI[selectedHarfBulmaSet].arananHarf}
            &rdquo;
          </div>

          {/* Süre göstergesi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: harfBulmaSeconds <= 10 ? "#ef4444" : "#ec4899",
              color: "white",
              padding: "8px 16px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: "1.1em",
              transition: "all 0.3s ease",
            }}
          >
            <Timer size={20} />
            Süre: {harfBulmaSeconds} sn
          </div>
        </div>

        {/* Harf bulma alanı */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 16,
            padding: 24,
            border: "2px solid #e2e8f0",
            marginBottom: 24,
            minHeight: 300,
            maxHeight: 500,
            overflowY: "auto",
          }}
        >
          {harfBulmaStarted && !harfBulmaFinished ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontFamily: "monospace",
                fontSize: "1.1em",
                lineHeight: 1.6,
                color: "#1e293b",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              {HARF_BULMA_ALISTIRMALARI[selectedHarfBulmaSet].veriler.map(
                (line, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 16px",
                      background: "white",
                      borderRadius: 8,
                      border: "2px solid #e2e8f0",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.01)";
                      e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                    }}
                  >
                    {line}
                  </div>
                )
              )}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "1.2em",
                fontWeight: 600,
                padding: "40px 20px",
              }}
            >
              {harfBulmaFinished
                ? "Alıştırma tamamlandı!"
                : "Başlamak için butona tıklayın"}
            </div>
          )}
        </div>

        {/* Kontrol butonları */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {!harfBulmaStarted && !harfBulmaFinished && (
            <button
              onClick={handleHarfBulmaStart}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#ec4899",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(236, 72, 153, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(236, 72, 153, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(236, 72, 153, 0.3)";
              }}
            >
              <Play size={20} />
              Harf Bulma Alıştırmasını Başlat!
            </button>
          )}
          {harfBulmaStarted && !harfBulmaFinished && (
            <button
              onClick={handleHarfBulmaFinish}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#ef4444",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(239, 68, 68, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                animation: "pulse 1.5s infinite",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(239, 68, 68, 0.3)";
              }}
            >
              <CheckCircle size={20} />
              Bitir
            </button>
          )}
        </div>
      </div>

      {/* Harf bulma alıştırması sonuç kartı */}
      {showHarfBulmaResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 20,
              boxShadow: "0 12px 40px 0 rgba(0,0,0,0.2)",
              padding: "40px 32px 32px 32px",
              minWidth: 400,
              maxWidth: "90vw",
              textAlign: "center",
              position: "relative",
              border: "3px solid #ec4899",
            }}
          >
            <button
              onClick={handleHarfBulmaCloseResult}
              style={{
                position: "absolute",
                top: 15,
                right: 20,
                background: "#ef4444",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                width: 35,
                height: 35,
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px 0 rgba(239, 68, 68, 0.3)",
              }}
              aria-label="Kapat"
              title="Kapat"
            >
              <X size={18} />
            </button>

            <h3
              style={{
                color: "#1e293b",
                fontWeight: 700,
                marginBottom: 20,
                fontSize: "1.8em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <Search size={28} color="#ec4899" />
              Harf Bulma Sonucu!
              <Trophy size={28} color="#f59e0b" />
            </h3>

            <div
              style={{
                fontSize: "1.3em",
                marginBottom: 20,
                background: "#f0fdf4",
                padding: "15px 25px",
                borderRadius: 16,
                border: "3px solid #10b981",
                fontWeight: 700,
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <CheckCircle size={24} color="#10b981" />
              Bulunan &ldquo;
              {HARF_BULMA_ALISTIRMALARI[selectedHarfBulmaSet].arananHarf}
              &rdquo; Sayısı: {harfBulmaScore}
            </div>

            <div
              style={{
                fontSize: "1.2em",
                marginBottom: 20,
                background: "#fef3c7",
                padding: "15px 25px",
                borderRadius: 16,
                border: "3px solid #f59e0b",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              {harfBulmaScore >=
              HARF_BULMA_ALISTIRMALARI[selectedHarfBulmaSet].dogruCevap *
                0.8 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Star size={24} color="#f59e0b" />
                  Mükemmel! Çok iyi bir görsel algıya sahipsin!
                </div>
              ) : harfBulmaScore >=
                HARF_BULMA_ALISTIRMALARI[selectedHarfBulmaSet].dogruCevap *
                  0.5 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Trophy size={24} color="#f59e0b" />
                  İyi! Dikkat becerinizi geliştirebilirsin!
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Heart size={24} color="#f59e0b" />
                  Daha çok pratik yapabilirsin!
                </div>
              )}
            </div>

            <div
              style={{
                fontSize: "1.1em",
                background: "#f1f5f9",
                padding: "12px 20px",
                borderRadius: 12,
                border: "2px solid #64748b",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Timer size={20} color="#64748b" />
                Süre: {35 - harfBulmaSeconds} saniye
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Yeni Sembol Sayma Alıştırması */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto 80px auto",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)",
          padding: 32,
          border: "3px solid #6366f1",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
            position: "relative",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "2rem",
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: 10,
            }}
          >
            <Target size={32} color="#6366f1" />
            Sembol Sayma Alıştırması
            <Search size={32} color="#6366f1" />
          </h2>
          <p style={{ fontSize: "1.1em", color: "#64748b", marginBottom: 15 }}>
            {SEMBOL_SAYMA_ALISTIRMASI.aciklama}
          </p>
          <p style={{ fontSize: "1em", color: "#64748b", marginBottom: 20 }}>
            Görsel algı ve dikkat becerinizi geliştirir. Süre:{" "}
            {SEMBOL_SAYMA_ALISTIRMASI.sure}sn
          </p>

          {/* Süre göstergesi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: sembolSaymaSeconds <= 10 ? "#ef4444" : "#6366f1",
              color: "white",
              padding: "8px 16px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: "1.1em",
              transition: "all 0.3s ease",
            }}
          >
            <Timer size={20} />
            Süre: {sembolSaymaSeconds} sn
          </div>
        </div>

        {/* Sembol grid'i */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 16,
            padding: 24,
            border: "2px solid #e2e8f0",
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {sembolSaymaStarted && !sembolSaymaFinished ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "8px",
                maxWidth: "600px",
                width: "100%",
              }}
            >
              {SEMBOL_SAYMA_ALISTIRMASI.grid.map((row, rowIndex) =>
                row.map((sembol, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "white",
                      border: "2px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: "2em",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1)";
                      e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {sembol}
                  </div>
                ))
              )}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "1.2em",
                fontWeight: 600,
                padding: "40px 20px",
              }}
            >
              {sembolSaymaFinished
                ? "Alıştırma tamamlandı!"
                : "Başlamak için butona tıklayın"}
            </div>
          )}
        </div>

        {/* Sembol listesi ve cevap alanları */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 16,
            padding: 24,
            border: "2px solid #e2e8f0",
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              textAlign: "center",
              color: "#1e293b",
              fontWeight: 700,
              fontSize: "1.3em",
              marginBottom: 20,
            }}
          >
            Sembolleri Sayın ve Cevaplarınızı Yazın:
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {SEMBOL_SAYMA_ALISTIRMASI.semboller.map((sembol) => (
              <div
                key={sembol.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px",
                  background: "white",
                  borderRadius: 12,
                  border: "2px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: "2em",
                    fontWeight: "bold",
                    minWidth: "60px",
                    textAlign: "center",
                  }}
                >
                  {sembol.sembol}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "1em",
                      fontWeight: 600,
                      color: "#1e293b",
                      marginBottom: "4px",
                    }}
                  >
                    {sembol.isim}
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={sembolSaymaAnswers[sembol.id] || ""}
                    onChange={(e) =>
                      handleSembolSaymaAnswerChange(sembol.id, e.target.value)
                    }
                    disabled={!sembolSaymaStarted || sembolSaymaFinished}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "2px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: "1em",
                      textAlign: "center",
                      fontWeight: 600,
                      background:
                        sembolSaymaStarted && !sembolSaymaFinished
                          ? "white"
                          : "#f1f5f9",
                      color: "#1e293b",
                    }}
                    placeholder="Sayı..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kontrol butonları */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {!sembolSaymaStarted && !sembolSaymaFinished && (
            <button
              onClick={handleSembolSaymaStart}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#6366f1",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(99, 102, 241, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(99, 102, 241, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(99, 102, 241, 0.3)";
              }}
            >
              <Play size={20} />
              Sembol Sayma Alıştırmasını Başlat!
            </button>
          )}
          {sembolSaymaStarted && !sembolSaymaFinished && (
            <button
              onClick={handleSembolSaymaFinish}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#ef4444",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(239, 68, 68, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                animation: "pulse 1.5s infinite",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(239, 68, 68, 0.3)";
              }}
            >
              <CheckCircle size={20} />
              Bitir
            </button>
          )}
        </div>
      </div>

      {/* Sembol sayma alıştırması sonuç kartı */}
      {showSembolSaymaResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 20,
              boxShadow: "0 12px 40px 0 rgba(0,0,0,0.2)",
              padding: "40px 32px 32px 32px",
              minWidth: 400,
              maxWidth: "90vw",
              textAlign: "center",
              position: "relative",
              border: "3px solid #6366f1",
            }}
          >
            <button
              onClick={handleSembolSaymaCloseResult}
              style={{
                position: "absolute",
                top: 15,
                right: 20,
                background: "#ef4444",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                width: 35,
                height: 35,
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px 0 rgba(239, 68, 68, 0.3)",
              }}
              aria-label="Kapat"
              title="Kapat"
            >
              <X size={18} />
            </button>

            <h3
              style={{
                color: "#1e293b",
                fontWeight: 700,
                marginBottom: 20,
                fontSize: "1.8em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <Target size={28} color="#6366f1" />
              Sembol Sayma Sonucu!
              <Trophy size={28} color="#f59e0b" />
            </h3>

            <div
              style={{
                fontSize: "1.3em",
                marginBottom: 20,
                background: "#f0fdf4",
                padding: "15px 25px",
                borderRadius: 16,
                border: "3px solid #10b981",
                fontWeight: 700,
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <CheckCircle size={24} color="#10b981" />
              Doğru Cevap: {sembolSaymaScore} /{" "}
              {SEMBOL_SAYMA_ALISTIRMASI.semboller.length}
            </div>

            <div
              style={{
                fontSize: "1.2em",
                marginBottom: 20,
                background: "#fef3c7",
                padding: "15px 25px",
                borderRadius: 16,
                border: "3px solid #f59e0b",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              {sembolSaymaScore ===
              SEMBOL_SAYMA_ALISTIRMASI.semboller.length ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Star size={24} color="#f59e0b" />
                  Mükemmel! Tüm sembolleri doğru saydın!
                </div>
              ) : sembolSaymaScore >=
                SEMBOL_SAYMA_ALISTIRMASI.semboller.length * 0.7 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Trophy size={24} color="#f59e0b" />
                  Çok iyi! Görsel algın gelişiyor!
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Heart size={24} color="#f59e0b" />
                  Daha çok pratik yapabilirsin!
                </div>
              )}
            </div>

            {/* Doğru cevaplar */}
            <div style={{ textAlign: "left", marginTop: 20 }}>
              <h4
                style={{ color: "#1e293b", fontWeight: 600, marginBottom: 10 }}
              >
                Doğru Cevaplar:
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "8px",
                }}
              >
                {SEMBOL_SAYMA_ALISTIRMASI.semboller.map((sembol) => (
                  <div
                    key={sembol.id}
                    style={{
                      background: "#f8fafc",
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "1px solid #e2e8f0",
                      fontSize: "0.9em",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "1.2em" }}>{sembol.sembol}</span>
                    <span>
                      {sembol.isim}: {sembol.dogruCevap}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                fontSize: "1.1em",
                background: "#f1f5f9",
                padding: "12px 20px",
                borderRadius: 12,
                border: "2px solid #64748b",
                fontWeight: 600,
                color: "#1e293b",
                marginTop: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Timer size={20} color="#64748b" />
                Süre: {45 - sembolSaymaSeconds} saniye
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Yazım alıştırması */}
      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto 40px auto",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)",
          padding: 32,
          border: "3px solid #8b5cf6",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
            position: "relative",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "2rem",
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: 10,
            }}
          >
            <BookOpen size={32} color="#8b5cf6" />
            Yazım Alıştırması
            <BookOpen size={32} color="#8b5cf6" />
          </h2>
          <p style={{ fontSize: "1.1em", color: "#64748b", marginBottom: 20 }}>
            Satırda doğru olarak yazılan kelimenin altını hızlıca çiziniz.
          </p>

          {/* Süre göstergesi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: yazimSeconds <= 5 ? "#ef4444" : "#8b5cf6",
              color: "white",
              padding: "8px 16px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: "1.1em",
              transition: "all 0.3s ease",
            }}
          >
            <Timer size={20} />
            Süre: {yazimSeconds} sn
          </div>
        </div>

        {/* Yazım tablosu */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 16,
            padding: 24,
            border: "2px solid #e2e8f0",
            marginBottom: 24,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "1.1em",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#8b5cf6",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  No
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  Kelime 1
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  Kelime 2
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  Kelime 3
                </th>
              </tr>
            </thead>
            <tbody>
              {YAZIM_ALISTIRMASI.map((item) => (
                <tr key={item.id}>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      border: "1px solid #e2e8f0",
                      background: "#f1f5f9",
                      fontWeight: 600,
                    }}
                  >
                    {item.id}
                  </td>
                  {item.kelimeler.map((kelime, index) => (
                    <td
                      key={index}
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        border: "1px solid #e2e8f0",
                        background: "white",
                        cursor:
                          yazimStarted && !yazimFinished
                            ? "pointer"
                            : "default",
                        transition: "all 0.3s ease",
                        position: "relative",
                      }}
                      onClick={() => {
                        if (yazimStarted && !yazimFinished) {
                          handleYazimAnswerChange(item.id, index);
                        }
                      }}
                      onMouseEnter={(e) => {
                        if (yazimStarted && !yazimFinished) {
                          e.target.style.background = "#f3f4f6";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "white";
                      }}
                    >
                      <span
                        style={{
                          textDecoration:
                            yazimAnswers[item.id] === index
                              ? "underline"
                              : "none",
                          textDecorationColor:
                            yazimAnswers[item.id] === index
                              ? "#8b5cf6"
                              : "transparent",
                          textDecorationThickness: "3px",
                          fontWeight:
                            yazimAnswers[item.id] === index ? 700 : 400,
                          color:
                            yazimAnswers[item.id] === index
                              ? "#8b5cf6"
                              : "#1e293b",
                        }}
                      >
                        {kelime}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kontrol butonları */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {!yazimStarted && !yazimFinished && (
            <button
              onClick={handleYazimStart}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#8b5cf6",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(139, 92, 246, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(139, 92, 246, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(139, 92, 246, 0.3)";
              }}
            >
              <Play size={20} />
              Yazım Alıştırmasını Başlat!
            </button>
          )}
          {yazimStarted && !yazimFinished && (
            <button
              onClick={handleYazimFinish}
              style={{
                padding: "16px 48px",
                fontSize: "1.3em",
                fontWeight: 700,
                background: "#ef4444",
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 6px 20px 0 rgba(239, 68, 68, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                animation: "pulse 1.5s infinite",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 25px 0 rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 6px 20px 0 rgba(239, 68, 68, 0.3)";
              }}
            >
              <CheckCircle size={20} />
              Bitir
            </button>
          )}
        </div>
      </div>

      {/* Yazım alıştırması sonuç kartı */}
      {showYazimResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 20,
              boxShadow: "0 12px 40px 0 rgba(0,0,0,0.2)",
              padding: "40px 32px 32px 32px",
              minWidth: 400,
              maxWidth: "90vw",
              maxHeight: "80vh",
              textAlign: "center",
              position: "relative",
              border: "3px solid #8b5cf6",
              overflowY: "auto",
            }}
          >
            <button
              onClick={handleYazimCloseResult}
              style={{
                position: "absolute",
                top: 15,
                right: 20,
                background: "#ef4444",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                width: 35,
                height: 35,
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2em",
                fontWeight: 700,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              <X size={16} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Trophy size={48} color="#8b5cf6" />
            </div>

            <h3
              style={{
                fontSize: "1.8em",
                fontWeight: 700,
                color: "#1e293b",
                marginBottom: 15,
              }}
            >
              Yazım Alıştırması Tamamlandı!
            </h3>

            <div
              style={{
                background: "#f8fafc",
                borderRadius: 16,
                padding: 24,
                marginBottom: 24,
                border: "2px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: "1.1em", color: "#64748b" }}>
                  Doğru Cevap:
                </span>
                <span
                  style={{
                    fontSize: "1.3em",
                    fontWeight: 700,
                    color: "#8b5cf6",
                  }}
                >
                  {yazimScore} / 13
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: "1.1em", color: "#64748b" }}>
                  Başarı Oranı:
                </span>
                <span
                  style={{
                    fontSize: "1.3em",
                    fontWeight: 700,
                    color: "#8b5cf6",
                  }}
                >
                  {Math.round((yazimScore / 13) * 100)}%
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "1.1em", color: "#64748b" }}>
                  Kalan Süre:
                </span>
                <span
                  style={{
                    fontSize: "1.3em",
                    fontWeight: 700,
                    color: "#8b5cf6",
                  }}
                >
                  {20 - yazimSeconds} saniye
                </span>
              </div>
            </div>

            {/* Yanlış cevapların doğrularını göster */}
            {yazimScore < 13 && (
              <div
                style={{
                  background: "#fef2f2",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 24,
                  border: "2px solid #fecaca",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.2em",
                    fontWeight: 600,
                    color: "#991b1b",
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <X size={20} color="#991b1b" />
                  Yanlış Cevaplar ve Doğruları
                </h4>
                <div style={{ textAlign: "left" }}>
                  {YAZIM_ALISTIRMASI.map((item) => {
                    const userAnswer = yazimAnswers[item.id];
                    const isCorrect = userAnswer === item.dogruIndex;

                    if (!isCorrect) {
                      return (
                        <div
                          key={item.id}
                          style={{
                            background: "#ffffff",
                            borderRadius: 8,
                            padding: "12px 16px",
                            marginBottom: 8,
                            border: "1px solid #fecaca",
                          }}
                        >
                          <div style={{ marginBottom: 4 }}>
                            <span style={{ fontWeight: 600, color: "#374151" }}>
                              Soru {item.id}:
                            </span>
                          </div>
                          <div style={{ marginBottom: 4 }}>
                            <span style={{ color: "#6b7280" }}>
                              Sizin cevabınız:{" "}
                            </span>
                            <span
                              style={{
                                color: "#dc2626",
                                fontWeight: 600,
                                textDecoration: "line-through",
                              }}
                            >
                              {userAnswer !== undefined
                                ? item.kelimeler[userAnswer]
                                : "Cevaplanmadı"}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: "#6b7280" }}>
                              Doğru cevap:{" "}
                            </span>
                            <span
                              style={{
                                color: "#059669",
                                fontWeight: 600,
                              }}
                            >
                              {item.kelimeler[item.dogruIndex]}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {yazimScore >= 10 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#dcfce7",
                    color: "#166534",
                    padding: "8px 16px",
                    borderRadius: 12,
                    fontWeight: 600,
                  }}
                >
                  <Star size={20} color="#166534" />
                  Mükemmel!
                </div>
              ) : yazimScore >= 7 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#fef3c7",
                    color: "#92400e",
                    padding: "8px 16px",
                    borderRadius: 12,
                    fontWeight: 600,
                  }}
                >
                  <Target size={20} color="#92400e" />
                  İyi!
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#fee2e2",
                    color: "#991b1b",
                    padding: "8px 16px",
                    borderRadius: 12,
                    fontWeight: 600,
                  }}
                >
                  <Heart size={20} color="#991b1b" />
                  Daha fazla çalış!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
