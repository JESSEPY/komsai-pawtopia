import React, { Fragment } from "react";
import {
  Dialog,
  Transition,
  DialogPanel,
  TransitionChild,
  DialogTitle,
} from "@headlessui/react";

const FullShelterModal = ({ isOpen, onClose, selectedShelter }) => {
  if (!selectedShelter) return null;

  // Extract Shelter Data
  const { personal = {}, legitimacy = {} } = selectedShelter;
  const { mediaUrls = {} } = personal;
  const { animalWelfareCert = [], businessPermit = [] } = mediaUrls;

  // Helper function to render key-value pairs as cards
  const renderInfoCard = (label, value) => (
    <div className="bg-white border border-gray-300 shadow rounded-xl p-4">
      <strong>{label}</strong>
      <p className="mt-1 text-gray-700">{value || "N/A"}</p>
    </div>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Background Overlay */}
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

        {/* Fullscreen Container */}
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
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>

              {/* Main Container */}
              <div className="max-w-6xl mx-auto p-4 md:p-6">
                {/* Title */}
                <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 mb-6">
                  <DialogTitle className="text-2xl font-semibold text-gray-900 mb-2">
                    Full Shelter Information
                  </DialogTitle>
                  <p className="text-sm text-gray-600">
                    Complete details about the shelter.
                  </p>
                </div>

                {/* Shelter Information Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Shelter Basic Info */}
                  <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 col-span-1">
                    <h4 className="text-lg font-semibold mb-4">
                      Shelter Information
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      {renderInfoCard("Shelter Name", personal.shelterName)}
                      {renderInfoCard("Type", personal.shelterType)}
                      {renderInfoCard(
                        "Registration Number",
                        personal.registrationNumber
                      )}
                      {renderInfoCard(
                        "Established Year",
                        personal.yearEstablished
                      )}
                      {renderInfoCard("Location", personal.address)}
                      {renderInfoCard("Areas Covered", personal.areasCovered)}
                    </div>
                  </div>

                  {/* Shelter Contact Information */}
                  <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 col-span-2">
                    <h4 className="text-lg font-semibold mb-4">
                      Contact Information
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {renderInfoCard(
                        "Contact Name",
                        `${personal.contactFirstName} ${personal.contactLastName}`
                      )}
                      {renderInfoCard("Phone Number", personal.contactNumber)}
                      {renderInfoCard("Email", personal.email)}
                      {renderInfoCard("Social Media", personal.websiteOrSocial)}
                    </div>
                  </div>
                </div>

                {/* Legitimacy Information */}
                <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Legitimacy Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderInfoCard(
                      "Spay/Neuter Policy",
                      legitimacy.spayNeuterPolicy
                    )}
                    {renderInfoCard(
                      "Vaccination Policy",
                      legitimacy.vaccinationPolicy
                    )}
                    {renderInfoCard(
                      "Fostering & Volunteering",
                      legitimacy.fosteringVolunteering
                    )}
                  </div>
                </div>

                {/* Shelter Operations */}
                <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4">Operations</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {renderInfoCard("Type of Animals", personal.typeOfAnimals)}
                    {renderInfoCard("Opening Hours", personal.openingHours)}
                    {renderInfoCard("Closing Hours", personal.closingHours)}
                  </div>
                </div>

                {/* Uploaded Documents */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Animal Welfare Certificate */}
                  <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 text-sm">
                    <h4 className="text-lg font-semibold mb-4">
                      Animal Welfare Certificate
                    </h4>
                    {animalWelfareCert.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {animalWelfareCert.map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`Animal Welfare Certificate ${idx + 1}`}
                            className="w-full h-48 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    ) : (
                      <p>No certificates available.</p>
                    )}
                  </div>

                  {/* Business Permit */}
                  <div className="bg-white border border-gray-300 shadow rounded-xl p-4 md:p-6 text-sm">
                    <h4 className="text-lg font-semibold mb-4">
                      Business Permit
                    </h4>
                    {businessPermit.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {businessPermit.map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`Business Permit ${idx + 1}`}
                            className="w-full h-48 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    ) : (
                      <p>No business permits available.</p>
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

export default FullShelterModal;
