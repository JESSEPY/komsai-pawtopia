import { db, auth } from "../../firebase";
import {
  collectionGroup,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

/**
 * Fetch user comments and replies for the currently logged-in user.
 */
export const getUserCommentsAndReplies = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  return await getUserCommentsAndRepliesById(user.uid);
};

/**
 * ✅ NEW: Fetch user comments and replies for a specific user by userId.
 * @param {string} userId - The user ID.
 */
export const getUserCommentsAndRepliesById = async (userId) => {
  if (!userId) throw new Error("No userId provided");

  const userComments = [];
  const userReplies = [];

  // Query all comments using collectionGroup
  const commentsQuery = query(
    collectionGroup(db, "comments"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const commentsSnapshot = await getDocs(commentsQuery);
  commentsSnapshot.forEach((doc) => {
    userComments.push({ commentId: doc.id, ...doc.data() });
  });

  // Query all replies using collectionGroup
  const repliesQuery = query(
    collectionGroup(db, "replies"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const repliesSnapshot = await getDocs(repliesQuery);
  repliesSnapshot.forEach((doc) => {
    userReplies.push({ replyId: doc.id, ...doc.data() });
  });

  return { comments: userComments, replies: userReplies };
};

/**
 * Sets up real-time snapshot listeners for the currently logged-in user's comments and replies.
 */
export const subscribeToUserCommentsAndReplies = (
  onCommentsChanged,
  onRepliesChanged,
  onError
) => {
  const user = auth.currentUser;
  if (!user) {
    onError?.(new Error("User not authenticated"));
    return () => {}; // no-op unsubscribe
  }
  return subscribeToUserCommentsAndRepliesById(
    user.uid,
    onCommentsChanged,
    onRepliesChanged,
    onError
  );
};

/**
 * ✅ NEW: Sets up real-time snapshot listeners for a specific user's comments and replies.
 * @param {string} userId - The user ID.
 */
export const subscribeToUserCommentsAndRepliesById = (
  userId,
  onCommentsChanged,
  onRepliesChanged,
  onError
) => {
  if (!userId) {
    onError?.(new Error("No userId provided"));
    return () => {};
  }

  const commentsQuery = query(
    collectionGroup(db, "comments"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const repliesQuery = query(
    collectionGroup(db, "replies"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const unsubComments = onSnapshot(
    commentsQuery,
    (snapshot) => {
      const newComments = snapshot.docs.map((doc) => ({
        commentId: doc.id,
        ...doc.data(),
      }));
      onCommentsChanged(newComments);
    },
    (error) => onError?.(error)
  );

  const unsubReplies = onSnapshot(
    repliesQuery,
    (snapshot) => {
      const newReplies = snapshot.docs.map((doc) => ({
        replyId: doc.id,
        ...doc.data(),
      }));
      onRepliesChanged(newReplies);
    },
    (error) => onError?.(error)
  );

  return () => {
    unsubComments();
    unsubReplies();
  };
};
