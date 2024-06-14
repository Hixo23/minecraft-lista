import { db } from "@/db";
import { serverTable } from "@/db/schema";

const getAllServers = async () => {
  "use server";

  return await db.select().from(serverTable);
};

export default async function Home() {
  const servers = await getAllServers();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(servers)}
    </main>
  );
}
