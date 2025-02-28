import React from "react";
import { useUser } from "../../../../hooks/useUser"; // Use useUser hook
import { formatTime } from "../../../../utils/formatTime";

const ReplyItem = ({ reply }) => {
  // Fetch user data for the reply author
  const { userData: replyAuthorData } = useUser(reply.userId);
  const replyProfileImg =
    replyAuthorData?.profileImg || "https://i.pravatar.cc/40";

  return (
    <div key={reply.replyId} className="mb-2 flex gap-2">
      <img
        src={replyProfileImg}
        alt={`${reply.author}'s profile`}
        className="h-6 w-6 rounded-full object-cover"
      />
      <div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold">{reply.author}</span>
          <span className="text-xs text-gray-400">
            {formatTime(reply.createdAt)}
          </span>
        </div>
        <p className="text-xs text-gray-700">{reply.text}</p>
      </div>
    </div>
  );
};

export default ReplyItem;
