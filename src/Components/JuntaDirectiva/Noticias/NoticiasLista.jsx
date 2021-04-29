import React from "react";
import { Form } from "react-bootstrap";

export default class NoticiasLista extends React.Component {
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
      imagen: "",
      errorTitulo: "",
      errorTexto: "",
      errorImagen: "",
      itemsPaginacion: [],
      size: 0,
      totalPaginas: 0,
      paginaActual: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  sacarNoticias() {
    document.getElementById("modalCarga").style.display = "block";
    fetch("http://api-proyecto-final/api/noticia")
      .then((res) => res.json())
      .then(
        (result) => {
          var total = Math.ceil(result.length / 5);
          console.log(total);
          this.setState({
            isLoaded: true,
            items: result,
            size: result.length,
            totalPaginas: total,
          });
          this.paginacion(1);
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

  paginacion(pagina) {
    var arrayPaginacion = [];

    const { items } = this.state;
    var variacion = pagina * 5;

    if (variacion > items.length) {
      variacion = items.length;
    }

    for (var i = (pagina - 1) * 5; i < variacion; i++) {
      arrayPaginacion.push(items[i]);
    }

    this.setState({
      itemsPaginacion: arrayPaginacion,
      paginaActual: pagina,
    });
  }

  sacarNoticiaSearch(search) {
    fetch("http://api-proyecto-final/api/noticia/search/"+search)
      .then((res) => res.json())
      .then(
        (result) => {
          var total = Math.ceil(result.length / 5);
          console.log(total);
          this.setState({
            isLoaded: true,
            items: result,
            size: result.length,
            totalPaginas: total,
          });
          this.paginacion(1);
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


  sacarNoticiasId(id) {
    fetch("http://api-proyecto-final/api/noticia/id/"+id)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            itemEdit: result,
            titulo: result.titulo,
            texto: result.texto
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
    const { titulo, texto, itemEdit } = this.state;
    
    var arrayFecha = itemEdit.fecha.split("/");

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: titulo,
          texto: texto,
          fecha: arrayFecha[2] + arrayFecha[1] + arrayFecha[0],
          imagen: itemEdit.imagen,
          archivo: itemEdit.archivo,
          usuario: localStorage.getItem("idUsuario")
        }),
    };
    fetch(
        "http://api-proyecto-final/api/noticia/"+itemEdit.id,
        requestOptions
    ).then((response) => { 
      if(response.ok) { 
        console.log("funciomnnnnnaa");
        localStorage.setItem("alerta", "Se ha modificado correctamente");
        //window.location = "/junta-directiva/contabilidad";
        this.sacarNoticias();
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
      //Validar concepto
      if (event.target.value === "") {
        this.setState({
          errorConcepto: "El titulo esta vacio",
        });
      } else {
        this.setState({
          errorConcepto: "",
        });
      }
    }

    if (name === "texto") {
      //Validar concepto
      if (event.target.value === "") {
        this.setState({
          errorConcepto: "El texto esta vacio",
        });
      } else {
        this.setState({
          errorConcepto: "",
        });
      }
    }
  }

  componentDidMount() {
    this.sacarNoticias();
  }

  render() {
    const { meses, titulo, texto, errorTitulo, errorTexto,totalPaginas,
      paginaActual, itemsPaginacion, } = this.state;
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
        {itemsPaginacion.map((item) => (
          <button  data-toggle="modal"
          onClick={() => this.sacarNoticiasId(item.id)}
          data-target="#editNoticia" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{item.titulo}</h5>
              <small>
                {(() => {
                  var fechaActual = new Date();
                  var fechaArray = item.fecha.split("/");
                  var fecha = new Date(
                    fechaArray[2] + "/" + fechaArray[1] + "/" + fechaArray[0]
                  );
                  if (
                    fechaActual.getMonth() === fecha.getMonth() &&
                    fechaActual.getDate() === fecha.getDate() &&
                    fechaActual.getFullYear() === fecha.getFullYear()
                  ) {
                    return "Hoy";
                  } else {
                    return (
                      " " +
                      fechaArray[0] +
                      " " +
                      meses[parseInt(fechaArray[1]) - 1] +
                      " de " +
                      fechaArray[2]
                    );
                  }
                })()}
              </small>
            </div>
            <p class="mb-1">{item.texto.substr(0, 100) + "..."}</p>
            <small class="text-muted"> Archivos </small>
          </button>
        ))}
        <div
          className="modal fade bd-example-modal-lg"
          id="editNoticia"
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
                  Editar noticia
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
        <div className="d-flex justify-content-center mt-5">
              <nav aria-label="Page navigation example">
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {[...Array(totalPaginas)].map((x, i) => {
                      if (i + 1 === paginaActual) {
                        return (
                          <li key={i + 1} class="page-item">
                            <button
                              class="page-link paginador paginadorActivo"
                              disabled
                              onClick={() => this.paginacion(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        );
                      } else {
                        return (
                          <li key={i + 1} class="page-item">
                            <button
                              class="page-link paginador"
                              onClick={() => this.paginacion(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </nav>
              </nav>
            </div>
      </div>
    );
  }
}
