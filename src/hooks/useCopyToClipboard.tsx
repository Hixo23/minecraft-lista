import { useCallback, useState } from "react";

type CopiedValue = string | null;
type CopyFn = (value: string) => Promise<boolean>;

export const useCopyToClipboard = (): [CopiedValue, CopyFn] => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator.clipboard) return false;

    try {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.error(error);
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy];
};
