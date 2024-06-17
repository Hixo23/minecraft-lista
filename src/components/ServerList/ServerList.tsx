import { db } from "@/db";
import { serverTable } from "@/db/schema";
import { Server } from "../SingleServer/single-server";

const getAllServers = async () => {
  "use server";

  return await db.select().from(serverTable);
};

export const ServerList = async () => {
  const servers = await getAllServers();
  return (
    <div className="flex justify-evenly gap-4 lg:flex-row flex-col">
      {servers.map((server) => (
        <Server key={server.id} {...server} />
      ))}
    </div>
  );
};
