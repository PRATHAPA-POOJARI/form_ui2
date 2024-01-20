import React, { useState } from 'react';
import './Styles.css';

import axios from 'axios';
import {
  Typography,
  Box,
  Button,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Alert,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const VendorCreate = ({ history }) => {
  const initialVendorState = {
    vendorName: '',
    bankAccountNo: '',
    bankName: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      zipCode: '',
    },
  };

  const [vendor, setVendor] = useState(initialVendorState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    bankName: false,
  });

  const handleInputChange = (property, value) => {
    setVendor((prevVendor) => ({
      ...prevVendor,
      [property]: value,
    }));

    
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [property]: false,
    }));
  };

  const handleAddressChange = (property, value) => {
    setVendor((prevVendor) => ({
      ...prevVendor,
      address: {
        ...prevVendor.address,
        [property]: value,
      },
    }));
  };

  const clearForm = () => {
    setVendor(initialVendorState);
    setValidationErrors({
      bankName: false,
    });
  };

  const saveVendor = async () => {
    try {
      setLoading(true);
      setError(null);

     
      if (!vendor.bankName) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          bankName: true,
        }));
        throw new Error('Bank Name is required.');
      }

      console.log('Vendor Data:', JSON.stringify(vendor));

      const response = await axios.post('http://localhost:9000/create-vendor', vendor);

      
      console.log('Vendor saved successfully:', response.data);

      
      setSuccess(true);

      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving vendor:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={1} sx={{ padding: 2, maxWidth: 300, margin: 'auto', marginTop: 3 }}>
          <Typography variant="h5">Create Vendor</Typography>
          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              Vendor saved successfully!
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          <form>
            <TextField
              id="vendorName"
              label="Vendor Name"
              variant="standard"
              sx={{ marginLeft: 2 }}
              value={vendor.vendorName}
              onChange={(e) => handleInputChange('vendorName', e.target.value)}
              required
            />

            <TextField
              id="bankAccountNo"
              label="Bank Account No"
              variant="standard"
              sx={{ marginLeft: 2 }}
              value={vendor.bankAccountNo}
              onChange={(e) => handleInputChange('bankAccountNo', e.target.value)}
              required
            />

            <TextField
              id="bankName"
              label="Bank Name"
              variant="standard"
              required
              sx={{ marginLeft: 2 }}
              value={vendor.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              error={validationErrors.bankName}
              helperText={validationErrors.bankName && 'Bank Name is required.'}
            />
            
            <TextField
              id="addressLine1"
              label="Address Line 1"
              variant="standard"
              sx={{ marginLeft: 2 }}
              value={vendor.address.addressLine1}
              onChange={(e) => handleAddressChange('addressLine1', e.target.value)}
            />

            <TextField
              id="addressLine2"
              label="Address Line 2"
              variant="standard"
              sx={{ marginLeft: 2 }}
              value={vendor.address.addressLine2}
              onChange={(e) => handleAddressChange('addressLine2', e.target.value)}
            />

            <TextField
              id="city"
              label="City"
              variant="standard"
              sx={{ marginLeft: 2 }}
              value={vendor.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
            />

            <TextField
              id="country"
              label="Country"
              variant="standard"
              sx={{ marginLeft: 2 }}
              value={vendor.address.country}
              onChange={(e) => handleAddressChange('country', e.target.value)}
            />

            <TextField
              id="zipCode"
              label="Zip Code"
              variant="standard"
              sx={{ marginLeft: 2 }}
              value={vendor.address.zipCode}
              onChange={(e) => handleAddressChange('zipCode', e.target.value)}
            />
            <Box>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'red', color: 'white', marginLeft: 2, marginTop: 2 }}
                onClick={clearForm}
              >
                Clear Form
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'red', color: 'white', marginLeft: 2, marginTop: 2 }}
                onClick={saveVendor}
              >
                Save Vendor
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default VendorCreate;
