import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User as UserComponent,
} from "@nextui-org/react";
import { type User } from "next-auth";
import Image from "next/image";

type Props = {
  user: User;
};

export const Profile = ({ user }: Props) => {
  return (
    <Dropdown>
      <DropdownTrigger className="flex gap-4 items-center cursor-pointer">
        <UserComponent name={user.name} avatarProps={{ src: user.image! }} />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="logout">Wyloguj sie</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
