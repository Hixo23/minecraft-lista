import { db } from "@/db";
import { serverTable } from "@/db/schema";
import { Server } from "../SingleServer/SingleServer";

const getAllServers = async () => {
  "use server";

  return await db.select().from(serverTable);
};

export const ServerList = async () => {
  const servers = await getAllServers();
  return (
    <div className="flex justify-around">
      {servers.map((server) => (
        <Server key={server.id} {...server} />
      ))}
    </div>
  );
};
