import connectDB from "../../../lib/mongodb";

import { MultipleChoice } from "../../../models/questions";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export default async function POST(req, res) {
  console.log("A1");
  let { Project, Assignment, Question, Answers, CorrectAnswer } =
    await req.body;
  console.log(Answers, String(Project), CorrectAnswer);
  Project = String(Project);
  console.log(req.body.Project.length);
  const _id = Project + "_" + Assignment + "_" + Question;
  try {
    await connectDB();
    await MultipleChoice.create({
      _id,
      Project,
      Assignment,
      Question,
      Answers,
      CorrectAnswer,
    });
    return res.status(200).json({
      msg: ["Submitted successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return res.status(400).json({ msg: errorList });
    } else {
      return res.status(500).json({ msg: ["Unable to load Question."] });
    }
  }
}
