import React from "react";

export default class GestionSocio extends React.Component {
  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="gestionSocio"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Información Socio
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Importe</th>
                  <th scope="col">FormaPago</th>
                </tr>
              </thead>
              <tbody>
                {this.props.gestionSocio.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fecha}</td>
                    <td>{item.importe} €</td>
                    <td>{item.forma_pago}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
