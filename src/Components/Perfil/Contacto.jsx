import React from "react";


export default class Detalles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: [],
      telefono: "",
      correo: "",
      errorCorreo: "",
      errorTelefono: "",
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
              telefono: item.telefono,
              correo: item.email,
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
  const { correo, telefono, item } = this.state;
  var fechaGuardar = new Date(item[0].fechaNacimiento);
  const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: item[0].username,
          nombre:  item[0].nombre,
          apellidos: item[0].apellidos,
          fechaNacimiento: fechaGuardar,
          email: correo,
          dni: item[0].dni,
          telefono: telefono,
          fotoPerfil: item[0].fotoPerfil,
          role: item[0].role,
          estado: item[0].estado,
          password: item[0].contraseña,
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
    //Validar telefono
    if(name === "telefono") {
      var expreg = /^\d{9}$/;
      if(event.target.value === "") {
        this.setState({
          errorTelefono: "El telefono esta vacio",
        });
      } else if(!expreg.test(event.target.value)){
        this.setState({
          errorTelefono: "El número de telefono no tiene 9 digitos",
        });
      } else {
        this.setState({
          errorTelefono: "",
        });
      }
    }
      //Validar correo
      if(name === "correo") {
        var expreg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(event.target.value === "") {
          this.setState({
            errorCorreo: "El email esta vacio",
          });
        } else if(!expreg.test(event.target.value)){
          this.setState({
            errorCorreo: "Correo electronico invalido",
          });
        } else {
          this.setState({
            errorCorreo: "",
          });
        }
      }
  }

render() { 
  const { telefono, errorTelefono, correo, errorCorreo} = this.state;
  return (
    <div class="col-12 col-md-6">
      <div class="card border-0 rounded rounded-1">
        <h4 class="card-title bg-secondary py-3 text-white mb-0 pl-3 rounded-top rounded-1">
          <i class="fas fa-mobile"></i> Información de contacto
        </h4>
        <div class="p-0">
          <table class="table mb-0">
            <tr>
              <td class="font-weight-bold">Email</td>
              <td>
              {(() => {
                  if(errorCorreo !== ""){
                    return (<p className="text-danger">{errorCorreo}</p>);
                  }
                })()}
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={correo}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(errorCorreo === "") {
                      console.log('Enviar');
                      this.guardar();
                    }
                  }}
                  class="rounded pl-1"
                />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Teléfono</td>
              <td>
              {(() => {
                  if(errorTelefono !== ""){
                    return (<p className="text-danger">{errorTelefono}</p>);
                  }
                })()}
                <input
                  type="number"
                  id="telefono"
                  name="telefono"
                  value={telefono}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(errorTelefono === "") {
                      console.log('Enviar');
                      this.guardar();
                    }
                  }}
                  class="rounded pl-1"
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
