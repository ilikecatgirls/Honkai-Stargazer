import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  LayoutChangeEvent,
  Text,
  Dimensions,
  Linking,
} from "react-native";
import { cn } from "../../../utils/css/cn";
import MenuItem from "./MenuItem/MenuItem";
import { AlignLeft, Calendar, ListChecks, Moon, Planet, ShootingStar, Star, StarOfDavid } from "phosphor-react-native";
import MenuItemLarge from "./MenuItemLarge/MenuItemLarge";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../../constant/screens";
import useHsrNote from "../../../hooks/hoyolab/useHsrNote";
import _ from "lodash";
import { formatTimePoint } from "../../../utils/date/formatTime";
import useAppLanguage from "../../../language/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../locales";
import formatNumber from "../../../utils/format/formatNumber";
import AboutTheApp from "../../SettingScreen/SettingList/SpecialThanksSetting/AboutTheApp1/AboutTheApp";
import LotteryScreen from "../../../screens/LotteryScreen";
import Toast from "../../../utils/toast/Toast";
import { ENV } from "../../../../app.config";
import WrapAnalysisScreen from "../../../screens/WrapAnalysisScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SURVEY_URL_JSON_KEY } from "../../../hooks/survey/getSurveyURL";
import db from "../../../firebase/db";
import UserFunctionUsage from "../../../firebase/models/UserFunctionUsage";
import ActionOrderListScreen from "../../../screens/ActionOrderListScreen";

export default function Menu() {
  const navigation = useNavigation();
  const { language } = useAppLanguage();

  //* Layout
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [menuItemSize, setMenuItemSize] = useState({ width: 0, height: 0 });
  const [menuItemLargeSize, setMenuItemLargeSize] = useState({
    width: 0,
    height: 0,
  });
  //開拓力/後備開拓力切換
  const [isDisplayBackupStamina, setIsDisplayBackupStamina] = useState(false);

  useEffect(() => {
    MenuItem;
    setMenuItemSize({
      width: (layout.width - 72) / 4,
      height: (((layout.width - 72) / 4) * 9) / 8,
    });
    setMenuItemLargeSize({
      width: ((layout.width - 72) / 4) * 2 + 13,
      height: (((layout.width - 72) / 4) * 9) / 8,
    });
  }, [layout]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  //* Data
  const playerNote = useHsrNote();

  //* Menu

  const [staminaIsCheck, setStaminaIsCheck] = useState(false);
  const [epeditionIsCheck, setEpeditionIsCheck] = useState(false);

  const menuItems = [
    // 角色列表
    {
      type: "normal",
      name: SCREENS.CharacterListPage.getShortName(language),
      icon: SCREENS.CharacterListPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("CharacterListPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("CharacterListPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.CharacterListPage.id);
      },
    },
    // 光錐列表
    {
      type: "normal",
      name: SCREENS.LightconeListPage.getShortName(language),
      icon: SCREENS.LightconeListPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("LightconeListPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("LightconeListPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.LightconeListPage.id);
      },
    },
    // 遺器列表
    {
      type: "normal",
      name: SCREENS.RelicListPage.getShortName(language),
      icon: SCREENS.RelicListPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("RelicListPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("RelicListPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.RelicListPage.id);
      },
    },
    // UID查詢
    {
      type: "normal",
      name: SCREENS.UIDSearchPage.getShortName(language),
      icon: SCREENS.UIDSearchPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("UIDSearchPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("UIDSearchPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.UIDSearchPage.id);
      },
    },
    // 開拓力
    {
      type: "large",
      name: LOCALES[language].Stamina,
      icon: Moon,
      title: playerNote.data ? (
        isDisplayBackupStamina ?
          (
            <>
              <Text className="text-[24px] leading-[26px]">
                {playerNote.data?.current_reserve_stamina}
              </Text>
              <Text>/2400</Text>
            </>
          ) : (<>
            <Text className="text-[24px] leading-[26px]">
              {playerNote.data?.current_stamina}
            </Text>
            <Text>/{playerNote.data?.max_stamina}</Text>
          </>
          )
      ) : null,
      subtitle: playerNote.data ? (
        !isDisplayBackupStamina ? (<Text>
          {playerNote.data.current_stamina >= 240
            ? LOCALES[language].StaminaIsFull
            : formatTimePoint(playerNote.data.stamina_recover_time, language)}
        </Text>) : (<Text>
          ----
        </Text>)
      ) : null,
      onPress: () => {
        if(playerNote.data === undefined || playerNote.data === null){
          Toast.LoginFirst(language);
        }else{
          setStaminaIsCheck(true);
          setIsDisplayBackupStamina(!isDisplayBackupStamina);
        }
      },
      hasDot:
        !staminaIsCheck &&
        playerNote.data?.current_stamina &&
        playerNote.data?.current_stamina === playerNote.data?.max_stamina,
    },
    // 每日實訓
    {
      type: "normal",
      name: playerNote.data
        ? `${playerNote.data?.current_train_score}/${playerNote.data?.max_train_score}`
        : LOCALES[language].NoDataYet,
      icon: Calendar,
      onPress: () => {
        Toast.StillDevelopingToast(language)
      },
    },
    // 模擬宇宙
    {
      type: "normal",
      name: playerNote.data
        ? `${formatNumber(playerNote.data?.current_rogue_score)}/${formatNumber(
          playerNote.data?.max_rogue_score
        )}`
        : LOCALES[language].NoDataYet,
      icon: Planet,
      onPress: () => {
        Toast.StillDevelopingToast(language)
      },
    },
    // 派遣委託
    {
      type: "large",
      name: SCREENS.ExpeditionPage.getShortName(language),
      icon: SCREENS.ExpeditionPage.icon,
      title: playerNote.data ? (
        <>
          <Text className="text-[24px] leading-[26px]">
            {playerNote.data?.accepted_epedition_num}
          </Text>
          <Text>/{playerNote.data?.total_expedition_num}</Text>
        </>
      ) : null,
      subtitle: playerNote.data ? (
        <Text>
          {
            (playerNote.data.expeditions.length === 0 ? LOCALES[language].IsDone :
              _.maxBy(playerNote.data.expeditions, (e: any) => e.remaining_time)
                .remaining_time === 0
                ? LOCALES[language].IsDone
                : formatTimePoint(
                  _.maxBy(
                    playerNote.data.expeditions,
                    (e: any) => e.remaining_time
                  ).remaining_time,
                  language
                )
            )
          }
        </Text>
      ) : null,
      onPress: async () => {
        if(playerNote.data === undefined || playerNote.data === null){
          Toast.LoginFirst(language);
        }else{
          const value = (await db.UserFunctionUsage.doc("ExpeditionPage").get()).data() as UserFunctionUsage
          db.UserFunctionUsage.doc("ExpeditionPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
          // @ts-ignore
          navigation.navigate(SCREENS.ExpeditionPage.id);
          setEpeditionIsCheck(true);
        }
      },
      hasDot:
        !epeditionIsCheck &&
        playerNote.data?.expeditions.filter((e: any) => e.status === "Ongoing")
          .length === 0,
    },
    // 混沌回憶
    {
      type: "normal",
      name: SCREENS.MemoryOfChaosPage.getShortName(language),
      icon: SCREENS.MemoryOfChaosPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("MemoryOfChaosPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("MemoryOfChaosPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.MemoryOfChaosPage.id);
      },
    },
    // 虛構敘事
    {
      type: "normal",
      name: SCREENS.PureFictionPage.getShortName(language),
      icon: SCREENS.PureFictionPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("PureFictionPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("PureFictionPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.PureFictionPage.id);
      },
    },

    // 活動
    {
      type: "normal",
      name: SCREENS.EventListPage.getShortName(language),
      icon: SCREENS.EventListPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("EventListPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("EventListPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.EventListPage.id);
      },
    },
    // 練度排行榜
    {
      type: "normal",
      name: SCREENS.ScoreLeaderboardPage.getShortName(language),
      icon: SCREENS.ScoreLeaderboardPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("ScoreLeaderboardPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("ScoreLeaderboardPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.ScoreLeaderboardPage.id);
      },
    },
    // 混沌回憶排行榜
    {
      type: "normal",
      name: SCREENS.MemoryOfChaosLeaderboardPage.getShortName(language),
      icon: SCREENS.MemoryOfChaosLeaderboardPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("MemoryOFCHaosLeaderboardPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("MemoryOfChaosLeaderboardPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.MemoryOfChaosLeaderboardPage.id);
      },
    }, // 虛構回憶排行榜
    {
      type: "normal",
      name: SCREENS.PureFictionLeaderboardPage.getShortName(language),
      icon: SCREENS.PureFictionLeaderboardPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("PureFictionLeaderboardPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("PureFictionLeaderboardPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.PureFictionLeaderboardPage.id);
      },
    },
    // 兌換碼 : 嗯 毛線球
     /*
     {
       type: "normal",
       name: SCREENS.CodePage.getShortName(language),
       icon: SCREENS.CodePage.icon,
       onPress: () => {
         // const value = (await db.UserFunctionUsage.doc("CodePage").get()).data() as UserFunctionUsage
         // db.UserFunctionUsage.doc("CodePage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
         // @ts-ignore
         navigation.navigate(SCREENS.CodePage.id);
       },
    },
     */

    //排軸 Action Order
    
    {
      type: "normal",
      name: SCREENS.ActionOrderListPage.getShortName(language)+"(PREVIEW)",
      icon: SCREENS.ActionOrderListPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("ActionOrderListPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("ActionOrderListPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.ActionOrderListPage.id, {
          title: LOCALES[language].ActionOrderListPage,
          icon: AlignLeft,
          content: <ActionOrderListScreen />,
        });
      },

    },
     
    // 問卷
    {
      type: "normal",
      name: LOCALES[language].SurveyButton,
      icon: ListChecks,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("SurveyButton").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("SurveyButton").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});    
        AsyncStorage.getItem(SURVEY_URL_JSON_KEY).then(async(dataGet) => {
          const json = JSON.parse(dataGet as string)
          const currUnix = Date.now()/1000
          if(dataGet === undefined || dataGet === "" || json.startUnix > currUnix || json.endUnix < currUnix || json.url === undefined || json.url === ""){
              Toast(LOCALES[language].SurveyButtonNowDontHave)
          }else{
              Linking.openURL(json.url);
          }
          
        })
      },

    },
    // 抽卡模擬
    {
      type: "normal",
      name: SCREENS.LotteryPage.getShortName(language),
      icon: SCREENS.LotteryPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("LotteryPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("LotteryPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.LotteryPage.id, {
          title: LOCALES[language].LotteryPage,
          icon: StarOfDavid,
          content: <LotteryScreen />,
        });
      },

    },// 躍遷分析
    {
      type: "normal",
      name: SCREENS.WrapAnalysisPage.getShortName(language),
      icon: SCREENS.WrapAnalysisPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("WrapAnalysisPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("WrapAnalysisPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.WrapAnalysisPage.id, {
          title: LOCALES[language].WrapAnalysisPage,
          icon: ShootingStar,
          content: <WrapAnalysisScreen />,
        });
      },

    },
    // 地圖
    {
      type: "normal",
      name: SCREENS.MapPage.getShortName(language),
      icon: SCREENS.MapPage.icon,
      onPress: async () => {
        const value = (await db.UserFunctionUsage.doc("MapPage").get()).data() as UserFunctionUsage
        db.UserFunctionUsage.doc("MapPage").set({"count" : (isNaN(value?.count) ? 0 : value?.count)+1});
        // @ts-ignore
        navigation.navigate(SCREENS.MapPage.id);
      },
    },
  ];

  return (
    <View
      style={{flex: 1, justifyContent: 'flex-start' }}
    >
      <ScrollView>
        <View
          onLayout={onLayout}
          className={cn("w-full pt-3 px-4 pb-8")}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 13 }}
        >
          {menuItems.map((menuItem, i) => {
            if (menuItem.type === "normal") {
              return (
                <MenuItem
                  key={i}
                  width={menuItemSize.width}
                  height={menuItemSize.height}
                  Icon={menuItem.icon}
                  onPress={menuItem.onPress}
                  onLongPress={menuItem.onLongPress}
                  hasDot={menuItem?.hasDot}
                >
                  {menuItem.name}
                </MenuItem>
              );
            } else if (menuItem.type === "large") {
              return (
                <MenuItemLarge
                  key={i}
                  width={menuItemLargeSize.width}
                  height={menuItemLargeSize.height}
                  Icon={menuItem.icon}
                  onPress={menuItem.onPress}
                  onLongPress={menuItem.onLongPress}
                  title={menuItem.title}
                  subtitle={menuItem.subtitle}
                  hasDot={menuItem?.hasDot}
                >
                  {menuItem.name}
                </MenuItemLarge>
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
}
