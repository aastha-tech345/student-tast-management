import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function SearchBox({
  value = "",
  onChange,
  placeholder = "Search here...",
  width = "150px",
  showClear = true,
}) {
  const handleInputChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  const clearSearch = () => {
    if (onChange) onChange("");
  };

  return (
    <div style={{ position: "relative", display: "inline-block", width }}>
      <SearchIcon
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          color: "#888",
        }}
      />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        style={{
          // width: "100%",
          height: "35px",
          padding: "8px 35px 8px 35px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: "14px",
        }}
      />

      {showClear && value && (
        <CloseIcon
          onClick={clearSearch}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            color: "#888",
            cursor: "pointer",
          }}
        />
      )}
    </div>
  );
}
