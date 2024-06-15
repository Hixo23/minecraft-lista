import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

type Props = {
  user: User;
};

export const Profile = ({ user }: Props) => {
  const { data } = useSession();
  return (
    <Dropdown>
      <DropdownTrigger>
        <p>{user?.name}</p>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="logout">Wyloguj sie</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
