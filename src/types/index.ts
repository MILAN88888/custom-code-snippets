export type ccsnptScriptDataType = {
  adminURL: string;
  siteURL: string;
  ccsnptRestApiNonce: string;
  rootApiUrl: string;
  restURL: string;
  version: string;
};

export type AddNew = {
  id: number | string;
  title: string;
  codesnippet: string;
  priority: number;
  description: string;
  tags: string;
  active: boolean | number;
};

export type BackendErrors = {
	[key: string]: string;
  };
