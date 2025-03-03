import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "./TextArea";
import FileUpload from "./FileUpload";
import SubmitAdoptionButton from "./SubmitAdoptionProcessButton";
import {
  showErrorSwal,
  showSuccessSwal,
  showUploadingSwal,
} from "../ListAPet/Swalloader";
import { useAdoptionSubmit } from "../../hooks/useAdoptionProcessSubmit";

const QuestionnaireForm = ({
  initialData = {},
  onChange,
  onNext,
  personalData,
}) => {
  const navigate = useNavigate();
  const [adoptionPreference, setAdoptionPreference] = useState(
    initialData.adoptionPreference || ""
  );
  const [specificAnimal, setSpecificAnimal] = useState(
    initialData.specificAnimal || ""
  );
  const [idealPetDescription, setIdealPetDescription] = useState(
    initialData.idealPetDescription || ""
  );
  const [buildingType, setBuildingType] = useState(
    initialData.buildingType || ""
  );
  const [rent, setRent] = useState(initialData.rent || "");
  const [petMovePlan, setPetMovePlan] = useState(initialData.petMovePlan || "");
  const [allergyResponse, setAllergyResponse] = useState(
    initialData.allergyResponse || ""
  );
  const [careResponsibility, setCareResponsibility] = useState(
    initialData.careResponsibility || ""
  );
  const [
    financialResponsibilityDescription,
    setFinancialResponsibilityDescription,
  ] = useState(initialData.financialResponsibilityDescription || "");
  const [petCareDescription, setPetCareDescription] = useState(
    initialData.petCareDescription || ""
  );
  const [hoursAlone, setHoursAlone] = useState(initialData.hoursAlone || "");
  const [petIntroductionSteps, setPetIntroductionSteps] = useState(
    initialData.petIntroductionSteps || ""
  );
  const [familySupport, setFamilySupport] = useState(
    initialData.familySupport || ""
  );
  const [pastPets, setPastPets] = useState(initialData.pastPets || "");
  const [livingArrangements, setLivingArrangements] = useState(
    initialData.livingArrangements || {
      livingAlone: false,
      spouse: false,
      parents: false,
      childrenOver18: false,
      childrenBelow18: false,
      relatives: false,
      roommates: false,
    }
  );
  const [homePhotos, setHomePhotos] = useState(initialData.homePhotos || []);
  const [validId, setValidId] = useState(initialData.validId || []);
  const [errors, setErrors] = useState({});

  const { submitAdoption } = useAdoptionSubmit();

  // Lift state to parent
  useEffect(() => {
    onChange &&
      onChange({
        adoptionPreference,
        specificAnimal,
        idealPetDescription,
        buildingType,
        rent,
        petMovePlan,
        allergyResponse,
        careResponsibility,
        financialResponsibilityDescription,
        petCareDescription,
        hoursAlone,
        petIntroductionSteps,
        familySupport,
        pastPets,
        livingArrangements,
        homePhotos,
        validId,
      });
  }, [
    adoptionPreference,
    specificAnimal,
    idealPetDescription,
    buildingType,
    rent,
    petMovePlan,
    allergyResponse,
    careResponsibility,
    financialResponsibilityDescription,
    petCareDescription,
    hoursAlone,
    petIntroductionSteps,
    familySupport,
    pastPets,
    livingArrangements,
    homePhotos,
    validId,
    onChange,
  ]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLivingArrangements((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleHomePhotosChange = (files) => {
    setHomePhotos(files);
  };

  const handleValidIdChange = (files) => {
    setValidId(files);
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!adoptionPreference) {
      newErrors.adoptionPreference =
        "Please select what you're looking to adopt.";
    }
    if (!specificAnimal) {
      newErrors.specificAnimal =
        "Please indicate if you're applying for a specific shelter animal.";
    }
    if (!idealPetDescription.trim()) {
      newErrors.idealPetDescription = "Please describe your ideal pet.";
    }
    if (!buildingType) {
      newErrors.buildingType = "Please select your building type.";
    }
    if (!rent) {
      newErrors.rent = "Please indicate if you rent.";
    }
    if (!petMovePlan.trim()) {
      newErrors.petMovePlan =
        "Please explain what happens to your pet if or when you move.";
    }
    if (!Object.values(livingArrangements).some((val) => val)) {
      newErrors.livingArrangements =
        "Please select at least one option for who you live with.";
    }
    if (!allergyResponse) {
      newErrors.allergyResponse =
        "Please indicate if any household member is allergic to animals.";
    }
    if (!careResponsibility.trim()) {
      newErrors.careResponsibility =
        "Please describe who will be responsible for caring for your pet.";
    }
    if (!financialResponsibilityDescription.trim()) {
      newErrors.financialResponsibilityDescription =
        "Please explain who will be financially responsible for your pet.";
    }
    if (!petCareDescription.trim()) {
      newErrors.petCareDescription =
        "Please explain who will look after your pet if you're away.";
    }
    if (!hoursAlone.trim()) {
      newErrors.hoursAlone =
        "Please specify how many hours your pet will be left alone.";
    }
    if (!petIntroductionSteps.trim()) {
      newErrors.petIntroductionSteps =
        "Please describe the steps you will take to introduce your pet.";
    }
    if (!familySupport) {
      newErrors.familySupport =
        "Please indicate if your family supports your decision.";
    }
    if (!pastPets) {
      newErrors.pastPets = "Please indicate if you have had pets in the past.";
    }
    if (!homePhotos || homePhotos.length === 0) {
      newErrors.homePhotos = "Please upload photos of your home.";
    }
    if (!validId || validId.length === 0) {
      newErrors.validId = "Please upload a valid ID.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Construct questionnaire data (exclude file objects from Firestore payload)
    const questionnaireData = {
      adoptionPreference,
      specificAnimal,
      idealPetDescription,
      buildingType,
      rent,
      petMovePlan,
      allergyResponse,
      careResponsibility,
      financialResponsibilityDescription,
      petCareDescription,
      hoursAlone,
      petIntroductionSteps,
      familySupport,
      pastPets,
      livingArrangements,
    };

    // Optionally update parent's state
    onNext && onNext(questionnaireData);

    // Show loading swal
    showUploadingSwal();

    try {
      await submitAdoption({
        personalData, // from parent
        questionnaireData,
        homePhotos, // file objects for Cloudinary upload
        validIds: validId, // file objects for Cloudinary upload
      });
      showSuccessSwal("Adoption submitted successfully!");

      // Clear all fields after success
      setAdoptionPreference("");
      setSpecificAnimal("");
      setIdealPetDescription("");
      setBuildingType("");
      setRent("");
      setPetMovePlan("");
      setAllergyResponse("");
      setCareResponsibility("");
      setFinancialResponsibilityDescription("");
      setPetCareDescription("");
      setHoursAlone("");
      setPetIntroductionSteps("");
      setFamilySupport("");
      setPastPets("");
      setLivingArrangements({
        livingAlone: false,
        spouse: false,
        parents: false,
        childrenOver18: false,
        childrenBelow18: false,
        relatives: false,
        roommates: false,
      });
      setHomePhotos([]);
      setValidId([]);

      // Navigate to /home
      navigate("/home");
    } catch (submissionError) {
      showErrorSwal("Submission failed: " + submissionError.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-center mt-6 mb-6">
        <h1 className="font-arpona font-black text-4xl text-customBlue">
          Your Pet is now within sight!
        </h1>
        <p className="font-sans text-customBlue text-sm">
          Please be as detailed as possible, in order for the process to go
          smoothly
        </p>
      </div>
      <section className="flex flex-col w-7/12 justify-center mx-auto">
        {/* Adoption Choices */}
        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What are you looking to adopt?
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-16 mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="adoptionPreference"
                value="Dog"
                checked={adoptionPreference === "Dog"}
                onChange={(e) => setAdoptionPreference(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Dog</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="adoptionPreference"
                value="Cat"
                checked={adoptionPreference === "Cat"}
                onChange={(e) => setAdoptionPreference(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Cat</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="adoptionPreference"
                value="Both"
                checked={adoptionPreference === "Both"}
                onChange={(e) => setAdoptionPreference(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Both</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="adoptionPreference"
                value="Not Decided"
                checked={adoptionPreference === "Not Decided"}
                onChange={(e) => setAdoptionPreference(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Not Decided</span>
            </label>
          </div>
          {errors.adoptionPreference && (
            <p className="text-red-500 text-xs mt-1">
              {errors.adoptionPreference}
            </p>
          )}
        </div>

        {/* Shelter Animal */}
        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Are you applying to adopt a specific shelter animal?
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-12 mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="specificAnimal"
                value="Yes"
                checked={specificAnimal === "Yes"}
                onChange={(e) => setSpecificAnimal(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="specificAnimal"
                value="No"
                checked={specificAnimal === "No"}
                onChange={(e) => setSpecificAnimal(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">No</span>
            </label>
          </div>
          {errors.specificAnimal && (
            <p className="text-red-500 text-xs mt-1">{errors.specificAnimal}</p>
          )}
        </div>

        <TextArea
          label="Describe your ideal pet, including its sex, age, appearance, temperament, etc."
          value={idealPetDescription}
          onChange={(e) => setIdealPetDescription(e.target.value)}
          required={true}
        />
        {errors.idealPetDescription && (
          <p className="text-red-500 text-xs mt-1">
            {errors.idealPetDescription}
          </p>
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What type of Building do you live in?
            <span className="text-red-600">*</span>
          </label>
          <div className="flex justify-between mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="buildingType"
                value="House"
                checked={buildingType === "House"}
                onChange={(e) => setBuildingType(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">House</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="buildingType"
                value="Apartment"
                checked={buildingType === "Apartment"}
                onChange={(e) => setBuildingType(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Apartment</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="buildingType"
                value="Condo"
                checked={buildingType === "Condo"}
                onChange={(e) => setBuildingType(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Condo</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="buildingType"
                value="Other"
                checked={buildingType === "Other"}
                onChange={(e) => setBuildingType(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Other</span>
            </label>
          </div>
          {errors.buildingType && (
            <p className="text-red-500 text-xs mt-1">{errors.buildingType}</p>
          )}
        </div>

        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Do you rent?
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-12 mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="rent"
                value="Yes"
                checked={rent === "Yes"}
                onChange={(e) => setRent(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="rent"
                value="No"
                checked={rent === "No"}
                onChange={(e) => setRent(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">No</span>
            </label>
          </div>
          {errors.rent && (
            <p className="text-red-500 text-xs mt-1">{errors.rent}</p>
          )}
        </div>

        <TextArea
          label="What happens to your pet if or when you move?"
          value={petMovePlan}
          onChange={(e) => setPetMovePlan(e.target.value)}
          required={true}
        />
        {errors.petMovePlan && (
          <p className="text-red-500 text-xs mt-1">{errors.petMovePlan}</p>
        )}

        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Who do you live with?<span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col gap-2 mt-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="livingAlone"
                checked={livingArrangements.livingAlone}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-sm">living alone</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="spouse"
                checked={livingArrangements.spouse}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-sm">spouse</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="parents"
                checked={livingArrangements.parents}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-sm">parents</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="childrenOver18"
                checked={livingArrangements.childrenOver18}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-sm">children over 18</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="childrenBelow18"
                checked={livingArrangements.childrenBelow18}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-sm">children below 18</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="relatives"
                checked={livingArrangements.relatives}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-sm">relatives</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="roommates"
                checked={livingArrangements.roommates}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-sm">roommate(s)</span>
            </label>
          </div>
          {errors.livingArrangements && (
            <p className="text-red-500 text-xs mt-1">
              {errors.livingArrangements}
            </p>
          )}
        </div>

        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Are any members of your household allergic to animals?
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-12 mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="allergy"
                value="Yes"
                checked={allergyResponse === "Yes"}
                onChange={(e) => setAllergyResponse(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="allergy"
                value="No"
                checked={allergyResponse === "No"}
                onChange={(e) => setAllergyResponse(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">No</span>
            </label>
          </div>
          {errors.allergyResponse && (
            <p className="text-red-500 text-xs mt-1">
              {errors.allergyResponse}
            </p>
          )}
        </div>

        <TextArea
          label="Who will be responsible for feeding, grooming, and generally caring for your pet?"
          value={careResponsibility}
          onChange={(e) => setCareResponsibility(e.target.value)}
          required={true}
        />
        {errors.careResponsibility && (
          <p className="text-red-500 text-xs mt-1">
            {errors.careResponsibility}
          </p>
        )}

        <TextArea
          label="Who will be financially responsible for your pet's needs (i.e., food, vet bills, etc.)?"
          value={financialResponsibilityDescription}
          onChange={(e) =>
            setFinancialResponsibilityDescription(e.target.value)
          }
          required={true}
        />
        {errors.financialResponsibilityDescription && (
          <p className="text-red-500 text-xs mt-1">
            {errors.financialResponsibilityDescription}
          </p>
        )}

        <TextArea
          label="Who will look after your pet if you go on vacation or in case of emergency?"
          value={petCareDescription}
          onChange={(e) => setPetCareDescription(e.target.value)}
          required={true}
        />
        {errors.petCareDescription && (
          <p className="text-red-500 text-xs mt-1">
            {errors.petCareDescription}
          </p>
        )}

        <TextArea
          label="How many hours in your average work day will your pet be left alone?"
          value={hoursAlone}
          onChange={(e) => setHoursAlone(e.target.value)}
          required={true}
        />
        {errors.hoursAlone && (
          <p className="text-red-500 text-xs mt-1">{errors.hoursAlone}</p>
        )}

        <TextArea
          label="What steps will you take to introduce your new pet to his/her surroundings?"
          value={petIntroductionSteps}
          onChange={(e) => setPetIntroductionSteps(e.target.value)}
          required={true}
        />
        {errors.petIntroductionSteps && (
          <p className="text-red-500 text-xs mt-1">
            {errors.petIntroductionSteps}
          </p>
        )}

        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Does everyone in the family support your decision in adopting a pet?
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-12 mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="familySupport"
                value="Yes"
                checked={familySupport === "Yes"}
                onChange={(e) => setFamilySupport(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="familySupport"
                value="No"
                checked={familySupport === "No"}
                onChange={(e) => setFamilySupport(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">No</span>
            </label>
          </div>
          {errors.familySupport && (
            <p className="text-red-500 text-xs mt-1">{errors.familySupport}</p>
          )}
        </div>

        <div className="mt-6 md:col-span-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Have you had any pets in the past?
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-12 mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="pastPets"
                value="Yes"
                checked={pastPets === "Yes"}
                onChange={(e) => setPastPets(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="pastPets"
                value="No"
                checked={pastPets === "No"}
                onChange={(e) => setPastPets(e.target.value)}
                className="h-4 w-4 text-primary border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="ml-2 text-radioForm text-sm">No</span>
            </label>
          </div>
          {errors.pastPets && (
            <p className="text-red-500 text-xs mt-1">{errors.pastPets}</p>
          )}
        </div>

        <div className="mt-6 md:col-span-10">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Please attach photos of your home — This has replaced our on-site
            ocular inspections
            <span className="text-red-600">*</span>
          </h3>
          <ol className="list-decimal ml-6 text-gray-600">
            <li className="text-sm">Front of the house</li>
            <li className="text-sm">Street photo</li>
            <li className="text-sm">Living room</li>
            <li className="text-sm">Dining area</li>
            <li className="text-sm">Kitchen</li>
            <li className="text-sm">
              Bedroom/s (if your pet will have access)
            </li>
            <li className="text-sm">Front & Backyard (if adopting a dog)</li>
          </ol>
        </div>

        <p className="text-sm text-customBlue mt-6">
          We value your privacy. Your photos won't be used for any purpose other
          than this adoption application.
        </p>
        <FileUpload onFilesChange={handleHomePhotosChange} />
        {errors.homePhotos && (
          <p className="text-red-500 text-xs mt-1">{errors.homePhotos}</p>
        )}
        <p className="text-gray-700 text-sm mt-6">
          Upload a Valid ID<span className="text-red-600">*</span>
          <br />
          <span className="text-xs text-gray-500">
            For your privacy, please hide or blur sensitive details such as your
            ID number, address, barcode, and signature. Only your name and photo
            should remain visible for verification.
          </span>
        </p>
        <FileUpload onFilesChange={handleValidIdChange} />
        {errors.validId && (
          <p className="text-red-500 text-xs mt-1">{errors.validId}</p>
        )}
        <div className="md:grid-cols-10 flex justify-center items-center mt-12 mb-6">
          <SubmitAdoptionButton onClick={handleSubmit} />
        </div>
      </section>
    </>
  );
};

export default QuestionnaireForm;
