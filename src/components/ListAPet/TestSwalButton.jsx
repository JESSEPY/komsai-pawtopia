import React from "react";
import {
  showUploadingSwal,
  showSuccessSwal,
  showErrorSwal,
} from "./Swalloader";

const TestSwalButton = () => {
  const handleTestUpload = () => {
    showUploadingSwal();
  };

  const handleTestSuccess = () => {
    showSuccessSwal("Post successfully created!");
  };

  const handleTestError = () => {
    showErrorSwal("Failed to create post. Please try again.");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <button
        onClick={handleTestUpload}
        className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Test Upload Swal
      </button>
      <button
        onClick={handleTestSuccess}
        className="py-2 px-6 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
      >
        Test Success Swal
      </button>
      <button
        onClick={handleTestError}
        className="py-2 px-6 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Test Error Swal
      </button>
    </div>
  );
};

export default TestSwalButton;
