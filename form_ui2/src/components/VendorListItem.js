// // VendorList.js
// import React from 'react';
// import { Paper, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom';

// const VendorListItem = ({ vendor, onDelete, onView, onEdit }) => (
//   <Paper key={vendor._id} style={{ padding: 10, maxWidth: 400, margin: 'auto', marginTop: 10, border: '1px solid #ccc', borderRadius: 8 }}>
//     <Typography variant="h4">{vendor.vendorName}</Typography>
//     <Typography variant="body1">{`Bank Account No: ${vendor.bankAccountNo}`}</Typography>
//     <Typography variant="body1">{`Bank Name: ${vendor.bankName}`}</Typography>

//     <Button component={Link} to={`/vendor/view/${vendor._id}`} variant="outlined" color="primary" onClick={() => onView(vendor)}>
//       View Vendor
//     </Button>

//     <Button component={Link} to={`/vendor/${vendor._id}/edit`} variant="outlined" color="secondary" onClick={() => onEdit(vendor)}>
//       Edit Vendor
//     </Button>

//     <Button onClick={() => onDelete(vendor._id)} variant="outlined" color="error">
//       Delete
//     </Button>
//   </Paper>
// );

// export default VendorListItem;
