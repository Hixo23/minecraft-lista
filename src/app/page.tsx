import { type ReactElement } from "react";
import { ServerList } from "@/components/ServerList/ServerList";

export default function Home(): ReactElement {
  return (
    <main className="py-16 px-40 w-screen min-h-screen flex flex-col">
      <ServerList />
    </main>
  );
}