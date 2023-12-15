import { View, Text } from "react-native";
import React, { useContext } from "react";
import CharPageHeading from "../../../global/PageHeading/PageHeading";
import { ChatsCircle } from "phosphor-react-native";
import CharacterContext from "../../../../context/CharacterContext";
import { HtmlText } from "@e-mine/react-native-html-text";
import { getCharFullData } from "../../../../utils/dataMap/getDataFromMap";

export default React.memo(function CharStory() {
  const charData = useContext(CharacterContext);
  const charId = charData?.id!;
  const charFullData = getCharFullData(charId);

  return (
    <View style={{ alignItems: "center" }}>
      <CharPageHeading Icon={ChatsCircle}>角色故事</CharPageHeading>
      <HtmlText style={{ lineHeight: 24, color: "white", fontFamily: "HY65" }}>
        {charFullData.storyItems[0].text || ""}
      </HtmlText>
    </View>
  );
});