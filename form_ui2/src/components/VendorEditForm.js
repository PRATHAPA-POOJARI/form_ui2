// VendorEditForm.js
import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';

const VendorEditForm = ({ vendor, onSave }) => {
  const [editedVendor, setEditedVendor] = useState({ ...vendor });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVendor((prevVendor) => ({ ...prevVendor, [name]: value }));
  };

  const handleAddressChange = (property, value) => {
    setEditedVendor((prevVendor) => ({
      ...prevVendor,
      address: {
        ...prevVendor.address,
        [property]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(editedVendor);
  };

  const excludedFields = ['id', 'version'];

  return (
    <Paper style={{ padding: 10, maxWidth: 250, margin: 'auto', marginTop: 10, border: '1px solid #ccc', borderRadius: 8 }}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>{`Edit ${editedVendor.vendorName}`}</Typography>

      {/* Display non-address fields first */}
      {Object.keys(editedVendor).map((key) => (
        excludedFields.includes(key) ? null : key !== 'address' && (
          <TextField
            sx={{ textAlign: 'center', marginTop: 2 }}
            key={key}
            name={key}
            label={key === 'newField' ? 'New Field' : key} // Customize the label as needed
            value={editedVendor[key] || ''}
            onChange={handleInputChange}
          />
        )
      ))}

      {/* Display address fields separately */}
      {Object.keys(editedVendor).map((key) => (
        excludedFields.includes(key) ? null : key === 'address' && (
          <div key={key} sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant="h6">Address:</Typography>
            {Object.keys(editedVendor.address).map((addressKey) => (
              <TextField
                key={addressKey}
                sx={{ marginTop: 2, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                name={`address.${addressKey}`}
                label={addressKey}
                value={editedVendor.address[addressKey] || ''}
                onChange={(e) => handleAddressChange(addressKey, e.target.value)}
              />
            ))}
          </div>
        )
      ))}

      <Button onClick={handleSave} variant="outlined" color="primary" sx={{ marginTop: 2, marginLeft: 'auto', marginRight: 'auto' }}>
        Save
      </Button>
    </Paper>
  );
};

export default VendorEditForm;
