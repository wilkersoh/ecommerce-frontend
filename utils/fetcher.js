import fetch from "isomorphic-unfetch";

export default async (url, token) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "same-origin",
  });

  return res.json(); // 这里的 data 会pass回去 dashboard useSWR()
};
