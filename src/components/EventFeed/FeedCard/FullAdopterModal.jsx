import React, { Fragment } from "react";
import {
  Dialog,
  Transition,
  DialogPanel,
  TransitionChild,
  DialogTitle,
} from "@headlessui/react";

const formatFirestoreTimestamp = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return "N/A"; // Handle null/undefined timestamps

  const date = new Date(timestamp.seconds * 1000); // Convert Firestore Timestamp to JavaScript Date
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const FullAdopterModal = ({ isOpen, onClose, selectedRequest, formatDate }) => {
  if (!selectedRequest) return null;

  // Destructure top-level request fields
  const {
    adopterName,
    adopterEmail,
    status,
    reviewedAt,
    submittedAt,
    notes,
    userData = {},
  } = selectedRequest;

  // Destructure userData
  const { adoptionData = {} } = userData;
  const {
    personal = {},
    questionnaire = {},
    alternativeContact = {},
  } = adoptionData;

  const { mediaUrls = {} } = personal;
  const { homePhotos = [], validIds = [] } = mediaUrls;

  // Personal info
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

  // Questionnaire info
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

  // Helper function to render each questionnaire question as a card
  const renderQuestionCard = (label, answer) => (
    <div className="bg-white border border-gray-300 shadow rounded-xl p-4">
      <strong>{label}</strong>
      <p className="mt-1 text-gray-700">{answer}</p>
    </div>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Background overlay */}
        <TransitionChild
          as={Fragment}
          enter="transition-opacity duration-300 delay-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </TransitionChild>

        {/* Fullscreen container */}
        <div className="fixed inset-0 flex">
          <TransitionChild
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-transform duration-200"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-full opacity-0"
          >
            <DialogPanel className="relative w-full h-full overflow-y-auto bg-gray-100">
              {/* Close button outside the content box */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>

              {/* Main container */}
              <div className="max-w-6xl mx-auto p-4 md:p-6">
                {/* Title */}
                <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 mb-6">
                  <DialogTitle className="text-2xl font-semibold text-gray-900 mb-2">
                    Full Adopter Information
                  </DialogTitle>
                  <p className="text-sm text-gray-600">
                    Complete details about the adopter.
                  </p>
                </div>

                {/* Top Row: Request & Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Request Information Card (Smaller) */}
                  <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 col-span-1">
                    <h4 className="text-lg font-semibold mb-4">
                      Request Information
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <p>
                        <strong>Adopter Name:</strong> {adopterName}
                      </p>
                      <p className="break-words overflow-hidden">
                        <strong>Email:</strong> {adopterEmail}
                      </p>
                      <p>
                        <strong>Status:</strong> {status}
                      </p>
                      <p>
                        <strong>Reviewed At:</strong>{" "}
                        {reviewedAt
                          ? formatFirestoreTimestamp(reviewedAt)
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Submitted At:</strong>{" "}
                        {submittedAt
                          ? formatFirestoreTimestamp(submittedAt)
                          : "N/A"}
                      </p>
                      {notes && (
                        <p className="break-words overflow-hidden">
                          <strong>Notes:</strong> {notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Personal Information Card (Larger) */}
                  <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 col-span-2">
                    <h4 className="text-lg font-semibold mb-4">
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>
                        <strong>Name:</strong> {firstName} {middleInitial}{" "}
                        {lastName}
                      </p>
                      <p className="break-words overflow-hidden">
                        <strong>Email:</strong> {adopterEmail}
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
                      <p className="break-words overflow-hidden">
                        <strong>Address:</strong> {address}
                      </p>
                      <p>
                        <strong>Business Name:</strong> {businessName || "N/A"}
                      </p>
                      <p>
                        <strong>Occupation:</strong> {occupation || "N/A"}
                      </p>
                      <p className="break-words overflow-hidden">
                        <strong>Social Media:</strong>{" "}
                        {socialMediaLink || "N/A"}
                      </p>
                      <p>
                        <strong>Marital Status:</strong> {personalStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Questionnaire Section as Cards */}
                <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4">Questionnaire</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderQuestionCard(
                      "Describe your ideal pet (sex, age, appearance, temperament, etc.):",
                      idealPetDescription
                    )}
                    {renderQuestionCard(
                      "What happens to your pet if or when you move?",
                      petMovePlan
                    )}
                    {renderQuestionCard(
                      "Who will be responsible for feeding, grooming, and generally caring for your pet?",
                      careResponsibility
                    )}
                    {renderQuestionCard(
                      "Who will be financially responsible for your pet’s needs (food, vet bills, etc.)?",
                      financialResponsibilityDescription
                    )}
                    {renderQuestionCard(
                      "Who will look after your pet if you go on vacation or in case of emergency?",
                      petCareDescription
                    )}
                    {renderQuestionCard(
                      "How many hours in your average work day will your pet be left alone?",
                      hoursAlone
                    )}
                    {renderQuestionCard(
                      "What steps will you take to introduce your new pet to his/her surroundings?",
                      petIntroductionSteps
                    )}
                    {renderQuestionCard("Allergy Response:", allergyResponse)}
                    {renderQuestionCard("Are you renting your place?", rent)}
                    {renderQuestionCard(
                      "What type of building do you live in?",
                      buildingType
                    )}
                    {renderQuestionCard("Any past pets?", pastPets)}
                    {renderQuestionCard(
                      "Please describe your adoption preference:",
                      adoptionPreference
                    )}
                    {renderQuestionCard(
                      "Does your family support this adoption?",
                      familySupport
                    )}
                    {renderQuestionCard(
                      "Any specific animal you want to adopt?",
                      specificAnimal
                    )}
                  </div>
                  {livingArrangements && (
                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Living Arrangements</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <p>
                          <strong>Children &lt;18:</strong>{" "}
                          {livingArrangements.childrenBelow18 ? "Yes" : "No"}
                        </p>
                        <p>
                          <strong>Children ≥18:</strong>{" "}
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

                {/* Bottom Row: Home Photos & Valid IDs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Home Photos Card */}
                  <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 text-sm">
                    <h4 className="text-lg font-semibold mb-4">Home Photos</h4>
                    {homePhotos.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {homePhotos.map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`Home Photo ${idx + 1}`}
                            className="w-full h-48 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    ) : (
                      <p>No home photos available.</p>
                    )}
                  </div>

                  {/* Valid IDs Card */}
                  <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 text-sm">
                    <h4 className="text-lg font-semibold mb-4">Valid IDs</h4>
                    {validIds.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {validIds.map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`Valid ID ${idx + 1}`}
                            className="w-full h-48 object-contain rounded-md"
                          />
                        ))}
                      </div>
                    ) : (
                      <p>No valid ID images available.</p>
                    )}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FullAdopterModal;
