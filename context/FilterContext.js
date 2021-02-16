import { useState, useEffect, createContext, useContext } from "react";
import useSWR from "swr";
import noAuthFetcher from "../utils/noAuthFetcher";
import { arrayObjectToObj, objToQueryStr } from "../utils/transformQuery";
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
  const [mobileCheckboxItems, setMobileCheckboxItems] = useState([]); // only use for mobile version

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

    const brandsData = arrayObjectToObj(brands);
    const typesData = arrayObjectToObj(types);
    const tagsData = arrayObjectToObj(tags);

    const result = { ...brandsData, ...typesData, ...tagsData };

    const apiQueryFormat = Object.entries(result).reduce((acc, values) => {
      if (!acc[0]) acc[values[0]] = Object.keys(values[1]);
      return acc;
    }, {});

    setFilterList(result);

    /* Initial Filter Values (all filtered list)
      {
        brands: ["value", "value"],
        types: ["value"]
      }
    */
    setSearchValue(apiQueryFormat);
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

  // useEffect(() => {
  /**
     * Initial Filter Values (all filtered list)
      {
        brands: ["value", "value"],
        types: ["value"]
      }
    */
  // const apiQueryFormat = Object.entries(filterLists).reduce((acc, values) => {
  //   if (!acc[0]) acc[values[0]] = Object.keys(values[1]);
  //   return acc;
  // }, {});

  // setSearchValue(apiQueryFormat);
  // }, [filterLists]);

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

  const hanldeMoblieCheckbox = (value) => {
    setMobileCheckboxItems((prev) => {
      const clonePrev = [...prev];
      if (clonePrev.includes(value)) {
        const index = clonePrev.indexOf(value);
        const _ = clonePrev.splice(index, 1);
        return clonePrev;
      }

      clonePrev.push(value);

      return clonePrev;
    });
  };

  return {
    updateSearchValue,
    hanldeMoblieCheckbox,
    mobileCheckboxItems,
    showFilterData,
    searchValue,
    filterLists,
  };
};
