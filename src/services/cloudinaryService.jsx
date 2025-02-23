export const uploadToCloudinary = async (files, folder = "post_photos") => {
  if (!files || files.length === 0) {
    console.error("❌ No files to upload.");
    return [];
  }

  const phpFunctionURL =
    "https://pawtopia.scarlet2.io/cloudinary-signature.php"; // Replace with actual URL

  try {
    console.log("📡 Fetching signed Cloudinary credentials from PHP...");
    const signatureResponse = await fetch(phpFunctionURL);

    if (!signatureResponse.ok) {
      throw new Error(
        `❌ Failed to fetch signature: ${signatureResponse.statusText}`
      );
    }

    const {
      timestamp,
      signature,
      api_key,
      folder: returnedFolder,
    } = await signatureResponse.json();

    console.log("✅ Received signed credentials:", {
      timestamp,
      signature,
      api_key,
      returnedFolder,
    });

    const uploadedUrls = [];

    const finalFolder = returnedFolder || folder;

    for (const file of files) {
      console.log(`🚀 Uploading file: ${file.name}`);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("upload_preset", "pawtopia");
      formData.append("folder", finalFolder);

      // 🔹 Determine if file is an image or a video
      const fileType = file.type.startsWith("video/") ? "video" : "image";
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dukzrb2xm/${fileType}/upload`;

      try {
        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `❌ Cloudinary upload failed (${response.status}):`,
            errorText
          );
          throw new Error(`Cloudinary upload failed: ${errorText}`);
        }

        const data = await response.json();
        console.log("✅ Upload success:", data.secure_url);
        uploadedUrls.push(data.secure_url);
      } catch (error) {
        console.error("❌ Error uploading to Cloudinary:", error);
        throw error;
      }
    }

    return uploadedUrls;
  } catch (error) {
    console.error("❌ Error fetching Cloudinary credentials:", error);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) {
    console.error("❌ No public_id provided for deletion.");
    return;
  }

  const phpFunctionURL =
    "https://pawtopia.scarlet2.io/cloudinary-signature.php?requestType=delete&public_id=" +
    publicId;

  try {
    console.log("📡 Fetching signed Cloudinary credentials for deletion...");
    const signatureResponse = await fetch(phpFunctionURL);

    if (!signatureResponse.ok) {
      throw new Error(
        `❌ Failed to fetch signature: ${signatureResponse.statusText}`
      );
    }

    const { timestamp, signature, api_key } = await signatureResponse.json();

    console.log("✅ Received signed credentials for deletion:", {
      timestamp,
      signature,
      api_key,
      publicId,
    });

    const formData = new FormData();
    formData.append("api_key", api_key);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("public_id", publicId);

    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/dukzrb2xm/image/destroy";

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `❌ Cloudinary delete failed (${response.status}):`,
        errorText
      );
      throw new Error(`Cloudinary delete failed: ${errorText}`);
    }

    console.log("✅ Successfully deleted from Cloudinary:", publicId);
    return true;
  } catch (error) {
    console.error("❌ Error deleting from Cloudinary:", error);
    return false;
  }
};
