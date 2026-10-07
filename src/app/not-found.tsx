"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      
      <div className="text-center">

        {/* 404 */}
        <h1 className="text-[120px] font-extrabold leading-none text-red-600 drop-shadow-sm">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-gray-500">
          Sorry, the page you are looking for doesn't exist or may have
          been moved to another location.
        </p>

        {/* Button */}
        <div className="mt-7 flex justify-center">
          <Link href="/">
            <Button
              className="rounded-lg bg-red-600 px-7 py-3 font-semibold text-white shadow-md hover:bg-red-700"
            >
              Go Back Home
            </Button>
          </Link>
        </div>

        {/* Small text */}
        <p className="mt-6 text-sm text-gray-400">
          Error Code: 404
        </p>

      </div>
    </div>
  );
};

export default NotFound;