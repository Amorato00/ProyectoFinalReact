import React from "react";
import {} from "react-bootstrap";

import Detalles from "./Detalles";
import CambiarImagen from "./CambiarImagen";
import Contacto from "./Contacto";
import Password from "./Password";

class Perfil extends React.Component {
 

  render() {
    return (
      <>

      {(() => {
        if (localStorage.getItem("tipoUsuario") === "2") {
          return  <div class="container-fluid p-0 pb-5 fondo" id="contenido">
          <div class="container">
            <div className="text-left pt-4">
              <a href="/" className="btn btnEstandar3"><i class="fas fa-arrow-circle-left"></i> Volver</a>
            </div>
            <div class="row pt-3">
              <Detalles/>
              <CambiarImagen />
            </div>
            <div class="row mt-5">
              <Contacto />
              <Password />
            </div>
          </div>
        </div>
        }

        if ( localStorage.getItem("tipoUsuario") === "4") {
          return  <div class="container-fluid p-0 pb-5 fondo" id="contenido">
          <div class="container">
            <div className="text-left pt-4">
              <a href="/colaborador" className="btn btnEstandar3"><i class="fas fa-arrow-circle-left"></i> Volver</a>
            </div>
            <div class="row pt-3">
              <Detalles/>
              <CambiarImagen />
            </div>
            <div class="row mt-5">
              <Contacto />
              <Password />
            </div>
          </div>
        </div>
        }
    
        if (localStorage.getItem("tipoUsuario") === "3") {
          return  <div class="container-fluid p-0 pb-5 fondo" id="contenido2">
          <div class="container">
            <div className="text-left pt-4">
              <a href="/junta-directiva" className="btn btnEstandar3"><i class="fas fa-arrow-circle-left"></i> Volver</a>
            </div>
            <div class="row pt-3">
              <Detalles/>
              <CambiarImagen />
            </div>
            <div class="row mt-5">
              <Contacto />
              <Password />
            </div>
          </div>
        </div>
        }
      })()}
      </>
     
    );
  }
}

export default Perfil;
