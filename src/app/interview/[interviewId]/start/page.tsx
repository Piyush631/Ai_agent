"use client";
import { FaMicrophone } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/appStore";
import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";
import Popup from "@/app/component/popup";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
export default function StartInterview() {
  const job = useSelector((state: RootState) => state.question);
  const question = job?.question;
  const candidateName = job?.candidateName;
  const email = job?.candidateEmail;
  const {interviewId}=useParams();
  const [isPopup, setIsPopup] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState<any>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const api = "ba93387e-dd58-46ae-bdce-75702895b305";
  const router = useRouter();
  const [vapi, setVapi] = useState<Vapi | null>(null);

  useEffect(() => {
    // Initialize Vapi
    const vapiInstance = new Vapi(api);
    setVapi(vapiInstance);
    
    // Set up event listeners
    vapiInstance.on("call-start", () => {
      console.log("Call started");
      setActiveUser(true);
      setIsCallActive(true);
    });
    
    vapiInstance.on("call-end", () => {
      console.log("Call ended");
      setActiveUser(false);
      setIsCallActive(false);
      // Wait a bit for final messages to arrive
      setTimeout(() => {
        GenerateFeedback();
      }, 2000);
      router.push(`/interview/${interviewId}/complete`);
    });
    
    vapiInstance.on("speech-start", () => {
      console.log("speech start");
      setActiveUser(true);
    });
    
    vapiInstance.on("speech-end", () => {
      console.log("speech end");
      setActiveUser(false);
    });
    
    vapiInstance.on("message", (message) => {
      // Handle different message structures
      if (message?.conversation) {
        setConversation(message.conversation);
        console.log("Set conversation:", message.conversation);
      } else if (message?.transcript) {
        setConversation(message.transcript);
        console.log("Set transcript as conversation:", message.transcript);
      } else if (message?.content) {
        setConversation(message.content);
        console.log("Set content as conversation:", message.content);
      } else {
        console.log("No conversation data found in message:", message);
      }
    });

    // Cleanup on unmount
    return () => {
      vapiInstance.stop();
    };
  }, []);

  useEffect(() => {
    if (job && vapi) {
      console.log("Starting interview...");
      start();
    }
  }, [job, vapi]);

  const start = async () => {
    const questionList =
      question?.map((item: { question: string }) => item.question).join(", ") ??
      "";
    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${candidateName}, how are you? Ready for your interview on ${job?.jobposition}?`,
      transcriber: {
        provider: "deepgram" as const,
        model: "nova-2" as const,
        language: "en-US" as const,
      },
      voice: {
        provider: "playht" as const,
        voiceId: "jennifer" as const,
      },
      model: {
        provider: "openai" as const,
        model: "gpt-4" as const,
        messages: [
          {
            role: "system" as const,
            content: `
  You are an AI voice assistant conducting interviews...
 Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there ${candidateName}! Welcome to your ${job?.jobposition} interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions; ask one by one:
Questions: ${questionList}

If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite? Want to try again?"

Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"

After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 😄
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React

            `.trim(),
          },
        ],
      },
    };

    try {
      if (vapi) {
        await vapi.start(assistantOptions);
        console.log("Vapi call started successfully");
      } else {
        console.error("Vapi not initialized");
      }
    } catch (err) {
      console.error("Error starting assistant:", err);
    }
  };
  async function handleStop() {
    setIsPopup(true);
  }
  async function GenerateFeedback() {
    try {
     // Check if conversation data exists
      if (!conversation) {
        console.log("No conversation data available for feedback generation");
        return;
      }
      
      // Convert conversation to string if it's an array or object
      let conversationText: string = conversation;
      if (Array.isArray(conversation)) {
        conversationText = conversation.map((msg: any) => 
          typeof msg === 'string' ? msg : JSON.stringify(msg)
        ).join('\n');
      } else if (typeof conversation === 'object') {
        conversationText = JSON.stringify(conversation);
      }

      console.log("Sending conversation text:", conversationText);

      const result = await axios.post("/api/feedback", {
        conversation: conversationText
      });
      const content = result.data.content;
      const Final = content.replace("```json", "").replace("```", "");
      console.log("Feedback generated:", Final);
      const finalresult=await axios.post("/api/interviewfeedback", {  
        username: candidateName,
        email: email,
        feedback: Final,
        interviewId: interviewId,
      });
      console.log("Final result:", finalresult);
      //save to data base
    } catch (error) {
      console.error("Error generating feedback:", error);
    }
  }
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
              <div className="relative">
                {activeUser && (
                  <span className="absolute inset-0 rounded-full bg-blue-500 opactity-75 animate-ping" />
                )}
                <img
                  src="/ai.jpeg"
                  className="h-16 w-16 rounded-full object-cover"
                  alt="Success"
                />
                <div />
              </div>
              <div>AI Recruiter</div>
            </div>
          </div>
          <div className="h-56 md:h-72 w-full md:w-1/2 border border-white/60 rounded-md">
            <div className="flex h-full flex-col justify-center gap-2 items-center">
              <div className="absolute">
                {!activeUser && (
                  <span className="absolute inset-0 rounded-full bg-blue-500 opactity-75 animate-ping" />
                )}

                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-500">
                  <div>{candidateName?.[0]?.toUpperCase()} </div>
                </div>
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
          <div 
            className="h-10 w-10 bg-green-600 flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => start()}
          >
            <div className="text-white text-xl">
              <IoCall />
            </div>
          </div>
          <div className="h-10 w-10 bg-red-600 flex items-center justify-center rounded-full">
            <div onClick={handleStop} className="text-white text-xl cursor-pointer">
              <IoCall />
            </div>
          </div>
        </div>
        <div className="text-center">
          {isCallActive ? "Interview in Progress" : "Interview Ready - Click Green Button to Start"}
        </div>
      </div>
      {isPopup && (
        <div className=" fixed inset-0 flex  items-center justify-center z-50">
          <Popup
            heading="Are you absolutely sure?"
            subheading="This action cannot be undone.Your interview will end"
            firstButtonText="Cancel"
            secondButtonText="Continue"
            onClose={() => {
              setIsPopup(false);
            }}
            onSubmit={() => {
              setIsPopup(false);
              if (vapi) {
                vapi.stop();
              }
              router.push("/");
            }}
          />
        </div>
      )}
    </div>
  );
}
