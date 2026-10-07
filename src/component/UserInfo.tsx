"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, Button, Spinner } from "@heroui/react";
import Link from "next/link";

const UserInfo = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="absolute top-4 right-5">
        <Spinner size="sm" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="absolute top-4 right-5 grid grid-cols-1 items-center gap-2">
        {/* Profile */}
        <Link href="/profile">
          <Avatar>
            <Avatar.Image
              alt={session.user.name || "User"}
              src={session.user.image || undefined}
            />

            <Avatar.Fallback>
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </Avatar.Fallback>
          </Avatar>
        </Link>

        {/* Name */}
        <span className="max-w-[190px] truncate text-sm font-medium text-gray-800">
          {session.user.name}
        </span>

        {/* Sign Out */}
        <Button
          size="sm"
          onPress={() => signOut()}
          className="h-8 min-w-0 rounded-md bg-red-600 px-3 text-xs font-medium text-white hover:bg-red-700"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-5 flex items-center gap-4">
      <Link
        href="/signin"
        className="text-sm font-medium text-gray-700 hover:text-red-600"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default UserInfo;