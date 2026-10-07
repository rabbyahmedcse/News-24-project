"use client";

import { authClient, signIn } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";

const SignInPge = () => {
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("before sign in", data);

    const { data: resData, error } = await signIn.email({
      email: data.email as string,
      password: data.password as string,
      rememberMe: true,
      callbackURL: "/",
    });

    if(resData){
      toast.success('Log in successfully')
    }
    else{
      toast.error('Invalid Email or Password')
    }
  };
  const handleGoogleSignIn= async()=>{
    const data = await authClient.signIn.social({
      provider: "google",
    });
  }
  const handleGithubSignIn= async()=>{
    const data = await authClient.signIn.social({
      provider: "github"
  })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      {/* Sign In Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-200">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <Form
          className="flex w-full flex-col gap-5"
          render={(props) => (
            <form {...props} data-custom="foo" />
          )}
          onSubmit={onSubmit}
        >

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


          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>


          {/* Buttons */}
          <div className="flex gap-3 pt-2">

            <Button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              <Check />
              Sign In
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
        <p className="mt-7 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
        <Button onClick={handleGoogleSignIn}>In google</Button>
        <Button onClick={handleGithubSignIn}>In Github</Button>

      </div>
    </div>
  );
};

export default SignInPge;