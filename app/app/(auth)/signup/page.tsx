import { SignUpForm } from "./_components/signup-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
    <div className="w-full m-auto bg-white lg:max-w-lg">
    <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
      <SignUpForm />
      </Card>
      </div>
    </div>
  );
}
