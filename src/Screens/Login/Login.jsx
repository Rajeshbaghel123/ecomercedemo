import React, { useState } from 'react';
import appStore from '../../Assets/AppleStore.png';
import googlePlay from '../../Assets/GooglePlay.png';
import Phone from '../../Assets/DownloadAppPhone.png';
import styles from './Login.module.scss';
import { db, auth, provider } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail, // Import this to check how the user registered
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome ${user.displayName}`);
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'Users', user.uid), userData, { merge: true });
      console.log('User signed in and saved:', userData);
    } catch (error) {
      console.error('Error during sign-in or saving to Firestore:', error);
      toast.error('Error during Google Sign-In');
    }
  };

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    try {
      // Check if the user has registered using a different method like Google
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.includes('google.com')) {
        toast.error('You have already registered using Google. Please sign in with Google.');
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      // Handle Firebase Authentication Errors
      switch (error.code) {
        case 'auth/user-not-found':
          toast.error('No user found with this email. Please register.');
          break;
        case 'auth/wrong-password':
          toast.error('Incorrect password. Please try again.');
          break;
        case 'auth/too-many-requests':
          toast.error('Too many unsuccessful login attempts. Please try again later.');
          break;
        default:
          toast.error('Failed to log in. Please check your credentials and try again.');
          break;
      }
    }
  };

  const handleSignUpNavigation = () => {
    navigate('/sign-up');
  };

  return (
    <>
      <section className={styles.downloadApp}>
        <div className={styles.downloadAppImageOut}>
          <div className={styles.downloadAppImage}>
            <img src={Phone} alt="Phone" />
          </div>
        </div>

        <div className={styles.downloadAppText}>
          <h1>Login to Your Account</h1>
          <p>For business, band or celebrity. </p>

          <form className={styles.register_form} onSubmit={handleEmailPasswordSignIn}>
            <div className={styles.input_row}>
              <div className={styles.input_container}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.input_row}>
              <div className={styles.input_container}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.checkbox_container}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <label>
                <input type="checkbox" required/> I agree to all the <a href="#">Terms and Privacy policy</a>
              </label>
            </div>
            <div className={styles.buttons_row}>
              {/* Changed the button to submit the form */}
              <button type="submit" className={styles.create_btn}>Login</button>
              <button type="button" className={styles.google_btn} onClick={handleGoogleSignIn}>
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Icon" />
                Sign-in with Google
              </button>
            </div>
            <div className={styles.login_link}>
              <p>Don't have an account? <span onClick={handleSignUpNavigation} style={{cursor:'pointer'}}>Register</span></p>
            </div>
          </form>

          <div className={styles.downloadApp_box}>
            <a href=""><img src={googlePlay} alt="" /></a>
            <a href=""><img src={appStore} alt="" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
