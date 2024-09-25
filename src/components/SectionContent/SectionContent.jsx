import React from 'react';
import styles from './SectionContent.module.scss'; // Using CSS Modules
import circleimage from '../../Assets/Ellipse-16.png'; // Adjust the path if needed

const SectionContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer}>
        <div className={styles.leftContent}>
          <h1>
            Keep What You Love <br /> Close, Always!
          </h1>
          <div className={styles.ctaButton}></div> {/* Button Placeholder */}
        </div>
        <div className={styles.rightContent}>
          <p>
            At <strong>Trackidoo</strong>, we believe in more than just knowing
            where things are; we help you stay connected to what matters most.
            Our solutions are about empowering you with confidence, security,
            and peace of mind, all with a single tap.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img src={circleimage} alt="Decorative Circle" />
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
