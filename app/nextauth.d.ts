import { DefaultSession } from "next-auth";
import { paths } from "./schemas/api-schema";

type TMeGet = paths["/api/me/"]["get"]["responses"]["200"]["content"]["application/json"];

declare module "next-auth" {
  interface User {
    profile?: TMeGet;
    token: string;
  }

  interface Session extends DefaultSession {
    user: TMeGet;
    token: string;
  }
}
