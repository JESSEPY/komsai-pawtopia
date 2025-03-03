import { useEffect } from "react";
import useSWR from "swr";
import {
  fetchAdoptedPetsForAdopter,
  fetchAdoptedPetsByUid,
  subscribeAdoptedPetsForAdopter,
  subscribeAdoptedPetsByUid,
} from "../services/getAdoptedPetsService";

import { auth } from "../../firebase";

/**
 * Custom Hook: Fetch adopted pets for the currently logged-in user.
 * @returns {Object} { data, error, isLoading }
 */
export const useAdoptedPets = () => {
  const user = auth.currentUser; // Get the authenticated user

  const { data, error, isLoading, mutate } = useSWR(
    user ? `adoptedPets-${user.uid}` : null, // Only fetch if user is logged in
    () => fetchAdoptedPetsByUid(user.uid),
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    if (!user) return; // If no user, don't subscribe

    const unsubscribe = subscribeAdoptedPetsByUid(
      user.uid,
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
  }, [user, mutate]);

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
