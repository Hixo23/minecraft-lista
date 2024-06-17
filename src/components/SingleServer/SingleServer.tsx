import Image from "next/image";
import Link from "next/link";
import { getServerInformations } from "@/actions/server";

interface ServerProps {
  id: string;
  address: string;
  versions: string;
  description: string | null;
  userId: string; 
}

export const Server = async ({
  address,
}: ServerProps) => {
  const serverInformations = await getServerInformations(address);

  if (!serverInformations.ip) return;
  return (
    <div className="w-full border-2 rounded-lg p-2 lg:p-4 flex gap-4 items-center font-bold">
      <Image
        width={64}
        className="h-16 w-16 hidden md:block"
        height={64}
        src={serverInformations.icon}
        alt={`${address  } icon`}
      />

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center text-wrap justify-between px-3">
          <Link href={`/server/${address}`}>{address}</Link>
          <div className="flex items-center gap-2  h-11">
            <span className="w-4 h-4 rounded-full bg-green-600 animate-pulse"></span>
            <p>{serverInformations.players.online}</p>
          </div>
        </div>
        <div
          className="text-center"
          dangerouslySetInnerHTML={{
            __html: serverInformations.motd.html.join("<br>"),
          }}
        ></div>
      </div>
    </div>
  );
};
