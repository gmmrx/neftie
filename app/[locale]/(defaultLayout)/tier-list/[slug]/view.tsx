"use client";

import { Editor } from "@/components/editor";
import { toast } from "@/components/ui/use-toast";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { useNefties } from "@/providers/NeftiesProvider";
import { format } from "date-fns";
import { EyeIcon, Minus, Plus, VoteIcon } from "lucide-react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Comment component to handle client-side rendering
const CommentItem = ({ comment }) => {
  const [commentHtml, setCommentHtml] = useState("");

  useEffect(() => {
    // Parse the comment on the client side to avoid hydration mismatch
    try {
      const parsedContent = parseSlateComment(comment.content);
      setCommentHtml(parsedContent);
    } catch (error) {
      console.error("Error parsing comment:", error);
      setCommentHtml("<p>Error displaying comment</p>");
    }
  }, [comment.content]);

  // Use optional chaining and nullish coalescing for safer property access
  const username = comment?.User?.username ?? "Anonymous";
  const userPicture =
    comment?.User?.picture ??
    "https://cdn.discordapp.com/avatars/893148670378270720/331402df89491abb17960dce8264321a.png";

  // Safely parse date
  const commentDate = comment?.createdAt
    ? new Date(comment.createdAt)
    : new Date();

  return (
    <div className="comment bg-white/10 w-full rounded-md flex items-center gap-4 my-4 px-2">
      <div className="flex flex-col">
        <div className="flex py-2 items-center gap-2 text-gray-400">
          <img
            src={userPicture}
            className="max-w-[20px] max-h-[20px] rounded-sm"
            alt="User avatar"
          />
          <span className="font-dosis font-semibold text-xs text-gray-300">
            {username}
          </span>
          <span className="font-inter text-xs">
            | {format(commentDate, "dd MMMM yyyy, HH:mm aa")}
          </span>
        </div>
        {/* Only render HTML after client-side parsing */}
        {commentHtml ? (
          <div
            className="text-xs font-inter mt-1 mb-2 text-gray-400"
            dangerouslySetInnerHTML={{ __html: commentHtml }}
          />
        ) : (
          <div className="text-xs font-inter mt-1 mb-2 text-gray-400">
            Loading comment...
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Converts Slate editor content to HTML
 */
function getHtmlFromSlateNodes(nodes) {
  if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
    return "";
  }

  return nodes
    .map((node) => {
      // Handle different node types
      if (node.type === "paragraph") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<p class="my-1">${children}</p>`;
      } else if (node.type === "heading-one") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<h1>${children}</h1>`;
      } else if (node.type === "heading-two") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<h2>${children}</h2>`;
      } else if (node.type === "heading-three") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<h3>${children}</h3>`;
      } else if (node.type === "bulleted-list") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<ul>${children}</ul>`;
      } else if (node.type === "numbered-list") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<ol>${children}</ol>`;
      } else if (node.type === "list-item") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<li>${children}</li>`;
      } else if (node.type === "link") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<a href="${node.url || "#"}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
      // Text node (leaf)
      else if (!node.type && node.text !== undefined) {
        let text = node.text || ""; // Ensure text is not undefined

        // Apply text formatting - ensure order of nesting is consistent
        if (node.bold) {
          text = `<strong>${text}</strong>`;
        }
        if (node.italic) {
          text = `<em>${text}</em>`;
        }
        if (node.underline) {
          text = `<u>${text}</u>`;
        }
        if (node.code) {
          text = `<code>${text}</code>`;
        }
        if (node.strikethrough) {
          text = `<del>${text}</del>`;
        }

        return text;
      }
      // Default fallback for other node types
      else if (node.children) {
        return getHtmlFromSlateNodes(node.children);
      }

      return "";
    })
    .join("");
}

/**
 * Parse a Slate comment and return HTML
 */
function parseSlateComment(content) {
  if (!content) {
    return "<p>No content</p>";
  }

  try {
    // Parse the JSON string to get the Slate document
    const slateDocument = JSON.parse(content);

    // Check if we have valid content
    if (!slateDocument || !Array.isArray(slateDocument)) {
      return "<p>Invalid comment content</p>";
    }

    // Convert Slate nodes to HTML
    return getHtmlFromSlateNodes(slateDocument);
  } catch (error) {
    console.error("Error parsing Slate comment:", error);
    return "<p>Error parsing comment</p>";
  }
}

const SingleTierList = ({ data, initialComments }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { nefties } = useNefties();
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [voteCount, setVoteCount] = useState(data?.voteCount || 0);
  const [userVote, setUserVote] = useState(null);
  const [voting, setVoting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Use this to ensure we're only rendering complex components on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendComment = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please login to comment.",
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

  const handleVote = async (isUpvote) => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please login to vote",
        variant: "destructive",
      });
      return;
    }

    try {
      setVoting(true);
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
      console.error("Error voting:", error);
      toast({
        title: "Error",
        description: "Failed to submit vote",
        variant: "destructive",
      });
    } finally {
      setVoting(false);
    }
  };

  const TierList = (tier) => {
    if (!tier?.items || tier.items.length === 0) return null;

    // Safety checks for tier properties
    const tierName = tier.name || "";
    const tierColor = tier.color || "#888888";
    const tierItems = tier.items || [];

    return (
      <div className="flex h-[100px] mt-6">
        <div
          className="w-[100px] text-center h-[100px] leading-[100px] rounded-tl-sm rounded-bl-sm"
          style={{ backgroundColor: tierColor }}
        >
          {tierName}
        </div>
        <div className="w-[calc(100%-100px)] h-[100px] flex overflow-scroll no-scrollbar bg-[#242424] rounded-tr-sm rounded-br-sm">
          {tierItems.map((item, index) => {
            const selectedNeftie =
              nefties?.find((neftie) => neftie.id === item.neftieId) || {};

            return (
              <Link href={`/neftie/${selectedNeftie?.slug || ""}`} key={index}>
                <div className="flex gap-2 items-center h-full flex-col px-6 p-3 rounded-full">
                  <div
                    style={{
                      backgroundImage: `url('/images/nefties/${selectedNeftie?.slug || "default"}.png`,
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

  // Safely handle data properties
  const title = data?.title || "Tier List";
  const description = data?.description || "";
  const userPicture = data?.User?.picture || "/images/logo-black.png";
  const username = data?.User?.username || "Anonymous";
  const createdAt = data?.createdAt ? new Date(data.createdAt) : new Date();
  const viewCount = data?.viewCount || 0;
  const tiers = data?.tiers || [];

  return (
    <div>
      <div className="text-left pt-10 text-xl font-semibold mx-auto flex justify-between flex-col lg:flex-row">
        <div className="flex gap-4">
          <img
            src={userPicture}
            className="max-w-[100px] max-h-[100px] object-cover rounded-sm"
            alt="User profile"
          />
          <div>
            <div className="text-[28px]">{title}</div>
            <div className="text-[12px] mt-0 font-thin font-inter flex items-center gap-1 text-[#bdbdbd]">
              by:
              <span className="text-red font-semibold">{username}</span>
              <div className="text-[12px] mt-0 font-thin font-inter flex items-center gap-1">
                posted at:{" "}
                <span className="text-red font-semibold">
                  {format(createdAt, "dd MMM yyy")}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-xs mt-1 font-thin font-inter">
                <span className="text-xs flex items-center gap-2 font-semibold">
                  <EyeIcon className="max-w-[16px]" />
                  {viewCount}
                </span>
              </div>
              <div className="text-xs mt-1 font-thin font-inter">
                <span className="text-xs flex items-center gap-2 font-semibold">
                  <VoteIcon className="max-w-[16px]" />
                  {voteCount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 w-full mt-4 lg:w-auto">
          <div className="votes bg-white/10 p-4 rounded-md relative">
            {voting && (
              <div className="absolute bg-black/80 w-full h-full top-0 left-0" />
            )}
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
        {description}
      </div>
      {tiers.map((tier) => (
        <TierList key={tier.id || Math.random()} {...tier} />
      ))}
      <div className="mt-8">
        {/* Comments - only render on client side to avoid Suspense errors */}
        {isClient && (
          <div className="comments-area">
            <div className="new-comment my-4">
              <Editor
                editorState={comment}
                updateEditorState={setComment}
                onSendClick={sendComment}
              />
            </div>
            {initialComments && initialComments.length > 0 ? (
              initialComments.map((comment) => (
                <CommentItem
                  key={comment.id || Math.random()}
                  comment={comment}
                />
              ))
            ) : (
              <div className="text-center font-inter text-gray-400">
                No comment for this tier list yet... :(
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTierList;
