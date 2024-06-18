/* eslint-disable react/react-in-jsx-scope */
import { SingleServer } from '../SingleServer/SingleServer';
import { getAllServers } from '@/actions/server';

export const ServerList = async () => {
  const servers = await getAllServers();
  return (
    <div className="flex flex-col justify-evenly gap-4 lg:flex-row">
      {servers.map((server) => (
        <SingleServer key={server.id} {...server} />
      ))}
    </div>
  );
};
