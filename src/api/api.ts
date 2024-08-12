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
    data: addNewData
  }).then((res) => res);
};

export const getSnippets = async (params: any) => {
  return apiFetch({
    path: ENDPOINTS.GetSnippets,
    method: "POST",
    headers: {
      "X-WP-Nonce": ccsnptScriptData.ccsnptRestApiNonce
    },
    data: params
  }).then((res) => res);
};

export const updateStatusSnippets = async (data: any) => {
  return apiFetch({
    path: ENDPOINTS.UpdateStatusSnippets,
    method: "POST",
    headers: {
      "X-WP-Nonce": ccsnptScriptData.ccsnptRestApiNonce
    },
    data: data
  }).then((res) => res);
};

export const deleteSnippets = async (ids: any) => {
  return apiFetch({
    path: ENDPOINTS.DeleteSnippets,
    method: "POST",
    headers: {
      "X-WP-Nonce": ccsnptScriptData.ccsnptRestApiNonce
    },
    data: ids
  }).then((res) => res);
};
