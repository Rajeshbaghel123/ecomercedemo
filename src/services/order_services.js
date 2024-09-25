// src/services/order_services.js
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';  // Ensure you have initialized Firebase correctly

// Save the order to Firestore
export const saveOrderToFirestore = async (orderId, userId, items, totalPrice, shippingAddress, paymentDetails) => {
  try {
    const orderData = {
      customerId: userId,
      items,
      totalPrice,
      orderStatus: 'Pending',
      paymentStatus: paymentDetails ? 'Paid' : 'Unpaid',
      paymentMethod: paymentDetails ? 'Credit Card' : null,
      createdAt: new Date(),
      shippingAddress,
      trackingNumber: '',  // Leave empty for now
      shippingMethod: 'Standard',
      ...paymentDetails,  // Spread payment details (paymentId, razorpayOrderId, etc.)
    };

    await setDoc(doc(db, 'orders', orderId), orderData);
    return true;
  } catch (error) {
    console.error('Error saving order to Firestore:', error);
    throw error;
  }
};
