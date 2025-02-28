import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAdopterProfile,
  subscribeAdoptionMetrics,
} from "../../../services/getAdopterBioService";
import AdopterProfileSkeleton from "./AdopterProfileSkeleton";

const AdopterProfileBio = () => {
  const { userId } = useParams(); // ✅ Extract userId from route
  const [adopterData, setAdopterData] = useState(null);
  const [metrics, setMetrics] = useState({
    adoptedCount: 0,
    pendingCount: 0,
    commentCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const profile = await fetchAdopterProfile(userId);
      if (profile) {
        setAdopterData(profile);
      }
      setLoading(false);
    };

    getProfile();

    // Subscribe to real-time adoption metrics
    const unsubscribe = subscribeAdoptionMetrics(userId, setMetrics);

    return () => unsubscribe();
  }, [userId]);

  if (loading) return <AdopterProfileSkeleton />;
  if (!adopterData) return <p>Profile not found!</p>;

  const { adoptionData, createdAt, userName, coverImage } = adopterData;
  const personal = adoptionData?.personal || {};
  const { gender, hobbies = [] } = personal;

  const furTitle = gender === "Male" ? "FURDADDY" : "FURMOMMY";
  const accountDate = createdAt?.seconds
    ? new Date(createdAt.seconds * 1000).toLocaleDateString()
    : "N/A";

  return (
    <div className="w-full bg-slate-100 shadow-sm rounded-xl border overflow-hidden">
      {/* Cover Image Section */}
      <div className="relative">
        <div
          className="w-full h-32 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              coverImage ||
              "https://i.pinimg.com/736x/b6/d2/f2/b6d2f2322c3662377705607936e66441.jpg"
            })`,
          }}
        ></div>
      </div>

      {/* Profile Details */}
      <div className="mt-2 ml-6 mb-8">
        <p className="font-medium text-lg">@{userName}</p>
        <span className="text-xs bg-blue-200 text-slate-800 px-3 py-1 rounded-full">
          {furTitle}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid font-sans grid-cols-2 gap-4 mb-4 px-4 mt-4">
        <div>
          <p className="text-sm font-medium">{metrics.adoptedCount}</p>
          <p className="text-xs text-gray-500">Adopted Pets</p>
        </div>
        <div>
          <p className="text-sm font-medium">{metrics.pendingCount}</p>
          <p className="text-xs text-gray-500">Pending Requests</p>
        </div>
        <div>
          <p className="text-sm font-medium">{accountDate}</p>
          <p className="text-xs text-gray-500">Account Made</p>
        </div>
        <div>
          <p className="text-sm font-medium">{metrics.commentCount}</p>
          <p className="text-xs text-gray-500">Commented Posts</p>
        </div>
      </div>

      <hr />

      {/* Hobbies Section */}
      <div className="mt-4 px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium">Hobbies</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {hobbies.length > 0 ? (
            hobbies.map((hobby, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 px-3 py-1 rounded-full"
              >
                {hobby}
              </span>
            ))
          ) : (
            <p className="text-xs text-gray-400">No hobbies yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdopterProfileBio;
