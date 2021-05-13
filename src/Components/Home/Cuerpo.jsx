import React from "react";
import {} from "react-bootstrap";

class Cuerpo extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0" id="irQuienesSomos">
        <div className="row m-0">
          <div className="col-12 col-lg-8 p-0">
            <div>
              <img
                src={"./img/StockSnap_U75QCQN721-min.jpg"}
                className="card-img-top"
                alt="..."
              />
              <div id="quines-somos">
                <h1>¿Quiénes somos?</h1>
                <h4 className="pt-4">
                  El club más grande de toda españa de ciclismo, llevamos 15
                  años realizando actividades y informando de las últimas
                  noticias sobre el mundo del ciclismo
                </h4>
              </div>
            </div>
            <div id="irSocios">
              <img
                src={"./img/StockSnap_VKR6HOS0DC-min.jpg"}
                className="card-img-top"
                alt="..."
              />
              <div className="text-white" id="socio">
                <h1 className="pl-4 pt-4">Beneficios de ser socio</h1>
                <ul className="pt-3">
                  <li className="pb-3 pl-5">
                    <div className="iconosSocioCuerpo">
                      <i className="fas fa-percent"></i>
                    </div>
                    Descuentos exclusivos
                  </li>
                  <li className="pb-3 pl-5">
                    <div className="iconosSocioCuerpo">
                      <i className="far fa-newspaper"></i>
                    </div>
                    Recibe las últimas noticias
                  </li>
                  <li className="pb-3 pl-5">
                    <div className="iconosSocioCuerpo">
                      <i className="fas fa-bicycle"></i>
                    </div>
                    Realiza actividades exclusivas
                  </li>
                  <li className="pb-3 pl-5">
                    <div className="iconosSocioCuerpo">
                      <i className="fas fa-toolbox"></i>
                    </div>
                    Recibe todas las novedades sobre las reuniones de la junta
                    directiva
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-4 p-0 d-none d-lg-block">
            <img
              src={
                "./img/cyclist-drinking-from-a-bottle-picjumbo-com-min-min.jpg"
              }
              className="card-img-top"
              id="imagen-lateral-1"
              alt="..."
            />
            <img
              src={
                "./img/val-gardena-roads-dolomites-italy-picjumbo-com-min-min.jpg"
              }
              className="card-img-top"
              id="imagen-lateral-2"
              alt="..."
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Cuerpo;
