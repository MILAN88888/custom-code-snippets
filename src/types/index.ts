export type ccsnptScriptDataType = {
  adminURL: string;
  siteURL: string;
  ccsnptRestApiNonce: string;
  rootApiUrl: string;
  restURL: string;
  version: string;
};

export type AddNew = {
  title: string;
  codeSnippet: string;
  priority: number;
  description: string;
  tags: string;
};
