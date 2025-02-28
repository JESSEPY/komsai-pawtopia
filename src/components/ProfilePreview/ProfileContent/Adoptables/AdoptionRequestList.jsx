import React, { useRef, useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";

const fallbackAvatar =
  "https://res.cloudinary.com/dukzrb2xm/image/upload/v1739252813/post_photos/elravq5jv3i9tp66yrsm.png";

const AdoptionRequestsList = ({ requests }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const combinedRequests = [...requests];

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Row = ({ index, style }) => {
    const req = combinedRequests[index];
    const profileImage = req.avatarUrl ? req.avatarUrl : fallbackAvatar;

    return (
      <div
        key={req.id}
        style={style}
        onClick={() => setSelectedRequest(req)}
        className="flex flex-col items-center cursor-pointer"
      >
        <div
          className={`w-14 h-14 rounded-full border-4 flex items-center justify-center overflow-hidden ${
            selectedRequest?.id === req.id
              ? "border-altTagColor"
              : "border-gray-300"
          }`}
        >
          <img
            src={profileImage}
            alt={req.adopterName}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = fallbackAvatar)}
          />
        </div>
        <p className="text-xs mt-1">{req.adopterName}</p>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="mb-2 w-full">
      <h3 className="text-lg font-semibold mb-2">Adoption Requests</h3>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <List
          height={100}
          itemCount={combinedRequests.length}
          itemSize={80}
          layout="horizontal"
          width={containerWidth || 450}
        >
          {Row}
        </List>
      </div>

      {/* Selected Adopter Info Section */}
      {selectedRequest ? (
        <div className="bg-hoverColor px-4 py-8 rounded-xl mt-4">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-sm mb-2">
              Adopter's Basic Information
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-800">{selectedRequest.adopterName}</p>
              <p className="text-gray-800">
                {selectedRequest.status || "Pending"}
              </p>
              <p className="text-gray-800">{selectedRequest.gender || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-800">
                {selectedRequest.birthdate
                  ? new Date(selectedRequest.birthdate).toLocaleDateString()
                  : "Unknown"}
              </p>
              <p className="text-gray-800">
                {selectedRequest.contactNumber || "N/A"}
              </p>
              <p className="text-gray-800">{selectedRequest.adopterEmail}</p>
            </div>
          </div>

          {/* Download Form Section */}
          {selectedRequest.pdfLink && (
            <div className="flex flex-col gap-1 mt-4 mb-4">
              <h3 className="text-sm font-semibold mb-2">
                Download Adopter's Full Form
              </h3>
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-600 text-xs bg-gray-200 p-2 rounded-lg">
                  {selectedRequest.adopterName}_full_form.pdf
                </div>
              </div>
              <a
                href={selectedRequest.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 border-2 text-sm border-primary text-center justify-center rounded-xl flex items-center gap-1"
              >
                Download Now
              </a>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">
          Select an adoption request to view details.
        </p>
      )}
    </div>
  );
};

export default AdoptionRequestsList;
