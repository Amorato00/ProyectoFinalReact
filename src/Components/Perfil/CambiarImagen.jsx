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
    document.getElementById("modalCarga").style.display = "block";
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
      )
      .finally(function () {
        document.getElementById("modalCarga").style.display = "none";
      });
  }

  //Guardar sosio
guardar(fotoPerfil) {
  const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          fotoPerfil: fotoPerfil,
      }),
  };
  fetch(
      "http://api-proyecto-final/api/usuario/"+ localStorage.getItem("idUsuario"),
      requestOptions
  ).then((response) => { 
    if(response.ok) { 

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
    <div class="col-12 col-md-6 pt-5 pt-md-0">
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
          className="border-0"
        />
      </div>
    </div>
  );
}
}
