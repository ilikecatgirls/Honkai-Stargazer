// const route = useRoute<RouteProp<ParamList, "Character">>();

import {
  hsrPlatform,
  hsrServerId,
} from "../utils/hoyolab/servers/hsrServer.types";
import { CharacterName } from "./character";

export type ParamList = {
  Character: {
    id: string;
    commentId?: string;
  };
  Lightcone: { id: string; name: string };
  Relic: { id: string; name: string };
  Login: { platform: hsrPlatform; serverId: hsrServerId };
  Event: { id: string };
  UserInfo: { uuid: string };
  UserCharDetail: { uuid: string; charId: CharacterName };
  MemoryOfChaosLeaderboard: { scheduleId?: number; floorNumber?: number, isShowingMore?: boolean };
  PureFictionLeaderboard: { scheduleId?: number; floorNumber?: number, isShowingMore?: boolean  };
  Description: {
    title: string;
    icon: any;
    content: any;
  };
  Lottery: { id: string };
  LotteryRecord: { currPage: number, titleLocale: string[] };
  WrapAnalysis: { uuid: string };
};
