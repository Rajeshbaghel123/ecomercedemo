import React from 'react';
import styles from './OurProducts.module.scss'; // Import SCSS module
import ProductImage from '../../Assets/image-12.png'
const OurProducts = () => {
  const products = [
    {
      id: 1,
      name: 'B-Safe Ways',
      description: 'Perfect for Most Users',
      imageUrl: '../../Assets/image-12.png' 
    },
    {
      id: 2,
      name: 'B-Safe Ways',
      description: 'Perfect for Most Users',
      imageUrl: '../../Assets/image-12.png'
    },
    {
      id: 3,
      name: 'B-Safe Ways',
      description: 'Perfect for Most Users',
      imageUrl: '../../Assets/image-12.png'
    },
    {
      id: 4,
      name: 'B-Safe Ways',
      description: 'Perfect for Most Users',
      imageUrl: '../../Assets/image-12.png'
    },
    {
      id: 5,
      name: 'B-Safe Ways',
      description: 'Perfect for Most Users',
      imageUrl: '../../Assets/image-12.png'
    }
  ];

  return (
    <section className={styles.ourProducts}>
      <h1 className={styles.heading}>Our Products</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div className={styles.productCard} key={product.id}>
            <div className={styles.productImage}>
              <img src={`${ProductImage}`} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
      <button className={styles.viewMoreButton}>Explore Products</button>
    </section>
  );
};

export default OurProducts;
