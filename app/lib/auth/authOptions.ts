import { serviceLogout } from '@/lib/auth/serviceLogout';
import type { NextAuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { createGatewayClient } from '@/lib/data';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "" }
      },
      async authorize(credentials, req) {
        const client = await createGatewayClient();
        const { data, error } = await client.POST(
          "/api/auth/login/",
          { body: { username: credentials?.email as string, password: credentials?.password as string } }
        )

        if (error) {
          return null;
        }

        const client2 = await createGatewayClient({authToken: data?.token});

        const res = await client2.GET("/api/me/")

        let user: any = await res.data;

        if (user) {

          user = {
            profile: user,
            ...data
          }
          return user;
        }
        return null
      }
    })
  ],
  callbacks: {
    // returns token object to be consumed by session()
    async jwt({ token, user, account }: {
      token: any,
      user: User,
      account: any,
    }) {

      if (account && user) {
        return {
          ...token,
          profile: user.profile,
          bearerToken: user.token,
        };
      }

      return token;
    },
    // consumes token object; returns session object
    // In session() if any failure occurs, such as fail api call
    // it will unauthorize the user and invalidate the session as side effect
    async session({ session, token }: { session: Session, token: any }) {
      session.token = token.bearerToken;
      session.user = token.profile;
      return session;
    },
    async signIn({ user, account, profile, credentials }: {
      user: User,
      account: any,
      profile?: any,
      credentials?: any
    }) {
      return true;
    }
  },
  events: {
    async signOut({ token }) {
      serviceLogout(token.bearerToken as string);
    },
  },
  session: {
    maxAge: 24 * 60 * 60, // 4 hours sync with backend //TODO: maybe move to .env
  }
}