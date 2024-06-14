import { db } from "@/db";
import { serverTable } from "@/db/schema";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

const getAllServers = async () => {
  "use server";

  return await db.select().from(serverTable);
};

export default async function Home() {
  const servers = await getAllServers();
  return <main className=""></main>;
}
