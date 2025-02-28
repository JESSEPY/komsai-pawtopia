import React from "react";
import { useUserComments } from "../../../../hooks/useUserComments";
import { useUserProfile } from "../../../../hooks/userProfile";
import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";

const Comment = () => {
  const { comments, replies, isLoading, isError } = useUserComments();
  const { userProfile, isLoading: isProfileLoading } = useUserProfile();

  console.log("Replies", replies);
  console.log("Comments", comments);

  if (isProfileLoading) {
    return <p className="text-center text-gray-500">Loading user profile...</p>;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <CommentSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Error fetching comments.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {comments.length === 0 ? (
        <p className="text-gray-600">No comments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {comments.map((comment) => (
            <CommentCard
              key={comment.commentId}
              author={comment.author}
              authorImg={comment.authorImg}
              text={comment.text}
              createdAt={comment.createdAt}
              userName={userProfile?.userName}
              isVerified={userProfile?.isVerified}
              replies={replies.filter(
                (reply) => reply.parentCommentId === comment.commentId
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
