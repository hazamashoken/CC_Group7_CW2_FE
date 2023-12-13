"use server"

import { createGatewayClient } from "@/lib/data"

import { paths } from "@/schemas/api-schema";
import { revalidatePath } from "next/cache";

type TReservablePostInput = paths["/api/reservables/"]["post"]["requestBody"]["content"]["application/json"];

export async function updateReservableAction(payload: TReservablePostInput, reservable_id: number) {

  const client = await createGatewayClient();

  const { data, error } = await client.PATCH(
    "/api/reservables/{reservable_id}/",
    {
      params: {
        path: {
          reservable_id: reservable_id
        }
      },
      body: payload
    }
  )

  if (error) {
    return {
      ok: false,
      // @ts-ignore
      error: error.detail ?? error
    }
  }
  revalidatePath("reservable");
  return (
    {
      ok: true,
      data: data
    }
  )
}