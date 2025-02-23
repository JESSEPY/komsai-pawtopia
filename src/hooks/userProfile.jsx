import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserProfile } from "../services/userService"; // ✅ Keep `getUserProfile`

export const useUserProfile = () => {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null; // Restore from localStorage
  });
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  // 1️⃣ Listen for auth state changes
  useEffect(() => {
    console.log("📡 Listening for auth state changes...");
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ User logged in:", user.uid);
        setUserId(user.uid);
        localStorage.setItem("userId", user.uid); // Persist userId
      } else {
        console.warn("❌ No authenticated user detected.");
        setUserId(null);
        localStorage.removeItem("userId");
      }
    });

    return () => unsubscribeAuth();
  }, [auth]);

  // 2️⃣ Use localStorage as a quick fallback before fetching from Firestore
  useEffect(() => {
    if (!userId) {
      setUserProfile(null);
      setIsLoading(false);
      return;
    }

    const cachedProfile = localStorage.getItem(`userProfile-${userId}`);
    if (cachedProfile) {
      setUserProfile(JSON.parse(cachedProfile));
      setIsLoading(false);
    }
  }, [userId]);

  // 3️⃣ Subscribe to real-time Firestore updates when `userId` changes
  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);

    // ✅ Subscribe to Firestore updates using `getUserProfile`
    const unsubscribeProfile = getUserProfile(userId, (profile) => {
      if (!profile) {
        setError("Profile not found.");
        setUserProfile(null);
      } else {
        setUserProfile(profile);
        localStorage.setItem(`userProfile-${userId}`, JSON.stringify(profile)); // Cache profile
      }
      setIsLoading(false);
    });

    // ✅ Unsubscribe when `userId` changes or component unmounts
    return () => {
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, [userId]);

  return {
    userId,
    userProfile,
    isLoading,
    error,
  };
};
