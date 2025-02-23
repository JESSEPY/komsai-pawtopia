import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import MediaUpload from "./MediaUpload";
import TagsInput from "./TagsInput";
import ShelterProfilesMockData from "../Profile/ShelterProfilesMockData";
import CreatePostTabs from "./CreatePostTabs";
import TagModal from "./TagModal";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useUserProfile } from "../../hooks/userProfile";
const List = () => {
  // Tag Modal useState
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  //Trial data

  const { userProfile, loading } = useUserProfile();

  // ✅ Extract `userName` exactly as it appears in Firestore
  const {
    userName = "Loading...", // ✅ Use correct case-sensitive field
    profilePicUrl = "https://pawtopia.scarlet2.io/images/image.png",
    isVerified = false,
    adoptablesCount = 0,
    successfulAdoptionCount = 0,
    profileDescription = "",
  } = userProfile || {}; // Prevents errors if userProfile is null
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const [tags, setTags] = useState([]);

  return (
    <>
      <div className="container flex flex-col gap-4 relative p-4">
        <button
          onClick={handleBackClick}
          className="rounded-ful transition-colors"
        >
          <ArrowLeftCircleIcon
            className="h-12 w-12 text-[#4F4F4F] transition hover:text-primary duration-300"
            strokeWidth={0.8}
          />
        </button>
        <h1 className="text-xl font-bold">Create a Post</h1>

        {/* Profile */}
        <div className="rounded-3xl gap-2 flex border-2 border-primary py-1 bg-listProfileBg w-32 items-center justify-center">
          <img src={profilePicUrl} alt="" className="h-6 w-6 rounded-full" />
          <p className="text-sm">{userName}</p>
        </div>

        {/* Tabs */}

        <CreatePostTabs />
      </div>
    </>
  );
};

export default List;
