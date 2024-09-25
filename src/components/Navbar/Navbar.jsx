import React, { useState, useEffect } from 'react';
import './Navbar.scss';  // Link to your updated CSS file
import TrakidooLogo from '../../Assets/TrakidooLogo.png';
import ShoppingCart from '../../Assets/Shoppin-cart.png';
import profile from '../../Assets/profile-user.png';
import { auth } from '../../firebase'; // Firebase authentication
import { signOut } from 'firebase/auth'; // Import signOut function
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, selectCart } from '../../Redux/features/CartSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [user, setUser] = useState(null); 
  const { items, totalQuantity } = useSelector(selectCart);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const removeNavLinksActive = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor Firebase authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // User is logged in
        dispatch(fetchCart(user.uid))
      } else {
        setUser(null); // User is logged out
      }
    });
    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Reset the user state on logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className='navBox'>
      <nav className={`nav ${scrolling ? 'nav-scrolled' : ''}`} id="nav">
        {/* Logo */}
        <div className="navLogoBox">
          <a className="navLogo" href="/">
            <img src={TrakidooLogo} alt="logo" />
          </a>
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${menuOpen ? 'nav-links-active' : ''}`}>
  <ul>
    <li><Link to="/" onClick={removeNavLinksActive}>Home</Link></li>
    <li><Link to="/about" onClick={removeNavLinksActive}>About Us</Link></li>
    <li><Link to="/products" onClick={removeNavLinksActive}>Products</Link></li>
    <li><Link to="/features" onClick={removeNavLinksActive}>Features</Link></li>
    <li><Link to="/blogs" onClick={removeNavLinksActive}>Blogs</Link></li>
    <li><Link to="/#contact" onClick={removeNavLinksActive}>Contact Us</Link></li>
  </ul>
</div>


        {/* Buttons and Icons */}
        <div className="button-icons">
          {user ? (
            // If user is logged in, show profile menu
            <div className="profile-menu">
              <div className="dropdown">
                <button className="dropbtn">
                  <img src={profile} alt="user" /> 
                  
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                     {user?.displayName && <p>{user?.displayName }</p>  } 
                  <Link to="/profile">My Profile</Link>
                  <Link to="/order">Orders</Link>
                  <a href="/login" onClick={handleLogout}>Logout</a>
                </div>
              </div>
            </div>
          ) : (
            // If user is not logged in, show login/signup options
            <div className="auth-menu">
              <a href="/login" className="auth-btn">Login</a>
              {/* <a href="/sign-up" className="auth-btn">Sign Up</a> */}
            </div>
          )}
          <Link to="/cart" className="cart-link">
  <div className="cart-container">
  <img src={ShoppingCart} alt="cart" className="cart-icon" />
    <span className="cart-text"> <span className="cart-quantity">{totalQuantity}</span></span>
  </div>
</Link>

          <Link to="download" className="topButton">Download App</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="menu" id="hb" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;


// import React, { useState, useEffect } from 'react';
// import './Navbar.scss';  // Link to your updated CSS file
// import TrakidooLogo from '../../Assets/TrakidooLogo.png';
// import ShoppingCart from '../../Assets/Shoppin-cart.png';
// import profile from '../../Assets/profile-user.png';

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolling, setScrolling] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const removeNavLinksActive = () => {
//     setMenuOpen(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolling(true);
//       } else {
//         setScrolling(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header className='navBox'>
//       <nav className={`nav ${scrolling ? 'nav-scrolled' : ''}`} id="nav">
//         {/* Logo */}
//         <div className="navLogoBox">
//           <a className="navLogo" href="/">
//             <img src={TrakidooLogo} alt="logo" />
//           </a>
//         </div>

//         {/* Navigation Links */}
//         <div className={`nav-links ${menuOpen ? 'nav-links-active' : ''}`}>
//           <ul>
//             <li><a href="/" onClick={removeNavLinksActive}>Home</a></li>
//             <li><a href="about" onClick={removeNavLinksActive}>About Us</a></li>
//             <li><a href="products" onClick={removeNavLinksActive}>Products</a></li>
//             <li><a href="features" onClick={removeNavLinksActive}>Features</a></li>
//             <li><a href="blogs" onClick={removeNavLinksActive}>Blogs</a></li>
//             <li><a href="#contact" onClick={removeNavLinksActive}>Contact Us</a></li>
//           </ul>
//         </div>

//         {/* Buttons and Icons */}
//         <div className="button-icons">
//           <a href="#"><img src={profile} alt="user" /></a>
//           <a href="cart"><img src={ShoppingCart} alt="cart" /></a>
//           <a href="download" className="topButton">Download App</a>
//         </div>

//         {/* Mobile Menu Icon */}
//         <div className="menu" id="hb" onClick={toggleMenu}>
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;




