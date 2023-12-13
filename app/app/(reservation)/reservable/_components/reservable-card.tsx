"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteReservableDialog } from "./reservable-delete-dialog";
import React from "react";
import { paths } from "@/schemas/api-schema";
import { Separator } from "@/components/ui/separator";

type TReservableItem = paths["/api/reservables/"]["get"]["responses"]["200"]["content"]["application/json"][0];

export function ReservableCard({ reservable }: { reservable: TReservableItem }) {
    const [openDelete, setOpenDelete] = React.useState(false);

    return (
        <Card
            key={reservable.id}
            className="px-4 py-2 min-w-[100px] text-center space-y-2"
        >
            <CardHeader>
                <CardTitle>{reservable.name}</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <p className="text-xs">{reservable.description}</p>
                <p className="text-xs">{reservable.location}</p>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-center gap-2">
                {/* <Button size={"sm"}>Reserve</Button> */}
                {/* <Button size={"sm"}>Edit</Button> */}
                <Button size={"sm"} variant={"destructive"} onClick={() => setOpenDelete(true)}>
                    Delete
                </Button>
            </CardFooter>
            <DeleteReservableDialog open={openDelete} setOpen={setOpenDelete} reservable={reservable}/>
        </Card>
    )
}