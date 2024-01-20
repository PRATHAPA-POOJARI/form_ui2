
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper } from '@mui/material';
import VendorList from './VendorList';
import VendorEditForm from './VendorEditForm';
import VendorViewForm from './VendorViewForm';

const VendorView = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditVendor = (vendor) => {
    setSelectedVendor(vendor);
    setIsEditing(true);
  };

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:9000/get-vendors');
        setVendors(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setError('Error fetching vendors. Please try again.');
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleDelete = async (vendorId) => {
    try {
      await axios.delete(`http://localhost:9000/delete-vendor/${vendorId}`);
      setVendors((prevVendors) => prevVendors.filter((vendor) => vendor._id !== vendorId));
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  const handleViewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setIsEditing(false);
  };

  const handleSaveEdit = async (editedVendor) => {
    try {
      
      await axios.put(`http://localhost:9000/update-vendor/${editedVendor._id}`, editedVendor);

      setVendors((prevVendors) => prevVendors.map((v) => (v._id === editedVendor._id ? editedVendor : v)));

    
      setSelectedVendor(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving edited vendor:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Typography variant="h5">Vendor List</Typography>
      {isEditing ? (
        <VendorEditForm vendor={selectedVendor} onSave={handleSaveEdit} />
      ) : (
        <div>
          {selectedVendor ? (
            <VendorViewForm vendor={selectedVendor} />
          ) : (
            <VendorList vendors={vendors} onDelete={handleDelete} onView={handleViewVendor} onEdit={handleEditVendor} />
          )}
        </div>
      )}Edit
    </div>
  );
};

export default VendorView;
