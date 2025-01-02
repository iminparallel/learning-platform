import connectDB from "../../../lib/mongodb";

import { Assignments } from "../../models/assignment";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export default async function POST(req, res) {
  console.log("A1");
  const { userEmail, Project, Assignment, Score, total } = await req.body;
  try {
    await connectDB();
    await Assignments.create({ userEmail, Project, Assignment, Score, total });
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
      return res.status(500).json({ msg: ["Unable to complete Assignment."] });
    }
  }
}
