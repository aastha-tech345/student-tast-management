// import React, { useState, useMemo } from "react";
// import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";
// import { styled, useTheme } from "@mui/material/styles";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   tableCellClasses,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { alpha } from "@mui/system";
// import SearchBox from "../search/Search"; // Adjust path as needed
// import CustomCell from "./CustomCell"; // Import CustomCell

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#f3f3f3",
//     color: theme.palette.text.secondary,
//     position: "sticky",
//     top: 0,
//     zIndex: 10,
//     borderBottom: "1px solid #e0e0e0",
//     padding: "12px 16px",
//     fontWeight: 600,
//     fontSize: "0.875rem",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: "0.875rem",
//     padding: "8px 16px",
//     borderBottom: "1px solid #e0e0e0",
//     color: theme.palette.text.primary,
//   },
// }));

// const TableList = ({
//   columns,
//   data = [],
//   actions = true, // Default to true since we have an action column
//   onEdit,
//   onDelete,
//   pagination = true,
//   rowsPerPageOptions = [5, 10, 25],
//   title = "Table",
//   totalRecords = 0,
//   currentPage = 1,
//   setCurrentPage,
//   recordsPerPage = 5,
//   setRecordsPerPage,
//   order = "asc",
//   setOrder,
//   orderBy,
//   setOrderBy,
//   search = "",
//   setSearch,
//   fetchFun,
//   loading = false,
//   selectedRow,
//   handleRowClick,
//   tableType,
//   rowsSet,
// }) => {
//   const { t } = useTranslation();
//   const theme = useTheme();

//   const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
//   const [localRecordsPerPage, setLocalRecordsPerPage] = useState(recordsPerPage);

//   const effectiveCurrentPage = setCurrentPage ? currentPage : localCurrentPage;
//   const effectiveSetCurrentPage = setCurrentPage || setLocalCurrentPage;
//   const effectiveRecordsPerPage = setRecordsPerPage ? recordsPerPage : localRecordsPerPage;
//   const effectiveSetRecordsPerPage = setRecordsPerPage || setLocalRecordsPerPage;

//   const handleChangePage = (event, newPage) => {
//     const newPageNumber = newPage + 1;
//     effectiveSetCurrentPage(newPageNumber);
//     if (fetchFun) fetchFun({ page: newPageNumber });
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const newRowsPerPage = parseInt(event.target.value, 10);
//     effectiveSetRecordsPerPage(newRowsPerPage);
//     effectiveSetCurrentPage(1);
//     if (fetchFun) fetchFun({ recordsPerPage: newRowsPerPage, page: 1 });
//   };

//   const handleSearchChange = (event) => {
//     const value = event.target.value;
//     setSearch(value);
//     effectiveSetCurrentPage(1);
//     if (fetchFun) fetchFun({ search: value, page: 1 });
//   };

//   const filteredData = useMemo(() => {
//     if (!search || fetchFun) return data;
//     const lowerSearch = search.toLowerCase();
//     return data.filter((row) =>
//       columns.some((column) => {
//         const value = row[column.id];
//         return value && value.toString().toLowerCase().includes(lowerSearch);
//       }),
//     );
//   }, [data, search, columns, fetchFun]);

//   const paginatedData = pagination && !fetchFun
//     ? filteredData.slice(
//         (effectiveCurrentPage - 1) * effectiveRecordsPerPage,
//         effectiveCurrentPage * effectiveRecordsPerPage,
//       )
//     : filteredData;

//   const isItemSelected = (row) => selectedRow && row.id === selectedRow.id;

//   return (
//     <Box sx={{ borderRadius: "5px", overflow: "hidden" }}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{
//           padding: "16px",
//           backgroundColor: theme.palette.common.white,
//           borderBottom: "1px solid #e0e0e0",
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: 400, color: theme.palette.text.primary }}
//         >
//           {title}
//         </Typography>
// <SearchBox
//   value={search}
//   onChange={handleSearchChange}
//   placeholder="Search here..."
//   width="300px"
// />
//       </Box>

//       <Paper
//         sx={{
//           width: "100%",
//           overflow: "hidden",
//           position: "relative",
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         {loading && (
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               zIndex: 10,
//             }}
//           >
//             <CircularProgress />
//           </Box>
//         )}

//         <TableContainer
//           sx={{
//             minHeight: 200,
//             maxHeight: 440,
//             overflow: "auto",
//             backgroundColor: theme.palette.common.white,
//             opacity: loading ? 0.4 : 1,
//             pointerEvents: loading ? "none" : "auto",
//           }}
//         >
//           <Table stickyHeader aria-label="reusable table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <StyledTableCell
//                     key={column.id}
//                     align={column.align || "left"}
//                     padding={column.disablePadding ? "none" : "normal"}
//                   >
//                     <Typography
//                       variant="subtitle2"
//                       color="text.secondary"
//                       sx={{ textTransform: "none" }}
//                     >
//                       {column.label}
//                     </Typography>
//                   </StyledTableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((row, index) => (
//                   <TableRow
//                     hover
//                     role="checkbox"
//                     sx={{
//                       "&:hover": {
//                         backgroundColor: alpha(theme.palette.primary.light, 0.1),
//                         transition: "background-color 0.2s",
//                       },
//                       cursor: handleRowClick ? "pointer" : "default",
//                     }}
//                     aria-checked={isItemSelected(row)}
//                     tabIndex={-1}
//                     key={row.id || index}
//                     selected={isItemSelected(row)}
//                     onClick={() => handleRowClick && handleRowClick(row)}
//                   >
//                     {columns.map((column) => (
//                       <StyledTableCell
//                         key={column.id}
//                         align={column.align || "left"}
//                         sx={{ paddingTop: "5px", paddingBottom: "5px" }}
//                       >
//                         {column.renderCell ? (
//                           column.renderCell(row, {
//                             rowsSet,
//                             title,
//                             fetchFun,
//                             tableType,
//                           })
//                         ) : (
//                           <CustomCell
//                             cell={column}
//                             row={row}
//                             rowsSet={rowsSet}
//                             title={title}
//                             fetchFun={fetchFun}
//                             tableType={tableType}
//                             onEdit={onEdit}
//                             onDelete={onDelete}
//                           />
//                         )}
//                       </StyledTableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <StyledTableCell
//                     colSpan={columns.length}
//                     align="center"
//                     sx={{
//                       padding: "24px",
//                       color: theme.palette.text.secondary,
//                     }}
//                   >
//                     {t("noDataAvailable")}
//                   </StyledTableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {pagination && (
//           <TablePagination
//             rowsPerPageOptions={rowsPerPageOptions}
//             component="div"
//             count={totalRecords || filteredData.length}
//             rowsPerPage={effectiveRecordsPerPage}
//             page={effectiveCurrentPage - 1}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             sx={{
//               borderTop: "1px solid #e0e0e0",
//               "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//                 color: theme.palette.text.primary,
//               },
//               "& .MuiTablePagination-actions button": {
//                 color: theme.palette.primary.main,
//               },
//             }}
//           />
//         )}
//       </Paper>
//     </Box>
//   );
// };

// TableList.propTypes = {
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//       align: PropTypes.oneOf(["left", "center", "right"]),
//       minWidth: PropTypes.number,
//       renderCell: PropTypes.func,
//       disablePadding: PropTypes.bool,
//     }),
//   ).isRequired,
//   data: PropTypes.array,
//   actions: PropTypes.bool,
//   onEdit: PropTypes.func,
//   onDelete: PropTypes.func,
//   pagination: PropTypes.bool,
//   rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
//   title: PropTypes.string,
//   totalRecords: PropTypes.number,
//   currentPage: PropTypes.number,
//   setCurrentPage: PropTypes.func,
//   recordsPerPage: PropTypes.number,
//   setRecordsPerPage: PropTypes.func,
//   order: PropTypes.oneOf(["asc", "desc"]),
//   setOrder: PropTypes.func,
//   orderBy: PropTypes.string,
//   setOrderBy: PropTypes.func,
//   search: PropTypes.string,
//   setSearch: PropTypes.func,
//   fetchFun: PropTypes.func,
//   loading: PropTypes.bool,
//   selectedRow: PropTypes.object,
//   handleRowClick: PropTypes.func,
//   tableType: PropTypes.string,
//   rowsSet: PropTypes.func,
// };

// export default TableList;

import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { styled, useTheme } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { alpha } from "@mui/system";
import SearchBox from "../search/Search";
import CustomCell from "./CustomCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f3f3f3",
    color: theme.palette.text.secondary,
    position: "sticky",
    top: 0,
    zIndex: 10,
    borderBottom: "1px solid #e0e0e0",
    padding: "12px 16px",
    fontWeight: 600,
    fontSize: "0.875rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.875rem",
    padding: "8px 16px",
    borderBottom: "1px solid #e0e0e0",
    color: theme.palette.text.primary,
  },
}));

const TableList = ({
  columns,
  data = [],
  actions = true,
  onEdit,
  onDelete,
  pagination = true,
  rowsPerPageOptions = [5, 10, 25],
  title = "Table",
  totalRecords = 0,
  currentPage = 1,
  setCurrentPage,
  recordsPerPage = 5,
  setRecordsPerPage,
  order = "asc",
  setOrder,
  orderBy,
  setOrderBy,
  search = "",
  setSearch,
  fetchFun,
  loading = false,
  selectedRow,
  handleRowClick,
  tableType,
  rowsSet,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
  const [localRecordsPerPage, setLocalRecordsPerPage] =
    useState(recordsPerPage);

  const effectiveCurrentPage = setCurrentPage ? currentPage : localCurrentPage;
  const effectiveSetCurrentPage = setCurrentPage || setLocalCurrentPage;
  const effectiveRecordsPerPage = setRecordsPerPage
    ? recordsPerPage
    : localRecordsPerPage;
  const effectiveSetRecordsPerPage =
    setRecordsPerPage || setLocalRecordsPerPage;

  const handleChangePage = (event, newPage) => {
    const newPageNumber = newPage + 1;
    effectiveSetCurrentPage(newPageNumber);
    if (fetchFun) fetchFun({ page: newPageNumber });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    effectiveSetRecordsPerPage(newRowsPerPage);
    effectiveSetCurrentPage(1);
    if (fetchFun) fetchFun({ recordsPerPage: newRowsPerPage, page: 1 });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    effectiveSetCurrentPage(1);
    if (fetchFun) fetchFun({ search: value, page: 1 });
  };

  const filteredData = useMemo(() => {
    if (!search || fetchFun) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter((row) =>
      columns.some((column) => {
        const value = row[column.id];
        return value && value.toString().toLowerCase().includes(lowerSearch);
      }),
    );
  }, [data, search, columns, fetchFun]);

  const paginatedData =
    pagination && !fetchFun
      ? filteredData.slice(
          (effectiveCurrentPage - 1) * effectiveRecordsPerPage,
          effectiveCurrentPage * effectiveRecordsPerPage,
        )
      : filteredData;

  const isItemSelected = (row) => selectedRow && row.id === selectedRow.id;

  return (
    <Box sx={{ borderRadius: "5px", overflow: "hidden" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: "16px",
          backgroundColor: theme.palette.common.white,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 400, color: theme.palette.text.primary }}
        >
          {title}
        </Typography>
        <SearchBox
          value={search}
          onChange={handleSearchChange}
          placeholder="Search here..."
          width="300px"
        />
      </Box>

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <TableContainer
          sx={{
            minHeight: 200,
            maxHeight: 440,
            overflow: "auto",
            backgroundColor: theme.palette.common.white,
            opacity: loading ? 0.4 : 1,
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          <Table stickyHeader aria-label="reusable table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align || "left"}
                    padding={column.disablePadding ? "none" : "normal"}
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ textTransform: "none" }}
                    >
                      {column.label}
                    </Typography>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.light,
                          0.1,
                        ),
                        transition: "background-color 0.2s",
                      },
                      cursor: handleRowClick ? "pointer" : "default",
                    }}
                    aria-checked={isItemSelected(row)}
                    tabIndex={-1}
                    key={row.id || index}
                    selected={isItemSelected(row)}
                    onClick={() => handleRowClick && handleRowClick(row)}
                  >
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={column.align || "left"}
                        sx={{ paddingTop: "5px", paddingBottom: "5px" }}
                      >
                        {column.renderCell ? (
                          column.renderCell(row, {
                            rowsSet,
                            title,
                            fetchFun,
                            tableType,
                            setCurrentPage,
                          })
                        ) : (
                          <CustomCell
                            cell={column}
                            row={row}
                            rowsSet={rowsSet}
                            title={title}
                            fetchFun={fetchFun}
                            tableType={tableType}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            setCurrentPage={setCurrentPage}
                          />
                        )}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <StyledTableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{
                      padding: "24px",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {t("noDataAvailable")}
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {pagination && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={totalRecords || filteredData.length}
            rowsPerPage={effectiveRecordsPerPage}
            page={effectiveCurrentPage - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: "1px solid #e0e0e0",
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  color: theme.palette.text.primary,
                },
              "& .MuiTablePagination-actions button": {
                color: theme.palette.primary.main,
              },
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

TableList.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "center", "right"]),
      minWidth: PropTypes.number,
      renderCell: PropTypes.func,
      disablePadding: PropTypes.bool,
    }),
  ).isRequired,
  data: PropTypes.array,
  actions: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  pagination: PropTypes.bool,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  title: PropTypes.string,
  totalRecords: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  recordsPerPage: PropTypes.number,
  setRecordsPerPage: PropTypes.func,
  order: PropTypes.oneOf(["asc", "desc"]),
  setOrder: PropTypes.func,
  orderBy: PropTypes.string,
  setOrderBy: PropTypes.func,
  search: PropTypes.string,
  setSearch: PropTypes.func,
  fetchFun: PropTypes.func,
  loading: PropTypes.bool,
  selectedRow: PropTypes.object,
  handleRowClick: PropTypes.func,
  tableType: PropTypes.string,
  rowsSet: PropTypes.func,
};

export default TableList;
