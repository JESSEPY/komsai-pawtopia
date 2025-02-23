import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
import { messaging } from "../../firebase"; // Ensure the correct path

const useFCMNotifications = () => {
  useEffect(() => {
    console.log("✅ Foreground FCM listener initialized...");

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("🚀 Foreground message received:", payload);

      if (payload?.notification) {
        toast.info(
          `${payload.notification.title}: ${payload.notification.body}`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      } else {
        console.error("❌ Invalid FCM payload structure:", payload);
      }
    });

    // Cleanup function to remove listener when component unmounts
    return () => {
      console.log("🛑 Unsubscribing from FCM listener...");
      unsubscribe();
    };
  }, []);
};

export default useFCMNotifications;
