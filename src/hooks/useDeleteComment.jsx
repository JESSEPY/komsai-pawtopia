import { useState } from "react";
import {
  deleteCommentFromFirestore,
  deleteReplyFromFirestore,
} from "../services/commentService";

export const useDeleteComment = () => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (
    postId,
    commentId,
    replyId = null,
    setComments
  ) => {
    try {
      setDeleting(true);

      // Optimistically remove the comment or reply
      setComments(
        (prevComments) =>
          prevComments
            .map((comment) => {
              if (comment.id === commentId) {
                if (replyId) {
                  return {
                    ...comment,
                    replies: comment.replies.filter(
                      (reply) => reply.id !== replyId
                    ),
                  };
                } else {
                  return null;
                }
              }
              return comment;
            })
            .filter(Boolean) // Remove null values
      );

      if (replyId) {
        await deleteReplyFromFirestore(postId, commentId, replyId);
      } else {
        await deleteCommentFromFirestore(postId, commentId);
      }
    } catch (error) {
      console.error("Error deleting comment/reply:", error);
    } finally {
      setDeleting(false);
    }
  };

  return { handleDelete, deleting };
};
