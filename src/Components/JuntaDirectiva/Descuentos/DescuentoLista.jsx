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
      imagenDescuento: "",
      descuento: "",
      horaInicio: "",
      errorFechaFin: "",
      errorFechaInicio: "",
      errorTitulo: "",
      errorTexto: "",
      errorImagen: "",
      errorDescuento: "",
      itemsPaginacion: [],
      size: 0,
      totalPaginas: 0,
      paginaActual: 0,
      colaboradorSelect: "",
      errorColaboradorSelect: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  sacarDescuento() {
    document.getElementById("modalCarga").style.display = "block";
    fetch("https://api.ccpegoilesvalls.es/api/descuento")
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

  sacarDescuentoSearch(search) {
    fetch("https://api.ccpegoilesvalls.es/api/descuento/search/" + search)
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

  sacarDescuentoId(id, boton) {
    document.getElementById(boton).className = "list-group-item list-group-item-action botonJuntaActivo";
    fetch("https://api.ccpegoilesvalls.es/api/descuento/id/" + id)
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
            imagenDescuento: result.imagen,
            descuento: result.numDescuento
          });
          this.sacarColaboradores(result.colaborador);
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

  sacarColaboradores(idColaborador) {
    console.log(idColaborador);
    fetch("https://api.ccpegoilesvalls.es/api/colaborador")
      .then((res) => res.json())
      .then(
        (result) => {
          var text = "";
          text += '<option value="" label="Selecciona una seccion" />';
          result.forEach((item) => {
            console.log(item.id);
            console.log(item.username);
            if(idColaborador === item.id) {
              text += '<option value="'+item.id+'" selected label="'+item.username+'" />';
            } else {
              text += '<option value="'+item.id+'" label="'+item.username+'" />';
            }
              
          });
          console.log(text);
          document.getElementById('colaboradorSelectEdit').innerHTML = text;
        
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

  subirImagen() {
    var inputFile = document.getElementById("imagenDescuento");
    let formData = new FormData();
    formData.append("archivo", inputFile.files[0]);
    fetch("https://api.ccpegoilesvalls.es/upload/img", {
      method: 'POST',
      body: formData,
        })
    .then(respuesta => respuesta.text())
    .then(decodificado => {
        console.log(decodificado);
    });
  }

  guardarEdit() {
    const {
      titulo,
      texto,
      fechaInicio,
      fechaFin,
      descuento,
      itemEdit,
      imagenDescuento,
      colaboradorSelect
    } = this.state;
    this.subirImagen();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: titulo,
        texto: texto,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        imagen: imagenDescuento,
        descuento: descuento,
        usuario: localStorage.getItem("idUsuario"),
        colaborador: colaboradorSelect
      }),
    };
    fetch(
      "https://api.ccpegoilesvalls.es/api/descuento/" + itemEdit.id,
      requestOptions
    ).then((response) => {
      if (response.ok) {
        document.getElementById("boton"+itemEdit.id).className = "list-group-item list-group-item-action botonJunta";
        //localStorage.setItem("alerta", "Se ha modificado correctamente");
        //window.location = "/junta-directiva/contabilidad";
        this.sacarDescuento();
        response.json();
      }
    });
  }

  handleChange(event) {
    const { itemEdit } = this.state;
    var name = event.target.name;
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

    if (name === "imagenDescuento") {
      if(document.getElementById("imagenDescuento").value.length > 0) {
        if(document.getElementById("imagenDescuento").files[0].type === "image/jpg" || document.getElementById("imagenDescuento").files[0].type === "image/png"
        || document.getElementById("imagenDescuento").files[0].type === "image/jpeg") {
          this.setState({
            errorImagen: "",
            imagenDescuento: document.getElementById("imagenDescuento").files[0].name
          });
        }else {
          this.setState({
            errorImagen: "Tipo de imagen no correcta, tipos aceptados[image/jpg, image/jpeg, image/png]",
          });
        }
      } else {
        this.setState({
          errorImagen: "",
          imagenDescuento: itemEdit.imagen
        });
      }
    }

    if(name === "colaboradorSelectEdit") {
      if (event.target.value === "") {
        this.setState({
          errorColaboradorSelect: "Tienes que seleccionar un select",
        });
      } else {
        this.setState({
          errorColaboradorSelect: "",
        });
      }
    }
  }

  componentDidMount() {
    this.sacarDescuento();
  }

  eliminar(id) {
    fetch('https://api.ccpegoilesvalls.es/api/descuento/' + id, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => {
      this.sacarDescuento();
    })
  }

  render() {
    const {
      meses,
      titulo,
      texto,
      fechaInicio,
      fechaFin,
      errorFechaFin,
      errorTitulo,
      errorTexto,
      errorFechaInicio,
      descuento,
      errorDescuento,
      errorImagen,
      totalPaginas,
      paginaActual,
      itemsPaginacion,
      itemEdit,
      imagenDescuento,
      errorColaboradorSelect
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
        {itemsPaginacion.map((item) => (
          <button  data-toggle="modal" id={"boton" + item.id}
          onClick={() => this.sacarDescuentoId(item.id, "boton"+item.id)}
            data-target="#editDescuento"
            class="list-group-item list-group-item-action botonJunta"
          >
            <div class="d-flex flex-column flex-md-row w-100 justify-content-between">
              <h5 class="mb-1">{item.titulo}</h5>
              {(() => {
                var fechaArrayFin = item.fechaFin.split("/");
                var fechaArrayInicio = item.fechaInicio.split("/");

                var mesFin = "";
                if (fechaArrayFin[1] !== "0") {
                  mesFin = meses[parseInt(fechaArrayFin[1]) - 1];
                } else {
                  mesFin = meses[parseInt(fechaArrayFin[1])];
                }
                var mesInicio = "";
                if (fechaArrayInicio[1] !== "0") {
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
                  Editar descuento
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick = {() => {
                    document.getElementById("boton"+itemEdit.id).className = "list-group-item list-group-item-action botonJunta";
                  }}
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
                  {(() => {
                      if (errorColaboradorSelect !== "") {
                        return <p className="text-danger">{errorColaboradorSelect}</p>;
                      }
                    })()}
                  <Form.Label>
                    Colaborador<span className="obligatorio">*</span>
                  </Form.Label>
                  <Form.Control as="select" name="colaboradorSelect" id="colaboradorSelectEdit"  onChange={this.handleChange}>
                    <option value="" label="Selecciona un colaborador" />

                  </Form.Control>
                </Form.Group>
                  <Form.Group>
                  {(() => {
                      if (errorImagen !== "") {
                        return <p className="text-danger">{errorImagen}</p>;
                      }
                    })()}
                    <Form.Label>Imagen</Form.Label>
                    <input
                      id="imagenDescuento"
                      className="form-control-file"
                      type="file"
                      name="imagenDescuento"
                      onChange={this.handleChange}
                    />
                    <div className="pt-2">
                      <img className="editImagen" src={"https://api.ccpegoilesvalls.es/img/" + imagenDescuento} alt="Imagen noticia"/>
                    </div>
                  </Form.Group>
                </div>
                <div className="modal-footer">
                  <div className="w-100">
                   
                    <button 
                    data-dismiss="modal"
                    aria-label="Close"
                    className="btn btnEstandar2 align-self-start" onClick={() => this.eliminar(itemEdit.id)}><i class="fas fa-trash"></i></button>

                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      if (errorTitulo === "" && errorTexto === "" && errorFechaFin === "" && errorFechaInicio === "" && errorDescuento === "" && errorImagen === "" && errorColaboradorSelect === "") {
                        console.log("Enviar");
                        this.guardarEdit();
                      }
                    }}
                    className="btn btnEstandar float-right"
                  >
                    Guardar cambios
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary float-right mr-2"
                    data-dismiss="modal"
                    onClick = {() => {
                      document.getElementById("boton"+itemEdit.id).className = "list-group-item list-group-item-action botonJunta";
                    }}
                  >
                    Cerrar
                  </button>
                    
                  </div>
                  
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
