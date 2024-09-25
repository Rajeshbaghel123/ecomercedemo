import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// Async thunk to fetch cart data from Firebase
export const fetchCart = createAsyncThunk('cart/fetchCart', async (uid) => {
  const cartRef = doc(db, 'carts', uid);
  const cartSnapshot = await getDoc(cartRef);
  if (cartSnapshot.exists()) {
    return cartSnapshot.data(); // Returns cart data
  }
  return null;
});

// New Async thunk to clear cart in Redux state only

export const clearCartInDB = createAsyncThunk('cart/clearCartInDB', async (uid, { rejectWithValue }) => {
  try {
    const cartRef = doc(db, 'carts', uid);
    await updateDoc(cartRef, { items: [] }); // Set the items array to an empty array to clear the cart in Firestore
    return []; // Optionally return an empty array, but we won't handle this in reducers directly
  } catch (error) {
    console.error('Error clearing cart in Firestore:', error);
    return rejectWithValue('Failed to clear cart in Firestore');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.productId === newItem.productId);
      if (!existingItem) {
        state.items.push(newItem);
        state.totalQuantity++;
      }
    },
    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
      }
    },
    removeItemFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
      state.totalQuantity = state.items.length;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload?.items || [];
        state.totalQuantity = state.items.length;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(clearCartInDB.fulfilled, (state, action) => {
        state.items = action.payload; // Reset cart items to empty array
        state.totalQuantity = 0; // Reset total quantity to 0
      });
  },
});

// Exporting cart actions to be used in components
export const { addItemToCart, updateItemQuantity, removeItemFromCart, clearCart } = cartSlice.actions;

// Selector to get cart data
export const selectCart = (state) => state.cart;

// Exporting the cart reducer to be added to the store
export default cartSlice.reducer;





// // src/features/cart/cartSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { db, auth } from '../../firebase';

// // Async thunk to fetch cart data from Firebase
// export const fetchCart = createAsyncThunk('cart/fetchCart', async (uid) => {
//   const cartRef = doc(db, 'carts', uid);
//   const cartSnapshot = await getDoc(cartRef);
//   if (cartSnapshot.exists()) {
//     return cartSnapshot.data(); // Returns cart data
//   }
//   return null;
// });

// // Async thunk to clear the cart in Firestore without affecting Redux state directly
// export const clearCartInDB = createAsyncThunk('cart/clearCartInDB', async (uid, { rejectWithValue }) => {
//   try {
//     const cartRef = doc(db, 'carts', uid);
//     await updateDoc(cartRef, { items: [] }); // Set the items array to an empty array to clear the cart in Firestore
//     return []; // Optionally return an empty array, but we won't handle this in reducers directly
//   } catch (error) {
//     console.error('Error clearing cart in Firestore:', error);
//     return rejectWithValue('Failed to clear cart in Firestore');
//   }
// });

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//     totalQuantity: 0,
//     status: 'idle', // idle | loading | succeeded | failed
//     error: null,
//   },
//   reducers: {
//     addItemToCart: (state, action) => {
//       const newItem = action.payload;
//       const existingItem = state.items.find(item => item.productId === newItem.productId);
//       if (!existingItem) {
//         state.items.push(newItem);
//         state.totalQuantity++;
//       }
//     },
//     updateItemQuantity: (state, action) => {
//       const { productId, quantity } = action.payload;
//       const existingItem = state.items.find(item => item.productId === productId);
//       if (existingItem) {
//         existingItem.quantity = quantity;
//         existingItem.totalPrice = existingItem.price * quantity;
//       }
//     },
//     removeItemFromCart: (state, action) => {
//       const productId = action.payload;
//       state.items = state.items.filter(item => item.productId !== productId);
//       state.totalQuantity = state.items.length;
//     },
//     clearCart: (state) => {
//       state.items = [];
//       state.totalQuantity = 0;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload?.items || [];
//         state.totalQuantity = state.items.length;
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// // Exporting cart actions to be used in components
// export const { addItemToCart, updateItemQuantity, removeItemFromCart, clearCart } = cartSlice.actions;

// // Selector to get cart data
// export const selectCart = (state) => state.cart;

// // Exporting the cart reducer to be added to the store
// export default cartSlice.reducer;
