import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, TextField, Typography, Box } from '@mui/material';

const EditModel = ({ data, visible, setVisible, rowsSet, setCurrentPage, title, tableType, fetchFun, onEdit }) => {
  const [formData, setFormData] = useState({ name: data.name || '', email: data.email || '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (rowsSet) {
      rowsSet((prev) => prev.map((row) => (row.id === data.id ? { ...row, ...formData } : row)));
    }
    if (onEdit) {
      onEdit({ ...data, ...formData });
    }
    if (fetchFun && setCurrentPage) {
      setCurrentPage(1);
      fetchFun({ page: 1 });
    }
    setVisible(false);
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 1,
          minWidth: 300,
        }}
      >
        <Typography variant="h6">Edit {title}</Typography>
        <Box component="form" display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <Box display="flex" gap={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setVisible(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

EditModel.propTypes = {
  data: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  rowsSet: PropTypes.func,
  setCurrentPage: PropTypes.func,
  title: PropTypes.string,
  tableType: PropTypes.string,
  fetchFun: PropTypes.func,
  onEdit: PropTypes.func,
};

export default EditModel;