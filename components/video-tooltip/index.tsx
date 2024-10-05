import React, { useState } from "react";

type VideoTooltipProps = {
  videoUrl: string;
  isMobile: boolean;
};

const VideoTooltip: React.FC<VideoTooltipProps> = ({ videoUrl, isMobile }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle hover for desktop (tooltip)
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsTooltipOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsTooltipOpen(false);
    }
  };

  // Handle click for mobile (modal)
  const handleClick = () => {
    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative cursor-pointer"
    >
      {/* Tooltip for desktop */}
      {isTooltipOpen && !isMobile && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-black rounded-md z-50">
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            className="w-40 h-24 rounded-md"
          />
        </div>
      )}

      {/* Modal for mobile */}
      {isModalOpen && isMobile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white rounded-md p-4 max-w-lg w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1"
            >
              Close
            </button>
            <video
              src={videoUrl}
              autoPlay
              muted
              controls
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTooltip;
