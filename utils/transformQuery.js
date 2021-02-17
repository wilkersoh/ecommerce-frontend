/**
  arrayObj - [ {brand_name: "", brandCount: "1"} ]
  Transform TO:
  let result = {
    brands: {
      SARASA: 2,
      YZ_創意文創: 1
    }
  }
*/
export const arrayObjectToObj = (arrayObj) => {
  const [name, count] = Object.keys(arrayObj[0]);
  const objKeyName = name.split("_")[0] + "s";

  const result = arrayObj.reduce(
    (acc, obj) => {
      if (!obj[name]) return acc;

      const key = obj[name].replace(" ", "_");
      [acc[objKeyName][key]] = obj[count];
      return acc;
    },
    { [objKeyName]: {} }
  );

  return result;
};

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
