import React from "react";
import { Form } from "react-bootstrap";

export default class Password extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newPassword: "",
      repeatPassword: "",
      errorPassword: "",
      errorNewPassword: "",
      errorRepeatPassword: "",
      error: null,
      isLoaded: false,
      items: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  sacarUsuario() {
    fetch("https://api.ccpegoilesvalls.es/api/usuario/"+localStorage.getItem("idUsuario"))
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          }); 
       },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  //Guardar sosio
guardar() {
  const { newPassword,  items} = this.state;
  const bcrypt = require("bcryptjs");
  const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync());
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: hashedPassword,
    }),
  };
  fetch(
    "https://api.ccpegoilesvalls.es/api/usuario/"+ localStorage.getItem("idUsuario"),
    requestOptions
  ).then((response) => { 
    if(response.ok) {
      localStorage.setItem(
        "socioCreado",
        "Contraseña modificada con exito, vuelve a iniciar sesión"
      );
      window.location = "/login";
      response.json();
    }
  });
}

  componentDidMount() {
    this.sacarUsuario();
  }

  handleChange(event) {
    const {items} = this.state;
    var name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });

  }


  render() {
    const { password, newPassword, repeatPassword, errorNewPassword, errorRepeatPassword, errorPassword, items} = this.state;
    return (
      <div className="col-12 col-md-6 pt-5 pt-md-0">
        <div className="card border-0 rounded rounded-1">
          <h4 className="card-title bg-secondary py-3 text-white mb-0 pl-3 rounded-top rounded-1">
            <i className="fas fa-shield-alt"></i> Cambiar contraseña
          </h4>
          <div className="p-0 mx-auto">
            <button
              type="button"
              className="btn btnEstandar3 my-4"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Cambiar contraseña
            </button>

            <div
              className="modal fade bd-example-modal-lg mx-auto"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      Cambiar contraseña
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
                          if (errorPassword !== "") {
                            return <p className="text-danger">{errorPassword}</p>;
                          }
                        })()}
                        <Form.Label>
                          Contraseña Actual<span className="obligatorio">*</span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Contraseña Actual"
                          onChange={this.handleChange}
                          value={password}
                        />
                      </Form.Group>
                      <Form.Group>
                        {(() => {
                          if (errorNewPassword !== "") {
                            return <p className="text-danger">{errorNewPassword}</p>;
                          }
                        })()}
                        <Form.Label>
                          {" "}
                          Nueva Contraseña<span className="obligatorio">*</span>{" "}
                        </Form.Label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          id="newPassword"
                          name="newPassword"
                          placeholder="Nueva contraseña"
                          onChange={this.handleChange}
                          value={newPassword}
                        />
                      </Form.Group>
                      <Form.Group>
                        {(() => {
                          if (errorNewPassword !== "") {
                            return <p className="text-danger">{errorRepeatPassword}</p>;
                          }
                        })()}
                        <Form.Label>
                          {" "}
                          Repetir Nueva Contraseña<span className="obligatorio">*</span>{" "}
                        </Form.Label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          id="repeatPassword"
                          name="repeatPassword"
                          placeholder="Repetir Nueva contraseña"
                          onChange={this.handleChange}
                          value={repeatPassword}
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
                      
                            console.log("Enviar");
                            console.log(password);
                            console.log(newPassword);
                            console.log(repeatPassword);

                            const bcrypt = require('bcryptjs');
                            const doesPasswordMatch = bcrypt.compareSync(password, items[0].password);

                            if(password === "") {
                              this.setState({
                                errorPassword: "campo vacio",
                              });
                            } else {
                              this.setState({
                                errorPassword: "",
                              });
                            }

                            if(newPassword === "") {
                              this.setState({
                                errorNewPassword: "campo vacio",
                              });
                            } else {
                              this.setState({
                                errorNewPassword: "",
                              });
                            }

                            if(repeatPassword === "") {
                              this.setState({
                                errorRepeatPassword: "campo vacio",
                              });
                            } else {
                              this.setState({
                                errorRepeatPassword: "",
                              });
                            }

                            if(password !== "" && newPassword !== "" && repeatPassword !== "") {
                              if(doesPasswordMatch) {
                                if(newPassword.length >= 8) {
                                  if(repeatPassword === newPassword) {
                                    this.guardar();
                                  } else {
                                    this.setState({
                                      errorNewPassword: "Las contraseñas no coinciden",
                                    });
                                  }
                                } else {
                                  this.setState({
                                    errorNewPassword: "Mínimo 8 caracteres",
                                  });
                                }
                                
                              } else {
                                this.setState({
                                  errorPassword: "contraseña incorrecta",
                                });
                              }
                            }
                          }
                        }
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
        </div>
      </div>
    );
  }
}
