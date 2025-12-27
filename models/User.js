import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Index ekle (performans için)
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  subscriptionType: {
    type: String,
    enum: ["monthly", "quarterly", "yearly"],
    default: null,
  },
  subscriptionStartDate: {
    type: Date,
    default: null,
  },
  subscriptionEndDate: {
    type: Date,
    default: null,
  },
  subscriptionStatus: {
    type: String,
    enum: ["active", "expired", "none"],
    default: "none",
    index: true, // Index ekle
  },
  freeTrialStarted: {
    type: Boolean,
    default: false,
  },
  freeTrialEndDate: {
    type: Date,
    default: null,
    index: true, // Index ekle
  },
}, {
  // Schema seviyesinde index'ler
  timestamps: false, // createdAt'i manuel yönetiyoruz
});

// Pre-save hook: Abonelik durumu tutarlılığını sağla
userSchema.pre("save", function (next) {
  const now = new Date();

  // subscriptionStatus'a göre isSubscribed'ı otomatik güncelle
  if (this.subscriptionStatus === "active") {
    this.isSubscribed = true;
  } else if (this.subscriptionStatus === "expired" || this.subscriptionStatus === "none") {
    this.isSubscribed = false;
  }

  // Abonelik bitiş tarihine göre otomatik kontrol
  if (this.subscriptionEndDate && new Date(this.subscriptionEndDate) < now) {
    if (this.subscriptionStatus === "active") {
      this.subscriptionStatus = "expired";
      this.isSubscribed = false;
    }
  }

  // subscriptionStatus yoksa ama isSubscribed varsa, subscriptionStatus'u ayarla
  if (!this.subscriptionStatus || this.subscriptionStatus === "none") {
    if (this.isSubscribed) {
      this.subscriptionStatus = "active";
    }
  }

  // isSubscribed false ise ama subscriptionStatus active ise, tutarlılık için düzelt
  if (!this.isSubscribed && this.subscriptionStatus === "active") {
    // Eğer bitiş tarihi geçmişse expired yap, değilse none yap
    if (this.subscriptionEndDate && new Date(this.subscriptionEndDate) < now) {
      this.subscriptionStatus = "expired";
    } else {
      this.subscriptionStatus = "none";
    }
  }

  next();
});

// Not: email zaten unique: true olduğu için otomatik index oluşturuluyor
// subscriptionStatus, subscriptionEndDate ve createdAt için index'ler field seviyesinde tanımlandı

// Edge runtime uyumluluğu için güvenli export
// mongoose.models Edge runtime'da undefined olabilir
let UserModel;

try {
  // Model zaten tanımlıysa ve schema güncellenmişse, model'i yeniden oluştur
  if (mongoose.models && mongoose.models.User) {
    const existingModel = mongoose.models.User;
    const existingSchema = existingModel.schema;
    const existingEnum = existingSchema.path("subscriptionType")?.enumValues || [];
    
    // Eğer quarterly enum'da yoksa model'i yeniden oluştur
    if (!existingEnum.includes("quarterly")) {
      console.log("Schema güncellendi, model yeniden oluşturuluyor...");
      delete mongoose.models.User;
      UserModel = mongoose.model("User", userSchema);
    } else {
      UserModel = existingModel;
    }
  } else {
    // Model yoksa yeni oluştur
    UserModel = mongoose.model("User", userSchema);
  }
} catch (error) {
  // Hata durumunda mevcut model'i kullan veya yeni oluştur
  try {
    UserModel = mongoose.model("User");
  } catch (e) {
    // Son çare: yeni model oluştur
    UserModel = mongoose.model("User", userSchema);
  }
}

export default UserModel;
