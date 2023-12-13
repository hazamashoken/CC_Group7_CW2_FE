"use server";
import { createGatewayClient } from "@/lib/data";
import { paths } from "@/schemas/api-schema";
import { revalidateTag } from "next/cache";

type ReservationPostIn = paths["/api/reservation/"]["post"]["requestBody"]["content"]["application/json"];

export async function createReservation(payload: ReservationPostIn) {
    const client = await createGatewayClient();

    console.log(payload);

    const { data, error, response } = await client.POST("/api/reservation/", {
        body: payload
    }) 

        
    if (error) {
        return {
            ok: false,
            // @ts-ignore
            error: error.detail ?? error
        }
    }
    revalidateTag("reservations");
    return (
        {
            ok: true,
            data: data
        }
    )
}