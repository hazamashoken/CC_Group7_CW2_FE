"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/schemas/api-schema";
import { DeleteReservationDialog } from "./reservation-delete-dialog";
import React from "react";

type ReservationGetOut = paths["/api/reservation/me/"]["get"]["responses"]["200"]["content"]["application/json"]

export function ReservationCard(props: { reservationData: ReservationGetOut }) {
  const { reservationData } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-wrap w-full">
      {
        reservationData.map((reservation, index) => (
          <Card key={index} className="flex flex-col space-y-2 w-[300px]">
            <CardContent>
            <CardHeader>
            <div className="flex flex-row justify-between">
              <div className="text-lg font-bold">Reservation</div>
              <div className="text-lg font-bold">#{index + 1}</div>
            </div>
            </CardHeader>
              <div className="flex flex-row justify-between">
                <div className="text-lg font-semibold">Room</div>
                <div className="text-lg font-semibold">{reservation.reservable.name}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-lg font-semibold">Location</div>
                <div className="text-lg font-semibold">{reservation.reservable.location}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-lg font-semibold">Date</div>
                <div className="text-lg font-semibold">{new Date(reservation.start_time).toLocaleDateString()}</div>
              </div>
            <div className="flex flex-row justify-between">
              <div className="text-lg font-semibold">Start Time</div>
              <div className="text-lg font-semibold">{new Date(reservation.start_time).toLocaleTimeString()}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-lg font-semibold">End Time</div>
              <div className="text-lg font-semibold">{new Date(reservation.end_time).toLocaleTimeString()}</div>
            </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <Button variant={"destructive"} onClick={() => setOpen(true)}>Cancel</Button>
            </CardFooter>
            <DeleteReservationDialog reservation={reservation} open={open} setOpen={setOpen}/>
          </Card>
        ))
      }
    </div>
  )
}