import { Assignments } from "../../../models/assignment";
import connectDB from "../../../lib/mongodb";
import mongoose from "mongoose";

export default async function GET(req, res) {
  const { email, project, assignment } = await req.query;
  let top;
  try {
    await connectDB();
    top = await Assignments.find({
      Project: project,
      Assignment: assignment,
      userEmail: email,
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
      return res.status(500).json({ msg: ["Unable to load Questions."] });
    }
  }
  //const Project = url.searchParams.get("project");
  //const Assignment = url.searchParams.get("assignment");
  //let { Project, Assignment } = await request.body;
  //console.log(MultipleChoice);
  //const top = await MultipleChoice.find({});

  return res.status(200).json({ message: top });
}
