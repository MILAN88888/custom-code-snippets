import { ccsnptScriptData } from "./../utils/global";

const BASE_URL = ccsnptScriptData.restURL+'custom-code-snippets/';

export const ENDPOINTS = {
  AddNew: `${BASE_URL}snippets/save`,
  GetSnippets: `${BASE_URL}snippets/get`,
  UpdateStatusSnippets: `${BASE_URL}snippets/update/status`,
  DeleteSnippets: `${BASE_URL}snippets/delete`
};
