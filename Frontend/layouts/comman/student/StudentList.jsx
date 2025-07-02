

import React, { useState } from "react";
import TableList from "../table/TableList";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { columns, studentData } from "veriable";
import AddStudent from "./AddStudent";

const StudentList = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const handleTabChange = (event, newValue) => {
    setStatusFilter(newValue);
  };
  const handleEdit = (row) => {
    console.log("Edit row:", row);
    // Implement edit logic
  };

  const handleDelete = (row) => {
    console.log("Delete row:", row);
    setData(data.filter((item) => item.id !== row.id));
  };

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
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
        <Button
          variant="contained"
          sx={{ color: "white", fontWeight: "bold" }}
          onClick={() => setOpenModal(true)}
        >
          Add Student
        </Button>
        <AddStudent open={openModal} handleClose={() => setOpenModal(false)} />
      </Box>
      <TableList
        columns={columns}
        data={studentData}
        title="Users"
        search={search}
        setSearch={setSearch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        recordsPerPage={recordsPerPage}
        setRecordsPerPage={setRecordsPerPage}
        totalRecords={studentData.length}
        pagination
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleRowClick={handleRowClick}
        tableType="student"
        // rowsSet={setData}
      />
    </>
  );
};

export default StudentList;
