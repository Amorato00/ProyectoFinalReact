import React, {useEffect} from "react";
import HeaderLeft from "./HeaderLeft";
import Cuerpo from "./Cuerpo";

export default function JuntaDirectiva() {
    useEffect(() => {
        if(localStorage.getItem("alerta") != null) {
            console.log(localStorage.getItem("alerta"));
            document.getElementById("textoAlerta").innerHTML = localStorage.getItem("alerta");
            document.getElementById("alerta").style.display = "block";
            localStorage.removeItem("alerta");
        }
    });
    return (
        <div className="container-fluid fondo" id="juntaDirectiva">
                <div className="alert alert-info alert-dismissible fade show w-50 mx-auto alertaEstandar" role="alert" id="alerta">
                <p id="textoAlerta" className="mb-0">Ejemplo de alerta.</p>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
    
             <div className="row">
                <HeaderLeft/>
                <Cuerpo/>
             </div>
             
        </div>
    )
}

