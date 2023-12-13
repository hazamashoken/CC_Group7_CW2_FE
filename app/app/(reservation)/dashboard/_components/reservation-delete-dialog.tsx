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
import { deleteReservation } from "../_actions/delete-reservation";
import { toast } from "sonner";

type TReservationItem = paths["/api/reservation/me/"]["get"]["responses"]["200"]["content"]["application/json"][0];


export function DeleteReservationDialog({ open, setOpen, reservation }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, reservation: TReservationItem }) {

    const handleDelete = async () => {
        const res = await deleteReservation(reservation.id as number)
        if (res.ok) {
            toast.success("Reservation Cancelled")
            setOpen(false)
        } else {
            toast.error(res.error)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Cancel Reservation
                    </AlertDialogTitle>
                </AlertDialogHeader>
                Are you sure you want to Cancel reservation at {new Date(reservation.start_time).toLocaleTimeString()}?
                <AlertDialogFooter>
                    <AlertDialogCancel>Back</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Cancel</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
