import Pagination from "material-ui-flat-pagination";
import { useFilter } from "../context/FilterContext";

import { Box } from "@chakra-ui/react";

export default function PaginationControl() {
  const {
    onClickPagination,
    offsetValue,
    pageSize,
    totalProductLength,
  } = useFilter();

  return (
    <Box d='flex' mt={4} justifyContent='center' color='green.1'>
      <Pagination
        limit={pageSize}
        offset={offsetValue}
        total={totalProductLength.total || totalProductLength.init}
        size={"medium"}
        currentPageColor='inherit'
        reduced={true}
        // style={{ borderRadius: "4px" }}
        onClick={(e, offset) => onClickPagination(offset)}
      />
    </Box>
  );
}
