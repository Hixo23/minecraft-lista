import { auth } from "@/auth";
import { redirect } from "next/navigation";

const AddLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user) redirect("/");
  return <>{children}</>;
};

export default AddLayout;
