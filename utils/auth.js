/**
 * value = {firstnane: "value", ...}
 */
export const register = async (value) => {
  const regsterInfo = {
    username: "yee",
    email: "admin@mail.io",
    password: "password",
  };
  const res = await fetch(`${API_URL}/auth/local/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(regsterInfo),
  });
  const payload = await res.json();
  console.log(payload);
};
