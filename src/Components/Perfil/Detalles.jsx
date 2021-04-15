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
      sexo: "",
      fecha: "",
      errorUsername: "",
      errorNombre: "",
      errorApellidos: "",
      errorDNI: "",
      errorFecha: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  
  sacarUsuario() {
    fetch("http://api-proyecto-final/api/usuario/" + localStorage.getItem("idUsuario"))
      .then((res) => res.json())
      .then(
        (result) => {
          result.forEach((item) => {
            this.setState({
              isLoaded: true,
              username: item.username,
              nombre: item.nombre,
              apellidos: item.apellidos,
              DNI: item.dni,
              sexo: "",
              fecha: item.fechaNacimiento,
              item: result
            });
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
  const { username, nombre, apellidos, DNI, fecha,  item } = this.state;
  var fechaGuardar = new Date(fecha);
  const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: username,
          nombre:  nombre,
          apellidos: apellidos,
          fechaNacimiento: fechaGuardar,
          email: item[0].email,
          dni: DNI,
          telefono: item[0].telefono,
          fotoPerfil: item[0].fotoPerfil,
          role: item[0].role,
          estado: item[0].estado,
          password: item[0].password,
      }),
  };
  fetch(
      "http://api-proyecto-final/api/usuario/"+ localStorage.getItem("idUsuario"),
      requestOptions
  ).then((response) => { 
    if(response.ok) { 
      console.log("funciomnnnnnaa");
      localStorage.setItem("alerta", "Se ha modificado correctamente");
      response.json();
      
    }
   });
  }



  componentDidMount() {
    this.sacarUsuario();
  }

  handleChange(event) {  
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
   
  }



render() { 
  const { username, nombre, apellidos, DNI, fecha, errorUsername, errorNombre,
  errorApellidos, errorDNI, errorFecha } = this.state;
 
  return (
    <div class="col-12 col-md-6 mx-auto">
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
                      this.guardar();
                    }
                  }}
                  className="rounded pl-1"
                />
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
                      this.guardar();
                    }
                  }}
                  className="rounded pl-1"
                />
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
                      this.guardar();
                    }
                  }}
                  className="rounded pl-1"
                />
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
                      this.guardar();
                    }
                  }}
                  className="rounded pl-1"
                />
              </td>
            </tr>
            <tr>
              <td className="font-weight-bold">Sexo</td>
              <td>
                <input
                  type="radio"
                  id="mujer"
                  name="mujer"
                  value="mujer"
                  checked
                />{" "}
                Mujer
                <input
                  type="radio"
                  id="hombre"
                  name="hombre"
                  value="hombre"
                  class="ml-5"
                />{" "}
                Hombre
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
                      this.guardar();
                    }
                  }}
                  className="rounded pl-1"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
  }  
}
