import { useState } from "react";
import { updateLostPetStatus } from "../services/lostPetService";
import {
  // Make sure these functions do NOT call MySwal.close() internally.
  showSubmittingSwal,
  showSuccessSwal,
  showErrorSwal,
} from "../components/ListAPet/Swalloader";

/**
 * Custom hook to manage lostStatus updates for a "Lost Pet" post,
 * with SweetAlert feedback (Submitting -> Success or Error).
 */
const useLostPetStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * changeLostStatus updates the status of a lost pet post.
   * No calls to MySwal.close(), so we don't risk undefined references.
   */
  const changeLostStatus = async (postId, newStatus) => {
    try {
      setLoading(true);
      setError(null);

      // 1) Show "Submitting Request..." SweetAlert
      showSubmittingSwal(); // Should remain open until user closes or overwritten by another alert

      // 2) Update Firestore
      await updateLostPetStatus(postId, newStatus);

      // 3) Show success alert (replaces the loading alert)
      showSuccessSwal("Lost pet status updated successfully!");
      // The user manually closes the success alert.
    } catch (err) {
      // Replace loading alert with error alert
      showErrorSwal("Error updating lost pet status. Please try again later.");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    changeLostStatus,
  };
};

export default useLostPetStatus;
