import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Actions from "@layouts/GenricComponent/Action";

const CustomCell = ({
  cell,
  row,
  rowsSet,
  title,
  fetchFun,
  tableType,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(row);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(row);
    }
  };

  switch (cell.id) {
    case "action":
      return (
        <Box display="flex" gap={1}>
          <Actions
            data={row}
            rowsSet={rowsSet}
            title={title}
            tableType={tableType}
            fetchFun={fetchFun}
          />
        </Box>
      );
    case "name":
      return (
        <Box display="flex" alignItems="center">
          {/* Optional: Add image rendering if needed */}
          <Typography variant="subtitle2">
            {row[cell.id] || t("noData")}
          </Typography>
        </Box>
      );
    case "email":
      return (
        <Typography variant="subtitle2">
          {row[cell.id] || t("noData")}
        </Typography>
      );
    default:
      return (
        <Typography variant="subtitle2">
          {row[cell.id] || t("noData")}
        </Typography>
      );
  }
};

CustomCell.propTypes = {
  cell: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    align: PropTypes.oneOf(["left", "center", "right"]),
  }).isRequired,
  row: PropTypes.object.isRequired,
  rowsSet: PropTypes.func,
  title: PropTypes.string,
  fetchFun: PropTypes.func,
  tableType: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CustomCell;
