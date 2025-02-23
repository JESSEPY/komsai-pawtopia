import React, { useState, useEffect } from "react";
import FileUpload from "../AdoptionProcess/FileUpload";
import SubmitShelterProcessButton from "./SubmitShelterProcessButton";
// or wherever you place it
import { useShelterProcessSubmit } from "../../hooks/useShelterProcessSubmit";
import { useNavigate } from "react-router-dom";

const ShelterLegitimacyForm = ({
  initialData = {},
  onChange,
  onNext,
  personalData,
}) => {
  const [spayNeuterPolicy, setSpayNeuterPolicy] = useState(
    initialData.spayNeuterPolicy || ""
  );
  const [vaccinationPolicy, setVaccinationPolicy] = useState(
    initialData.vaccinationPolicy || ""
  );
  const [fosteringVolunteering, setFosteringVolunteering] = useState(
    initialData.fosteringVolunteering || ""
  );

  // File uploads
  const [animalWelfareCert, setAnimalWelfareCert] = useState(
    initialData.animalWelfareCert || []
  );
  const [businessPermit, setBusinessPermit] = useState(
    initialData.businessPermit || []
  );

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Lift state up
  useEffect(() => {
    onChange &&
      onChange({
        spayNeuterPolicy,
        vaccinationPolicy,
        fosteringVolunteering,
        animalWelfareCert,
        businessPermit,
      });
  }, [
    spayNeuterPolicy,
    vaccinationPolicy,
    fosteringVolunteering,
    animalWelfareCert,
    businessPermit,
    onChange,
  ]);

  const { submitShelter } = useShelterProcessSubmit();

  const handleSubmit = async () => {
    const newErrors = {};
    if (!spayNeuterPolicy)
      newErrors.spayNeuterPolicy =
        "Please indicate your spaying/neutering policy.";
    if (!vaccinationPolicy)
      newErrors.vaccinationPolicy = "Please indicate your vaccination policy.";
    if (!fosteringVolunteering)
      newErrors.fosteringVolunteering =
        "Please indicate if you have fostering/volunteering programs.";
    if (!animalWelfareCert.length)
      newErrors.animalWelfareCert =
        "Please upload the Animal Welfare Certificate.";
    if (!businessPermit.length)
      newErrors.businessPermit = "Please upload the Business Permit.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    await submitShelter({
      personalData, // Ensure personalData is included in submission
      legitimacyData: {
        spayNeuterPolicy,
        vaccinationPolicy,
        fosteringVolunteering,
      },
      animalWelfareCert,
      businessPermit,
    });

    // Navigate to /home
    navigate("/home");
  };

  const handleFileChange = (files, field) => {
    if (field === "animalWelfareCert") {
      setAnimalWelfareCert(files);
    } else if (field === "businessPermit") {
      setBusinessPermit(files);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-center mt-6 mb-6">
        <h1 className="font-arpona font-black text-4xl text-customBlue">
          Almost There!
        </h1>
        <p className="font-sans text-customBlue text-sm">
          Create an account in order to gain access to Pawtopia.
        </p>
      </div>
      <section className="flex flex-col w-7/12 justify-center mx-auto">
        {/* Spaying/Neutering Policy */}
        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Spaying/Neutering Policy (If pets are spayed/neutered before
            adoption)
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-12 mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="spayNeuterPolicy"
                value="Yes"
                checked={spayNeuterPolicy === "Yes"}
                onChange={(e) => setSpayNeuterPolicy(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none"
              />
              <span className="ml-2 text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="spayNeuterPolicy"
                value="No"
                checked={spayNeuterPolicy === "No"}
                onChange={(e) => setSpayNeuterPolicy(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none"
              />
              <span className="ml-2 text-sm">No</span>
            </label>
          </div>
          {errors.spayNeuterPolicy && (
            <p className="text-red-500 text-xs mt-1">
              {errors.spayNeuterPolicy}
            </p>
          )}
        </div>

        {/* Vaccination & Medical Care */}
        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vaccination & Medical Care (Are pets fully vaccinated before
            adoption?)
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-12 mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="vaccinationPolicy"
                value="Yes"
                checked={vaccinationPolicy === "Yes"}
                onChange={(e) => setVaccinationPolicy(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none"
              />
              <span className="ml-2 text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="vaccinationPolicy"
                value="No"
                checked={vaccinationPolicy === "No"}
                onChange={(e) => setVaccinationPolicy(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none"
              />
              <span className="ml-2 text-sm">No</span>
            </label>
          </div>
          {errors.vaccinationPolicy && (
            <p className="text-red-500 text-xs mt-1">
              {errors.vaccinationPolicy}
            </p>
          )}
        </div>

        {/* Fostering & Volunteering */}
        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fostering & Volunteering Programs
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-12 mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="fosteringVolunteering"
                value="Yes"
                checked={fosteringVolunteering === "Yes"}
                onChange={(e) => setFosteringVolunteering(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none"
              />
              <span className="ml-2 text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="fosteringVolunteering"
                value="No"
                checked={fosteringVolunteering === "No"}
                onChange={(e) => setFosteringVolunteering(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none"
              />
              <span className="ml-2 text-sm">No</span>
            </label>
          </div>
          {errors.fosteringVolunteering && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fosteringVolunteering}
            </p>
          )}
        </div>

        {/* Privacy note */}
        <p className="text-sm text-customBlue mt-6">
          We value your privacy. Your photos won't be used for any other purpose
          than this registration process application.
        </p>

        {/* Animal Welfare Registration Certificate */}
        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Animal Welfare Registration Certificate
            <span className="text-red-600">*</span>
          </label>
          <FileUpload
            onFilesChange={(files) =>
              handleFileChange(files, "animalWelfareCert")
            }
          />
          {errors.animalWelfareCert && (
            <p className="text-red-500 text-xs mt-1">
              {errors.animalWelfareCert}
            </p>
          )}
        </div>

        {/* Business Permit */}
        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Permit
            <span className="text-red-600">*</span>
          </label>
          <FileUpload
            onFilesChange={(files) => handleFileChange(files, "businessPermit")}
          />
          {errors.businessPermit && (
            <p className="text-red-500 text-xs mt-1">{errors.businessPermit}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:grid-cols-10 flex justify-center items-center mt-12 mb-6">
          <SubmitShelterProcessButton onClick={handleSubmit} />
        </div>
      </section>
    </>
  );
};

export default ShelterLegitimacyForm;
