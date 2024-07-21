
import {connect} from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";

connect();

export async function PUT(request: NextRequest) {
    try {
      const data = await request.json();
      console.log(data);
      
      const { _id, name, times, difficulty } = data[0];
  
      const question = await Question.findByIdAndUpdate(_id, { name, times, difficulty }, { new: true });
      console.log(question);
      if (!question) {
        return NextResponse.json({ error: "Question not found" }, { status: 404 });
      }
      
      return NextResponse.json(question);
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
    }
  }
  