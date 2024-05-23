import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const questionSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  question: { type: String, required: true },
  answers: { type: [answerSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Question", questionSchema);
