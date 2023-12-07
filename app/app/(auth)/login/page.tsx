import React from "react";
import Image from "next/image";

import NutriTrackLogoColored from "@/public/NutriTruck_Logo_color.svg";
import WaveLightMobile from "@/public/mobile_wave_light.svg";

import { LoginForm } from "./_components/login-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";

type ILoginFormProps = {};

export default async function LoginPage(props: ILoginFormProps) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
}
