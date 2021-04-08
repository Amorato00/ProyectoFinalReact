import React from "react";

export default function Cabecera() {
  return (
    <div>
      {/* 3 bloques de imagenes */}
      <div className="container-fluid p-0 d-none d-md-block" id="contenido">
        <div className="row m-0">
          <div className="col-4 p-0">
            <img src={"./img/StockSnap_SNIKX3KGKD-min.jpg"} alt="Imagen1" className="fila1-img" />
            <div className="text-center fila1-texto">
              <h1>¡Hazte Socio!</h1>
            </div>
          </div>
          <div className="col-4 p-0">
            <img src={"./img/LOGO LITERAL.jpg"} alt="Imagen 4" className="fila1-img" />
            <div className="text-center fila1-texto ">
              <h1>El mejor club de ciclismo</h1>
            </div>
          </div>
          <div className="col-4 p-0">
            <img src={"./img/StockSnap_25EQDF6JMZ-min.jpg"} alt="Imagen 3" className="fila1-img" />
            <div className="text-center fila1-texto">
              <h1>Noticias</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel para movil y tablet  */}
      <div
        id="carruselHome"
        className="carousel slide d-block d-md-none"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li data-target="#carruselHome" data-slide-to="0" className="active"></li>
          <li data-target="#carruselHome" data-slide-to="1"></li>
          <li data-target="#carruselHome" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={"./img/StockSnap_SNIKX3KGKD-min.jpg"}
              alt="Imagen1"
              className="d-block w-100"
              alt="Imagen 1"
            />
            <div className="carousel-caption">
              <h1>¡Hazte socio!</h1>
            </div>
          </div>
          <div className="carousel-item">
            <img src={"./img/nature-3114042_1280-min.jpg"} className="d-block w-100" alt="Imagen 2" />
            <div className="carousel-caption">
              <h1>El mejor club de ciclismo</h1>
            </div>
          </div>
          <div className="carousel-item">
            <img src={"./img/StockSnap_25EQDF6JMZ-min.jpg"} className="d-block w-100" alt="Imagen 3" />
            <div className="carousel-caption">
              <h1>Noticias</h1>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carruselHome"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carruselHome"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}
