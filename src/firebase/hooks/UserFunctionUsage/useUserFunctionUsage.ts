import db from "../../db";
import { useQuery } from "react-query";
import UserFunctionUsage from "../../models/UserFunctionUsage";

const useUserFunctionUsage = (functionId: string) => {
  const data = useQuery(
    ["firebase-user-function-usage", functionId],
    () =>
      db.UserFunctionUsage.doc(functionId)
        .get()
        .then((data) => {
          const functionData = data.data() as UserFunctionUsage;
          return functionData;
        }),
  );
  return data;
};

export default useUserFunctionUsage;
