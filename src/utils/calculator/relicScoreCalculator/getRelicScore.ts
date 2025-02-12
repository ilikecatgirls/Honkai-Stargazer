//import scoreWeight from "../../../../data/weight_data/relicWeightList.json";
import { useEffect, useState } from "react";
import useCharWeightList from "../../../hooks/charWeightList/useCharWeightList";
import { getAttrKeyByPropertyType, getGeneralAttrTypeByKey, getKeyByGeneralAttrType } from "../../hoyolab/exchange/exchange";

export default function getRelicScore(
  charId: string,
  charRelicsData: {
    id: string;
    name: string;
    level: number;
    rarity: number;
    icon: string;
    main_affix: {
      type: string;
      value: number;
    };
    sub_affix: {
      type: string;
      value: number;
    }[];
  }[],
  scoreWeight? : {}
) {
  /**
   * 初始化
   **/
  // @ts-ignore
  const charScoreWeight = (scoreWeight[charId] === undefined ? undefined : scoreWeight[charId][0]);

  // 該角色還沒有權重
  if (!charScoreWeight) {
    return {
      eachScore: null,
      totalScore: -1,
    };
  }

  //遺器的次序
  const relicOrderExpect = ["Head", "Hands", "Body", "Shoes", "Ball", "Link"];
  //const relicRarityExpectPercent = [1,0.7,0.5,0.25,0.1];
  const relicRarityExpectPercent = [1, 0.8, 0.6, 0.4, 0.2];
  let relicOrder: string[] = [];
  let relicRarity: number[] = [];

  // 主詞條數據
  const relicMainValue = charRelicsData.map((relic) => {
    const tmpId = getIconStrById(Number(relic.id));
    const tmpVar = relic.icon?.split(".")[0].replace("icon/relic/", "") || Math.floor(tmpId / 10).toString()+"_"+(tmpId % 10 - (tmpId % 10 > 4 ? 4 : 0));
    const relicFindPosition =
      tmpVar[0] === "3"
        ? Number(tmpVar[tmpVar.length - 1]) + 4
        : Number(tmpVar[tmpVar.length - 1]);

    relicOrder.push(relicOrderExpect[relicFindPosition]);
    relicRarity.push(relic.rarity);

    return { [relic.main_affix.type]: relic.main_affix.value };
  });
  // 副詞條數據
  const relicSubValue = charRelicsData.map((relic) =>
    relic.sub_affix.map((sub) => ({
      [sub.type]: sub.value,
    }))
  );
  // 遺器等級
  const relicLevelValue = charRelicsData.map((relic) => relic.level);

  // 主詞條權重
  const relicMainScoreWeight = charScoreWeight?.relicScore?.main;
  const relicMainScoreWeightDefault = charScoreWeight?.attr; //不是推薦的選項 (hp)
  // 副詞條權重
  const relicSubScoreWeight = charScoreWeight?.attr;

  /**
   * 主詞條積分
   **/

  //這個位置要留意一下，因爲我當時沒有判斷到是否有齊6個遺器，假如資料只有0-5個遺器，一定出問題

  //主詞條分數詳情
  const relicMainScore = relicMainValue.map((main, i) => {
    // 主詞條名稱
    const name = Object.keys(main)[0]; //HPDelta
    // 主詞條權重 : (推薦權重默認為1 , 沒推薦默認按Attr表)
    const weight = (i < 2 ? 0 : ( //檢查是否主詞條不變的頭部&手部
          name === getGeneralAttrTypeByKey(relicMainScoreWeight[i-2],true) ? 1 : (//檢查主詞條是否推薦詞條
          (name !== undefined && name !== "UnknownAttrType") //到JSON內的attr:[]找詞條權重
          ? (relicMainScoreWeightDefault[getKeyByGeneralAttrType(name)] || 0)
          : 0
        )
      )
    );

    //按遺器位置内、主詞條加成和 [等級] (特定情況下) 計算積分
    switch (relicOrderExpect.indexOf(relicOrder[i])) {
      case 0:
      case 1:
        //return { [name[i]]: 0 };
        return { [relicOrder[i]]: 0 };

      case 2:
      case 4:
        return {
          [relicOrder[i]]:
            Math.min(5.83 * weight + relicLevelValue[i] * 0.66, 5.83) + 10,
        };

      case 3:
      case 5:
        return { [relicOrder[i]]: 5.83 * weight };

      default:
        return { [relicOrder[i]]: 0 };
    }
  });

  /**
   * 副詞條積分
   **/

  //各個遺器内所有副詞條總分
  let relicSubFinalScore: number[] = [];
  relicOrder.map(() => {
    relicSubFinalScore.push(0);
  });

  //這個位置要留意一下，因爲我當時沒有判斷到是否有齊6個遺器，假如資料只有0-5個遺器，一定出問題
  //副詞條分數詳情
  const relicSubScore = relicSubValue.map((main, i) => {
    return main.map((sub, j) => {
      // 副詞條名稱
      const name = Object.keys(sub)[0];
      // 副詞條數值 - 下捨入到一位小數
      const attrValue = Math.trunc(sub[name] === undefined ? 0 : sub[name]*1000)/1000;
      /* Deprecated
      // 副詞條權重 - 四捨五入補償
      const charAttrWeight =
        relicSubScoreWeight[name] == 0.3 || relicSubScoreWeight[name] == 0.8
          ? relicSubScoreWeight[name] - 0.05
          : relicSubScoreWeight[name];
      */
      const charAttrWeight = (relicSubScoreWeight[getKeyByGeneralAttrType(name)] || 0);
      // 臨時計分用
      let tmpScore = 0;

      //按副詞條加成和特定倍率計算積分
      //AddedRatio -> % (要乘100) || Delta -> Integer
      switch (name) {
        case "AttackAddedRatio": {
          tmpScore = attrValue * 100 * 1.5 * charAttrWeight;
          break;
        }
        case "AttackDelta": {
          tmpScore = attrValue * 0.3 * 0.5 * charAttrWeight;
          break;
        }
        case "DefenceAddedRatio": {
          tmpScore = attrValue * 100 * 1.19 * charAttrWeight;
          break;
        }
        case "DefenceDelta": {
          tmpScore = attrValue * 0.3 * 0.5 * charAttrWeight;
          break;
        }
        case "HPAddedRatio": {
          tmpScore = attrValue * 100 * 1.5 * charAttrWeight;
          break;
        }
        case "HPDelta": {
          tmpScore = attrValue * 0.153 * 0.5 * charAttrWeight;
          break;
        }
        case "SpeedDelta": {
          tmpScore = attrValue * 2.53 * charAttrWeight;
          break;
        }
        case "PhysicalAddedRatio": {
          tmpScore = attrValue * 100 * charAttrWeight;
          break;
        }
        case "FireAddedRatio": {
          tmpScore = attrValue * 100 * charAttrWeight;
          break;
        }
        case "IceAddedRatio": {
          tmpScore = attrValue * 100 * charAttrWeight;
          break;
        }
        case "ThunderAddedRatio": {
          tmpScore = attrValue * 100 * charAttrWeight;
          break;
        }
        case "WindAddedRatio": {
          tmpScore = attrValue * 100 * charAttrWeight;
          break;
        }
        case "QuantumAddedRatio": {
          tmpScore = attrValue * charAttrWeight;
          break;
        }
        case "ImaginaryAddedRatio": {
          tmpScore = attrValue * 100 * charAttrWeight;
          break;
        }
        case "CriticalChanceBase": {
          tmpScore = attrValue * 100 * 2 * charAttrWeight;
          break;
        }
        case "CriticalDamageBase": {
          tmpScore = attrValue * 100 * 1 * charAttrWeight;
          break;
        }
        case "BreakDamageAddedRatioBase": {
          tmpScore = attrValue * 100 * 1 * charAttrWeight;
          break;
        }
        case "StatusProbabilityBase": {
          tmpScore = attrValue * 100 * 1.49 * charAttrWeight;
          break;
        }
        case "StatusResistanceBase": {
          tmpScore = attrValue * 100 * 1.49 * charAttrWeight;
          break;
        }
      }
      //把得分放入指定遺器内副詞條總分
      relicSubFinalScore[i] += tmpScore;
      return { [relicOrder[i] + "_sub" + j]: tmpScore };
    });
  });

  //單一遺器的總分
  const relicEachFinalScore = relicSubFinalScore.map((val, i) => {
    return {
      [relicOrder[i]]:
        (val + relicMainScore[i][relicOrder[i]]) *
        relicRarityExpectPercent[5 - relicRarity[i]],
    };
  });

  //所有遺器合共的總分 !!!
  let relicAllFinalScore = 0;

  //計算遺器們合共的總分
  relicEachFinalScore.map((val, i) => {
    relicAllFinalScore += val[relicOrder[i]];
  });

  //你只需要 relicAllFinalScore 去計算評價等級 (等級範圍明天聊)
  return {
    mainScore: relicMainScore,
    subScore: relicSubScore,
    eachScore: relicEachFinalScore,
    totalScore: relicAllFinalScore,
  };
}

export function getRelicScoreRange(score: number) {
  // 10,20,30,40,50 (0,+10,+10,+10,+10)
  // 6,14,22,36,45 (0,+8,+8,+14,+9)
  // 6,10,14,20,28,36,45 (0,+4,+4,+6,+8,+8,+9) -> Using
  //if (score < 6) return "E";
  if (score < 10) return "D";
  if (score < 14) return "C";
  if (score < 20) return "B";
  if (score < 28) return "A";
  if (score < 36) return "S";
  if (score >= 36) return "SS";
  //if (score < 45) return "SS";
  //if (score >= 45) return "Voc";
  return "D";
}

export function getRelicTotalScoreRange(score: number) {
  // if (score < 40) return "D";
  // else if (score < 80) return "C";
  // else if (score < 100) return "B";
  // else if (score < 120) return "A";
  // else if (score < 160) return "S";
  // return "SS";
  if (score < 40) return "D";
  else if (score < 80) return "C";
  else if (score < 120) return "B";
  else if (score < 160) return "A";
  else if (score < 200) return "S";
  return "SS";
}

function getIconStrById(id : number){
  let tmpId = id;
  while (tmpId > 10000){
    tmpId -= 10000;
  }
  return tmpId;
}
