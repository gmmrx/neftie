import { format } from "date-fns";
import React from "react";
import Link from "next/link";

const CommunityTierListBox = ({ data }) => {
  console.log(data);
  return (
    <Link href={`/tier-list/${data.slug}`}>
      <div className="w-full bg-white/5 p-4 rounded-md mb-4 hover:bg-white/15 transition-all">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-start">
            <div>
              <img
                src={data?.User?.picture}
                className="max-w-[4.375rem] rounded-md mt-1"
              />
            </div>
            <div className="">
              <div className="font-dosis hover:underline cursor-pointer">
                {data.title}
              </div>
              <div className="text-xs font-normal text-[#6c6a6a]">
                by <strong>{data?.User?.username}</strong> - posted at{" "}
                <span className="font-bold">
                  {format(data.createdAt, "dd MM yyy")}
                </span>
              </div>
              <div className="mt-2 p-1 px-0 bg-[#a73245] rounded-md max-w-[80px] text-center text-xs">
                {data.patchVersionId}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center text-[10px] font-inter font-normal">
            <div className="">
              <span className="text-[14px] font-bold">{data.commentCount}</span>{" "}
              COMMENTS
            </div>
            <div>
              <span className="text-[14px] font-bold">{data.voteCount}</span>{" "}
              VOTES
            </div>
            <div>
              {" "}
              <span className="text-[14px] font-bold">
                {data.viewCount}
              </span>{" "}
              VIEWS
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CommunityTierListBox;
