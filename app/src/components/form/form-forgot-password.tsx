"use client";
import React, { useState } from "react";
import Logo from "../ui/logo";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
}

const FormForgotPassword = () => {
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setSendSuccess(true);
      const res = await fetch(
        `http://localhost:8000/auth/forgot-password?email=${data.email}`,
        {
          method: "POST",
        }
      );

      const response = await res.json();

      if (!res.ok) {
        setError("root", {
          type: "manual",
          message: response.detail || "Unexpected error occurred",
        });
      }
    } catch {
      setError("email", {
        type: "manual",
        message: "Network error. Try again later.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-[4vw] sm:px-6 md:px-8 border-x rounded-[3px] min-h-[91vh] flex justify-center items-center"
    >
      <div className="flex flex-col gap-3 text-center">
        <div className="flex text-center items-center gap-2 space- flex-col">
          <Logo />
          <h1 className="text-lg sm:text-xl font-medium">
            Reset your <span className="font-bold">password</span>
          </h1>
          <p className="text-sm opacity-75">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        <div className="flex flex-col items-start justify-start gap-2">
          <Input
            className="py-4 rounded-sm w-full"
            placeholder="nick@site.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-900 ml-1 text-[12px]">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={sendSuccess}
          className="w-full cursor-pointer"
        >
          Send reset link
        </Button>
        <p className="text-[12px] opacity-75">
          Remember your password?{" "}
          <Link href={"/login"} className="text-blue-400">
            Back to login
          </Link>
        </p>
        {sendSuccess && (
          <p className="text-[13px] opacity-75 text-emerald-800 font-medium shadow-2xl">
            If the email exists, instructions have been sent.
          </p>
        )}
      </div>
    </form>
  );
};

export default FormForgotPassword;
