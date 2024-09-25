import React from 'react';
import styles from './HeroSection.module.scss'; // Using CSS Modules
import videoSource from '../../Assets/motherchild.mp4'; // Import the video from your assets

const HeroSection = () => {
  return (
    <div className={styles.heroContainer}>
      {/* Video Background */}
      <video autoPlay loop muted className={styles.videoBackground}>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <h1>Navigating Safety, <br /> Tracking Confidence</h1>
        <a href="#" className={styles.exploreButton}>Explore Products</a>
      </div>
    </div>
  );
};

export default HeroSection;
