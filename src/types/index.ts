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

  export type SnippetParams = {
    searchByItem?: string;
    startDate?: string;
    endDate?: string;
    offset: number;
    limit: number;
  };

export type SnippetPagiProps = {
  params: SnippetParams;
  setParams: (params: SnippetParams) => void;
  totalPages: number;
};

export type GetSnippetsResponse = {
  results: [
    {
      id: number | string;
      title: string;
      description: string;
      codesnippet: string;
      tags: string;
      scope?: string;
      priority: number;
      active: boolean | number;
      created_at?: string;
      created_by?: string;
      updated_at?: string;
      updated_by?: string;
    }
  ];
  total_count: number;
};
