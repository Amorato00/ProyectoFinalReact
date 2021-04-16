import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";

export default function Header() {
  const [sesion, setSesion] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState("");

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
            <img src={"./img/logo/logo.png"} alt="Logo de bycyryde" />
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
              <img src={"./img/fotoPerfil/" + fotoPerfil} alt="" />
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
                <a className="nav-link enlace-nav" href="/">
                <i class="fas fa-bell h4 pr-5"></i>
                </a>
              </li>
              <li className="active my-auto">
                <a className="nav-link enlace-nav" href="/">
                  ES
                </a>
              </li>

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
                  <img src={"./img/fotoPerfil/" + fotoPerfil} alt="" />
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
