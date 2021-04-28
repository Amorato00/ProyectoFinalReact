import React from "react";
import { Form } from "react-bootstrap";

export default class DescuentoLista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      meses: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      itemEdit: [],
      titulo: "",
      texto: "",
      fechaInicio: "",
      fechaFin: "",
      imagen: "",
      descuento: "",
      horaInicio: "",
      errorFechaFin: "",
      errorFechaInicio: "",
      errorTitulo: "",
      errorTexto: "",
      errorImagen: "",
      errorDescuento: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  sacarDescuento() {
    document.getElementById("modalCarga").style.display = "block";
    fetch("http://api-proyecto-final/api/descuento")
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

  sacarDescuentoSearch(search) {
    fetch("http://api-proyecto-final/api/descuento/search/" + search)
      .then((res) => res.json())
      .then(
        (result) => {
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
      );
  }

  sacarDescuentoId(id) {
    console.log("Holaaaa");
    fetch("http://api-proyecto-final/api/descuento/id/" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          var array = result.fechaInicio.split("/");
          var array2 = result.fechaFin.split("/");

          this.setState({
            itemEdit: result,
            titulo: result.titulo,
            texto: result.texto,
            fechaInicio: array[2] + "-" + array[1] + "-" + array[0],
            fechaFin: array2[2] + "-" + array2[1] + "-" + array2[0],
            descuento: result.numDescuento,
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

  guardarEdit() {
    const {
      titulo,
      texto,
      fechaInicio,
      fechaFin,
      descuento,
      itemEdit,
    } = this.state;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: titulo,
        texto: texto,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        imagen: itemEdit.imagen,
        descuento: descuento,
        usuario: localStorage.getItem("idUsuario"),
      }),
    };
    fetch(
      "http://api-proyecto-final/api/descuento/" + itemEdit.id,
      requestOptions
    ).then((response) => {
      if (response.ok) {
        console.log("funciomnnnnnaa");
        localStorage.setItem("alerta", "Se ha modificado correctamente");
        //window.location = "/junta-directiva/contabilidad";
        this.sacarDescuento();
        response.json();
      }
    });
  }

  handleChange(event) {
    var name = event.target.name;
    console.log(name);
    this.setState({
      [name]: event.target.value,
    });

    if (name === "titulo") {
      if (event.target.value === "") {
        this.setState({
          errorTitulo: "El titulo esta vacio",
        });
      } else {
        this.setState({
          errorTitulo: "",
        });
      }
    }

    if (name === "texto") {
      if (event.target.value === "") {
        this.setState({
          errorTexto: "El texto esta vacio",
        });
      } else {
        this.setState({
          errorTexto: "",
        });
      }
    }
  }

  componentDidMount() {
    this.sacarDescuento();
  }

  render() {
    const {
      items,
      meses,
      titulo,
      texto,
      fechaInicio,
      fechaFin,
      errorFechaFin,
      errorTitulo,
      errorTexto,
      errorFechaInicio,
      horaInicio,
      descuento,
      errorDescuento,
    } = this.state;
    return (
      <div class="list-group mt-5">
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
        {items.map((item) => (
          <button
            data-toggle="modal"
            onClick={() => this.sacarDescuentoId(item.id)}
            data-target="#editDescuento"
            class="list-group-item list-group-item-action"
          >
            <div class="d-flex flex-column flex-md-row w-100 justify-content-between">
              <h5 class="mb-1">{item.titulo}</h5>
              {(() => {
                var fechaArrayFin = item.fechaFin.split("/");
                var fechaArrayInicio = item.fechaInicio.split("/");

                var mesFin = "";
                if (fechaArrayFin[1] != "0") {
                  mesFin = meses[parseInt(fechaArrayFin[1]) - 1];
                } else {
                  mesFin = meses[parseInt(fechaArrayFin[1])];
                }
                var mesInicio = "";
                if (fechaArrayInicio[1] != "0") {
                  mesInicio = meses[parseInt(fechaArrayInicio[1]) - 1];
                } else {
                  mesInicio = meses[parseInt(fechaArrayInicio[1])];
                }

                return (
                  <small>
                    Fecha Inicio: {fechaArrayInicio[0]} de {mesInicio} del{" "}
                    {fechaArrayInicio[2]}
                    <br />
                    Fecha Fin: {fechaArrayFin[0]} de {mesFin} del{" "}
                    {fechaArrayFin[2]}
                  </small>
                );
              })()}
            </div>
            <p class="mb-1">{item.texto.substr(0, 100)}</p>
            <p class="mb-1">Descuento: {item.numDescuento}%</p>
          </button>
        ))}
        <div
          className="modal fade bd-example-modal-lg"
          id="editDescuento"
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
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Editar evento
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
              <Form>
                <div className="modal-body">
                  <Form.Group>
                    {(() => {
                      if (errorTitulo !== "") {
                        return <p className="text-danger">{errorTitulo}</p>;
                      }
                    })()}
                    <Form.Label>
                      Título<span className="obligatorio">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="titulo"
                      name="titulo"
                      onChange={this.handleChange}
                      value={titulo}
                    />
                  </Form.Group>
                  <Form.Group>
                    {(() => {
                      if (errorTexto !== "") {
                        return <p className="text-danger">{errorTexto}</p>;
                      }
                    })()}
                    <Form.Label>
                      {" "}
                      Texto<span className="obligatorio">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      className="form-control"
                      name="texto"
                      id="texto"
                      onChange={this.handleChange}
                      value={texto}
                    />
                  </Form.Group>
                  <Form.Group>
                    {(() => {
                      if (errorDescuento !== "") {
                        return <p className="text-danger">{errorDescuento}</p>;
                      }
                    })()}
                    <Form.Label>
                      {" "}
                      Descuento<span className="obligatorio">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      className="form-control"
                      name="descuento"
                      id="descuento"
                      onChange={this.handleChange}
                      value={descuento}
                    />
                  </Form.Group>
                  <Form.Group>
                    {(() => {
                      if (errorFechaInicio !== "") {
                        return (
                          <p className="text-danger">{errorFechaInicio}</p>
                        );
                      }
                    })()}
                    <Form.Label>
                      Fecha Inicio<span className="obligatorio">*</span>
                    </Form.Label>
                    <input
                      type="date"
                      className="form-control mx-auto"
                      id="fechaInicio"
                      name="fechaInicio"
                      onChange={this.handleChange}
                      value={fechaInicio}
                    />
                  </Form.Group>
                  <Form.Group>
                    {(() => {
                      if (errorFechaFin !== "") {
                        return <p className="text-danger">{errorFechaFin}</p>;
                      }
                    })()}
                    <Form.Label>
                      Fecha Fin<span className="obligatorio">*</span>
                    </Form.Label>
                    <input
                      type="date"
                      className="form-control mx-auto"
                      id="fechaFin"
                      name="fechaFin"
                      onChange={this.handleChange}
                      value={fechaFin}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <input
                      id="icono_perfil"
                      className="form-control-file"
                      type="file"
                      name="icono_perfil"
                    />
                  </Form.Group>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (errorTitulo === "" && errorTexto === "") {
                        console.log("Enviar");
                        this.guardarEdit();
                      }
                    }}
                    className="btn btnEstandar"
                  >
                    Guardar cambios
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
