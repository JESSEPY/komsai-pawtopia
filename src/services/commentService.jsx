import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import axios from "axios";
import { getUserFcmToken, storeNotification } from "./notificationService";

// Create an Axios instance for FCM notifications (using your PHP endpoint)
const axiosFCM = axios.create({
  baseURL: "https://pawtopia.scarlet2.io",
  headers: { "Content-Type": "application/json" },
});

/**
 * Fetch the current user's details (userName & profileImg) from Firestore.
 */
const getCurrentUserData = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) throw new Error("User data not found in Firestore");

  return {
    userName: userSnap.data().userName || "Anonymous",
    profileImg: userSnap.data().profileImg || "https://i.pravatar.cc/40",
    uid: user.uid,
  };
};

/**
 * Add a new comment and notify the post owner.
 */
export const addComment = async (postId, text) => {
  if (!text.trim()) return;
  const currentUser = await getCurrentUserData();

  const commentsRef = collection(db, "posts", postId, "comments");
  const commentRef = await addDoc(commentsRef, {
    text: text.trim(),
    author: currentUser.userName,
    authorImg: currentUser.profileImg,
    userId: currentUser.uid,
    createdAt: serverTimestamp(),
    likes: 0,
    likedBy: [],
  });

  // Notify the post owner (if not the same as the commenter).
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) {
    const postData = postSnap.data();
    const postTitle = postData.petName || postData.title || "your post";
    if (postData.userId !== currentUser.uid) {
      const ownerFcmToken = await getUserFcmToken(postData.userId);
      const message = `${
        currentUser.userName
      } commented on your post "${postTitle}": "${text.trim()}"`;

      // Store notification in Firestore.
      await storeNotification(
        postData.userId,
        "New Comment on Your Post",
        message,
        "comment",
        postId
      );

      // Send push notification via PHP endpoint if FCM token exists.
      if (ownerFcmToken) {
        axiosFCM
          .post("/send_notification.php", {
            fcmToken: ownerFcmToken,
            title: "New Comment on Your Post",
            body: message,
          })
          .then(() =>
            console.log(
              `Push notification sent successfully to post owner: ${postData.userId}`
            )
          )
          .catch((error) =>
            console.error("FCM Notification Error (comment):", error)
          );
      }
    }
  }

  return commentRef;
};

/**
 * Toggle like for a comment or reply and notify the original author.
 */
export const toggleLikeComment = async (postId, commentId, replyId = null) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  let docRef;
  let ownerId;

  if (replyId) {
    // Toggle like for a reply.
    docRef = doc(
      db,
      "posts",
      postId,
      "comments",
      commentId,
      "replies",
      replyId
    );
    const replySnap = await getDoc(docRef);
    if (!replySnap.exists()) throw new Error("Reply not found");
    ownerId = replySnap.data().userId;
  } else {
    // Toggle like for a comment.
    docRef = doc(db, "posts", postId, "comments", commentId);
    const commentSnap = await getDoc(docRef);
    if (!commentSnap.exists()) throw new Error("Comment not found");
    ownerId = commentSnap.data().userId;
  }

  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const hasLiked = data.likedBy?.includes(user.uid);

  await updateDoc(docRef, {
    likes: hasLiked ? data.likes - 1 : data.likes + 1,
    likedBy: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
  });

  // If it's a new like (and not self-like), notify the original author.
  if (!hasLiked && ownerId !== user.uid) {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    const postTitle = postSnap.exists()
      ? postSnap.data().petName || postSnap.data().title || "your post"
      : "your post";
    const message = `Your ${
      replyId ? "reply" : "comment"
    } on "${postTitle}" got a like!`;
    const ownerFcmToken = await getUserFcmToken(ownerId);
    if (ownerFcmToken) {
      // Store notification in Firestore.
      await storeNotification(
        ownerId,
        `Your ${replyId ? "Reply" : "Comment"} Got a Like!`,
        message,
        "like",
        postId
      );
      // Send push notification via PHP endpoint.
      axiosFCM
        .post("/send_notification.php", {
          fcmToken: ownerFcmToken,
          title: `Your ${replyId ? "Reply" : "Comment"} Got a Like!`,
          body: message,
        })
        .then(() =>
          console.log(`Push notification sent successfully to: ${ownerId}`)
        )
        .catch((error) =>
          console.error("FCM Notification Error (like):", error)
        );
    }
  }
};

/**
 * Add a reply to a comment and notify the original commenter.
 */
export const addReply = async (postId, commentId, text) => {
  if (!text.trim()) return;
  const currentUser = await getCurrentUserData();

  const repliesRef = collection(
    db,
    "posts",
    postId,
    "comments",
    commentId,
    "replies"
  );
  const replyRef = await addDoc(repliesRef, {
    text: text.trim(),
    author: currentUser.userName,
    authorImg: currentUser.profileImg,
    userId: currentUser.uid,
    parentCommentId: commentId,
    createdAt: serverTimestamp(),
  });

  // Notify the original commenter if they're not the one replying.
  const commentRef = doc(db, "posts", postId, "comments", commentId);
  const commentSnap = await getDoc(commentRef);
  if (commentSnap.exists()) {
    const commentOwnerId = commentSnap.data().userId;
    if (commentOwnerId !== currentUser.uid) {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);
      const postTitle = postSnap.exists()
        ? postSnap.data().petName || postSnap.data().title || "your post"
        : "your post";
      const message = `${
        currentUser.userName
      } replied on your comment on "${postTitle}": "${text.trim()}"`;
      const ownerFcmToken = await getUserFcmToken(commentOwnerId);
      if (ownerFcmToken) {
        // Store notification in Firestore.
        await storeNotification(
          commentOwnerId,
          "New Reply to Your Comment",
          message,
          "reply",
          postId
        );
        // Send push notification via PHP endpoint.
        axiosFCM
          .post("/send_notification.php", {
            fcmToken: ownerFcmToken,
            title: "New Reply to Your Comment",
            body: message,
          })
          .then(() =>
            console.log(
              `Push notification sent successfully to comment owner: ${commentOwnerId}`
            )
          )
          .catch((error) =>
            console.error("FCM Notification Error (reply):", error)
          );
      }
    }
  }

  return replyRef;
};

/**
 * Delete a comment.
 */
export const deleteComment = async (postId, commentId) => {
  const docRef = doc(db, "posts", postId, "comments", commentId);
  return deleteDoc(docRef);
};

/**
 * Delete a reply.
 */
export const deleteReply = async (postId, commentId, replyId) => {
  const docRef = doc(
    db,
    "posts",
    postId,
    "comments",
    commentId,
    "replies",
    replyId
  );
  return deleteDoc(docRef);
};

/**
 * Subscribe to real-time comments and nested replies.
 * Sets up live subscriptions so that changes (including deletions) update the UI in real time.
 */
export const subscribeToComments = (postId, callback) => {
  const commentsRef = collection(db, "posts", postId, "comments");
  const commentsQuery = query(commentsRef, orderBy("createdAt", "desc"));

  // Object to store reply subscriptions keyed by comment ID.
  const replyUnsubs = {};

  // Subscribe to comments.
  const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
    let comments = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
      replies: [],
    }));

    // Clean up reply subscriptions for comments that no longer exist.
    const currentCommentIds = comments.map((c) => c.id);
    Object.keys(replyUnsubs).forEach((commentId) => {
      if (!currentCommentIds.includes(commentId)) {
        replyUnsubs[commentId]();
        delete replyUnsubs[commentId];
      }
    });

    // Set up (or update) reply subscriptions for each comment.
    comments.forEach((comment) => {
      const repliesRef = collection(
        db,
        "posts",
        postId,
        "comments",
        comment.id,
        "replies"
      );
      if (!replyUnsubs[comment.id]) {
        // Create a new subscription for replies of this comment.
        replyUnsubs[comment.id] = onSnapshot(repliesRef, (repliesSnap) => {
          const updatedReplies = repliesSnap.docs.map((replyDoc) => ({
            id: replyDoc.id,
            ...replyDoc.data(),
            likedBy: replyDoc.data().likedBy || [],
          }));
          // Update the comment's replies.
          comments = comments.map((c) =>
            c.id === comment.id ? { ...c, replies: updatedReplies } : c
          );
          callback([...comments]);
        });
      }
    });

    // Initial callback with current comments.
    callback(comments);
  });

  // Return an unsubscribe function that cleans up all subscriptions.
  return () => {
    unsubscribeComments();
    Object.values(replyUnsubs).forEach((unsub) => unsub());
  };
};
