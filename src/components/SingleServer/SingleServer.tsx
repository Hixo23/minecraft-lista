/* eslint-disable react/react-in-jsx-scope */
import Image from 'next/image';
import Link from 'next/link';
import { getServerInformations } from '@/actions/server';

interface ServerProps {
  id: string;
  address: string;
  description: string | null;
  userId: string;
}

export const SingleServer = async ({ address }: ServerProps) => {
  const serverInformations = await getServerInformations(address);

  if (!serverInformations.ip) return;
  return (
    <div className="flex w-full items-center gap-4 rounded-lg border-2 p-2 font-bold lg:p-4">
      <Image
        width={64}
        className="hidden size-16 md:block"
        height={64}
        src={serverInformations.icon}
        alt={`${address} icon`}
      />

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between text-wrap px-3">
          <Link href={`/server/${address}`}>{address}</Link>
          <div className="flex h-11 items-center  gap-2">
            <span className="size-4 animate-pulse rounded-full bg-green-600"></span>
            <p>{serverInformations.players.online}</p>
          </div>
        </div>
        <div
          className="text-center"
          dangerouslySetInnerHTML={{
            __html: serverInformations.motd.html.join('<br>'),
          }}
        ></div>
      </div>
    </div>
  );
};
