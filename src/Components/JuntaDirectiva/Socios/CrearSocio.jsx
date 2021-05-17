import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("El nombre de usuario es obligatorio")
    .min(3, "Mínimo 3 caracteres")
    .max(25, "Máximo 25 caracteres"),
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .max(255, "Máximo 255 caracteres"),
  apellidos: yup
    .string()
    .required("Los apellidos son obligatorios")
    .max(255, "Máximo 255 caracteres"),
  telefono: yup
    .string()
    .required("El numero de telefono es obligatorio")
    .matches(/^\d{9}$/, "El número de telefono no tiene 9 digitos"),
  correo: yup
    .string()
    .email("Correo electronico invalido")
    .required("El correo electronico es obligatorio")
    .matches(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
      "Correo electronico invalido"
    ),
  dni: yup
    .string()
    .required("El dni es obligatorio")
    .matches(
      /^[0-9]{8,8}[A-Za-z]$/,
      "El dni introducido no tiene el formato correcto"
    ),
  iban: yup.string().nullable(),
  direccion: yup.string().nullable(),
  fecha: yup
    .string()
    .required("La fecha de nacimiento es obligatoria")
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "Mínimo 8 caracteres"),
  repetirPassword: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "La contraseña no coincide"),
  }),
  fotoPerfil: yup.mixed().nullable(),
  politicas: yup.boolean().oneOf([true], "Campo requerido"),
  seccion: yup.string().required("La seccion es obligatoria"),
});


export default function AddSocio() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [imagenError, setImagenError] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [errorUsername, serErrorUsername] = useState("");
  const [errorEmail, serErrorEmail] = useState("");

  //Guardar sosio
function guardar(data, imagen) {
  document.getElementById("modalCarga").style.display = "block";
  subirImagen();
  const bcrypt = require("bcryptjs");
  const hashedPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: data.username,
      nombre: data.nombre,
      apellidos: data.apellidos,
      fechaNacimiento: data.fecha,
      email: data.correo,
      dni: data.dni,
      telefono: data.telefono,
      foto: imagen,
      role: 2,
      estado: 1,
      password: hashedPassword,
      seccion: parseInt(data.seccion),
      direccion: data.direccion,
      iban: data.iban,
    }),
  };
  fetch("https://api.ccpegoilesvalls.es/api/add/usuario", requestOptions).then(
    (response) => {
      if (response.ok) {
        document.getElementById("modalCarga").style.display = "none";
        window.location = "/junta-directiva/socios";
        response.json();
      } else {
        document.getElementById("modalCarga").style.display = "none";
      }
    }
  );
}

  //Enviar formulario
  const onSubmit = (data, evt) => {
    serErrorUsername("");
    serErrorEmail("");

    var boolUsername = false;
    var boolEmail = false;

    usuarios.forEach((element) => {
      if (element.email === data.correo) {
          serErrorEmail("El email ya esta en uso");
          boolUsername = true;
      }
    });

    usuarios.forEach((element) => {
      if (element.username === data.username) {
          serErrorUsername("El username ya existe");
          boolEmail = true;
      }
    });
  
    if (boolUsername === false && boolEmail === false) {
      if (document.getElementById("imagen").value.length > 0) {
        if (
          document.getElementById("imagen").files[0].type === "image/jpg" ||
          document.getElementById("imagen").files[0].type === "image/png" ||
          document.getElementById("imagen").files[0].type === "image/jpeg"
        ) {
          setImagenError("");
          guardar(data, document.getElementById("imagen").files[0].name);
          evt.target.reset();
        } else {
          setImagenError(
            "Tipo de imagen no correcta, tipos aceptados[image/jpg, image/jpeg, image/png]"
          );
        }
      } else {
        guardar(data, null);
        evt.target.reset();
      }
    }
  };

  function sacarUsuarios() {
    fetch("https://api.ccpegoilesvalls.es/api/usuario")
      .then((res) => res.json())
      .then(
        (result) => {
          setUsuarios(result);  
       }
      );
  }

  useEffect(() => {
    sacarSeccion();
    sacarUsuarios();
  }, []);

  function sacarSeccion() {
    fetch("https://api.ccpegoilesvalls.es/api/seccion")
      .then((res) => res.json())
      .then(
        (result) => {
          var text = "";
          text += '<option value="" label="Selecciona una seccion" />';
          result.forEach((item) => {
              text += '<option value="'+item.id+'" label="'+item.name+'" />';
          });
          document.getElementById('seccion').innerHTML = text;
        }
      );
  }

  function subirImagen() {
    var inputFile = document.getElementById("imagen");
    let formData = new FormData();
    formData.append("archivo", inputFile.files[0]);
    fetch("https://api.ccpegoilesvalls.es/upload/img/perfil", {
      method: 'POST',
      body: formData,
        })
    .then(respuesta => respuesta.text())
    .then(decodificado => {
        console.log(decodificado);
    });
  }

  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="crearSocio"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Añadir Nuevo Socio
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
          <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <h2 className="pl-3 textRed pt-4">Datos personales</h2>
            <div className="card-body row pb-0">
              <div className="col-6">
                <Form.Group>
                  <Form.Label>
                    Username<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="text"
                    className="form-control mx-auto"
                    id="username"
                    name="username"
                    placeholder="Nombre de usuario"
                    {...register("username")}
                  />
                  <p className="text-danger">{errors.username?.message}</p>
                  <p className="text-danger">{errorUsername}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Apellidos<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="text"
                    className="form-control mx-auto"
                    id="apellidos"
                    name="apellidos"
                    placeholder="Apellidos"
                    {...register("apellidos")}
                  />
                  <p className="text-danger">{errors.apellidos?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    DNI<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="text"
                    className="form-control mx-auto"
                    id="dni"
                    name="dni"
                    placeholder="DNI"
                    {...register("dni")}
                  />
                  <p className="text-danger">{errors.dni?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Teléfono<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="text"
                    className="form-control mx-auto"
                    id="telefono"
                    name="telefono"
                    placeholder="Numero de telefono"
                    {...register("telefono")}
                  />
                  <p className="text-danger">{errors.telefono?.message}</p>
                </Form.Group>
                <Form.Label>
                  Cuenta IBAN
                  </Form.Label>
                  <input
                    type="text"
                    className="form-control mx-auto"
                    id="iban"
                    name="iban"
                    placeholder="Cuenta IBAN"
                    {...register("iban")}
                  />
                  <p className="text-danger">{errors.iban?.message}</p>
              </div>
              <div className="col-6">
                <Form.Group>
                  <Form.Label>
                    Nombre<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="text"
                    className="form-control mx-auto"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    {...register("nombre")}
                  />
                  <p className="text-danger">{errors.nombre?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Email<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="email"
                    className="form-control mx-auto"
                    id="correo"
                    name="correo"
                    placeholder="Email"
                    {...register("correo")}
                  />
                  <p className="text-danger">{errors.correo?.message}</p>
                  <p className="text-danger">{errorEmail}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Fecha nacimiento<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="date"
                    className="form-control mx-auto"
                    id="fecha"
                    name="fecha"
                    {...register("fecha")}
                  />
                  <p className="text-danger">{errors.fecha?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Sección<span className="obligatorio">*</span>
                  </Form.Label>
                  <Form.Control as="select" name="seccion" id="seccion" {...register("seccion")}>
                    <option value="" label="Selecciona una seccion" />

                  </Form.Control>
                  <p className="text-danger">{errors.seccion?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Dirección
                  </Form.Label>
                  <input
                    type="text"
                    className="form-control mx-auto"
                    id="direccion"
                    name="direccion"
                    placeholder="Dirección"
                    {...register("direccion")}
                  />
                  <p className="text-danger">{errors.direccion?.message}</p>
                </Form.Group>
              </div>
            </div>
            <div className="card-body row pt-0">
              <div className="col-12">
                <Form.Group>
                <p className="text-danger mb-1">{imagenError}</p>
                  <Form.Label>Foto Perfil</Form.Label>
                  <div>
                    <input
                      id="imagen"
                      className="form-control-file"
                      type="file"
                      name="fotoPerfil"
                      {...register("fotoPerfil")}
                    />
                  </div>
                  <p className="text-danger">{errors.fotoPerfil?.message}</p>
                </Form.Group>
              </div>
            </div>
            <h2 className="pl-3 textRed">Contraseña</h2>
            <div className="card-body row">
              <div className="col-6">
                <Form.Group>
                  <Form.Label>
                    Password<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="password"
                    className="form-control mx-auto"
                    id="password"
                    name="password"
                    placeholder="Repetir Contraseña"
                    {...register("password")}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group>
                  <Form.Label>
                    Repetir Password<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="password"
                    className="form-control mx-auto"
                    id="repetirPassword"
                    name="repetirPassword"
                    placeholder="Repetir Contraseña"
                    {...register("repetirPassword")}
                  />
                  <p className="text-danger">
                    {errors.repetirPassword?.message}
                  </p>
                </Form.Group>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="submit" className="btn btnEstandar">
                Crear Socio
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
