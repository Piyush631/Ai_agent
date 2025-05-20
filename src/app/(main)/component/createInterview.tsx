"use client";
import { IoArrowBack } from "react-icons/io5";

import { FaCode } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import { PiBrain } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";
type InterviewQuestion = {
  question: string;
  type: string;
};
const data = [
  {
    name: "Technical",
    icon: <FaCode />,
  },
  {
    name: "Behavioral",
    icon: <FaRegUser />,
  },
  {
    name: "Experience",
    icon: <IoMdWallet />,
  },
  {
    name: "Leadership",
    icon: <PiBrain />,
  },
  {
    name: "Problem Solving",
    icon: <PiBrain />,
  },
];
interface stepData {
  step: number;
  setStep: (value: number) => void;
}
export default function CreateInterview({ step, setStep }: stepData) {
  const [formData, setFormData] = useState<{
    jobposition: string;
    jobdescription: string;
    duration: string;
    interviewType: string[];
  }>({
    jobposition: "",
    jobdescription: "",
    duration: "",
    interviewType: [],
  });
  const [question, setQuestion] = useState<InterviewQuestion[]>([]);
  const [type, setType] = useState<string[]>([]);

  useEffect(() => {
    console.log("Questions state updated:", question);
  }, [question]);
  useEffect(() => {
    setStep(0);
  }, []);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  function handleSubmit() {
    GenerateQuestion();
  }
  async function handleFinish() {
    const response = await axios.post("/api/generatequestion", {
      jobpostion: formData.jobposition,
      jobdescription: formData.jobdescription,
      duration: formData.duration,
      interviewType: formData.interviewType,
      question: question,
    });
  }
  const GenerateQuestion = async () => {
    try {
      const result = await axios.post("/api/openai", { ...formData });

      let content = result.data.content;

      content = content.replace(/```json\s*([\s\S]*?)\s*```/, "$1").trim();

      const firstBrace = content.indexOf("{");
      const lastBrace = content.lastIndexOf("}");

      const jsonString = content.substring(firstBrace, lastBrace + 1);

      const parsedData = JSON.parse(jsonString);
      const questions = parsedData.interviewQuestions;

      console.log("Raw questions:", questions);

      if (Array.isArray(questions)) {
        setQuestion(questions);
      } else {
        console.error("Questions is not an array:", questions);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  function handleType(name: string) {
    const updatedTypes = type.includes(name)
      ? type.filter((item) => item !== name)
      : [...type, name];

    setType(updatedTypes);
    setFormData((prev) => ({
      ...prev,
      interviewType: updatedTypes,
    }));
  }
  return (
    <div>
      <div className=" h-full py-4 mx-auto lg:max-w-2/3 w-full ">
        <div className="flex  my-3 items-center font-semibold gap-4">
          <div className="text-2xl">
            <IoArrowBack />
          </div>
          <div className="text-lg md:text-xl lg:text-2xl">
            Create New Interview
          </div>
        </div>
        <div className="bg-white rounded-md">
          <div className="px-4 pb-1 pt-4 flex flex-col gap-2">
            <div className="font-semibold">Job Position</div>
            <div className="">
              <input
                type="text"
                name="jobposition"
                onChange={handleInputChange}
                className=" w-full  py-1.5  focus:outline-none  rounded-md border-1 border-gray-400 "
                placeholder="e.g Full Stack Developer"
              />
            </div>
          </div>
          <div className="px-4 py-2 flex flex-col gap-2">
            <div className="font-semibold">Job Description</div>
            <div className="">
              <textarea
                rows={7}
                name="jobdescription"
                onChange={handleInputChange}
                className="w-full py-1.5 focus:outline-none rounded-md border border-gray-400"
                placeholder="Enter job description"
              />
            </div>
          </div>
          <div className="px-4 py-2 flex flex-col gap-2">
            <div className="font-semibold">Interview Duration</div>
            <div className="">
              <select
                name="duration"
                onChange={handleInputChange}
                className="w-full py-2 focus:outline-none rounded-md text-gray-500 border-1 border-gray-400 "
              >
                <option className="text-gray-200" value="">
                  Select duration
                </option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
              </select>
            </div>
          </div>
          <div className="px-4 pb-1 pt-4 flex flex-col gap-2">
            <div className="font-semibold">Interview Type</div>
            <div className="flex flex-wrap gap-3 ">
              {data.map((d, i) => (
                <button
                  onClick={() => handleType(d.name)}
                  key={i}
                  className={`flex gap-1.5  px-5 cursor-pointer  text-sm justify-center items-center border-1 border-gray-400 rounded-xl  py-1 ${
                    type.includes(d.name) && "text-blue-600"
                  }`}
                >
                  <div>{d.icon}</div>
                  <div>{d.name}s</div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-3 pb-4 px-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-sm  flex items-center justify-center gap-2  text-white rounded-lg px-4 py-1.5"
            >
              <div>Generate Questions</div>
              <div>
                <FaArrowRightLong />
              </div>
            </button>
            <button
              onClick={handleFinish}
              className="bg-blue-600 text-sm  flex items-center justify-center gap-2  text-white rounded-lg px-4 py-1.5"
            >
              <div>Finish</div>
              <div>
                <FaArrowRightLong />
              </div>
            </button>
          </div>
        </div>

        {/* Display Generated Questions */}
        {question.length > 0 && (
          <div className="mt-8 bg-white rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4">Generated Questions</h2>
            <div className="space-y-4">
              {question.map((q, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {q.type}
                    </span>
                  </div>
                  <p className="text-gray-800">{q.question}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
