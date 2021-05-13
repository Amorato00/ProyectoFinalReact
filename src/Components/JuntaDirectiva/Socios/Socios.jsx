import React from "react";
import SocioLista from "./SociosLista";
import CrearSocio from "./CrearSocio";

export default class Socios extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    if(event.target.value === "") {
      this.socioLista.sacarSocio();
      this.setState({
        search: event.target.value,
      });
    } else {
      this.socioLista.sacarSocioSearch(event.target.value);
      this.setState({
        search: event.target.value,
      });
    }
  }

  render() {
    const { search } = this.state;
    return (
      <div
        className="col-12 col-md-9 col-lg-10 pt-5"
        id="contenidoJuntaDirectiva"
      >
        <div className="row">
          <div className="col-12 px-5">
            <div className="text-center pb-5">
              <label>
                <i className="fas fa-search pr-3 text-white h5"></i>{" "}
              </label>
              <input
                className="form-control w-50 d-inline inputGreen"
                type="text"
                id="search"
                name="search"
                placeholder="Buscar"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </div>
            <div className="text-left text-lg-right mb-5">
              <button
                 className="btn btn-outline-light font-weight-bold"
                data-toggle="modal"
                data-target="#crearSocio"
              >
                {" "}
                <i class="fas fa-plus pr-3 p-1 p-md-2"></i> Añadir Socio
              </button>
            </div>
            <h4 className="text-white">
              Selecciona un SOCIO para ver más
            </h4>
            <SocioLista search={search}
            ref={element => {
              this.socioLista = element;
            }}/>
          </div>

        </div>
        <CrearSocio/>
      </div>
    );
  }
}
