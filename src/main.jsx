import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { messaging } from "../firebase";
import { onMessage } from "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Register Firebase Cloud Messaging Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("❌ Service Worker registration failed:", error);
    });
}

// ✅ Ensure onMessage is listening for foreground notifications
onMessage(messaging, (payload) => {
  console.log("🚀 Foreground message received:", payload);

  if (payload?.notification) {
    toast.info(`${payload.notification.title}: ${payload.notification.body}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } else {
    console.error("❌ Invalid FCM payload structure:", payload);
  }
});

console.log("👀 Waiting for foreground notifications...");

// ✅ Ensure ToastContainer is inside React App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>
);
