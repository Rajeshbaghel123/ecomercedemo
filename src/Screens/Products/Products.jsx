import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Make sure to import your Firebase configuration
import styles from './Products.module.scss'; 
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material'; // Material UI imports

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState('watch');
  const [loading, setLoading] = useState(true); // Loading state to show spinner
  const navigate = useNavigate(); 

  // Fetch products from Firebase on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProducts(productsList);  // Save products to state
        filterProductsByType('watch', productsList); // Set initial filter to 'watch'
        setLoading(false);  // Data has been fetched, stop loading
      } catch (error) {
        console.error('Error fetching products: ', error);
        setLoading(false);  // Stop loading even on error
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on productType
  const filterProductsByType = (type, productList) => {
    const filtered = productList.filter(product => product.productType === type);
    setFilteredProducts(filtered);
    setSelectedType(type);
  };

  const handleProductClick = (productId) => {
    // console.log("Navigating to product with ID:", productId);  
    navigate(`/product/${productId}`);  // Navigate to the product page with the productId
  };

  // Show loader while loading
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <section className={styles.ourProducts}>
      <h1 className={styles.heading}>Products</h1>
      <p className={styles.subHeading}>Trackidoo &gt; Products</p>

      <div className={styles.filters}>
        <button 
          type='button'
          className={selectedType === 'watch' ? styles.active : ''} 
          onClick={() => filterProductsByType('watch', products)}>
          Watch
        </button>
        <button 
          type='button'
          className={selectedType === 'gps tag' ? styles.active : ''} 
          onClick={() => filterProductsByType('gps tag', products)}>
          GPS Tag
        </button>
        <button 
          type='button'
          className={selectedType === 'vehicle tracker' ? styles.active : ''} 
          onClick={() => filterProductsByType('vehicle tracker', products)}>
          Vehicle Tracker
        </button>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div 
            key={index} 
            className={styles.productCard} 
            onClick={() => handleProductClick(product.id)}  // Send product.id here
          >
              <div className={styles.productImage}>
                <img src={`${product.mainImage}`} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p>{product.tagline}</p>
              <p>
  {Number(product.discountedPrice) === Number(product["price "]) ? (
    <strong>₹{Number(product["price "] || 0)}</strong>
  ) : (
    <strong>
      ₹{Number(product.discountedPrice)}
      <span style={{ textDecoration: 'line-through', marginLeft: '10px' }}>
        ₹{Number(product["price "] || 0)}
      </span>
    </strong>
  )}
</p>

            </div>
          ))
        ) : (
          <p>No products available for the selected category.</p>
        )}
      </div>
    </section>
  );
}
