import React from "react";
import { Link, useLocation } from "react-router-dom";

const FullAdopterPage = () => {
  // Retrieve the request data via React Router's location.state
  const location = useLocation();
  const { selectedRequest } = location.state || {};

  // If no data is found (e.g. direct URL visit), show a fallback
  if (!selectedRequest) {
    return (
      <div className="p-4">
        <h1 className="text-lg font-semibold">No Request Data</h1>
        <p>Please go back and select a valid request.</p>
        <Link to="/" className="text-blue-600 underline">
          Back Home
        </Link>
      </div>
    );
  }

  // 1) Local date formatter
  //    We re-implement the logic here.
  //    This is a simple fallback approach for demonstration.
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    // You can customize this format as needed
    return new Date(dateString).toLocaleDateString();
  };

  // 2) Destructure the selectedRequest
  const {
    adopterName,
    adopterEmail,
    status,
    reviewedAt,
    submittedAt,
    notes,
    userData = {},
  } = selectedRequest;

  const { adoptionData = {} } = userData;
  const { personal = {}, questionnaire = {} } = adoptionData;
  const { mediaUrls = {} } = personal;
  const { homePhotos = [], validIds = [] } = mediaUrls;

  // Personal fields
  const {
    firstName,
    lastName,
    middleInitial,
    birthDate,
    gender,
    contactNumber,
    address,
    businessName,
    occupation,
    socialMediaLink,
    status: personalStatus,
  } = personal;

  // Questionnaire fields
  const {
    adoptionPreference,
    allergyResponse,
    buildingType,
    careResponsibility,
    familySupport,
    financialResponsibilityDescription,
    hoursAlone,
    idealPetDescription,
    pastPets,
    petCareDescription,
    petIntroductionSteps,
    petMovePlan,
    rent,
    specificAnimal,
    livingArrangements,
  } = questionnaire;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h1 className="text-xl font-semibold">Full Adopter Information</h1>
        <Link to="/" className="text-blue-600 underline">
          Back
        </Link>
      </div>

      <div className="space-y-6 text-sm">
        {/* Request Information */}
        <section>
          <h2 className="text-md font-semibold mb-2">Request Information</h2>
          <div className="grid grid-cols-2 gap-2">
            <p>
              <strong>Adopter Name:</strong> {adopterName}
            </p>
            <p>
              <strong>Email:</strong> {adopterEmail}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
            <p>
              <strong>Reviewed At:</strong>{" "}
              {reviewedAt ? formatDate(reviewedAt) : "N/A"}
            </p>
            <p>
              <strong>Submitted At:</strong>{" "}
              {submittedAt ? formatDate(submittedAt) : "N/A"}
            </p>
            {notes && (
              <p>
                <strong>Notes:</strong> {notes}
              </p>
            )}
          </div>
        </section>

        {/* Personal Information */}
        <section>
          <h2 className="text-md font-semibold mb-2">Personal Information</h2>
          <div className="grid grid-cols-2 gap-2">
            <p>
              <strong>Name:</strong> {firstName} {middleInitial} {lastName}
            </p>
            <p>
              <strong>Birth Date:</strong>{" "}
              {birthDate ? formatDate(birthDate) : "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
            <p>
              <strong>Contact:</strong> {contactNumber}
            </p>
            <p>
              <strong>Address:</strong> {address}
            </p>
            <p>
              <strong>Business Name:</strong> {businessName || "N/A"}
            </p>
            <p>
              <strong>Occupation:</strong> {occupation || "N/A"}
            </p>
            <p>
              <strong>Social Media:</strong> {socialMediaLink || "N/A"}
            </p>
            <p>
              <strong>Marital Status:</strong> {personalStatus || "N/A"}
            </p>
          </div>
        </section>

        {/* Questionnaire */}
        <section>
          <h2 className="text-md font-semibold mb-2">Questionnaire</h2>
          <div className="grid grid-cols-2 gap-2">
            <p>
              <strong>Adoption Preference:</strong> {adoptionPreference}
            </p>
            <p>
              <strong>Allergy Response:</strong> {allergyResponse}
            </p>
            <p>
              <strong>Building Type:</strong> {buildingType}
            </p>
            <p>
              <strong>Care Responsibility:</strong> {careResponsibility}
            </p>
            <p>
              <strong>Family Support:</strong> {familySupport}
            </p>
            <p>
              <strong>Financial Responsibility:</strong>{" "}
              {financialResponsibilityDescription}
            </p>
            <p>
              <strong>Hours Alone:</strong> {hoursAlone}
            </p>
            <p>
              <strong>Ideal Pet:</strong> {idealPetDescription}
            </p>
            <p>
              <strong>Past Pets:</strong> {pastPets}
            </p>
            <p>
              <strong>Pet Care:</strong> {petCareDescription}
            </p>
            <p>
              <strong>Introduction Steps:</strong> {petIntroductionSteps}
            </p>
            <p>
              <strong>Move Plan:</strong> {petMovePlan}
            </p>
            <p>
              <strong>Renting:</strong> {rent}
            </p>
            <p>
              <strong>Specific Animal:</strong> {specificAnimal}
            </p>

            {/* Living Arrangements (if present) */}
            {livingArrangements && (
              <div className="col-span-2 mt-2">
                <h3 className="font-medium mb-1">Living Arrangements</h3>
                <div className="grid grid-cols-2 gap-2">
                  <p>
                    <strong>Children &lt; 18:</strong>{" "}
                    {livingArrangements.childrenBelow18 ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Children ≥ 18:</strong>{" "}
                    {livingArrangements.childrenOver18 ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Living Alone:</strong>{" "}
                    {livingArrangements.livingAlone ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Parents:</strong>{" "}
                    {livingArrangements.parents ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Relatives:</strong>{" "}
                    {livingArrangements.relatives ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Roommates:</strong>{" "}
                    {livingArrangements.roommates ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Spouse:</strong>{" "}
                    {livingArrangements.spouse ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Photos */}
        <section>
          <h2 className="text-md font-semibold mb-2">Home Photos</h2>
          {homePhotos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {homePhotos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Home Photo ${idx + 1}`}
                  className="object-cover rounded-md h-32 w-full"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm">No home photos available.</p>
          )}
        </section>

        {/* Valid IDs */}
        <section>
          <h2 className="text-md font-semibold mb-2">Valid IDs</h2>
          {validIds.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {validIds.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Valid ID ${idx + 1}`}
                  className="object-cover rounded-md h-32 w-full"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm">No valid ID images available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default FullAdopterPage;
