export const buildQueryString = (params: any) => {
  if (!params) return;

  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
};
