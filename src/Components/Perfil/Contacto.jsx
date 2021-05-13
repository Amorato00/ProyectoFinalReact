import React from "react";


export default class Detalles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: [],
      telefono: "",
      idEstado: null,
      correo: "",
      direccion: "",
      errorCorreo: "",
      errorTelefono: "",
      errorDireccion: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }
  
  sacarUsuario() {
    fetch("http://api-proyecto-final/api/usuario/" + localStorage.getItem("idUsuario"))
      .then((res) => res.json())
      .then(
        (result) => {
          result.forEach((item) => {
            var dir = "";
            if(item.direccion !== null) {
              dir = item.direccion;
            }
            this.setState({
              isLoaded: true,
              telefono: item.telefono,
              correo: item.email,
              item: result,
              direccion: dir
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
guardar(tick) {
  const { correo, telefono, direccion, idEstado } = this.state;
  document.getElementById("tickCorreo").style.display = "none";
  document.getElementById("tickCorreo").className = "";
  document.getElementById("tickTelefono").style.display = "none";
  document.getElementById("tickTelefono").className = "";
  document.getElementById("tickDireccion").style.display = "none";
  document.getElementById("tickDireccion").className = "";

  const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          email: correo,
          telefono: telefono,
          estado: idEstado,
          direccion: direccion
      }),
  };
  fetch(
      "http://api-proyecto-final/api/usuario/"+ localStorage.getItem("idUsuario"),
      requestOptions
  ).then((response) => { 
    if(response.ok) {
      this.sacarUsuario(); 
      console.log(tick);
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

  handleChange(event) {  
    document.getElementById("tickCorreo").style.display = "none";
    document.getElementById("tickCorreo").className = "";
    document.getElementById("tickTelefono").style.display = "none";
    document.getElementById("tickTelefono").className = "";
    document.getElementById("tickDireccion").style.display = "none";
    document.getElementById("tickDireccion").className = "";
    var name = event.target.name; 
    this.setState({
      [name]: event.target.value
    });
    //Validar telefono
    if(name === "telefono") {
      var expregTelefono = /^\d{9}$/;
      if(event.target.value === "") {
        this.setState({
          errorTelefono: "El telefono esta vacio",
        });
      } else if(!expregTelefono.test(event.target.value)){
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
      var expregCorreo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(event.target.value === "") {
        this.setState({
          errorCorreo: "El email esta vacio",
        });
      } else if(!expregCorreo.test(event.target.value)){
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
  const { telefono, errorTelefono, correo, errorCorreo, direccion, errorDireccion} = this.state;
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
                      this.guardar("tickCorreo");
                    }
                  }}
                  class="rounded pl-1"
                />
                <div id="tickCorreo" style={{display:"none"}}><i className="fas fa-check-circle pl-5 text-success"></i></div>
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Fecha</td>
              <td>
              {(() => {
                  if(errorTelefono !== ""){
                    return (<p className="text-danger">{errorTelefono}</p>);
                  }
                })()}
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={telefono}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(errorTelefono === "") {
                      console.log('Enviar');
                      this.guardar("tickTelefono");
                    }
                  }}
                  class="rounded pl-1"
                />
                <div id="tickTelefono" style={{display:"none"}}><i className="fas fa-check-circle pl-5 text-success"></i></div>
              </td>
            </tr>
            <tr>
              <td className="font-weight-bold">Dirección</td>
              <td>
                {(() => {
                  if(errorDireccion !== ""){
                    return (<p className="text-danger">{errorDireccion}</p>);
                  }
                })()}
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="Direccion"
                  value={direccion}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(errorDireccion === "") {
                      console.log('Enviar');
                      this.guardar("tickDireccion");
                    }
                  }}
                  className="rounded pl-1"
                />
                <div id="tickDireccion" style={{display:"none"}}><i className="fas fa-check-circle pl-5 text-success"></i></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
}
