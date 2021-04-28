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
      fecha: "",
      archivo: "",
      errorTexto: "",
      errorArchivo: "",
      errorFecha: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  sacarActa() {
    document.getElementById("modalCarga").style.display = "block";
    fetch("http://api-proyecto-final/api/acta")
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

  sacarActaSearch(search) {
    fetch("http://api-proyecto-final/api/acta/search/" + search)
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


  sacarActaId(id) {
    console.log("Holaaaa");
    fetch("http://api-proyecto-final/api/acta/id/"+id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          
          var fechaArray = result.fecha.split("/");
          this.setState({
            itemEdit: result,
            texto: result.texto,
            archivo: result.archivo,
            fecha: fechaArray[2] + "-" + fechaArray[1] + "-" + fechaArray[0]
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
    const {  texto, fecha, archivo, itemEdit } = this.state;
    
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: texto,
          fecha: fecha,
          archivo: itemEdit.archivo,
          usuario: localStorage.getItem("idUsuario")
        }),
    };
    fetch(
        "http://api-proyecto-final/api/acta/"+itemEdit.id,
        requestOptions
    ).then((response) => { 
      if(response.ok) { 
        console.log("funciomnnnnnaa");
        localStorage.setItem("alerta", "Se ha modificado correctamente");
        //window.location = "/junta-directiva/contabilidad";
        this.sacarActa();
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
    this.sacarActa();
  }

  render() {
    const { items, meses, texto, fecha, errorTexto, errorFecha } = this.state;
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
          <button  data-toggle="modal"
          onClick={() => this.sacarActaId(item.id)}
          data-target="#editActa" class="list-group-item list-group-item-action">
           
                {(() => {
                  var fechaActual = new Date();
                  var fechaArray = item.fecha.split("/");
                  var fecha = new Date(
                    fechaArray[2] + "/" + fechaArray[1] + "/" + fechaArray[0]
                  );
                  var mes = "";
                  if(fechaArray[1] != "0") {
                    mes = meses[parseInt(fechaArray[1]) - 1];
                  } else {
                    mes = meses[parseInt(fechaArray[1])];
                  }
              
                  if (
                    fechaActual.getMonth() === fecha.getMonth() &&
                    fechaActual.getDate() === fecha.getDate() &&
                    fechaActual.getFullYear() === fecha.getFullYear()
                  ) {
                    return (<small>Subido hoy</small>)
                  } else {
                 
                    return (
                      <small>Subido el {fechaArray[0]} de  {mes} del {fechaArray[2]}</small>
                    );
                  }
                })()}

            <p class="mb-1">{item.texto.substr(0, 100)}</p>
            <small class="text-muted"> Archivos </small>
          </button>
        ))}
        <div
          className="modal fade bd-example-modal-lg"
          id="editActa"
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
                  Editar acta
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
                    Fecha <span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="date"
                    className="form-control mx-auto"
                    id="fecha"
                    name="fecha"
                    onChange={this.handleChange}
                    value={fecha}
                  />
                </Form.Group>
                  <Form.Group>
                    <Form.Label>Archivo</Form.Label>
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
                      if (errorFecha === "" && errorTexto === "") {
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