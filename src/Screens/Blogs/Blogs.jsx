import React from 'react';
import styles from './Blogs.module.scss';
import blog1 from '../../Assets/FeaturesBg.png';
import blog2 from '../../Assets/blog1.png';
import blog3 from '../../Assets/blog2.png';

export default function Blogs() {
  return (

    <>

        <div className={styles.blogsPage}>
            {/* Heading */}
            <h1 className={styles.heading}>Blogs</h1>

            {/* Breadcrumb and Filters */}
            <div className={styles.topBar}>
                <div className={styles.breadcrumb}>
                    <a href="/">Trackloop</a> &gt; <span>Blogs</span>
                </div>
                <div className={styles.filters}>
                    <select className={styles.yearFilter}>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                    <select className={styles.categoryFilter}>
                        <option value="All">All</option>
                        <option value="Watch">Watch</option>
                        <option value="Tracker">Tracker</option>
                    </select>
                </div>
            </div>

            {/* Blog Cards */}
            <div className={styles.blogsList}>
                {/* Single Blog Card */}
                <div className={styles.blogCard}>
                    <img
                        src={blog1}
                        alt="Blog 1"
                        className={styles.blogImage}
                    />
                    <h3>Revolutionising Urban Mobility: Electric Scooter Rentals in Delhi with UTU</h3>
                    <p>
                        The Indian automotive market is diverse and evolving rapidly, encompassing a range of vehicle types. Traditional IC engine vehicles...
                    </p>
                    <a className={styles.readMoreBtn} href='blog'>Read More</a>
                </div>

                <div className={styles.blogCard}>
                    <img
                        src={blog2}
                        alt="Blog 2"
                        className={styles.blogImage}
                    />
                    <h3>Revolutionising Urban Mobility: Electric Scooter Rentals in Delhi with UTU</h3>
                    <p>
                        The Indian automotive market is diverse and evolving rapidly, encompassing a range of vehicle types. Traditional IC engine vehicles...
                    </p>
                    <a className={styles.readMoreBtn} href='blog'>Read More</a>
                </div>

                <div className={styles.blogCard}>
                    <img
                        src={blog1}
                        alt="Blog 3"
                        className={styles.blogImage}
                    />
                    <h3>Revolutionising Urban Mobility: Electric Scooter Rentals in Delhi with UTU</h3>
                    <p>
                        The Indian automotive market is diverse and evolving rapidly, encompassing a range of vehicle types. Traditional IC engine vehicles...
                    </p>
                    <a className={styles.readMoreBtn} href='blog'>Read More</a>
                </div>

                <div className={styles.blogCard}>
                    <img
                        src={blog3}
                        alt="Blog 4"
                        className={styles.blogImage}
                    />
                    <h3>Revolutionising Urban Mobility: Electric Scooter Rentals in Delhi with UTU</h3>
                    <p>
                        The Indian automotive market is diverse and evolving rapidly, encompassing a range of vehicle types. Traditional IC engine vehicles...
                    </p>
                    <a className={styles.readMoreBtn} href='blog'>Read More</a>
                </div>
            </div>
        </div>
    
    </>

  )
}
