import React, { useState, useEffect } from "react";
import NextButton from "../AdoptionProcess/NextButton";

const ShelterPersonalForm = ({ initialData = {}, onChange, onNext }) => {
  // State for each field
  const [shelterName, setShelterName] = useState(initialData.shelterName || "");
  const [shelterType, setShelterType] = useState(initialData.shelterType || "");
  const [yearEstablished, setYearEstablished] = useState(
    initialData.yearEstablished || ""
  );
  const [registrationNumber, setRegistrationNumber] = useState(
    initialData.registrationNumber || ""
  );

  // Primary Contact Person
  const [contactLastName, setContactLastName] = useState(
    initialData.contactLastName || ""
  );
  const [contactFirstName, setContactFirstName] = useState(
    initialData.contactFirstName || ""
  );
  const [contactMiddleInitial, setContactMiddleInitial] = useState(
    initialData.contactMiddleInitial || ""
  );
  const [contactNumber, setContactNumber] = useState(
    initialData.contactNumber || ""
  );
  const [address, setAddress] = useState(initialData.address || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [websiteOrSocial, setWebsiteOrSocial] = useState(
    initialData.websiteOrSocial || ""
  );

  // Referral Source
  const [referralSource, setReferralSource] = useState(
    initialData.referralSource || {
      friends: false,
      socialMedia: false,
      website: false,
      other: false,
    }
  );

  // Shelter Operations
  const [typeOfAnimals, setTypeOfAnimals] = useState(
    initialData.typeOfAnimals || ""
  );
  const [openingHours, setOpeningHours] = useState(
    initialData.openingHours || ""
  );
  const [closingHours, setClosingHours] = useState(
    initialData.closingHours || ""
  );
  const [areasCovered, setAreasCovered] = useState(
    initialData.areasCovered || ""
  );

  // Error state and submission attempt tracking
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false); // Prevents errors from showing initially

  // Function to validate form
  const validateForm = () => {
    const newErrors = {};

    if (!shelterName.trim())
      newErrors.shelterName = "Shelter Name is required.";
    if (!shelterType) newErrors.shelterType = "Shelter Type is required.";
    if (!yearEstablished.trim())
      newErrors.yearEstablished = "Year Established is required.";
    if (!registrationNumber.trim())
      newErrors.registrationNumber = "Registration Number is required.";
    if (!contactLastName.trim())
      newErrors.contactLastName = "Last Name is required.";
    if (!contactFirstName.trim())
      newErrors.contactFirstName = "First Name is required.";
    if (!contactNumber.trim())
      newErrors.contactNumber = "Contact Number is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid Email Address.";
    }
    if (!websiteOrSocial.trim())
      newErrors.websiteOrSocial = "Website/Social Media is required.";
    if (!Object.values(referralSource).some((val) => val))
      newErrors.referralSource = "Please select at least one referral source.";
    if (!typeOfAnimals.trim())
      newErrors.typeOfAnimals = "Type of Animals is required.";
    if (!openingHours.trim())
      newErrors.openingHours = "Opening Hours are required.";
    if (!closingHours.trim())
      newErrors.closingHours = "Closing Hours are required.";
    if (!areasCovered.trim())
      newErrors.areasCovered = "Areas Covered is required.";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  // Lift state to parent whenever it changes
  useEffect(() => {
    onChange &&
      onChange({
        shelterName,
        shelterType,
        yearEstablished,
        registrationNumber,
        contactLastName,
        contactFirstName,
        contactMiddleInitial,
        contactNumber,
        address,
        email,
        websiteOrSocial,
        referralSource,
        typeOfAnimals,
        openingHours,
        closingHours,
        areasCovered,
      });
  }, [
    shelterName,
    shelterType,
    yearEstablished,
    registrationNumber,
    contactLastName,
    contactFirstName,
    contactMiddleInitial,
    contactNumber,
    address,
    email,
    websiteOrSocial,
    referralSource,
    typeOfAnimals,
    openingHours,
    closingHours,
    areasCovered,
    onChange,
  ]);

  // Handle checkbox changes for referral source
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setReferralSource((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleNext = () => {
    setHasAttemptedSubmit(true); // Show errors only after clicking Next
    validateForm();

    if (!isFormValid) return; // Prevent navigation if form is invalid

    // Proceed to next step
    onNext &&
      onNext({
        shelterName,
        shelterType,
        yearEstablished,
        registrationNumber,
        contactLastName,
        contactFirstName,
        contactMiddleInitial,
        contactNumber,
        address,
        email,
        websiteOrSocial,
        referralSource,
        typeOfAnimals,
        openingHours,
        closingHours,
        areasCovered,
      });
  };

  return (
    <>
      {/* Heading */}
      <div className="flex flex-col gap-2 items-center mt-6 mb-6">
        <h1 className="font-arpona font-black text-4xl text-customBlue">
          Almost There!
        </h1>
        <p className="font-sans text-customBlue text-sm">
          Create an account in order to gain access to Pawtopia.
        </p>
      </div>

      {/* Form Container */}
      <section className="flex flex-col w-7/12 justify-center mx-auto">
        {/* Shelter Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shelter Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={shelterName}
            onChange={(e) => setShelterName(e.target.value)}
            className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
          />
          {errors.shelterName && (
            <p className="text-red-500 text-xs mt-1">{errors.shelterName}</p>
          )}
        </div>

        {/* Shelter Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shelter Type <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-4 mt-2">
            {["Non-Profit", "Government", "Private", "Independent Rescue"].map(
              (type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="shelterType"
                    value={type}
                    checked={shelterType === type}
                    onChange={(e) => setShelterType(e.target.value)}
                    className="h-4 w-4 text-primary border-gray-300 focus:outline-none"
                  />
                  <span className="ml-2 text-sm">{type}</span>
                </label>
              )
            )}
          </div>
          {errors.shelterType && (
            <p className="text-red-500 text-xs mt-1">{errors.shelterType}</p>
          )}
        </div>

        {/* Year Established & Registration Number */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Established <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={yearEstablished}
              onChange={(e) => setYearEstablished(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
            />
            {errors.yearEstablished && (
              <p className="text-red-500 text-xs mt-1">
                {errors.yearEstablished}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
            />
            {errors.registrationNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.registrationNumber}
              </p>
            )}
          </div>
        </div>

        {/* Primary Contact Person */}
        <h3 className="text-sm font-semibold text-customBlue mb-2">
          Primary Contact Person
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6 mb-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={contactLastName}
              onChange={(e) => setContactLastName(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
            />
            {errors.contactLastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contactLastName}
              </p>
            )}
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={contactFirstName}
              onChange={(e) => setContactFirstName(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
            />
            {errors.contactFirstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contactFirstName}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MI
            </label>
            <input
              type="text"
              value={contactMiddleInitial}
              onChange={(e) => setContactMiddleInitial(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
            />
            {errors.contactMiddleInitial && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contactMiddleInitial}
              </p>
            )}
          </div>
        </div>

        {/* Contact No. & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact No. <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contactNumber}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
            placeholder="name@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Website or Social Media Link */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website or Social Media Link <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={websiteOrSocial}
            onChange={(e) => setWebsiteOrSocial(e.target.value)}
            placeholder="Type N/A if none"
            className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
          />
          {errors.websiteOrSocial && (
            <p className="text-red-500 text-xs mt-1">
              {errors.websiteOrSocial}
            </p>
          )}
        </div>

        {/* Referral Source */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What prompted you to use Pawtopia?{" "}
            <span className="text-red-600">*</span>
          </label>
          <div className="flex justify-between flex-wrap gap-4 mt-2">
            {Object.entries(referralSource).map(([key, value]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary border-gray-400"
                />
                <span className="ml-2 text-sm">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </label>
            ))}
          </div>
          {errors.referralSource && (
            <p className="text-red-500 text-xs mt-1">{errors.referralSource}</p>
          )}
        </div>

        {/* Type of Animals, Opening Hours, Closing Hours */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Animals <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={typeOfAnimals}
              onChange={(e) => setTypeOfAnimals(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
              placeholder="e.g. Dogs, Cats"
            />
            {errors.typeOfAnimals && (
              <p className="text-red-500 text-xs mt-1">
                {errors.typeOfAnimals}
              </p>
            )}
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opening Hours <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
              placeholder="e.g. 8:00 AM"
            />
            {errors.openingHours && (
              <p className="text-red-500 text-xs mt-1">{errors.openingHours}</p>
            )}
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Closing Hours <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={closingHours}
              onChange={(e) => setClosingHours(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
              placeholder="e.g. 5:00 PM"
            />
            {errors.closingHours && (
              <p className="text-red-500 text-xs mt-1">{errors.closingHours}</p>
            )}
          </div>
        </div>

        {/* Areas Covered */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Areas Covered <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={areasCovered}
            onChange={(e) => setAreasCovered(e.target.value)}
            className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm"
            placeholder="e.g. neighboring provinces, etc."
          />
          {errors.areasCovered && (
            <p className="text-red-500 text-xs mt-1">{errors.areasCovered}</p>
          )}
        </div>

        {/* Next Button */}
        <div className="flex justify-center mt-8 mb-6">
          <NextButton onClick={handleNext} disabled={!isFormValid} />
        </div>
      </section>
    </>
  );
};

export default ShelterPersonalForm;
