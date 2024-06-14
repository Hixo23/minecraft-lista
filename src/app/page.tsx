import { ServerList } from "@/components/ServerList/ServerList";

export default async function Home() {
  return (
    <main className="p-24 w-screen h-screen flex flex-col bg-[#111]">
      <ServerList />
    </main>
  );
}
