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
    enum: ["monthly", "yearly"],
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
  // mongoose.models undefined ise (Edge runtime), hata fırlatılır
  // Bu durumda catch bloğunda model oluşturulur
  if (mongoose.models && mongoose.models.User) {
    UserModel = mongoose.models.User;
  } else {
    UserModel = mongoose.model("User", userSchema);
  }
} catch (error) {
  // Edge runtime veya mongoose henüz başlatılmamış
  // Model API route'larında connectDB sonrası kullanılacak
  // Şimdilik schema'yı kullanarak model oluşturmayı dene
  try {
    UserModel = mongoose.model("User", userSchema);
  } catch (e) {
    // Son çare: model zaten var, onu al
    UserModel = mongoose.model("User");
  }
}

export default UserModel;
