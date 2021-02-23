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
  const [mobileCheckboxItems, setMobileCheckboxItems] = useState([]);
  const [pageSize, setPageSize] = useState("12");
  const [sortBy, setSortBy] = useState("sortBys=p.name&sortBys=asc");
  const [totalProductLength, setTotalProductLength] = useState({
    init: null, // load value after load page
    total: null,
  });
  const [offsetValue, setOffsetValue] = useState(0); // default value: 0

  const { data: filterListData } = useSWR(
    `${API_URL}/products/getFilterList?category_slug=${category_slug}`,
    noAuthFetcher,
    {
      dedupingInterval: 60000,
    }
  );

  useEffect(() => {
    if (!Array.isArray(filterListData)) return; // return {500 error}, to avoid popup page error

    const [brands, types, tags, totalLengthArray] = filterListData;

    const brandsData = arrayObjectToObj(brands);
    const typesData = arrayObjectToObj(types);
    const tagsData = arrayObjectToObj(tags);

    const result = { ...brandsData, ...typesData, ...tagsData };
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
    /**
     * Initial setup value
     */
    setFilterList(result);
    setSearchValue(apiQueryFormat);
    setTotalProductLength({ total: null });
  }, [filterListData]);

  // ## EndPoint: Trigger it when value changes ##
  const { data: showFilterData, error } = useSWR(
    `${API_URL}/products/showFiltered?category_slug=${category_slug}&${objToQueryStr(
      searchValue
    )}&limit=${pageSize}&offset=${offsetValue}&${sortBy}`,
    noAuthFetcher,
    {
      dedupingInterval: 60000,
    }
  );

  useEffect(() => {
    if (!showFilterData || !Array.isArray(showFilterData)) return;

    updateTotalLength();
  }, [showFilterData]);

  /**
    saerchValue: {
      brands: [value, value],
      tags: [value, value]
    }
  */
  const updateSearchValue = (title, value) => {
    // reset to page 1
    setOffsetValue(0);

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

  const updateTotalLength = () => {
    const total = showFilterData[1] ? showFilterData[1][0].totalLength : null;

    setTotalProductLength({total});
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

  const updateSortBy = (value) => {
    const array = value.split(",");
    let sortApiQuery = array.map((str) => `sortBys=${str}`).join("&");
    setSortBy(sortApiQuery);
  };

  const onClickPagination = (offset) => setOffsetValue(offset);

  return {
    updateSearchValue,
    hanldeMoblieCheckbox,
    mobileCheckboxItems,
    showFilterData,
    searchValue,
    setPageSize,
    pageSize,
    filterLists,
    onClickPagination,
    offsetValue,
    setTotalProductLength,
    totalProductLength,
    updateSortBy,
  };
};
