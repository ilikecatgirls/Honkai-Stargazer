import { useEffect, useState, } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const SURVEY_URL_UPDATE_TIME_KEY = "survey-url-update-unix"
export const SURVEY_URL_JSON_KEY = "survey-url-json"

async function getSurveyURL() {
  const request = await axios(
    "https://firebasestorage.googleapis.com/v0/b/honkai-stargazer-bf382.appspot.com/o/static_data%2FsurveyInfo.json",
    { timeoutErrorMessage: "{downloadTokens: \"-3001\", retcode:-3001, message:\"Firebase SurveyURL Timeout La\"}" }
  )

  const result = request?.data;
  if (result.retcode === -3001) {
    throw new AxiosError(
      "Firebase SurveyURL Timeout La",
      request.status.toString()
    );
  } else if ([200, 201].includes(request.status) === false) {
    throw new AxiosError(
      request.statusText ?? result.data,
      request.status.toString()
    );
  }

  const fileUpdateTimeFromFirebase = request?.data?.updated
  const fileToken = request?.data?.downloadTokens

  AsyncStorage.getItem(SURVEY_URL_UPDATE_TIME_KEY).then(async (dataGet) => {
    //獲取上次更新的時間
    if ((dataGet === null || dataGet !== fileUpdateTimeFromFirebase) && fileToken) {
      const updateTime = dataGet;
      //申請獲取Firebase版本的檔案
      await axios(
        "https://firebasestorage.googleapis.com/v0/b/honkai-stargazer-bf382.appspot.com/o/static_data%2FsurveyInfo.json?alt=media&token=" + fileToken,
        { timeoutErrorMessage: "{downloadTokens: \"-3002\", retcode:-3002, message:\"Firebase SurveyURL Timeout La2\"}" }
      ).then((data) => {
        //獲取了Firebase版本的檔案
        const result = data?.data;
        if (result.retcode === -3002) {
          throw new AxiosError(
            "Firebase SurveyURL Timeout La2",
            data.status.toString()
          );
        } else if ([200, 201].includes(data.status) === false) {
          throw new AxiosError(
            data.statusText ?? result.data,
            data.status.toString()
          );
        }

        const chunksParser = (body : string) => {
            return body
              .replace(/^(\w{1,3})\r\n/, "") // replace header chunks info 
              .replace(/\r\n(\w{1,3})\r\n/, "") // replace in-body chunks info
              .replace(/(\r\n0\r\n\r\n)$/, ""); // replace end chunks info
          };
          
        //console.log(data?.data)
        //儲存最新版本的檔案
        const reducedData = chunksParser(JSON.stringify(data?.data))
        if (data?.data !== null && isJsonString(reducedData)) {
          AsyncStorage.setItem(SURVEY_URL_UPDATE_TIME_KEY, updateTime!);
          AsyncStorage.setItem(SURVEY_URL_JSON_KEY, reducedData);
        }
      })
    }
  });
}
function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    console.log("e : "+e)
    return false;
  }
  return true;
}


export default getSurveyURL