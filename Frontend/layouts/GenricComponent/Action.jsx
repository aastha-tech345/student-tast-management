import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { FiEdit } from "react-icons/fi"; // Added react-icons/fi
import { Box, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Delete from "./Delete";
import EditModel from "./EditModel";
import { UserRole } from "@layouts/helper/tokenService";
import { getTableActionPermissions } from "@layouts/helper/userPermissions";
import { getModal } from "@layouts/helper/getConst";

const Actions = ({
  data,
  rowsSet,
  setCurrentPage,
  fetchFun,
  tableType,
  title,
  onViewClick,
  onEdit,
}) => {
  const router = useRouter();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false); // Added missing state
  const Role = UserRole();
  const ActionPermission = getTableActionPermissions(Role, tableType);
  const Modal = getModal(tableType);
  const handleRoute = (route) => {
    if (route) {
      router.push(route);
    } else {
      console.error("No valid route provided");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
      {ActionPermission["view"] && (
        <Tooltip title="View">
          <IconButton
            onClick={() => {
              if (onViewClick) {
                onViewClick(data);
              } else {
                handleRoute(data["actions"] || `/view/${data.id}`);
              }
            }}
          >
            <EyeOutlined style={{ color: "#1890ff" }} />
          </IconButton>
        </Tooltip>
      )}

      {ActionPermission["delete"] && (
        <Tooltip title="Delete">
          <IconButton onClick={() => setDeleteVisible(true)}>
            <DeleteOutlined style={{ color: "#ff4d4f" }} />
          </IconButton>
        </Tooltip>
      )}
      {ActionPermission["edit"] && (
        <Modal
          type="edit"
          data={data}
          title={`Edit ${title}`}
          setCurrentPage={setCurrentPage}
          fetchFun={fetchFun}
        >
          <Tooltip title="Edit">
            <IconButton>
              <FiEdit />
            </IconButton>
          </Tooltip>
        </Modal>
      )}

      {ActionPermission["delete"] && (
        <Delete
          data={data}
          visible={deleteVisible}
          setVisible={setDeleteVisible}
          rowsSet={rowsSet}
          setCurrentPage={setCurrentPage}
          title={title}
          alertType="danger"
          tableType={tableType}
          fetchFun={fetchFun}
        />
      )}
    </Box>
  );
};

Actions.propTypes = {
  data: PropTypes.object.isRequired,
  rowsSet: PropTypes.func,
  setCurrentPage: PropTypes.func,
  fetchFun: PropTypes.func,
  tableType: PropTypes.string,
  title: PropTypes.string,
  onViewClick: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Actions;
