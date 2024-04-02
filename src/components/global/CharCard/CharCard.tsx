import { View, Text, TouchableOpacity, Dimensions, PixelRatio } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageSource } from "expo-image";
import { cn } from "../../../utils/css/cn";
import { Path } from "../../../types/path";
import { CombatType } from "../../../types/combatType";
import CombatTypeCardIcon from "../CombatTypeCardIcon/CombatTypeCardIcon";
import PathCardIcon from "../PathCardIcon/PathCardIcon";
import CharacterImage from "../../../../assets/images/images_map/chacracterImage";
import CombatTypeImage from "../../../../assets/images/images_map/combatType";
import AdviceId from "../../../../map/character_advice_id_map";
import CharacterOfficialId from "../../../../map/character_offical_id_map";
import PathImage from "../../../../assets/images/images_map/path";
// import FastImage from "react-native-fast-image";

type Props = {
  id?: string;
  rare?: number;
  name?: string;
  rank?: number;
  level?: number;
  path?: Path;
  combatType?: CombatType;
  image?:
  | string
  | number
  | string[]
  | ImageSource
  | ImageSource[]
  | null
  | undefined;
  isShowMultiType?: boolean;
  typeListStr?: string;
  onPress?: (charId: string, charName: string) => void;
  onPressShowChoice?: () => void;
};

export default React.memo(function CharCard(props: Props) {
  //   const animation = useSpring({ from: { opacity: 0.25 }, to: { opacity: 1 } });
  const itemMaxWidth = 80;
  const itemPadding = 6;
  const dimension = Dimensions.get('window');
  const totalAvailableWidth = (dimension.width - 8 * 2);
  const itemInRow = Math.trunc(totalAvailableWidth / itemMaxWidth)
  const oneItemWidth = itemMaxWidth + (((totalAvailableWidth % itemMaxWidth) / itemInRow))

  const typeList = props.typeListStr?.split("||");
  let typeInUI: string[] = [];
  let typeIsAdd: boolean[] = []; //[true, false, false] = 1+2 , but 2 not + 3
  for (let x = 0, pos = 0;typeList !== undefined && x < typeList.length; x++) {
    typeList[x].split("&&").map((str, index, array) => {
      if (index > 0) pos++;
      typeInUI[x+pos] = str;
      typeIsAdd[x+pos] = !(index + 1 === array.length);
    })
  }

  if(typeIsAdd[1] === true){
    typeInUI.splice(1,0,"EMPTY")
    typeIsAdd.splice(1,0,false)
  }
  if(typeInUI.length === 2){
    typeInUI.splice(1,0,"EMPTY")
    typeIsAdd.splice(1,0,false)
  }


  const plusUI = (
    <View style={{ width: 10, height: "auto", alignSelf: "center" }}>
      <Image style={{ width: 10, height: 10 }} source={require("../../../../assets/images/ui_icon/ic_plus.png")} />
    </View>
  )

  //console.log(dimension.width +" | "+totalAvailableWidth+" | "+itemInRow+ " | "+(totalAvailableWidth % itemMaxWidth)+ " | "+oneItemWidth2)

  return (
    <TouchableOpacity
      activeOpacity={0.65}
      style={{ paddingLeft: itemPadding, paddingRight: itemPadding, width: oneItemWidth }}
      onPress={() => {
        if (props.isShowMultiType === true) {
          props.onPressShowChoice && props.onPressShowChoice();
        } else{
          props.onPress && props.onPress(props.id!, props.name!);
        }
      }}
    >
      {/* <Shadow distance={6} offset={[4, 4]} startColor="#00000025"> */}
      <LinearGradient
        style={{
          borderRadius: 4,
          borderTopRightRadius: 10,
          overflow: "hidden",
          shadowOffset: { width: 4, height: 4 },
          shadowRadius: 8,
          shadowColor: "#000000",
          shadowOpacity: 0.25,
          elevation: 8,
        }}
        colors={
          props.isShowMultiType === true ? ["#905273", "#71B8C8"] :
            props.rare === 5 ? ["#905A52", "#C8A471"] :
              props.rare === 4 ? ["#404165", "#9763CE"] : ["#393A5C", "#497AB8"]
        }
      >
        {props.isShowMultiType ? (
          <View >
            <View style={{ width: oneItemWidth - itemPadding, height: oneItemWidth - itemPadding, padding: 4, paddingRight: 10, flexDirection: "column" }}>
              {/*Row 1*/}
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                <View style={{ flex: 1 }}>{getIconByInfo(typeInUI[0], (typeInUI.length > 1 ? (oneItemWidth - itemPadding - 30) / 2 : oneItemWidth - itemPadding - 30))}</View>
                {typeIsAdd[0] ? (plusUI) : (<></>)}
                {typeInUI[1] && typeInUI[1] !== "EMPTY"? (
                  <View style={{ flex: 1 }}>{getIconByInfo(typeInUI[1], (oneItemWidth - itemPadding - 30) / 2)}</View>
                ) : (<></>)
                }
              </View>

              {/*Row 2*/}
              {typeInUI.length > 2 ? (
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                  {typeInUI[2] ? (
                    <View style={{ flex: 1 }}>{getIconByInfo(typeInUI[2], (oneItemWidth - itemPadding - 30) / 2)}</View>
                  ) : (<></>)}
                  {typeIsAdd[2] ? (plusUI) : (<></>)}
                  {typeInUI[3] ? (
                    <View style={{ flex: 1 }}>{getIconByInfo(typeInUI[3], (oneItemWidth - itemPadding - 30) / 2)}</View>
                  ) : (<></>)}
                </View>
              ) : (<></>)}

            </View>
            {/* 角色名稱 */}
            <View
              className="bg-[#222222] translate-y-[-2px]"
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                numberOfLines={1}
                className="text-text2 font-[HY65] text-[12px] leading-4"
              >
                Press To View
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View
            //   style={animation}
            >
              {/* 角色頭像 */}
              <Image cachePolicy="none"
                transition={200}
                style={{ width: oneItemWidth - itemPadding, height: oneItemWidth - itemPadding }}
                source={props.image}
              />
              {/* 角色名稱 */}
              <View
                className="bg-[#222222] translate-y-[-2px]"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {typeof props.name === "string" ? (
                  <Text
                    numberOfLines={1}
                    className="text-text2 font-[HY65] text-[12px] leading-4"
                  >
                    {props.name}
                  </Text>
                ) : (
                  <>{props.name}</>
                )}
              </View>
              {/* 命途 & 元素 */}
              <View
                className="absolute top-0.5 left-1"
                style={{ flexDirection: "column", gap: 8 }}
              >
                <CombatTypeCardIcon value={props.combatType} />
                <PathCardIcon value={props.path} />
              </View>
              {/* 命作 */}
              {props.rank !== undefined && (
                <View
                  className="absolute right-1 top-1 bg-[#F3F9FF] rounded-full w-4 h-4"
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text className="text-[#393A5C] text-[12px] font-[HY65]">
                    {props.rank}
                  </Text>
                </View>
              )}
            </View>
            {/* 等級 */}
            {props.level !== undefined && (
              <View
                className="absolute w-full"
                style={{ alignItems: "center", marginTop: oneItemWidth - 26 }}
              >
                <View className="bg-[#22222290] h-4 px-2 rounded-[43px]" style={{ alignSelf: "center" }}>
                  <Text className="text-text h-4 font-[HY65] text-[12px]" style={{ textAlignVertical: "center" }}>
                    {props.level}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </LinearGradient>
      {/* </Shadow> */}
    </TouchableOpacity>
  );
});

function getIconByInfo(infoId: string, widthx: number) {
  return (
    <View
      className="rounded-full bg-[#00000040]"
      style={{ justifyContent: "center", alignItems: "center", alignSelf: "center", width: widthx, height: widthx }}
    >
      <Image cachePolicy="none" className="rounded-full" style={{ flex: 1, width: widthx, height: widthx, minWidth: 20, minHeight: 20 }} source={
        CharacterImage[CharacterOfficialId[Number(infoId)]]?.icon || AdviceId[infoId]?.icon ||
        require("../../../../assets/images/ui_icon/ic_unknown.webp")
      } />
    </View>
  )
}