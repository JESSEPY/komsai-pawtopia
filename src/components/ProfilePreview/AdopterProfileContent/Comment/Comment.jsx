import React from "react";
import { useParams } from "react-router-dom"; // Extracts userId from the URL
import { useUserCommentsById } from "../../../../hooks/useUserComments"; // Fetch comments for specific user
import { useUser } from "../../../../hooks/useUser"; // Fetch user profile data
import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";

const CommentPreview = () => {
  const { userId } = useParams(); // ✅ Extract userId from the route
  const { comments, replies, isLoading, isError } = useUserCommentsById(userId); // ✅ Fetch comments by userId
  const { userData, isLoading: isProfileLoading } = useUser(userId); // ✅ Fetch user profile data

  console.log("USer data", userData);

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
              userId={userId}
              key={comment.commentId}
              author={comment.author}
              authorImg={userData?.profileImg} // Use fetched profile image
              text={comment.text}
              createdAt={comment.createdAt}
              userName={userData?.userName} // Use fetched username
              isVerified={userData?.isVerified}
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

export default CommentPreview;
