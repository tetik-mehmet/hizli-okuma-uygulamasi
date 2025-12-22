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
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
  },
  freeTrialStarted: {
    type: Boolean,
    default: false,
  },
  freeTrialEndDate: {
    type: Date,
    default: null,
  },
});

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
