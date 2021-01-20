import fetch from "isomorphic-unfetch";

export default async (url) => {
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  return res.json(); // 这里的 data 会pass回去 dashboard useSWR()
};
