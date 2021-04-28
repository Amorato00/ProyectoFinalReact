import React from "react";

export default class Detalles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: [],
      username: "",
      nombre: "",
      apellidos: "",
      DNI: "",
      fecha: "",
      iban: "",
      errorUsername: "",
      errorNombre: "",
      errorApellidos: "",
      errorDNI: "",
      errorFecha: "",
      errorIban: "",
      idEstado: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  
  sacarUsuario() {
    document.getElementById("modalCarga").style.display = "block";
    fetch("http://api-proyecto-final/api/usuario/" + localStorage.getItem("idUsuario"))
      .then((res) => res.json())
      .then(
        (result) => {
          result.forEach((item) => {
            var ibanGuardar = "";
            if(item.iban !== null) {
              ibanGuardar = item.iban;
            }

            this.setState({
              isLoaded: true,
              username: item.username,
              nombre: item.nombre,
              apellidos: item.apellidos,
              DNI: item.dni,
              fecha: item.fechaNacimiento,
              item: result,
              iban: ibanGuardar
            });
          });
        },
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

  sacarIdEstado(estado) {
    fetch("http://api-proyecto-final/api/estado/" + estado)
      .then((res) => res.json())
      .then(
        (result) => {
          
            this.setState({
              idEstado: result.id
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
guardar(tick) {
  const { username, nombre, apellidos, DNI, fecha,  item, iban, idEstado } = this.state;
  
  this.sacarIdEstado(item.estado);

  const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: username,
          nombre:  nombre,
          apellidos: apellidos,
          fechaNacimiento: fecha,
          email: item[0].email,
          dni: DNI,
          telefono: item[0].telefono,
          fotoPerfil: item[0].fotoPerfil,
          role: item[0].role,
          estado: item[0].estado,
          password: item[0].password,
          iban: iban,
          direccion: item[0].direccion,
          seccion: item[0].seccion
      }),
  };
  fetch(
      "http://api-proyecto-final/api/usuario/"+ localStorage.getItem("idUsuario"),
      requestOptions
  ).then((response) => { 
    if(response.ok) { 
      document.getElementById(tick).style.display = "block";
      document.getElementById(tick).className = "d-inline";
      localStorage.setItem("alerta", "Se ha modificado correctamente");
      response.json();
      
    }
   });
  }



  componentDidMount() {
    this.sacarUsuario();
  }

  reiniciarTick() {
    document.getElementById("tickUsername").style.display = "none";
    document.getElementById("tickUsername").className = "";
    document.getElementById("tickNombre").style.display = "none";
    document.getElementById("tickNombre").className = "";
    document.getElementById("tickApellidos").style.display = "none";
    document.getElementById("tickApellidos").className = "";
    document.getElementById("tickIban").style.display = "none";
    document.getElementById("tickIban").className = "";
    document.getElementById("tickDNI").style.display = "none";
    document.getElementById("tickDNI").className = "";
    document.getElementById("tickFecha").style.display = "none";
    document.getElementById("tickFecha").className = "";
  }

  handleChange(event) { 
    this.reiniciarTick(); 
    var name = event.target.name; 
    this.setState({
      [name]: event.target.value
    });
    //Validar username
    if(name === "username") {
      if(event.target.value === "") {
        this.setState({
          errorUsername: "El username esta vacio",
        });
      } else if(event.target.value.length < 3 || event.target.value.length > 25) {
        this.setState({
          errorUsername: "El tamaño del username debe ser de 25 a 3 caracteres",
        });
      } else {
        this.setState({
          errorUsername: "",
        });
      }
    }

    //validar nombre
    if(name === "nombre") {
      if(event.target.value === "") {
        this.setState({
          errorNombre: "El nombre esta vacio",
        });
      } else {
        this.setState({
          errorNombre: "",
        });
      }
    }

    //validar apellidos
    if(name === "apellidos") {
      if(event.target.value === "") {
        this.setState({
          errorApellidos: "El campo apellidos esta vacio",
        });
      } else {
        this.setState({
          errorApellidos: "",
        });
      }
    }

    //validar apellidos
    if(name === "DNI") {
      var expreg = /^[0-9]{8,8}[A-Za-z]$/;
      if(event.target.value === "") {
        this.setState({
          errorDNI: "El DNI esta vacio",
        });
      } else if(!expreg.test(event.target.value)){
        this.setState({
          errorDNI: "El formato del DNI es incorrecto",
        });
      } else {
        this.setState({
          errorDNI: "",
        });
      }
    }

    //validar Cuenta Contable
    if(name === "iban") {
      expreg = /([A-Z]{2})\s*\t*(\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d\d\d)/g;
     if(!expreg.test(event.target.value)){
        this.setState({
          errorIban: "El formato del IBAN es incorrecto",
        });
      } else {
        this.setState({
          errorIban: "",
        });
      }
    }
   
  }



render() { 
  const { username, nombre, apellidos, DNI, fecha, errorUsername, errorNombre,
  errorApellidos, errorDNI, errorFecha, iban, errorIban } = this.state;
 
  return (
    <div class="col-12 col-md-6 mx-auto">
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
      <div className="card border-0 rounded rounded-1">
        <h4 className="card-title bg-secondary py-3 text-white mb-0 pl-3 rounded-top rounded-1">
          <i className="fa fa-user"></i> Detalles
        </h4>
        <div className="p-0">
          <table className="table mb-0">
            <tr>
              <td className="font-weight-bold">Username</td>
              <td>
                {(() => {
                  if(errorUsername !== ""){
                    return (<p className="text-danger">{errorUsername}</p>);
                  }
                })()}
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  maxLength = "25"
                  value={username}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(errorUsername === "") {
                      console.log('Enviar');
                      this.guardar("tickUsername");
                    }
                  }}
                  className="rounded pl-1"
                />
                <div id="tickUsername" style={{display:"none"}}><i className="fas fa-check-circle pl-5 text-success"></i></div>
              </td>
            </tr>
            <tr>
              <td className="font-weight-bold">Nombre</td>
              <td>
              {(() => {
                  if(errorNombre !== ""){
                    return (<p className="text-danger">{errorNombre}</p>);
                  }
                })()}
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(errorNombre === "") {
                      console.log('Enviar');
                      this.guardar("tickNombre");
                    }
                  }}
                  className="rounded pl-1"
                />
                <div id="tickNombre" style={{display:"none"}}><i className="fas fa-check-circle pl-5 text-success"></i></div>
              </td>
            </tr>
            <tr>
              <td className="font-weight-bold">Apellidos</td>
              <td>
              {(() => {
                  if(errorApellidos !== ""){
                    return (<p className="text-danger">{errorApellidos}</p>);
                  }
                })()}
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  placeholder="Apellidos"
                  value={apellidos}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(errorApellidos === "") {
                      console.log('Enviar');
                      this.guardar("tickApellidos");
                    }
                  }}
                  className="rounded pl-1"
                />
                <div id="tickApellidos" style={{display:"none"}}><i className="fas fa-check-circle pl-5 text-success"></i></div>
              </td>
            </tr>
            <tr>
              <td className="font-weight-bold">Cuenta IBAN</td>
              <td>
              {(() => {
                  if(errorIban !== ""){
                    return (<p className="text-danger">{errorIban}</p>);
                  }
                })()}
                <input
                  type="text"
                  id="iban"
                  name="iban"
                  placeholder="Cuenta IBAN"
                  value={iban}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(errorIban === "") {
                      console.log('Enviar');
                      this.guardar("tickIban");
                    }
                  }}
                  className="rounded pl-1"
                />
                <div id="tickIban" style={{display:"none"}}><i className="fas fa-check-circle pl-5 text-success"></i></div>
              </td>
            </tr>
            <tr>
              <td className="font-weight-bold">DNI</td>
              <td>
              {(() => {
                  if(errorDNI !== ""){
                    return (<p className="text-danger">{errorDNI}</p>);
                  }
                })()}
                <input
                  type="text"
                  id="DNI"
                  name="DNI"
                  placeholder="DNI"
                  value={DNI}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(errorDNI === "") {
                      console.log('Enviar');
                      this.guardar("tickDNI");
                    }
                  }}
                  className="rounded pl-1"
                />
                <div id="tickDNI" style={{display:"none"}}><i className="fas fa-check-circle pl-5 text-success"></i></div>
              </td>
            </tr>
            <tr>
              <td className="font-weight-bold">Fecha Nacimiento</td>
              <td>
              {(() => {
                  if(errorFecha !== ""){
                    return (<p className="text-danger">{errorFecha}</p>);
                  }
                })()}
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={fecha}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(errorFecha === "") {
                      console.log('Enviar');
                      this.guardar("tickFecha");
                    }
                  }}
                  className="rounded pl-1"
                />
                <div id="tickFecha" style={{display:"none"}}><i className="fas fa-check-circle pl-5 text-success"></i></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
  }  
}
