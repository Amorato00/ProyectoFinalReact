import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";

export default function Header() {
  const [sesion, setSesion] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [location] = useState(window.location);
  useEffect(() => {
    console.log("Sesion: " + localStorage.getItem("sesion"));
    console.log("Imagen Perfil: " + localStorage.getItem("imagenPerfil"));
    if (
      localStorage.getItem("sesion") != null &&
      localStorage.getItem("sesion") !== false
    ) {
      setSesion(true);
    }
    if (localStorage.getItem("imagenPerfil") != null) {
      setFotoPerfil(localStorage.getItem("imagenPerfil"));
    }
  }, []);

  return (
    <header className="menu-superior">
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
            href="/"
            id="logo"
          >
            <img src={"./img/logo/logo.png"} alt="Logo de bycyryde" />
            <h3 className="d-md-inline d-none d-md-block pl-4">BYCIRYDE</h3>
          </Navbar.Brand>
          {(() => {
            if (sesion === false) {
              return (
                <Nav.Link
                  className="nav-link enlace-nav d-block d-lg-none"
                  href="/login"
                >
                  <i className="fas fa-user h3"></i>
                </Nav.Link>
              );
            } else {
              return (
                <Navbar.Brand
                  className="dropdown nav-item active my-auto d-block d-lg-none"
                  id="imagenPerfil"
                >
                  <button
                    className="nav-link enlace-nav btn"
                    id="navbarDropdown2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src={"./img/fotoPerfil/" + fotoPerfil} alt="" />
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
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
              );
            }
          })()}
          <div className="collapse navbar-collapse" id="navbarMenuHome">
            <ul className="navbar-nav ">
              {location.pathname === "/" ? (
                <li className="nav-item active my-auto">
                  <a className="nav-link marcar enlace-nav" href="/">
                    Home
                  </a>
                </li>
              ) : (
                <li className="nav-item active my-auto">
                  <a className="nav-link enlace-nav" href="/">
                    Home
                  </a>
                </li>
              )}

              {location.pathname === "/noticias" ? (
                <li className="dropdown nav-item active my-auto">
                  <button
                    typpe="button"
                    className="nav-link dropdown-toggle marcar enlace-nav btn"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Noticias
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="/#noticias-home">
                      Últimas noticias
                    </a>
                    <a className="dropdown-item" href="/noticias">
                      Ver todas
                    </a>
                  </div>
                </li>
              ) : (
                <li className="dropdown nav-item active my-auto">
                  <button
                    typpe="button"
                    className="nav-link dropdown-toggle enlace-nav btn"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Noticias
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="/#noticias-home">
                      Últimas noticias
                    </a>
                    <a className="dropdown-item" href="/noticias">
                      Ver todas
                    </a>
                  </div>
                </li>
              )}

              {(() => {
                if (sesion === false) {
                  return (
                    <li className="dropdown nav-item active my-auto">
                      <button
                        className="nav-link dropdown-toggle enlace-nav btn"
                        id="navbarDropdown2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Socio
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <a className="dropdown-item" href="/#irSocios">
                          Ventajas de ser socio
                        </a>
                        <a className="dropdown-item" href="/register">
                          Ser socio
                        </a>
                        <a className="dropdown-item" href="/login">
                          Acceder
                        </a>
                      </div>
                    </li>
                  );
                } else {
                  if (location.pathname === "/descuentos") {
                    return (
                      <li className="active my-auto">
                        <Nav.Link
                          className="enlace-nav marcar"
                          href="/descuentos"
                        >
                          Descuentos
                        </Nav.Link>
                      </li>
                    );
                  } else {
                    return (
                      <li className="active my-auto">
                        <Nav.Link className="enlace-nav" href="/descuentos">
                          Descuentos
                        </Nav.Link>
                      </li>
                    );
                  }
                }
              })()}
              {(() => {
                if (sesion === true) {
                  if (location.pathname === "/agenda") {
                    return (
                      <li className="active my-auto">
                        <Nav.Link className="enlace-nav marcar" href="/agenda">
                          Agenda
                        </Nav.Link>
                      </li>
                    );
                  } else {
                    return (
                      <li className="active my-auto">
                      <Nav.Link className="enlace-nav" href="/agenda">
                        Agenda
                      </Nav.Link>
                    </li>
                    );
                  }
                  
                }
              })()}
              <li className="active my-auto">
                <Nav.Link className="enlace-nav" href="/#irQuienesSomos">
                  ¿Quiénes somos?
                </Nav.Link>
              </li>
              <li className="active my-auto">
                <Nav.Link className="enlace-nav" href="/">
                  Contactanos
                </Nav.Link>
              </li>
              {/*
              <li className="active my-auto">
                <a className="nav-link enlace-nav" href="/">
                  ES
                </a>
              </li>
              */}
              {(() => {
                if (sesion === false) {
                  return (
                    <li className="active d-none d-lg-block my-auto">
                      <a className="nav-link enlace-nav" href="/login">
                        <i className="fas fa-user h4"></i>
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li
                      className="dropdown nav-item active my-auto d-none d-lg-block"
                      id="imagenPerfil"
                    >
                      <button
                        className="nav-link enlace-nav btn"
                        id="navbarDropdown2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <img src={"./img/fotoPerfil/" + fotoPerfil} alt="" />
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <a
                          href="/perfil"
                          title="perfil"
                          className="dropdown-item"
                        >
                          <i className="fa fa-user"></i>
                        </a>
                        <Button
                          onClick={() => {
                            localStorage.clear();
                            window.location = "/";
                          }}
                          className="dropdown-item"
                        >
                          <i
                            className="fas fa-sign-in-alt"
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </div>
                    </li>
                  );
                }
              })()}
            </ul>
          </div>
        </Navbar>
      </div>
    </header>
  );
}
