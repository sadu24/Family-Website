import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-75"></div>

        {/* Loading Text */}
        <p className="text-lg font-medium text-gray-500">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}

export default Loading;
