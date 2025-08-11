import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Person",
    },
  ],
});

export default mongoose.model("User", schema);
