import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import useHsrUUID from "../../../../hooks/hoyolab/useHsrUUID";
import officalCharId from "../../../../../map/character_offical_id_map";
import CharacterImage from "../../../../../assets/images/images_map/chacracterImage";
import { CharacterName } from "../../../../types/character";
import { useNavigation } from "@react-navigation/native";
import useMyFirebaseUid from "../../../../firebase/hooks/FirebaseUid/useMyFirebaseUid";
import useUserCharacters from "../../../../firebase/hooks/UserCharacters/useUserCharacters";

export default function PlayerCharacter() {
  const navigation = useNavigation();

  const hsrUUID = useHsrUUID();
  
  const uid = useMyFirebaseUid();
  const userCharDetailList = useUserCharacters(uid).data?.characters_details;

  return (
    <View className="flex flex-row gap-1">
      {userCharDetailList ? (
        userCharDetailList?.filter((data : any) => data.isHelperChar === true)?.slice(0, 5)?.map((char: any, i: number) => (
          <TouchableOpacity
            key={char.id}
            activeOpacity={0.35}
            className="w-[30px] h-[30px] bg-[#D9D9D9] rounded-full overflow-hidden"
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              // @ts-ignore
              navigation.navigate("UserCharDetail", {
                uuid: hsrUUID,
                charId: officalCharId[char.id] as CharacterName,
              });
            }}
          >
            <Image cachePolicy="none"
              className="w-[30px] h-[30px]"
              source={
                CharacterImage[officalCharId[char.id] as CharacterName].icon
              }
            />
          </TouchableOpacity>
        ))
      ) : (
        <View className="w-[30px] h-[30px] bg-[#D9D9D9] rounded-full overflow-hidden"></View>
      )}
    </View>
  );
}
