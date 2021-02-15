import { useState, useEffect, createContext, useContext } from "react";
import useSWR from "swr";
import noAuthFetcher from "../utils/noAuthFetcher";
import { objToQueryStr } from "../utils/transformQuery";
import { API_URL } from "../utils/urls";

const FilterContext = createContext();

export const FilterProvider = ({ children, category_slug }) => {
  const filter = useFilterProvider(category_slug);

  return (
    <FilterContext.Provider value={filter}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);

const useFilterProvider = (category_slug) => {
  const [filterLists, setFilterList] = useState({});
  const [searchValue, setSearchValue] = useState({});
  const [onlyFirstFilter, setOnlyFirstFilter] = useState(true);

  const { data: filterListData } = useSWR(
    `${API_URL}/products/getFilterList?category_slug=${category_slug}`,
    noAuthFetcher,
    {
      dedupingInterval: 60000,
    }
  );

  useEffect(() => {
    if (!Array.isArray(filterListData)) return; // return {500 error}, to avoid popup page error

    const [brands, types, tags] = filterListData;

    /** Transform To Below data format
      let dataFormat = {
        brands: {
          SARASA: 2,
          YZ_創意文創: 1
        },
        types: {},
        tags: {},
      }
    */

    const brandsData = brands.reduce(
      (acc, obj) => {
        if (!obj["brand_name"]) return acc;
        const key = obj["brand_name"].replace(" ", "_");
        [acc["brands"][key]] = obj["brandCount"];
        return acc;
      },
      { brands: {} }
    );
    const typesData = types.reduce(
      (acc, obj) => {
        if (!obj["type_name"]) return acc;
        const key = obj["type_name"].replace(" ", "_");
        [acc["types"][key]] = obj["typeCount"];
        return acc;
      },
      { types: {} }
    );
    const tagsData = tags.reduce(
      (acc, obj) => {
        if (!obj["tag_name"]) return acc;
        const key = obj["tag_name"].replace(" ", "_");
        [acc["tags"][key]] = obj["tagCount"];
        return acc;
      },
      { tags: {} }
    );

    const result = { ...brandsData, ...typesData, ...tagsData };

    setFilterList(result);
  }, [filterListData]);

  // showFiltered?types=value&types=value&brands=value
  const { data: showFilterData, error } = useSWR(
    `${API_URL}/products/showFiltered?category_slug=${category_slug}&${objToQueryStr(
      searchValue
    )}`,
    noAuthFetcher,
    {
      dedupingInterval: 60000,
    }
  );

  useEffect(() => {
    /**
     * Initial Filter Values (all filtered list)
      {
        brands: ["value", "value"],
        types: ["value"]
      }
    */
    const apiQueryFormat = Object.entries(filterLists).reduce((acc, values) => {
      if (!acc[0]) acc[values[0]] = Object.keys(values[1]);
      return acc;
    }, {});
    setSearchValue(apiQueryFormat);
  }, [filterLists]);

  const updateSearchValue = (title, value) => {
    if (onlyFirstFilter) setOnlyFirstFilter(false);

    setSearchValue((prevState) => {
      const clonePrev = JSON.parse(JSON.stringify(prevState));

      if (onlyFirstFilter) {
        const resetValue = {
          brands: [],
          tags: [],
          types: [],
          [title]: [value],
        };

        return resetValue;
      }

      if (clonePrev[title].includes(value)) {
        // remove value
        const index = clonePrev[title].indexOf(value);
        clonePrev[title].splice(index, 1);
        return clonePrev;
      }

      clonePrev[title].push(value);
      return clonePrev;
    });
  };

  return {
    updateSearchValue,
    showFilterData,
    searchValue,
    filterLists,
  };
};
