// src/utils/formatTime.js

/**
 * Formats a Firestore timestamp or JavaScript date into a relative time format like Instagram.
 * @param {firebase.firestore.Timestamp | Date} timestamp - Firestore timestamp or Date object.
 * @returns {string} - Relative time format ("Just now", "5m", "2h", "3d", "May 19").
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return "Time not available";

  const postDate = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diff = now - postDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;

  // For posts older than a week, show a short date like "May 19".
  return postDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};
