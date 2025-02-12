import dayjs from "dayjs";
import "dayjs/locale/zh-tw"; // 導入所需的語言包
import useAppLanguage from "../../language/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../locales";
import { AppLanguage } from "../../language/language.types";

dayjs.locale("zh-tw"); // 設置本地化語言

export function formatTimeDuration(
  second: number,
  language: AppLanguage = "zh_hk"
) {
  // 檢查是否超過30天（30天的秒數）
  const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
  if (second >= thirtyDaysInSeconds) {
    return LOCALES[language].StatusDays.replace("${1}", "30");
  }

  // 計算天數、小時、分鐘和秒數
  const days = Math.floor(second / (24 * 60 * 60));
  const hours = Math.floor((second % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((second % (60 * 60)) / 60);
  const seconds = Number((second % 60).toFixed(0));

  // 構建時間格式化字符串
  let formattedTime = "";
  if (days > 0)
    formattedTime += LOCALES[language].StatusDays.replace("${1}", `${days}`);
  if (hours > 0)
    formattedTime +=
      " " + LOCALES[language].StatusHours.replace("${1}", `${hours}`);
  if (minutes > 0)
    formattedTime +=
      " " + LOCALES[language].StatusMinutes.replace("${1}", `${minutes}`);
  // if (seconds > 0) formattedTime += `${seconds}秒`;

  return formattedTime || LOCALES[language].StatusSeconds.replace("${1}", "0"); // 如果所有時間單位都為0，則返回 '0秒'
}

export function formatTimeDurationSimple(
  second: number,
  language: AppLanguage = "zh_hk"
) {
  // 檢查是否超過30天（30天的秒數）
  const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
  if (second >= thirtyDaysInSeconds) {
    return LOCALES[language].StatusDays.replace("${1}", "30");
  }

  // 計算天數、小時、分鐘和秒數
  const days = Math.floor(second / (24 * 60 * 60));
  const hours = Math.floor((second % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((second % (60 * 60)) / 60);

  // 只返回最大的非零時間單位
  if (days > 0) return LOCALES[language].StatusDays.replace("${1}", `${days}`);
  if (hours > 0)
    return LOCALES[language].StatusHours.replace("${1}", `${hours}`);
  if (minutes > 0)
    return LOCALES[language].StatusMinutes.replace("${1}", `${minutes}`);

  return LOCALES[language].StatusSeconds.replace("${1}", "0"); // 如果所有時間單位都為0，則返回 '0秒'
}

export function formatTimePoint(
  second: number,
  language: AppLanguage = "zh_hk"
) {
  // 取得當前時間
  const now = dayjs();

  const timeAtZero = now.add(second, "second");

  let localizedTime;
  if (timeAtZero.isSame(now, "day")) {
    // 如果是今天，格式化為 "今天 HH:mm"
    localizedTime = LOCALES[language].StatusToday.replace(
      "${1}",
      `${timeAtZero.format("HH:mm")}`
    );
  } else if (timeAtZero.isSame(now.add(1, "day"), "day")) {
    // 如果是明天，格式化為 "明天 HH:mm"
    localizedTime = LOCALES[language].StatusTomorrow.replace(
      "${1}",
      `${timeAtZero.format("HH:mm")}`
    );
  } else {
    // 如果不是今天或明天，使用一般的日期格式
    localizedTime = timeAtZero.format("YYYY/MM/DD HH:mm");
  }

  return localizedTime;
}
