export default async (url, token) => {
  const res = await fetch(url, {
    method: "GET",
    // headers: new Headers({ "Content-Type": "application/json", token }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "same-origin",
  });

  console.log("token:", token);

  const data = await res.json();

  return data; // 这里的 data 会pass回去 dashboard useSWR()
};
