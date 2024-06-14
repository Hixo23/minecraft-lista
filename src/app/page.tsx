import { ServerList } from "@/components/ServerList/ServerList";

export default async function Home() {
  return (
    <main className="p-16 w-screen min-h-screen flex flex-col bg-[#111]">
      <ServerList />
    </main>
  );
}
