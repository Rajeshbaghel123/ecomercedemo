import React from 'react';
import styles from './CardSection.module.scss'; // Updated to use CSS Modules
import Cardone from "../../Assets/Rectangle-21.png";
import Cardtwo from "../../Assets/Rectangle-22.png";

const CardSection = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardSection}>
        <div className={styles.card}>
          <img src={Cardone} alt="Trackidoo App" className={styles.cardImage} />
          <div className={styles.cardText}>
            <h3>Let Trackidoo Keep You One Step Ahead!</h3>
          </div>
        </div>
        <div className={styles.card}>
          <img src={Cardtwo} alt="Trackidoo User" className={styles.cardImage} />
          <div className={styles.cardText}>
            <h3>Let Trackidoo Keep You One Step Ahead!</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;



// import React from 'react';
// import './CardSection.css'; // Import the custom CSS file
// import Cardone from "../../Assets/Rectangle-21.png";
// import Cardtwo from "../../Assets/Rectangle-22.png";
// import CardBackground from "../../Assets/Rectangle-85.png"; // Use this for the background below the text

// const CardSection = () => {
//   return (
//     <div className="card-container">
//       <div className='card-section'>
//         <div className="card">
//           <img src={Cardone} alt="Trackidoo App" className="card-image" />
//           <div className="card-overlay">
//             <img src={CardBackground} alt="Card Background" className="card-background" />
//             <div className="card-text">
//               <h3>Let Trackidoo Keep You One Step Ahead!</h3>
//             </div>
//           </div>
//         </div>
//         <div className="card">
//           <img src={Cardtwo} alt="Trackidoo User" className="card-image" />
//           <div className="card-overlay">
//             <img src={CardBackground} alt="Card Background" className="card-background" />
//             <div className="card-text">
//               <h3>Let Trackidoo Keep You One Step Ahead!</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardSection;

