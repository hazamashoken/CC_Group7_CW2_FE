import React from "react";
import Image from "next/image";

import NutriTrackLogoColored from "@/public/NutriTruck_Logo_color.svg";
import WaveLightMobile from "@/public/mobile_wave_light.svg";

import { LoginForm } from "./_components/login-form";
import { Card } from "@/components/ui/card";
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
    <Card >
      <h1 >
        Login
      </h1>
      <LoginForm />
    </Card>
  );
}
