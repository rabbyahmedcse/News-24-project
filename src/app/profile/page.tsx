"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Spinner } from "@heroui/react";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Loading
  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            You are not signed in
          </h1>

          <p className="mt-2 text-gray-500">
            Please sign in to view your profile.
          </p>

          <Link href="/signin">
            <Button className="mt-5 bg-blue-600 text-white hover:bg-blue-700">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 px-4 py-10">

      {/* Profile Card */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-200">

        {/* Top Section */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />

        {/* Profile Content */}
        <div className="px-8 pb-8">

          {/* Avatar */}
          <div className="-mt-16 flex justify-center">
        
        <Avatar  className="h-32 w-32 border-4 border-white text-3xl shadow-lg">
                <Avatar.Image  alt="John Doe" src={session?.user.image} />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
             
          
          </div>

          {/* Name */}
          <div className="mt-5 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.name}
            </h1>

            {/* Email */}
            <p className="mt-2 text-sm text-gray-500">
              {user.email}
            </p>
          </div>

          {/* User Information */}
          <div className="mt-8 space-y-4">

            {/* Name */}
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Name
              </p>

              <p className="mt-1 text-base font-semibold text-gray-800">
                {user.name}
              </p>
            </div>

            {/* Email */}
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Email
              </p>

              <p className="mt-1 break-all text-base font-semibold text-gray-800">
                {user.email}
              </p>
            </div>

            {/* Image URL */}
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Profile Image
              </p>

              <p className="mt-1 break-all text-sm text-gray-600">
                {user.image || "No profile image"}
              </p>
            </div>

          </div>

          {/* Edit Profile Button */}
        <Link href={'/UpdateProfile'}>
        <Button
            className="mt-7 w-full bg-blue-600 font-semibold text-white hover:bg-blue-700"
          >
            Edit Profile
          </Button>
        </Link>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;