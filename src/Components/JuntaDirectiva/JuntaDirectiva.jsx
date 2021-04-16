import React from "react";
import HeaderLeft from "./HeaderLeft";
import Cuerpo from "./Cuerpo";

export default function JuntaDirectiva() {

    return (
        <div className="container-fluid" id="juntaDirectiva">
             <div className="row">
                <HeaderLeft/>
                <Cuerpo/>
             </div>
             
        </div>
    )
}

