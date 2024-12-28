import mongoose from "mongoose";
const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    video: {
      type: String,
    },
    second_video: {
      type: String
    },
    branch: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    announcement: {
      type: String
    },
    image: {
      type: String
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user"
    }
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;