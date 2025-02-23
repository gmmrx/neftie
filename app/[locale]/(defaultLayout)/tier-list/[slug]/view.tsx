"use client";

import { Editor } from "@/components/editor";
import { toast } from "@/components/ui/use-toast";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { useNefties } from "@/providers/NeftiesProvider";
import { format } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  EyeIcon,
  Minus,
  Plus,
  Vote,
  VoteIcon,
} from "lucide-react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";

const SingleTierList: NextPage = ({ data, initialComments }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { nefties } = useNefties();
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [selected, setSelected] = useState("DATE");
  const [hovered, setHovered] = useState<string | null>(null);
  const [voteCount, setVoteCount] = useState(data?.voteCount || 0);
  const [userVote, setUserVote] = useState(null);

  const sendComment = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please login to vote",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await fetch("/api/tier-list/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tierListId: data.id,
          userId: session.user.id,
          content: comment,
        }),
      });

      const result = await response.json();
      if (result.status === 200) {
        toast({
          title: "Success",
          description: "Your comment has been posted.",
        });
        router.refresh();
        setComment("");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive",
      });
    }
  };

  const handleVote = async (isUpvote: boolean) => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please login to vote",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/tier-list/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          tierListId: data.id,
          vote: isUpvote,
        }),
      });

      const result = await response.json();

      if (result.status === 200) {
        setVoteCount(result.data.voteCount);
        setUserVote(isUpvote);
      }
    } catch (error) {
      console.log(error);
      console.error("Error voting:", error);
      toast({
        title: "Error",
        description: "Failed to submit vote",
        variant: "destructive",
      });
    }
  };

  const TierList = (tier) => {
    if (!tier?.items || tier.items.length === 0) return null;

    return (
      <div className="flex h-[100px] mt-6">
        <div
          className="w-[100px] text-center h-[100px] leading-[100px] rounded-tl-sm rounded-bl-sm"
          style={{ backgroundColor: tier.color }}
        >
          {tier.name}
        </div>
        <div className="w-[calc(100%-100px)] h-[100px] flex overflow-scroll no-scrollbar bg-[#242424] rounded-tr-sm rounded-br-sm">
          {tier.items.map((item, index) => {
            const selectedNeftie = nefties.find(
              (neftie) => neftie.id === item.neftieId
            );
            const neftieImageUrl = selectedNeftie?.image;

            return (
              <Link href={`/neftie/${selectedNeftie?.slug}`} key={index}>
                <div className="flex gap-2 items-center h-full flex-col px-6 p-3 rounded-full">
                  <div
                    style={{
                      backgroundImage: `url('/images/nefties/${selectedNeftie?.slug}.png`,
                    }}
                    className="rounded-full w-[70px] h-[70px] bg-center bg-cover"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  function getHtmlFromLexicalNode(node: {
    type: string;
    children?: Array<{ type: string; text?: string; tag?: string }>;
  }): string {
    let result = "";
    const { children } = node;
    if (children) {
      if (children.length === 0) {
        return result;
      }
      children.forEach((child) => {
        const { type, format } = child;

        if (type === "paragraph") {
          result += `<p class="my-1">${getHtmlFromLexicalNode(child)}</p>`;
        } else if (type === "heading") {
          const tag = child.tag ?? "h1";
          result += `<${tag}>${getHtmlFromLexicalNode(child)}</${tag}>`;
        } else if (type === "text" && format !== 1) {
          result += `<span>${child.text}</span>`;
        } else if (type === "text" && format === 1) {
          result += `<strong>${child.text}</strong>`;
        } else {
          result += `<br />`;
        }
      });
    }
    return result;
  }

  return (
    <div>
      <div className="text-left pt-10 text-xl font-semibold mx-auto flex justify-between">
        <div className="flex gap-4">
          <img
            src={
              data?.User?.picture
                ? data?.User?.picture
                : "/images/logo-black.png"
            }
            className="max-w-[100px] max-h-[100px] object-cover rounded-sm"
          />
          <div>
            <div className="text-[28px]">{data?.title}</div>
            <div className="text-[12px] mt-0 font-thin font-inter flex items-center gap-1 text-[#bdbdbd]">
              by:
              <span className="text-red font-semibold">
                {data?.User.username}
              </span>
              <div className="text-[12px] mt-0 font-thin font-inter flex items-center gap-1">
                posted at:{" "}
                <span className="text-red font-semibold">
                  {format(data?.createdAt, "dd MMM yyy")}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-xs mt-1 font-thin font-inter">
                <span className="text-xs flex items-center gap-2 font-semibold">
                  <EyeIcon className="max-w-[16px]" />
                  {data?.viewCount}
                </span>
              </div>
              <div className="text-xs mt-1 font-thin font-inter">
                <span className="text-xs flex items-center gap-2 font-semibold">
                  <VoteIcon className="max-w-[16px]" />
                  {data?.voteCount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="votes bg-white/10 p-4 rounded-md">
            <div className="flex justify-between items-center gap-2">
              <div
                className={`px-1 rounded-sm ${
                  userVote === false ? "bg-red-500" : "bg-[#ff8282]"
                } cursor-pointer transition-colors hover:bg-red-500`}
                onClick={() => handleVote(false)}
              >
                <Minus className="w-[20px] text-black font-bold rounded-sm" />
              </div>
              <div className="text-xs">
                {voteCount} <span className="text-[10px]">VOTES</span>
              </div>
              <div
                className={`px-1 rounded-sm ${
                  userVote === true ? "bg-green-500" : "bg-[#73f892]"
                } cursor-pointer transition-colors hover:bg-green-500`}
                onClick={() => handleVote(true)}
              >
                <Plus className="w-[20px] text-black font-bold rounded-sm" />
              </div>
            </div>
          </div>
          <div className="p-1 text-xs">PATCH: {CURRENT_PATCH_VERSION}</div>
        </div>
      </div>
      <div className="w-full p-2 bg-white/5 mt-4 rounded-md">
        <span className="font-inter text-[15px] font-thin">DESCRIPTION:</span>{" "}
        {data?.description}
      </div>
      {data.tiers.map((tier) => (
        <TierList key={tier.id} {...tier} />
      ))}
      <div className="mt-8">
        {/* <div className="bg-white/10 p-2 rounded-md font-inter flex gap-4 items-center">
          <span className="mr-4 text-sm font-semibold">SORT:</span>
          <div className="flex gap-8 relative">
            <div
              className={`cursor-pointer relative ${
                selected === "DATE" ? "text-white font-bold" : "text-gray-400"
              } hover:text-white transition-colors`}
              onClick={() => setSelected("DATE")}
              onMouseEnter={() => setHovered("DATE")}
              onMouseLeave={() => setHovered(null)}
            >
              DATE
            </div>
            <div
              className={`cursor-pointer relative ${
                selected === "POPULARITY"
                  ? "text-white font-bold"
                  : "text-gray-400"
              } hover:text-white transition-colors`}
              onClick={() => setSelected("POPULARITY")}
              onMouseEnter={() => setHovered("POPULARITY")}
              onMouseLeave={() => setHovered(null)}
            >
              POPULARITY
            </div>
   
            <div
              className="absolute bottom-0 h-[2px] w-[20px] bg-white transition-all duration-300 ease-in-out"
              style={{
                transform: `translateX(${(hovered || selected) === "DATE" ? "50%" : "110px"})`,
              }}
            />
          </div>
        </div> */}

        {/* Comments */}
        <div className="comments-area">
          <div className="new-comment my-4">
            <Editor
              editorState={comment}
              updateEditorState={setComment}
              onSendClick={sendComment}
            />
          </div>
          {initialComments && initialComments.length > 0
            ? initialComments.map((comment) => {
                const commentContent = getHtmlFromLexicalNode(
                  JSON.parse(comment.content).root
                );
                return (
                  <div
                    className="comment bg-white/10 w-full rounded-md flex items-center gap-4 my-4 px-2"
                    key={comment.id}
                  >
                    {/* <div className="votes flex flex-col items-center flex-none max-w-[40px] py-2 gap-0 pl-2">
                    <ChevronUp />
                    <span className="text-xs text-gray-400">0</span>
                    <ChevronDown />
                  </div> */}
                    <div className="flex flex-col">
                      <div className="flex py-2 items-center gap-2 text-gray-400">
                        <img
                          src={
                            "https://cdn.discordapp.com/avatars/893148670378270720/331402df89491abb17960dce8264321a.png"
                          }
                          className="max-w-[20px] max-h-[20px] rounded-sm"
                        />
                        <span className="font-dosis font-semibold text-xs text-gray-300">
                          {comment?.User?.username}
                        </span>
                        <span className="font-inter text-xs">
                          |{" "}
                          {format(comment.createdAt, "dd MMMM yyyy, HH:mm aa")}
                        </span>
                      </div>
                      <div
                        className="text-xs font-inter mt-1 mb-2 text-gray-400"
                        dangerouslySetInnerHTML={{ __html: commentContent }}
                      ></div>
                    </div>
                  </div>
                );
              })
            : <div className="text-center font-inter text-gray-400">No comment for this tier list yet... :(</div>}
        </div>
      </div>
    </div>
  );
};

export default SingleTierList;
