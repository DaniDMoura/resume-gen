import FormLogin from "@/components/form/form-login";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Resumely | Login",
};

const Login = () => {
  return (
    <>
      <Header />
      <section className="mx-[4vw] sm:px-6 md:px-8 border my-[4vh] rounded-[3px] min-h-[83vh] flex justify-center items-center">
        <div className="w-full max-w-md space-y-8">
          <FormLogin/>
        </div>
      </section>
    </>
  );
};

export default Login;
