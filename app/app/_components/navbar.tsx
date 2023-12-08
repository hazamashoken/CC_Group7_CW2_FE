"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { Session } from "next-auth";

import { NAV_CONFIG } from "./config";
import Link from "next/link";
import { signOut } from "next-auth/react";
import React from "react";

type ITopBarProps = {
  session?: Session;
};

export function TopBar(props: ITopBarProps) {
  const { session } = props;
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className="sticky top-0 flex justify-end px-2 py-1 mb-2 bg-primary">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <div className="flex flex-col items-center space-x-2 md:flex-row">
              <div>
                <p className="text-lg font-bold">
                  {session?.user
                    ? `${session?.user.first_name} ${session?.user.last_name}`
                    : "Firstname LastName"}
                </p>
                <p className="\">{session?.user.email ?? "user@email.com"}</p>
              </div>
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-2">
            {NAV_CONFIG.map((item, index: number) => {
              return (
                <Link key={index} href={item.path} prefetch={false}>
                  <Button
                    variant="link"
                    className="justify-start w-full space-x-5"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <item.icon />
                    <p>{item.name}</p>
                  </Button>
                </Link>
              );
            })}
            <Button
              variant="link"
              onClick={() => signOut()}
              className="justify-start space-x-5"
            >
              <LogOut />
              <p>Sign Out</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex">
        {NAV_CONFIG.map((item, index: number) => {
          return (
            <Link key={index} href={item.path} prefetch={false}>
              <Button variant="link" className="text-secondary">
                {item.name}
              </Button>
            </Link>
          );
        })}
        <Button
          variant="link"
          onClick={() => signOut()}
          className="text-secondary"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
