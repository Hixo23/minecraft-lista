"use server";

import { auth } from "@/auth";
import { ActionResult } from "@/components/UI/Form";
import { db } from "@/db";
import { serverTable } from "@/db/schema";
import { redirect } from "next/navigation";

export const addServerAction = async (
  _: any,
  formData: FormData
): Promise<ActionResult> => {
  const serverAddress = formData.get("address");
  const serverPort = formData.get("port");
  const serverGamemodes = formData
    .getAll("selectedGamemodes")
    .map((gamemode) => gamemode);
  const serverVersions = formData
    .getAll("selectedVersions")
    .map((version) => version);
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

  await db.insert(serverTable).values({
    userId: session?.user?.id,
    address: serverAddress,
    versions: serverVersions.join(", "),
    id: crypto.randomUUID(),
    port: +serverPort,
    gamemodes: serverGamemodes.join(", "),
    description: serverDescription ? serverDescription : null,
  });
  return redirect("/");
};

export const getServerInformations = async (address: string) => {
  const response = await fetch(`https://api.mcsrvstat.us/3/${address}`);
  if (!response.ok) return;

  const json = await response.json();

  if (!json.debug.srv) return;

  return json;
};
