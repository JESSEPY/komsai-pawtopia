import { useEffect } from "react";
import useSWR from "swr";
import {
  fetchAdoptedPetsForAdopter,
  fetchAdoptedPetsByUid,
  subscribeAdoptedPetsForAdopter,
  subscribeAdoptedPetsByUid,
} from "../services/getAdoptedPetsService";

/**
 * Custom Hook: Fetch adopted pets using SWR and subscribe for realtime updates for the logged-in user.
 * @returns {Object} { data, error, isLoading }
 */
export const useAdoptedPets = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "adoptedPets",
    fetchAdoptedPetsForAdopter,
    {
      refreshInterval: 60000, // fallback refresh every 60 seconds
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    const unsubscribe = subscribeAdoptedPetsForAdopter(
      (pets) => {
        // Update the SWR cache with realtime data
        mutate(pets, false);
      },
      (err) => {
        console.error("Realtime subscription error:", err);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [mutate]);

  return {
    data,
    error,
    isLoading,
  };
};

/**
 * Custom Hook: Fetch adopted pets by a specific adopter UID using SWR and realtime subscription.
 * @param {string} adopterUid - The UID of the adopter.
 * @returns {Object} { data, error, isLoading }
 */
export const useAdoptedPetsById = (adopterUid) => {
  const { data, error, isLoading, mutate } = useSWR(
    adopterUid ? `adoptedPets-${adopterUid}` : null,
    () => fetchAdoptedPetsByUid(adopterUid),
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    if (!adopterUid) return;

    const unsubscribe = subscribeAdoptedPetsByUid(
      adopterUid,
      (pets) => {
        mutate(pets, false);
      },
      (err) => {
        console.error("Realtime subscription error:", err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [adopterUid, mutate]);

  return {
    data,
    error,
    isLoading,
  };
};
