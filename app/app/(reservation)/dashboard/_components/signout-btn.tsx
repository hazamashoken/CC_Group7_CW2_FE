"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function SignOutBtn({ className }: { className?: string }) {
  return (
    <Button
      className={className}
      onClick={() => {
        signOut();
      }}
    >
      SignOut
    </Button>
  );
}
