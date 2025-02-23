import React from "react";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import uploadAnimation from "../../assets/cat_loading2.json"; // Replace with your Lottie JSON file

const MySwal = withReactContent(Swal);

const confirmButtonClasses =
  "py-2 px-6 bg-altTagColor mr-4 text-white rounded-full flex items-center justify-center gap-1 w-28 transition-transform hover:-translate-y-1 duration-300";
const cancelButtonClasses =
  "py-2 px-6 bg-gray-400 text-white rounded-full flex items-center justify-center gap-1 w-28 transition-transform hover:-translate-y-1 duration-300";
const swalBoderRadius = "rounded-2xl";

// 🔥 Uploading Swal
export const showUploadingSwal = (title = "Uploading...") => {
  MySwal.fire({
    title,
    allowOutsideClick: false,
    showConfirmButton: false,
    customClass: {
      popup: swalBoderRadius,
    },
    html: (
      <div className="flex flex-col items-center justify-center gap-2">
        <Lottie
          animationData={uploadAnimation}
          loop={true}
          className="w-[150px] h-[150px]"
        />
        <p className="text-gray-600 text-sm">
          Please wait while we upload your media.
        </p>
      </div>
    ),
  });
};

// ✅ Success Swal
export const showSuccessSwal = (message) => {
  MySwal.fire({
    icon: "success",
    title: "Success!",
    text: message,
    showConfirmButton: true, // ✅ Keep it open until user clicks
    customClass: {
      confirmButton: confirmButtonClasses,
      popup: swalBoderRadius,
    },
    buttonsStyling: false, // Disable default styling
  });
};

// ❌ Error Swal
export const showErrorSwal = (message) => {
  MySwal.fire({
    icon: "error",
    title: "Oops!",
    text: message,
    customClass: {
      confirmButton: confirmButtonClasses,
      popup: swalBoderRadius,
    },
    buttonsStyling: false, // Disable default styling
  });
};

// 🔄 Submitting Swal
export const showSubmittingSwal = () => {
  MySwal.fire({
    title: "Submitting Request...",
    allowOutsideClick: false,
    showConfirmButton: false,
    customClass: {
      popup: swalBoderRadius,
    },
    html: (
      <div className="flex flex-col items-center justify-center gap-2">
        <Lottie
          animationData={uploadAnimation}
          loop={true}
          className="w-[150px] h-[150px]"
        />
        <p className="text-gray-600 text-sm">
          Please wait while we process your adoption request.
        </p>
      </div>
    ),
  });
};

// 🔥 **NEW**: Confirmation Swal
export const showConfirmationSwal = async (title, message) => {
  const result = await MySwal.fire({
    title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    customClass: {
      confirmButton: confirmButtonClasses,
      cancelButton: cancelButtonClasses,
      popup: swalBoderRadius,
    },
    buttonsStyling: false, // Disable default styling
  });

  return result.isConfirmed; // Returns true if user confirmed, false otherwise
};
