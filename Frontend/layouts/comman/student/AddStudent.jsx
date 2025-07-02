import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  InputLabel,
} from "@mui/material";

export default function AddStudent({ open, handleClose, handleSave }) {
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
    className: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Student Data:", studentData);
    handleSave(studentData);
    handleClose();
    setStudentData({
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      email: "",
      phone: "",
      className: "",
    });
  };

  // Common style for all fields
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid #ccc",
      },
      "&:hover fieldset": {
        border: "1px solid #999",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid #ccc",
      },
    },
    "& input": {
      outline: "none",
    },
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel>First Name</InputLabel>
            <TextField
              name="firstName"
              value={studentData.firstName}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mt: 0.5, ...inputStyle }}
            />
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Last Name</InputLabel>
            <TextField
              name="lastName"
              value={studentData.lastName}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mt: 0.5, ...inputStyle }}
            />
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Gender</InputLabel>
            <TextField
              select
              name="gender"
              value={studentData.gender}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mt: 0.5, ...inputStyle }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Age</InputLabel>
            <TextField
              name="age"
              type="number"
              value={studentData.age}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                mt: 0.5,
                ...inputStyle,
                "& input": { outline: "none" }, // Extra protection for blue outline
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Email</InputLabel>
            <TextField
              name="email"
              type="email"
              value={studentData.email}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mt: 0.5, ...inputStyle }}
            />
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Phone</InputLabel>
            <TextField
              name="phone"
              value={studentData.phone}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mt: 0.5, ...inputStyle }}
            />
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Class / Grade</InputLabel>
            <TextField
              name="className"
              value={studentData.className}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mt: 0.5, ...inputStyle }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
