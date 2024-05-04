import { NextResponse } from "next/server";
import e from "@/dbschema/edgeql-js";
import * as edgedb from "edgedb";

const client = edgedb.createClient();

export async function GET(request: Request) {
  const query = e.select(e.User, () => ({
    id: true,
    email: true,
    emailVerified: true,
    name: true,
    image: true,
  }));

  console.log(await query.run(client));

  return NextResponse.json({});
}
