export default function Feedback() {
  return (
    <div className="h-screen w-full p-6">
      <div className="flex justify-between w-full py-2 px-8 bg-gray-100 ">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 rounded-full bg-blue-200"></div>
          <div className="flex flex-col gap-0.5 ">
            <div className="font-semibold textxl">Piyush</div>
            <div className="text-gray-400">Full Stack Webdeveloper</div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-end">
          <div className="font-semibold text-xl">
            <span className="text-blue-600">8.5</span>/10
          </div>
        </div>
      </div>
      <div className="my-2">
        <div className="pt-2 font-semibold text-2xl">Skills Assessment</div>
        <div className=" w-full  gap-4 flex justify-between flex-wrap">
          <div className="py-2 flex flex-col gap-1 w-[478px] ">
            <div className="flex justify-between">
              <div className="font-semibold">Technical Skills</div>
              <div className="font-semibold">7/10</div>
            </div>
            <div className="h-2 w-full rounded-xl bg-gray-300">
              <div
                className=" h-full w-full rounded-xl bg-blue-700 "
                style={{ width: `${(8 / 10) * 100}%` }} //style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="py-2 flex flex-col gap-1  w-[478px] ">
            <div className="flex justify-between">
              <div className="font-semibold">Communications</div>
              <div className="font-semibold">8/10</div>
            </div>
            <div className="h-2 w-full rounded-xl bg-blue-700 "></div>
          </div>
          <div className="py-2 flex flex-col gap-1  w-[478px] ">
            <div className="flex justify-between">
              <div className="font-semibold">Problem Solving</div>
              <div className="font-semibold">8/10</div>
            </div>
            <div className="h-2 w-full rounded-xl bg-blue-700 "></div>
          </div>
          <div className="py-2 flex flex-col gap-1  w-[478px] ">
            <div className="flex justify-between">
              <div className="font-semibold">Experience</div>
              <div className="font-semibold">4/10</div>
            </div>
            <div className="h-2 w-full rounded-xl bg-blue-700 "></div>
          </div>
        </div>
      </div>
      <div className="my-2">
        <div className=" pt-2 text-xl font-semibold">Performance Summary</div>
        <div className="px-3 py-3 text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </div>
      </div>
    </div>
  );
}
