import { useState, useEffect } from "react";
import { updateAdoptionStatus } from "../services/adoptionRequestService";
import Swal from "sweetalert2";
import {
  showSubmittingSwal,
  showSuccessSwal,
  showErrorSwal,
} from "../components/ListAPet/Swalloader";
import { listenToAdoptionStatus } from "../services/adoptionService";

const useAdoptionStatus = () => {
  const [loading, setLoading] = useState(false);

  /**
   * changeAdoptionStatus updates the status of an adoption request.
   * If requestId is not provided, the service queries for it using adopterId.
   *
   * @param {string} postId - The pet/post ID.
   * @param {string|null} requestId - The adoption request ID (optional).
   * @param {string} status - The new status.
   * @param {string} adopterId - The adopter's ID (for querying if requestId is missing).
   */
  const changeAdoptionStatus = async (postId, requestId, status, adopterId) => {
    if (!status) {
      showErrorSwal("Please select a status.");
      return;
    }

    setLoading(true);
    showSubmittingSwal();

    try {
      const result = await updateAdoptionStatus(
        postId,
        requestId,
        status,
        adopterId
      );

      if (result.success) {
        showSuccessSwal(result.message);
      } else {
        showErrorSwal(result.message);
      }
    } catch (error) {
      showErrorSwal("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { changeAdoptionStatus, loading };
};

export default useAdoptionStatus;
