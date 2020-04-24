import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";

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
        </Switch>
      </div>
      <div className="bg"></div>
    </Router>
  );
}

export default App;
