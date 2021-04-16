import React, {useEffect, useState}  from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  search: yup.string().required("El campo esta vacio"),
});

export default function Colaborador() {

  function sacarSocio(data) {
    fetch("http://api-proyecto-final/api/usuario/colaborador/" + data.search)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        result.forEach((item) => {
          document.getElementById("nombreTitulo").innerHTML = item.nombre;
          document.getElementById("id").innerHTML = "#"+item.id;
          setFotoPerfil(item.fotoPerfil);
          document.getElementById("username").value = item.username;
          document.getElementById("nombre").value = item.nombre;
          document.getElementById("apellidos").value = item.apellidos;
          document.getElementById("email").value = item.email;
          document.getElementById("DNI").value = item.dni;
          document.getElementById("telefono").value = item.telefono;
          document.getElementById("fecha").value = item.fechaNacimiento;
          document.getElementById("estado").value = item.estado;

          if(item.estado === "Activo") {
            document.getElementById("estado").className = "form-control inputActivo w-50";
          }

          if(item.estado === "Pide Pago") {
            document.getElementById("estado").className = "form-control inputPidePago w-50";
          }

          if(item.estado === "Baja") {
            document.getElementById("estado").className = "form-control inputBaja w-50";
          }

         
          console.log(item.estado);
        });
      });
  }

  const [fotoPerfil, setFotoPerfil] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Enviar formulario
  const onSubmit = (data) => {
    console.log(data);
    sacarSocio(data);
  };

  useEffect(() => {
    if (localStorage.getItem("alerta") != null) {
      console.log(localStorage.getItem("alerta"));
      document.getElementById("textoAlerta").innerHTML = localStorage.getItem(
        "alerta"
      );
      document.getElementById("alerta").style.display = "block";
      localStorage.removeItem("alerta");
    }
  });

  return (
    <div>
      {/*Alerta*/}
      <div
        className="alert alert-info alert-dismissible fade show w-50 mx-auto alertaEstandar"
        role="alert"
        id="alerta"
      >
        <p id="textoAlerta" className="mb-0">
          Ejemplo de alerta.
        </p>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <section id="colaboladorSingleSocio" className="text-white">
        <div className="container pt-5">
          <div className="text-center pb-5">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-danger mb-1">{errors.search?.message}</p>
              <Form.Label className="pr-3">
              <Button type="submit" className="btnEstandar text-center border-0"><i className="fas fa-search text-white h5 mb-0"></i></Button>
              </Form.Label>
              <input
                className="form-control w-50 d-inline inputRed"
                type="text"
                id="search"
                name="search"
                placeholder="Buscar socio"
                {...register("search")}
              />
            </Form>
          </div>
          <div className="row">
            <div className="col-12 col-lg-5 text-center pt-4">
              <h2 id="nombreTitulo">Nombre</h2>
              <h3 id="id">#id</h3>
              <div className="pt-3">
                <img src={"./img/fotoPerfil/"+fotoPerfil} alt="..." id="fotoPerfil"/>
              </div>
            </div>
            <div className="col-12 col-lg-7 d-flex justify-content-end pt-5">
              <table className="w-75">
              <tr>
                  <td>Estado</td>
                  <td>
                    <input
                      type="text"
                      className="form-control inputRed w-50" 
                      id="estado"
                      name="estado"
                      value="estado"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>
                    <input
                      type="text"
                      className="form-control inputRed w-50"
                      id="username"
                      name="username"
                      value="Username"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Nombre</td>
                  <td>
                    <input
                      type="text"
                      className="form-control inputRed w-50"
                      id="nombre"
                      name="nombre"
                      value="Nombre"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Apellidos</td>
                  <td>
                    <input
                      type="text"
                      className="form-control inputRed w-50"
                      id="apellidos"
                      name="apellidos"
                      value="Apellidos"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <input
                      type="text"
                      className="form-control inputRed w-50"
                      id="email"
                      name="email"
                      value="Email"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>DNI</td>
                  <td>
                    <input
                      type="text"
                      className="form-control inputRed w-50"
                      id="DNI"
                      name="DNI"
                      value="DNI"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Teléfono</td>
                  <td>
                    <input
                      type="text"
                      className="form-control inputRed w-50"
                      id="telefono"
                      name="telefono"
                      value="telefono"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Fecha Nacimiento</td>
                  <td>
                    <input
                      type="text"
                      className="form-control inputRed w-50"
                      id="fecha"
                      name="fecha"
                      value="00/00/00"
                      disabled
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
