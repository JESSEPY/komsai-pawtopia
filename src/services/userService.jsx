import { db, auth } from "../../firebase"; // ✅ Import Firebase instance
import { doc, onSnapshot } from "firebase/firestore";

/**
 * Subscribe to real-time Firestore updates for the authenticated user's profile.
 * @param {string} uid - The UID of the user.
 * @param {function} [callback] - Optional function to receive profile updates.
 * @returns {function} - Unsubscribe function to stop listening.
 */
export const getUserProfile = (uid, callback) => {
  if (!uid) {
    console.error("❌ getUserProfile called without a valid UID!");
    return () => {}; // Return empty function to prevent crashes
  }

  if (callback && typeof callback !== "function") {
    console.error("❌ getUserProfile called with an invalid callback!");
    return () => {}; // Return empty function to prevent errors
  }

  const userRef = doc(db, "users", uid);

  // Start real-time listener
  const unsubscribe = onSnapshot(
    userRef,
    (snapshot) => {
      if (!callback) return; // If no callback, just ignore updates

      if (snapshot.exists()) {
        const data = snapshot.data() || {};
        const {
          userName = "Unknown User",
          profileImg = "https://pawtopia.scarlet2.io/images/image.png",
          email = auth.currentUser?.email || "No Email",
          coverImage = "https://res.cloudinary.com/dukzrb2xm/image/upload/v1739884116/post_photos/y5nyovyeraqnwni7izz7.jpg?t=1739884117140",
          isVerified = false,
          adoptablesCount = 0,
          successfulAdoptionCount = 0,
          profileDescription = "",
          role,
        } = data;

        // ✅ Ensure callback is valid before calling it
        callback({
          uid,
          userName,
          profileImg,
          email,
          coverImage,
          isVerified,
          adoptablesCount,
          successfulAdoptionCount,
          profileDescription,
          role,
        });
      } else {
        console.warn("⚠️ Firestore user profile not found for UID:", uid);
        callback(null);
      }
    },
    (error) => {
      console.error("🔥 Error in getUserProfile:", error);
      if (callback) callback(null);
    }
  );

  return unsubscribe;
};
