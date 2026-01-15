// import React, { useState } from "react";
// import TableList from "../table/TableList";
// import { Box, Button, Tab, Tabs } from "@mui/material";
// import { columns, studentData as initialStudentData } from "veriable";
// import AddStudent from "./AddStudent";
// import { PlusCircleFilled } from "@ant-design/icons";

// const StudentList = () => {
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [openModal, setOpenModal] = useState(false);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(5);
//   const [data, setData] = useState(initialStudentData);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const handleTabChange = (event, newValue) => {
//     setStatusFilter(newValue);
//   };

//   const handleEdit = (row) => {
//     setSelectedStudent(row);
//     setOpenModal(true);
//   };

//   const handleDelete = (row) => {
//     setData(data.filter((item) => item.id !== row.id));
//   };

//   const handleRowClick = (row) => {
//     console.log("Row clicked:", row);
//   };

//   const handleSave = (student) => {
//     if (student.id) {
//       setData(data.map((item) => (item.id === student.id ? student : item)));
//     } else {
//       const newId =
//         data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
//       setData([...data, { ...student, id: newId }]);
//     }
//   };

//   const fetchFun = () => {
//     console.log("Data refreshed");
//   };

//   const handleClose = () => {
//     setOpenModal(false);
//     setSelectedStudent(null);
//   };

//   return (
//     <>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{ marginBottom: "20px" }}
//       >
//         <Tabs
//           value={statusFilter}
//           onChange={handleTabChange}
//           sx={{ borderBottom: 1, borderColor: "divider" }}
//         >
//           <Tab sx={{ fontWeight: "bold" }} label="All" value="all" />
//           <Tab sx={{ fontWeight: "bold" }} label="Active" value="active" />
//           <Tab sx={{ fontWeight: "bold" }} label="Inactive" value="inactive" />
//         </Tabs>

//         <AddStudent
//           open={openModal}
//           handleClose={handleClose}
//           handleSave={handleSave}
//           data={selectedStudent}
//           // type={selectedStudent ? "edit" : "add"}
//           fetchFun={fetchFun}
//         >
//           <Box display="flex" alignItems="center">
//             <Box pr={1}>
//               <PlusCircleFilled
//                 style={{ fontSize: "18px", color: "white", marginTop: "6px" }}
//               />
//             </Box>
//             <b style={{ color: "white" }}>Add Student</b>
//           </Box>
//         </AddStudent>
//       </Box>
//       <TableList
//         columns={columns}
//         data={data}
//         title="Students"
//         search={search}
//         setSearch={setSearch}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         recordsPerPage={recordsPerPage}
//         setRecordsPerPage={setRecordsPerPage}
//         totalRecords={data.length}
//         pagination
//         handleRowClick={handleRowClick}
//         tableType="student"
//       />
//     </>
//   );
// };

// export default StudentList;

import React, { useState } from "react";

import TableList from "../table/TableList";
import { Box, Button, Tab, Tabs } from "@mui/material";
import AddStudent from "./AddStudent";
import { PlusCircleFilled } from "@ant-design/icons";
import { studentData } from "veriable";

const StudentList = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleTabChange = (event, newValue) => {
    setStatusFilter(newValue);
    setCurrentPage(1);
  };

  const handleEdit = (row) => {
    setSelectedStudent(row);
    setOpenModal(true);
  };

  const handleDelete = (row) => {
    setData(data.filter((item) => item.id !== row.id));
  };
  const columns = [
    // { id: 'specimenName', align: 'left', label: t('name') },
    { id: "name", align: "left", label: "Name" },
    { id: "email", align: "left", label: "createdAt" },
    // { id: 'createdAt', align: 'left', label: t('Created At') },
    { id: "action", align: "left", label: "Actions" },
  ];

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  const handleSave = (student) => {
    if (student.id) {
      setData(data.map((item) => (item.id === student.id ? student : item)));
    } else {
      const newId =
        data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      setData([...data, { ...student, id: newId }]);
    }
    setOpenModal(false);
    setSelectedStudent(null);
  };

  const fetchFun = () => {
    console.log("Data refreshed");
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "20px" }}
      >
        <Tabs
          value={statusFilter}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab sx={{ fontWeight: "bold" }} label="All" value="all" />
          <Tab sx={{ fontWeight: "bold" }} label="Active" value="active" />
          <Tab sx={{ fontWeight: "bold" }} label="Inactive" value="inactive" />
        </Tabs>

        <AddStudent
          open={openModal}
          handleClose={handleClose}
          handleSave={handleSave}
          data={selectedStudent}
          fetchFun={fetchFun}
        >
          <Box display="flex" alignItems="center">
            <Box pr={1}>
              <PlusCircleFilled
                style={{ fontSize: "18px", color: "white", marginTop: "6px" }}
              />
            </Box>
            <b style={{ color: "white" }}>Add Student</b>
          </Box>
        </AddStudent>
      </Box>
      <TableList
        columns={columns}
        data={studentData}
        title="Students"
        search={search}
        setSearch={setSearch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        recordsPerPage={recordsPerPage}
        setRecordsPerPage={setRecordsPerPage}
        totalRecords={studentData.length}
        pagination
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        handleRowClick={handleRowClick}
        tableType="student"
        onEdit={handleEdit}
        onDelete={handleDelete}
        fetchFun={fetchFun}
      />
    </>
  );
};

export default StudentList;
