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
        <Navbar expand="lg" className="py-0">
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
            title="Home"
          >
            <img
              src={"https://api.ccpegoilesvalls.es/img/logo/logo.png"}
              alt="Logo de bycyryde"
            />
            <h3 className="d-md-inline d-none d-md-block pl-4">BYCIRYDE</h3>
          </Navbar.Brand>
          {(() => {
            if (sesion === false) {
              return (
                <Nav.Link
                  className="nav-link enlace-nav d-block d-lg-none"
                  href="/login"
                  title="Iniciar sesión"
                >
                  <i className="fas fa-user h3"></i>
                </Nav.Link>
              );
            } else {
              return (
                <Navbar.Brand
                  className="dropdown nav-item active my-auto float-right d-block d-lg-none"
                  id="imagenPerfil"
                >
                  <button
                    className="nav-link enlace-nav btn px-0"
                    id="navbarDropdown2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={
                        "https://api.ccpegoilesvalls.es/img/fotoPerfil/" +
                        fotoPerfil
                      }
                      alt=""
                    />
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
          <div
            className="collapse navbar-collapse mb-2 mb-lg-0"
            id="navbarMenuHome"
          >
            <ul className="navbar-nav ">
              {location.pathname === "/" ? (
                <li className="nav-item active my-auto">
                  <a className="nav-link marcar enlace-nav" href="/" title="Home">
                    Home
                  </a>
                </li>
              ) : (
                <li className="nav-item active my-auto">
                  <a className="nav-link enlace-nav" href="/" title="Home">
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
                    title="Noticias"
                  >
                    Noticias
                  </button>
                  <div
                    className="dropdown-menu dropdownEstandar border-0"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item " href="/#noticias-home" title="Últimas noticias">
                      Últimas noticias
                    </a>
                    {(() => {
                        if(localStorage.getItem("tipoUsuario") === "3" ||
                        localStorage.getItem("tipoUsuario") === "2") {
                            return (<a className="dropdown-item" href="/noticias">
                            Ver todas
                          </a>)
                        } else {
                            return (<button className="btn btn-outline-light font-weight-bold" data-toggle="modal" data-target="#modalNoticias">Ver todas</button>)
                        }
                    })()}
                    
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
                    className="dropdown-menu dropdownEstandar border-0"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="/#noticias-home">
                      Últimas noticias
                    </a>
                    {(() => {
                        if(localStorage.getItem("tipoUsuario") === "3" ||
                        localStorage.getItem("tipoUsuario") === "2") {
                            return (<a className="dropdown-item" href="/noticias">
                            Ver todas
                          </a>)
                        } else {
                            return (<button className="dropdown-item" data-toggle="modal" data-target="#modalNoticias">Ver todas</button>)
                        }
                    })()}
                  </div>
                </li>
              )}

              {(() => {
                if (
                  sesion === true &&
                  localStorage.getItem("tipoUsuario") !== "4"
                ) {
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
                } else {
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
                        className="dropdown-menu dropdownEstandar border-0"
                        aria-labelledby="navbarDropdown"
                      >
                        <a className="dropdown-item" href="/#irSocios">
                          Ventajas de ser socio
                        </a>
                        <a className="dropdown-item" href="/register">
                          Ser socio
                        </a>
                        <a className="dropdown-item" href="/login">
                          Iniciar sesión
                        </a>
                      </div>
                    </li>
                  );
                }
              })()}
              {(() => {
                if (
                  sesion === true &&
                  localStorage.getItem("tipoUsuario") !== "4"
                ) {
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
                  Contáctanos
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
                if (localStorage.getItem("tipoUsuario") === "4") {
                  return (
                    <li className="active my-auto">
                      <Nav.Link className="enlace-nav" href="/colaborador" title="Panel de control colaborador">
                        <i class="fas fa-cog h4 m-0"></i>
                      </Nav.Link>
                    </li>
                  );
                }

                if (localStorage.getItem("tipoUsuario") === "3") {
                  return (
                    <li className="active my-auto">
                      <Nav.Link
                        className="enlace-nav"
                        href="/junta-directiva"
                        title="Panel de control junta"
                      >
                        <i className="fas fa-cog h4 m-0"></i>
                      </Nav.Link>
                    </li>
                  );
                }
              })()}


              {(() => {
                <li className="active my-auto">
                  <Nav.Link className="enlace-nav" href="/">
                    <i className="fas fa-cog"></i>
                  </Nav.Link>
                </li>;

                if (sesion === true) {
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
                        <img
                          src={
                            "https://api.ccpegoilesvalls.es/img/fotoPerfil/" +
                            fotoPerfil
                          }
                          alt=""
                        />
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
                } else {
                  return (
                    <li className="active d-none d-lg-block my-auto">
                      <a className="nav-link enlace-nav" href="/login">
                        <i className="fas fa-user h4"></i>
                      </a>
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
