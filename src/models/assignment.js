import mongoose, { Schema } from "mongoose";

const assignmentSchema = new Schema({
  userEmail: {
    type: String,
    required: [true, "User Email is required."],
    trim: true,
    minLength: [5, "User Email must be larger than 2 characters"],
    maxLength: [30, "User Email must be lesser than 11 characters"],
  },
  Project: {
    type: String,
    required: [true, "Project is required."],
    trim: true,
    minLength: [2, "Project must be larger than 2 characters"],
    maxLength: [11, "Project must be lesser than 11 characters"],
  },
  Assignment: {
    type: String,
    required: [true, "Assignment is required."],
    trim: true,
    minLength: [2, "Assignment must be larger than 2 characters"],
    maxLength: [11, "Assignment must be lesser than 11 characters"],
  },
  Score: {
    type: String,
    required: [true, "Score is required."],
    trim: true,
    minLength: [1, "Score must be larger than 2 characters"],
    maxLength: [11, "Score must be lesser than 11 characters"],
  },
  total: {
    type: String,
    required: [true, "Total is required."],
    trim: true,
    minLength: [1, "Score must be larger than 2 characters"],
    maxLength: [50, "Score must be larger than 2 characters"],
  },
});

const Assignments =
  mongoose.models.Assignments ||
  mongoose.model("Assignments", assignmentSchema);

export { Assignments };
