import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { loginUser } from "../../services/authService";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/cat_loading2.json"; // Lottie animation
import google from "../../assets/icons/googleIcon.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useUserProfile } from "../../hooks/userProfile";
import useFCMToken from "../../hooks/useFCMToken";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  // Fetch user profile
  const { userProfile, isLoading: profileLoading, userId } = useUserProfile();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Authenticate user
      const { user } = await loginUser(email, password);
      console.log("User logged in:", user.uid);

      // Store FCM token
      await useFCMToken(user.uid);

      // Step 2: Set login success flag (triggers useEffect to wait for profile)
      setLoginSuccess(true);
    } catch (error) {
      setLoading(false);
      MySwal.fire({
        text: error.message,
        icon: "error",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        customClass: { popup: "small-alert" },
      });
    }
  };

  // Step 3: Navigate once userProfile is available after login
  useEffect(() => {
    if (loginSuccess && userProfile) {
      console.log("User Profile Loaded:", userProfile);

      if (userProfile.isVerified) {
        navigate("/home"); // Proceed to home if verified
      } else {
        // Redirect based on role if not verified
        if (userProfile.role === "Adopter") {
          navigate("/aprocess");
        } else if (userProfile.role === "Shelter") {
          navigate("/shelter-process");
        } else {
          navigate("/home"); // Default for unknown roles
        }
      }

      setLoading(false);
    }
  }, [loginSuccess, userProfile, navigate]);

  return (
    <div className="flex mt-4 pb-4 h-auto min-h-80 flex-col gap-2 border items-center px-12 justify-center border-customBorderColor rounded-2xl bg-formBg transition-all duration-500">
      {loading ? (
        <div className="flex justify-center my-4">
          <Lottie
            animationData={loadingAnimation}
            style={{ width: 150, height: 150 }}
          />
        </div>
      ) : (
        <form onSubmit={handleLogin} className="w-full">
          {/* Email Field */}
          <div className="mx-4 mt-4">
            <label className="block text-sm font-medium text-customBlue mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none focus:border-none"
            />
          </div>

          {/* Password Field */}
          <div className="mx-4 mt-4">
            <label className="block text-sm font-medium text-customBlue mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none focus:border-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Log In Button */}
          <div className="mx-4 mt-6 flex-col justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`transition transform hover:-translate-y-2 duration-300 font-arpona font-black text-white w-full h-10 rounded-lg bg-primary shadow-[0px_4px_11.5px_0px_rgba(255,_146,_0,_0.60)] flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>

            {/* Login with Google */}
            <button className="mt-4 transition transform hover:translate-y-2 duration-300 flex text-sm flex-grow w-full items-center justify-center gap-2 border h-10 border-gray-400 py-2 px-4 rounded-lg">
              <img src={google} alt="Google Icon" />
              Continue with Google
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginCard;
