import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import MediaQuery from "react-responsive";

const Header = () => {
  return (
    <div className="Header">
      <MediaQuery minDeviceWidth={1224} device={{ deviceWidth: 1600 }}>
        <img id="logo" src={logo} alt="logo" />

        <nav>
          <ul>
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
        <button>
          <Link to="/register">Register/Login</Link>
        </button>
      </MediaQuery>
    </div>
  );
};

export default Header;
