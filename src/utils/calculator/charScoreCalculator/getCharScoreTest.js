const scoreWeight = require("../sharedData/charWeightList.json");
const demoCharData = require("../sharedData/charDataDemo.json");


function getCharScore(charId, charData) {
  let maxSchoolDataIndex = 0
  let schoolData = []
  for(let index = 0 ; index < scoreWeight[charId].length ; index++){
      
    //const charId = "1217";
    const schoolIndex = index //流派Index

    const lcAdviceScores = 10 //推薦光錐加分
    const lcSuitableScores = 5 //一般光錐加分
    /**
     * 初始化
     **/
    // @ts-ignore
    const charScoreWeight = scoreWeight[charId][schoolIndex]; //對應角色流派内，該角色評分權重
    const charLightconeID = (charData.light_cone === null ? 0 : charData.light_cone.id); //角色使用中的光錐
    const charLightconeSuper = (charData.light_cone === null ? 0 : charData.light_cone.rank); //角色使用中的光錐疊影
    const charPromotion = charData.promotion; //角色突破等級
    const charLevel = charData.level; //角色等級
    const charSoulLvl = charData.rank; //角色的星魂等級
    const charTraceLvl = charData.skills;  //角色行跡内等級

    //合拼 attributes+additions [START] { _ / omit -> lodash}
    let charAttrTMP = new Map();
    charData.attributes.map((attrs) => {
      charAttrTMP.set(attrs.field, attrs.value)
    })
    const charAttrFinal = charData.additions.map((attrs) => { //存放final合拼 attributes+additions
      return { [attrs.field]: attrs.value + (charAttrTMP.get(attrs.field) === undefined ? 0 : charAttrTMP.get(attrs.field)) }
    })
    //合拼 attributes+additions [END]

    // 該角色還沒有權重
    if (!charScoreWeight || charScoreWeight.advice_lightcone.includes(-1)) {
      return 0
    }

    // 光錐分數 -> 10+4% (10 : 推薦 || +4 : 疊影)
    let lightconeScore = 0
    if (charScoreWeight.advice_lightcone.includes(Number(charLightconeID))) {
      lightconeScore = lcAdviceScores
    } else if (charScoreWeight.normal_lightcone.includes(Number(charLightconeID))) {
      lightconeScore = lcSuitableScores
    } else {
      lightconeScore = 0
    }
    lightconeScore += Math.max(charLightconeSuper - 1,0) //疊影 = [2,3,4,5] -> 每次加1分

    // 星魂分數 -> 6%
    let soulScore = 0
    for (let i = 0; i < charScoreWeight.soul.length; i++) {
      if(charScoreWeight.soul[i] < 0) continue;
      if (charSoulLvl >= charScoreWeight.soul[i]) {
        soulScore += ((6 / charScoreWeight.soul.length))
      } else {
        break;
      }
    }

    // 行跡分數 -> 34%
    let traceScore = 0
    let isChecked = [false, false, false, false];
    charTraceLvl.map((trace) => {
      switch (trace.type) {
        case "Normal": if (isChecked[0]) return; isChecked[0] = true; traceScore += charScoreWeight.trace.normal_atk * trace.level *2 / 3; break; //Max 9*2/3 = 6
        case "Ultra": if (isChecked[1]) return; isChecked[1] = true; traceScore += charScoreWeight.trace.ultimate * trace.level *2/ 3; break; //Max 15*2/3 = 10
        case "Talent": if (isChecked[2]) return; isChecked[2] = true; traceScore += charScoreWeight.trace.talent * trace.level *2/ 3; break;  //Max 15*2/3 = 10
        case "BPSkill": if (isChecked[3]) return; isChecked[3] = true; traceScore += charScoreWeight.trace.skill * trace.level *2/ 3; break;  //Max 15*2/3 = 10
        default: traceScore += 0
      }
      console.log(trace.type+" : "+ trace.level )
    })

    //突破分數 -> 6%
    let promotionScore = charPromotion

    // 屬性分數 -> 60%
    let attrScore = 0
    let attrWeightSum = 0 //總權重淨值 (1.5+2+1+...)

    const attrGradKeys = Object.keys(charScoreWeight.grad); //獲取所有有畢業值的屬性
    const attrWeightValidKeys = Object.keys(charScoreWeight.attr); //獲取所有有畢業值的屬性
    for (let x = 0; x < attrWeightValidKeys.length; x++) {
      if (attrGradKeys.includes(attrWeightValidKeys[x])) {
        attrWeightSum += charScoreWeight.attr[attrWeightValidKeys[x]] //計算總權重淨值 (1.5+2+1+...)
      }
    }

    charAttrFinal.map((attrs) => {
      const name = Object.keys(attrs)[0];
      const counts = Object.keys(attrs).length;
      const attrValue = attrs[name] + (name === "sp_rate" ? 1 : 0);
      const weightValue = charScoreWeight.attr[name];
      const gradValue = charScoreWeight.grad[name];
      /*
      attrScore += 
      (weightValue === undefined ? 0 : weightValue) 
      * (attrValue < 3 ? attrValue * 10 : (attrValue > 200 ? attrValue / 100 : attrValue / 10))
      */

      if (gradValue === undefined || weightValue === undefined) {
        //...如果沒有畢業分，做甚麼？只能不算
      } else {
        attrScore += (attrValue / gradValue) //畢業比率
          * ((0.5 * Math.pow(charLevel, 2) / 80) / 40) //角色等級Curve
          * (weightValue / attrWeightSum) * 60 //滿分的佔比
        // console.log(name + " : " + (attrValue) + " / " + (gradValue) + " || " + ((attrValue) / (gradValue)) + " || " + ((attrValue) / (gradValue)) * (weightValue / attrWeightSum) * 58) //畢業比率

      }      
    })

    //最大值 120 , 畢業100
    console.log(lightconeScore+"||"+ soulScore+"||" + traceScore +"||"+ attrScore+"||"+promotionScore)

    schoolData.push((lightconeScore + soulScore + traceScore + attrScore + promotionScore))
    if(schoolData[index] > schoolData[maxSchoolDataIndex]){
      maxSchoolDataIndex = index;
    }
  }
  console.log(schoolData)
  return schoolData[maxSchoolDataIndex]
}

function getCharRank(score){
  if(score < 20){return "D"}
  if(score < 40){return "C"}
  if(score < 60){return "B"}
  if(score < 80){return "A"}
  if(score < 100){return "S"}
  else return "SS"
}

//console.log((getCharScore("1006",demoCharData)))


function getCurrAndGradScore(charId, charData){
  const returnValue = [] //返回變量
  for (let index = 0; index < scoreWeight[charId].length; index++) {
    const returnValueThisSchool = []
    const charScoreWeight = scoreWeight[charId][index]; //對應角色流派内，該角色評分權重
    //合拼 attributes+additions [START] { _ / omit -> lodash}
      let charAttrTMP = new Map();
      charData.attributes.map((attrs) => {
        charAttrTMP.set(attrs.field, attrs.value)
      })
      const charAttrFinal = charData.additions.map((attrs) => { //存放final合拼 attributes+additions
        return { [attrs.field]: attrs.value + (charAttrTMP.get(attrs.field) === undefined ? 0 : charAttrTMP.get(attrs.field)) + (attrs.field === "sp_rate" ? 1 : 0) }
      })
      //合拼 attributes+additions [END]
      charAttrFinal.map((attrs) => {
        const name = Object.keys(attrs)[0];
        const attrValue = attrs[name];
        const gradValue = charScoreWeight.grad[name];
        const intList = ["atk","def","hp","spd","sp"] //只有這些才是整數 -> value
        if (gradValue === undefined || attrValue === undefined) {
          //...如果沒有畢業分，做甚麼？只能不算
        }else{
          returnValueThisSchool.push({[name] : [attrValue , gradValue, (intList.includes(name) ? "value" : "percent")]})
        }
      })
      returnValue.push(returnValueThisSchool)
    }
    return returnValue;
}
console.log(JSON.stringify(getCharScore("1305",demoCharData)))
