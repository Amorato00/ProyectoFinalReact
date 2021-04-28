import React, { useState, useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";

export default function Header() {
  //const [sesion, setSesion] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [location] = useState(window.location);
  useEffect(() => {
    console.log("Sesion: " + localStorage.getItem("sesion"));
    console.log("Imagen Perfil: " + localStorage.getItem("imagenPerfil"));
    //if (
    //  localStorage.getItem("sesion") != null &&
    //  localStorage.getItem("sesion") !== false
    //) {
    //  setSesion(true);
    //}
    if (localStorage.getItem("imagenPerfil") != null) {
      setFotoPerfil(localStorage.getItem("imagenPerfil"));
    }
  });

  return (
    <header className="menu-superior2">
      <div className="container">
        <Navbar expand="lg">
          <button
            className="navbar-toggler border-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMenuHome"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
            id="menuHamburguesa"
          >
            <i className="fas fa-bars"></i>
          </button>
          <Navbar.Brand
            className="navbar-brand d-flex align-items-center mr-0"
            href="/junta-directiva"
            id="logo"
          >
            <img src={"/img/logo/logo.png"} alt="Logo de bycyryde" />
            <h3 className="d-md-inline d-none d-md-block pl-4">BYCIRYDE</h3>
          </Navbar.Brand>
          <Navbar.Brand
            className="dropdown nav-item active my-auto d-block d-lg-none mr-0"
            id="imagenPerfil"
          >
            <a
              className="nav-link enlace-nav"
              href="#"
              id="navbarDropdown2"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={"/img/fotoPerfil/" + fotoPerfil} alt="" />
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a href="/perfil" title="perfil" className="dropdown-item">
                <i className="fa fa-user"></i>
              </a>
              <Button
                onClick={() => {
                  localStorage.clear();
                  localStorage.setItem("alerta", "Sesion cerrada");
                  window.location = "/";
                }}
                className="dropdown-item"
              >
                <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
              </Button>
            </div>
          </Navbar.Brand>

          <div className="collapse navbar-collapse" id="navbarMenuHome">
            <ul className="navbar-nav ">
              <li className="active my-auto">
                <a className="nav-link enlace-nav d-none" href="/">
                  <i class="fas fa-bell h4 pr-5"></i>
                </a>
              </li>
              <li className="active my-auto d-block d-md-none">
               
              
                {location.pathname === "/junta-directiva" ? (
                   <a className="nav-link marcar enlace-nav" href="/junta-directiva">
                <i className="fas fa-home pr-3"></i> Home
                </a>
              ) : (
                 <a className="nav-link  enlace-nav" href="/junta-directiva">
                <i className="fas fa-home pr-3"></i> Home
                </a>
              )}
              </li>
              <li className="active my-auto d-block d-md-none">
                {location.pathname === "/junta-directiva/contabilidad" ? (
                 <a className="nav-link marcar enlace-nav" href="/junta-directiva/contabilidad">
                <i className="fas fa-balance-scale-left pr-3"></i> Contabilidad
                </a>
              ) : (
                 <a className="nav-link enlace-nav" href="/junta-directiva/contabilidad">
                <i className="fas fa-balance-scale-left pr-3"></i> Contabilidad
                </a>
              )}
                
              </li>
              <li className="active my-auto d-block d-md-none">
                {location.pathname === "/junta-directiva/socios" ? (
                  <a className="nav-link marcar enlace-nav" href="/junta-directiva/socios">
                <i className="fas fa-users pr-3"></i> Socios
                </a>
              ) : (
                  <a className="nav-link enlace-nav" href="/junta-directiva/socios">
                <i className="fas fa-users pr-3"></i> Socios
                </a>
              )}
               
              </li>
              <li className="active my-auto d-block d-md-none">
                  {location.pathname === "/junta-directiva/noticias" ? (
                  <a className="nav-link marcar enlace-nav" href="/junta-directiva/noticias">
                <i className="far fa-newspaper pr-3"></i> Noticias
                </a>
              ) : (
                   <a className="nav-link enlace-nav" href="/junta-directiva/noticias">
                <i className="far fa-newspaper pr-3"></i> Noticias
                </a>
              )}
               
              </li>
              <li className="active my-auto d-block d-md-none">
                 {location.pathname === "/junta-directiva/eventos" ? (
                 <a className="nav-link marcar enlace-nav" href="/junta-directiva/eventos">
                <i className="fas fa-bicycle pr-3"></i> Eventos
                </a>
              ) : (
                 <a className="nav-link enlace-nav" href="/junta-directiva/eventos">
                <i className="fas fa-bicycle pr-3"></i> Eventos
                </a>
              )}
                
              </li>
              <li className="active my-auto d-block d-md-none">
                 {location.pathname === "/junta-directiva/descuentos" ? (
                <a className="nav-link marcar enlace-nav" href="/junta-directiva/descuentos">
                <i class="fas fa-percentage pr-3"></i> Descuentos
                </a>
              ) : (
                 <a className="nav-link enlace-nav" href="/junta-directiva/descuentos">
                <i class="fas fa-percentage pr-3"></i> Descuentos
                </a>
              )}
                
              </li>
              <li className="active my-auto d-block d-md-none">
                 {location.pathname === "/junta-directiva/acta" ? (
                <a className="nav-link marcar enlace-nav" href="/junta-directiva/acta">
                <i className="fas fa-plus pr-3"></i> Añadir Acta
                </a>
              ) : (
                 <a className="nav-link enlace-nav" href="/junta-directiva/acta">
                <i className="fas fa-plus pr-3"></i> Añadir Acta
                </a>
              )}
               
              </li>
              <li className="active my-auto d-block d-md-none">
                <a className="nav-link enlace-nav" href="/junta-directiva/contabilidad">
                <i class="far fa-address-book pr-3"></i> Consultas
                </a>
              </li>
              <li className="active my-auto d-block d-md-none">
                {location.pathname === "/junta-directiva/agenda" ? (
                   <a className="nav-link marcar enlace-nav" href="/junta-directiva/agenda">
                <i className="fas fa-book pr-3"></i> Agenda
                </a>
              ) : (
                   <a className="nav-link enlace-nav" href="/junta-directiva/agenda">
                <i className="fas fa-book pr-3"></i> Agenda
                </a>
              )}
              
              </li>
              <li className="active my-auto d-block d-md-none">
                <a className="nav-link enlace-nav"  href="/junta-directiva/contabilidad">
                <i className="fas fa-file-medical pr-3"></i> Archivos
                </a>
              </li>
              {/*
              <li className="active my-auto">
                <a className="nav-link enlace-nav" href="/">
                  ES
                </a>
              </li>
              */}
              <li
                className="dropdown nav-item active my-auto  d-none d-lg-block"
                id="imagenPerfil"
              >
                <a
                  className="nav-link enlace-nav"
                  href="#"
                  id="navbarDropdown2"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={"/img/fotoPerfil/" + fotoPerfil} alt="" />
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a href="/perfil" title="perfil" className="dropdown-item">
                    <i className="fa fa-user"></i>
                  </a>
                  <Button
                    onClick={() => {
                      localStorage.clear();
                      localStorage.setItem("alerta", "Sesion cerrada");
                      window.location = "/";
                    }}
                    className="dropdown-item"
                  >
                    <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </Navbar>
      </div>
    </header>
  );
}
