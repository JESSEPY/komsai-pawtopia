import useSWR from "swr";
import { useEffect, useState } from "react";
import {
  getUserLikedPosts,
  getUserLikedPostsById,
  toggleLikePost,
} from "../services/getUserLikedPosts";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

/**
 * SWR Hook to fetch liked posts for the currently authenticated user.
 */
export const useUserLikedPosts = () => {
  const {
    data: cachedLikedPosts,
    error,
    mutate,
  } = useSWR("userLikedPosts", getUserLikedPosts, {
    dedupingInterval: 5 * 60 * 1000,
  });

  const [likedPosts, setLikedPosts] = useState(cachedLikedPosts || []);

  useEffect(() => {
    if (!auth.currentUser) return;

    const postsRef = collection(db, "posts");
    const postsQuery = query(
      postsRef,
      where("likedBy", "array-contains", auth.currentUser?.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLikedPosts(updatedPosts);
      mutate(updatedPosts, false);
    });

    return () => unsubscribe();
  }, [mutate]);

  useEffect(() => {
    if (cachedLikedPosts) {
      setLikedPosts(cachedLikedPosts);
    }
  }, [cachedLikedPosts]);

  return {
    likedPosts,
    loadingLikedPosts: !cachedLikedPosts && !error,
    errorLikedPosts: error,
  };
};

/**
 * ✅ NEW: SWR Hook to fetch liked posts for a specific user by userId.
 */
export const useUserLikedPostsById = (userId) => {
  const {
    data: cachedLikedPosts,
    error,
    mutate,
  } = useSWR(
    userId ? `userLikedPosts-${userId}` : null,
    () => getUserLikedPostsById(userId),
    { dedupingInterval: 5 * 60 * 1000 }
  );

  const [likedPosts, setLikedPosts] = useState(cachedLikedPosts || []);

  useEffect(() => {
    if (!userId) return;

    const postsRef = collection(db, "posts");
    const postsQuery = query(
      postsRef,
      where("likedBy", "array-contains", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLikedPosts(updatedPosts);
      mutate(updatedPosts, false);
    });

    return () => unsubscribe();
  }, [userId, mutate]);

  useEffect(() => {
    if (cachedLikedPosts) {
      setLikedPosts(cachedLikedPosts);
    }
  }, [cachedLikedPosts]);

  return {
    likedPosts,
    loadingLikedPosts: !cachedLikedPosts && !error,
    errorLikedPosts: error,
  };
};
