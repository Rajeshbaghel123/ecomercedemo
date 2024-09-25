import React, { useState } from 'react';
import appStore from '../../Assets/AppleStore.png';
import googlePlay from '../../Assets/GooglePlay.png';
import Phone from '../../Assets/DownloadAppPhone.png';
import styles from './Register.module.scss';
import { db, auth, provider } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

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
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    
    // Input validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !dob) {
      toast.error('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      // Check if email is already registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        toast.error('Email is already registered. Please login.');
        setLoading(false);
        return;
      }

      // Create user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      toast.success('Account created successfully');
      const displayName = `${firstName} ${lastName}`;
      // Save user data in Firestore
      const userData = {
        uid: user.uid,
        firstName,
        lastName,
        displayName,
        email: user.email,
        dateOfBirth: dob,
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'Users', user.uid), userData, { merge: true });
      setLoading(false);
      navigate('/'); // Redirect to home or another page after successful registration
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Error registering account');
      setLoading(false);
    }
  };

  const handleSignUpNavigation = () => {
    navigate('/login');
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
          <h1>Create an Account</h1>
          <p>For business, band or celebrity. </p>

          <form className={styles.register_form} onSubmit={handleCreateUser}>
            <div className={styles.input_row}>
              <div className={styles.input_container}>
                <input
                  type="text"
                  placeholder="Enter Your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <input
                  type="text"
                  placeholder="Enter Your Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
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
              <div className={styles.input_container}>
                <input
                  type="date"
                  placeholder="Date of birth (MM/DD/YY)"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
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
              <div className={styles.input_container}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.checkbox_container}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <label>
                <input type="checkbox" required /> I agree to all the <a href="#">Terms and Privacy policy</a>
              </label>
            </div>
            <div className={styles.buttons_row}>
              <button type="submit" className={styles.create_btn} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
              <button className={styles.google_btn} onClick={handleGoogleSignIn} disabled={loading}>
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google Icon"
                />
                Sign-in with Google
              </button>
            </div>
            <div className={styles.login_link}>
              <p>
                Already have an account?{' '}
                <span onClick={handleSignUpNavigation} style={{ cursor: 'pointer' }}>
                  Login
                </span>
              </p>
            </div>
          </form>

          <div className={styles.downloadApp_box}>
            <a href="">
              <img src={googlePlay} alt="" />
            </a>
            <a href="">
              <img src={appStore} alt="" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
