import { useState, useEffect } from "react";
import { subscribeToComments } from "../services/commentService";

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const unsubscribe = subscribeToComments(postId, (newComments) => {
      setComments(newComments);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  return { comments, setComments, loading };
};
