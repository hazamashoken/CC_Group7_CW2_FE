import { SignUpForm } from "./_components/signup-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <h1>
        Sign Up
      </h1>
      <SignUpForm />
    </div>
  );
}
