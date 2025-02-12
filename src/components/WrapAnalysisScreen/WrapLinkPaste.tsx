import { View, Text, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import auth from "@react-native-firebase/auth";
import { keys } from "lodash";
import { ClipboardText } from "phosphor-react-native";
import * as Clipboard from "expo-clipboard";
import useAppLanguage from "../../language/AppLanguage/useAppLanguage";
import Toast from "../../utils/toast/Toast";
import { LOCALES } from "../../../locales";
import Button from "../global/Button/Button";
import TextButton from "../global/TextButton/TextButton";

type Props = {
    setWrapURL : (url : string) => void;
    setClose : () => void;
    confirmedTasks : (url : string) => void;
};

export default function WrapLinkPaste(props: Props) {
  const { language } = useAppLanguage();

  const [ inputURL, setInputURL ] = useState("")
  /**
   * 
   * @param ms 睡覺的毫秒
   * @returns 一個Promise，但你不需要讀它
   */
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms || 1000));
  }

  const handleSaveURL = async() => {
    if (!inputURL) {
      Toast(LOCALES[language].WrapPopUpURLToast);
      return;
    }
    props.setWrapURL(inputURL)
    props.confirmedTasks(inputURL);
    props.setClose && props.setClose();
  };

  return (
    <View style={{ gap: 12 }}>
      <Text className="text-[14px] font-[HY65] text-black leading-5">
        {LOCALES[language].WrapPopUpURLInfo}
      </Text>
    
    {/** 教學影片 */}
      <TextButton
        onPress={() => {
          //Linking.openURL("https://www.youtube.com/watch?v=CLkhV30kg_A");
          Toast(LOCALES[language].VisitToDCServer,2,true);
          setTimeout(() => {
            Linking.openURL("https://discord.gg/uXatcbWKv2");
          }, 2000);
        }}
        hasShadow={false}
        width={"100%"}
        height={46}
      >
        {/* @ts-ignore */}
        {LOCALES[language].VisitToDCServer}
      </TextButton>

      <View className="w-full h-[280px]">
        <TextInput
          value={inputURL}
          onChangeText={setInputURL}
          textAlignVertical="top"
          multiline={true}
          placeholder={LOCALES[language].WrapPopUpURLTextArea}
          placeholderTextColor="gray"
          className="w-full h-full bg-[#ffffff50] rounded-[24px] p-3 font-[HY65] leading-5"
        />
        <PasteBtn onPaste={setInputURL} />
      </View>
      <Button
        onPress={handleSaveURL}
        hasShadow={false}
        width={"100%"}
        height={46}
      >
        {LOCALES[language].WrapPopUpURLAnalysisButton}
      </Button>
    </View>
  );
}

const PasteBtn = ({ onPaste }: { onPaste: (v: string) => void }) => {
  const [copiedText, setCopiedText] = React.useState("");
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  useEffect(() => {
    if (copiedText) {
      onPaste(copiedText);
    }
  }, [copiedText]);

  return (
    <TouchableOpacity
      onPress={fetchCopiedText}
      className="absolute right-3 bottom-3 w-[42px] h-[42px] rounded-[12px] bg-[#00000010] items-center justify-center"
    >
      <ClipboardText weight="fill" />
    </TouchableOpacity>
  );
};