"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

import { paths } from "@/schemas/api-schema";
import { deleteReservableAction } from "../_actions/delete-reservable";
import { toast } from "sonner";

type TReservableItem = paths["/api/reservables/"]["get"]["responses"]["200"]["content"]["application/json"][0];


export function DeleteReservableDialog({ open, setOpen, reservable }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, reservable: TReservableItem }) {

  const handleDelete = async () => {
    const res = await deleteReservableAction(reservable.id as number)
    if (res.ok) {
      toast.success("Reservable deleted")
      setOpen(false)
    } else {
      toast.error("Failed to delete reservable")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete
          </AlertDialogTitle>
        </AlertDialogHeader>
        Are you sure you want to delete {reservable.name}?
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
