import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaUser } from 'react-icons/fa'; // react-icons paketinden sepet ikonunu import edin


function NavBar({ cartItems }) {
  return (
    <nav className="navbar">

      <div className="navbar-center">
        {/* Ana sayfaya geri dönüş bağlantısı */}
        <Link to="/" className="home-link">
          <FaHome />
          Home
        </Link>
      </div>

      <div className="navbar-cart">
        {/* Sepet ikonu */}
        <Link to="/basket" className="cart-icon">
          <FaShoppingCart />
        </Link>
        {/* Sepetteki ürün çeşidi sayısı */}
        <span className="cart-item-count">{cartItems.length}</span>
      </div>

      <div className="navbar-profile">
        <Link to="/profile" className="profile-link">
          <FaUser />
          Profile
        </Link>
      </div>
      
    </nav>
  );
}

export default NavBar;
