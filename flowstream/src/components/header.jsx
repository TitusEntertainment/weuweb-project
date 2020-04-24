import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import MediaQuery from "react-responsive";

const Header = () => {
  return (
    <div className="Header">
      <MediaQuery minDeviceWidth={1224} device={{ deviceWidth: 1600 }}>
        <nav>
          <ul>
            <li>
              <img id="logo" src={logo} alt="logo" />
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/shop">About</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
          </ul>
        </nav>
        <button>Login</button>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={800}>MOBILE NAV OMG</MediaQuery>
    </div>
  );
};

export default Header;
