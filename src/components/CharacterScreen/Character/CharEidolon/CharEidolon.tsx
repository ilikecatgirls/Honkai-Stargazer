import { Pressable, View } from "react-native";
import React, { useState } from "react";
import CharPageHeading from "../../../global/PageHeading/PageHeading";
import { StarHalf } from "phosphor-react-native";
import Eidolon1 from "./Eidolons/Eidolon1";
import Eidolon2 from "./Eidolons/Eidolon2";
import Eidolon3 from "./Eidolons/Eidolon3";
import Eidolon4 from "./Eidolons/Eidolon4";
import Eidolon5 from "./Eidolons/Eidolon5";
import Eidolon6 from "./Eidolons/Eidolon6";
import EidolonPopUp from "./EidolonPopUp/EidolonPopUp";
import { useClickOutside } from "../../../../../lib/react-native-click-outside/src/useClickOutside";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../../locales";

export default React.memo(function CharEidolon() {
  const [selectedEidolon, setSelectedEidolon] = useState(0);
  const { language } = useAppLanguage();

  const containerRef = useClickOutside<View>(() => {
    setSelectedEidolon(0);
  });

  return (
    <>
      <Pressable
        ref={containerRef}
        onPress={() => {
          setSelectedEidolon(0);
        }}
        style={{ alignItems: "center" }}
      >
        <CharPageHeading Icon={StarHalf}>
          {LOCALES[language].Eidolon}
        </CharPageHeading>
        <View className="w-[350px] h-[280px]">
          <Eidolon1
            selected={selectedEidolon === 1}
            onPress={() => {
              setSelectedEidolon(1);
            }}
          />
          <Eidolon2
            selected={selectedEidolon === 2}
            onPress={() => {
              setSelectedEidolon(2);
            }}
          />
          <Eidolon3
            selected={selectedEidolon === 3}
            onPress={() => {
              setSelectedEidolon(3);
            }}
          />
          <Eidolon4
            selected={selectedEidolon === 4}
            onPress={() => {
              setSelectedEidolon(4);
            }}
          />
          <Eidolon5
            selected={selectedEidolon === 5}
            onPress={() => {
              setSelectedEidolon(5);
            }}
          />
          <Eidolon6
            selected={selectedEidolon === 6}
            onPress={() => {
              setSelectedEidolon(6);
            }}
          />
        </View>
      </Pressable>
      <EidolonPopUp
        id={selectedEidolon}
        onClose={() => {
          setSelectedEidolon(0);
        }}
      />
    </>
  );
});
