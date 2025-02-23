importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCAOSA6ZO_pZg8wWhJ1zNrL2-m4tSUIAM0",
  authDomain: "pawtopia-641de.firebaseapp.com",
  projectId: "pawtopia-641de",
  storageBucket: "pawtopia-641de.firebasestorage.app",
  messagingSenderId: "1024533942067",
  appId: "1:1024533942067:web:0f277904b2127d88a2f846",
  measurementId: "G-QJGVB4H99E",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("🔥 Received background message:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/pawtopia-logo.png",
  });
});
