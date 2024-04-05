import { useEffect, useState, } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const CHAR_WEIGHT_LIST_JSON_KEY = "char-weight-list-json"

async function useCharWeightList() {
  return await AsyncStorage.getItem(CHAR_WEIGHT_LIST_JSON_KEY).then(async (dataJSON) => {
    if (dataJSON !== null && isJsonString(JSON.stringify(dataJSON))) {
      return JSON.parse(dataJSON);
    }else{
      return [];
    }
  })
};
function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


export default useCharWeightList;
