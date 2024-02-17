import DeviceInfo from "react-native-device-info";

//對於ScrollView高度的動態設定
export const dynamicHeightScrollView = (
    DeviceInfo.hasDynamicIsland() ? "z-30 pt-[147px] pb-0" 
    : DeviceInfo.hasNotch() ? "z-30 pt-[127px] pb-0"
    : "z-30 pt-[112px] pb-0"
);

//對於排行榜ScrollView高度的動態設定
export const dynamicHeightLeaderScrollView = (
    DeviceInfo.hasDynamicIsland() ? "p-4 pb-0 pt-[147px]"
    : DeviceInfo.hasNotch() ? "p-4 pb-0 pt-[127px]"
    : "p-4 pb-0 pt-[112px]"
);
//對於怪物列表高度的動態設定
export const dynamicHeightMonsterScrollView = (
    DeviceInfo.hasDynamicIsland() ? "z-30 pt-[130px] pb-0"
    : DeviceInfo.hasNotch() ? "z-30 pt-[110px] pb-0"
    : "z-30 pt-[95px] pb-0"
);

//對於派遣探索ScrollView高度的動態設定
export const dynamicHeightEpditScrollView = (
    DeviceInfo.hasDynamicIsland() ? "h-screen p-4 pb-0 mt-[130px]"
    : DeviceInfo.hasNotch() ? "h-screen p-4 pb-0 mt-[110px]"
    : "h-screen p-4 pb-0 mt-[95px]"
);

//對於Header高度的動態設定 (數值)
export const dynamicHeightHeaderValue = (
    DeviceInfo.hasDynamicIsland() ? 130
    : DeviceInfo.hasNotch() ? 110 
    : 95
);

//對於Header高度的動態設定
export const dynamicHeightHeader = (
    DeviceInfo.hasDynamicIsland() ? "w-full h-[130px]" 
    : DeviceInfo.hasNotch() ? "w-full h-[110px]" 
    : "w-full h-[95px]"
);

//對於ListAction高度的動態設定
export const dynamicHeightListAction = (
    DeviceInfo.hasDynamicIsland() ? "w-full h-[46px] absolute bottom-12 z-50"
    : DeviceInfo.hasNotch() ? "w-full h-[46px] absolute bottom-12 z-50"
    : "w-full h-[46px] absolute bottom-8 z-50"
);

//對於UIDSearchView高度的動態設定
export const dynamicHeightUIDSearchView = (
    DeviceInfo.hasDynamicIsland() ? "h-screen p-4 pb-0 mt-[130px]"
    : DeviceInfo.hasNotch() ? "h-screen p-4 pb-0 mt-[110px]"
    : "h-screen p-4 pb-0 mt-[95px]"
);

//對於EventList高度的動態設定 (活動列表頁)
export const dynamicHeightEventList = (
    DeviceInfo.hasDynamicIsland() ? "z-30 py-[147px] px-[17px] pb-0"
    : DeviceInfo.hasNotch() ? "z-30 py-[127px] px-[17px] pb-0"
    : "z-30 py-[112px] px-[17px] pb-0"
);

//對於EventWebview高度的動態設定 (活動內容頁)
export const dynamicHeightEventWebview = (
    DeviceInfo.hasDynamicIsland() ? "z-30 py-[130px] pb-0"
    : DeviceInfo.hasNotch() ? "z-30 py-[110px] pb-0"
    : "z-30 py-[95px] pb-0"
);

//對於UserInfo AnimatedView的paddingTop的動態設定 (活動內容頁)
export const dynamicHeightUserInfoAnimView = (
    DeviceInfo.hasDynamicIsland() ? "mt-32"
    : DeviceInfo.hasNotch() ? "mt-28"
    : "mt-24"
);