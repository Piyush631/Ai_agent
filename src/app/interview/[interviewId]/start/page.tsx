"use client";
import { FaMicrophone } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/appStore";
import Vapi from "@vapi-ai/web";
import { useEffect } from "react";

export default function StartInterview() {
  const job = useSelector((state: RootState) => state.question);
  const question = job?.question;
  const vapi = new Vapi("ba93387e-dd58-46ae-bdce-75702895b305");

  useEffect(() => {
    if (job) {
      console.log("Starting interview...");
      startCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job]);

  const startCall = async () => {
    console.log("enter");
    console.log(question);

    const questionList =
      question?.map((item: { question: string }) => item.question).join(", ") ??
      "";

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi Piyush, how are you? Ready for your interview on ${job?.jobposition}?`,
      transcriber: {
        provider: "deepgram" as const,
        model: "nova-2" as const,
        language: "en-US" as const
      },
      tts: {
        provider: "playht" as const,
        voiceId: "jennifer" as const,
      },
      model: {
        provider: "openai" as const,
        model: "gpt-4o" as const,
        messages: [
          {
            role: "system" as const,
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${job?.jobposition} interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below are the questions to ask one by one:
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That was solid. Ready to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up…" or "Let's tackle a tricky one!"
After 5–7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End with a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React
          `.trim(),
          },
        ],
      },
    };

    try {
      await vapi.start(assistantOptions);
    } catch (error) {
      console.error('Vapi error:', error);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white">
      <div className="w-full md:w-2/3 mx-auto px-8 pt-24 ">
        <div className="flex justify-between text-sm md:text-lg">
          <div>AI Interview Session</div>
          <div className="flex items-center justify-center gap-1">
            <div className="text-white">
              <FaRegClock />
            </div>
            <div>00:05:23 {job?.jobdescription}</div>
          </div>
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <div className="h-56 md:h-72 w-full md:w-1/2 border border-white/60 rounded-md">
            <div className="flex h-full flex-col justify-center gap-2 items-center">
              <img
                src="/ai.jpeg"
                className="h-16 w-16 rounded-full object-cover"
                alt="Success"
              />
              <div>AI Recruiter</div>
            </div>
          </div>
          <div className="h-56 md:h-72 w-full md:w-1/2 border border-white/60 rounded-md">
            <div className="flex h-full flex-col justify-center gap-2 items-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-500">
                <div>P</div>
              </div>
              <div>You</div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center my-6 items-center gap-6">
          <div className="h-10 w-10 bg-gray-600 flex items-center justify-center rounded-full">
            <div className="text-white text-xl">
              <FaMicrophone />
            </div>
          </div>
          <div className="h-10 w-10 bg-red-600 flex items-center justify-center rounded-full">
            <div className="text-white text-xl">
              <IoCall />
            </div>
          </div>
        </div>
        <div className="text-center">Interview in Progress</div>
      </div>
    </div>
  );
}
