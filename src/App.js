import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

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
import JuntaDirectiva from "./Components/JuntaDirectiva/JuntaDirectiva";
import HeaderJuntaDirectiva from "./Components/JuntaDirectiva/Header";
import Contabilidad from "./Components/JuntaDirectiva/Contabilidad/Contabilidad";
import HeaderLeft from "./Components/JuntaDirectiva/HeaderLeft";
import NoticiasJunta from "./Components/JuntaDirectiva/Noticias/Noticias";
import Evento from "./Components/JuntaDirectiva/Eventos/Evento";
import Acta from "./Components/JuntaDirectiva/Acta/Acta";
import Socios from "./Components/JuntaDirectiva/Socios/Socios";
import Descuento from "./Components/JuntaDirectiva/Descuentos/Descuento";
import Agenda from "./Components/JuntaDirectiva/Agenda/Agenda";
import AgendaSocio from "./Components/AgendaSocio";
import Archivos from "./Components/JuntaDirectiva/Archivos/Archivos";
import Cookies from "./Components/Politicas/Cookies";
import Privacidad from "./Components/Politicas/Privacidad";
import Legal from "./Components/Politicas/Legal";

export default function App() {
  const [location] = useState(window.location);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route path="/perfil">
          {(() => {
            console.log(localStorage.getItem("tipoUsuario"));
            if (localStorage.getItem("tipoUsuario") === "2") {
              console.log("HEader de socio");
              return (
                <>
                  <Header />
                  <Perfil />
                  <Footer />
                </>
              );
            }
            if (localStorage.getItem("tipoUsuario") === "4") {
              console.log("HEader de colaborador");
              return (
                <>
                  <HeaderColaborador />
                  <Perfil />
                  <Footer />
                </>
              );
            }
            if (localStorage.getItem("tipoUsuario") === "3") {
              console.log("HEader de juntaDirectiva");
              return (
                <>
                  <HeaderJuntaDirectiva />
                  <Perfil />
                  <Footer />
                </>
              );
            }

            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              localStorage.getItem("tipoUsuario") !== "2" &&
              localStorage.getItem("tipoUsuario") !== "4" &&
              location.pathname === "/perfil"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            }
          })()}
        </Route>
        <Route path="/junta-directiva/archivos">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              location.pathname === "/junta-directiva/archivos"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <HeaderJuntaDirectiva />
                  <div className="container-fluid fondo" id="juntaDirectiva">
                    <div className="row">
                      <HeaderLeft />
                      <Archivos />
                    </div>
                  </div>
                </>
              );
            }
          })()}
        </Route>
        <Route path="/junta-directiva/agenda">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              location.pathname === "/junta-directiva/agenda"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <HeaderJuntaDirectiva />
                  <div className="container-fluid fondo" id="juntaDirectiva">
                    <div className="row">
                      <HeaderLeft />
                      <Agenda />
                    </div>
                  </div>
                </>
              );
            }
          })()}
        </Route>
        <Route path="/junta-directiva/descuentos">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              location.pathname === "/junta-directiva/descuentos"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <HeaderJuntaDirectiva />
                  <div className="container-fluid fondo" id="juntaDirectiva">
                    <div className="row">
                      <HeaderLeft />
                      <Descuento />
                    </div>
                  </div>
                </>
              );
            }
          })()}
        </Route>
        <Route path="/junta-directiva/socios">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              location.pathname === "/junta-directiva/socios"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <HeaderJuntaDirectiva />
                  <div className="container-fluid fondo" id="juntaDirectiva">
                    <div className="row">
                      <HeaderLeft />
                      <Socios />
                    </div>
                  </div>
                </>
              );
            }
          })()}
        </Route>
        <Route path="/junta-directiva/acta">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              location.pathname === "/junta-directiva/acta"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <HeaderJuntaDirectiva />
                  <div className="container-fluid fondo" id="juntaDirectiva">
                    <div className="row">
                      <HeaderLeft />
                      <Acta />
                    </div>
                  </div>
                </>
              );
            }
          })()}
        </Route>
        <Route path="/junta-directiva/eventos">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              location.pathname === "/junta-directiva/eventos"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <HeaderJuntaDirectiva />
                  <div className="container-fluid fondo" id="juntaDirectiva">
                    <div className="row">
                      <HeaderLeft />
                      <Evento />
                    </div>
                  </div>
                </>
              );
            }
          })()}
        </Route>
        <Route path="/junta-directiva/noticias">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              location.pathname === "/junta-directiva/noticias"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <HeaderJuntaDirectiva />
                  <div className="container-fluid fondo" id="juntaDirectiva">
                    <div className="row">
                      <HeaderLeft />
                      <NoticiasJunta />
                    </div>
                  </div>
                </>
              );
            }
          })()}
        </Route>
        <Route path="/junta-directiva/contabilidad">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              location.pathname === "/junta-directiva/contabilidad"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <HeaderJuntaDirectiva />
                  <div className="container-fluid fondo" id="juntaDirectiva">
                    <div className="row">
                      <HeaderLeft />
                      <Contabilidad />
                    </div>
                  </div>
                </>
              );
            }
          })()}
        </Route>
        <Route path="/junta-directiva">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              location.pathname === "/junta-directiva"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <HeaderJuntaDirectiva />
                  <JuntaDirectiva />
                </>
              );
            }
          })()}
        </Route>
        <Route path="/agenda">
          <Header />
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              localStorage.getItem("tipoUsuario") !== "2" &&
              location.pathname === "/agenda"
            ) {
              return <ErrorPermisos />;
            } else {
              return (
                <>
                  <AgendaSocio />
                  <Footer />
                </>
              );
            }
          })()}
        </Route>
        <Route path="/politicas-legal">
          <Header />
          <Legal />
          <Footer />
        </Route>
        <Route path="/politicas-privacidad">
          <Header />
          <Privacidad />
          <Footer />
        </Route>
        <Route path="/politicas-cookies">
          <Header />
          <Cookies />
          <Footer />
        </Route>
        <Route path="/descuentos">
          <Header />
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              localStorage.getItem("tipoUsuario") !== "2" &&
              location.pathname === "/descuentos"
            ) {
              return <ErrorPermisos />;
            } else {
              return (
                <>
                  <Descuentos />
                  <Footer />
                </>
              );
            }
          })()}
        </Route>
        <Route path="/noticias">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "3" &&
              localStorage.getItem("tipoUsuario") !== "2" &&
              location.pathname === "/noticias"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <Header />
                  <Noticias />
                  <Footer />
                </>
              );
            }
          })()}
        </Route>
        <Route path="/colaborador">
          {(() => {
            if (
              localStorage.getItem("tipoUsuario") !== "4" &&
              location.pathname === "/colaborador"
            ) {
              return (
                <>
                  <Header />
                  <ErrorPermisos />
                </>
              );
            } else {
              return (
                <>
                  <HeaderColaborador />
                  <Colaborador />
                </>
              );
            }
          })()}
        </Route>
        <Route path="/register">
         {(() => {
            if (
              (localStorage.getItem("tipoUsuario") === "3" ||
              localStorage.getItem("tipoUsuario") === "2" ||
              localStorage.getItem("tipoUsuario") === "4") &&
              location.pathname === "/register"
            )  {
              window.location = "/";
            } else {
              return (
                <>
                  <Header />
                  <Register />
                  <Footer />
                </>
              );
            }
          })()}
          
        </Route>
        <Route path="/login">
             {(() => {
            if (
              (localStorage.getItem("tipoUsuario") === "3" ||
              localStorage.getItem("tipoUsuario") === "2" ||
              localStorage.getItem("tipoUsuario") === "4") &&
              location.pathname === "/login"
            ) {
              window.location = "/";
            } else {
              return (
                <>
                  <Header />
                  <Login />
                  <Footer />
                </>
              );
            }
          })()}
        </Route>
        <Route path="*">
          <Header />
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <div id="contenido" className="container">
      <div className="row">
        <div className="pt-5">
          <h3>Error 404</h3>
          <h3>
            La ruta introducida no existe(<code>{location.pathname}</code>)
          </h3>
        </div>
      </div>
    </div>
  );
}

function ErrorPermisos() {
  return (
    <div id="contenido" className="container">
      <div className="row">
        <div className="pt-5">
          <h3>Error Permisos</h3>
          <h3>Pulse en el siguiente botón para volver a la home.</h3>
          <a className="btn btnEstandar" href="/">
            Volver a la home
          </a>
        </div>
      </div>
    </div>
  );
}
