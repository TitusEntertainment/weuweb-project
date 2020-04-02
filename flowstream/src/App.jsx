import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./scss/main.scss";
import "./scss/reset.scss";
import "./scss/header.scss";
import logo from "./assets/Logo.svg";
import Home from "./components/home";
import "./scss/home.scss";

function App() {
  return (
    <Router>
      <div className="main">
        <div className="Header">
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
        </div>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/products"></Route>
          <Route exact path="/shop"></Route>
          <Route exact path="/feedback"></Route>
        </Switch>
      </div>
      <div className="bg"></div>
    </Router>
  );
}

export default App;
