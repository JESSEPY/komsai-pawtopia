import { useState, useEffect } from "react";
import { getAdoptionRequests } from "../services/getAdoptionRequestsService";

const useAdoptionRequests = (postId) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const fetchRequests = async () => {
      setLoading(true);
      const result = await getAdoptionRequests(postId);

      if (result.success) {
        // Log the entire array of requests
        console.log("[useAdoptionRequests] Fetched Requests:", result.requests);

        // Optionally, log only user-related data if present
        result.requests.forEach((request) => {
          console.log("[useAdoptionRequests] Adopter Data:", request.userData);
        });

        setRequests(result.requests);
        setError(null);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    fetchRequests();
  }, [postId]);

  return { requests, loading, error };
};

export default useAdoptionRequests;
