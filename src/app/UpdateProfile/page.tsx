'use client'
import { authClient, updateUser } from '@/lib/auth-client';
import { Avatar, Button, FieldError, Form, Input, Label, Spinner, TextField } from '@heroui/react';

import React, { useState } from 'react';

const UpdateProfile = () => {
    const { data: session, isPending } = authClient.useSession();
    const [isUpdating, setIsUpdating] = useState(false);
     const user = session?.user;
   
     // Loading
     if (isPending) {
       return (
         <div className="min-h-[70vh] flex items-center justify-center">
           <Spinner size="lg" />
         </div>
       );
     }

     const handleUpdateProfile = async (
        e: React.FormEvent<HTMLFormElement>
      ) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const resData = await updateUser({
        name: userData.name as string,
        image: userData.image as string
    })
    setIsUpdating(false);
   }

    return (
        <div>
             <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 px-4 py-10">

{/* Card */}
<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-200">

  {/* Header */}
  <div className="text-center mb-7">

    {/* Current Avatar */}
    <div className="flex justify-center mb-4">
    <Avatar  className="h-32 w-32 border-4 border-white text-3xl shadow-lg">
                <Avatar.Image  alt="John Doe" src={user?.image || ""} />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
    </div>

    <h1 className="text-2xl font-bold text-gray-900">
      Edit Profile
    </h1>

    <p className="mt-2 text-sm text-gray-500">
      Update your profile information
    </p>
  </div>

  {/* Form */}
  <Form
    className="flex w-full flex-col gap-5"
    onSubmit={handleUpdateProfile}
  >

    {/* Name */}
    <TextField
      isRequired
      name="name"
      defaultValue={user?.name || ""}
    >
      <Label className="font-medium text-gray-800">
        Name
      </Label>

      <Input
        placeholder="Enter your name"
        className="text-gray-900 placeholder:text-gray-400"
      />

      <FieldError />
    </TextField>

    {/* Image URL */}
    <TextField
      name="image"
      defaultValue={user?.image || ""}
    >
      <Label className="font-medium text-gray-800">
        Profile Image URL
      </Label>

      <Input
        type="url"
        placeholder="https://example.com/image.jpg"
        className="text-gray-900 placeholder:text-gray-400"
      />

      <FieldError />
    </TextField>

    {/* Email - Read Only */}
    <TextField
      name="email"
      defaultValue={user?.email || ""}
      isReadOnly
    >
      <Label className="font-medium text-gray-800">
        Email
      </Label>

      <Input
        className="text-gray-500 bg-gray-100"
      />
    </TextField>

    {/* Button */}
    <Button
      type="submit"
      isDisabled={isUpdating}
      className="w-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
    >
      {isUpdating ? "Updating..." : "Update Profile"}
    </Button>

  </Form>
</div>
</div>
        </div>
    );
};

export default UpdateProfile;