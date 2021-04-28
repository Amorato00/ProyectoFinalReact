import React from "react";
import GestionSocio from "./GestionSocio";

export default class SociosLista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      gestionSocio: [],
    };
  }

  sacarSocioSearch(search) {
    fetch("http://api-proyecto-final/api/usuario/search/socio/" + search)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  sacarGestionSocio(id) {
    document.getElementById("modalCarga").style.display = "block";
    fetch("http://api-proyecto-final/api/gestion-socio/" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          document.getElementById("modalCarga").style.display = "none";
          this.setState({
            gestionSocio: result,
          });
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
      .finally(function () {
        document.getElementById("modalCarga").style.display = "none";
      });
  }

  sacarSocio() {
    document.getElementById("modalCarga").style.display = "block";
    fetch("http://api-proyecto-final/api/socio")
      .then((res) => res.json())
      .then(
        (result) => {
          document.getElementById("modalCarga").style.display = "none";
          this.setState({
            items: result,
          });
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
      .finally(function () {
        document.getElementById("modalCarga").style.display = "none";
      });
  }

  componentDidMount() {
    this.sacarSocio();
  }

  render() {
    const { items, gestionSocio } = this.state;
    return (
      <div>
        <div
          class="modal"
          id="modalCarga"
          style={{ display: "none", backgroundColor: "rgba(0,0,0, 0.5)" }}
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div
              class="modal-content py-4 mx-auto w-25 border-0"
              style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}
            >
              <div class="d-flex justify-content-center text-white">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover table-dark mt-3 tableResponsive">
          <thead>
            <tr>
              <th className="border-0">Nombre</th>
              <th className="border-0">Apellidos</th>
              <th className="border-0">DNI</th>
              <th className="border-0">Email</th>
              <th className="border-0">Estado</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                data-toggle="modal"
                onClick={() => this.sacarGestionSocio(item.id)}
                data-target="#gestionSocio"
                id="trGestionSocio"
              >
                <td data-label="Nombre">{item.nombre}</td>
                <td data-label="Apellidos">{item.apellidos}</td>
                <td data-label="DNI">{item.dni}</td>
                <td data-label="Email">{item.email}</td>
                <td data-label="Estado">{item.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <GestionSocio gestionSocio={gestionSocio} />
      </div>
    );
  }
}