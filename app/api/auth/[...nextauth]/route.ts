import NextAuth from "next-auth/next";
import { options } from "../options";
import { EdgeDBAdapter } from "@auth/edgedb-adapter";
import { createClient } from "edgedb";
import { Adapter } from "next-auth/adapters";

/**
 * For auth, go to this page to learn more aboutedgedb-adapter and how to use it with NextAuth library:
 * https://authjs.dev/reference/edgedb-adapter
 */

const client = createClient();

const handler = NextAuth({
  // Here we added Google provider config we created in app/auth/options.js
  ...options,
  adapter: EdgeDBAdapter(client) as Adapter,
});

export { handler as GET, handler as POST };
