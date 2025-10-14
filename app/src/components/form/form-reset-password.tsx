"use client";
import React from "react";
import Logo from "../ui/logo";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

interface FormData {
  password: string;
  confirmPassword: string;
}

const FormResetPassword = () => {
  const params = useParams();
  const email_token = params.token as string;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data.password != data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Password boxes must be equal",
      });
      setError("password", {
        type: "manual",
        message: "Password boxes must be equal",
      });

      return;
    }
    try {
      const res = await fetch("http://localhost:8000/auth/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          new_password: data.password,
          email_token: email_token,
        }),
      });

      const response = await res.json();

      if (!res.ok) {
        setError("password", {
          type: "manual",
          message: "Unexpected error occurred",
        });
        setError("confirmPassword", {
          type: "manual",
          message: "Unexpected error occurred",
        });

        return;
      }
      router.push("/login");
    } catch {
      setError("password", {
        type: "manual",
        message: "Network error. Try again later.",
      });
      setError("confirmPassword", {
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
      <div className="flex flex-col gap-3 w-100 text-center">
        <div className="flex text-center items-center gap-2  flex-col">
          <Logo />
          <h1 className="text-lg sm:text-xl font-medium">
            Reset your <span className="font-bold">password</span>
          </h1>
          <p className="text-sm opacity-75">
            Please enter and confirm your new password
          </p>
        </div>

        <div className="flex flex-col items-start justify-start gap-2">
          <Input
            className="py-4 rounded-sm w-full"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-900 ml-1 text-[12px]">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <Input
            className="py-4 rounded-sm w-full"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-900 ml-1 text-[12px]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Reset password
        </Button>
        <p className="text-[12px] opacity-75">
          Remember your password?{" "}
          <Link href={"/login"} className="text-blue-400">
            Back to login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default FormResetPassword;
