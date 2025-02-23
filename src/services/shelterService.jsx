import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { uploadToCloudinary } from "./cloudinaryService";

export const submitShelterForms = async ({
  personalData,
  legitimacyData,
  animalWelfareCert,
  businessPermit,
}) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("❌ User not authenticated");
    throw new Error("User not authenticated");
  }

  console.log("✅ User authenticated:", user.uid);

  try {
    console.log("📤 Uploading Animal Welfare Certificate...");
    const animalWelfareCertUrls =
      animalWelfareCert && animalWelfareCert.length > 0
        ? await uploadToCloudinary(animalWelfareCert, "shelter_certificates")
        : [];

    console.log(
      "✅ Animal Welfare Certificate Uploaded:",
      animalWelfareCertUrls
    );

    console.log("📤 Uploading Business Permit...");
    const businessPermitUrls =
      businessPermit && businessPermit.length > 0
        ? await uploadToCloudinary(businessPermit, "shelter_permits")
        : [];

    console.log("✅ Business Permit Uploaded:", businessPermitUrls);

    // Combine media URLs with the personal form data
    const personalDataWithMedia = {
      ...personalData,
      mediaUrls: {
        animalWelfareCert: animalWelfareCertUrls,
        businessPermit: businessPermitUrls,
      },
    };

    // Remove File objects from legitimacyData before saving to Firestore
    const legitimacyDataWithoutFiles = { ...legitimacyData };
    delete legitimacyDataWithoutFiles.animalWelfareCert;
    delete legitimacyDataWithoutFiles.businessPermit;

    // Log final data before updating Firestore
    const finalData = {
      shelterData: {
        personal: personalDataWithMedia,
        legitimacy: legitimacyDataWithoutFiles,
      },
      isVerified: false, // Initial status as pending verification
    };

    console.log("📤 Updating Firestore with shelter data:", finalData);

    // Update Firestore with shelter data
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, finalData);

    console.log("✅ Firestore update successful! Shelter data uploaded.");

    // Now update the `isVerified` status to `true`
    await updateDoc(userDocRef, { isVerified: true });

    console.log("✅ Shelter verification completed! isVerified set to true.");
  } catch (error) {
    console.error("❌ Error in submitShelterForms:", error.message);
    throw new Error(`Submission failed: ${error.message}`);
  }
};
