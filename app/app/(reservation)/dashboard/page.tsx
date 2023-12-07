import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { SignOutBtn } from "./_components/signout-btn";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col items-center justify-center">
      <pre>{JSON.stringify(session?.user, null, 4)}</pre>
      <SignOutBtn />
    </div>
  );
}
