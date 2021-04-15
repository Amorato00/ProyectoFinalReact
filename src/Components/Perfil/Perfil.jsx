import React from "react";
import {} from "react-bootstrap";

import Detalles from "./Detalles";
import CambiarImagen from "./CambiarImagen";
import Contacto from "./Contacto";
import Password from "./Password";

class Perfil extends React.Component {
 

  render() {
    return (
      <div class="container-fluid p-0 pb-5 fondo" id="contenido">
        <div class="container">
          <div class="row pt-5">
            <Detalles/>
            <CambiarImagen />
          </div>
          <div class="row mt-5">
            <Contacto />
            <Password />
          </div>
        </div>
      </div>
    );
  }
}

export default Perfil;
