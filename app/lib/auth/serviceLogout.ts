import { createGatewayClient } from '@/lib/data';

/**
 * Logs out a service account with the specified access token.
 * @param access_token The access token of the service account to log out.
 * @throws An error if the logout request fails with a status code other than 401.
 */
export async function serviceLogout(access_token: string) {
  const client = await createGatewayClient({authToken: access_token});

  const {data, error, response} = await client.POST("/api/auth/logout/", {});
  if (!response.ok) {
    if (response.status === 401) {
      console.log("serviceLogout: 401");
    } else {
      throw error
    }
  }
}
