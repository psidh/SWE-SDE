import connect from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";

connect();

export async function GET() {
  const questions = await Question.find();
  return NextResponse.json(questions);
}

export async function PUT(req: NextRequest) {
  try {
    const questionsToUpdate = await req.json();

    const updatePromises = questionsToUpdate.map(async (question: any) => {
      const { _id, ...updatedData } = question;
      return Question.findByIdAndUpdate(_id, updatedData, { new: true });
    });

    const updatedQuestions = await Promise.all(updatePromises);

    return NextResponse.json(updatedQuestions);
  } catch (error) {
    console.error("Failed to update questions:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update questions",
    });
  }
}
