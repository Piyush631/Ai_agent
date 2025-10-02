"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaCopy } from "react-icons/fa";
import { IoIosSend } from "react-icons/io"
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
    const [copiedId, setCopiedId] = useState<number | null>(null)
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
  
    const handleCopyLink = async (interviewId: number) => {
      const link = `${window.location.origin}/interview/${interviewId}`;
      try {
        await navigator.clipboard.writeText(link);
        setCopiedId(interviewId);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    };
  
    const handleSendInterview = (interviewId: number) => {
      // You can implement email sending functionality here
      console.log('Send interview:', interviewId);
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
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {interview.jobposition}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{interview.jobdescription}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 mb-1">Created</div>
                      <div className="text-sm font-medium text-gray-600">2024-03-12</div>
                    </div>
                  </div>

                  {/* Interview Types */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {interview.interviewtype.map((type, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full shadow-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Duration */}
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">{interview.duration} minutes</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 bg-gray-50">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleCopyLink(interview.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                    >
                      <FaCopy className={`transition-colors ${copiedId === interview.id ? 'text-green-600' : 'text-gray-600 group-hover:text-blue-600'}`} />
                      <span className={`text-sm font-medium transition-colors ${copiedId === interview.id ? 'text-green-600' : 'text-gray-700 group-hover:text-blue-600'}`}>
                        {copiedId === interview.id ? 'Copied!' : 'Copy Link'}
                      </span>
                    </button>
                    <button 
                      onClick={() => handleSendInterview(interview.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
                    >
                      <IoIosSend className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">Send</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  </div>;
}