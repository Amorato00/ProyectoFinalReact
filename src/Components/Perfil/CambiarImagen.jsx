import React from "react";
import {} from "react-bootstrap";

export default class CambiarImagen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: [],
      fotoPerfil: "",
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
              fotoPerfil: item.fotoPerfil,
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
guardar(fotoPerfil) {
  const { item } = this.state;
  var fechaGuardar = new Date(item[0].fechaNacimiento);
  const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: item[0].username,
          nombre:  item[0].nombre,
          apellidos: item[0].apellidos,
          fechaNacimiento: fechaGuardar,
          email: item[0].email,
          dni: item[0].dni,
          telefono: item[0].telefono,
          fotoPerfil: fotoPerfil,
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
      localStorage.setItem("imagenPerfil", fotoPerfil);
      localStorage.setItem("alerta", "Se ha modificado correctamente");
      response.json();
      window.location = "/perfil";
      
    }
   });
  }

  componentDidMount() {
    this.sacarUsuario();
  }

  handleChange(event) {  
    this.setState({
      fotoPerfil: event.target.files[0].name
    });
     this.guardar(event.target.files[0].name); 
  }

  render(){  
    const { fotoPerfil } = this.state;
  return (
    <div class="col-12 col-md-6 my-auto pt-5 pt-md-0">
      <div className="card border-0 rounded rounded-1 mb-5">
        <h4 className="card-title bg-secondary py-3 text-white mb-0 pl-3 rounded-top rounded-1">
          <i className="far fa-image"></i> Cambiar foto de perfil
        </h4>
        <div className="p-0">
          <table className="table mb-0">
            <tr>
              <td className="font-weight-bold">Foto Perfil</td>
              <td>
                {" "}
                <input
                  id="icono_perfil"
                  type="file"
                  class="form-control-file"
                  name="icono_perfil"
                  className="rounded"
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="text-center">
        <img
          src={"./img/fotoPerfil/" + fotoPerfil}
          alt="foto perfil"
          id="fotoPerfil"
        />
      </div>
    </div>
  );
}
}
