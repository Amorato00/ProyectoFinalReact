import React, { PureComponent } from "react";
import Prints from "./generatePDF";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import AddConcepto from "./AddConcepto";
import { Form } from "react-bootstrap";

export default class Contabilidad extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      ultimoConcepto: [],
      selecYear: "",
      id: 0,
      itemEditar: [],
      concepto: "",
      errorConcepto: "",
      search: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  sacarConceptoYearPasado(year) {
    var yearPasado = year - 1;
    console.log(yearPasado);
    fetch("http://api-proyecto-final/api/contabilidad/ultima/" + yearPasado)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            ultimoConcepto: result,
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

  sacarContabilidad(year) {
    document.getElementById("modalCarga").style.display = "block";
    fetch("http://api-proyecto-final/api/contabilidad/" + year)
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
      )
      .finally(function () {
        document.getElementById("modalCarga").style.display = "none";
      });
  }

  sacarContabilidadSearch(search) {
    fetch("http://api-proyecto-final/api/contabilidad/search/" + search)
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

  sacarIdContabilidad(id) {
    fetch("http://api-proyecto-final/api/contabilidad/id/" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            itemEditar: result,
            concepto: result.concepto,
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

  componentDidMount() {
    var fecha = new Date();
    var year = fecha.getFullYear();
    this.setState({
      selecYear: year,
    });
    this.sacarContabilidad(year);
    this.sacarConceptoYearPasado(year);
  }

  print = () => {
    const { items, ultimoConcepto } = this.state;
    const string = renderToString(
      <Prints items={items} ultimoConcepto={ultimoConcepto} />
    );
    const pdf = new jsPDF();
    pdf.fromHTML(string);
    pdf.save("contabilidad");
  };

  guardarEdit() {
    const { concepto, itemEditar, selecYear } = this.state;

    var arrayFecha = itemEditar.fecha.split("/");
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha: arrayFecha[2] + arrayFecha[1] + arrayFecha[0],
          concepto: concepto,
          d_h : itemEditar.d_h,
          importe: itemEditar.importe,
          saldo: itemEditar.saldo,
          usuario: itemEditar.usuario
        }),
    };
    fetch(
        "http://api-proyecto-final/api/contabilidad/"+itemEditar.id,
        requestOptions
    ).then((response) => { 
      if(response.ok) { 
        console.log("funciomnnnnnaa");
        localStorage.setItem("alerta", "Se ha modificado correctamente");
        //window.location = "/junta-directiva/contabilidad";
        this.sacarContabilidad(selecYear);
        response.json();
        
      }
     });
    }

  handleChange(event) {
    const { selecYear } = this.state;
    var name = event.target.name;
    console.log(name);
    this.setState({
      [name]: event.target.value,
    });

    if(name === "search") {
      console.log(event.target.value);
      if (event.target.value === "") {
        this.sacarContabilidad(selecYear);
        this.sacarConceptoYearPasado(selecYear);
      } else {
        this.sacarContabilidadSearch(event.target.value);
        this.setState({
          ultimoConcepto: "",
        });
      }
    }

    if (name === "concepto") {
      //Validar concepto
      if (event.target.value === "") {
        this.setState({
          errorConcepto: "El concepto esta vacio",
        });
      } else {
        this.setState({
          errorConcepto: "",
        });
      }
    }
    if (name === "selecYear") {
      this.sacarContabilidad(event.target.value);
      this.sacarConceptoYearPasado(event.target.value);
    }
  }

  render() {
    const { items, ultimoConcepto, itemEditar, errorConcepto, concepto } = this.state;
    return (
      <div className="col-12 col-md-9 col-lg-10 pt-5" id="contenidoJuntaDirectiva">
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
        <div className="row">
          <div className="col-12 px-5">
            <div className="text-center pb-5">
              <label className="mr-2">
                <i className="fas fa-search text-white h5 pr-3"></i>
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

            <div className="d-flex justify-content-between">
              <div className="w-50">
                <label for="selectyear" className="pr-3 h6 text-white">
                  Selecciona el año:
                </label>
                <select
                  name="selecYear"
                  id="selecYear"
                  className="inputGreen form-control w-50 d-inline"
                  value={this.state.selecYear}
                  onChange={this.handleChange}
                >
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                </select>
              </div>
              <div>
                <button
                  className="btn btnEstandar2 p-1 p-md-2"
                  data-toggle="modal"
                  data-target="#addConcepto"
                >
                  {" "}
                  <i class="fas fa-plus pr-3"></i> Añadir Concepto
                </button>
              </div>
            </div>

            <table className="table table-striped table-dark mt-3 tableResponsive">
              <thead>
                <tr>
                  <th className="border-0">Fecha</th>
                  <th className="border-0">Concepto</th>
                  <th className="border-0">D/H</th>
                  <th className="border-0">Importe</th>
                  <th className="border-0">Saldo</th>
                  <th className="border-0">Editar</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Fecha">{item.fecha}</td>
                    <td data-label="Concepto">{item.concepto}</td>
                    <td data-label="D/H">{item.d_h}</td>
                    <td data-label="Importe">{item.importe} €</td>
                    <td data-label="Saldo">{item.saldo} €</td>
                    <td data-label="Editar">
                      <button
                        className="btn btnEstandar2"
                        data-toggle="modal"
                        data-target="#editConcepto"
                        onClick={() => this.sacarIdContabilidad(item.id)}
                      >
                        {" "}
                        <i class="far fa-edit"></i> Editar
                      </button>
                    </td>
                  </tr>
                ))}
                  {(() => {
                  if (Object.keys(ultimoConcepto).length !== 0) {
                    return (
                      <tr>
                    <td data-label="Fecha">{ultimoConcepto.fecha}</td>
                    <td data-label="Concepto">{ultimoConcepto.concepto}</td>
                    <td data-label="D/H">{ultimoConcepto.d_h}</td>
                    <td data-label="Importe">{ultimoConcepto.importe} €</td>
                    <td data-label="Saldo">{ultimoConcepto.saldo} €</td>
                    <td className="d-none"></td>
                  </tr>
                    );
                  }
                })()}
              </tbody>
              <tfoot>  
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      onClick={this.print}
                      className="btn btnEstandar2 border"
                    >
                      <i className="fas fa-file-pdf"></i> Generar PDF
                    </button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div
          className="modal fade bd-example-modal-lg"
          id="editConcepto"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content text-dark">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Editar Concepto
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
                      if (errorConcepto !== "") {
                        return <p className="text-danger">{errorConcepto}</p>;
                      }
                    })()}
                    <Form.Label>
                      {" "}
                      Concepto<span className="obligatorio">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="form-control"
                      name="concepto"
                      id="concepto"
                      onChange={this.handleChange}
                      value={concepto}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      D/H<span className="obligatorio">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="d_h"
                      className="form-control"
                      value={itemEditar.d_h}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Importe<span className="obligatorio">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      className="form-control"
                      id="importe"
                      name="importe"
                      value={itemEditar.importe}
                      disabled
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
                      if (errorConcepto === "") {
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
        <AddConcepto />
      </div>
    );
  }
}
