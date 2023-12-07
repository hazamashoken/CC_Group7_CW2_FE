"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateReservableForm } from "./reservable-create-form";
import React from "react";

export function CreateReservableDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Create Reservable</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateReservableForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
