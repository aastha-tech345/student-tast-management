import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  DialogActions,
  Box,
  Snackbar,
  Alert,
  Modal,
  Typography,
  Grid,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const AddStudent = ({
  handleClose,
  handleSave,
  data,
  type,
  fetchFun,
  children,
}) => {
  const { t } = useTranslation();
  const initialFormData = {
    id: null,
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
    className: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (data && data.id) {
      setFormData({
        id: data.id,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        gender: data.gender || "",
        age: data.age || "",
        email: data.email || "",
        phone: data.phone || "",
        className: data.className || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [data, type]);

  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setFormData(initialFormData); // Reset form data
    setErrors({}); // Clear errors
    if (handleClose) handleClose(); // Call parent close handler without saving
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = t("firstNameReq");
    if (!formData.lastName.trim()) tempErrors.lastName = t("lastNameReq");
    if (!formData.gender.trim()) tempErrors.gender = t("genderReq");
    if (!formData.age || isNaN(formData.age) || formData.age <= 0)
      tempErrors.age = t("ageReq");
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      tempErrors.email = t("emailReq");
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      tempErrors.phone = t("phoneReq");
    if (!formData.className.trim()) tempErrors.className = t("classReq");
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    handleSave(formData); // Pass the form data to the parent for saving
    setAlertMessage(
      data?.id
        ? "Student updated successfully!"
        : "Student added successfully!",
    );
    setAlertSeverity("success");
    setSnackbarOpen(true);
    handleCloseModal();
    if (fetchFun) fetchFun();
  };

  return (
    <div>
      <Button
        variant={type === "edit" ? "text" : "contained"}
        color="primary"
        size="small"
        sx={{ height: "32px", minWidth: type === "edit" ? "5px" : "100px" }}
        onClick={handleOpen}
      >
        {children}
      </Button>

      <Modal open={open} onClose={handleCloseModal}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              borderBottom: "2px solid #ccc",
              paddingBottom: "10px",
              fontWeight: "bold",
            }}
          >
            {type === "edit" ? t("editStudent") : t("addStudent")}
          </Typography>

          <Grid container spacing={2}>
            <Grid container item spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  label="First Name"
                  variant="standard"
                  // error={Boolean(errors.firstName)}
                  // helperText={errors.firstName}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      border: "none",
                      "&:hover": { border: "none" },
                      "&.Mui-focused": { border: "none" },
                    },
                    "& input": {
                      outline: "none !important",
                      boxShadow: "none !important",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  label="Last Name"
                  variant="standard"
                  // error={Boolean(errors.lastName)}
                  // helperText={errors.lastName}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      border: "none",
                      "&:hover": { border: "none" },
                      "&.Mui-focused": { border: "none" },
                    },
                    "& input": {
                      outline: "none !important",
                      boxShadow: "none !important",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  label="Gender"
                  variant="standard"
                  // error={Boolean(errors.gender)}
                  // helperText={errors.gender}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      border: "none",
                      "&:hover": { border: "none" },
                      "&.Mui-focused": { border: "none" },
                    },
                    "& input": {
                      outline: "none !important",
                      boxShadow: "none !important",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  variant="standard"
                  label="Age"
                  // error={Boolean(errors.age)}
                  // helperText={errors.age}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      border: "none",
                      "&:hover": { border: "none" },
                      "&.Mui-focused": { border: "none" },
                    },
                    "& input": {
                      outline: "none !important",
                      boxShadow: "none !important",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  label="Email Address"
                  variant="standard"
                  // error={Boolean(errors.email)}
                  // helperText={errors.email}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      border: "none",
                      "&:hover": { border: "none" },
                      "&.Mui-focused": { border: "none" },
                    },
                    "& input": {
                      outline: "none !important",
                      boxShadow: "none !important",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  label="Phone"
                  variant="standard"
                  // error={Boolean(errors.phone)}
                  // helperText={errors.phone}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      border: "none",
                      "&:hover": { border: "none" },
                      "&.Mui-focused": { border: "none" },
                    },
                    "& input": {
                      outline: "none !important",
                      boxShadow: "none !important",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  label="Class Name"
                  variant="standard"
                  // error={Boolean(errors.className)}
                  // helperText={errors.className}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      border: "none",
                      "&:hover": { border: "none" },
                      "&.Mui-focused": { border: "none" },
                    },
                    "& input": {
                      outline: "none !important",
                      boxShadow: "none !important",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={handleCloseModal} variant="outlined" color="black">
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {data?.id ? t("update") : t("submit")}
            </Button>
          </DialogActions>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddStudent;
