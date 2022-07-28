export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json());

export const getHeaders = (token: string) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  return headers;
};
