import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    index: true,
  },
  userEmail: {
    type: String,
    default: null,
  },
  action: {
    type: String,
    required: true,
    enum: [
      "login",
      "logout",
      "signup",
      "subscription_purchase",
      "subscription_cancel",
      "subscription_update",
      "free_trial_start",
      "user_update",
      "user_delete",
      "admin_action",
      "page_access",
      "error",
    ],
  },
  description: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    default: null,
  },
  userAgent: {
    type: String,
    default: null,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Index'ler
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });
activityLogSchema.index({ createdAt: -1 });

let ActivityLogModel;

try {
  if (mongoose.models && mongoose.models.ActivityLog) {
    ActivityLogModel = mongoose.models.ActivityLog;
  } else {
    ActivityLogModel = mongoose.model("ActivityLog", activityLogSchema);
  }
} catch (error) {
  try {
    ActivityLogModel = mongoose.model("ActivityLog");
  } catch (e) {
    ActivityLogModel = mongoose.model("ActivityLog", activityLogSchema);
  }
}

export default ActivityLogModel;

