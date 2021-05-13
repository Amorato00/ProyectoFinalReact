import React, { useState } from "react";

export default function HeaderLeft() {
    const [location] = useState(window.location);
  return (
    <div className="col-3 col-lg-2 px-0 d-none d-md-block navLeft">
      <div className="list-group">
        {location.pathname === "/junta-directiva" ? (
          <a
            href="/junta-directiva"
            className="list-group-item list-group-item-action active pl-md-4 pl-lg-5"
          >
            {" "}
            <i className="fas fa-home pr-3"></i> Home
          </a>
        ) : (
          <a
            href="/junta-directiva"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            {" "}
            <i className="fas fa-home pr-3"></i> Home
          </a>
        )}

        {location.pathname === "/junta-directiva/contabilidad" ? (
          <a
            href="/junta-directiva/contabilidad"
            className="list-group-item list-group-item-action active pl-md-4 pl-lg-5"
          >
            <i className="fas fa-balance-scale-left pr-3"></i> Contabilidad
          </a>
        ) : (
          <a
            href="/junta-directiva/contabilidad"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            <i className="fas fa-balance-scale-left pr-3"></i> Contabilidad
          </a>
        )}

        {location.pathname === "/junta-directiva/socios" ? (
          <a
            href="/junta-directiva/socios"
            className="list-group-item list-group-item-action active pl-md-4 pl-lg-5"
          >
            <i className="fas fa-users pr-3"></i> Socios
          </a>
        ) : (
          <a
            href="/junta-directiva/socios"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            <i className="fas fa-users pr-3"></i> Socios
          </a>
        )}

        {location.pathname === "/junta-directiva/noticias" ? (
          <a
            href="/junta-directiva/noticias"
            className="list-group-item list-group-item-action active pl-md-4 pl-lg-5"
          >
            <i className="far fa-newspaper pr-3"></i> Noticias
          </a>
        ) : (
          <a
            href="/junta-directiva/noticias"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            <i className="far fa-newspaper pr-3"></i> Noticias
          </a>
        )}

        {location.pathname === "/junta-directiva/eventos" ? (
          <a
            href="/junta-directiva/eventos"
            className="list-group-item list-group-item-action active pl-md-4 pl-lg-5"
          >
            <i className="fas fa-bicycle pr-3"></i> Eventos
          </a>
        ) : (
          <a
            href="/junta-directiva/eventos"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            <i className="fas fa-bicycle pr-3"></i> Eventos
          </a>
        )}

        {location.pathname === "/junta-directiva/descuentos" ? (
          <a
            href="/junta-directiva/descuentos"
            className="list-group-item list-group-item-action active pl-md-4 pl-lg-5"
          >
            <i class="fas fa-percentage pr-3"></i> Descuentos
          </a>
        ) : (
          <a
            href="/junta-directiva/descuentos"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            <i class="fas fa-percentage pr-3"></i> Descuentos
          </a>
        )}

        {location.pathname === "/junta-directiva/acta" ? (
          <a
            href="/junta-directiva/acta"
            className="list-group-item list-group-item-action active pl-md-4 pl-lg-5"
          >
            <i className="fas fa-plus pr-3"></i> Añadir Acta
          </a>
        ) : (
          <a
            href="/junta-directiva/acta"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            <i className="fas fa-plus pr-3"></i> Añadir Acta
          </a>
        )}

        {/*location.pathname === "/" ? (
          <a
            href="/junta-directiva"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            <i class="far fa-address-book pr-3"></i> Consultas
          </a>
        ) : (
          <a
            href="/junta-directiva"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            <i class="far fa-address-book pr-3"></i> Consultas
          </a>
        )*/}

        {location.pathname === "/junta-directiva/agenda" ? (
          <a
            href="/junta-directiva/agenda"
            className="list-group-item list-group-item-action pl-md-4 active pl-lg-5"
          >
            <i className="fas fa-book pr-3"></i> Agenda
          </a>
        ) : (
          <a
            href="/junta-directiva/agenda"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            <i className="fas fa-book pr-3"></i> Agenda
          </a>
        )}

        {location.pathname === "/junta-directiva/archivos" ? (
          <a
            href="/junta-directiva/archivos"
            className="list-group-item list-group-item-action active pl-md-4 pl-lg-5"
          >
            <i className="fas fa-file-medical pr-3"></i> Archivos
          </a>
        ) : (
          <a
            href="/junta-directiva/archivos"
            className="list-group-item list-group-item-action pl-md-4 pl-lg-5"
          >
            <i className="fas fa-file-medical pr-3"></i> Archivos
          </a>
        )}
      </div>
    </div>
  );
}
