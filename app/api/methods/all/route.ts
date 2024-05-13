import { NextResponse } from "next/server";
import e from "@/dbschema/edgeql-js";
import { client } from "@/edgedb";

// Handler for POST requests
export async function POST(request: Request) {
  const { userId } = await request.json();

  const query = e.select(e.Ideas, (idea) => ({
    ...e.Ideas["*"],
    filter: e.op(idea.userId, "=", userId),
  }));

  const result = await query.run(client);

  // Returning JSON response
  return NextResponse.json({
    response: result,
  });
}
