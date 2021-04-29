import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  search: yup.string().nullable(),
});

export default function Colaborador() {
  function sacarSocio(data) {
    if (data.search !== "") {
      document.getElementById("modalCarga").style.display = "block";
      fetch("http://api-proyecto-final/api/usuario/colaborador/" + data.search)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          result.forEach((item) => {
            document.getElementById("nombreTitulo").innerHTML = item.nombre;
            document.getElementById("id").innerHTML = "#" + item.id;
            setFotoPerfil(item.fotoPerfil);
            document.getElementById("nombre").value = item.nombre;
            document.getElementById("apellidos").value = item.apellidos;
            document.getElementById("email").value = item.email;
            document.getElementById("DNI").value = item.dni;
            document.getElementById("telefono").value = item.telefono;
            document.getElementById("estado").value = item.estado;

            if (item.estado === "Activo") {
              document.getElementById("estado").className =
                "form-control inputActivo w-50";
            }

            if (item.estado === "Pide Pago") {
              document.getElementById("estado").className =
                "form-control inputPidePago w-50";
            }

            if (item.estado === "Baja") {
              document.getElementById("estado").className =
                "form-control inputBaja w-50";
            }

            document.getElementById("tarjetaSocio").style.visibility =
              "visible";

            console.log(item.estado);
          });
        })
        .finally(function () {
          document.getElementById("modalCarga").style.display = "none";
        });
    } else {
      document.getElementById("modalCarga").style.display = "none";
    }
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
      <section id="colaboladorSingleSocio" className="text-white py-5">
        <div className="container pt-5">
          <div className="d-flex justify-content-center">
              <img
                  src={"./img/fotoPerfil/" + localStorage.getItem("imagenPerfil")}
                  alt="..."
                  id="logoColaborador"
                  className="pt-2"
                />
          </div>
          <div className="text-center pb-5">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-danger mb-1">{errors.search?.message}</p>
              <Form.Label className="pr-3">
                <Button
                  type="submit"
                  className="btnEstandar text-center border-0"
                >
                  <i className="fas fa-search text-white h5 mb-0"></i>
                </Button>
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
          <div className="row py-4" id="tarjetaSocio">
            <div className="col-12 col-lg-5 text-center pt-4">
              <h2 id="nombreTitulo">Nombre</h2>
              <h3 id="id">#id</h3>
              <div className="pt-3">
                <img
                  src={"./img/fotoPerfil/" + fotoPerfil}
                  alt="..."
                  id="fotoPerfil"
                />
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
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
