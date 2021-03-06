import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import Register from "./components/register";
import Login from "./components/login";
import Profile from "./components/profile";

function App() {
  return (
    <Router>
      <div className="main">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/products"></Route>
          <Route exact path="/shop"></Route>
          <Route exact path="/feedback"></Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
      <div className="bg"></div>
    </Router>
  );
}

export default App;
