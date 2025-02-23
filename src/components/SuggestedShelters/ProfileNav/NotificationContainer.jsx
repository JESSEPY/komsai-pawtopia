import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import NotificationDropdown from "./NotificationDropdown";

const NotificationsContainer = () => {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Listen for Firebase Auth state change
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!userId) return;

    // ✅ Listen for changes in Firestore notifications collection in real-time
    const notifQuery = query(
      collection(db, "users", userId, "notifications"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(notifQuery, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => ({
        id: doc.id,
        userId, // ✅ Ensure userId is passed along with each notification
        ...doc.data(),
      }));
      setNotifications(notifs);
    });

    return () => unsubscribe();
  }, [userId]);

  if (!userId) {
    return null; // Hide the dropdown if not logged in
  }

  return <NotificationDropdown notifications={notifications} userId={userId} />;
};

export default NotificationsContainer;
