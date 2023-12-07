"use client";

import { PropsWithChildren } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <NextAuthProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </NextAuthProvider>
  );
}
