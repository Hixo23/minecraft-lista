"use client";

import { gamemodes } from "@/constants/gamemodes";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { versions } from "@/constants/versions";
import { ChangeEvent, useState } from "react";
import { Form } from "../UI/Form";
import { addServerAction } from "@/actions/server";

export const CreateServerForm = () => {
  const [selectedVersions, setSelectedVersions] = useState<Set<string>>(
    new Set([])
  );
  const [selectedGamemodes, setSelectedGamemodes] = useState<Set<string>>(
    new Set([])
  );

  const handleSelectVersion = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersions(new Set(e.target.value.split(",")));
  };
  const handleSelectGamemode = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGamemodes(new Set(e.target.value.split(",")));
  };

  return (
    <Form action={addServerAction} className="w-1/2 flex flex-col gap-8">
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="address">Adres serwera</label>
        <Input
          placeholder="Podaj adres ip swojego serwera"
          id="address"
          name="address"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="port">Port</label>
        <Input
          defaultValue="25565"
          placeholder="Podaj port swojego serwera"
          id="port"
          name="port"
          type="number"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="description">Opis serwera</label>
        <Input
          id="description"
          placeholder="Napisz opis swojego serwera"
          name="description"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Select
          selectionMode="multiple"
          selectedKeys={selectedVersions}
          onChange={handleSelectVersion}
          label="Wersja serwera"
          placeholder="Wybierz wersje"
          name="selectedVersions"
        >
          {versions.map((version) => {
            return <SelectItem key={version}>{version}</SelectItem>;
          })}
        </Select>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Select
          selectionMode="multiple"
          selectedKeys={selectedGamemodes}
          onChange={handleSelectGamemode}
          label="Tryby gry"
          placeholder="Wybierz tryby gry"
          name="selectedGamemodes"
        >
          {gamemodes.map((gamemode) => {
            return <SelectItem key={gamemode}>{gamemode}</SelectItem>;
          })}
        </Select>
      </div>
      <Button type="submit">Dodaj serwer</Button>
    </Form>
  );
};
