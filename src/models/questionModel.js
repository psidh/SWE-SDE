import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  name: String,
  topic: String,
  times: String,
  difficulty: String,
});

const Question = mongoose.models.questions || mongoose.model("questions", questionSchema);

export default Question;
