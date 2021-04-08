import React from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";

import Header from "./Components/Home/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

export default function App(props) {
  return (
    <Router>
      <Header/>
      <Switch>
      <Route path="/register">
          <Register/>
        </Route>
      <Route path="/login">
          <Login/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
        <Router path="*">
          <NoMatch/>
        </Router>
      </Switch>
    </Router>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        Error 404 
      </h3>
      <h3>
        La ruta introducida no existe(<code>{location.pathname}</code>)
      </h3>
    </div>
  );
}

