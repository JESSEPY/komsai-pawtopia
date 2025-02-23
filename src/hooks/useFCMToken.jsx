import { getToken } from "firebase/messaging";
import { db, messaging } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const useFCMToken = async (userId) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey:
        "BFSRTU06B07O9Uk5ciQQwCZf2NBfM06TmnCBQ_yIuNI-ohny3JA-_Yes1aU23AFLKuLlj_1I0Y_t0s-mNEquKJk",
    });

    if (token) {
      // Store the FCM token in Firestore
      await setDoc(
        doc(db, "users", userId),
        { fcmToken: token },
        { merge: true }
      );
      console.log("FCM Token stored successfully!", token);
    }

    return token;
  } catch (error) {
    console.error("Error fetching FCM token:", error);
    return null;
  }
};

export default useFCMToken;
