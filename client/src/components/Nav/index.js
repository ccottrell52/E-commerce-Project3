import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="link-group">
          <Link to="/orderHistory">
            <li className="link">
              Order History
            </li>
          </Link>
          <Link to="/wishlist">
            <li className="link">
              Wishlist
            </li>
          </Link>
          <Link to='/' onClick={() => Auth.logout()}>
            <li className="link">
              Logout
            </li>
          </Link>
        </ul>
      );
    } else {
      return (
        
        <ul className="link-group">
          <Link to="/signup">
            <li className="link">
              Signup
            </li>
          </Link>
          <Link to="/login">
            <li className="link">
              Login
            </li>
          </Link>
        </ul>
        
      );
    }
  }

  return (
    <header className="link-group">
      <Link to="/">
        <h1 className="link">
          Eric's Emporium
        </h1>
      </Link>

      <nav className="">
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
