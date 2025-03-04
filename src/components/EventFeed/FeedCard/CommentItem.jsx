import React, { useState, useEffect, Fragment } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import {
  toggleLikeComment,
  deleteComment,
  deleteReply,
} from "../../../services/commentService";
import { auth } from "../../../../firebase"; // Firebase Auth
import { Menu, Transition } from "@headlessui/react";
import { useUser } from "../../../hooks/useUser";
import ReplyItem from "./ReplyItem";

const CommentItem = ({ comment, postId, handleReply }) => {
  const currentUser = auth.currentUser;
  const likedBy = comment.likedBy || [];
  const [showReplies, setShowReplies] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes || 0);

  // Fetch user data for the comment author
  const { userData } = useUser(comment.userId);
  const profileImg = userData?.profileImg || "https://i.pravatar.cc/40";

  // Store reply likes as an object
  const [replyLikes, setReplyLikes] = useState(
    comment.replies?.reduce((acc, reply) => {
      acc[reply.id] = {
        hasLiked: reply.likedBy?.includes(currentUser?.uid) || false,
        likeCount: reply.likes || 0,
      };
      return acc;
    }, {})
  );

  useEffect(() => {
    if (currentUser) {
      setHasLiked(likedBy.includes(currentUser.uid));
    }
  }, [likedBy, currentUser]);

  const handleLike = async () => {
    setHasLiked(!hasLiked);
    setLikeCount((prev) => (hasLiked ? prev - 1 : prev + 1));
    await toggleLikeComment(postId, comment.id);
  };

  // Function to like/unlike a reply
  const handleReplyLike = async (replyId) => {
    setReplyLikes((prev) => ({
      ...prev,
      [replyId]: {
        hasLiked: !prev[replyId].hasLiked,
        likeCount: prev[replyId].hasLiked
          ? prev[replyId].likeCount - 1
          : prev[replyId].likeCount + 1,
      },
    }));

    await toggleLikeComment(postId, comment.id, replyId);
  };

  const handleDelete = async () => {
    try {
      await deleteComment(postId, comment.id);
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      await deleteReply(postId, comment.id, replyId);
    } catch (error) {
      console.error("Failed to delete reply", error);
    }
  };

  const timeAgo = comment.createdAt
    ? formatDistanceToNow(
        comment.createdAt.toDate ? comment.createdAt.toDate() : new Date()
      )
    : "Just now";

  return (
    <div className="mb-4">
      {/* Main Comment */}
      <div className="flex items-start gap-3">
        <img
          src={profileImg}
          alt={comment.author}
          className="w-8 h-8 rounded-full object-cover"
        />

        <div className="w-full">
          <div className="bg-gray-100 p-3 rounded-lg w-fit">
            <p className="font-semibold text-sm">{comment.author}</p>
            <p className="text-sm text-gray-800">{comment.text}</p>
          </div>

          <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
            <span>{timeAgo} ago</span>
            <span>{likeCount} likes</span>
            <button
              onClick={() => handleReply(comment)}
              className="text-blue-500 font-medium"
            >
              Reply
            </button>
            <button onClick={handleLike}>
              {hasLiked ? (
                <HeartSolid className="w-4 h-4 text-altTagColor" />
              ) : (
                <HeartOutline className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              )}
            </button>
            {currentUser && comment.userId === currentUser.uid && (
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="p-1">
                    <EllipsisHorizontalIcon className="w-4 h-4 text-gray-800 hover:text-gray-900" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleDelete}
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } group flex w-full items-center px-2 py-2 text-xs`}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>

          {/* "View Replies" Button */}
          {comment.replies?.length > 0 && !showReplies && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-10 border-t border-gray-400"></div>
              <button
                onClick={() => setShowReplies(true)}
                className="text-xs text-gray-600 hover:underline"
              >
                View replies ({comment.replies.length})
              </button>
            </div>
          )}

          {/* Replies Section */}
          {showReplies && (
            <>
              {comment.replies.map((reply) => (
                <ReplyItem
                  key={reply.id}
                  reply={reply}
                  postId={postId}
                  handleReplyLike={handleReplyLike}
                  handleDeleteReply={handleDeleteReply}
                  replyLikes={replyLikes}
                />
              ))}
              {/* "Hide Replies" Button */}
              <div className="flex items-center gap-2 mt-2">
                <div className="w-10 border-t border-gray-400"></div>
                <button
                  onClick={() => setShowReplies(false)}
                  className="text-xs text-gray-600 hover:underline"
                >
                  Hide replies
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
