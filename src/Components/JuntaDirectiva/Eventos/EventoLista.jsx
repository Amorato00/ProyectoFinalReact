import React from "react";
import { Form } from "react-bootstrap";

export default class EventoLista extends React.Component {
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
      imagenEvento: "",
      horaInicio: "",
      errorHoraInicio: "",
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

  sacarEvento() {
    document.getElementById("modalCarga").style.display = "block";
    fetch("https://api.ccpegoilesvalls.es/api/evento")
      .then((res) => res.json())
      .then(
        (result) => {
          var total = Math.ceil(result.length / 5);
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

  sacarEventoSearch(search) {
    fetch("https://api.ccpegoilesvalls.es/api/evento/search/" + search)
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


  sacarEventoId(id, boton) {
    document.getElementById(boton).className = "list-group-item list-group-item-action botonJuntaActivo";
    fetch("https://api.ccpegoilesvalls.es/api/evento/id/"+id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          var array = result.fechaInicio.split(" ");
          var fecha = array[0].split("/");
          var hora = array[1].split(":");
          
          this.setState({
            itemEdit: result,
            titulo: result.titulo,
            texto: result.texto,
            fechaInicio: fecha[2] + "-" + fecha[1] + "-" + fecha[0],
            horaInicio: hora[0] + ":" + hora[1],
            imagenEvento: result.imagen
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
    const { titulo, texto, fechaInicio, horaInicio, itemEdit, imagenEvento } = this.state;
    
    var arrayFecha = itemEdit.fechaSubida.split("/");
    this.subirImagen();
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: titulo,
          texto: texto,
          fechaInicio: fechaInicio + " " +horaInicio,
          fechaSubida: arrayFecha[2]+"-"+arrayFecha[1]+"-"+arrayFecha[0],
          imagen: imagenEvento,
          archivo: itemEdit.archivo,
          usuario: localStorage.getItem("idUsuario")
        }),
    };
    fetch(
        "https://api.ccpegoilesvalls.es/api/evento/"+itemEdit.id,
        requestOptions
    ).then((response) => { 
      if(response.ok) { 
        document.getElementById("boton"+itemEdit.id).className = "list-group-item list-group-item-action botonJunta";
        //localStorage.setItem("alerta", "Se ha modificado correctamente");
        //window.location = "/junta-directiva/contabilidad";
        this.sacarEvento();
        response.json();
        
      }
     });
    }

  handleChange(event) {
    const { itemEdit } = this.state;
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

    if (name === "imagenEvento") {
      if(document.getElementById("imagenEvento").value.length > 0) {
        if(document.getElementById("imagenEvento").files[0].type === "image/jpg" || document.getElementById("imagenEvento").files[0].type === "image/png"
        || document.getElementById("imagenEvento").files[0].type === "image/jpeg") {
          this.setState({
            errorImagen: "",
            imagenEvento: document.getElementById("imagenEvento").files[0].name
          });
        }else {
          this.setState({
            errorImagen: "Tipo de imagen no correcta, tipos aceptados[image/jpg, image/jpeg, image/png]",
          });
        }
      } else {
        this.setState({
          errorImagen: "",
          imagenEvento: itemEdit.imagen
        });
      }
    }
  }

  componentDidMount() {
    this.sacarEvento();
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

  eliminar(id) {
    fetch('https://api.ccpegoilesvalls.es/api/evento/' + id, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => {
      this.sacarEvento();
    })
  }


  subirImagen() {
    var inputFile = document.getElementById("imagenEvento");
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

  render() {
    const { meses, titulo, texto, fechaInicio, errorTitulo, errorTexto, errorFecha, horaInicio, totalPaginas,
      paginaActual, itemsPaginacion, itemEdit, errorImagen, imagenEvento } = this.state;
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
          onClick={() => this.sacarEventoId(item.id, "boton"+item.id)}
          data-target="#editEvento" class="list-group-item list-group-item-action botonJunta">
            <div class="d-flex flex-column flex-md-row w-100 justify-content-between">
              <h5 class="mb-1">{item.titulo}</h5>
                {(() => {
                  var fechaActual = new Date();
                  var fechaArray = item.fechaSubida.split("/");
                  var fechaArrayInicio = item.fechaInicio.split("/");
                  var fecha = new Date(
                    fechaArray[2] + "/" + fechaArray[1] + "/" + fechaArray[0]
                  );
                  var mesSubida = "";
                  if(fechaArray[1] !== "0") {
                    mesSubida = meses[parseInt(fechaArray[1]) - 1];
                  } else {
                    mesSubida = meses[parseInt(fechaArray[1])];
                  }
                  var mesInicio = "";
                  if(fechaArrayInicio[1] !== "0") {
                    mesInicio = meses[parseInt(fechaArrayInicio[1]) - 1];
                  } else {
                    mesInicio = meses[parseInt(fechaArrayInicio[1])];
                  }
                  if (
                    fechaActual.getMonth() === fecha.getMonth() &&
                    fechaActual.getDate() === fecha.getDate() &&
                    fechaActual.getFullYear() === fecha.getFullYear()
                  ) {
                    return (<small>Subido hoy <br/> Empieza el {fechaArrayInicio[0]} de {mesInicio} del {fechaArrayInicio[2]}</small>)
                  } else {
                 
                    return (
                      <small>Subido el {fechaArray[0]} de  {mesSubida} del {fechaArray[2]}
                      <br/>Empieza el  {fechaArrayInicio[0]} de {mesInicio} del {fechaArrayInicio[2]}</small>
                    );
                  }
                })()}
              
            </div>
            <p class="mb-1">{item.texto.substr(0, 100)}</p>
            <small class="text-muted"> Archivos </small>
          </button>
        ))}
        <div
          className="modal fade bd-example-modal-lg"
          id="editEvento"
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
                      if (errorFecha !== "") {
                        return <p className="text-danger">{errorFecha}</p>;
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
                      if (errorFecha !== "") {
                        return <p className="text-danger">{errorFecha}</p>;
                      }
                    })()}
                  <Form.Label>
                    Hora de Inicio<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="time"
                    className="form-control mx-auto"
                    id="horaInicio"
                    name="horaInicio"
                    onChange={this.handleChange}
                    value={horaInicio}
                  />
                </Form.Group>
                  <Form.Group>
                  {(() => {
                      if (errorImagen !== "") {
                        return <p className="text-danger">{errorImagen}</p>;
                      }
                    })()}
                    <Form.Label>Imagen</Form.Label>
                    <input
                      id="imagenEvento"
                      className="form-control-file"
                      type="file"
                      name="imagenEvento"
                      onChange={this.handleChange}
                    />
                    <div className="pt-2">
                      <img className="editImagen" src={"https://api.ccpegoilesvalls.es/img/" + imagenEvento} alt="Imagen noticia"/>
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
                      
                      if (errorTitulo === "" && errorTexto === "" && errorImagen === "") {
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
