import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      
      <div className="flex flex-col items-center">

        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />

        {/* Loading Text */}
        <h2 className="mt-5 text-xl font-semibold text-gray-800">
          Loading...
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Please wait a moment
        </p>

      </div>

    </div>
  );
};

export default LoadingPage;