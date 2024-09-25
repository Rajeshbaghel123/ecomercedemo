// src/pages/OrderDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get orderId from URL
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Firebase setup
import { Box, Typography, Divider,  Paper, CircularProgress, Grid2 } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './orderDetail.scss'
import { useNavigate } from 'react-router-dom';

export default function OrderDetail() {
  const { orderId } = useParams(); // Fetch orderId from route params
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  // Fetch order details from Firestore
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists()) {
          setOrder(orderSnap.data());
        } else {
          toast.error('Order not found.');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast.error('Failed to fetch order details.');
      }
      setLoading(false);
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleProductClick = (productId) => {
    console.log("Navigating to product with ID:", productId);  // Add this log
    navigate(`/product/${productId}`);  // Navigate to the product page with the productId
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return <Typography variant="h6">Order not found.</Typography>;
  }

  return (
   
    <div className='orderDetailContainer'>
      <Typography variant="h4" align="center" gutterBottom>Order Details</Typography>

      {/* Order Information */}
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">Order ID: {orderId}</Typography>
        <Typography>Order Status: {order.orderStatus}</Typography>
        <Typography>Payment Status: {order.paymentStatus}</Typography>
        <Typography>Payment Method: {order.paymentMethod}</Typography>
        <Typography>Total Price: ₹{order.totalPrice}</Typography>
        <Typography>Transaction Time: {order.transactionTime?.toDate().toLocaleString()}</Typography>
        {order.trackingNumber && (
          <Typography>Tracking Number: {order.trackingNumber}</Typography>
        )}
        <Typography>Shipping Method: {order.shippingMethod}</Typography>
      </Paper>

      {/* Products List */}
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" align="center">Products</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid2 container spacing={2}>
          {order.items.map((product, index) => (
            <Grid2 item xs={12} key={index}>
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                flexDirection={{ xs: 'column', sm: 'row' }}
              >
                <Box>
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body2">Quantity: {product.quantity}</Typography>
                  <Typography variant="body2">Price: ₹{product.price}</Typography>
                  <Typography variant="body2">Total: ₹{product.totalPrice}</Typography>
                </Box>
                <div 
            
            className='itemImage'
            onClick={() => handleProductClick(product.productId)}  // Send product.id here
          > 
                <img
                  src={product.mainImage} // Image URL from Firebase storage
                  alt={product.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                /> </div>
              </Box>
              <Divider sx={{ my: 2 }} />
            </Grid2>
          ))}
        </Grid2>
      </Paper>

      {/* Shipping Address */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" align="center">Shipping Address</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography>Name: {order.shippingAddress?.address.name}</Typography>
        <Typography>Street: {order.shippingAddress?.address.street}</Typography>
        {order.shippingAddress?.address.street2 && (
          <Typography>Street 2: {order.shippingAddress.street2}</Typography>
        )}
        <Typography>Pin Code: {order.shippingAddress?.address.zipCode}</Typography>
        <Typography>Phone: {order.shippingAddress?.address.phone}</Typography>
        <Typography>City: {order.shippingAddress?.address.city}</Typography>
        <Typography>State: {order.shippingAddress?.address.state}</Typography>
      </Paper>
      </div>
  );
}
