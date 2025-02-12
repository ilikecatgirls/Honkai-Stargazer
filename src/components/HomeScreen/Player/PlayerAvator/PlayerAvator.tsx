import React, { useEffect, useState } from "react";
import { View } from "react-native";
import useHsrFullData from "../../../../hooks/hoyolab/useHsrFullData";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../../../constant/screens";
import useHsrUUID from "../../../../hooks/hoyolab/useHsrUUID";
import UserAvatar from "../../../global/UserAvatar/UserAvatar";
import Toast from "../../../../utils/toast/Toast";
import { LOCALES } from "../../../../../locales";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import CharacterImage from "../../../../../assets/images/images_map/chacracterImage";
import useHsrInGameInfo from "../../../../hooks/mihomo/useHsrInGameInfo";
import AvatarIcon from "../../../../../assets/images/images_map/avatarIcon";
import useMyFirebaseUid from "../../../../firebase/hooks/FirebaseUid/useMyFirebaseUid";
import useUserByUUID from "../../../../firebase/hooks/User/useUserByUUID";
import useUserByName from "../../../../firebase/hooks/User/useUserByName";

export default function PlayerAvator() {
  const navigation = useNavigation();
  const { language } = useAppLanguage();

  const hsrUUID = useHsrUUID();
  const playerFullData = useHsrFullData();
  const [ avatarIcon, setAvatarIcon ] = useState()
  const [ isInit, setIsInit ] = useState(false)

  // 資料來自崩鐵
  const { data: hsrInGameInfo } = useHsrInGameInfo(hsrUUID) as any;

  const handleNavigatUserInfoPage = () => {
    if (hsrUUID) {
      // @ts-ignore
      navigation.push(SCREENS.UserInfoPage.id, { uuid: hsrUUID });
    } else {
      Toast(LOCALES[language].PleaseLogin);
    }
  };

  useEffect(() => {
    async function init() {
      setAvatarIcon(AvatarIcon[hsrInGameInfo?.player?.avatar?.icon?.match(/\d+/g)?.join("")] || useUserByUUID(hsrUUID)?.data?.avatar_url || "Anonymous")
      setIsInit(avatarIcon !== undefined)
    }
    if(!isInit) init();
  })

  return (
    <View className="mr-2">
      <UserAvatar image={avatarIcon} onPress={handleNavigatUserInfoPage} />
    </View>
  );
}
