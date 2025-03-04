import React from "react";
import { useUser } from "../../../hooks/useUser";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { auth } from "../../../../firebase";

const ReplyItem = ({
  reply,
  postId,
  handleReplyLike,
  handleDeleteReply,
  replyLikes,
}) => {
  const currentUser = auth.currentUser;

  // Fetch user data for reply author
  const { userData: replyAuthorData } = useUser(reply.userId);
  const replyAuthorImg =
    replyAuthorData?.profileImg || "https://i.pravatar.cc/40";

  return (
    <div key={reply.id} className="ml-10 mt-2 flex items-start gap-3 relative">
      <img
        src={replyAuthorImg}
        alt={reply.author}
        className="w-6 h-6 rounded-full object-cover"
      />

      <div className="bg-gray-100 p-2 rounded-lg w-fit">
        <p className="font-semibold text-xs">@{reply.author}</p>
        <p className="text-xs text-gray-800">{reply.text}</p>

        {/* Like button for replies */}
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <button onClick={() => handleReplyLike(reply.id)}>
            {replyLikes[reply.id]?.hasLiked ? (
              <HeartSolid className="w-4 h-4 text-altTagColor" />
            ) : (
              <HeartOutline className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            )}
          </button>
          <span className="ml-2">{replyLikes[reply.id]?.likeCount} likes</span>
        </div>
      </div>

      {currentUser && reply.userId === currentUser.uid && (
        <Menu as="div" className="absolute top-0 right-0">
          <div>
            <Menu.Button className="p-1">
              <EllipsisHorizontalIcon className="w-4 h-4 text-gray-800 hover:text-gray-900" />
            </Menu.Button>
          </div>
          <Transition
            as={React.Fragment}
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
                      onClick={() => handleDeleteReply(reply.id)}
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } group flex w-full items-center px-2 py-2 text-xs`}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } group flex w-full items-center px-2 py-2 text-xs`}
                    >
                      Cancel
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
};

export default ReplyItem;
