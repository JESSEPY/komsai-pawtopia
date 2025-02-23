// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAOSA6ZO_pZg8wWhJ1zNrL2-m4tSUIAM0",
  authDomain: "pawtopia-641de.firebaseapp.com",
  projectId: "pawtopia-641de",
  storageBucket: "pawtopia-641de.firebasestorage.app",
  messagingSenderId: "1024533942067",
  appId: "1:1024533942067:web:0f277904b2127d88a2f846",
  measurementId: "G-QJGVB4H99E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

// Request FCM Token
export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return null;
    }

    // Replace with your VAPID Key from Firebase Console
    const token = await getToken(messaging, {
      vapidKey:
        "BFSRTU06B07O9Uk5ciQQwCZf2NBfM06TmnCBQ_yIuNI-ohny3JA-_Yes1aU23AFLKuLlj_1I0Y_t0s-mNEquKJk",
    });

    return token;
  } catch (error) {
    console.error("FCM Token Error:", error);
    return null;
  }
};

// Listen for Incoming Notifications (Foreground)
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  alert(`${payload.notification.title}: ${payload.notification.body}`);
});
