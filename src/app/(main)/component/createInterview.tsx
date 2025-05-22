"use client";

import { IoArrowBack } from "react-icons/io5";
import { FaCode, FaArrowRightLong } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import { PiBrain } from "react-icons/pi";
import { useState, useEffect } from "react";
import axios from "axios";

type InterviewQuestion = {
  question: string;
  type: string;
};

const data = [
  { name: "Technical", icon: <FaCode /> },
  { name: "Behavioral", icon: <FaRegUser /> },
  { name: "Experience", icon: <IoMdWallet /> },
  { name: "Leadership", icon: <PiBrain /> },
  { name: "Problem Solving", icon: <PiBrain /> },
];

interface StepData {
  step: number;
  setStep: (value: number) => void;
  setInterviewId: (value: string) => void;
}

export default function CreateInterview({
  step,
  setStep,
  setInterviewId,
}: StepData) {
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
    setStep(0);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleType = (name: string) => {
    const updatedTypes = type.includes(name)
      ? type.filter((item) => item !== name)
      : [...type, name];

    setType(updatedTypes);
    setFormData((prev) => ({
      ...prev,
      interviewType: updatedTypes,
    }));
  };

  const GenerateQuestion = async (): Promise<InterviewQuestion[]> => {
    try {
      const result = await axios.post("/api/openai", { ...formData });

      let content: string = result.data.content;
      content = content.replace(/```json\s*([\s\S]*?)\s*```/, "$1").trim();

      const firstBrace = content.indexOf("{");
      const lastBrace = content.lastIndexOf("}");

      if (firstBrace === -1 || lastBrace === -1)
        throw new Error("Invalid JSON format");

      const jsonString = content.substring(firstBrace, lastBrace + 1);
      const parsedData = JSON.parse(jsonString);

      const questions: InterviewQuestion[] = parsedData.interviewQuestions;

      if (Array.isArray(questions)) {
        return questions;
      } else {
        console.error("Questions is not an array:", questions);
        return [];
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      return [];
    }
  };

  const handleSubmit = async () => {
    const generatedQuestions = await GenerateQuestion();
    setQuestion(generatedQuestions);

    if (
      !formData.jobposition.trim() ||
      !formData.jobdescription.trim() ||
      !formData.duration ||
      formData.interviewType.length === 0 ||
      generatedQuestions.length === 0
    ) {
      const missingFields = [];
      if (!formData.jobposition.trim()) missingFields.push("Job Position");
      if (!formData.jobdescription.trim())
        missingFields.push("Job Description");
      if (!formData.duration) missingFields.push("Duration");
      if (formData.interviewType.length === 0)
        missingFields.push("Interview Type");
      if (generatedQuestions.length === 0)
        missingFields.push("Generated Questions");

      alert(
        `Please fill in all fields and generate questions before finishing.\nMissing fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    try {
      const response = await axios.post("/api/generatequestion", {
        ...formData,
        question: generatedQuestions,
        userId: 1,
      });
      setInterviewId(response.data.id);
      setStep(1);
      console.log(response.data.id);

      console.log("Job post created:", response.data);
    } catch (error) {
      console.error("Failed to create job post:", error);
    }
  };

  return (
    <div className="h-full py-4 mx-auto lg:max-w-2/3 w-full">
      <div className="flex my-3 items-center font-semibold gap-4">
        <div className="text-2xl">
          <IoArrowBack />
        </div>
        <div className="text-lg md:text-xl lg:text-2xl">
          Create New Interview
        </div>
      </div>

      <div className="bg-white rounded-md">
        {/* Job Position */}
        <div className="px-4 pb-1 pt-4 flex flex-col gap-2">
          <div className="font-semibold">Job Position</div>
          <input
            type="text"
            name="jobposition"
            value={formData.jobposition}
            onChange={handleInputChange}
            className="w-full py-1.5 focus:outline-none rounded-md border border-gray-400"
            placeholder="e.g Full Stack Developer"
          />
        </div>

        {/* Job Description */}
        <div className="px-4 py-2 flex flex-col gap-2">
          <div className="font-semibold">Job Description</div>
          <textarea
            name="jobdescription"
            rows={7}
            value={formData.jobdescription}
            onChange={handleInputChange}
            className="w-full py-1.5 focus:outline-none rounded-md border border-gray-400"
            placeholder="Enter job description"
          />
        </div>

        {/* Interview Duration */}
        <div className="px-4 py-2 flex flex-col gap-2">
          <div className="font-semibold">Interview Duration</div>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full py-2 focus:outline-none rounded-md text-gray-500 border border-gray-400"
          >
            <option value="">Select duration</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
          </select>
        </div>

        {/* Interview Type */}
        <div className="px-4 pb-1 pt-4 flex flex-col gap-2">
          <div className="font-semibold">Interview Type</div>
          <div className="flex flex-wrap gap-3">
            {data.map((d, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleType(d.name)}
                className={`flex gap-1.5 px-5 cursor-pointer text-sm justify-center items-center border border-gray-400 rounded-xl py-1 ${
                  type.includes(d.name) && "text-blue-600"
                }`}
              >
                <div>{d.icon}</div>
                <div>{d.name}s</div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-3 pb-4 px-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-sm flex items-center justify-center gap-2 text-white rounded-lg px-4 py-1.5"
          >
            <div>Create Interview</div>
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
}
