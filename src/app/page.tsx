import { ServerList } from "@/components/ServerList/ServerList";

export default async function Home() {
  return (
    <main className="py-16 px-40 w-screen min-h-screen flex flex-col">
      <ServerList />
    </main>
  );
}
