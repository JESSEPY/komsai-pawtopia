import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase"; // Ensure the correct path to your Firebase config
import { onAuthStateChanged } from "firebase/auth";
import Lottie from "lottie-react";
import loaderAnimation from "./assets/cat_loading2.json";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up an auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setTimeout(() => {
        setUser(currentUser);
        setLoading(false);
      }, 3000); // 3-second delay before setting the user
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Render the Lottie animation while loading
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Lottie
          animationData={loaderAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
    );
  }

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected content
  return children;
};

export default ProtectedRoute;
