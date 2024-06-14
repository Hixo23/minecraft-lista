import Image from "next/image";

type Props = {
  id: string;
  address: string;
  versions: string;
  description: string | null;
};

const getServerInformations = async (address: string) => {
  const response = await fetch(`https://api.mcsrvstat.us/3/${address}`);
  if (!response.ok) return;

  return await response.json();
};

export const Server = async ({ id, address, versions, description }: Props) => {
  const serverInformations = await getServerInformations(address);
  return (
    <div className="w-[560px]  border-2 rounded-lg p-4 flex gap-4 items-center font-bold">
      <Image
        width={64}
        className="h-16 w-16"
        height={64}
        src={serverInformations.icon}
        alt={address + " icon"}
      />

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between px-3">
          <p>{address}</p>
          <div className="flex items-center gap-2  h-11">
            <span className="w-4 h-4 rounded-full bg-green-600 animate-pulse"></span>
            <p>{serverInformations.players.online}</p>
          </div>
        </div>
        <p className="flex flex-col gap-2 items-center">
          {serverInformations.motd.clean.map((motd: string) => (
            <span className="text-nowrap" key={motd}>
              {motd}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
