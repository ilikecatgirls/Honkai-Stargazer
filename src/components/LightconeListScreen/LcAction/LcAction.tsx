import { KeyboardAvoidingView } from "react-native";
import React, { useEffect } from "react";
import OrderAction from "./OrderAction/OrderAction";
import FilterAction from "./FilterAction/FilterAction";
import SearchAction from "./SearchAction/SearchAction";
import useLightconeIsSearching from "../../../redux/lightconeIsSearching/useLightconeIsSearching";
import useLightconeSearch from "../../../redux/lightconeSearch/useLightconeSearch";
import { dynamicHeightListAction } from "../../../constant/ui";

export default function LcAction() {
  const { isSearching, setIsSearching } = useLightconeIsSearching();
  const { setSearchValue } = useLightconeSearch();

  useEffect(() => {
    return () => {
      setIsSearching(false);
      setSearchValue("");
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={25}
      className={dynamicHeightListAction}
      contentContainerStyle={{
        justifyContent: isSearching ? "flex-end" : "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 11,
      }}
    >
      {isSearching || (
        <>
          <FilterAction />
          <OrderAction />
        </>
      )}
      <SearchAction />
    </KeyboardAvoidingView>
  );
}
