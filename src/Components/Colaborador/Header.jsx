import React, { useState, useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";

export default function Header() {
  const [sesion, setSesion] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState("");

  useEffect(() => {
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
            href="/colaborador"
            id="logo"
          >
            <img src={"https://api.ccpegoilesvalls.es/img/logo/logo.png"} alt="Logo de bycyryde" />
            <h3 className="d-md-inline d-none d-md-block pl-4">BYCIRYDE</h3>
          </Navbar.Brand>

          <Navbar.Brand
            className="dropdown nav-item active my-auto d-block d-lg-none mr-0"
            id="imagenPerfil"
          >
            <button
              className="nav-link enlace-nav btn"
              id="navbarDropdown2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={"https://api.ccpegoilesvalls.es/img/fotoPerfil/" + fotoPerfil} alt="" />
            </button>
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

          <div className="collapse navbar-collapse mb-2 mb-lg-0" id="navbarMenuHome">
            <ul className="navbar-nav ">
             <li className="active my-auto">
                <a className="nav-link enlace-nav" href="/" title="Volver a la home">
                  <i class="fas fa-globe-europe h4 m-0"></i>
                </a>
              </li>

              <li
                className="dropdown nav-item active my-auto  d-none d-lg-block"
                id="imagenPerfil"
              >
                <button
                  className="nav-link enlace-nav btn"
                  id="navbarDropdown2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={"https://api.ccpegoilesvalls.es/img/fotoPerfil/" + fotoPerfil} alt="" />
                </button>
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
