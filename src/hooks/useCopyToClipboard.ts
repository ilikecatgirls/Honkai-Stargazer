import { useCallback } from "react";
import useAppLanguage from "../language/AppLanguage/useAppLanguage";
import * as Clipboard from "expo-clipboard";
import Toast from "../utils/toast/Toast";
import { LOCALES } from "../../locales";

const useCopyToClipboard = () => {
  const { language: appLanguage } = useAppLanguage();

  const handleCopy = useCallback(
    async (text: string) => {
      try {
        await Clipboard.setStringAsync(text);
        Toast.CopyToClipboard();
      } catch (e) {
        Toast(LOCALES[appLanguage].FailToCopy + e);
      }
    },
    [appLanguage]
  );

  return handleCopy;
};

export default useCopyToClipboard;