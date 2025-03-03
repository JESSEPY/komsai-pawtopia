import React, { useState, useEffect } from "react";
import NextButton from "./NextButton";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "./CustomDatePicker";
import dayjs from "dayjs";

const PersonalForm = ({ initialData = {}, onChange, onNext }) => {
  const [firstName, setFirstName] = useState(initialData.firstName || "");
  const [lastName, setLastName] = useState(initialData.lastName || "");
  const [middleInitial, setMiddleInitial] = useState(
    initialData.middleInitial || ""
  );
  const [birthDate, setBirthDate] = useState(
    initialData.birthDate ? dayjs(initialData.birthDate) : null
  );
  const [gender, setGender] = useState(initialData.gender || "");
  const [contactNumber, setContactNumber] = useState(
    initialData.contactNumber || ""
  );
  const [address, setAddress] = useState(initialData.address || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [occupation, setOccupation] = useState(initialData.occupation || "");
  const [businessName, setBusinessName] = useState(
    initialData.businessName || ""
  );
  const [isEmployed, setIsEmployed] = useState(
    initialData.isEmployed !== undefined ? initialData.isEmployed : true
  );
  const [socialMediaLink, setSocialMediaLink] = useState(
    initialData.socialMediaLink || ""
  );
  const [status, setStatus] = useState(initialData.status || "");
  const [firstTimeAdopting, setFirstTimeAdopting] = useState(
    initialData.firstTimeAdopting || ""
  );
  const [adoptionReasons, setAdoptionReasons] = useState(
    initialData.adoptionReasons || {
      friends: false,
      socialMedia: false,
      website: false,
      others: false,
    }
  );
  const [alternativeContactFirstName, setAlternativeContactFirstName] =
    useState(initialData.alternativeContact?.firstName || "");
  const [alternativeContactLastName, setAlternativeContactLastName] = useState(
    initialData.alternativeContact?.lastName || ""
  );
  const [alternativeContactMiddleInitial, setAlternativeContactMiddleInitial] =
    useState(initialData.alternativeContact?.middleInitial || "");
  const [alternativeContactBirthDate, setAlternativeContactBirthDate] =
    useState(
      initialData.alternativeContact?.birthDate
        ? dayjs(initialData.alternativeContact.birthDate)
        : null
    );
  const [alternativeContactRelationship, setAlternativeContactRelationship] =
    useState(initialData.alternativeContact?.relationship || "");
  const [alternativeContactContactNumber, setAlternativeContactContactNumber] =
    useState(initialData.alternativeContact?.contactNumber || "");
  const [errors, setErrors] = useState({});

  // Update parent's state whenever a field changes
  useEffect(() => {
    onChange &&
      onChange({
        firstName,
        lastName,
        middleInitial,
        birthDate: birthDate ? birthDate.toISOString() : null,
        gender,
        contactNumber,
        address,
        email,
        occupation,
        businessName,
        isEmployed,
        socialMediaLink,
        status,
        firstTimeAdopting,
        adoptionReasons,
        alternativeContact: {
          firstName: alternativeContactFirstName,
          lastName: alternativeContactLastName,
          middleInitial: alternativeContactMiddleInitial,
          birthDate: alternativeContactBirthDate
            ? alternativeContactBirthDate.toISOString()
            : null,
          relationship: alternativeContactRelationship,
          contactNumber: alternativeContactContactNumber,
        },
      });
  }, [
    firstName,
    lastName,
    middleInitial,
    birthDate,
    gender,
    contactNumber,
    address,
    email,
    occupation,
    businessName,
    isEmployed,
    socialMediaLink,
    status,
    firstTimeAdopting,
    adoptionReasons,
    alternativeContactFirstName,
    alternativeContactLastName,
    alternativeContactMiddleInitial,
    alternativeContactBirthDate,
    alternativeContactRelationship,
    alternativeContactContactNumber,
    onChange,
  ]);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAdoptionReasons((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleNext = () => {
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!birthDate) {
      newErrors.birthDate = "Birth date is required";
    }
    if (!contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d+$/.test(contactNumber.trim())) {
      newErrors.contactNumber = "Contact number must contain only numbers";
    }
    if (!address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!occupation.trim()) {
      newErrors.occupation = "Occupation is required";
    }
    if (
      !adoptionReasons.friends &&
      !adoptionReasons.socialMedia &&
      !adoptionReasons.website &&
      !adoptionReasons.others
    ) {
      newErrors.adoptionReasons = "Please select at least one reason";
    }
    if (!firstTimeAdopting) {
      newErrors.firstTimeAdopting = "This field is required";
    }
    if (
      alternativeContactContactNumber &&
      !/^\d+$/.test(alternativeContactContactNumber.trim())
    ) {
      newErrors.alternativeContactContactNumber =
        "Alternate contact number must contain only numbers";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const personalData = {
      firstName,
      lastName,
      middleInitial,
      birthDate: birthDate.toISOString(),
      gender,
      contactNumber,
      address,
      email,
      occupation,
      businessName,
      isEmployed,
      socialMediaLink,
      status,
      firstTimeAdopting,
      adoptionReasons,
      alternativeContact: {
        firstName: alternativeContactFirstName,
        lastName: alternativeContactLastName,
        middleInitial: alternativeContactMiddleInitial,
        birthDate: alternativeContactBirthDate
          ? alternativeContactBirthDate.toISOString()
          : null,
        relationship: alternativeContactRelationship,
        contactNumber: alternativeContactContactNumber,
      },
    };
    onNext && onNext(personalData);
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-center mt-6 mb-6">
        <h1 className="font-arpona font-black text-4xl text-customBlue">
          You’re almost done!
        </h1>
        <p className="font-sans text-customBlue text-sm">
          Create an account in order to gain access to Pawtopia.
        </p>
      </div>
      <section className="flex flex-col w-7/12 justify-center mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>

          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MI
            </label>
            <input
              type="text"
              name="middleInitial"
              value={middleInitial}
              onChange={(e) => setMiddleInitial(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mt-6">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700">
              Birth Date<span className="text-red-600">*</span>
            </label>
            <CustomDatePicker value={birthDate} onChange={setBirthDate} />
            {errors.birthDate && (
              <p className="text-red-500 text-xs">{errors.birthDate}</p>
            )}
          </div>

          <div className="md:col-span-5 mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <div className="flex items-center gap-12">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:outline-none focus:ring-primary"
                />
                <span className="ml-2 text-xs">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:outline-none focus:ring-primary"
                />
                <span className="ml-2 text-xs">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Prefer not to say"
                  checked={gender === "Prefer not to say"}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:outline-none focus:ring-primary"
                />
                <span className="ml-2 text-xs">Prefer not to say</span>
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs">{errors.contactNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address}</p>
            )}
          </div>
        </div>
        <div className="md:col-span-10 mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email<span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Occupation<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="occupation"
              value={occupation}
              placeholder="Type N/A if unemployed"
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.occupation && (
              <p className="text-red-500 text-xs">{errors.occupation}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Business Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="occupation"
              value={businessName}
              placeholder="Type N/A if not applicable"
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.businessName && (
              <p className="text-red-500 text-xs">{errors.businessName}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Social Media Link
            </label>
            <input
              type="text"
              name="socialMediaLink"
              value={socialMediaLink}
              onChange={(e) => setSocialMediaLink(e.target.value)}
              placeholder="Enter your social media link"
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="flex items-center gap-16 mt-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Single"
                  checked={status === "Single"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:outline-none focus:ring-primary"
                />
                <span className="ml-2 text-xs">Single</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Married"
                  checked={status === "Married"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:outline-none focus:ring-primary"
                />
                <span className="ml-2 text-xs">Married</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Others"
                  checked={status === "Others"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:outline-none focus:ring-primary"
                />
                <span className="ml-2 text-xs">Others</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What prompted you to adopt from Pawtopia?
            <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-wrap justify-between mt-3 gap-2">
            <label className="flex items-center w-full md:w-auto">
              <input
                type="checkbox"
                name="friends"
                checked={adoptionReasons.friends}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-primary"
              />
              <span className="ml-2 text-xs">Friends</span>
            </label>
            <label className="flex items-center w-full md:w-auto">
              <input
                type="checkbox"
                name="socialMedia"
                checked={adoptionReasons.socialMedia}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-primary"
              />
              <span className="ml-2 text-xs">Social Media</span>
            </label>
            <label className="flex items-center w-full md:w-auto">
              <input
                type="checkbox"
                name="website"
                checked={adoptionReasons.website}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-primary"
              />
              <span className="ml-2 text-xs">Website</span>
            </label>
            <label className="flex items-center w-full md:w-auto">
              <input
                type="checkbox"
                name="others"
                checked={adoptionReasons.others}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-primary"
              />
              <span className="ml-2 text-xs">Others</span>
            </label>
          </div>
          {errors.adoptionReasons && (
            <p className="text-red-500 text-xs mt-1">
              {errors.adoptionReasons}
            </p>
          )}
        </div>
        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Is this your first time adopting a pet?
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-12 mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="firstTimeAdopting"
                value="Yes"
                checked={firstTimeAdopting === "Yes"}
                onChange={(e) => setFirstTimeAdopting(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-primary"
              />
              <span className="ml-2 text-xs">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="firstTimeAdopting"
                value="No"
                checked={firstTimeAdopting === "No"}
                onChange={(e) => setFirstTimeAdopting(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-primary"
              />
              <span className="ml-2 text-xs">No</span>
            </label>
          </div>
          {errors.firstTimeAdopting && (
            <p className="text-red-500 text-xs">{errors.firstTimeAdopting}</p>
          )}
        </div>
        <div className="mt-6 md:col-span-10">
          <h2 className="text-lg font-sans text-customBlue font-semibold">
            Alternative Contact
          </h2>
          <div className="w-3/4">
            <p className="text-sm text-gray-600 mt-1">
              If the adopter is a minor, a parent or a guardian must be the
              alternative contact and co-sign the application.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6 mt-6">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="alternativeContactFirstName"
              value={alternativeContactFirstName}
              onChange={(e) => setAlternativeContactFirstName(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="alternativeContactLastName"
              value={alternativeContactLastName}
              onChange={(e) => setAlternativeContactLastName(e.target.value)}
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MI
            </label>
            <input
              type="text"
              name="alternativeContactMiddleInitial"
              value={alternativeContactMiddleInitial}
              onChange={(e) =>
                setAlternativeContactMiddleInitial(e.target.value)
              }
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mt-6">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Date<span className="text-red-600">*</span>
            </label>
            <CustomDatePicker
              value={alternativeContactBirthDate}
              onChange={setAlternativeContactBirthDate}
            />
          </div>
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="relationship"
              value={alternativeContactRelationship}
              onChange={(e) =>
                setAlternativeContactRelationship(e.target.value)
              }
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mt-6">
          <div className="md:col-span-5 mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number<span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={alternativeContactContactNumber}
              onChange={(e) =>
                setAlternativeContactContactNumber(e.target.value)
              }
              placeholder="Enter contact number"
              className="w-full px-4 py-2 border bg-formBg border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.alternativeContactContactNumber && (
              <p className="text-red-500 text-xs">
                {errors.alternativeContactContactNumber}
              </p>
            )}
          </div>
        </div>
        <div className="md:grid-cols-10 flex justify-center items-center mt-12 mb-6">
          <NextButton onClick={handleNext} />
        </div>
      </section>
    </>
  );
};

export default PersonalForm;
