import { MdOutlineWatchLater } from "react-icons/md";
import { RiTelegram2Fill } from "react-icons/ri";

export default function Complete() {
  return <div className="h-screen w-full flex flex-col justify-center items-center">
    <div className=" mt-16 flex flex-col gap-2 items-center justify-center">
        <div>
            <img src="/check.png" alt="check" className="h-20 w-20"/>
        </div>
        <div className="text-4xl font-bold">   
            Interview Complete!
            </div>
            <div className="text-gray-400">
            Thank you for the participating in the AI-driven Interview with
            AIrecuriter!!
            </div>
            <div>
                <img src="/complete.png" alt="finish" className="h-72 w-full"/>
            </div>
        </div>  
        <div className="h-52 w-md border-gray-200  shadow-md
 flex flex-col items-center p-3 gap-2 m-3">
            <div>
                <div className="h-8 w-8  flex items-center justify-center rounded-full bg-blue-600"> 
                  <span className="text-white"> 
                    <RiTelegram2Fill />
                    </span>  

                </div>
            </div>
            <div className="text-xl font-bold">
            What's Next?
            </div>
            <div className="px-3 text-center text-sm text-gray-600
">
            The recruiter will review your interview responses and will contact you soon regarding your next steps
            </div>
            <div className="flex justify-center items-center text-sm text-gray-600 gap-1 ">
                <div>
<MdOutlineWatchLater />

                </div>
                <div >
                    Response within 2-3 business days
                </div>
            </div>
        </div>
  </div>
}