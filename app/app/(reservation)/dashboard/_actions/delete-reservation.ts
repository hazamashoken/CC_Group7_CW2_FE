"use server";
import { createGatewayClient } from "@/lib/data";
import { revalidateTag } from "next/cache";

export async function deleteReservation(reservation_id: number) {
    const client = await createGatewayClient();

    const { data, error, response } = await client.DELETE("/api/reservation/{reservation_id}/", {
        params:{
            path: {
                reservation_id: reservation_id
            
            }
        }
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