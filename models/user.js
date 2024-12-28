import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      lowercase: true
    },
    shared: [
      {
        type: String,
        uppercase: true
      }
    ],
    department: {
      type: String,
      uppercase: true
    },
    branch: {
      type: String,
      required: true,
      uppercase: true
    },
    isOnline: {
      type: Boolean,
      default: false
    },
    isTv: {
      type: Boolean,
      default: false
    },
    isUrgent: {
      type: Boolean,
      default: false
    },
    forcedOffline: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;