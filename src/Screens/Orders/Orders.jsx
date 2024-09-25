// src/pages/Orders.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, startAfter, startAt, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Firebase setup
import { useAuth } from '../../contexts/AuthContext'; // Hook for authentication
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, CircularProgress,  Grid2 } from '@mui/material';
import { toast } from 'react-toastify';
import './orderDetail.scss'

export default function Orders() {
  const { currentUser } = useAuth(); // Get the current user's ID
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const navigate = useNavigate();

  // Fetch the first 5 orders for the current user
  const fetchOrders = async (direction = 'next', doc = null) => {
    setLoading(true);
  
    try {
      const ordersRef = collection(db, 'orders');
      let q = query(
        ordersRef,
        where('customerId', '==', currentUser.uid),
        orderBy('createdAt', 'desc'),
        limit(4)
      );
  
      // Apply pagination
      if (direction === 'next' && doc) {
        q = query(q, startAfter(doc));
      } else if (direction === 'prev' && doc) {
        q = query(q, startAt(doc));
      }
  
      const orderSnapshot = await getDocs(q);
  
      if (orderSnapshot.empty) {
        toast.info('No more orders.');
        setIsNextDisabled(true);
      } else {
        const fetchedOrders = orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        // Set first and last documents for pagination
        setFirstDoc(orderSnapshot.docs[0]);
        setLastDoc(orderSnapshot.docs[orderSnapshot.docs.length - 1]);
  
        setOrders(fetchedOrders);
  
        // Enable/Disable Next/Previous buttons
        setIsNextDisabled(orderSnapshot.docs.length < 5);
        setIsPrevDisabled(direction === 'prev' && !firstDoc);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders.');
    }
  
    setLoading(false);
  };
  

  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  const handleNext = () => {
    if (!isNextDisabled) {
      fetchOrders('next', lastDoc);
    }
  };

  const handlePrev = () => {
    if (!isPrevDisabled) {
      fetchOrders('prev', firstDoc);
    }
  };

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className='orderDetailContainer'>
    
      <Typography variant="h4" align="center" gutterBottom>Your Orders</Typography>
      
      {orders.length === 0 ? (
        <Typography variant="h6" align="center">No orders found.</Typography>
      ) : (
        <Grid2 container spacing={2}>
          {orders.map((order) => (
            <Grid2 item xs={12} key={order.id}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography>Order Status: {order.orderStatus}</Typography>
                <Typography>Total Price: ₹{order.totalPrice}</Typography>
                <Typography>Transaction Time: {order.transactionTime?.toDate().toLocaleString()}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }} 
                  // onClick={() => handleOrderClick(order.id)}
                >
                  View Order
                </Button>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      )}

      {/* Pagination Buttons */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          variant="contained"
          disabled={isPrevDisabled}
          onClick={handlePrev}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={isNextDisabled}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
   
    </div>
  );
}
