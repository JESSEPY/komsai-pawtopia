import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CommentItem from "./CommentItem";
import { useComments } from "../../../hooks/useComments";
import { addComment, addReply } from "../../../services/commentService";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import InlineImage from "../../Media/InlineImage";
import InlineVideo from "../../Media/InlineVideo";

const CommentModal = ({
  isOpen,
  onClose,
  postMedia,
  profileImg,
  username,
  postId,
}) => {
  const [inputText, setInputText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const { comments, loading } = useComments(postId);
  const inputRef = useRef(null);

  const handlePost = async () => {
    if (!inputText.trim()) return;

    if (replyingTo) {
      await addReply(postId, replyingTo.id, inputText.trim());
      setReplyingTo(null);
    } else {
      await addComment(postId, inputText.trim());
    }

    setInputText("");
  };

  const handleReply = (comment) => {
    setReplyingTo(comment);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex justify-center items-center"
        onClose={onClose}
      >
        <TransitionChild
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        </TransitionChild>

        <TransitionChild
          enter="transition-transform duration-300"
          enterFrom="scale-90 opacity-0"
          enterTo="scale-100 opacity-100"
        >
          <div className="bg-white rounded-lg shadow-lg w-full min-h-[80vh] max-w-5xl flex z-50 relative">
            {/* Left: Post Media */}
            <div className="w-[60%]  rounded-tl-lg rounded-bl-lg bg-black flex items-center justify-center overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="w-full"
              >
                {postMedia.map((media, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center"
                  >
                    {media.match(/\.(mp4|webm|ogg)$/i) ? (
                      <InlineVideo
                        media={media}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <InlineImage
                        media={media}
                        className="max-w-full max-h-full object-contain"
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Right: Comments Section */}
            <div className="w-[40%] flex flex-col justify-between">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={profileImg}
                    alt={username}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <p className="text-sm font-semibold">{username}</p>
                </div>
                <button onClick={onClose}>
                  <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-800" />
                </button>
              </div>

              {/* Comments List (Fixed Height & Scrollable) */}
              <div className="h-[calc(75vh-5px)] overflow-y-auto p-4">
                {loading ? (
                  <p className="text-gray-500 text-sm">Loading comments...</p>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      postId={postId}
                      handleReply={handleReply}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No comments yet.</p>
                )}
              </div>

              {/* Add Comment / Reply Input */}
              <div className="p-3 border-t bg-white sticky bottom-0">
                <div className="flex items-center">
                  <input
                    type="text"
                    ref={inputRef}
                    className="w-full border rounded-full px-3 py-2 text-sm outline-none"
                    placeholder={
                      replyingTo
                        ? `Replying to @${replyingTo.author}...`
                        : "Add a comment..."
                    }
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button
                    onClick={handlePost}
                    className="ml-2 px-4 py-2 bg-altTagColor text-white text-sm rounded-full transition hover:scale-105"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default CommentModal;
