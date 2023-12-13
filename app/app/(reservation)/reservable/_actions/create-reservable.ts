"use server"

import { createGatewayClient } from "@/lib/data"

import { paths } from "@/schemas/api-schema";
import { revalidatePath, revalidateTag } from "next/cache";

type TReservablePostInput = paths["/api/reservables/"]["post"]["requestBody"]["content"]["application/json"];

export async function createReservableAction(payload: TReservablePostInput) {
    
    const client = await createGatewayClient();

    const { data, error } = await client.POST(
        "/api/reservables/",
        {
            body: payload
        }
    )
    
    if (error) {
        return {
            ok: false,
            error: error
        }
    }
    revalidateTag("reservable");
    return (
        {
            ok: true,
            data: data
        }
    )
}