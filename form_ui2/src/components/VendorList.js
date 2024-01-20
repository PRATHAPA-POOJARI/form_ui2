
import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import VendorViewForm from './VendorViewForm'; 
import VendorEditForm from './VendorEditForm'; 

const VendorListItem = ({ vendor, onDelete, onView, onEdit }) => (
  <Paper key={vendor._id} style={{ padding: 10, maxWidth: 400, margin: 'auto', marginTop: 10, border: '1px solid #ccc', borderRadius: 8 }}>
    <Typography variant="h4">{vendor.vendorName}</Typography>
    <Typography variant="body1">{`Bank Account No: ${vendor.bankAccountNo}`}</Typography>
    <Typography variant="body1">{`Bank Name: ${vendor.bankName}`}</Typography>

    <Button onClick={() => onDelete(vendor._id)} variant="outlined" color="error" sx={{ marginLeft: 2 }}>
      Delete
    </Button>

    <Button onClick={() => onView(vendor)} variant="outlined" color="primary" sx={{ marginLeft: 2 }}>
      View Vendor
    </Button>

    <Button onClick={() => onEdit(vendor)} variant="outlined" color="secondary" sx={{ marginLeft: 2 }}>
      Edit Vendor
    </Button>

  
    {vendor.isEditing && <VendorEditForm vendor={vendor} onEdit={onEdit} />}
    {vendor.isViewing && <VendorViewForm vendor={vendor} />} 
  </Paper>
);

const VendorList = ({ vendors, onDelete, onView, onEdit }) => (
  <div>
    {vendors.map((vendor) => (
      <VendorListItem key={vendor._id} vendor={vendor} onDelete={onDelete} onView={onView} onEdit={onEdit} />
    ))}
  </div>
);

export default VendorList;
