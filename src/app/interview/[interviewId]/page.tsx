export default function Interview() {
  return (
    <div className="bg-gray-300 h-screen p-1 w-full ">
      <div className="bg-white h-full  w-1/2 p-1 mx-auto rounded-xl">
        <div className=" pt-4 flex flex-col w-full gap-1 justify-center items-center">
          <div className="font-xl  text-blue-500">Aicruiter</div>
          <div>Ai powered Interview Platform</div>
        </div>
        <div className="w-full  my-2 flex justify-center">
          <img src="../inter.png" className="h-60 w-96" alt="Success" />
        </div>
        <div className="w-full flex flex-col items-center gap-1 justify-center">
          <div className="font-xl ">Full Stack Web Developer</div>
          <div className="flex gap-2">
            <div>google Inc</div>
            <div>30 minutes</div>
          </div>
        </div>
        <div className="flex flex-col  w-full  items-center my-1">
          <div className="flex flex-col w-full  gap-1 px-40">
            <label>Enter your Full name</label>
            <input
              className="w-full border-1 rounded-lgs border-gray-400 py-1.5   "
              type="text"
              placeholder="e.g john"
            />
          </div>
        </div>
        <div className="   mx-auto w-72 text-sm bg-blue-100">
          <div>
            <div></div>
            <div>Before you begin</div>
          </div>
          <div>
            <ul className="flex flex-col gap-1">
              <li>Ensure you have a stable internet connection</li>
              <li>Test your camera and microphone</li>
              <li>Find a quit place for interview</li>
            </ul>
          </div>
        </div>
        <div>
          <button>
            <div></div>
            <div>Join Interview</div>
          </button>
        </div>
      </div>
    </div>
  );
}
