import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../Redux/features/CartSlice';
import styles from './Checkout.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Firebase setup
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid'; 
import { createRazorpayOrder, openRazorpayPayment, loadRazorpayScript } from '../../services/razorpay_services';
import { saveOrderToFirestore } from '../../services/order_services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import { Box, CircularProgress } from '@mui/material'; 
import { useDispatch } from 'react-redux';
import { clearCartInDB } from '../../Redux/features/CartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { currentUser } = useAuth();
  const { items } = useSelector(selectCart); // Access cart data
  const [userAddress, setUserAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state
  const [paymentProcessing, setPaymentProcessing] = useState(false);// Payment processing state
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [addressInput, setAddressInput] = useState({
    name: '',
    phone: '',
    street: '',
    street_2: '',
    city: '',
    state: '',
    zipcode: ''
  });

  const productTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountTotal = items.reduce((total, item) => total + ((item.totalPrice) * (item.discount / 100)), 0);
  const finalTotal = productTotal - discountTotal;

  // Fetch user's address from Firestore
  useEffect(() => {
    loadRazorpayScript();
    const fetchUserAddress = async () => {
      setLoading(true);
      if (currentUser) {
        const userRef = doc(db, 'Users', currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setUserAddress(userSnapshot.data().address);
          setUserData(userSnapshot.data());
        }
      }
      setLoading(false);
    };

    fetchUserAddress();
  }, [currentUser]);

  // Handle form changes when editing the address
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle saving the new or edited address
  const handleSaveAddress = async () => {
    if (currentUser) {
      const userRef = doc(db, 'Users', currentUser.uid);
      await updateDoc(userRef, { address: addressInput });
      setUserAddress(addressInput);
      setIsEditing(false);
    }
  };

  // Show the address form when the user wants to edit
  const handleEditAddress = () => {
    setIsEditing(true);
    setAddressInput(userAddress || {}); // Prefill the form with existing address if available
  };

  // Razorpay payment integration
  const handlePayment = async () => {
    setPaymentProcessing(true); // Start loading when payment starts
    try {
      // Step 1: Generate Razorpay Order with the final total (including discount)
      const razorpayOrder = await createRazorpayOrder(finalTotal);  // Use finalTotal here

      // Step 2: Open Razorpay payment interface with the correct final total
      openRazorpayPayment(
        razorpayOrder.id,  // Pass the Razorpay order ID
        finalTotal,        // Pass finalTotal here as well
        currentUser,
        async (paymentResponse) => {
          // Step 3: Save order to Firestore after successful payment
          const orderId = uuidv4();  // Generate a unique order ID
          const paymentDetails = {
            paymentId: paymentResponse.razorpay_payment_id,
            razorpayOrderId: paymentResponse.razorpay_order_id,
            razorpaySignature: paymentResponse.razorpay_signature,
            transactionTime: new Date(),
          };
          await saveOrderToFirestore(orderId, currentUser.uid, items, finalTotal, userData, paymentDetails);

          // Show success message or redirect to success page
          toast.success('Payment successful and Your order is Confirmed.');
          navigate(`/order/${orderId}`);
          // Dispatch the clearCartInDB thunk to remove items from Firestore and Redux
           dispatch(clearCartInDB(currentUser.uid));
           
        },
        (errorResponse) => {
          // Handle payment failure
          toast.error('Payment failed. Please try again.',errorResponse);
        }
      );
    } catch (error) {
      console.error('Error during payment process:', error);
      toast.error('Error during payment process. Please try again.');
    }
    setPaymentProcessing(false); // End loading when payment completes
  };

  // Show loading spinner when fetching user data or processing payment
  if (loading || paymentProcessing) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }


  

  return (
    <div className={styles.checkoutPage}>
      <h1 className={styles.heading}>Checkout</h1>

      <div className={styles.checkoutContent}>
        {/* Address Information */}
        <div className={styles.addressSection}>
          <h2>Delivery Address</h2>

          {userAddress && !isEditing ? (
            <div>
              <p>{userAddress.name}</p>
              <p>{userAddress.street}</p>
              <p>{userAddress.street_2}</p>
              <p>{userAddress.city}, {userAddress.state} - {userAddress.zipcode}</p>
              <p>{userAddress.phone}</p>
              <EditIcon onClick={handleEditAddress} style={{ cursor: 'pointer' }} />
            </div>
          ) : isEditing ? (
            <div className={styles.addressForm}>
              <input
                type="text"
                name="name"
                value={addressInput.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="phone"
                value={addressInput.phone}
                onChange={handleInputChange}
                placeholder="Phone"
              />
              <input
                type="text"
                name="street"
                value={addressInput.street}
                onChange={handleInputChange}
                placeholder="Street"
              />
              <input
                type="text"
                name="street_2"
                value={addressInput.street_2}
                onChange={handleInputChange}
                placeholder="Street 2"
              />
              <input
                type="text"
                name="city"
                value={addressInput.city}
                onChange={handleInputChange}
                placeholder="City"
              />
              <input
                type="text"
                name="state"
                value={addressInput.state}
                onChange={handleInputChange}
                placeholder="State"
              />
              <input
                type="text"
                name="zipcode"
                value={addressInput.zipcode}
                onChange={handleInputChange}
                placeholder="Zipcode"
              />
              <button onClick={handleSaveAddress}>Save Address</button>
            </div>
          ) : (
            <div>
              <p>No address found</p>
              <button onClick={handleEditAddress}>Add Address</button>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className={styles.summarySection}>
          <h2>Order Summary</h2>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.discountedPrice} x {item.quantity} = ₹{item.discountedPrice * item.quantity}
              </li>
            ))}
          </ul>
          <div className={styles.totalAmount}>
            <p>Total Amount:</p>
            <h3>₹{finalTotal}</h3>
          </div>

          {/* Razorpay Payment Button */}
          <button className={styles.payBtn} onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}



// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectCart } from '../../Redux/features/CartSlice';
// import styles from './Checkout.module.scss';
// import { useAuth } from '../../contexts/AuthContext';

// export default function Checkout() {
//     const { currentUser } = useAuth();
//   const { items } = useSelector(selectCart); // Access cart data
//   const productTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const discountTotal = items.reduce((total, item) => total + ((item.totalPrice) * (item.discount / 100)), 0);
//   const finalTotal = productTotal - discountTotal;

// useEffect(()=>{
//     console.log('userData',currentUser)
// },[])
//   // Razorpay payment integration
//   const loadRazorpay = async () => {
//     const res = await loadRazorpayScript();

//     if (!res) {
//       alert('Razorpay SDK failed to load');
//       return;
//     }

//     const options = {
//       key: 'RAZORPAY_KEY', // Replace with your Razorpay key
//       amount: 1000, // Amount in paisa (₹1)
//       currency: 'INR',
//       name: 'Your Company',
//       description: 'Order Payment',
//       image: 'https://example.com/logo.png',
//       handler: (response) => {
//         alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//       },
//       prefill: {
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         contact: '9999999999',
//       },
//       notes: {
//         address: 'Corporate Office',
//       },
//       theme: {
//         color: '#F37254',
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   useEffect(() => {
//     loadRazorpayScript();
//   }, []);

//   return (
//     <div className={styles.checkoutPage}>
//       <h1 className={styles.heading}>Checkout</h1>

//       <div className={styles.checkoutContent}>
//         {/* Address Information */}
//         <div className={styles.addressSection}>
//           <h2>Delivery Address</h2>
//           <p>John Doe</p>
//           <p>123 Street Name</p>
//           <p>City, State - 123456</p>
//         </div>

//         {/* Cart Summary */}
//         <div className={styles.summarySection}>
//           <h2>Order Summary</h2>
//           <ul>
//             {items.map((item, index) => (
//               <li key={index}>
//                 {item.name} - ₹{item.discountedPrice} x {item.quantity} = ₹{item.discountedPrice * item.quantity}
//               </li>
//             ))}
//           </ul>
//           <div className={styles.totalAmount}>
//             <p>Total Amount:</p>
//             <h3>₹{finalTotal}</h3>
//           </div>

//           {/* Razorpay Payment Button */}
//           <button className={styles.payBtn} onClick={loadRazorpay}>
//             Pay Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
