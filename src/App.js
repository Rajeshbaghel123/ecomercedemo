import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MainRoutes from './MainRoutes'; // Import the MainRoutes component
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './Redux/app/store.js'

export default function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Navbar />
      <MainRoutes /> 
      <Footer />
    </Provider>
  );
}
