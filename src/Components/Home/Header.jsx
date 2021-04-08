import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function Header() {
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
            className="navbar-brand d-flex align-items-center"
            href="/"
            id="logo"
          >
            <img src={"./img/logo/logo.png"} alt="Logo de bycyryde" />
            <h3 className="d-md-inline d-none d-md-block pl-4">BYCIRYDE</h3>
          </Navbar.Brand>
          <Nav.Link className="nav-link enlace-nav d-block d-lg-none" href="/">
            <i className="fas fa-user h3"></i>
          </Nav.Link>
          <div className="collapse navbar-collapse" id="navbarMenuHome">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link marcar enlace-nav" href="/">
                  Home
                </a>
              </li>
              <li className="dropdown nav-item active">
                <a
                  typpe="button"
                  className="nav-link dropdown-toggle enlace-nav"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Noticias
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Últimas noticias
                  </a>
                  <a className="dropdown-item" href="#">
                    Ver todas
                  </a>
                </div>
              </li>
              <li className="active">
                <Nav.Link className="enlace-nav" href="/">
                  ¿Quiénes somos?
                </Nav.Link>
              </li>
              <li className="active">
                <Nav.Link className="enlace-nav" href="/">
                  Contactanos
                </Nav.Link>
              </li>
              <li className="dropdown nav-item active">
                <a
                  className="nav-link dropdown-toggle enlace-nav"
                  href="#"
                  id="navbarDropdown2"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Socio
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Ventajas de ser socio
                  </a>
                  <a className="dropdown-item" href="#">
                    Ser socio
                  </a>
                  <a className="dropdown-item" href="#">
                    Acceder
                  </a>
                </div>
              </li>
              <li className="active">
                <a className="nav-link enlace-nav" href="/">
                  ES
                </a>
              </li>
              <li className="active d-none d-lg-block">
                <a className="nav-link enlace-nav" href="/login">
                  <i className="fas fa-user h4"></i>
                </a>
              </li>
            </ul>
          </div>
        </Navbar>
      </div>
    </header>
  );
}
