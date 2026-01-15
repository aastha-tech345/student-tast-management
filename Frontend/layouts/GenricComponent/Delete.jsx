import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Modal, Typography } from "@mui/material";
import { DeleteOutlined } from "@ant-design/icons";

const Delete = ({
  data,
  visible,
  setVisible,
  rowsSet,
  setCurrentPage,
  title,
  alertType,
  tableType,
  fetchFun,
}) => {
  const handleDelete = () => {
    if (rowsSet) {
      rowsSet((prev) => prev.filter((row) => row.id !== data.id));
    }
    if (fetchFun && setCurrentPage) {
      setCurrentPage(1);
      fetchFun({ page: 1 });
    }
    setVisible(false);
  };

  return (
    <>
      <Modal open={visible} onClose={() => setVisible(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 1,
            minWidth: 300,
          }}
        >
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography>
            Are you sure you want to delete {data.name || "this item"}?
          </Typography>
          <Box display="flex" gap={2} mt={2}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outlined" onClick={() => setVisible(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

Delete.propTypes = {
  data: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  rowsSet: PropTypes.func,
  setCurrentPage: PropTypes.func,
  title: PropTypes.string,
  alertType: PropTypes.string,
  tableType: PropTypes.string,
  fetchFun: PropTypes.func,
};

export default Delete;
