import { auth } from "../../firebase";
import { db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import useFCMToken from "../hooks/useFCMToken";

// Register user and send email verification
export const registerUser = async (email, password, userName, role) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    // Prepare user data for Firestore
    const userData = {
      email,
      userName,
      role, // "shelter" or "adopter"
      createdAt: new Date(),
      isVerified: false, // Initially set as false
    };

    // Store user data in Firestore under `/users/{userId}`
    await setDoc(doc(db, "users", user.uid), userData);

    return user;
  } catch (error) {
    console.error("Signup error:", error.message);
    throw error;
  }
};

// Fetch user details from Firestore
export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw error;
  }
};

// Check if email is verified
export const isEmailVerified = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().emailVerified;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking email verification:", error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Refresh user authentication data
    await user.reload();

    // Fetch user details from Firestore
    const userData = await getUserData(user.uid);
    const roleVerified = userData?.isVerified || false;

    // Check if email is verified
    if (!user.emailVerified) {
      // Resend verification email
      await sendEmailVerification(user);
      throw new Error("Your email is not verified. Please check your inbox.");
    }

    // Directly call the FCM hook to generate and store the token
    const token = await useFCMToken(user.uid);
    console.log("FCM Token generated on login:", token);

    return { user, roleVerified, token };
  } catch (error) {
    throw error;
  }
};

// Manually resend verification email (for a "Resend" button)
export const resendVerificationEmail = async (user) => {
  try {
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      console.log("Verification email sent again!");
    } else {
      console.log("User is already verified or not signed in.");
    }
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    throw error;
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await auth.signOut();
    console.log("👋 Logged out successfully.");

    // Clear all cached user data
    localStorage.removeItem("userId");
    localStorage.removeItem(`userProfile-${userId}`);

    // Optionally reset state
    setUserId(null);
    setUserProfile(null);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
