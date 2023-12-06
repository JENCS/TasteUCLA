import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  reviews: [mongoose.Types.ObjectId],
  imageUrl: {
    type: String
  },
  bio: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
