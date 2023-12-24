import { useQuery } from "react-query";
import useHoyolabCookie from "../../redux/hoyolabCookie/useHoyolabCookie";
import useHsrUUID from "./useHsrUUID";
import useHsrServerChosen from "../../redux/hsrServerChosen/useHsrServerChosen";
import HoyolabRequest from "../../utils/hoyolab/HoyolabRequest";

const useHsrFullData = () => {
  const { hoyolabCookie } = useHoyolabCookie();
  const HsrUUID = useHsrUUID();
  const { hsrServerChosen } = useHsrServerChosen();

  const { data, isError, error, isLoading, isFetching } = useQuery(
    ["hsr-full-data", hoyolabCookie, HsrUUID, hsrServerChosen],
    () =>
      new HoyolabRequest(hoyolabCookie).getHsrFullData(
        HsrUUID,
        hsrServerChosen
      ),
    {
      select(data) {
        return data?.data;
      },
    }
  );
  return { data, isError, error, isLoading, isFetching };
};

export default useHsrFullData;
