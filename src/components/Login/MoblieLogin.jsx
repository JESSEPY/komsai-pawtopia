import MobilePaw from "../../assets/icons/mobilePaw.png";
import Dog from "../../assets/icons/dog2.svg";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import GoogleIcon from "../../assets/icons/googleIcon.svg";

const MoblieLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <div className="flex-col container gap-4 items-center justify-center w-full h-full">
        {/* Logo and Paw Pic */}
        <img src={MobilePaw} alt="" className="w-full" />
        <div className="fixed top-0 left-0 right-0 flex justify-center mt-8 z-50">
          <div className="flex items-center justify-center gap-1 px-8 py-4 w-auto h-8 bg-white rounded-xl shadow-md">
            <img src={Dog} alt="" className="w-7 h-7" />
            <p className="font-arpona font-black text-sm text-customBlue">
              Pawtopia
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="flex-col gap-1 items-center">
          <p className="font-arpona font-black text-customBlue text-2xl text-center">
            A Happy home for
          </p>
          <p className="font-arpona font-black text-customBlue text-3xl text-center">
            Every Happy Paw.
          </p>
          <p className="font-sans text-customBlue text-[0.7rem] text-center">
            Hello welcome pawtopians! Ready to adopt <br /> a pet? Register now!
          </p>
        </div>

        {/* Input Section */}
        <form
          onSubmit={handleSubmit}
          className="flex mt-4 pb-4 flex-col gap-2 items-center mx-16 justify-center"
        >
          {/* Email Field */}
          <div className="w-full mt-4">
            <label className="block text-sm font-medium text-customBlue mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none focus:border-none"
            />
          </div>

          {/* Password Field */}
          <div className="w-full mt-4">
            <label className="block text-sm font-medium text-customBlue mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Continue Button */}
          <button
            type="submit"
            className="transition transform  mb-2 hover:-translate-y-2 mt-5 duration-300 font-arpona font-black text-white w-full h-10 rounded-lg bg-primary shadow-[0px_4px_11.5px_0px_rgba(255,_146,_0,_0.60)]"
          >
            Continue
          </button>

          <p className="text-sm text-gray-400">or</p>
        </form>

        <div className="flex items-center mx-16 justify-center mb-10">
          <button className="flex w-96 items-center justify-center font-bold gap-1 transition transform hover:-translate-y-2 duration-300 rounded-lg h-10 border border-gray-300">
            <img src={GoogleIcon} alt="" />
            Continue With Google
          </button>
        </div>
      </div>
    </>
  );
};

export default MoblieLogin;
