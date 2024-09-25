import React from 'react'; 
import styles from './MobileSection.module.scss'; // Updated to use SCSS Modules
import MobileVedio from '../../Assets/Mobile-Final.mp4'; // Import the video from your assets
import circleimage from "../../Assets/Ellipse-15.png";

const MobileSection = () => {
  return (
    <div className={styles.container}>
      {/* Video Background */}
      <video autoPlay loop muted className={styles.videoBackground}>
        <source src={MobileVedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className={styles.gradientOverlay}></div>

      {/* Image Gradient */}
      <div className={styles.imageGradient}>
        <img src={circleimage} alt="Decorative Circle" />
      </div>
    </div>
  );
}

export default MobileSection;
