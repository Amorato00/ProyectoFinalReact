import React, {useEffect} from "react";
import { } from "react-bootstrap";

import Cabecera from "./Cabecera";
import Partners from "./Partners";
import Noticias from "./Noticias";
import Cuerpo from "./Cuerpo";
import RedesSociales from "./RedesSociales";
import Footer from "./Footer";

export default function Home() {

    return (
        <div>
            {/*Cabecera*/}
            <Cabecera/>
            {/*Alerta*/}
            <div className="container my-0 my-md-2">
                <div className="row flex-column flex-md-row m-0 justify-content-lg-between">
                    {/*Partners*/}
                    <Partners/>
                </div>
            </div>
            <div className="container-fluid py-5" id="noticias-home">
                <div className="container px-5">
                    <h1 className="text-center pb-4 text-white"> Noticias </h1>
                    <Noticias/>
                </div>
                <div className="text-center pt-3">
                    {(() => {
                        if(localStorage.getItem("tipoUsuario") === "3" ||
                        localStorage.getItem("tipoUsuario") === "2") {
                            return (<a href="/noticias" className="btn btn-outline-light font-weight-bold">Ver más noticias</a>)
                        } else {
                            return (<button className="btn btn-outline-light font-weight-bold" data-toggle="modal" data-target="#modalNoticias">Ver más noticias</button>)
                        }
                    })()}
                  
                </div>
            </div>
            <Cuerpo/>
            <RedesSociales/>
            <Footer/>
            <div class="modal fade" id="modalNoticias" tabindex="-1" role="dialog" aria-labelledby="modalNoticias" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p className="text-center">Para poder ver más noticias o tener más ventajas, necesitas ser socio.</p>
                        <a href="/register" className="btn btnEstandar3 w-100">Quiero ser socio</a>
                        <a href="/login" className="btn btnEstandar3 d-block mt-3">Iniciar sesión</a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
