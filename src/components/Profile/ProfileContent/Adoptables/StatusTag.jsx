import React from "react";
import useAdoptionTagStatus from "../../../../hooks/useAdoptionTagStatus";

const StatusTag = ({ postId, requestId }) => {
  const status = useAdoptionTagStatus(postId, requestId);

  const statusStyles = {
    "Looking for a Forever Home": "bg-cyan-500",
    reviewing: "bg-yellow-500",
    approved: "bg-green-600",
    adopted: "bg-green-500",
    declined: "bg-red-500",
    Loading: "bg-gray-400",
    Unknown: "bg-gray-400",
  };

  const style = statusStyles[status] || "bg-gray-400";

  return (
    <div className="flex">
      <span
        className={`${style} rounded-full text-white py-1 px-8 flex items-center`}
      >
        {status}
      </span>
    </div>
  );
};

export default StatusTag;
