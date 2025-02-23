import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/cat_loading2.json"; // Lottie animation
import google from "../../assets/icons/googleIcon.svg";

// Swal
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SignUpCard = ({ selectedRole }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(selectedRole);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Ensure role is updated when selectedRole changes
  useEffect(() => {
    setRole(selectedRole);
  }, [selectedRole]);

  console.log("Selected role in SignUpCard:", selectedRole);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Password match validation
    if (password !== confirmPassword) {
      MySwal.fire({
        text: "Passwords do not match!",
        icon: "error",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    setLoading(true); // Show Lottie animation

    try {
      await registerUser(email, password, userName, role);

      // Show verification email alert
      MySwal.fire({
        text: "Verification email sent! Please check your inbox.",
        icon: "info",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });

      // Delay navigation by 3 seconds
      setTimeout(() => {
        navigate("/login");
        setLoading(false); // Hide Lottie animation after delay
      }, 3000);
    } catch (error) {
      setLoading(false);

      // Show error alert
      MySwal.fire({
        text: error.message,
        icon: "error",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div
      className="flex mt-4 pb-4 h-auto flex-col gap-2 border items-center px-12 justify-center border-customBorderColor rounded-2xl bg-formBg transition-all duration-500"
      style={{ minHeight: "420px" }} // ✅ Keeps height fixed while loading
    >
      <form onSubmit={handleSignup} className="w-full">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Show Lottie Animation while loading */}
        {loading ? (
          <div className="flex justify-center my-4">
            <Lottie
              animationData={loadingAnimation}
              style={{ width: 150, height: 150 }}
            />
          </div>
        ) : (
          <>
            {/* Email Field */}
            <div className="mx-4 mt-4">
              <label className="block text-sm font-medium text-customBlue mb-1">
                Email
              </label>
              <input
                placeholder="pawtopia@gmail.com"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none focus:border-none"
              />
            </div>

            {/* Username Field */}
            <div className="mx-4 mt-4">
              <label className="block text-sm font-medium text-customBlue mb-1">
                Username
              </label>
              <input
                placeholder="pawtopia"
                type="text"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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

            {/* Confirm Password Field */}
            <div className="mx-4 mt-4">
              <label className="block text-sm font-medium text-customBlue mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none focus:border-none"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <div className="mx-4 mt-6 flex gap-4 justify-center flex-col">
              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className={`transition transform hover:-translate-y-2 duration-300 font-arpona font-black text-white w-full h-10 rounded-lg bg-primary shadow-[0px_4px_11.5px_0px_rgba(255,_146,_0,_0.60)] flex items-center justify-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              {/* Google  */}
              <button className="transition transform hover:translate-y-2 duration-300 flex text-sm flex-grow items-center justify-center gap-2 border h-10 border-gray-400 py-2 px-4 rounded-lg">
                <img src={google} alt="Google Icon" />
                Continue with Google
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUpCard;
