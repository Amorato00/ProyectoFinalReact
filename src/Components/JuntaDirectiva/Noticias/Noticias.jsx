import React from "react";
import NoticiasLista from "./NoticiasLista";
import CrearNoticia from "./CrearNoticia";

export default class Noticias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.noticiasLista.sacarNoticias();
      this.setState({
        search: event.target.value,
      });
    } else {
      this.noticiasLista.sacarNoticiaSearch(event.target.value);
      this.setState({
        search: event.target.value,
      });
    }
  }

  componentDidMount() {
    if (localStorage.getItem("alerta") != null) {
      document.getElementById("textoAlerta").innerHTML = localStorage.getItem(
        "alerta"
      );
      document.getElementById("alerta").style.display = "block";
      localStorage.removeItem("alerta");
    }
  }

  render() {
    const { search } = this.state;
    return (
      <div
        className="col-12 col-md-9 col-lg-10  pt-5 pb-5"
        id="contenidoJuntaDirectiva"
      >
        <div
          className="alert alert-info alert-dismissible fade show w-50 mx-auto alertaEstandar"
          role="alert"
          id="alerta"
        >
          <p id="textoAlerta" className="mb-0">
            Ejemplo de alerta.
          </p>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
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
                placeholder="Buscar noticia"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </div>
            <div className="text-left text-lg-right mb-5">
              <button
                 className="btn btn-outline-light font-weight-bold"
                data-toggle="modal"
                data-target="#crearNoticia"
              >
                {" "}
                <i class="fas fa-plus pr-3 p-1 p-md-2"></i> Añadir Noticia
              </button>
            </div>
            <h4 className="text-white">
              Selecciona una de las NOTICIAS para pasar al modo editor
            </h4>
            <NoticiasLista
              search={search}
              ref={(element) => {
                this.noticiasLista = element;
              }}
            />
            <CrearNoticia />
          </div>
        </div>
      </div>
    );
  }
}
