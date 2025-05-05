import { IoArrowBack } from "react-icons/io5";
import { FaCopy } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { TbMessage2Question } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
export function GenerateLink() {
  return (
    <div>
      <div className=" h-full py-4 mx-auto lg:max-w-2/3 w-full ">
        <div className=" mt-3 flex flex-col justify-center   gap-3 items-center">
          <div>
            <img src="./yes.png" className="h-12 w-12" />
          </div>
          <div className="text-md font-semibold">
            Your Ai Interview is Ready2
          </div>
          <div className=" text-xs md:text-md text-center">
            Share this link with your candidates to start the interview process
          </div>
        </div>
        <div className="w-full  p-4 ">
          <div className="my-8 px-3  py-6 bg-white flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="text-md font-semibold">Interview Link</div>
              <div className="text-md text-blue-700">valid for 30 days</div>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className=" w-1/2 md:w-2/3">
                <input
                  type="text"
                  className="py-1.5 w-full bg-gray-100 "
                  disabled
                  value="http//localhost/3000/interview/4fdr34fdre4"
                  placeholder="http//localhost/3000/interview/4fdr34fdre4"
                />
              </div>

              <button className="bg-blue-500 text-white py-1 flex items-center justify-center w-32 rounded-md px-2">
                <div>
                  <FaCopy />
                </div>
                <div>Copy Link</div>
              </button>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-1 bg-gray-200  px-0.5  md:px-2 text-xs  md:text-sm rounded-sm items-center justify-center">
                <div className="">
                  <FiClock />
                </div>
                <div className="">30 Minutes</div>
              </div>
              <div className="flex gap-1 bg-gray-200  px-0.5  md:px-2 text-xs  md:text-sm rounded-sm items-center justify-center">
                <div>
                  <TbMessage2Question />
                </div>
                <div className="">10 Questions</div>
              </div>
              <div className="flex gap-1 bg-gray-200  px-0.5  md:px-2 text-xs  md:text-sm rounded-sm items-center justify-center">
                <div>
                  <SlCalender />
                </div>
                <div className="">Expires:Nov 20,2025</div>
              </div>
            </div>
          </div>
          <div className=" px-3  py-6 bg-white flex flex-col gap-4">
            <div className="text-md font-semibold">Share via</div>
            <div className="flex justify-around">
              <button className="flex items-center bg-gray-100  rounded-md text-md gap-1  py-1 w-28 justify-center">
                <div>
                  <MdOutlineMailOutline />
                </div>
                <div>Email</div>
              </button>
              <button className="flex items-center bg-gray-100  rounded-md text-md gap-1  py-1 w-28 justify-center">
                <div>
                  <IoLogoWhatsapp />
                </div>
                <div>Whatsapp</div>
              </button>
              <button className="flex items-center bg-gray-100  rounded-md text-md gap-1  py-1 w-28 justify-center">
                <div>
                  <CiLinkedin />
                </div>
                <div>Linked In</div>
              </button>
            </div>
          </div>
          <div className="flex  mt-5 gap-12 justify-between">
            <button className="flex items-center   gap-1  text-xs md:text-lg py-1.5 px-2 md:px-3 lg:px-4 rounded-md bg-gray-400 justify-center">
              <div>
                <IoArrowBack />
              </div>
              <div>Back to Dashboard</div>
            </button>
            <button className="flex items-center gap-1 justify-center py-1.5 px-2 md:px-3  lg:px-4 rounded-md text-white text-xs  md:text-lg bg-blue-500">
              <div>
                <FaPlus />
              </div>
              <div>Create a new interview</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
