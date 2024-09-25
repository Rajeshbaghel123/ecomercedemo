import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate} from "react-router-dom";
// import { useAuth } from "./contexts/AuthContext"; 
import Home from "./Screens/Home/home";
import { auth } from "./firebase";
import AboutUs from "./Screens/AboutUs/AboutUs";
import Features from "./Screens/Features/Features";
import Products from "./Screens/Products/Products";
import Login from "./Screens/Login/Login"; 
import Register from "./Screens/Register/Register"; 
import { Oval } from 'react-loader-spinner';
import Blog from "./Screens/Blog/Blog";
import Blogs from "./Screens/Blogs/Blogs";
import Product from "./Screens/Product/Product";
import Cart from "./Screens/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./Screens/Login/ForgotPassword";
import { useNavigate } from 'react-router-dom';
import Checkout from "./Screens/Checkout/Checkout";
import OrderDetail from "./Screens/Orders/OrderDetail";
import Orders from "./Screens/Orders/Orders";


const MainRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
    return (
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgot-password" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
        <Route path="/sign-up" element={user ? <Navigate to="/" /> : <Register/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/products" element={<Products />} />
      


          {/* Private routes */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
       
         <Route
          path="/order"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/:orderId"
          element={
            <PrivateRoute>
              <OrderDetail />
            </PrivateRoute>
          }
        />
      
      </Routes> 
    );
  };
  
  export default MainRoutes;
