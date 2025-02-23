import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, runTransaction, onSnapshot, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getUserFcmToken,
  storeNotification,
} from "../services/notificationService";
import axios from "axios";

const axiosFCM = axios.create({
  baseURL: "https://pawtopia.scarlet2.io",
  headers: { "Content-Type": "application/json" },
});

export const useLikePost = (postId) => {
  const [likeCount, setLikeCount] = useState(0);
  const [likedBy, setLikedBy] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(""); // Store the liker's name

  // Auth state listener
  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, async (user) => {
      setUserId(user?.uid || null);

      // Fetch user name from Firestore if logged in
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserName(userSnap.data().userName || "A user"); // Default fallback
        }
      }
    });
  }, []);

  // Firestore listener for post data
  useEffect(() => {
    if (!postId) return;

    const postRef = doc(db, "posts", postId);
    return onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikedBy(data.likedBy || []);
        setLikeCount(data.likedBy?.length || 0);
      }
    });
  }, [postId]);

  // Update hasLiked state
  useEffect(() => {
    setHasLiked(userId ? likedBy.includes(userId) : false);
  }, [userId, likedBy]);

  const toggleLike = async () => {
    if (!postId || !userId || isLiking) return;

    setIsLiking(true);
    const newHasLiked = !hasLiked;

    try {
      console.log(`🔄 Starting like transaction for postId: ${postId}`);

      // Atomic transaction for updating like state
      await runTransaction(db, async (transaction) => {
        const postRef = doc(db, "posts", postId);
        const postDoc = await transaction.get(postRef);
        if (!postDoc.exists()) throw new Error("Post not found");

        const currentLikedBy = postDoc.data().likedBy || [];
        const alreadyLiked = currentLikedBy.includes(userId);

        // If state is out of sync, revert
        if (newHasLiked === alreadyLiked) {
          console.log(`⚠️ Like state already updated, no changes applied.`);
          setHasLiked(alreadyLiked);
          setLikeCount(currentLikedBy.length);
          return;
        }

        const updatedLikedBy = newHasLiked
          ? [...currentLikedBy, userId]
          : currentLikedBy.filter((id) => id !== userId);

        // Update Firestore atomically
        transaction.update(postRef, {
          likedBy: updatedLikedBy,
          likeCount: updatedLikedBy.length,
        });

        // Optimistic local update
        setHasLiked(newHasLiked);
        setLikeCount(updatedLikedBy.length);
      });

      console.log(`✅ Like transaction successful for postId: ${postId}`);

      // After successful like transaction, send a notification if it was a new like.
      if (newHasLiked) {
        console.log(`📢 Fetching post details to notify owner...`);
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          const ownerId = postSnap.data().userId; // Correctly reference the post ownerId
          console.log(`ℹ️ Post ownerId: ${ownerId}`);

          // Do not send notification if the liker is the owner.
          if (ownerId && ownerId !== userId) {
            console.log(`🔍 Fetching FCM token for ownerId: ${ownerId}`);
            const ownerFcmToken = await getUserFcmToken(ownerId);

            if (ownerFcmToken) {
              console.log(
                `✅ Found FCM token for owner, sending notification...`
              );
              // Extract post title or petName for context.
              const postTitle =
                postSnap.data().petName || postSnap.data().title || "your post";
              const message = `${userName} liked your post "${postTitle}"!`;

              axiosFCM
                .post("/send_notification.php", {
                  fcmToken: ownerFcmToken,
                  title: "New Like on Your Post",
                  body: message,
                })
                .then(() =>
                  console.log(
                    `📨 Push notification sent successfully to ownerId: ${ownerId}`
                  )
                )
                .catch((error) =>
                  console.error(`❌ FCM Notification Error:`, error)
                );

              // Store notification in Firestore with postId.
              await storeNotification(
                ownerId,
                "New Like on Your Post",
                message,
                "like",
                postId
              );

              console.log(
                `✅ Notification stored in Firestore for ownerId: ${ownerId}, postId: ${postId}`
              );
            } else {
              console.log(
                `⚠️ No FCM token found for ownerId: ${ownerId}, skipping push notification.`
              );
            }
          } else {
            console.log(`⚠️ Skipping notification: User liked their own post.`);
          }
        } else {
          console.log(
            `⚠️ Post not found when fetching details for notification.`
          );
        }
      }
    } catch (error) {
      console.error("❌ Like transaction failed:", error);
      // Revert to last known good state if error occurs.
      setHasLiked(hasLiked);
      setLikeCount(likedBy.length);
    } finally {
      setIsLiking(false);
    }
  };

  return { likeCount, hasLiked, isLiking, toggleLike };
};
