interface ccsnptScriptData {
  adminURL: string;
  siteURL: string;
  ccsnptRestApiNonce: string;
  rootApiUrl: string;
  restURL: string;
  version: string;
}

declare global {
  interface window {
    ccsnpt_script_data: ccsnptScriptData;
  }
}
