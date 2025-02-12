import React from "react";
import SettingGroup from "../../SettingGroup/SettingGroup";
import SettingItem from "../../SettingGroup/SettingItem/SettingItem";
import { LOCALES } from "../../../../../locales";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import { ENV, VERSION, VERSION_NAME, VERSION_NAME_BETA } from "../../../../../app.config";
import * as Device from "expo-device";
import useIsAdmin from "../../../../firebase/hooks/Role/useIsAdmin";
import Noti from "../../../../notifications/utils/Noti";
import DeviceInfo from "react-native-device-info";

export default function DevelopmentSetting() {
  const { language } = useAppLanguage();

  const isAdmin = useIsAdmin();

  return (
    <SettingGroup title={LOCALES[language].DevOptions}>
    <SettingItem
      type="none"
      title={LOCALES[language].AppVersion}
      content={((ENV === "development" ||ENV === "beta") ? "BETA " : "") + DeviceInfo.getVersion() + ` (${DeviceInfo.getBuildNumber()})`  }
    />
    <SettingItem
      type="none"
      title={LOCALES[language].AppInnerVersionCode}
      content={((ENV === "development" ||ENV === "beta") ? VERSION_NAME_BETA : VERSION_NAME)}
    />
      <SettingItem
        type="none"
        title={LOCALES[language].OsVersion}
        content={`${Device.osName} ${Device.osVersion}`}
      />
      {isAdmin && (
        <SettingItem
          type="navigation"
          title={"通知功能測試"}
          content={"點擊"}
          onNavigate={() => {
            Noti({
              title: "开拓力恢复了",
              body: "2O48 乘客的开拓力已恢复到 150，将于今天 17:20 全部恢复帕！",
              seconds: 1,
            });
          }}
        />
      )}
    </SettingGroup>
  );
}
