import React from 'react';
import styles from './WhyChooseUs.module.scss'; // Using SCSS Modules for scoped styles

export default function WhyChooseUs() {
  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.head}>
        <h1>Why Choose Us</h1>
      </div>

      <section className={styles.whyChooseUsBoxes}>
        <div className={styles.singleBox}>
          <div className={styles.singleBoxImg}></div>
          <h2>Our Mission</h2>
          <span>
            Our mission is to ensure road safety and driver security through innovative vehicle tracking technology. We are
            dedicated to developing reliable, user-friendly solutions that provide real-time insights, helping individuals
            and organizations minimize risks, optimize performance, and make every journey safer.
          </span>
        </div>

        <div className={styles.singleBox}>
          <div className={styles.singleBoxImg}></div>
          <h2>Our Vision</h2>
          <span>
            To revolutionize road safety and driver security by delivering cutting-edge vehicle tracking solutions that
            ensure every journey is as safe and secure as possible. We strive to lead the industry in innovation, reliability,
            and technology, empowering drivers, fleet managers, and communities to navigate with confidence and peace of mind.
          </span>
        </div>

        <div className={styles.singleBox}>
          <div className={styles.singleBoxImg}></div>
          <h2>Our Values</h2>
          <span>
            At Trackidoo, we think that providing advanced tracking technology to vehicles makes roads safer, benefits
            millions of owners and drivers, and improves climate sustainability—and that this is how we survive.
          </span>
        </div>
      </section>
    </section>
  );
}
