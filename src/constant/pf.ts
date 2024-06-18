import PFDataMap from "../../map/pure_fiction_data_map";
import { TextLanguage } from "../language/language.types";

export const PFVersion = (lang: TextLanguage) => [
  {
    id: 2007,
    name: `${PFDataMap[2007].name[lang]}`,
    startBegin: PFDataMap[2007].time.begin,
  },
  {
    id: 2006,
    name: `${PFDataMap[2006].name[lang]}`,
    startBegin: PFDataMap[2006].time.begin,
  },
  {
    id: 2005,
    name: `${PFDataMap[2005].name[lang]}`,
    startBegin: PFDataMap[2005].time.begin,
  },
  {
    id: 2004,
    name: `${PFDataMap[2004].name[lang]}`,
    startBegin: PFDataMap[2004].time.begin,
  },
  {
    id: 2003,
    name: `${PFDataMap[2003].name[lang]}`,
    startBegin: PFDataMap[2003].time.begin,
  },
  {
    id: 2002,
    name: `${PFDataMap[2002].name[lang]}`,
    startBegin: PFDataMap[2002].time.begin,
  },
  {
    id: 2001,
    name: `${PFDataMap[2001].name[lang]}`,
    startBegin: PFDataMap[2001].time.begin,
  },
];
