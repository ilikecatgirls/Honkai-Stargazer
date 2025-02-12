import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

const getDynamicIsland = DeviceInfo.hasDynamicIsland();
const getNotch = (Platform.OS === 'ios' ? DeviceInfo.hasNotch() : true);

//對於ScrollView高度的動態設定
export const dynamicHeightScrollView = (
    getDynamicIsland ? "z-30 pt-[147px] pb-0  px-[8px] " 
    : getNotch ? "z-30 pt-[127px] pb-0  px-[8px] "
    : "z-30 pt-[112px] pb-0  px-[8px] "
);

//對於ScrollView + 左右Padding高度的動態設定
export const dynamicHeightScrollViewLRPadding = (
    getDynamicIsland ? "z-30 py-[147px] px-[17px] pb-0" 
    : getNotch ? "z-30 py-[127px] px-[17px] pb-0"
    : "z-30 py-[112px] px-[17px] pb-0"
);
//對於設定頁ScrollView高度的動態設定
export const dynamicHeightSettingScrollView = (
    getDynamicIsland ? "z-30 h-screen py-[130px] px-4 pb-0" 
    : getNotch ? "z-30 h-screen py-[110px] px-4 pb-0"
    : "z-30 h-screen py-[95px] px-4 pb-0"
);

//對於排行榜ScrollView高度的動態設定
export const dynamicHeightLeaderScrollView = (
    getDynamicIsland ? "p-4 pb-0 pt-[147px]"
    : getNotch ? "p-4 pb-0 pt-[127px]"
    : "p-4 pb-0 pt-[112px]"
);
//對於怪物列表高度的動態設定
export const dynamicHeightMonsterScrollView = (
    getDynamicIsland ? "z-30 pt-[130px] pb-0"
    : getNotch ? "z-30 pt-[110px] pb-0"
    : "z-30 pt-[95px] pb-0"
);

//對於派遣探索ScrollView高度的動態設定
export const dynamicHeightEpditScrollView = (
    getDynamicIsland ? "h-screen p-4 pb-0 mt-[130px]"
    : getNotch ? "h-screen p-4 pb-0 mt-[110px]"
    : "h-screen p-4 pb-0 mt-[95px]"
);

//對於Header高度的動態設定 (數值)
export const dynamicHeightHeaderValue = (
    getDynamicIsland ? 130
    : getNotch ? 110 
    : 95
);

//對於Header高度的動態設定
export const dynamicHeightHeader = (
    getDynamicIsland ? "w-full h-[130px]" 
    : getNotch ? "w-full h-[110px]" 
    : "w-full h-[95px]"
);

//對於ListAction高度的動態設定
export const dynamicHeightListAction = (
    getDynamicIsland ? "w-full h-[46px] absolute bottom-12 z-50"
    : getNotch ? "w-full h-[46px] absolute bottom-12 z-50"
    : "w-full h-[46px] absolute bottom-8 z-50"
);

//對於UIDSearchView高度的動態設定
export const dynamicHeightUIDSearchView = (
    getDynamicIsland ? "h-screen p-4 pb-0 mt-[130px]"
    : getNotch ? "h-screen p-4 pb-0 mt-[110px]"
    : "h-screen p-4 pb-0 mt-[95px]"
);

//對於EventList高度的動態設定 (活動列表頁)
export const dynamicHeightEventList = (
    getDynamicIsland ? "z-30 py-[147px] px-[17px]"
    : getNotch ? "z-30 py-[127px] px-[17px]"
    : "z-30 py-[112px] px-[17px]"
);

//對於EventWebview高度的動態設定 (活動內容頁)
export const dynamicHeightEventWebview = (
    getDynamicIsland ? "z-30 py-[130px] pb-0"
    : getNotch ? "z-30 py-[110px] pb-0"
    : "z-30 py-[95px] pb-0"
);

//對於UserInfo AnimatedView的paddingTop的動態設定 (活動內容頁)
export const dynamicHeightUserInfoAnimView = (
    getDynamicIsland ? "mt-32"
    : getNotch ? "mt-28"
    : "mt-24"
);


//對於WallpaperChanger的View動態設定 (活動內容頁)
export const dynamicHeightWallpaperChangerView = (
    getDynamicIsland ? "w-full h-full z-30 mt-[130px]"
    : getNotch ? "w-full h-full z-30 mt-[110px]"
    : "w-full h-full z-30 mt-[95px]"
);

//對於無語狀態下的400動態設定 (桌布更換)
export const dynamicHeightWallpaperSwiper = (
    getDynamicIsland ? 400
    : getNotch ? 370
    : 340
);

//對於登入頁面Webview高度動態設定
export const dynamicHeightLoginWebview = (
    getDynamicIsland ? "mt-[130px]"
    : getNotch ? "mt-[110px]"
    : "mt-[95px]"
);
//對於篩選介面置中
export const dynamicFilterCenter = (
    getDynamicIsland ? "absolute bottom-28 translate-x-[-6px] h-[100px]"
    : getNotch ? "absolute bottom-24 translate-x-[-6px] h-[100px]"
    : "absolute bottom-16 translate-x-[-6px] h-[100px]"
);

//對於頁面底部預留高度動態設定
export const dynamicHeightBottomBar = (
    (Dimensions.get('screen').height - Dimensions.get('window').height > 48
    ? Dimensions.get('screen').height - Dimensions.get('window').height 
    : 48
    )
);

//對於頁面頂部Header預留高度動態設定
export const dynamicHeightTopHeader = (
    getDynamicIsland ? "pt-[147px]" 
    : getNotch ? "pt-[127px]"
    : "pt-[112px]"
);
