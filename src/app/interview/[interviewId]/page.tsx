"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "@/app/store/slice/questionSlice";

export default function Interview() {
  const params = useParams();
  const interviewId = params.interviewId;
  const [interviewData, setInterviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const job = useSelector((state: RootState) => state.question);
const dispatch=useDispatch()
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/generatequestion/${interviewId}`
      );
      setInterviewData(response.data);
      dispatch(setQuestion(response.data))
      setError(null);
    } catch (error: any) {
      console.error("Error fetching interview data:", error);
      setError(error.response?.data?.error?.message || "Failed to fetch interview data");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-300 h-screen p-1 w-full">
      <div className="bg-white h-full lg:w-1/2 w-full p-1 mx-auto rounded-xl">
        <div className="lg:pt-2 pt-4 flex flex-col w-full lg:gap-1 md:gap-3 justify-center items-center">
          <div className="text-xl font-semibold text-blue-600">AIcruiter</div>
          <div className="text-gray-600">AI powered Interview Platform</div>
        </div>

        <div className="w-full lg:my-2 my-4 flex justify-center">
          <img src="../inter.png" className="h-56 w-96" alt="Success" />
        </div>

        <div className="w-full flex flex-col items-center gap-1 justify-center">
          <div className="text-xl font-semibold">{interviewData?.jobposition || 'Loading...'}</div>
          <div className="flex items-center gap-1">
            <FaRegClock />
            <div>{interviewData?.duration || 'Loading...'}{" "}minutes</div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center lg:mt-2 mt-4">
          <div className="flex flex-col w-full lg:gap-1 gap-3 lg:px-40 md:px-32 px-10">
            <label>Enter your Full name</label>
            <input
              className="w-full border-1 rounded-lg border-gray-400 py-1.5"
              type="text"
              placeholder="e.g john"
            />
          </div>
        </div>

        <div className="lg:mt-2 mt-4 mx-auto w-80 py-2 text-sm pl-4 bg-blue-100">
          <div className="text-blue-700 font-semibold">Before you begin</div>
          <ul className="list-disc list-inside flex flex-col gap-0.5 mt-1 text-blue-700">
            <li>Ensure you have a stable internet connection</li>
            <li>Test your camera and microphone</li>
            <li>Find a quiet place for interview</li>
          </ul>
        </div>

        <div className="w-full flex justify-center lg:mt-2 mt-4">
          <button className="bg-blue-700 w-1/2 text-white rounded-md py-1">
            Join Interview
          </button>
        </div>
      </div>
    </div>
  );
}
