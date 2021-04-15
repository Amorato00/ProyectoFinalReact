import React, {useEffect} from "react";
import { } from "react-bootstrap";

import Cabecera from "./Cabecera";
import Actividad from "./Actividad";
import Partners from "./Partners";
import Noticias from "./Noticias";
import Cuerpo from "./Cuerpo";
import RedesSociales from "./RedesSociales";
import Footer from "./Footer";

export default function Home() {

    useEffect(() => {
        console.log(localStorage.getItem("sesion"));
        if(localStorage.getItem("alerta") != null) {
            console.log(localStorage.getItem("alerta"));
            document.getElementById("textoAlerta").innerHTML = localStorage.getItem("alerta");
            document.getElementById("alerta").style.display = "block";
            localStorage.removeItem("alerta");
        }
    });

    return (
        <div>
            {/*Cabecera*/}
            <Cabecera/>
            {/*Alerta*/}
            <div className="alert alert-info alert-dismissible fade show w-50 mx-auto alertaEstandar" role="alert" id="alerta">
                <p id="textoAlerta" className="mb-0">Ejemplo de alerta.</p>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="container my-5">
                <div className="row flex-column flex-md-row m-0 justify-content-lg-between">
                    {/*Actividad*/}
                    <Actividad/>
                    {/*Partners*/}
                    <Partners/>
                </div>
            </div>
            <div className="container-fluid py-5" id="noticias-home">
                <div className="container">
                    <h1 className="text-center pb-4 text-white"> Noticias </h1>
                    <Noticias/>
                </div>
                <div className="text-center pt-3">
                  <a href="/noticias" className="btn btn-outline-light font-weight-bold">Ver más noticias</a>
                </div>
            </div>
            <Cuerpo/>
            <RedesSociales/>
            <Footer/>
        </div>
        
    );
}
