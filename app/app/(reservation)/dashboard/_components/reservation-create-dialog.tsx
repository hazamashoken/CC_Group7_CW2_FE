"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CreateReservationForm } from "./reservation-create-form";
import React from "react";
import { paths } from "@/schemas/api-schema";


type ReservableListGetOut = paths["/api/reservables/"]["get"]["responses"]["200"]["content"]["application/json"] 

export function CreateReservationDialog(props: {reservableData: ReservableListGetOut}) {
    const { reservableData } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={"sm"}>Create Reservation</Button>
            </DialogTrigger>
            <DialogContent>
                <CreateReservationForm setOpen={setOpen} reservableData={reservableData}/>
            </DialogContent>
        </Dialog>
    );
    
}
