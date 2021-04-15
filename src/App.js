import React from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";

import Header from "./Components/Home/Header";
import HeaderColaborador from "./Components/Colaborador/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Colaborador from "./Components/Colaborador/Colaborador";
import Noticias from "./Components/Noticias/Noticias";
import Footer from "./Components/Home/Footer";
import Descuentos from "./Components/Descuentos/Descuentos";
import Perfil from "./Components/Perfil/Perfil";

export default function App(props) {
  return (
    <Router>
      <Switch>
      <Route path="/perfil">
      {(() => {
        if(localStorage.getItem("tipoUsuario") === "2") { 
          console.log("HEader de socio");
            return <Header/>
         }
         if(localStorage.getItem("tipoUsuario") === "4") { 
          console.log("HEader de colaborador");
          return <HeaderColaborador/>
         }
        })()}
            
            <Perfil/>
            <Footer/>
          </Route>
      <Route path="/descuentos">
            <Header/>
            <Descuentos/>
            <Footer/>
          </Route>
      <Route path="/noticias">
            <Header/>
            <Noticias/>
            <Footer/>
          </Route>
      <Route path="/colaborador">
            <HeaderColaborador/>
            <Colaborador/>
          </Route>
        <Route path="/register">
            <Header/>
            <Register/>
            <Footer/>
          </Route>
        <Route path="/login">
          <Header/>
          <Login/>
          <Footer/>
        </Route>
        <Route path="/">
          <Header/>
          <Home/>
        </Route>
        <Router path="*">
          <Header/>
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

