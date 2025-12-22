"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkPageAccess } from "@/lib/checkAccess";

export default function IngilizcePage() {
  const router = useRouter();
  const [activeTopic, setActiveTopic] = useState("kisi-zamirleri");
  const [activeSection, setActiveSection] = useState("konu");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Erişim kontrolü
    const accessCheck = checkPageAccess("/ingilizce");
    if (!accessCheck.hasAccess) {
      router.push(accessCheck.redirectPath || "/subscription-expired");
      return;
    }
  }, [router]);

  // Konuları gruplara ayıralım
  const topicGroups = {
    zamirler: {
      title: "Zamirler (Pronouns)",
      topics: [
        {
          id: "kisi-zamirleri",
          title: "Kişi Zamirleri",
          englishTitle: "Subject Pronouns",
          examples: ["I", "you", "he", "she", "it", "we", "they"],
        },
        {
          id: "aitlik-zamirleri",
          title: "Aitlik Zamirleri",
          englishTitle: "Possessive Pronouns",
          examples: ["my", "your", "his", "her", "our", "their", "its"],
        },
      ],
    },
    "temel-kelimeler": {
      title: "Temel Kelimeler (Basic Words)",
      topics: [
        {
          id: "sayilar",
          title: "Sayılar",
          englishTitle: "Numbers in English",
          examples: [
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten",
            "eleven",
            "twelve",
            "thirteen",
            "fourteen",
            "fifteen",
            "sixteen",
            "seventeen",
            "eighteen",
            "nineteen",
            "twenty",
            "thirty",
            "forty",
            "fifty",
            "sixty",
            "seventy",
            "eighty",
            "ninety",
            "one hundred",
          ],
        },
        {
          id: "renkler",
          title: "Renkler",
          englishTitle: "Colors in English",
          examples: [
            "red",
            "blue",
            "green",
            "yellow",
            "orange",
            "purple",
            "pink",
            "brown",
            "black",
            "white",
            "gray",
            "gold",
            "silver",
            "navy",
            "turquoise",
          ],
        },
        {
          id: "hayvanlar",
          title: "Hayvanlar",
          englishTitle: "Animals in English",
          examples: [
            "dog",
            "cat",
            "bird",
            "fish",
            "rabbit",
            "horse",
            "cow",
            "pig",
            "sheep",
            "chicken",
            "duck",
            "elephant",
            "lion",
            "tiger",
            "bear",
            "monkey",
            "snake",
            "frog",
            "butterfly",
            "bee",
          ],
        },
      ],
    },
    "soru-kaliplari": {
      title: "Soru Kalıpları (Question Patterns)",
      topics: [
        {
          id: "isim-sorma",
          title: "İsim Sorma Söyleme",
          englishTitle: "Asking & Telling Name",
          examples: [
            "What is your name?",
            "My name is...",
            "How are you?",
            "I am fine, thank you.",
          ],
        },
        {
          id: "yas-sorma",
          title: "Yaş Sorma ve Söyleme",
          englishTitle: "Asking & Telling Age",
          examples: [
            "How old are you?",
            "I am ... years old",
            "What is your age?",
            "My age is...",
          ],
        },
        {
          id: "saat-sorma",
          title: "Saat Sorma ve Söyleme",
          englishTitle: "Asking & Telling Time",
          examples: [
            "What time is it?",
            "It is... o'clock",
            "What time do you...?",
            "I ... at...",
          ],
        },
        {
          id: "gunler-sorma",
          title: "Günleri Sorma ve Söyleme",
          englishTitle: "Asking & Telling Day",
          examples: [
            "What day is it today?",
            "Today is...",
            "What day is tomorrow?",
            "Tomorrow is...",
          ],
        },
      ],
    },
    "genel-konular": {
      title: "Genel Konular (General Topics)",
      topics: [
        {
          id: "nereli-sorma",
          title: "Ülkeler ve Milliyetler",
          englishTitle: "Countries & Nationalities",
          examples: [
            "Turkey",
            "Germany",
            "France",
            "Italy",
            "Spain",
            "England",
            "USA",
            "Canada",
            "Australia",
            "Japan",
            "China",
            "Brazil",
            "Netherlands",
            "Sweden",
            "Norway",
            "Russia",
            "India",
            "Mexico",
            "Egypt",
            "South Korea",
          ],
        },
        {
          id: "meslek-sorma",
          title: "Meslekler",
          englishTitle: "Jobs & Professions",
          examples: [
            "teacher",
            "doctor",
            "engineer",
            "lawyer",
            "nurse",
            "police officer",
            "firefighter",
            "chef",
            "driver",
            "artist",
            "musician",
            "dentist",
            "architect",
            "scientist",
            "businessman",
            "farmer",
            "soldier",
            "pilot",
            "journalist",
            "designer",
          ],
        },
        {
          id: "tasitlar",
          title: "Taşıtlar",
          englishTitle: "Transportation",
          examples: [
            "car",
            "bus",
            "train",
            "bicycle",
            "motorcycle",
            "truck",
            "taxi",
            "ambulance",
            "police car",
            "fire truck",
            "airplane",
            "helicopter",
            "jet",
            "balloon",
            "rocket",
            "spaceship",
            "ship",
            "boat",
            "ferry",
            "yacht",
            "submarine",
            "canoe",
            "sailboat",
          ],
        },
        {
          id: "yemek-meyve",
          title: "Yemek ve Meyveler",
          englishTitle: "Food & Fruits",
          examples: [
            "apple",
            "banana",
            "orange",
            "grape",
            "strawberry",
            "watermelon",
            "pineapple",
            "mango",
            "pear",
            "peach",
            "bread",
            "rice",
            "pasta",
            "chicken",
            "beef",
            "fish",
            "egg",
            "milk",
            "cheese",
            "butter",
            "carrot",
            "tomato",
            "potato",
            "onion",
            "cucumber",
            "lettuce",
            "broccoli",
            "corn",
            "pepper",
            "garlic",
            "hamburger",
            "pizza",
            "hot dog",
            "french fries",
            "sandwich",
            "taco",
            "nuggets",
            "ice cream",
            "cake",
            "cookie",
            "chocolate",
            "water",
            "tea",
            "coffee",
            "juice",
            "soda",
            "lemonade",
            "hot chocolate",
            "milkshake",
            "smoothie",
          ],
        },
        {
          id: "ev-esyalari",
          title: "Ev Eşyaları",
          englishTitle: "Household Items",
          examples: [
            "table",
            "chair",
            "bed",
            "sofa",
            "desk",
            "bookshelf",
            "wardrobe",
            "mirror",
            "lamp",
            "clock",
            "refrigerator",
            "oven",
            "microwave",
            "dishwasher",
            "washing machine",
            "television",
            "computer",
            "phone",
            "fan",
            "air conditioner",
            "pillow",
            "blanket",
            "curtain",
            "carpet",
            "towel",
            "bathroom",
            "kitchen",
            "bedroom",
            "living room",
            "dining room",
            "window",
            "door",
            "wall",
            "floor",
            "ceiling",
            "stairs",
            "garden",
            "balcony",
            "garage",
            "basement",
          ],
        },
      ],
    },
  };

  // Tüm konuları düz bir array olarak da tutalım (mevcut kod için)
  const topics = Object.values(topicGroups).flatMap((group) => group.topics);

  const currentTopic = topics.find((topic) => topic.id === activeTopic);

  // Alıştırma verileri ve doğru cevaplar
  const exercises = {
    "kisi-zamirleri": [
      {
        question: "___ am happy today.",
        options: ["I", "You", "He", "She"],
        correct: "I",
        explanation: "I am happy today. (Ben bugün mutluyum.)",
      },
      {
        question: "___ are my best friend.",
        options: ["I", "You", "He", "She"],
        correct: "You",
        explanation: "You are my best friend. (Sen benim en iyi arkadaşımsın.)",
      },
      {
        question: "___ is a student.",
        options: ["I", "You", "He"],
        correct: "He",
        explanation: "He is a student. (O bir öğrenci.)",
      },
      {
        question: "___ is a doctor.",
        options: ["I", "You", "She"],
        correct: "She",
        explanation: "She is a doctor. (O bir doktor.)",
      },
      {
        question: "___ are students.",
        options: ["I", "You", "We", "It"],
        correct: "We",
        explanation: "We are students. (Biz öğrencileriz.)",
      },
    ],
    "aitlik-zamirleri": [
      {
        question: "This is ___ book. (Benim)",
        options: ["my", "your", "his", "her"],
        correct: "my",
        explanation: "This is my book. (Bu benim kitabım.)",
      },
      {
        question: "That is ___ car. (Senin)",
        options: ["my", "your", "his", "her"],
        correct: "your",
        explanation: "That is your car. (O senin araban.)",
      },
      {
        question: "This is ___ house. (Onun - erkek)",
        options: ["my", "your", "his", "her"],
        correct: "his",
        explanation: "This is his house. (Bu onun evi.)",
      },
      {
        question: "That is ___ dog. (Onun - kadın)",
        options: ["my", "your", "his", "her"],
        correct: "her",
        explanation: "That is her dog. (O onun köpeği.)",
      },
      {
        question: "This is ___ school. (Bizim)",
        options: ["our", "their", "its", "your"],
        correct: "our",
        explanation: "This is our school. (Bu bizim okulumuz.)",
      },
      {
        question: "That is ___ garden. (Onların)",
        options: ["our", "their", "its", "your"],
        correct: "their",
        explanation: "That is their garden. (O onların bahçesi.)",
      },
    ],
    sayilar: [
      {
        question: "5 sayısının İngilizce karşılığı nedir?",
        options: ["three", "four", "five", "six"],
        correct: "five",
        explanation: "5 = five",
      },
      {
        question: "seven sayısının rakamla yazılışı nedir?",
        options: ["5", "6", "7", "8"],
        correct: "7",
        explanation: "seven = 7",
      },
      {
        question: "15 sayısının İngilizce karşılığı nedir?",
        options: ["thirteen", "fourteen", "fifteen", "sixteen"],
        correct: "fifteen",
        explanation: "15 = fifteen",
      },
      {
        question: "twenty sayısının rakamla yazılışı nedir?",
        options: ["18", "19", "20", "21"],
        correct: "20",
        explanation: "twenty = 20",
      },
      {
        question: "50 sayısının İngilizce karşılığı nedir?",
        options: ["forty", "fifty", "sixty", "seventy"],
        correct: "fifty",
        explanation: "50 = fifty",
      },
      {
        question: "eighty sayısının rakamla yazılışı nedir?",
        options: ["70", "80", "90", "100"],
        correct: "80",
        explanation: "eighty = 80",
      },
    ],
    renkler: [
      {
        question: "Kırmızı rengin İngilizce karşılığı nedir?",
        options: ["red", "blue", "green", "yellow"],
        correct: "red",
        explanation: "Kırmızı = red",
      },
      {
        question: "Mavi rengin İngilizce karşılığı nedir?",
        options: ["red", "blue", "green", "yellow"],
        correct: "blue",
        explanation: "Mavi = blue",
      },
      {
        question: "Yeşil rengin İngilizce karşılığı nedir?",
        options: ["red", "blue", "green", "yellow"],
        correct: "green",
        explanation: "Yeşil = green",
      },
      {
        question: "Sarı rengin İngilizce karşılığı nedir?",
        options: ["red", "blue", "green", "yellow"],
        correct: "yellow",
        explanation: "Sarı = yellow",
      },
      {
        question: "Turuncu rengin İngilizce karşılığı nedir?",
        options: ["orange", "purple", "pink", "brown"],
        correct: "orange",
        explanation: "Turuncu = orange",
      },
      {
        question: "Mor rengin İngilizce karşılığı nedir?",
        options: ["orange", "purple", "pink", "brown"],
        correct: "purple",
        explanation: "Mor = purple",
      },
      {
        question: "Siyah rengin İngilizce karşılığı nedir?",
        options: ["black", "white", "gray", "brown"],
        correct: "black",
        explanation: "Siyah = black",
      },
      {
        question: "Beyaz rengin İngilizce karşılığı nedir?",
        options: ["black", "white", "gray", "brown"],
        correct: "white",
        explanation: "Beyaz = white",
      },
    ],
    hayvanlar: [
      {
        question: "Köpeğin İngilizce karşılığı nedir?",
        options: ["dog", "cat", "bird", "fish"],
        correct: "dog",
        explanation: "Köpek = dog",
      },
      {
        question: "Kedinin İngilizce karşılığı nedir?",
        options: ["dog", "cat", "bird", "fish"],
        correct: "cat",
        explanation: "Kedi = cat",
      },
      {
        question: "Kuşun İngilizce karşılığı nedir?",
        options: ["dog", "cat", "bird", "fish"],
        correct: "bird",
        explanation: "Kuş = bird",
      },
      {
        question: "Balığın İngilizce karşılığı nedir?",
        options: ["dog", "cat", "bird", "fish"],
        correct: "fish",
        explanation: "Balık = fish",
      },
      {
        question: "Tavşanın İngilizce karşılığı nedir?",
        options: ["rabbit", "horse", "cow", "pig"],
        correct: "rabbit",
        explanation: "Tavşan = rabbit",
      },
      {
        question: "Atın İngilizce karşılığı nedir?",
        options: ["rabbit", "horse", "cow", "pig"],
        correct: "horse",
        explanation: "At = horse",
      },
      {
        question: "Aslanın İngilizce karşılığı nedir?",
        options: ["elephant", "lion", "tiger", "bear"],
        correct: "lion",
        explanation: "Aslan = lion",
      },
      {
        question: "Kaplanın İngilizce karşılığı nedir?",
        options: ["elephant", "lion", "tiger", "bear"],
        correct: "tiger",
        explanation: "Kaplan = tiger",
      },
      {
        question: "Filin İngilizce karşılığı nedir?",
        options: ["elephant", "lion", "tiger", "bear"],
        correct: "elephant",
        explanation: "Fil = elephant",
      },
      {
        question: "Kurbağanın İngilizce karşılığı nedir?",
        options: ["snake", "frog", "butterfly", "bee"],
        correct: "frog",
        explanation: "Kurbağa = frog",
      },
    ],
    "isim-sorma": [
      {
        question: "What is your name? sorusuna nasıl cevap verilir?",
        options: ["How are you?", "My name is...", "Thank you", "Goodbye"],
        correct: "My name is...",
        explanation:
          "What is your name? → My name is... (Adın ne? → Benim adım...)",
      },
      {
        question: "Nasılsın? sorusunun İngilizce karşılığı nedir?",
        options: [
          "What is your name?",
          "How are you?",
          "Where are you?",
          "When are you?",
        ],
        correct: "How are you?",
        explanation: "Nasılsın? → How are you?",
      },
      {
        question: "What is your name? sorusunun Türkçe karşılığı nedir?",
        options: ["Nasılsın?", "Adın ne?", "Nerelisin?", "Kaç yaşındasın?"],
        correct: "Adın ne?",
        explanation: "What is your name? → Adın ne?",
      },
      {
        question: "My name is John. cümlesinin Türkçe karşılığı nedir?",
        options: ["Ben John'um", "Benim adım John", "John benim", "John adım"],
        correct: "Benim adım John",
        explanation: "My name is John. → Benim adım John.",
      },
      {
        question: "How are you? sorusuna nasıl cevap verilir?",
        options: [
          "I am fine",
          "My name is...",
          "I am... years old",
          "I am from...",
        ],
        correct: "I am fine",
        explanation: "How are you? → I am fine (Nasılsın? → İyiyim)",
      },
    ],
    "yas-sorma": [
      {
        question: "Yaş sorma kalıbı nedir?",
        options: [
          "How old are you?",
          "What is your name?",
          "Where are you from?",
          "What time is it?",
        ],
        correct: "How old are you?",
        explanation: "Yaş sorma → How old are you? (Kaç yaşındasın?)",
      },
      {
        question: "I am 25 years old. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Ben 25 yaşındayım",
          "Ben 26 yaşındayım",
          "Ben 24 yaşındayım",
          "Ben 27 yaşındayım",
        ],
        correct: "Ben 25 yaşındayım",
        explanation: "I am 25 years old. → Ben 25 yaşındayım.",
      },
      {
        question: "How old are you? sorusunun Türkçe karşılığı nedir?",
        options: ["Adın ne?", "Kaç yaşındasın?", "Nerelisin?", "Saat kaç?"],
        correct: "Kaç yaşındasın?",
        explanation: "How old are you? → Kaç yaşındasın?",
      },
      {
        question: "I am 18 years old. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Ben 18 yaşındayım",
          "Ben 19 yaşındayım",
          "Ben 17 yaşındayım",
          "Ben 20 yaşındayım",
        ],
        correct: "Ben 18 yaşındayım",
        explanation: "I am 18 years old. → Ben 18 yaşındayım.",
      },
      {
        question: "What is your age? sorusunun Türkçe karşılığı nedir?",
        options: ["Kaç yaşındasın?", "Yaşın ne?", "Adın ne?", "Nerelisin?"],
        correct: "Yaşın ne?",
        explanation: "What is your age? → Yaşın ne?",
      },
    ],
    "saat-sorma": [
      {
        question: "Saat kaç? sorusunun İngilizce karşılığı nedir?",
        options: [
          "What time is it?",
          "What day is it?",
          "What is your name?",
          "How old are you?",
        ],
        correct: "What time is it?",
        explanation: "Saat kaç? → What time is it?",
      },
      {
        question: "It is 3 o'clock. cümlesinin Türkçe karşılığı nedir?",
        options: ["Saat 3", "Saat 4", "Saat 2", "Saat 5"],
        correct: "Saat 3",
        explanation: "It is 3 o'clock. → Saat 3.",
      },
      {
        question: "What time is it? sorusunun Türkçe karşılığı nedir?",
        options: [
          "Saat kaç?",
          "Bugün hangi gün?",
          "Adın ne?",
          "Kaç yaşındasın?",
        ],
        correct: "Saat kaç?",
        explanation: "What time is it? → Saat kaç?",
      },
      {
        question: "It is 9 o'clock. cümlesinin Türkçe karşılığı nedir?",
        options: ["Saat 8", "Saat 9", "Saat 10", "Saat 11"],
        correct: "Saat 9",
        explanation: "It is 9 o'clock. → Saat 9.",
      },
      {
        question:
          "What time do you go to school? sorusunun Türkçe karşılığı nedir?",
        options: [
          "Okula ne zaman gidiyorsun?",
          "Okula saat kaçta gidiyorsun?",
          "Okula nerede gidiyorsun?",
          "Okula nasıl gidiyorsun?",
        ],
        correct: "Okula saat kaçta gidiyorsun?",
        explanation:
          "What time do you go to school? → Okula saat kaçta gidiyorsun?",
      },
    ],
    "gunler-sorma": [
      {
        question: "Bugün hangi gün? sorusunun İngilizce karşılığı nedir?",
        options: [
          "What day is it today?",
          "What time is it?",
          "What is your name?",
          "How old are you?",
        ],
        correct: "What day is it today?",
        explanation: "Bugün hangi gün? → What day is it today?",
      },
      {
        question: "Today is Monday. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Bugün Pazartesi",
          "Bugün Salı",
          "Bugün Çarşamba",
          "Bugün Perşembe",
        ],
        correct: "Bugün Pazartesi",
        explanation: "Today is Monday. → Bugün Pazartesi.",
      },
      {
        question: "Yarın hangi gün? sorusunun İngilizce karşılığı nedir?",
        options: [
          "What day is it today?",
          "What day is tomorrow?",
          "What day is it?",
          "What is tomorrow?",
        ],
        correct: "What day is tomorrow?",
        explanation: "Yarın hangi gün? → What day is tomorrow?",
      },
      {
        question: "Tomorrow is Tuesday. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Yarın Pazartesi",
          "Yarın Salı",
          "Yarın Çarşamba",
          "Yarın Perşembe",
        ],
        correct: "Yarın Salı",
        explanation: "Tomorrow is Tuesday. → Yarın Salı.",
      },
      {
        question: "Pazartesi gününün İngilizce karşılığı nedir?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        correct: "Monday",
        explanation: "Pazartesi = Monday",
      },
      {
        question: "Tuesday gününün Türkçe karşılığı nedir?",
        options: ["Pazartesi", "Salı", "Çarşamba", "Perşembe"],
        correct: "Salı",
        explanation: "Tuesday = Salı",
      },
      {
        question: "Çarşamba gününün İngilizce karşılığı nedir?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        correct: "Wednesday",
        explanation: "Çarşamba = Wednesday",
      },
      {
        question: "Thursday gününün Türkçe karşılığı nedir?",
        options: ["Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
        correct: "Perşembe",
        explanation: "Thursday = Perşembe",
      },
      {
        question: "Cuma gününün İngilizce karşılığı nedir?",
        options: ["Thursday", "Friday", "Saturday", "Sunday"],
        correct: "Friday",
        explanation: "Cuma = Friday",
      },
      {
        question: "Saturday gününün Türkçe karşılığı nedir?",
        options: ["Cuma", "Cumartesi", "Pazar", "Pazartesi"],
        correct: "Cumartesi",
        explanation: "Saturday = Cumartesi",
      },
      {
        question: "Pazar gününün İngilizce karşılığı nedir?",
        options: ["Friday", "Saturday", "Sunday", "Monday"],
        correct: "Sunday",
        explanation: "Pazar = Sunday",
      },
      {
        question: "Sunday gününün Türkçe karşılığı nedir?",
        options: ["Cumartesi", "Pazar", "Pazartesi", "Salı"],
        correct: "Pazar",
        explanation: "Sunday = Pazar",
      },
      {
        question: "I have school on Monday. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Pazartesi günü okulum var",
          "Salı günü okulum var",
          "Çarşamba günü okulum var",
          "Perşembe günü okulum var",
        ],
        correct: "Pazartesi günü okulum var",
        explanation: "I have school on Monday. → Pazartesi günü okulum var.",
      },
      {
        question:
          "We go shopping on Saturday. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Cumartesi günü alışverişe gideriz",
          "Pazar günü alışverişe gideriz",
          "Cuma günü alışverişe gideriz",
          "Perşembe günü alışverişe gideriz",
        ],
        correct: "Cumartesi günü alışverişe gideriz",
        explanation:
          "We go shopping on Saturday. → Cumartesi günü alışverişe gideriz.",
      },
      {
        question: "Sunday is a rest day. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Pazar günü dinlenme günüdür",
          "Cumartesi günü dinlenme günüdür",
          "Cuma günü dinlenme günüdür",
          "Perşembe günü dinlenme günüdür",
        ],
        correct: "Pazar günü dinlenme günüdür",
        explanation: "Sunday is a rest day. → Pazar günü dinlenme günüdür.",
      },
      {
        question: "What day is it today? sorusunun Türkçe karşılığı nedir?",
        options: [
          "Bugün hangi gün?",
          "Yarın hangi gün?",
          "Hangi gün?",
          "Bugün ne?",
        ],
        correct: "Bugün hangi gün?",
        explanation: "What day is it today? → Bugün hangi gün?",
      },
      {
        question: "What day is tomorrow? sorusunun Türkçe karşılığı nedir?",
        options: [
          "Bugün hangi gün?",
          "Yarın hangi gün?",
          "Hangi gün?",
          "Yarın ne?",
        ],
        correct: "Yarın hangi gün?",
        explanation: "What day is tomorrow? → Yarın hangi gün?",
      },
      {
        question: "Today is Wednesday. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Bugün Salı",
          "Bugün Çarşamba",
          "Bugün Perşembe",
          "Bugün Cuma",
        ],
        correct: "Bugün Çarşamba",
        explanation: "Today is Wednesday. → Bugün Çarşamba.",
      },
    ],
    "nereli-sorma": [
      {
        question: "Nerelisin? sorusunun İngilizce karşılığı nedir?",
        options: [
          "Where are you from?",
          "What is your name?",
          "How old are you?",
          "What time is it?",
        ],
        correct: "Where are you from?",
        explanation: "Nerelisin? → Where are you from?",
      },
      {
        question: "I am from Turkey. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Ben Türküm",
          "Ben Almanım",
          "Ben Fransızım",
          "Ben İtalyanım",
        ],
        correct: "Ben Türküm",
        explanation: "I am from Turkey. → Ben Türküm.",
      },
      {
        question: "Türkiye'nin İngilizce karşılığı nedir?",
        options: ["Turkey", "Germany", "France", "Italy"],
        correct: "Turkey",
        explanation: "Türkiye = Turkey",
      },
      {
        question: "Germany ülkesinin Türkçe karşılığı nedir?",
        options: ["Türkiye", "Almanya", "Fransa", "İtalya"],
        correct: "Almanya",
        explanation: "Germany = Almanya",
      },
      {
        question: "Fransa'nın İngilizce karşılığı nedir?",
        options: ["Turkey", "Germany", "France", "Italy"],
        correct: "France",
        explanation: "Fransa = France",
      },
      {
        question: "Italy ülkesinin Türkçe karşılığı nedir?",
        options: ["Türkiye", "Almanya", "Fransa", "İtalya"],
        correct: "İtalya",
        explanation: "Italy = İtalya",
      },
      {
        question: "İspanya'nın İngilizce karşılığı nedir?",
        options: ["Spain", "England", "USA", "Canada"],
        correct: "Spain",
        explanation: "İspanya = Spain",
      },
      {
        question: "England ülkesinin Türkçe karşılığı nedir?",
        options: ["İspanya", "İngiltere", "Amerika", "Kanada"],
        correct: "İngiltere",
        explanation: "England = İngiltere",
      },
      {
        question: "Amerika'nın İngilizce karşılığı nedir?",
        options: ["Spain", "England", "USA", "Canada"],
        correct: "USA",
        explanation: "Amerika = USA",
      },
      {
        question: "Canada ülkesinin Türkçe karşılığı nedir?",
        options: ["İspanya", "İngiltere", "Amerika", "Kanada"],
        correct: "Kanada",
        explanation: "Canada = Kanada",
      },
      {
        question: "Avustralya'nın İngilizce karşılığı nedir?",
        options: ["Australia", "Japan", "China", "Brazil"],
        correct: "Australia",
        explanation: "Avustralya = Australia",
      },
      {
        question: "Japan ülkesinin Türkçe karşılığı nedir?",
        options: ["Avustralya", "Japonya", "Çin", "Brezilya"],
        correct: "Japonya",
        explanation: "Japan = Japonya",
      },
      {
        question: "Çin'in İngilizce karşılığı nedir?",
        options: ["Australia", "Japan", "China", "Brazil"],
        correct: "China",
        explanation: "Çin = China",
      },
      {
        question: "Brazil ülkesinin Türkçe karşılığı nedir?",
        options: ["Avustralya", "Japonya", "Çin", "Brezilya"],
        correct: "Brezilya",
        explanation: "Brazil = Brezilya",
      },
      {
        question: "Hollanda'nın İngilizce karşılığı nedir?",
        options: ["Netherlands", "Sweden", "Norway", "Russia"],
        correct: "Netherlands",
        explanation: "Hollanda = Netherlands",
      },
      {
        question: "Sweden ülkesinin Türkçe karşılığı nedir?",
        options: ["Hollanda", "İsveç", "Norveç", "Rusya"],
        correct: "İsveç",
        explanation: "Sweden = İsveç",
      },
      {
        question: "Norveç'in İngilizce karşılığı nedir?",
        options: ["Netherlands", "Sweden", "Norway", "Russia"],
        correct: "Norway",
        explanation: "Norveç = Norway",
      },
      {
        question: "Russia ülkesinin Türkçe karşılığı nedir?",
        options: ["Hollanda", "İsveç", "Norveç", "Rusya"],
        correct: "Rusya",
        explanation: "Russia = Rusya",
      },
      {
        question: "Hindistan'ın İngilizce karşılığı nedir?",
        options: ["India", "Mexico", "Egypt", "South Korea"],
        correct: "India",
        explanation: "Hindistan = India",
      },
      {
        question: "Mexico ülkesinin Türkçe karşılığı nedir?",
        options: ["Hindistan", "Meksika", "Mısır", "Güney Kore"],
        correct: "Meksika",
        explanation: "Mexico = Meksika",
      },
      {
        question: "Mısır'ın İngilizce karşılığı nedir?",
        options: ["India", "Mexico", "Egypt", "South Korea"],
        correct: "Egypt",
        explanation: "Mısır = Egypt",
      },
      {
        question: "South Korea ülkesinin Türkçe karşılığı nedir?",
        options: ["Hindistan", "Meksika", "Mısır", "Güney Kore"],
        correct: "Güney Kore",
        explanation: "South Korea = Güney Kore",
      },
      {
        question: "What is your nationality? sorusunun Türkçe karşılığı nedir?",
        options: [
          "Nerelisin?",
          "Milliyetin ne?",
          "Hangi ülkedensin?",
          "Nerede yaşıyorsun?",
        ],
        correct: "Milliyetin ne?",
        explanation: "What is your nationality? → Milliyetin ne?",
      },
      {
        question: "I am Turkish. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Ben Türkiyeliyim",
          "Ben Türküm",
          "Ben Türkiye'de yaşıyorum",
          "Ben Türkiye'ye gidiyorum",
        ],
        correct: "Ben Türküm",
        explanation: "I am Turkish. → Ben Türküm.",
      },
      {
        question: "German milliyetinin Türkçe karşılığı nedir?",
        options: ["Alman", "Almanya", "Almanya'dan", "Almanya'da"],
        correct: "Alman",
        explanation: "German = Alman",
      },
      {
        question: "French milliyetinin Türkçe karşılığı nedir?",
        options: ["Fransız", "Fransa", "Fransa'dan", "Fransa'da"],
        correct: "Fransız",
        explanation: "French = Fransız",
      },
      {
        question: "Italian milliyetinin Türkçe karşılığı nedir?",
        options: ["İtalyan", "İtalya", "İtalya'dan", "İtalya'da"],
        correct: "İtalyan",
        explanation: "Italian = İtalyan",
      },
    ],
    "meslek-sorma": [
      {
        question: "Ne iş yapıyorsun? sorusunun İngilizce karşılığı nedir?",
        options: [
          "What do you do?",
          "What is your name?",
          "How old are you?",
          "Where are you from?",
        ],
        correct: "What do you do?",
        explanation: "Ne iş yapıyorsun? → What do you do?",
      },
      {
        question: "I am a teacher. cümlesinin Türkçe karşılığı nedir?",
        options: [
          "Ben bir öğretmenim",
          "Ben bir doktorum",
          "Ben bir mühendisim",
          "Ben bir avukatım",
        ],
        correct: "Ben bir öğretmenim",
        explanation: "I am a teacher. → Ben bir öğretmenim.",
      },
      {
        question: "Öğretmenin İngilizce karşılığı nedir?",
        options: ["teacher", "doctor", "engineer", "lawyer"],
        correct: "teacher",
        explanation: "Öğretmen = teacher",
      },
      {
        question: "Doctor mesleğinin Türkçe karşılığı nedir?",
        options: ["Öğretmen", "Doktor", "Mühendis", "Avukat"],
        correct: "Doktor",
        explanation: "Doctor = Doktor",
      },
      {
        question: "Mühendisin İngilizce karşılığı nedir?",
        options: ["teacher", "doctor", "engineer", "lawyer"],
        correct: "engineer",
        explanation: "Mühendis = engineer",
      },
      {
        question: "Lawyer mesleğinin Türkçe karşılığı nedir?",
        options: ["Öğretmen", "Doktor", "Mühendis", "Avukat"],
        correct: "Avukat",
        explanation: "Lawyer = Avukat",
      },
      {
        question: "Hemşirenin İngilizce karşılığı nedir?",
        options: ["nurse", "police officer", "firefighter", "chef"],
        correct: "nurse",
        explanation: "Hemşire = nurse",
      },
      {
        question: "Police officer mesleğinin Türkçe karşılığı nedir?",
        options: ["Hemşire", "Polis memuru", "İtfaiyeci", "Aşçı"],
        correct: "Polis memuru",
        explanation: "Police officer = Polis memuru",
      },
      {
        question: "İtfaiyecinin İngilizce karşılığı nedir?",
        options: ["nurse", "police officer", "firefighter", "chef"],
        correct: "firefighter",
        explanation: "İtfaiyeci = firefighter",
      },
      {
        question: "Chef mesleğinin Türkçe karşılığı nedir?",
        options: ["Hemşire", "Polis memuru", "İtfaiyeci", "Aşçı"],
        correct: "Aşçı",
        explanation: "Chef = Aşçı",
      },
      {
        question: "Şoförün İngilizce karşılığı nedir?",
        options: ["driver", "artist", "musician", "dentist"],
        correct: "driver",
        explanation: "Şoför = driver",
      },
      {
        question: "Artist mesleğinin Türkçe karşılığı nedir?",
        options: ["Şoför", "Sanatçı", "Müzisyen", "Diş hekimi"],
        correct: "Sanatçı",
        explanation: "Artist = Sanatçı",
      },
      {
        question: "Müzisyenin İngilizce karşılığı nedir?",
        options: ["driver", "artist", "musician", "dentist"],
        correct: "musician",
        explanation: "Müzisyen = musician",
      },
      {
        question: "Dentist mesleğinin Türkçe karşılığı nedir?",
        options: ["Şoför", "Sanatçı", "Müzisyen", "Diş hekimi"],
        correct: "Diş hekimi",
        explanation: "Dentist = Diş hekimi",
      },
      {
        question: "Mimarın İngilizce karşılığı nedir?",
        options: ["architect", "scientist", "businessman", "farmer"],
        correct: "architect",
        explanation: "Mimar = architect",
      },
      {
        question: "Scientist mesleğinin Türkçe karşılığı nedir?",
        options: ["Mimar", "Bilim insanı", "İş adamı", "Çiftçi"],
        correct: "Bilim insanı",
        explanation: "Scientist = Bilim insanı",
      },
      {
        question: "İş adamının İngilizce karşılığı nedir?",
        options: ["architect", "scientist", "businessman", "farmer"],
        correct: "businessman",
        explanation: "İş adamı = businessman",
      },
      {
        question: "Farmer mesleğinin Türkçe karşılığı nedir?",
        options: ["Mimar", "Bilim insanı", "İş adamı", "Çiftçi"],
        correct: "Çiftçi",
        explanation: "Farmer = Çiftçi",
      },
      {
        question: "Askerin İngilizce karşılığı nedir?",
        options: ["soldier", "pilot", "journalist", "designer"],
        correct: "soldier",
        explanation: "Asker = soldier",
      },
      {
        question: "Pilot mesleğinin Türkçe karşılığı nedir?",
        options: ["Asker", "Pilot", "Gazeteci", "Tasarımcı"],
        correct: "Pilot",
        explanation: "Pilot = Pilot",
      },
      {
        question: "Gazetecinin İngilizce karşılığı nedir?",
        options: ["soldier", "pilot", "journalist", "designer"],
        correct: "journalist",
        explanation: "Gazeteci = journalist",
      },
      {
        question: "Designer mesleğinin Türkçe karşılığı nedir?",
        options: ["Asker", "Pilot", "Gazeteci", "Tasarımcı"],
        correct: "Tasarımcı",
        explanation: "Designer = Tasarımcı",
      },
    ],
    tasitlar: [
      {
        question: "Otomobilin İngilizce karşılığı nedir?",
        options: ["car", "bus", "train", "bicycle"],
        correct: "car",
        explanation: "Otomobil = car",
      },
      {
        question: "Otobüsün İngilizce karşılığı nedir?",
        options: ["car", "bus", "train", "bicycle"],
        correct: "bus",
        explanation: "Otobüs = bus",
      },
      {
        question: "Trenin İngilizce karşılığı nedir?",
        options: ["car", "bus", "train", "bicycle"],
        correct: "train",
        explanation: "Tren = train",
      },
      {
        question: "Bisikletin İngilizce karşılığı nedir?",
        options: ["car", "bus", "train", "bicycle"],
        correct: "bicycle",
        explanation: "Bisiklet = bicycle",
      },
      {
        question: "Motosikletin İngilizce karşılığı nedir?",
        options: ["motorcycle", "truck", "taxi", "ambulance"],
        correct: "motorcycle",
        explanation: "Motosiklet = motorcycle",
      },
      {
        question: "Kamyonun İngilizce karşılığı nedir?",
        options: ["motorcycle", "truck", "taxi", "ambulance"],
        correct: "truck",
        explanation: "Kamyon = truck",
      },
      {
        question: "Taksinin İngilizce karşılığı nedir?",
        options: ["motorcycle", "truck", "taxi", "ambulance"],
        correct: "taxi",
        explanation: "Taksi = taxi",
      },
      {
        question: "Ambulansın İngilizce karşılığı nedir?",
        options: ["motorcycle", "truck", "taxi", "ambulance"],
        correct: "ambulance",
        explanation: "Ambulans = ambulance",
      },
      {
        question: "Uçağın İngilizce karşılığı nedir?",
        options: ["airplane", "helicopter", "jet", "balloon"],
        correct: "airplane",
        explanation: "Uçak = airplane",
      },
      {
        question: "Helikopterin İngilizce karşılığı nedir?",
        options: ["airplane", "helicopter", "jet", "balloon"],
        correct: "helicopter",
        explanation: "Helikopter = helicopter",
      },
      {
        question: "Jet uçağının İngilizce karşılığı nedir?",
        options: ["airplane", "helicopter", "jet", "balloon"],
        correct: "jet",
        explanation: "Jet uçağı = jet",
      },
      {
        question: "Balonun İngilizce karşılığı nedir?",
        options: ["airplane", "helicopter", "jet", "balloon"],
        correct: "balloon",
        explanation: "Balon = balloon",
      },
      {
        question: "Geminin İngilizce karşılığı nedir?",
        options: ["ship", "boat", "ferry", "yacht"],
        correct: "ship",
        explanation: "Gemi = ship",
      },
      {
        question: "Teknenin İngilizce karşılığı nedir?",
        options: ["ship", "boat", "ferry", "yacht"],
        correct: "boat",
        explanation: "Tekne = boat",
      },
      {
        question: "Vapurun İngilizce karşılığı nedir?",
        options: ["ship", "boat", "ferry", "yacht"],
        correct: "ferry",
        explanation: "Vapur = ferry",
      },
      {
        question: "Yatın İngilizce karşılığı nedir?",
        options: ["ship", "boat", "ferry", "yacht"],
        correct: "yacht",
        explanation: "Yat = yacht",
      },
      {
        question: "Denizaltının İngilizce karşılığı nedir?",
        options: ["submarine", "canoe", "sailboat", "ship"],
        correct: "submarine",
        explanation: "Denizaltı = submarine",
      },
      {
        question: "Kano'nun İngilizce karşılığı nedir?",
        options: ["submarine", "canoe", "sailboat", "ship"],
        correct: "canoe",
        explanation: "Kano = canoe",
      },
      {
        question: "Yelkenlinin İngilizce karşılığı nedir?",
        options: ["submarine", "canoe", "sailboat", "ship"],
        correct: "sailboat",
        explanation: "Yelkenli = sailboat",
      },
    ],
    "yemek-meyve": [
      {
        question: "Elmanın İngilizce karşılığı nedir?",
        options: ["apple", "banana", "orange", "grape"],
        correct: "apple",
        explanation: "Elma = apple",
      },
      {
        question: "Muzun İngilizce karşılığı nedir?",
        options: ["apple", "banana", "orange", "grape"],
        correct: "banana",
        explanation: "Muz = banana",
      },
      {
        question: "Portakalın İngilizce karşılığı nedir?",
        options: ["apple", "banana", "orange", "grape"],
        correct: "orange",
        explanation: "Portakal = orange",
      },
      {
        question: "Üzümün İngilizce karşılığı nedir?",
        options: ["apple", "banana", "orange", "grape"],
        correct: "grape",
        explanation: "Üzüm = grape",
      },
      {
        question: "Çileğin İngilizce karşılığı nedir?",
        options: ["strawberry", "watermelon", "pineapple", "mango"],
        correct: "strawberry",
        explanation: "Çilek = strawberry",
      },
      {
        question: "Karpuzun İngilizce karşılığı nedir?",
        options: ["strawberry", "watermelon", "pineapple", "mango"],
        correct: "watermelon",
        explanation: "Karpuz = watermelon",
      },
      {
        question: "Ananasın İngilizce karşılığı nedir?",
        options: ["strawberry", "watermelon", "pineapple", "mango"],
        correct: "pineapple",
        explanation: "Ananas = pineapple",
      },
      {
        question: "Mangonun İngilizce karşılığı nedir?",
        options: ["strawberry", "watermelon", "pineapple", "mango"],
        correct: "mango",
        explanation: "Mango = mango",
      },
      {
        question: "Ekmek",
        options: ["bread", "rice", "pasta", "chicken"],
        correct: "bread",
        explanation: "Ekmek = bread",
      },
      {
        question: "Pirinç",
        options: ["bread", "rice", "pasta", "chicken"],
        correct: "rice",
        explanation: "Pirinç = rice",
      },
      {
        question: "Makarna",
        options: ["bread", "rice", "pasta", "chicken"],
        correct: "pasta",
        explanation: "Makarna = pasta",
      },
      {
        question: "Tavuk",
        options: ["bread", "rice", "pasta", "chicken"],
        correct: "chicken",
        explanation: "Tavuk = chicken",
      },
      {
        question: "Dana eti",
        options: ["beef", "fish", "egg", "milk"],
        correct: "beef",
        explanation: "Dana eti = beef",
      },
      {
        question: "Balık",
        options: ["beef", "fish", "egg", "milk"],
        correct: "fish",
        explanation: "Balık = fish",
      },
      {
        question: "Yumurta",
        options: ["beef", "fish", "egg", "milk"],
        correct: "egg",
        explanation: "Yumurta = egg",
      },
      {
        question: "Süt",
        options: ["beef", "fish", "egg", "milk"],
        correct: "milk",
        explanation: "Süt = milk",
      },
      {
        question: "Peynir",
        options: ["cheese", "butter", "yogurt", "cream"],
        correct: "cheese",
        explanation: "Peynir = cheese",
      },
      {
        question: "Tereyağı",
        options: ["cheese", "butter", "yogurt", "cream"],
        correct: "butter",
        explanation: "Tereyağı = butter",
      },
      {
        question: "Havuç",
        options: ["carrot", "tomato", "potato", "onion"],
        correct: "carrot",
        explanation: "Havuç = carrot",
      },
      {
        question: "Domates",
        options: ["carrot", "tomato", "potato", "onion"],
        correct: "tomato",
        explanation: "Domates = tomato",
      },
      {
        question: "Patates",
        options: ["carrot", "tomato", "potato", "onion"],
        correct: "potato",
        explanation: "Patates = potato",
      },
      {
        question: "Soğan",
        options: ["carrot", "tomato", "potato", "onion"],
        correct: "onion",
        explanation: "Soğan = onion",
      },
      {
        question: "Salatalık",
        options: ["cucumber", "lettuce", "broccoli", "corn"],
        correct: "cucumber",
        explanation: "Salatalık = cucumber",
      },
      {
        question: "Marul",
        options: ["cucumber", "lettuce", "broccoli", "corn"],
        correct: "lettuce",
        explanation: "Marul = lettuce",
      },
      {
        question: "Brokoli",
        options: ["cucumber", "lettuce", "broccoli", "corn"],
        correct: "broccoli",
        explanation: "Brokoli = broccoli",
      },
      {
        question: "Mısır",
        options: ["cucumber", "lettuce", "broccoli", "corn"],
        correct: "corn",
        explanation: "Mısır = corn",
      },
      {
        question: "Hamburgerin İngilizce karşılığı nedir?",
        options: ["hamburger", "pizza", "hot dog", "sandwich"],
        correct: "hamburger",
        explanation: "Hamburger = hamburger",
      },
      {
        question: "Pizzanın İngilizce karşılığı nedir?",
        options: ["hamburger", "pizza", "hot dog", "sandwich"],
        correct: "pizza",
        explanation: "Pizza = pizza",
      },
      {
        question: "Sosisli ekmeğin İngilizce karşılığı nedir?",
        options: ["hamburger", "pizza", "hot dog", "sandwich"],
        correct: "hot dog",
        explanation: "Sosisli ekmek = hot dog",
      },
      {
        question: "Sandviçin İngilizce karşılığı nedir?",
        options: ["hamburger", "pizza", "hot dog", "sandwich"],
        correct: "sandwich",
        explanation: "Sandviç = sandwich",
      },
      {
        question: "Patates kızartmasının İngilizce karşılığı nedir?",
        options: ["french fries", "nuggets", "taco", "cookie"],
        correct: "french fries",
        explanation: "Patates kızartması = french fries",
      },
      {
        question: "Taco'nun İngilizce karşılığı nedir?",
        options: ["french fries", "nuggets", "taco", "cookie"],
        correct: "taco",
        explanation: "Taco = taco",
      },
      {
        question: "Nugget'ların İngilizce karşılığı nedir?",
        options: ["french fries", "nuggets", "taco", "cookie"],
        correct: "nuggets",
        explanation: "Nugget = nuggets",
      },
      {
        question: "Dondurmanın İngilizce karşılığı nedir?",
        options: ["ice cream", "cake", "cookie", "chocolate"],
        correct: "ice cream",
        explanation: "Dondurma = ice cream",
      },
      {
        question: "Pastanın İngilizce karşılığı nedir?",
        options: ["ice cream", "cake", "cookie", "chocolate"],
        correct: "cake",
        explanation: "Pasta = cake",
      },
      {
        question: "Kurabiyenin İngilizce karşılığı nedir?",
        options: ["ice cream", "cake", "cookie", "chocolate"],
        correct: "cookie",
        explanation: "Kurabiye = cookie",
      },
      {
        question: "Çikolatanın İngilizce karşılığı nedir?",
        options: ["ice cream", "cake", "cookie", "chocolate"],
        correct: "chocolate",
        explanation: "Çikolata = chocolate",
      },
      {
        question: "Suyun İngilizce karşılığı nedir?",
        options: ["water", "tea", "coffee", "juice"],
        correct: "water",
        explanation: "Su = water",
      },
      {
        question: "Çayın İngilizce karşılığı nedir?",
        options: ["water", "tea", "coffee", "juice"],
        correct: "tea",
        explanation: "Çay = tea",
      },
      {
        question: "Kahvenin İngilizce karşılığı nedir?",
        options: ["water", "tea", "coffee", "juice"],
        correct: "coffee",
        explanation: "Kahve = coffee",
      },
      {
        question: "Meyve suyunun İngilizce karşılığı nedir?",
        options: ["water", "tea", "coffee", "juice"],
        correct: "juice",
        explanation: "Meyve suyu = juice",
      },
      {
        question: "Gazozun İngilizce karşılığı nedir?",
        options: ["soda", "lemonade", "hot chocolate", "milkshake"],
        correct: "soda",
        explanation: "Gazoz = soda",
      },
      {
        question: "Limonatanın İngilizce karşılığı nedir?",
        options: ["soda", "lemonade", "hot chocolate", "milkshake"],
        correct: "lemonade",
        explanation: "Limonata = lemonade",
      },
      {
        question: "Sıcak çikolatanın İngilizce karşılığı nedir?",
        options: ["soda", "lemonade", "hot chocolate", "milkshake"],
        correct: "hot chocolate",
        explanation: "Sıcak çikolata = hot chocolate",
      },
      {
        question: "Milk shake'in İngilizce karşılığı nedir?",
        options: ["soda", "lemonade", "hot chocolate", "milkshake"],
        correct: "milkshake",
        explanation: "Milk shake = milkshake",
      },
      {
        question: "Smoothie'nin İngilizce karşılığı nedir?",
        options: ["smoothie", "milkshake", "juice", "water"],
        correct: "smoothie",
        explanation: "Smoothie = smoothie",
      },
    ],
    "ev-esyalari": [
      {
        question: "Masanın İngilizce karşılığı nedir?",
        options: ["table", "chair", "bed", "sofa"],
        correct: "table",
        explanation: "Masa = table",
      },
      {
        question: "Sandalyenin İngilizce karşılığı nedir?",
        options: ["table", "chair", "bed", "sofa"],
        correct: "chair",
        explanation: "Sandalye = chair",
      },
      {
        question: "Yatağın İngilizce karşılığı nedir?",
        options: ["table", "chair", "bed", "sofa"],
        correct: "bed",
        explanation: "Yatak = bed",
      },
      {
        question: "Koltuk takımının İngilizce karşılığı nedir?",
        options: ["table", "chair", "bed", "sofa"],
        correct: "sofa",
        explanation: "Koltuk takımı = sofa",
      },
      {
        question: "Çalışma masasının İngilizce karşılığı nedir?",
        options: ["desk", "bookshelf", "wardrobe", "mirror"],
        correct: "desk",
        explanation: "Çalışma masası = desk",
      },
      {
        question: "Kitaplığın İngilizce karşılığı nedir?",
        options: ["desk", "bookshelf", "wardrobe", "mirror"],
        correct: "bookshelf",
        explanation: "Kitaplık = bookshelf",
      },
      {
        question: "Dolabın İngilizce karşılığı nedir?",
        options: ["desk", "bookshelf", "wardrobe", "mirror"],
        correct: "wardrobe",
        explanation: "Dolap = wardrobe",
      },
      {
        question: "Aynanın İngilizce karşılığı nedir?",
        options: ["desk", "bookshelf", "wardrobe", "mirror"],
        correct: "mirror",
        explanation: "Ayna = mirror",
      },
      {
        question: "Lambanın İngilizce karşılığı nedir?",
        options: ["lamp", "clock", "refrigerator", "oven"],
        correct: "lamp",
        explanation: "Lamba = lamp",
      },
      {
        question: "Saatin İngilizce karşılığı nedir?",
        options: ["lamp", "clock", "refrigerator", "oven"],
        correct: "clock",
        explanation: "Saat = clock",
      },
      {
        question: "Buzdolabının İngilizce karşılığı nedir?",
        options: ["lamp", "clock", "refrigerator", "oven"],
        correct: "refrigerator",
        explanation: "Buzdolabı = refrigerator",
      },
      {
        question: "Fırının İngilizce karşılığı nedir?",
        options: ["lamp", "clock", "refrigerator", "oven"],
        correct: "oven",
        explanation: "Fırın = oven",
      },
      {
        question: "Mikrodalga fırının İngilizce karşılığı nedir?",
        options: ["microwave", "dishwasher", "washing machine", "television"],
        correct: "microwave",
        explanation: "Mikrodalga fırın = microwave",
      },
      {
        question: "Bulaşık makinesinin İngilizce karşılığı nedir?",
        options: ["microwave", "dishwasher", "washing machine", "television"],
        correct: "dishwasher",
        explanation: "Bulaşık makinesi = dishwasher",
      },
      {
        question: "Çamaşır makinesinin İngilizce karşılığı nedir?",
        options: ["microwave", "dishwasher", "washing machine", "television"],
        correct: "washing machine",
        explanation: "Çamaşır makinesi = washing machine",
      },
      {
        question: "Televizyonun İngilizce karşılığı nedir?",
        options: ["microwave", "dishwasher", "washing machine", "television"],
        correct: "television",
        explanation: "Televizyon = television",
      },
      {
        question: "Bilgisayarın İngilizce karşılığı nedir?",
        options: ["computer", "phone", "fan", "air conditioner"],
        correct: "computer",
        explanation: "Bilgisayar = computer",
      },
      {
        question: "Telefonun İngilizce karşılığı nedir?",
        options: ["computer", "phone", "fan", "air conditioner"],
        correct: "phone",
        explanation: "Telefon = phone",
      },
      {
        question: "Vantilatörün İngilizce karşılığı nedir?",
        options: ["computer", "phone", "fan", "air conditioner"],
        correct: "fan",
        explanation: "Vantilatör = fan",
      },
      {
        question: "Klimanın İngilizce karşılığı nedir?",
        options: ["computer", "phone", "fan", "air conditioner"],
        correct: "air conditioner",
        explanation: "Klima = air conditioner",
      },
      {
        question: "Yastığın İngilizce karşılığı nedir?",
        options: ["pillow", "blanket", "curtain", "carpet"],
        correct: "pillow",
        explanation: "Yastık = pillow",
      },
      {
        question: "Battaniyenin İngilizce karşılığı nedir?",
        options: ["pillow", "blanket", "curtain", "carpet"],
        correct: "blanket",
        explanation: "Battaniye = blanket",
      },
      {
        question: "Perdenin İngilizce karşılığı nedir?",
        options: ["pillow", "blanket", "curtain", "carpet"],
        correct: "curtain",
        explanation: "Perde = curtain",
      },
      {
        question: "Halının İngilizce karşılığı nedir?",
        options: ["pillow", "blanket", "curtain", "carpet"],
        correct: "carpet",
        explanation: "Halı = carpet",
      },
      {
        question: "Havlunun İngilizce karşılığı nedir?",
        options: ["towel", "bathroom", "kitchen", "bedroom"],
        correct: "towel",
        explanation: "Havlu = towel",
      },
      {
        question: "Banyo odasının İngilizce karşılığı nedir?",
        options: ["towel", "bathroom", "kitchen", "bedroom"],
        correct: "bathroom",
        explanation: "Banyo odası = bathroom",
      },
      {
        question: "Mutfak odasının İngilizce karşılığı nedir?",
        options: ["towel", "bathroom", "kitchen", "bedroom"],
        correct: "kitchen",
        explanation: "Mutfak odası = kitchen",
      },
      {
        question: "Yatak odasının İngilizce karşılığı nedir?",
        options: ["towel", "bathroom", "kitchen", "bedroom"],
        correct: "bedroom",
        explanation: "Yatak odası = bedroom",
      },
      {
        question: "Oturma odasının İngilizce karşılığı nedir?",
        options: ["living room", "dining room", "window", "door"],
        correct: "living room",
        explanation: "Oturma odası = living room",
      },
      {
        question: "Yemek odasının İngilizce karşılığı nedir?",
        options: ["living room", "dining room", "window", "door"],
        correct: "dining room",
        explanation: "Yemek odası = dining room",
      },
      {
        question: "Pencerenin İngilizce karşılığı nedir?",
        options: ["living room", "dining room", "window", "door"],
        correct: "window",
        explanation: "Pencere = window",
      },
      {
        question: "Kapının İngilizce karşılığı nedir?",
        options: ["living room", "dining room", "window", "door"],
        correct: "door",
        explanation: "Kapı = door",
      },
      {
        question: "Duvarın İngilizce karşılığı nedir?",
        options: ["wall", "floor", "ceiling", "stairs"],
        correct: "wall",
        explanation: "Duvar = wall",
      },
      {
        question: "Yerin İngilizce karşılığı nedir?",
        options: ["wall", "floor", "ceiling", "stairs"],
        correct: "floor",
        explanation: "Yer = floor",
      },
      {
        question: "Tavanın İngilizce karşılığı nedir?",
        options: ["wall", "floor", "ceiling", "stairs"],
        correct: "ceiling",
        explanation: "Tavan = ceiling",
      },
      {
        question: "Merdivenin İngilizce karşılığı nedir?",
        options: ["wall", "floor", "ceiling", "stairs"],
        correct: "stairs",
        explanation: "Merdiven = stairs",
      },
      {
        question: "Bahçenin İngilizce karşılığı nedir?",
        options: ["garden", "balcony", "garage", "basement"],
        correct: "garden",
        explanation: "Bahçe = garden",
      },
      {
        question: "Balkonun İngilizce karşılığı nedir?",
        options: ["garden", "balcony", "garage", "basement"],
        correct: "balcony",
        explanation: "Balkon = balcony",
      },
      {
        question: "Garajın İngilizce karşılığı nedir?",
        options: ["garden", "balcony", "garage", "basement"],
        correct: "garage",
        explanation: "Garaj = garage",
      },
      {
        question: "Bodrumun İngilizce karşılığı nedir?",
        options: ["garden", "balcony", "garage", "basement"],
        correct: "basement",
        explanation: "Bodrum = basement",
      },
    ],
  };

  const handleAnswerSelect = (exerciseIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [exerciseIndex]: answer,
    }));
  };

  const checkAnswers = () => {
    const currentExercises = exercises[activeTopic];
    let correctCount = 0;

    currentExercises.forEach((exercise, index) => {
      if (selectedAnswers[index] === exercise.correct) {
        correctCount++;
      }
    });

    const newScore = Math.round((correctCount / currentExercises.length) * 100);
    setScore(newScore);
    setShowResults(true);
  };

  const resetExercise = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const renderTopicContent = () => {
    switch (activeTopic) {
      case "kisi-zamirleri":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Kişi Zamirleri (Subject Pronouns)
              </h3>
              <p className="text-gray-700 mb-4">
                Kişi zamirleri, cümlede özne olarak kullanılan kelimelerdir.
                İngilizce&apos;de 7 temel kişi zamiri bulunur.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentTopic.examples.map((pronoun, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded border text-center"
                  >
                    <span className="font-semibold text-blue-600">
                      {pronoun}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Kullanım Örnekleri
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I</strong> am a student. (Ben bir öğrenciyim.)
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>You</strong> are my friend. (Sen benim
                      arkadaşımsın.)
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>He</strong> is a teacher. (O bir öğretmen.)
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>She</strong> is a doctor. (O bir doktor.)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Doğru Zamiri Seç
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi! "
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "aitlik-zamirleri":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Aitlik Zamirleri (Possessive Pronouns)
              </h3>
              <p className="text-gray-700 mb-4">
                Aitlik zamirleri, bir şeyin kime ait olduğunu belirten
                kelimelerdir.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentTopic.examples.map((pronoun, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded border text-center"
                  >
                    <span className="font-semibold text-blue-600">
                      {pronoun}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Kullanım Örnekleri
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      This is <strong>my</strong> book. (Bu benim kitabım.)
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      That is <strong>your</strong> car. (O senin araban.)
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      This is <strong>his</strong> house. (Bu onun evi.)
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      That is <strong>her</strong> dog. (O onun köpeği.)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Doğru Aitlik Zamirini Seç
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi! "
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "sayilar":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Sayılar (Numbers in English)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de 1&apos;den 100&apos;e kadar olan sayıları
                öğrenelim.
              </p>

              {/* 1-20 arası sayılar */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  1-20 Arası Sayılar
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(0, 20).map((number, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <span className="font-semibold text-blue-600">
                        {number}
                      </span>
                      <div className="text-sm text-gray-500">{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 10'ar 10'ar artan sayılar */}
              <div>
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  10&apos;ar 10&apos;ar Artan Sayılar
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {currentTopic.examples.slice(20).map((number, index) => {
                    // Doğru sayıları manuel olarak tanımlayalım
                    const correctNumbers = [30, 40, 50, 60, 70, 80, 90, 100];
                    return (
                      <div
                        key={index + 20}
                        className="bg-white p-3 rounded border text-center"
                      >
                        <span className="font-semibold text-blue-600">
                          {number}
                        </span>
                        <div className="text-sm text-gray-500">
                          {correctNumbers[index]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Sayıların Yazılışı ve Kuralları
                </h4>

                {/* 1-20 arası kurallar */}
                <div className="mb-6">
                  <h5 className="font-semibold text-green-700 mb-2">
                    1-20 Arası Kurallar
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>1-12:</strong> Özel kelimeler (one, two,
                        three...)
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>13-19:</strong> -teen eki (thirteen,
                        fourteen...)
                      </p>
                    </div>
                  </div>
                </div>

                {/* 10'ar artan sayılar kuralları */}
                <div>
                  <h5 className="font-semibold text-green-700 mb-2">
                    10&apos;ar Artan Sayılar
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>20, 30, 40...</strong> -ty eki (twenty, thirty,
                        forty...)
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>100:</strong> one hundred
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Sayıları Eşleştir
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "renkler":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Renkler (Colors in English)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de temel renkleri öğrenelim. Renkler günlük
                hayatta çok sık kullanılan kelimelerdir.
              </p>

              {/* Ana Renkler */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  Ana Renkler
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(0, 5).map((color, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div
                        className={`w-8 h-8 rounded-full mx-auto mb-2 ${
                          color === "red"
                            ? "bg-red-500"
                            : color === "blue"
                            ? "bg-blue-500"
                            : color === "green"
                            ? "bg-green-500"
                            : color === "yellow"
                            ? "bg-yellow-400"
                            : color === "orange"
                            ? "bg-orange-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diğer Renkler */}
              <div>
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  Diğer Renkler
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(5).map((color, index) => (
                    <div
                      key={index + 5}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div
                        className={`w-8 h-8 rounded-full mx-auto mb-2 ${
                          color === "purple"
                            ? "bg-purple-500"
                            : color === "pink"
                            ? "bg-pink-400"
                            : color === "brown"
                            ? "bg-amber-700"
                            : color === "black"
                            ? "bg-black"
                            : color === "white"
                            ? "bg-white border-2 border-gray-300"
                            : color === "gray"
                            ? "bg-gray-400"
                            : color === "gold"
                            ? "bg-yellow-500"
                            : color === "silver"
                            ? "bg-gray-300"
                            : color === "navy"
                            ? "bg-blue-800"
                            : color === "turquoise"
                            ? "bg-cyan-400"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Renklerin Kullanımı ve Örnekler
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What color is this?</strong> → Bu ne renk?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>This is a red car.</strong> → Bu kırmızı bir
                      araba.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I like blue.</strong> → Maviyi severim.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is your favorite color?</strong> → En
                      sevdiğin renk ne?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My favorite color is green.</strong> → En sevdiğim
                      renk yeşil.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Renkleri Eşleştir
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "hayvanlar":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Hayvanlar (Animals in English)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de temel hayvan isimlerini öğrenelim. Hayvanlar
                çocukların en sevdiği konulardan biridir!
              </p>

              {/* Ev Hayvanları */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  Ev Hayvanları (Pet Animals)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(0, 5).map((animal, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-4xl mb-2">
                        {animal === "dog"
                          ? "🐕"
                          : animal === "cat"
                          ? "🐱"
                          : animal === "bird"
                          ? "🐦"
                          : animal === "fish"
                          ? "🐠"
                          : animal === "rabbit"
                          ? "🐰"
                          : "🐾"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {animal}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Çiftlik Hayvanları */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  Çiftlik Hayvanları (Farm Animals)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(5, 11).map((animal, index) => (
                    <div
                      key={index + 5}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-4xl mb-2">
                        {animal === "horse"
                          ? "🐎"
                          : animal === "cow"
                          ? "🐄"
                          : animal === "pig"
                          ? "🐷"
                          : animal === "sheep"
                          ? "🐑"
                          : animal === "chicken"
                          ? "🐔"
                          : animal === "duck"
                          ? "🦆"
                          : "🐾"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {animal}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vahşi Hayvanlar */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🌿 Vahşi Hayvanlar (Wild Animals)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(11, 16).map((animal, index) => (
                    <div
                      key={index + 11}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-4xl mb-2">
                        {animal === "elephant"
                          ? "🐘"
                          : animal === "lion"
                          ? "🦁"
                          : animal === "tiger"
                          ? "🐯"
                          : animal === "bear"
                          ? "🐻"
                          : animal === "monkey"
                          ? "🐒"
                          : "🐾"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {animal}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Küçük Hayvanlar */}
              <div>
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🦋 Küçük Hayvanlar (Small Animals)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(16).map((animal, index) => (
                    <div
                      key={index + 16}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-4xl mb-2">
                        {animal === "snake"
                          ? "🐍"
                          : animal === "frog"
                          ? "🐸"
                          : animal === "butterfly"
                          ? "🦋"
                          : animal === "bee"
                          ? "🐝"
                          : "🐾"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {animal}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Hayvanlarla İlgili Cümleler ve Sorular
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What animal is this?</strong> → Bu hangi hayvan?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>This is a dog.</strong> → Bu bir köpek.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I have a cat.</strong> → Benim bir kedim var.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is your favorite animal?</strong> → En
                      sevdiğin hayvan ne?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My favorite animal is a horse.</strong> → En
                      sevdiğim hayvan at.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Where does a fish live?</strong> → Balık nerede
                      yaşar?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>A fish lives in water.</strong> → Balık suda
                      yaşar.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Hayvanları Eşleştir
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "isim-sorma":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                İsim Sorma Söyleme (Asking & Telling Name)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de isim sorma ve söyleme kalıplarını öğrenelim.
              </p>
              <div className="space-y-3">
                {currentTopic.examples.map((phrase, index) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <span className="font-semibold text-blue-600">
                      {phrase}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Türkçe Karşılıkları
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is your name?</strong> → Adın ne?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My name is...</strong> → Benim adım...
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>How are you?</strong> → Nasılsın?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I am fine, thank you.</strong> → İyiyim, teşekkür
                      ederim.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Doğru Cevabı Seç
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi! "
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "yas-sorma":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Yaş Sorma ve Söyleme (Asking & Telling Age)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de yaş sorma ve söyleme kalıplarını öğrenelim.
              </p>
              <div className="space-y-3">
                {currentTopic.examples.map((phrase, index) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <span className="font-semibold text-blue-600">
                      {phrase}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Türkçe Karşılıkları
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>How old are you?</strong> → Kaç yaşındasın?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I am ... years old.</strong> → Ben ... yaşındayım.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is your age?</strong> → Yaşın ne?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My age is...</strong> → Yaşım...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Doğru Cevabı Seç
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "saat-sorma":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Saat Sorma ve Söyleme (Asking & Telling Time)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de saat sorma ve söyleme kalıplarını öğrenelim.
              </p>
              <div className="space-y-3">
                {currentTopic.examples.map((phrase, index) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <span className="font-semibold text-blue-600">
                      {phrase}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Türkçe Karşılıkları
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What time is it?</strong> → Saat kaç?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>It is... o&apos;clock.</strong> → Saat...
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What time do you...?</strong> → Sen... at...
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I ... at...</strong> → Ben ... at...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Doğru Cevabı Seç
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "gunler-sorma":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Günleri Sorma ve Söyleme (Asking & Telling Day)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de günleri sorma ve söyleme kalıplarını
                öğrenelim.
              </p>

              {/* Tüm Günler */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  Haftanın Günleri (Days of the Week)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                  <div className="bg-white p-3 rounded border text-center">
                    <div className="text-2xl mb-2">🌅</div>
                    <span className="font-semibold text-blue-600">Monday</span>
                    <div className="text-sm text-gray-500">Pazartesi</div>
                  </div>
                  <div className="bg-white p-3 rounded border text-center">
                    <div className="text-2xl mb-2">🔥</div>
                    <span className="font-semibold text-blue-600">Tuesday</span>
                    <div className="text-sm text-gray-500">Salı</div>
                  </div>
                  <div className="bg-white p-3 rounded border text-center">
                    <div className="text-2xl mb-2">💧</div>
                    <span className="font-semibold text-blue-600">
                      Wednesday
                    </span>
                    <div className="text-sm text-gray-500">Çarşamba</div>
                  </div>
                  <div className="bg-white p-3 rounded border text-center">
                    <div className="text-2xl mb-2">🌳</div>
                    <span className="font-semibold text-blue-600">
                      Thursday
                    </span>
                    <div className="text-sm text-gray-500">Perşembe</div>
                  </div>
                  <div className="bg-white p-3 rounded border text-center">
                    <div className="text-2xl mb-2">🪙</div>
                    <span className="font-semibold text-blue-600">Friday</span>
                    <div className="text-sm text-gray-500">Cuma</div>
                  </div>
                  <div className="bg-white p-3 rounded border text-center">
                    <div className="text-2xl mb-2">🪨</div>
                    <span className="font-semibold text-blue-600">
                      Saturday
                    </span>
                    <div className="text-sm text-gray-500">Cumartesi</div>
                  </div>
                  <div className="bg-white p-3 rounded border text-center">
                    <div className="text-2xl mb-2">☀️</div>
                    <span className="font-semibold text-blue-600">Sunday</span>
                    <div className="text-sm text-gray-500">Pazar</div>
                  </div>
                </div>
              </div>

              {/* Gün Sorma Kalıpları */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  ❓ Gün Sorma Kalıpları
                </h4>
                <div className="space-y-3">
                  {currentTopic.examples.map((phrase, index) => (
                    <div key={index} className="bg-white p-3 rounded border">
                      <span className="font-semibold text-blue-600">
                        {phrase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Türkçe Karşılıkları ve Kullanım Örnekleri
                </h4>

                {/* Gün Sorma Kalıpları */}
                <div className="mb-6">
                  <h5 className="font-semibold text-green-700 mb-3">
                    Gün Sorma Kalıpları
                  </h5>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>What day is it today?</strong> → Bugün hangi
                        gün?
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>Today is...</strong> → Bugün...
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>What day is tomorrow?</strong> → Yarın hangi
                        gün?
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>Tomorrow is...</strong> → Yarın...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Günlerin Yazılışı */}
                <div className="mb-6">
                  <h5 className="font-semibold text-green-700 mb-3">
                    Günlerin Yazılışı ve Kuralları
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>Monday, Tuesday, Wednesday:</strong> -day eki
                        ile biten günler
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>Thursday, Friday, Saturday:</strong> -day eki
                        ile biten günler
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>Sunday:</strong> Özel yazılış (Sun + day)
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>Büyük Harf:</strong> Günler her zaman büyük
                        harfle yazılır
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pratik Örnekler */}
                <div>
                  <h5 className="font-semibold text-green-700 mb-3">
                    Pratik Örnekler
                  </h5>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>What day is it today?</strong> → Bugün hangi
                        gün?
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>Today is Monday.</strong> → Bugün Pazartesi.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>What day is tomorrow?</strong> → Yarın hangi
                        gün?
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>Tomorrow is Tuesday.</strong> → Yarın Salı.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>I have school on Monday.</strong> → Pazartesi
                        günü okulum var.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>We go shopping on Saturday.</strong> → Cumartesi
                        günü alışverişe gideriz.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>Sunday is a rest day.</strong> → Pazar günü
                        dinlenme günüdür.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Doğru Cevabı Seç
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "nereli-sorma":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Ülkeler ve Milliyetler (Countries & Nationalities)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de ülkeleri ve milliyetleri öğrenelim. Dünyanın
                farklı yerlerinden insanlarla tanışırken bu kelimeler çok
                önemlidir.
              </p>

              {/* Avrupa Ülkeleri */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🇪🇺 Avrupa Ülkeleri (European Countries)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(0, 5).map((country, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {country === "Turkey"
                          ? "🇹🇷"
                          : country === "Germany"
                          ? "🇩🇪"
                          : country === "France"
                          ? "🇫🇷"
                          : country === "Italy"
                          ? "🇮🇹"
                          : country === "Spain"
                          ? "🇪🇸"
                          : "🏳️"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {country}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anglo-Sakson Ülkeleri */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🌍 Anglo-Sakson Ülkeleri (Anglo-Saxon Countries)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(5, 10).map((country, index) => (
                    <div
                      key={index + 5}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {country === "England"
                          ? "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
                          : country === "USA"
                          ? "🇺🇸"
                          : country === "Canada"
                          ? "🇨🇦"
                          : country === "Australia"
                          ? "🇦🇺"
                          : country === "Japan"
                          ? "🇯🇵"
                          : "🏳️"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {country}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asya ve Güney Amerika Ülkeleri */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🌏 Asya ve Güney Amerika Ülkeleri
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(10, 15).map((country, index) => (
                    <div
                      key={index + 10}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {country === "China"
                          ? "🇨🇳"
                          : country === "Brazil"
                          ? "🇧🇷"
                          : country === "Netherlands"
                          ? "🇳🇱"
                          : country === "Sweden"
                          ? "🇸🇪"
                          : country === "Norway"
                          ? "🇳🇴"
                          : "🏳️"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {country}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diğer Ülkeler */}
              <div>
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🌍 Diğer Ülkeler (Other Countries)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(15).map((country, index) => (
                    <div
                      key={index + 15}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {country === "Russia"
                          ? "🇷🇺"
                          : country === "India"
                          ? "🇮🇳"
                          : country === "Mexico"
                          ? "🇲🇽"
                          : country === "Egypt"
                          ? "🇪🇬"
                          : country === "South Korea"
                          ? "🇰🇷"
                          : "🏳️"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {country}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Türkçe Karşılıkları ve Kullanım Örnekleri
                </h4>

                {/* Ülke Sorma Kalıpları */}
                <div className="mb-6">
                  <h5 className="font-semibold text-green-700 mb-3">
                    Ülke Sorma Kalıpları
                  </h5>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>Where are you from?</strong> → Nerelisin?
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>I am from...</strong> → Ben... danım
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>What is your nationality?</strong> → Milliyetin
                        ne?
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>I am...</strong> → Ben... yım
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milliyet Örnekleri */}
                <div className="mb-6">
                  <h5 className="font-semibold text-green-700 mb-3">
                    Milliyet Örnekleri
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>Turkey → Turkish:</strong> Türkiye → Türk
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>Germany → German:</strong> Almanya → Alman
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>France → French:</strong> Fransa → Fransız
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>Italy → Italian:</strong> İtalya → İtalyan
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>Spain → Spanish:</strong> İspanya → İspanyol
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>England → English:</strong> İngiltere → İngiliz
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pratik Örnekler */}
                <div>
                  <h5 className="font-semibold text-green-700 mb-3">
                    Pratik Örnekler
                  </h5>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>Where are you from?</strong> → Nerelisin?
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>I am from Turkey.</strong> → Ben
                        Türkiye&apos;denim.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>What is your nationality?</strong> → Milliyetin
                        ne?
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>I am Turkish.</strong> → Ben Türküm.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>Are you from Germany?</strong> →
                        Almanya&apos;dan mısın?
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>No, I am from France.</strong> → Hayır, ben
                        Fransa&apos;danım.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>Do you speak English?</strong> → İngilizce
                        konuşuyor musun?
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p>
                        <strong>Yes, I speak English.</strong> → Evet, İngilizce
                        konuşuyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Doğru Cevabı Seç
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "meslek-sorma":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Meslekler (Jobs & Professions)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de temel meslekleri öğrenelim. Meslekler günlük
                hayatta çok sık kullanılan kelimelerdir.
              </p>

              {/* Eğitim ve Sağlık Meslekleri */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🏥 Eğitim ve Sağlık Meslekleri
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(0, 5).map((job, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {job === "teacher"
                          ? "👨‍🏫"
                          : job === "doctor"
                          ? "👨‍⚕️"
                          : job === "engineer"
                          ? "👨‍💻"
                          : job === "lawyer"
                          ? "👨‍💼"
                          : job === "nurse"
                          ? "👩‍⚕️"
                          : "💼"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {job}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Güvenlik ve Hizmet Meslekleri */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  Güvenlik ve Hizmet Meslekleri
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(5, 10).map((job, index) => (
                    <div
                      key={index + 5}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {job === "police officer"
                          ? "👮‍♂️"
                          : job === "firefighter"
                          ? "👨‍🚒"
                          : job === "chef"
                          ? "👨‍🍳"
                          : job === "driver"
                          ? "🚗"
                          : job === "artist"
                          ? "🎨"
                          : "💼"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {job}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sanat ve Uzmanlık Meslekleri */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🎭 Sanat ve Uzmanlık Meslekleri
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(10, 15).map((job, index) => (
                    <div
                      key={index + 10}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {job === "musician"
                          ? "🎵"
                          : job === "dentist"
                          ? "🦷"
                          : job === "architect"
                          ? "🏗️"
                          : job === "scientist"
                          ? "🔬"
                          : job === "businessman"
                          ? "💼"
                          : "💼"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {job}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diğer Meslekler */}
              <div>
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🌟 Diğer Meslekler
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(15).map((job, index) => (
                    <div
                      key={index + 15}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {job === "farmer"
                          ? "👨‍🌾"
                          : job === "soldier"
                          ? "👨‍✈️"
                          : job === "pilot"
                          ? "✈️"
                          : job === "journalist"
                          ? "📰"
                          : job === "designer"
                          ? "🎨"
                          : "💼"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {job}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Türkçe Karşılıkları ve Kullanım Örnekleri
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What do you do?</strong> → Ne iş yapıyorsun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I am a...</strong> → Ben bir...
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is your job?</strong> → Mesleğin ne?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My job is...</strong> → Mesleğim...
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Where do you work?</strong> → Nerede çalışıyorsun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I work at...</strong> → Ben ... da çalışıyorum.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>How long have you been working?</strong> → Ne
                      kadar zamandır çalışıyorsun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I have been working for 5 years.</strong> → 5
                      yıldır çalışıyorum.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Doğru Cevabı Seç
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "tasitlar":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Taşıtlar (Transportation)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de kara, hava ve deniz taşıtlarını öğrenelim.
                Taşıtlar günlük hayatta çok sık kullanılan kelimelerdir.
              </p>

              {/* Kara Taşıtları */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🚗 Kara Taşıtları (Land Transportation)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(0, 10).map((vehicle, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {vehicle === "car"
                          ? "🚗"
                          : vehicle === "bus"
                          ? "🚌"
                          : vehicle === "train"
                          ? "🚂"
                          : vehicle === "bicycle"
                          ? "🚲"
                          : vehicle === "motorcycle"
                          ? "🏍️"
                          : vehicle === "truck"
                          ? "🚛"
                          : vehicle === "taxi"
                          ? "🚕"
                          : vehicle === "ambulance"
                          ? "🚑"
                          : vehicle === "police car"
                          ? "🚓"
                          : vehicle === "fire truck"
                          ? "🚒"
                          : "🚗"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {vehicle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hava Taşıtları */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  ✈️ Hava Taşıtları (Air Transportation)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(10, 16).map((vehicle, index) => (
                    <div
                      key={index + 10}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {vehicle === "airplane"
                          ? "✈️"
                          : vehicle === "helicopter"
                          ? "🚁"
                          : vehicle === "jet"
                          ? "🛩️"
                          : vehicle === "balloon"
                          ? "🎈"
                          : vehicle === "rocket"
                          ? "🚀"
                          : vehicle === "spaceship"
                          ? "🛸"
                          : "✈️"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {vehicle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deniz Taşıtları */}
              <div>
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🚢 Deniz Taşıtları (Water Transportation)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(16).map((vehicle, index) => (
                    <div
                      key={index + 16}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {vehicle === "ship"
                          ? "🚢"
                          : vehicle === "boat"
                          ? "⛵"
                          : vehicle === "ferry"
                          ? "🛥️"
                          : vehicle === "yacht"
                          ? "🛥️"
                          : vehicle === "submarine"
                          ? "🚤"
                          : vehicle === "canoe"
                          ? "🛶"
                          : vehicle === "sailboat"
                          ? "⛵"
                          : "🚢"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {vehicle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Taşıtlarla İlgili Cümleler ve Sorular
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>How do you go to school?</strong> → Okula nasıl
                      gidiyorsun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I go to school by bus.</strong> → Okula otobüsle
                      gidiyorum.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is your favorite transportation?</strong> →
                      En sevdiğin taşıt ne?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My favorite transportation is the train.</strong>{" "}
                      → En sevdiğim taşıt tren.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Have you ever traveled by airplane?</strong> → Hiç
                      uçakla seyahat ettin mi?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Yes, I have traveled by airplane.</strong> → Evet,
                      uçakla seyahat ettim.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>How do you go to work?</strong> → İşe nasıl
                      gidiyorsun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I go to work by car.</strong> → İşe arabayla
                      gidiyorum.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Do you like traveling by ship?</strong> → Gemiyle
                      seyahat etmeyi sever misin?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Yes, I like traveling by ship.</strong> → Evet,
                      gemiyle seyahat etmeyi severim.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Taşıtları Eşleştir
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "yemek-meyve":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Yemek ve Meyveler (Food & Fruits)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de temel yemek, meyve, sebze, fast-food ve içecek
                isimlerini öğrenelim. Bu kelimeler günlük hayatta çok sık
                kullanılır.
              </p>

              {/* Meyveler */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  Meyveler (Fruits)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(0, 10).map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {item === "apple"
                          ? "🍎"
                          : item === "banana"
                          ? "🍌"
                          : item === "orange"
                          ? "🍊"
                          : item === "grape"
                          ? "🍇"
                          : item === "strawberry"
                          ? "🍓"
                          : item === "watermelon"
                          ? "🍉"
                          : item === "pineapple"
                          ? "🍍"
                          : item === "mango"
                          ? "🥭"
                          : item === "pear"
                          ? "🍐"
                          : item === "peach"
                          ? "🍑"
                          : "🍎"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Temel Gıdalar */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🍞 Temel Gıdalar (Basic Foods)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(10, 20).map((item, index) => (
                    <div
                      key={index + 10}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {item === "bread"
                          ? "🍞"
                          : item === "rice"
                          ? "🍚"
                          : item === "pasta"
                          ? "🍝"
                          : item === "chicken"
                          ? "🍗"
                          : item === "beef"
                          ? "🥩"
                          : item === "fish"
                          ? "🐟"
                          : item === "egg"
                          ? "🥚"
                          : item === "milk"
                          ? "🥛"
                          : item === "cheese"
                          ? "🧀"
                          : item === "butter"
                          ? "🧈"
                          : "🍽️"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sebzeler */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🥕 Sebzeler (Vegetables)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(20, 30).map((item, index) => (
                    <div
                      key={index + 20}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {item === "carrot"
                          ? "🥕"
                          : item === "tomato"
                          ? "🍅"
                          : item === "potato"
                          ? "🥔"
                          : item === "onion"
                          ? "🧅"
                          : item === "cucumber"
                          ? "🥒"
                          : item === "lettuce"
                          ? "🥬"
                          : item === "broccoli"
                          ? "🥦"
                          : item === "corn"
                          ? "🌽"
                          : item === "pepper"
                          ? "🫑"
                          : item === "garlic"
                          ? "🧄"
                          : "🥬"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast-Food ve Tatlılar */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  Fast-Food ve Tatlılar (Fast Food & Desserts)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(30, 40).map((item, index) => (
                    <div
                      key={index + 30}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {item === "hamburger"
                          ? "🍔"
                          : item === "pizza"
                          ? "🍕"
                          : item === "hot dog"
                          ? "🌭"
                          : item === "french fries"
                          ? "🍟"
                          : item === "sandwich"
                          ? "🥪"
                          : item === "taco"
                          ? "🌮"
                          : item === "nuggets"
                          ? "🍗"
                          : item === "ice cream"
                          ? "🍦"
                          : item === "cake"
                          ? "🍰"
                          : item === "cookie"
                          ? "🍪"
                          : item === "chocolate"
                          ? "🍫"
                          : "🍔"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* İçecekler */}
              <div>
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🥤 İçecekler (Beverages)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(40).map((item, index) => (
                    <div
                      key={index + 40}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {item === "water"
                          ? "💧"
                          : item === "tea"
                          ? "🫖"
                          : item === "coffee"
                          ? "☕"
                          : item === "juice"
                          ? "🧃"
                          : item === "soda"
                          ? "🥤"
                          : item === "lemonade"
                          ? "🍋"
                          : item === "hot chocolate"
                          ? "☕"
                          : item === "milkshake"
                          ? "🥤"
                          : item === "smoothie"
                          ? "🥤"
                          : "🥤"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Yemek ve İçeceklerle İlgili Cümleler ve Sorular
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is your favorite fruit?</strong> → En
                      sevdiğin meyve ne?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My favorite fruit is apple.</strong> → En sevdiğim
                      meyve elma.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Do you like vegetables?</strong> → Sebzeleri sever
                      misin?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Yes, I like vegetables.</strong> → Evet, sebzeleri
                      severim.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What do you eat for breakfast?</strong> →
                      Kahvaltıda ne yiyorsun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I eat bread and eggs for breakfast.</strong> →
                      Kahvaltıda ekmek ve yumurta yiyorum.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is your favorite food?</strong> → En sevdiğin
                      yemek ne?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My favorite food is pasta.</strong> → En sevdiğim
                      yemek makarna.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Do you drink milk?</strong> → Süt içiyor musun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Yes, I drink milk every day.</strong> → Evet, her
                      gün süt içiyorum.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What vegetables do you like?</strong> → Hangi
                      sebzeleri seviyorsun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I like carrots and tomatoes.</strong> → Havuç ve
                      domatesi severim.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Do you eat fish?</strong> → Balık yiyor musun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Yes, I eat fish twice a week.</strong> → Evet,
                      haftada iki kez balık yiyorum.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Do you like fast food?</strong> → Fast-food sever
                      misin?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Yes, I like hamburgers and pizza.</strong> → Evet,
                      hamburger ve pizzayı severim.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is your favorite dessert?</strong> → En
                      sevdiğin tatlı ne?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My favorite dessert is ice cream.</strong> → En
                      sevdiğim tatlı dondurma.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Do you eat chocolate?</strong> → Çikolata yiyor
                      musun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Yes, I love chocolate!</strong> → Evet, çikolatayı
                      çok severim!
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What do you drink?</strong> → Ne içiyorsun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I drink water and tea.</strong> → Su ve çay
                      içiyorum.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Do you like coffee?</strong> → Kahve sever misin?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Yes, I drink coffee every morning.</strong> →
                      Evet, her sabah kahve içiyorum.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is your favorite drink?</strong> → En
                      sevdiğin içecek ne?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My favorite drink is orange juice.</strong> → En
                      sevdiğim içecek portakal suyu.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Yemek ve Meyveleri Eşleştir
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "ev-esyalari":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Ev Eşyaları (Household Items)
              </h3>
              <p className="text-gray-700 mb-4">
                İngilizce&apos;de ev eşyaları ve ev bölümlerini öğrenelim. Bu
                kelimeler günlük hayatta çok sık kullanılır.
              </p>

              {/* Mobilyalar */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🪑 Mobilyalar (Furniture)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(0, 10).map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {item === "table"
                          ? "🪑"
                          : item === "chair"
                          ? "🪑"
                          : item === "bed"
                          ? "🛏️"
                          : item === "sofa"
                          ? "🛋️"
                          : item === "desk"
                          ? "🪑"
                          : item === "bookshelf"
                          ? "📚"
                          : item === "wardrobe"
                          ? "🚪"
                          : item === "mirror"
                          ? "🪞"
                          : item === "lamp"
                          ? "💡"
                          : item === "clock"
                          ? "🕐"
                          : "🪑"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ev Aletleri */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🔌 Ev Aletleri (Appliances)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(10, 20).map((item, index) => (
                    <div
                      key={index + 10}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {item === "refrigerator"
                          ? "❄️"
                          : item === "oven"
                          ? "🔥"
                          : item === "microwave"
                          ? "📺"
                          : item === "dishwasher"
                          ? "🧽"
                          : item === "washing machine"
                          ? "🧺"
                          : item === "television"
                          ? "📺"
                          : item === "computer"
                          ? "💻"
                          : item === "phone"
                          ? "📱"
                          : item === "fan"
                          ? "💨"
                          : item === "air conditioner"
                          ? "❄️"
                          : "🔌"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ev Tekstilleri */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🧸 Ev Tekstilleri (Home Textiles)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(20, 30).map((item, index) => (
                    <div
                      key={index + 20}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {item === "pillow"
                          ? "🛏️"
                          : item === "blanket"
                          ? "🛏️"
                          : item === "curtain"
                          ? "🪟"
                          : item === "carpet"
                          ? "🟫"
                          : item === "towel"
                          ? "🧺"
                          : item === "bathroom"
                          ? "🚿"
                          : item === "kitchen"
                          ? "🍳"
                          : item === "bedroom"
                          ? "🛏️"
                          : item === "living room"
                          ? "🛋️"
                          : item === "dining room"
                          ? "🍽️"
                          : "🧸"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ev Yapısı */}
              <div>
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  🏠 Ev Yapısı (House Structure)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currentTopic.examples.slice(30).map((item, index) => (
                    <div
                      key={index + 30}
                      className="bg-white p-3 rounded border text-center"
                    >
                      <div className="text-3xl mb-2">
                        {item === "window"
                          ? "🪟"
                          : item === "door"
                          ? "🚪"
                          : item === "wall"
                          ? "🧱"
                          : item === "floor"
                          ? "🟫"
                          : item === "ceiling"
                          ? "⬜"
                          : item === "stairs"
                          ? "🪜"
                          : item === "garden"
                          ? "🌱"
                          : item === "balcony"
                          ? "🏠"
                          : item === "garage"
                          ? "🚗"
                          : item === "basement"
                          ? "🏠"
                          : "🏠"}
                      </div>
                      <span className="font-semibold text-blue-600 text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {activeSection === "konu" && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  Ev Eşyalarıyla İlgili Cümleler ve Sorular
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Where is the table?</strong> → Masa nerede?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>The table is in the dining room.</strong> → Masa
                      yemek odasında.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What is in your bedroom?</strong> → Yatak odanda
                      ne var?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>
                        There is a bed and a wardrobe in my bedroom.
                      </strong>{" "}
                      → Yatak odamda bir yatak ve dolap var.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Where do you cook?</strong> → Nerede yemek
                      yapıyorsun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I cook in the kitchen.</strong> → Mutfakta yemek
                      yapıyorum.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Do you have a television?</strong> → Televizyonun
                      var mı?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>
                        Yes, I have a television in the living room.
                      </strong>{" "}
                      → Evet, oturma odasında televizyonum var.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Where is the refrigerator?</strong> → Buzdolabı
                      nerede?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>The refrigerator is in the kitchen.</strong> →
                      Buzdolabı mutfakta.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>What color is your sofa?</strong> → Koltuğun ne
                      renk?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>My sofa is blue.</strong> → Koltuğum mavi.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Do you have a garden?</strong> → Bahçen var mı?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Yes, I have a beautiful garden.</strong> → Evet,
                      güzel bir bahçem var.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>Where do you sleep?</strong> → Nerede uyuyorsun?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p>
                      <strong>I sleep in my bedroom.</strong> → Yatak odamda
                      uyuyorum.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alisveri" && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  Alıştırma 1: Ev Eşyalarını Eşleştir
                </h4>

                {!showResults && (
                  <div className="space-y-4 mb-6">
                    {exercises[activeTopic].map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded border">
                        <p className="mb-3 font-medium text-gray-800">
                          {exercise.question}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(index, option)}
                              className={`px-4 py-2 border rounded transition-all duration-200 ${
                                selectedAnswers[index] === option
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "hover:bg-blue-100 border-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={checkAnswers}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          exercises[activeTopic].length
                        }
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                      >
                        Cevapları Kontrol Et
                      </button>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border text-center">
                      <h5 className="text-lg font-bold mb-2">Sonuçlar</h5>
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        Skor: {score}%
                      </p>
                      <p className="text-gray-600">
                        {score === 100
                          ? "Mükemmel! 🎉"
                          : score >= 80
                          ? "Çok iyi! 👍"
                          : score >= 60
                          ? "İyi!"
                          : "Daha fazla çalışman gerekiyor 📚"}
                      </p>
                    </div>

                    {exercises[activeTopic].map((exercise, index) => {
                      const isCorrect =
                        selectedAnswers[index] === exercise.correct;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl">✅</span>
                            ) : (
                              <span className="text-red-600 text-xl">❌</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {isCorrect ? "Doğru!" : "Yanlış!"}
                            </span>
                          </div>
                          <p className="mb-2 text-gray-800">
                            {exercise.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Senin cevabın:</strong>{" "}
                            {selectedAnswers[index] || "Cevap verilmedi"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Doğru cevap:</strong> {exercise.correct}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Açıklama:</strong> {exercise.explanation}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cevapları Gizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Konu değiştiğinde alıştırma durumunu sıfırla
  const handleTopicChange = (topicId) => {
    setActiveTopic(topicId);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="container mx-auto px-4 py-8">
        {/* Geri Dön Butonu */}
        <div className="mb-6">
          <button
            onClick={() => (window.location.href = "/genel")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Genel Sayfaya Dön
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          İngilizce Öğrenme Merkezi
        </h1>

        {/* Ana Menü - Gruplandırılmış */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Konular</h2>

          {Object.entries(topicGroups).map(([groupKey, group]) => (
            <div key={groupKey} className="mb-8">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b border-blue-200 pb-2">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {group.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicChange(topic.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      activeTopic === topic.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="font-semibold">{topic.title}</div>
                    <div className="text-sm text-gray-500">
                      {topic.englishTitle}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Alt Menü */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveSection("konu")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeSection === "konu"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            >
              📚 Konu Anlatımı
            </button>
            <button
              onClick={() => setActiveSection("alisveri")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeSection === "alisveri"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-purple-100"
              }`}
            >
              ✏️ Alıştırmalar
            </button>
          </div>
        </div>

        {/* İçerik Alanı */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderTopicContent()}
        </div>
      </div>
    </div>
  );
}
