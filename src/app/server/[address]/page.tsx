import Image from "next/image";
import CopyIcon from "../../../../public/copy.png";
import { Button, Chip } from "@nextui-org/react";
import { getServer, getServerInformations } from "@/actions/server";
import { redirect } from "next/navigation";

type Props = {
  params: {
    address: string;
  };
};

const ServerPage = async ({ params }: Props) => {
  const serverInformations = await getServerInformations(params.address);
  const serverDatabaseInformations = await getServer(params.address);

  if (!serverInformations || !serverDatabaseInformations) return redirect("/");
  return (
    <main className="bg-[#111] min-h-screen w-screen flex  gap-24  py-16 px-40">
      <div className="flex flex-col items-start gap-24">
        <div className="flex items-center gap-4 h-24">
          <h1 className="text-3xl">{params.address}</h1>
          <Button color="default">
            <Image
              width={32}
              height={32}
              src={CopyIcon}
              className="p-1 invert"
              alt="Copy button"
            />
          </Button>
        </div>
        <div className="flex flex-col gap-12 p-12 rounded-lg border-2 bg-[#1f1f1f]">
          <p className="text-2xl">Informacje o serwerze</p>
          <ul className="flex flex-col items-start text-lg gap-2">
            <li>Domena: {params.address}</li>
            <li>Ilość graczy online: {serverInformations.players.online}</li>
            <li>Ilość slotów: {serverInformations.players.max}</li>
            {serverDatabaseInformations[0].gamemodes && (
              <li className="flex gap-2">
                Tryby gry:{" "}
                {serverDatabaseInformations[0].gamemodes.map((gamemode) => (
                  <Chip key={gamemode}>{gamemode}</Chip>
                ))}{" "}
              </li>
            )}
            {serverDatabaseInformations[0].versions && (
              <li className="flex gap-2">
                Wersje:{" "}
                {serverDatabaseInformations[0].versions.map((version) => (
                  <Chip key={version} color="secondary">
                    {version}
                  </Chip>
                ))}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-start gap-24">
        <div className="flex flex-col gap-4 lg:w-[1200px] p-12 rounded-lg border-2 bg-[#1f1f1f]">
          {serverDatabaseInformations[0].description && (
            <>
              <p className="text-2xl">Opis:</p>
              <span className="text-2xl">
                {serverDatabaseInformations[0].description}
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col lg:w-[1200px] p-12 rounded-lg border-2 bg-[#1f1f1f]">
          <div className="flex flex-col gap-4">
            <p className="text-2xl">Motd:</p>
            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: serverInformations.motd.html.join("<br>"),
              }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServerPage;
