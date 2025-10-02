"use client"
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
interface InterviewData {
  id: number;
  jobposition: string;
  jobdescription: string;
  duration: string;
  interviewtype: string[];
  question: string[];
  userId: number;
  createdAt?: string;
}

export default function InterviewDetails() {
  const {interviewId}=useParams();

  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    fetchData()
  },[])

  async function fetchData(){
    try {
      setLoading(true);
      const response = await axios.get(`/api/generatequestion/${interviewId}`);
      console.log("response",response.data)
      setInterviewData(response.data)
      setError(null);
    } catch (err) {
      console.error("Error fetching interview data:", err);
      setError("Failed to load interview details. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading interview details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!interviewData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">No interview data found</div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return <div>

    <div className="text-2xl font-bold  m-3">
      Interview Details 
    </div>
    <div className="flex flex-col gap-4  bg-white m-3 p-4 rounded-md">

      <div className="flex justify-between"> 
        <div className="text-2xl font-semibold"> 
          {interviewData.jobposition}
        </div>
        <button className="bg-green-100 px-3 text-green-700 font-semibold rounded-2xl">
          Active
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col "> 
          <div className="text-gray-500">
            Duration
          </div>
          <div className="text-black font-semibold flex items-center justify-center gap-1"> 
            <div>
           <FaRegClock />
             </div>
            <div>
            {interviewData.duration}
            </div>
          </div>
        </div>
       <div className="flex flex-col "> 
          <div className="text-gray-500">
            Created On
          </div>
          <div className="text-black font-semibold flex items-center justify-center gap-1"> 
            <div>
          <SlCalender />

             </div>
            <div>
           {formatDate(interviewData.createdAt)}
            </div>
          </div>
        </div>  <div className="flex flex-col "> 
          <div className="text-gray-500">
            Type
          </div>
          <div className="text-black font-semibold flex items-center justify-center gap-1"> 
            <div>
           <FaRegClock />
             </div>
            <div>
            {interviewData.interviewtype.join(', ')}
            </div>
          </div>
        </div>
      </div>
      <div className="text-xl font-semibold">Job Description</div>
      <div>
        {interviewData.jobdescription}
      </div>
    </div>


  </div>;
}