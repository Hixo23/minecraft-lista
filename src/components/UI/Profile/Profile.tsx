import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User as UserComponent,
} from "@nextui-org/react";
import { type User } from "next-auth";
import { signOut } from "next-auth/react";
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
        <DropdownItem onClick={() => signOut()} key="logout">
          Wyloguj sie
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
