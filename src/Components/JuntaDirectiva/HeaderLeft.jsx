import React from "react";

export default function HeaderLeft() {

    return (
        <div className="col-3 col-lg-2 px-0 d-none d-md-block navLeft">

        <div className="list-group">
            <a href="./juntaDirectiva.html" className="list-group-item list-group-item-action active pl-md-4 pl-lg-5">
                <i className="fas fa-home pr-3"></i> Home
            </a>
            <a href="./junta-directiva/contabilidad" className="list-group-item list-group-item-action pl-md-4 pl-lg-5">
                <i className="fas fa-balance-scale-left pr-3"></i> Contabilidad
            </a>
            <a href="./juntaDirectiva-socio.html" className="list-group-item list-group-item-action pl-md-4 pl-lg-5">
                <i className="fas fa-users pr-3"></i> Socios
            </a>
            <a href="./juntaDirectiva-noticias.html" className="list-group-item list-group-item-action pl-md-4 pl-lg-5">
                <i className="far fa-newspaper pr-3"></i> Noticias
            </a>
            <a href="./juntaDirectiva-actividades.html" className="list-group-item list-group-item-action pl-md-4 pl-lg-5">
                <i className="fas fa-bicycle pr-3"></i> Actividades
            </a>
            <a href="#" className="list-group-item list-group-item-action pl-md-4 pl-lg-5">
                <i className="fas fa-plus pr-3"></i> Añadir Acta
            </a>
            <a href="#" className="list-group-item list-group-item-action pl-md-4 pl-lg-5">
            <i class="far fa-address-book pr-3"></i> Consultas
            </a>
            <a href="#" className="list-group-item list-group-item-action pl-md-4 pl-lg-5">
                <i className="fas fa-book pr-3"></i> Agenda
            </a>
            <a href="./juntaDirectiva-archivos.html" className="list-group-item list-group-item-action pl-md-4 pl-lg-5">
                <i className="fas fa-file-medical pr-3"></i> Archivos
            </a>
        </div>
    </div>
    )
}