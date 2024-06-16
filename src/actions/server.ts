"use server";

import { auth } from "@/auth";
import { ActionResult } from "@/components/UI/Form";
import { db } from "@/db";
import { serverTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { serial } from "drizzle-orm/pg-core";
import { redirect } from "next/navigation";

export const addServerAction = async (
  _: any,
  formData: FormData
): Promise<ActionResult> => {
  const serverAddress = formData.get("address");
  const serverPort = formData.get("port");
  const serverGamemodes = formData.getAll("selectedGamemodes");
  const serverVersions = formData.getAll("selectedVersions");
  const serverDescription = formData.get("description");

  const session = await auth();
  if (!session?.user?.id) return { error: "Nie znaleziono uzytkownika" };

  if (!serverAddress || typeof serverAddress !== "string")
    return { error: "Bledny adres ip" };

  if (!serverAddress.includes(".")) return { error: "Bledny adres ip" };
  if (!serverPort || typeof +serverPort !== "number")
    return { error: "Bledny port" };
  if (typeof serverDescription !== "string")
    return {
      error: "Opis serwera nie jest tekstem",
    };

  if (serverGamemodes.length <= 0)
    return { error: "Musisz wybrać tryby gry swojego serwera" };
  if (serverVersions.length <= 0)
    return { error: "Musisz wybrać wersje swojego serwera" };

  await db.insert(serverTable).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    address: serverAddress,
    port: +serverPort,
    versions: serverVersions,
    gamemodes: serverGamemodes,
    description: serverDescription || null,
  });

  return redirect("/");
};

export const getServerInformations = async (address: string) => {
  const response = await fetch(`https://api.mcsrvstat.us/3/${address}`);
  if (!response.ok) return;

  const json = await response.json();

  if (!json.debug.ping) return;

  return json;
};

export const getServer = async (address: string) => {
  const server = await db
    .select()
    .from(serverTable)
    .where(eq(serverTable.address, address));
  if (!server) return;
  return server;
};
