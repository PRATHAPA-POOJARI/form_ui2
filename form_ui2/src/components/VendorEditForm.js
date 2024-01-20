import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const VendorEditForm = ({ vendor, onSave, onEdit }) => {
  const [editedVendor, setEditedVendor] = useState({ ...vendor });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVendor((prevVendor) => ({ ...prevVendor, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedVendor);
    setSnackbarMessage('Vendor saved successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const excludedFields = ['_id', '__v'];

  return (
    <div>
      <Paper style={{ padding: 10, maxWidth: 200, margin: 'auto', marginTop: 10, border: '1px solid #ccc', borderRadius: 8 }}>
        {Object.keys(editedVendor).map((key) => (
          !excludedFields.includes(key) && key !== 'address' && (
            <TextField
              sx={{ textAlign: 'center', marginTop: 2 }}
              key={key}
              name={key}
              label={key === 'newField' ? 'New Field' : key}
              value={editedVendor[key] || ''}
              onChange={handleInputChange}
            />
          )
        ))}

        {Object.keys(editedVendor).map((key) => (
          !excludedFields.includes(key) && key === 'address' && (
            <div key={key} sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography variant="h6">Address:</Typography>
              {Object.keys(editedVendor.address).map((addressKey) => (
                <TextField
                  key={addressKey}
                  sx={{ marginTop: 2, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                  name={`address.${addressKey}`}
                  label={addressKey}
                  value={editedVendor.address[addressKey] || ''}
                  onChange={(e) => handleInputChange({ target: { name: `address.${addressKey}`, value: e.target.value } })}
                />
              ))}
            </div>
          )
        ))}

        {/* <Button onClick={handleSave} variant="outlined" color="primary" sx={{ marginTop: 2, marginLeft: 'auto', marginRight: 'auto' }}>
          Save
        </Button> */}


        <Button
                variant="contained"
                sx={{ backgroundColor: 'red', color: 'white', marginLeft: 2, marginTop: 2 }}
                onClick={handleSave}
              >
                Clear Form
              </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </div>
  );
};

export default VendorEditForm;
