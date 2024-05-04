import e from "@/dbschema/edgeql-js";
import * as edgedb from "edgedb";

const client = edgedb.createClient();

export async function handleData() {
  const query = e.select(e.User, () => ({
    id: true,
    email: true,
    emailVerified: true,
    name: true,
    image: true,
  }));

  console.log(await query.run(client));
}
