"use server"

import { createGatewayClient } from "@/lib/data"

import { paths } from "@/schemas/api-schema";
import { revalidatePath } from "next/cache";

type TReservablePostInput = paths["/api/reservables/"]["post"]["requestBody"]["content"]["application/json"];

export async function deleteReservableAction(reservable_id: number) {

  const client = await createGatewayClient();

  const { data, error } = await client.DELETE(
    "/api/reservables/{reservable_id}/",
    {
      params: {
        path: {
          reservable_id: reservable_id
        }
      }
    }
  )

  if (error) {
    return {
      ok: false,
      error: error
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