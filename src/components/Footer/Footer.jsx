import React from "react";
import styles from "./Footer.module.scss";
import TrakidooLogo from "../../Assets/TrakidooLogo.png";

export default function Footer() {
  return (
    <>
      <footer className={styles.footerSection}>
        <div className={styles.footerLinks}>
          <div className={styles.footerLogos}>
            <a href="/">
              <img
                className={styles.anantLogoFooter}
                src={TrakidooLogo}
                alt=""
              />
            </a>
            <br /><br />
            <div className={styles.footerText}>
            +91 9999-666-961 <br />
            help@gmail.com <br /><br />
            desk Pvt. Ltd. Registered office : 1,  Floor, Pankaj Mayur plaza-1,  Vihar Phase - 3, New Delhi - 1100906.

            </div>

            {/* <div class="socials">
              <a
                href="https://www.facebook.com/profile.php?id=100092759263819"
                target="_blank"
              >
                <img
                  src="../../../assets/images/SocialMedia/facebook.png"
                  alt="facebook"
                />
              </a>
              <a
                href="https://www.instagram.com/anantrajcloud/"
                target="_blank"
              >
                <img
                  src="../../../assets/images/SocialMedia/instagram.png"
                  alt="instagram"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/anantraj-cloud/?originalSubdomain=in"
                target="_blank"
              >
                <img
                  src="../../../assets/images/SocialMedia/linkedin2.png"
                  alt="linkedin"
                />
              </a>
            </div> */}
          </div>

          <div className={styles.links}>
            <p>
              <a href="locations"><b>About Trackidoo</b></a>
            </p>
            <br />
            <ul>
              <li>
                <a href="locations#RackSpace">Overview</a>
              </li>
              <li>
                <a href="locations#DedicatedServerHall">
                  Founder's Message
                </a>
              </li>
              <li>
                <a href="locations#DedicatedServerFloorSpace">
                    Team
                </a>
              </li>
              <li>
                <a href="locations#ServerRackCage">Careers</a>
              </li>
              <li>
                <a href="locations#ManagementServices">CSR</a>
              </li>

              <li>
                <a href="locations#DedicatedOfficeSpace">
                    Sitemap
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.links}>
            <p>
              <a href=""><b>Products</b></a>
            </p>
            <br />
            <ul>
              <li>
                <a href="features#5TierSecurity">Product 1</a>
              </li>
              <li>
                <a href="features#uninterruptedServices">
                    Product 2
                </a>
              </li>
              <li>
                <a href="features#NNRedundancy">
                    Product 3
                </a>
              </li>
              <li>
                <a href="features#highBandwidth">
                    Product 4
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.links}>
            <p>
              <a href=""><b>Blogs & News</b></a>
            </p>
            <br />
            <ul>
              <li>
                <a href="features#5TierSecurity">Blogs</a>
              </li>
              <li>
                <a href="features#uninterruptedServices">
                    News
                </a>
              </li>
            </ul>
          </div>


        </div>
      </footer>

      <div className={styles.copyright}>
        <ul>
            <li><a href="">Privacy Policy</a></li>
            <li><a href="">Terms & Conditions</a></li>
            <li><a href="">Cookie Policy</a></li>
            <li><a href="">Recruitement Policy</a></li>
        </ul>
      </div>

    </>
  );
}
