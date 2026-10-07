"use client";

import { authClient, signIn, signUp } from "@/lib/auth-client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";


const SingUpPage = () => {
  const handleSignUpButton = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("from er data", data);

    const { data: resData, error } = await signUp.email({
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
      image: data.image as string,
      rememberMe: true,
      callbackURL: "/",
    });
 if(resData){
   toast.success("Successfully Sign up")
 
  redirect('/');
 }
 else{
  toast.error("Try again")
 }
    console.log("after submit", resData, error);
  };
  const handleGoogleSignIn = async()=>{
    const resData = await signIn.social({
      provider:'google'
    })
  }
  const handleGithubSignIn = async()=>{
    const data = await authClient.signIn.social({
      provider: "github"
  })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      {/* Signup Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-200">

        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Create your account to get started
          </p>
        </div>

        <Form
          className="flex w-full flex-col gap-5"
          onSubmit={handleSignUpButton}
        >

          {/* Name */}
          <TextField
            isRequired
            name="name"
            className="text-gray-900"
          >
            <Label className="text-gray-800 font-medium">
              Name
            </Label>

            <Input
              className="text-gray-900 placeholder:text-gray-400"
              placeholder="Enter your name"
            />

            <FieldError />
          </TextField>


          {/* Image URL */}
          <TextField
            name="image"
            className="text-gray-900"
          >
            <Label className="text-gray-800 font-medium">
              Profile Image URL
            </Label>

            <Input
              type="url"
              className="text-gray-900 placeholder:text-gray-400"
              placeholder="https://example.com/image.jpg"
            />

            <Description className="text-gray-500">
              Enter your profile image URL
            </Description>

            <FieldError />
          </TextField>


          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="text-gray-900"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="text-gray-800 font-medium">
              Email
            </Label>

            <Input
              className="text-gray-900 placeholder:text-gray-400"
              placeholder="john@example.com"
            />

            <FieldError />
          </TextField>


          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="text-gray-900"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="text-gray-800 font-medium">
              Password
            </Label>

            <Input
              className="text-gray-900 placeholder:text-gray-400"
              placeholder="Enter your password"
            />

            <Description className="text-gray-500">
              Minimum 8 characters, 1 uppercase letter and 1 number
            </Description>

            <FieldError />
          </TextField>


          {/* Buttons */}
          <div className="flex gap-3 pt-2">

            <Button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Create Account
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="px-6 text-gray-700 border border-gray-300"
            >
              Reset
            </Button>

          </div>

        </Form>

        {/* Bottom Text */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
            Sign In
          </span>
        </p>
            <Button onClick={handleGoogleSignIn}>In Google</Button>
            <Button onClick={handleGithubSignIn}>In Github</Button>
      </div>
    </div>
  );
};

export default SingUpPage;