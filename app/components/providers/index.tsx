"use client";

import { PropsWithChildren } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { DayPickerProvider } from "react-day-picker";

export const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

// export const DateProvider = ({ children }: PropsWithChildren) => {
//   return <DayPickerProvider>{children}</DayPickerProvider>;
// }

export function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <NextAuthProvider>
      {/* <DateProvider> */}
      <TooltipProvider>{children}</TooltipProvider>
      {/* </DateProvider> */}
    </NextAuthProvider>
  );
}
