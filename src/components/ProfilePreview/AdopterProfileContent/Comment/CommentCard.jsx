import React, { useState } from "react";
import Verified from "../../../../assets/icons/verifiedPaw.svg";
import { formatTime } from "../../../../utils/formatTime";
import { useUser } from "../../../../hooks/useUser"; // ✅ Use useUser hook to get profileImg
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import ReplyItem from "./ReplyItem"; // Import ReplyItem component

const CommentCard = ({
  author,
  userId,
  text,
  createdAt,
  isVerified,
  replies = [],
}) => {
  const [showReplies, setShowReplies] = useState(false); // Toggle state
  const displayTime = createdAt ? formatTime(createdAt) : "Just now";

  // ✅ Fetch user profile data using useUser
  const { userData } = useUser(userId);
  const profileImg = userData?.profileImg;

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-2 py-2 shadow-sm">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <img
          src={profileImg}
          alt={`${author}'s profile`}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{author}</span>
            {isVerified && (
              <img
                src={Verified}
                alt="Verified Paw"
                className="h-4 w-4"
                title="Verified Account"
              />
            )}
            <span className="text-xs text-gray-400">{displayTime}</span>
          </div>

          {/* Comment Text */}
          <p className="mt-1 text-xs text-gray-800">{text}</p>

          {/* Reply Button */}
          <button className="mt-2 flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ChatBubbleOvalLeftEllipsisIcon className="mr-1 h-5 w-5" />
            Reply
          </button>

          {/* "View Replies" Toggle */}
          {replies.length > 0 && !showReplies && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-10 border-t border-gray-400"></div>
              <button
                onClick={() => setShowReplies(true)}
                className="text-xs text-gray-600 hover:underline"
              >
                View replies ({replies.length})
              </button>
            </div>
          )}

          {/* Replies Section */}
          {showReplies && (
            <>
              <button
                onClick={() => setShowReplies(false)}
                className="text-xs text-gray-600 hover:underline mt-2"
              >
                Hide replies
              </button>

              <div className="mt-3 ml-8 border-l-2 border-gray-200 pl-3">
                {replies.map((reply) => (
                  <ReplyItem key={reply.replyId} reply={reply} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
