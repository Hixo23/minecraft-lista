"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddLayout = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  const router = useRouter();

  //   if (!data?.user?.id) return router.push("/");
  return <>{children}</>;
};

export default AddLayout;
