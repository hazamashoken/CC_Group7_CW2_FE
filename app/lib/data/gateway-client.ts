import { getServerSession } from 'next-auth';
import createClient from 'openapi-fetch';
import { paths } from '@/schemas/api-schema';
import { authOptions } from '@/lib/auth/authOptions';

/**
 * createGatewayClient()
 * @returns an openapi-fetch client for using with the dataGov API
 */
export async function createGatewayClient(options?: any) {
  const session = await getServerSession(authOptions);
  const authToken: string | undefined = await session?.token;

  const headers = options ? {
    Authorization: `Bearer ${options.authToken}` ?? undefined,
  } : {
    Authorization: `Bearer ${authToken}` ?? undefined,
  }

  const client = createClient<paths>({
    baseUrl: process.env.BACKEND_URL,
    headers: headers
  });

  return client;
}
