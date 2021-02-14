export const objToQueryStr = (obj) => {
  if (obj === undefined || !Object.keys(obj).length) return;

  const arrayObject = Object.entries(obj);
  let valueArrays = arrayObject.map(([key, values]) => {
    const str = values.map((value) => {
      return `${key}=${value.trim().replace("_", " ").replace(" ", "%20")}`;
    });
    return str;
  });

  const result = valueArrays.flat().join("&");
  return result;
};
