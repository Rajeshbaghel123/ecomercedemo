import React, { useEffect, useState } from 'react';
import styles from './GifSection.module.scss'; // Import SCSS module
import mobileGif from '../../Assets/Mobile-Gif.gif'; // Adjust the path to the GIF asset
import './FAQ.scss';

const GifSection = () => {
// State to keep track of the currently active FAQ
const [activeIndex, setActiveIndex] = useState(null);

// Function to handle FAQ toggle
const toggleFAQ = (index) => {
  // If the clicked FAQ is already active, close it by setting index to null
  if (activeIndex === index) {
    setActiveIndex(null);
  } else {
    setActiveIndex(index); // Open the clicked FAQ
  }
};


  return (
    <>
    <section className={styles.gifSection}>
      <div className={styles.gifContainer}>
        <img src={mobileGif} alt="Mobile App GIF" className={styles.mobileGif} />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.heading}>Towards A More <span>Sustainable</span> Future</h2>
        <p className={styles.description}>
          We promote environmental sustainability by designing devices which give you information on reducing fuel consumption and emissions. Additionally, monitoring idle time helps identify areas where fuel is being wasted, allowing for improvements in driving practices.
          <br /><br />
          Tracking AC on/off time can also contribute to reducing emissions. By providing real-time feedback on driving habits, Trackidoo encourages eco-driving practices like smooth acceleration and braking, further reducing the carbon footprint.
        </p>
      </div>
    </section>

{/* FAQ */}

<section className='faqSection'>

<h1 className="faq_title">Frequently Asked Questions</h1>

<div className="faq_container">
  
      <div className="faq_item">
        <div className='faq_plus'>{activeIndex === 0 ? '-' : '+'}</div>
        <button
          className="faq_question"
          onClick={() => toggleFAQ(0)}
        >
          What services do Trackidoo provide? <br />

          <div
          className={`faq_answer ${activeIndex === 0 ? 'active' : ''}`}
        >
          <p>
            Trackidoo provides the most comprehensive tracking technology to make your vehicle safe.
             Our cutting-edge products are designed to provide you greater control over your vehicle.
          </p>
        </div>
        </button>
        
      </div>

      <div className="faq_item">
        <div className='faq_plus'>{activeIndex === 1 ? '-' : '+'}</div>
        <button
          className="faq_question"
          onClick={() => toggleFAQ(1)}
        >
          How does one install a vehicle tracking device?<br />

          <div
          className={`faq_answer ${activeIndex === 1 ? 'active' : ''}`}
        >
          <p>
            Trackidoo provides the most comprehensive tracking technology to make your vehicle safe. 
            Our cutting-edge products are designed to provide you greater control over your vehicle.
          </p>
        </div>
        </button>
        
      </div>

      <div className="faq_item">
        <div className='faq_plus'>{activeIndex === 2 ? '-' : '+'}</div>
        <button
          className="faq_question"
          onClick={() => toggleFAQ(2)}
        >
          What features will be available in the devices?<br />

          <div
          className={`faq_answer ${activeIndex === 2 ? 'active' : ''}`}
        >
          <p>
            Trackidoo provides the most comprehensive tracking technology to make your vehicle safe. 
            Our cutting-edge products are designed to provide you greater control over your vehicle.
          </p>
        </div>
        </button>
        
      </div>

      <div className="faq_item">
        <div className='faq_plus'>{activeIndex === 3 ? '-' : '+'}</div>
        <button
          className="faq_question"
          onClick={() => toggleFAQ(3)}
        >
          What types of vehicles can be tracked? <br />

          <div
          className={`faq_answer ${activeIndex === 3 ? 'active' : ''}`}
        >
          <p>
            Trackidoo provides the most comprehensive tracking technology to make your vehicle safe. 
            Our cutting-edge products are designed to provide you greater control over your vehicle.
          </p>
        </div>
        </button>
        
      </div>

      
    </div>

    </section>
    </>
  );
};

export default GifSection;
