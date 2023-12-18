"use server"

import { createGatewayClient } from "@/lib/data";
import { paths } from "@/schemas/api-schema";
import { TSVaction } from "@/schemas/server-action";

export type TUserPostIn = paths["/api/register/"]["post"]["requestBody"]["content"]["application/json"];

export async function signupAction(payload: TUserPostIn): Promise<TSVaction> {
  const client = await createGatewayClient();

  const { data, error } = await client.POST(
    "/api/register/",
    { body: payload }
  )

  if (error) {
    return {
      ok: false,
     // @ts-ignore
     error: error.detail ?? error
    }
  }
  return {
    ok: true,
    data: data,
  }
}