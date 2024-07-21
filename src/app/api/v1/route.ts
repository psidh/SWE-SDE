import connect from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";

connect();

export async function GET() {
  const questions = await Question.find();
  return NextResponse.json(questions);
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { _id, name, topic, times, difficulty } = data[0]; // assuming single update at a time
    const question = await Question.findByIdAndUpdate(_id, { name, topic, times, difficulty }, { new: true });
    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }
    return NextResponse.json(question);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
  }
}
