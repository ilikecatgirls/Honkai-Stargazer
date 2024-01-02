import { View, Text } from "react-native";
import React from "react";
import SettingGroup from "../../SettingGroup/SettingGroup";
import SettingItem from "../../SettingGroup/SettingItem/SettingItem";
import Toast from "../../../../utils/toast/Toast";
import useAppLanguage from "../../../../context/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../../locales";
import formatLocale from "../../../../utils/format/formatLocale";
import useHsrUUID from "../../../../hooks/hoyolab/useHsrUUID";

export default function AccountSetting() {
  const { language } = useAppLanguage();

  const hsrUUID = useHsrUUID();

  return (
    <SettingGroup
      title={formatLocale(LOCALES[language].AccountSetup, [
        hsrUUID || "00000000",
      ])}
    >
      <SettingItem
        type="navigation"
        title={LOCALES[language].UseInviteCode}
        content={LOCALES[language].HaveNotUsed}
        onNavigate={() => {
          Toast.StillDevelopingToast();
        }}
      />
    </SettingGroup>
  );
}
