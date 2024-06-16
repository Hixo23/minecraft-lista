"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import CopyIcon from "../../../../public/copy.png";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type Props = {
  stringToCopy: string;
};

export const CopyButton = ({ stringToCopy }: Props) => {
  const [_, copy] = useCopyToClipboard();

  return (
    <Button
      onClick={() => copy(stringToCopy)}
      color={`${_ ? "success" : "default"}`}
    >
      <Image
        width={32}
        height={32}
        src={CopyIcon}
        className="p-1 invert"
        alt="Copy button"
      />
    </Button>
  );
};
