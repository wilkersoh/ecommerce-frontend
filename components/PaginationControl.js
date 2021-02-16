import Pagination from "material-ui-flat-pagination";
import { useFilter } from "../context/FilterContext";

import { Box } from "@chakra-ui/react";

export default function PaginationControl({ totalProductLength }) {
  const { onClickPagination, offsetValue, pageSize } = useFilter();

  return (
    <Box d='flex' w='full' justifyContent='center' color='green.600'>
      <Pagination
        limit={pageSize}
        offset={offsetValue}
        total={totalProductLength}
        size={"large"}
        currentPageColor='inherit'
        style={{ border: "1px solid #929292", borderRadius: "4px" }}
        onClick={(e, offset) => onClickPagination(offset)}
      />
    </Box>
  );
}
