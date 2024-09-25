import React from 'react';
import styles from './AboutUs.module.scss';
import item1 from '../../Assets/image 4.png';
import boy from '../../Assets/boy.png';
import woman from '../../Assets/woman.png';

export default function AboutUs() {
  return (
    <>
    
        <section className={styles.aboutMain}>

            <h1>Navigating Safety, <br />
            Tracking Confidence</h1>

        </section>

        <span className={styles.text}>
            <p>Welcome to Trackidoo! We're your partner in peace of mind. Our mission is to keep you connected to what matters most, providing innovative tracking solutions that ensure safety, convenience, and confidence.</p>
        </span>


        <section className={styles.vision_mission}>

            <div className={styles.vision_mission_box}>
                <div className={styles.vision_mission_img1}>
                    <img src={item1} alt="item1" />
                </div>
                <div className={styles.vision_mission_text}>
                    <h1>About Us</h1>
                    <p>Trackidoo was born from a simple idea: to create a world where you're never out of touch with your loved ones or valued possessions. Our founders saw the need for reliable, real-time tracking technology that could seamlessly integrate into everyday life, offering both practicality and security. Today, we’re proud to offer a suite of smart tracking services designed to meet the diverse needs of our users.</p>
                </div>
            </div>


            <div className={styles.vision_mission_box}>
                <div className={styles.vision_mission_text}>
                    <h1>What we do</h1>
                    <p>We specialise in developing cutting-edge tracking systems for a wide range of applications. Our technology allows you to monitor, manage, and protect what you hold dear, all with the ease of a mobile app. Whether you’re a parent keeping an eye on your children, a business owner managing a fleet, or simply someone looking to keep track of your keys, Trackidoo is here to help.</p>
                </div>
                <img className={styles.vision_mission_img2} src={woman} alt="" />
            </div>


            <div className={styles.vision_mission_box}>
                <img className={styles.vision_mission_img2} src={boy} alt="" />
                <div className={styles.vision_mission_text}>
                    <h1>Our Vision</h1>
                    <p>Revolutionise the way people stay connected to their world. We aim to be the leader in tracking technology, continuously innovating to provide the most reliable, user-friendly solutions. By combining advanced technology with a commitment to user satisfaction, we strive to make every journey safer and every possession easier to manage.</p>
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
