import { ENDPOINTS } from "./endpoints";
import apiFetch from "@wordpress/api-fetch";
import { ccsnptScriptData } from "./../utils/global";

export const addNewSnippet = async (addNewData: any) => {
  return apiFetch({
    path: ENDPOINTS.AddNew,
    method: "POST",
    headers: {
      "X-WP-Nonce": ccsnptScriptData.ccsnptRestApiNonce
    },
    data: {
      add_new_data: addNewData
    }
  }).then((res) => res);
};
