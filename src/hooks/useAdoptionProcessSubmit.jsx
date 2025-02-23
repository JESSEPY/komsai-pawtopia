// hooks/useAdoptionSubmit.js

import { useState } from "react";
import { submitAdoptionForms } from "../services/adoptionService";

export const useAdoptionSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitAdoption = async (data) => {
    try {
      setLoading(true);
      setError(null);
      await submitAdoptionForms(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { submitAdoption, loading, error };
};
