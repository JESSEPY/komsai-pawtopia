import { useState } from "react";
import { submitShelterForms } from "../services/shelterService";
import {
  showErrorSwal,
  showSuccessSwal,
  showUploadingSwal,
} from "../components/ListAPet/Swalloader";

export const useShelterProcessSubmit = () => {
  const [loading, setLoading] = useState(false);

  const submitShelter = async ({
    personalData,
    legitimacyData,
    animalWelfareCert,
    businessPermit,
  }) => {
    setLoading(true);
    showUploadingSwal();

    try {
      await submitShelterForms({
        personalData,
        legitimacyData,
        animalWelfareCert,
        businessPermit,
      });

      showSuccessSwal("Shelter registration submitted successfully!");
      setLoading(false);
    } catch (error) {
      showErrorSwal("Submission failed: " + error.message);
      setLoading(false);
    }
  };

  return { submitShelter, loading };
};
