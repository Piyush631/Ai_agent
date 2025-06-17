import { MdOutlineWatchLater } from "react-icons/md";

export default function interviewFinished() {
  return (
    <div className="h-screen w-full ">
      <div className="h-screen w-1/2  mx-auto">
        <div className="flex flex-col justify-center pt-6 gap-1 items-center">
          <img src="/check.png" className="h-14 w-14"></img>
          <div className="font-semibold text-2xl">Interview Complete!</div>
          <div className="text-gray-400">
            Thank you for the participating in the AI-driven Interview with
            AIrecuriter
          </div>
          <img src="/finish.png" className="h-72"></img>
        </div>
        <div className="w-2/3 border-1 gap-2 py-4 rounded-md border-gray-200 mx-auto flex flex-col justify-center items-center">
          <div className="font-semibold">What's Next?</div>
          <div className="text-sm text-center text-gray-400">
            The recruiter will review your interview responses and will contact
            you soon regarding the next step{" "}
          </div>
          <div className="flex justify-center items-center gap-1">
            <div>
              <MdOutlineWatchLater />
            </div>
            <div className="text-gray-400 text-sm text-center">
              Resposne within 2-3 business days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
