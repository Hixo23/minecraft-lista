'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { type ActionResult } from '@/components/UI/Form';
import { db } from '@/db';
import { serverTable } from '@/db/schema';
import { type ServerInformations } from '@/types/types';

export const addServerAction = async (
  _: unknown,
  formData: FormData,
): Promise<ActionResult> => {
  const serverAddress = formData.get('address');
  const serverPort = formData.get('port');
  const serverGamemodes = formData.getAll('selectedGamemodes');
  const serverVersions = formData.getAll('selectedVersions');
  const serverDescription = formData.get('description');

  const session = await auth();
  if (!session?.user?.id) return { error: 'Nie znaleziono uzytkownika' };

  if (!serverAddress || typeof serverAddress !== 'string')
    return { error: 'Bledny adres ip' };

  if (!serverAddress.includes('.')) return { error: 'Bledny adres ip' };
  if (!serverPort || typeof Number(serverPort) !== 'number')
    return { error: 'Bledny port' };
  if (typeof serverDescription !== 'string')
    return {
      error: 'Opis serwera nie jest tekstem',
    };

  if (serverGamemodes.length <= 0)
    return { error: 'Musisz wybrać tryby gry swojego serwera' };
  if (serverVersions.length <= 0)
    return { error: 'Musisz wybrać wersje swojego serwera' };

  await db.insert(serverTable).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    address: serverAddress,
    port: Number(serverPort),
    versions: serverVersions,
    gamemodes: serverGamemodes,
    description: serverDescription || null,
  });

  return redirect('/');
};

export const getServerInformations = async (
  address: string,
): Promise<ServerInformations> => {
  const response = await fetch(`https://api.mcsrvstat.us/3/${address}`);
  if (!response.ok) throw new Error('Error');

  const json = (await response.json()) as ServerInformations;

  if (!json.debug.ping)
    throw new Error("Server is offline or it doesn't exists!");

  return json;
};

export const getServer = async (address: string) => {
  const server = await db
    .select()
    .from(serverTable)
    .where(eq(serverTable.address, address));
  if (!server[0].id) return;
  return server;
};

export const getAllServers = async () => {
  return await db.select().from(serverTable);
};
