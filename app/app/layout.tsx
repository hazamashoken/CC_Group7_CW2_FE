import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { TopBar } from "./_components/navbar";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reservation App",
  description: "Reservation App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          {session && <TopBar session={session} />}
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
