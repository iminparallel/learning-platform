import mongoose, { Schema } from "mongoose";

const questionsSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  Project: {
    type: String,
    required: [true, "Project is required."],
    trim: true,
  },
  Assignment: {
    type: String,
    required: [true, "Assignment is required."],
    trim: true,
  },
  Question: {
    type: String,
    required: [true, "Question is required."],
    trim: true,
  },
  Answers: {
    type: [String],
    required: [true, "Answers is required."],
  },
  CorrectAnswer: {
    type: String,
    required: [true, "CorrectAnswer is required."],
    trim: true,
  },
});

const MultipleChoice =
  mongoose.models.MultipleChoice ||
  mongoose.model("MultipleChoice", questionsSchema);

export { MultipleChoice };
