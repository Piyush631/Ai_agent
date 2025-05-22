import { IoArrowBack } from "react-icons/io5";
import { FaCopy, FaPlus } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { TbMessage2Question } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci";

type Props = {
  interviewId: string;
};

export function GenerateLink({ interviewId }: Props) {
  const interviewLink = `http://localhost:3000/interview/${interviewId}`;

  return (
    <div className="h-full py-4 mx-auto lg:max-w-2/3 w-full">
      <div className="mt-3 flex flex-col justify-center gap-3 items-center">
        <img src="./yes.png" className="h-12 w-12" alt="Success" />
        <div className="text-md font-semibold">Your AI Interview is Ready</div>
        <div className="text-xs md:text-md text-center">
          Share this link with your candidates to start the interview process
        </div>
      </div>

      <div className="w-full p-4">
        {/* Link Section */}
        <div className="my-8 px-3 py-6 bg-white flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="text-md font-semibold">Interview Link</div>
            <div className="text-md text-blue-700">valid for 30 days</div>
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="w-1/2 md:w-2/3">
              <input
                type="text"
                className="py-1.5 w-full bg-gray-100"
                disabled
                value={interviewLink}
              />
            </div>

            <button className="bg-blue-500 text-white py-1 flex items-center justify-center w-32 rounded-md px-2">
              <FaCopy />
              <span className="ml-2">Copy Link</span>
            </button>
          </div>

          <div className="flex gap-4">
            <Badge icon={<FiClock />} label="30 Minutes" />
            <Badge icon={<TbMessage2Question />} label="10 Questions" />
            <Badge icon={<SlCalender />} label="Expires: Nov 20, 2025" />
          </div>
        </div>

        {/* Share Buttons */}
        <div className="px-3 py-6 bg-white flex flex-col gap-4">
          <div className="text-md font-semibold">Share via</div>
          <div className="flex justify-around">
            <ShareButton icon={<MdOutlineMailOutline />} label="Email" />
            <ShareButton icon={<IoLogoWhatsapp />} label="WhatsApp" />
            <ShareButton icon={<CiLinkedin />} label="LinkedIn" />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex mt-5 gap-12 justify-between">
          <button className="flex items-center gap-1 text-xs md:text-lg py-1.5 px-4 rounded-md bg-gray-400">
            <IoArrowBack />
            <span>Back to Dashboard</span>
          </button>
          <button className="flex items-center gap-1 text-xs md:text-lg py-1.5 px-4 rounded-md text-white bg-blue-500">
            <FaPlus />
            <span>Create a new interview</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex gap-1 bg-gray-200 px-2 text-sm rounded-sm items-center justify-center">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function ShareButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center bg-gray-100 rounded-md text-md gap-1 py-1 w-28 justify-center">
      {icon}
      <span>{label}</span>
    </button>
  );
}
