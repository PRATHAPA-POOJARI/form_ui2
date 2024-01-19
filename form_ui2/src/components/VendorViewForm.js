import React from 'react';
import { Paper, Typography, TextField } from '@mui/material';

const VendorViewForm = ({ vendor }) => {
  const excludedFields = ['id', 'version'];

  return (
    <Paper style={{ padding: 10, maxWidth: 250, margin: 'auto', marginTop: 10, border: '1px solid #ccc', borderRadius: 8 }}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>{`View ${vendor.vendorName}`}</Typography>

      {/* Display non-address fields first */}
      {Object.keys(vendor).map((key) => (
        excludedFields.includes(key) ? null : key !== 'address' && (
          <TextField
            sx={{ textAlign: 'center', marginTop: 2 }}
            key={key}
            name={key}
            label={key === 'newField' ? 'New Field' : key} // Customize the label as needed
            value={vendor[key] || ''}
            disabled
          />
        )
      ))}

      {/* Display address fields separately */}
      {Object.keys(vendor).map((key) => (
        excludedFields.includes(key) ? null : key === 'address' && (
          <div key={key} sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant="h6">Address:</Typography>
            {Object.keys(vendor.address).map((addressKey) => (
              <TextField
                key={addressKey}
                sx={{ marginTop: 2, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                name={`address.${addressKey}`}
                label={addressKey}
                value={vendor.address[addressKey] || ''}
                disabled
              />
            ))}
          </div>
        )
      ))}
    </Paper>
  );
};

export default VendorViewForm;
