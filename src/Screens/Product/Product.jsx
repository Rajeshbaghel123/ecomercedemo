import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../../firebase'; // Ensure you import auth for authentication
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import CSS for toast
import styles from './Product.module.scss';
import { CircularProgress, Box } from '@mui/material'; // Material UI imports
import { useDispatch, useSelector } from 'react-redux'; // Redux imports
import { addItemToCart, fetchCart, selectCart } from '../../Redux/features/CartSlice'; // Redux actions

export default function Product() {
  const { productId } = useParams(); // Extract productId from URL
  const [productData, setProductData] = useState(null);
  const [user, setUser] = useState(null); // Store the authenticated user
  const [loading, setLoading] = useState(true); // Loading state to show spinner
  const navigate = useNavigate(); // For navigation
  const dispatch = useDispatch();
  const { items, totalQuantity } = useSelector(selectCart); // Access cart from Redux

  // Fetch the product data from Firebase based on the productId
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setProductData(productData);
          console.log('ProductData',productData)
        } else {
          console.error('No such product!');
          toast.error('Error: Product not found.');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchProduct();

    // Check if the user is logged in
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Dispatch action to fetch cart when user is logged in
        dispatch(fetchCart(currentUser.uid));
      } else {
        setUser(null);
      }
    });
  }, [productId, dispatch]);

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (!user) {
      // If user is not logged in, navigate to login page
      navigate('/login');
    } else {
      // Check if the product is already in the cart
      const existingItem = items.find(item => item.productId === productId);
      if (existingItem) {
        // Show toast notification if the item is already in the cart
        toast.error('Item is already added in your cart');
        navigate('/Cart');
        return;
      }
      const cartItem = {
        productId: productId,
        name: productData.name,
        quantity: 1,
        price: Number(productData["price "] || 0), // Convert to number and handle undefined
        discount: Number(productData.discount || 0), // Convert to number
        discountedPrice: Number(productData["price "] || 0) * (1 - (Number(productData.discount || 0) / 100)),
        totalPrice: Number(productData["price "] || 0), // Convert to number
        mainImage: productData.mainImage || '',
      };
      

      try {
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnapshot = await getDoc(cartRef);

        if (cartSnapshot.exists()) {
          // If the cart exists, update it
          await updateDoc(cartRef, {
            items: arrayUnion(cartItem), // Add the product to the "items" array in the cart
            updatedAt: new Date() // Update timestamp
          });
        } else {
          // If the cart does not exist, create a new one
          await setDoc(cartRef, {
            items: [cartItem],
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }

        // Dispatch Redux action to update total quantity
        dispatch(addItemToCart(cartItem));
        
        toast.success('Product added to cart successfully!');
        navigate('/Cart');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  // Show loader while loading
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!productData) {
    return <p>Loading product...</p>;
  }

  return (
    <>
      <div className={styles.productPage}>
        {/* Left Section: Image Thumbnails and Main Image */}
        <div className={styles.imageSection}>
          {/* Small Images */}
          <div className={styles.imageThumbnails}>
            
              <div className={styles.thumbnail}>
                <img src={ productData.mainImage} alt={`Thumbnail `} />
              </div>
            
          </div>

          {/* Main Image */}
          <div className={styles.mainImage}>
            <img src={productData.mainImage} alt="Main Product" />
          </div>
        </div>

        {/* Right Section: Product Info */}
        <div className={styles.productDetails}>
          {/* Product Title and Rating */}
          <div className={styles.productHeader}>
            <h1>{productData.name}</h1>
            <div className={styles.productRating}>
              ⭐⭐⭐⭐⭐ 4.6 / 5.0 (556)
            </div>
          </div>

          {/* Price */}
          {productData && (
  <p className={styles.price}>
    {Number(productData.discountedPrice) === Number(productData["price "]) ? (
      <strong>₹{Number(productData["price "] || 0)}</strong>
    ) : (
      <>
        <strong>₹{Number(productData.discountedPrice)}</strong>
        <span style={{ textDecoration: 'line-through', marginLeft: '10px' }}>
          ₹{Number(productData["price "] || 0)}
        </span>
      </>
    )}
  </p>
)}


          {/* Add to Cart Button */}
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>Add to Cart</button>

          {/* Product Description */}
          <p className={styles.description}>
            {productData.description}
          </p>

          {/* Features List */}
          <ul className={styles.features}>
            {productData.features && productData.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}





  // Arrow Button Wroking with quantity Updates
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
// import { db, auth } from '../../firebase'; // Firebase imports
// import { onAuthStateChanged } from 'firebase/auth';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from './Product.module.scss';
// import { CircularProgress, Box } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux'; // Redux imports
// import { addItemToCart, updateItemQuantity, selectCart } from '../../Redux/features/CartSlice'; // Redux actions and selector
// import arrowup from '../../Assets/upload.png';
// import arrowdown from '../../Assets/download.png';

// export default function Product() {
//   const { productId } = useParams(); // Extract productId from URL
//   const [productData, setProductData] = useState(null);
//   const [user, setUser] = useState(null); // Store the authenticated user
//   const [loading, setLoading] = useState(true); // Loading state to show spinner
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { items: cartItems } = useSelector(selectCart); // Access cart from Redux

//   // Fetch product data from Firestore
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const productRef = doc(db, 'products', productId);
//         const productSnapshot = await getDoc(productRef);
//         if (productSnapshot.exists()) {
//           const productData = productSnapshot.data();
//           setProductData(productData);
//         } else {
//           toast.error('Error: Product not found.');
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setLoading(false); // Stop loading once data is fetched
//       }
//     };

//     fetchProduct();

//     // Check if the user is logged in
//     onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         setUser(null);
//       }
//     });
//   }, [productId]);

//   // Handle Add to Cart
//   const handleAddToCart = async () => {
//     if (!user) {
//       navigate('/login');
//     } else {
//       const existingItem = cartItems.find(item => item.productId === productId);

//       if (!existingItem) {
//         const cartItem = {
//           productId: productId,
//           name: productData.name,
//           quantity: 1,
//           price: productData.price,
//           discount: productData.discount,
//           discountedPrice: productData.price * (1 - productData.discount / 100),
//           totalPrice: productData.price * (1 - productData.discount / 100),
//           mainImage: productData.mainImage,
//         };

//         try {
//           const cartRef = doc(db, 'carts', user.uid);
//           const cartSnapshot = await getDoc(cartRef);

//           if (cartSnapshot.exists()) {
//             // If the cart exists, update it
//             await updateDoc(cartRef, {
//               items: arrayUnion(cartItem), // Add the product to the "items" array in the cart
//               updatedAt: new Date() // Update timestamp
//             });
//           } else {
//             // If the cart does not exist, create a new one
//             await setDoc(cartRef, {
//               items: [cartItem],
//               createdAt: new Date(),
//               updatedAt: new Date()
//             });
//           }

//           // Add item to Redux store
//           dispatch(addItemToCart(cartItem));
//           toast.success('Product added to cart successfully!');
//         } catch (error) {
//           console.error('Error adding product to cart:', error);
//         }
//       }
//     }
//   };

//   // Increase/Decrease Quantity (Updated logic similar to Cart)
//   const updateQuantity = async (productId, quantity) => {
//     if (user) {
//       const cartRef = doc(db, 'carts', user.uid);
//       const updatedItems = cartItems.map(item =>
//         item.productId === productId
//           ? { ...item, quantity, totalPrice: item.price * quantity }
//           : item
//       );

//       const finalItems = updatedItems.filter(item => item.quantity > 0);
//       try {
//         // Update Firestore with the updated cart items
//         await updateDoc(cartRef, { items: finalItems });

//         // Dispatch Redux action to update the store
//         dispatch(updateItemQuantity({ productId, quantity }));
//       } catch (error) {
//         console.error('Error updating quantity:', error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const existingItem = cartItems.find(item => item.productId === productId);

//   return (
//     <>
//       <div className={styles.productPage}>
//         {/* Left Section: Image Thumbnails and Main Image */}
//         <div className={styles.imageSection}>
//           <div className={styles.imageThumbnails}>
//             {productData.galleryImages.map((image, index) => (
//               <div key={index} className={styles.thumbnail}>
//                 <img src={image || productData.mainImage} alt={`Thumbnail ${index + 1}`} />
//               </div>
//             ))}
//           </div>

//           <div className={styles.mainImage}>
//             <img src={productData.mainImage} alt="Main Product" />
//           </div>
//         </div>

//         {/* Right Section: Product Info */}
//         <div className={styles.productDetails}>
//           <div className={styles.productHeader}>
//             <h1>{productData.name}</h1>
//             <div className={styles.productRating}>
//               ⭐⭐⭐⭐⭐ 4.6 / 5.0 (556)
//             </div>
//           </div>

//           <p className={styles.price}>
//             {productData.discountedPrice === productData.price ? (
//               <strong>₹{productData.price}</strong>
//             ) : (
//               <>
//                 <strong>₹{productData.discountedPrice}</strong>
//                 <span style={{ textDecoration: 'line-through', marginLeft: '10px' }}>₹{productData.price}</span>
//               </>
//             )}
//           </p>

//           {/* Show quantity controls if item exists in the cart, otherwise show Add to Cart */}
//           {existingItem ? (
//             <div className={styles.quantityInput}>
//               <div className={styles.increaseDecreaseButtons}>
//                 <button onClick={() => updateQuantity(productId, existingItem.quantity + 1)}>
//                   <img src={arrowup} alt="Increase Quantity" />
//                 </button>
//                 <p>{existingItem.quantity}</p>
//                 <button
//                   onClick={() => updateQuantity(productId, existingItem.quantity - 1)}
//                   disabled={existingItem.quantity === 1}
//                 >
//                   <img src={arrowdown} alt="Decrease Quantity" />
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <button className={styles.addToCartBtn} onClick={handleAddToCart}>Add to Cart</button>
//           )}

//           <p className={styles.description}>
//             {productData.description}
//           </p>

//           <ul className={styles.features}>
//             {productData.features.map((feature, index) => (
//               <li key={index}>{feature}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }