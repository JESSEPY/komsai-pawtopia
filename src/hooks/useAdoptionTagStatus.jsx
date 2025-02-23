import { useState, useEffect } from "react";
import { listenToAdoptionStatus } from "../services/adoptionService";

/**
 * Custom hook to listen for real-time adoption request status updates.
 * @param {string} postId - The ID of the post.
 * @param {string} requestId - The ID of the adoption request.
 * @returns {string} The current adoption request status.
 */
const useAdoptionTagStatus = (postId, requestId) => {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    if (!postId || !requestId) return;

    // Start listening to Firestore updates
    const unsubscribe = listenToAdoptionStatus(postId, requestId, setStatus);

    // Cleanup the listener on unmount
    return () => unsubscribe && unsubscribe();
  }, [postId, requestId]);

  return status;
};

export default useAdoptionTagStatus;
