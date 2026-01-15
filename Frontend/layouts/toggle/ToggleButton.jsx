import React from "react";
import PropTypes from "prop-types";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const ToggleStatus = ({ value, onChange, options }) => {
  const finalOptions = options || [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(event, newValue) => newValue && onChange(newValue)}
      // sx={{ backgroundColor: "#fff", border: "1px solid #e0e0e0" }}
    >
      {finalOptions.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

ToggleStatus.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

export default ToggleStatus;
