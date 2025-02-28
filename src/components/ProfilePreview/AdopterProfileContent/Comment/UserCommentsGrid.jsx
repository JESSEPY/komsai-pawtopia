import React from "react";
import { useUserComments } from "../../../../hooks/useUserComments";
import CommentCard from "./CommentCard";

const UserCommentsGrid = () => {
  const { comments, isLoading, isError } = useUserComments();

  if (isLoading) return <p className="text-center">Loading comments...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error fetching comments.</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Comments</h2>
      {comments.length === 0 ? (
        <p className="text-gray-600">No comments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.commentId}
              author={comment.author}
              authorImg={comment.authorImg}
              text={comment.text}
              timestamp={"Just now"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCommentsGrid;
