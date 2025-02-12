import { useQuery } from "react-query";
import useHoyolabCookie from "../../redux/hoyolabCookie/useHoyolabCookie";
import useHsrUUID from "./useHsrUUID";
import useHsrServerChosen from "../../redux/hsrServerChosen/useHsrServerChosen";
import HoyolabRequest from "../../utils/hoyolab/request/HoyolabRequest";
import MihoyoRequest from "../../utils/hoyolab/request/MihoyoRequest";
import { isHoyolabPlatform } from "../../utils/hoyolab/utils";
import useAppLanguage from "../../language/AppLanguage/useAppLanguage";
import appLangHoyoLangMap from "../../utils/hoyolab/language/appLangHoyoLangMap";

const useHsrEventList = () => {
  const { language } = useAppLanguage();

  const HsrUUID = useHsrUUID();
  const { hsrServerChosen } = useHsrServerChosen();

  const { data, isError, error, isLoading, isFetching, refetch } = useQuery(
    ["hsr-event-list", HsrUUID, hsrServerChosen],
    () =>
      new (isHoyolabPlatform(hsrServerChosen) ? HoyolabRequest : MihoyoRequest)(
        null,
        appLangHoyoLangMap[language]
      ).getHsrEventList(HsrUUID, hsrServerChosen),
    {
      select(data) {
        return data?.data;
      },
    }
  );
  return { data, isError, error, isLoading, isFetching, refetch };
};

export default useHsrEventList;
