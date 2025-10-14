"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Logo from "../ui/logo";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

const FormLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();



  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: data.email,
          password: data.password,
        }),
        credentials: "include", 
      });

      const response = await res.json();

      if (!res.ok) {
        const message = response?.detail || "Invalid email or password";
        setError("email", { type: "manual", message });
        setError("password", { type: "manual", message });
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("email", {
        type: "manual",
        message: "Network error. Try again later.",
      });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/login/google";
  };

  return (
    <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center mb-4">
        <Logo size={40} />
      </div>
      <h2 className="text-center text-lg sm:text-xl font-medium">
        Log In to <span className="font-bold">Resumely</span>
      </h2>

      <div className="flex flex-col gap-1 ">
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
          <p className="text-red-900 text-[12px]">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1 ">
        <Input
          className="py-4 rounded-sm w-full"
          type="password"
          placeholder="•••••••••••••••••"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="text-red-900 text-[12px]">{errors.password.message}</p>
        )}
        <div className="flex justify-start mt-1 items-center text-[12px]">
          <Link
            href={"/forgot-password"}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        <Button type="submit" className="w-full cursor-pointer">
          Log In
        </Button>
        <Button
          type="button"
          onClick={() => handleGoogleLogin()}
          className="w-full cursor-pointer dark:bg-[#232222] dark:text-white bg-white border text-black hover:bg-[#f0f0f0] flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          <span>Continue with Google</span>
        </Button>
      </div>

      <div className="flex justify-center">
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link
            className="text-blue-400 cursor-pointer hover:underline"
            href={"/signup"}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default FormLogin;
