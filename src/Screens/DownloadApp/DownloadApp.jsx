import React from 'react';
import appStore from '../../Assets/AppleStore.png';
import googlePlay from '../../Assets/GooglePlay.png';
import Phone from '../../Assets/DownloadAppPhone.png';

import styles from './DownloadApp.module.scss';

export default function DownloadApp() {
  return (

    <>
    
        <section className={styles.downloadApp}>

            <div className={styles.downloadAppText}>

                <h1>Bringing Your Vehicle In Your Control</h1>
                <p>The Indian automotive market is diverse and evolving rapidly, encompassing a range of vehicle types. </p>

                <div className={styles.downloadApp_box}>
                    <a href=""><img src={googlePlay} alt="" /></a>
                    <a href=""><img src={appStore} alt="" /></a>
                </div>

            </div>

            <div className={styles.downloadAppImage}>
                <img src={Phone} alt="Phone" />
            </div>

        </section>
    
    </>

  )
}
