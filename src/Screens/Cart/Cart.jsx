import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase'; // Firebase config
import { useDispatch, useSelector } from 'react-redux';
import { updateItemQuantity, removeItemFromCart, fetchCart, selectCart } from '../../Redux/features/CartSlice'; // Redux cart actions
import { onAuthStateChanged } from 'firebase/auth';
import { Box, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Cart.module.scss';
import arrowup from '../../Assets/upload.png';
import arrowdown from '../../Assets/download.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart); // Access cart from Redux store
  const { items, totalQuantity, status } = cart; // Extract items and status from cart state
  const [user, setUser] = useState(null); // User state
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        dispatch(fetchCart(currentUser.uid)); // Fetch cart from Firebase and update Redux
      } else {
        setUser(null);
      }
    });
  }, [dispatch]);

  // Update quantity in Firebase and Redux
  const updateQuantity = async (productId, quantity) => {
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const updatedItems = items.map(item =>
        item.productId === productId
          ? { ...item, quantity, totalPrice: item.price * quantity }
          : item
      );

      const finalItems = updatedItems.filter(item => item.quantity > 0);
      await updateDoc(cartRef, { items: finalItems });
      dispatch(updateItemQuantity({ productId, quantity })); // Update Redux
      toast.success('Item Quantity Updated successfully!');
    }
  };

  // Delete an item from the cart in both Firebase and Redux
  const deleteItem = async (productId) => {
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const updatedItems = items.filter(item => item.productId !== productId);
      await updateDoc(cartRef, { items: updatedItems });
      dispatch(removeItemFromCart(productId)); // Update Redux
      toast.success('Item Removed successfully!');
    }
  };
  const handleProceedToCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty
        </Typography>
        <Button variant="contained" color="primary" href="/products">
          Shop Now
        </Button>
      </Box>
    );
  }

  const productTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountTotal = items.reduce((total, item) => total + ((item.totalPrice) * (item.discount / 100)), 0);
  const finalTotal = productTotal - discountTotal;

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.heading}>Cart</h1>
      <div className={styles.cartContent}>
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Products</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr className={styles.cartItem} key={index}>
                <td>
                  <div className={styles.productImage_Details}>
                  <Link to={`/product/${item.productId}`}>
          <img src={item.mainImage} alt={item.name} className={styles.productImage} />
        </Link>
                    <div className={styles.productDetails}>
                      <h3>{item.name}</h3>
                      <p className={styles.price}>
                      {item.price == item.discountedPrice ? <strong>₹{item.discountedPrice}</strong>:  <>
                        
                        <strong>₹{item.discountedPrice}</strong>
                          <span style={{ textDecoration: 'line-through', marginLeft: '10px' }}>₹{item.price}</span>
                          </>
                        }
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.quantityInput}>
                    <p>{item.quantity}</p>
                    <div className={styles.increaseDecreaseButtons}>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                        <img src={arrowup} alt="Increase Quantity" />
                      </button>
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity === 1}>
                        <img src={arrowdown} alt="Decrease Quantity" />
                      </button>
                    </div>
                  </div>
                </td>
                <td>₹{item.discountedPrice * item.quantity}</td>
                <td>
                  <IconButton onClick={() => deleteItem(item.productId)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.priceSummary}>
          <h2>Items Total</h2>
          <div className={styles.summaryDetail}>
            <p>Product Total</p>
            <p>₹{productTotal}</p>
          </div>
          <div className={styles.summaryDetail}>
            <p>Item Discount</p>
            <p>₹{discountTotal}</p>
          </div>

          <div className={styles.summaryTotal}>
            <h3>Total</h3>
            <h3>₹{finalTotal}</h3>
          </div>

          <button className={styles.checkoutBtn} onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}




// import React from 'react'
// import styles from './Cart.module.scss';
// import BSafe from '../../Assets/BSafe.png';
// import arrowup from '../../Assets/upload.png';
// import arrowdown from '../../Assets/download.png';


// export default function Cart() {
//   return (
//     <>

// <div className={styles.cartPage}>
//   {/* Cart Heading */}
//   <h1 className={styles.heading}>Cart</h1>

//   {/* Main content wrapper with two sections: Product table and Price summary */}
//   <div className={styles.cartContent}>
//     {/* Cart Table with Headers */}
//     <table className={styles.cartTable}>
//       <thead>
//         <tr>
//           <th>Products</th>
//           <th>Quantity</th>
//           <th>Total</th>
//         </tr>
//       </thead>
//       <tbody>
//         {/* First Cart Item */}
//         <tr className={styles.cartItem}>
//           <td>
//             <div className={styles.productImage_Details}>
//               <img
//                 src={BSafe}
//                 alt="B Safe Advance"
//                 className={styles.productImage}
//               />
//               <div className={styles.productDetails}>
//                 <h3>B Safe Advance</h3>
//                 <p>6 Month Plan</p>
//                 <p>₹5,500</p>
//               </div>
//             </div>
//           </td>
//           <td>
//               <div className={styles.quantityInput}>
//                 <p>1</p>
//                 <div className={styles.increaseDecreaseButtons}>
//                   <button><img src={arrowup} alt="" /></button>
//                   <button><img src={arrowdown} alt="" /></button>
//                 </div>
//               </div>          
//           </td>
//           <td>₹5,500</td>
//         </tr>
        
//         {/* Second Cart Item */}
//         <tr className={styles.cartItem}>
//           <td>
//           <div className={styles.productImage_Details}>
//               <img
//                 src={BSafe}
//                 alt="B Safe Advance"
//                 className={styles.productImage}
//               />
//               <div className={styles.productDetails}>
//                 <h3>B Safe Advance</h3>
//                 <p>6 Month Plan</p>
//                 <p>₹5,500</p>
//               </div>
//             </div>
//           </td>
//           <td>
//             <div className={styles.quantityInput}>
//               <p>1</p>
//               <div className={styles.increaseDecreaseButtons}>
//                 <button><img src={arrowup} alt="" /></button>
//                 <button><img src={arrowdown} alt="" /></button>
//               </div>
//             </div>
//           </td>
//           <td>₹5,500</td>
//         </tr>
//       </tbody>
//     </table>

//     {/* Price Summary */}
//     <div className={styles.priceSummary}>
//       <h2>Items Total</h2>
//       <div className={styles.summaryDetail}>
//         <p>Product Total</p>
//         <p>₹11,000</p>
//       </div>
//       <div className={styles.summaryDetail}>
//         <p>Item Discount</p>
//         <p>₹1,000</p>
//       </div>
//       <div className={styles.summaryDetail}>
//         <p>Estimated GST</p>
//         <p>₹500</p>
//       </div>
//       <div className={styles.summaryTotal}>
//         <h3>Total</h3>
//         <h3>₹10,500</h3>
//       </div>

//       {/* Checkout Button */}
//       <button className={styles.checkoutBtn}>Proceed to Checkout</button>
//     </div>
//   </div>
// </div>




    
    
//     </>
//   )
// }
