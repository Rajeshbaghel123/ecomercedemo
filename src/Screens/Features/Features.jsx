import React from 'react';
import styles from './Features.module.scss';
import watch from '../../Assets/Watch.png';
import videoSource from '../../Assets/lady-feature.mp4'; 
export default function Features() {
  return (
    <>
    
        <section className={styles.aboutMain}>

            {/* <h1>Navigating Safety, <br />
            Tracking Confidence</h1> */}
             <video autoPlay loop muted className={styles.videoBackground}>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

        </section>

        <span className={styles.text}>
            <p>Welcome to Trackidoo! We're your partner in peace of mind. Our mission is to keep you connected to what matters most,
                 providing innovative tracking solutions that ensure safety, convenience, and confidence.</p>
        </span>


        <section className={styles.vision_mission}>

            <div className={styles.vision_mission_box}>
                <div className={styles.vision_mission_img1}>
                    <img src={watch} alt="item1" />
                </div>
                <div className={styles.vision_mission_text}>
                    <h1>Watch</h1>
                    <p>Trackidoo was born from a simple idea: to create a world where you're never out of touch with your loved ones or valued possessions.
                         Our founders saw the need for reliable, real-time tracking technology that could seamlessly integrate into everyday life, 
                         offering both practicality and security. Today, we’re proud to offer a suite of smart tracking services designed to meet the diverse needs of our users.</p>
                </div>
            </div>

            <div className={styles.vision_mission_box}>
                <div className={styles.vision_mission_img1}>
                    <img src={watch} alt="item1" />
                </div>
                <div className={styles.vision_mission_text}>
                    <h1>GPS Tag</h1>
                    <p>Trackidoo was born from a simple idea: to create a world where you're never out of touch with your loved ones or valued possessions. 
                        Our founders saw the need for reliable, real-time tracking technology that could seamlessly integrate into everyday life, offering both practicality and security. Today, we’re proud to offer a suite of smart tracking services designed to meet the diverse needs of our users.</p>
                </div>
            </div>

            <div className={styles.vision_mission_box}>
                <div className={styles.vision_mission_img1}>
                    <img src={watch} alt="item1" />
                </div>
                <div className={styles.vision_mission_text}>
                    <h1>Vehicle Products</h1>
                    <p>Trackidoo was born from a simple idea: to create a world where you're never out of touch with your loved ones or valued possessions.
                         Our founders saw the need for reliable,
                         real-time tracking technology that could seamlessly integrate into everyday life,
                         offering both practicality and security. Today, we’re proud to offer a suite of smart tracking services designed to meet the diverse needs of our users.</p>
                </div>
            </div>

        </section>


        <section className={styles.text2}>
            <h1>Let Trackidoo Keep You One Step Ahead!</h1>
            <p>From vehicles to valuables, our mission is to keep you informed, secure, and stress-free. So, why guess when you can know? Let Trackidoo empower you to live smarter, safer, and more connected.</p>
            <a href='#'>Explore Products</a>
        </section>

    </>
  )
}
