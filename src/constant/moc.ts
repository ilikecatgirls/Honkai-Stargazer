import MOCDataMap from "../../map/memory_of_chao_data_map";
import { TextLanguage } from "../language/language.types";

export const MocVersion = (lang: TextLanguage) => [
  {
    id: 1015,
    name: `${MOCDataMap[1015].time.versionBegin} - ${MOCDataMap[1015].time.versionEnd} ${MOCDataMap[1015].name[lang]}`,
    startBegin: MOCDataMap[1015].time.begin,
  },
  {
    id: 1014,
    name: `${MOCDataMap[1014].time.versionBegin} - ${MOCDataMap[1014].time.versionEnd} ${MOCDataMap[1014].name[lang]}`,
    startBegin: MOCDataMap[1014].time.begin,
  },
  {
    id: 1013,
    name: `${MOCDataMap[1013].time.versionBegin} - ${MOCDataMap[1013].time.versionEnd} ${MOCDataMap[1013].name[lang]}`,
    startBegin: MOCDataMap[1013].time.begin,
  },
  {
    id: 1012,
    name: `${MOCDataMap[1012].time.versionBegin} - ${MOCDataMap[1012].time.versionEnd} ${MOCDataMap[1012].name[lang]}`,
    startBegin: MOCDataMap[1012].time.begin,
  },
  {
    id: 1011,
    name: `${MOCDataMap[1011].time.versionBegin} - ${MOCDataMap[1011].time.versionEnd} ${MOCDataMap[1011].name[lang]}`,
    startBegin: MOCDataMap[1011].time.begin,
  },
  {
    id: 1010,
    name: `${MOCDataMap[1010].time.versionBegin} - ${MOCDataMap[1010].time.versionEnd} ${MOCDataMap[1010].name[lang]}`,
    startBegin: MOCDataMap[1010].time.begin,
  },
  {
    id: 1009,
    name: `${MOCDataMap[1009].time.versionBegin} - ${MOCDataMap[1009].time.versionEnd} ${MOCDataMap[1009].name[lang]}`,
    startBegin: MOCDataMap[1009].time.begin,
  },
  {
    id: 1008,
    name: `${MOCDataMap[1008].time.versionBegin} - ${MOCDataMap[1008].time.versionEnd} ${MOCDataMap[1008].name[lang]}`,
    startBegin: MOCDataMap[1008].time.begin,
  },
];
