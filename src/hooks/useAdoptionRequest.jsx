import { useState } from "react";
import { sendAdoptionRequest } from "../services/adoptionRequestService";
import { useUserProfile } from "./userProfile";
import Swal from "sweetalert2";
import {
  showSubmittingSwal,
  showSuccessSwal,
  showErrorSwal,
} from "../components/ListAPet/Swalloader";

const useAdoptionRequest = () => {
  const { userProfile, isLoading: userLoading, userId } = useUserProfile();
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const requestAdoption = async (postId, shelterId) => {
    if (hasSubmitted) {
      showErrorSwal(
        "You have already submitted an adoption request for this pet."
      );
      return;
    }

    if (!userId || !userProfile) {
      showErrorSwal("You need to be logged in to adopt a pet.");
      return;
    }

    if (!shelterId) {
      showErrorSwal("An error occurred: Missing shelter ID. Please try again.");
      return;
    }

    setLoading(true);
    showSubmittingSwal();

    try {
      const result = await sendAdoptionRequest(
        postId,
        userId,
        userProfile.email,
        userProfile.userName || "Unknown Adopter",
        shelterId
      );

      if (result.success) {
        setHasSubmitted(true); // Mark as submitted
        Swal.close();
        showSuccessSwal(
          "Your adoption request has been submitted successfully!"
        );
      } else {
        Swal.close();
        showErrorSwal(result.message);
      }
    } catch (error) {
      Swal.close();
      showErrorSwal("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { requestAdoption, loading: loading || userLoading };
};

export default useAdoptionRequest;
