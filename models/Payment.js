import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  subscriptionType: {
    type: String,
    enum: ["monthly", "quarterly", "yearly"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "TRY",
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    default: "manual", // manual, credit_card, bank_transfer, etc.
  },
  transactionId: {
    type: String,
    default: null,
  },
  subscriptionStartDate: {
    type: Date,
    required: true,
  },
  subscriptionEndDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index'ler
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ email: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });

// Pre-save hook: updatedAt'i güncelle
paymentSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

let PaymentModel;

try {
  if (mongoose.models && mongoose.models.Payment) {
    PaymentModel = mongoose.models.Payment;
  } else {
    PaymentModel = mongoose.model("Payment", paymentSchema);
  }
} catch (error) {
  try {
    PaymentModel = mongoose.model("Payment");
  } catch (e) {
    PaymentModel = mongoose.model("Payment", paymentSchema);
  }
}

export default PaymentModel;

