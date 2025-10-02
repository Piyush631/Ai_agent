"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdRemoveRedEye } from "react-icons/md";
import { useEffect, useState } from "react";
interface InterviewData {
  id: number;
  jobposition: string;
  jobdescription: string;
  duration: string;
  interviewtype: string[];
  question: string[];
  userId: number;
}


export default function AllInterview() {

    const router = useRouter();
    const [interviewData, setInterviewData] = useState<InterviewData[]>([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        const response = await axios.get("/api/generatequestion");
        console.log("response");
        console.log(response.data);
        setInterviewData(response.data)
        setLoading(false)
      }
      fetchData();
    }, [])
  
    const handleViewDetails = (interviewId: number) => {
      router.push(`/interviewDetails/${interviewId}`);
    };
  return <div>
     <div className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-800">All Interview</h2>
              {/* <p className="text-gray-600">Manage and track your interview sessions</p> */}
            </div>
            {loading && (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading...</span>
              </div>
            )}
          </div>

          {interviewData.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No interviews yet</h3>
              <p className="text-gray-500">Create your first AI interview to get started</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewData.map((interview) => (
              <div 
                key={interview.id} 
                className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {interview.jobposition}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{interview.jobdescription}</p>
                  </div>

                  {/* Interview Types */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {interview.interviewtype.map((type, index) => (
                      <span 
                        key={index}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded border border-gray-300"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Duration */}
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span>Duration: {interview.duration} min</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {interview.id}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button 
                    onClick={() => handleViewDetails(interview.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors duration-200"
                  >
                    <MdRemoveRedEye className="text-lg" />
                    <span className="text-sm font-medium">View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  </div>;
}