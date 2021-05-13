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
            <div className="container my-5">
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
                  <a href="/noticias" className="btn btn-outline-light font-weight-bold">Ver más noticias</a>
                </div>
            </div>
            <Cuerpo/>
            <RedesSociales/>
            <Footer/>
        </div>
        
    );
}
