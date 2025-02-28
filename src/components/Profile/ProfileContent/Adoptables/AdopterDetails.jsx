import React, { useState } from "react";
import ExportIcon from "../../../../assets/icons/export.svg";
import FullAdopterModal from "./FullAdopterModal";

function AdopterDetails({ selectedRequest, formatDate }) {
  const [showModal, setShowModal] = useState(false);

  if (!selectedRequest) {
    return (
      <div className="bg-hoverColor flex items-center justify-center h-34 px-4 py-4 min-h-32 rounded-xl w-full">
        <p className="text-gray-500 text-sm text-center">
          Select an adoption request to view details.
        </p>
      </div>
    );
  }

  const { adopterName, status, userData = {} } = selectedRequest;
  const { adoptionData = {} } = userData;
  const { personal = {}, questionnaire, alternativeContact } = adoptionData;

  // Basic personal info
  const {
    firstName,
    lastName,
    birthDate,
    contactNumber,
    email: personalEmail,
    gender,
    address,
  } = personal;

  return (
    <>
      {/* Card with summary info */}
      <div className="bg-hoverColor max-h-32 px-4 py-4 rounded-xl w-full">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold text-sm mb-2">
            Adopter's Basic Information
          </h3>
          <button className="w-5 h-5" onClick={() => setShowModal(true)}>
            <img src={ExportIcon} alt="Expand" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            {/* Use request-level name OR personal-level name */}
            <p className="text-gray-800">{adopterName}</p>
            <p className="text-gray-800">{status || "Pending"}</p>
            <p className="text-gray-800">{gender || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-800">
              {birthDate ? formatDate(birthDate) : "Unknown"}
            </p>
            <p className="text-gray-800">{contactNumber || "N/A"}</p>
            <p className="text-gray-800">
              {personalEmail
                ? personalEmail.length > 20
                  ? personalEmail.slice(0, 20) + "..."
                  : personalEmail
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <FullAdopterModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedRequest={selectedRequest}
        formatDate={formatDate}
      />
    </>
  );
}

export default AdopterDetails;
