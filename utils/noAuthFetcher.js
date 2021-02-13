import fetch from "isomorphic-unfetch";

export default async (url) => {
  const res = await fetch(url);
  return res.json();
};
