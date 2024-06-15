"use server";

import { auth } from "@/auth";
import { ActionResult } from "@/components/UI/Form";
import { db } from "@/db";
import { serverTable } from "@/db/schema";
import { redirect } from "next/navigation";
import { z } from "zod";

const serverSchema = z.object({
  serverAddress: z
    .string()
    .min(2, { message: "Adres serwera musi miec wiecej niz 2 znaki" }),
  serverPort: z
    .number()
    .min(1, { message: "Port serwera musi byc wiekszy niz 1" }),
  gamemodes: z
    .array(z.string().min(1))
    .min(1, { message: "Musisz wybrac minimum jeden tryb gry" }),
  versions: z
    .array(z.string().min(1))
    .min(1, { message: "Musisz wybrac minimum jedna wersje serwera" }),
});

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
