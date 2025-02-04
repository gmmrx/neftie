import React from "react";

const CommunityTierListBox = () => {
  return (
    <div className="w-full bg-white/5 p-4 rounded-md mb-4 hover:bg-white/15 transition-all">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="">
            <div className="font-dosis hover:underline cursor-pointer">
              The Nefties i'd like to be roommates
            </div>
            <div className="text-xs font-normal text-[#6c6a6a]">
              by <strong>gummer</strong> - posted at{" "}
              <span className="font-bold">17 Jan, 2025</span>
            </div>
            <div className="mt-2 p-1 px-0 bg-[#a73245] rounded-md max-w-[80px] text-center text-xs">
              12.0.2
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-[10px] font-inter font-normal">
          <div className="">
            <span className="text-[14px] font-bold">12</span> POINTS
          </div>
          <div>
            <span className="text-[14px] font-bold">12</span> VOTES
          </div>
          <div>
            {" "}
            <span className="text-[14px] font-bold">205</span> VIEWS
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityTierListBox;
