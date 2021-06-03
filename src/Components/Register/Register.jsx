import React, { useEffect, useState } from "react";
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
    .required("El número de teléfono es obligatorio")
    .matches(/^\d{9}$/, "El número de teléfono no tiene 9 digitos"),
  correo: yup
    .string()
    .email("Correo electrónico invalido")
    .required("El correo electrónico es obligatorio")
    .matches(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
      "Correo electrónico invalido"
    ),
  dni: yup
    .string()
    .required("El dni es obligatorio")
    .matches(
      /^[0-9]{8,8}[A-Za-z]$/,
      "El dni introducido no tiene el formato correcto"
    ),
  iban: yup
    .string()
    .nullable()
   ,
  direccion: yup
    .string()
    .nullable(),
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
  seccion: yup.string().required("La sección es obligatoria"),
});



export default function Login(props) {
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
  const [errorIban, setErrorIban] = useState("");

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
      iban: data.iban
    }),
  };
  fetch("https://api.ccpegoilesvalls.es/api/add/usuario", requestOptions).then(
    (response) => {
      if (response.ok) {
        document.getElementById("modalCarga").style.display = "none";
        localStorage.setItem(
          "socioCreado",
          "Ahora eres socio de BicyRide, Inicia sesion para ver todas las novedades"
        );
        window.location = "/login";
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
    var boolIban = false;

    usuarios.forEach((element) => {
      if (element.email === data.correo) {
          serErrorEmail("El email ya esta en uso");
          boolUsername = true;
      }
    });

    usuarios.forEach((element) => {
      if (element.username === data.username) {
          serErrorUsername("El nombre de usuario ya existe");
          boolEmail = true;
      }
    });

    if(data.iban.length > 0) {
      var expregCorreo = /^([a-zA-Z]{2}\d{2})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{4})$/;
      if(!expregCorreo.test(data.iban)) {
        setErrorIban("El iban es incorrecto, (ESXX XXXX XXXX XXXX XXXX XXXX)");
        boolIban = true;
      } else {
        setErrorIban("");
        boolIban = false;
      }
    }

    if(boolUsername === false && boolEmail === false && boolIban === false){
      if(document.getElementById("imagen").value.length > 0) {
        if(document.getElementById("imagen").files[0].type === "image/jpg" || document.getElementById("imagen").files[0].type === "image/png"
        || document.getElementById("imagen").files[0].type === "image/jpeg") {
          setImagenError("");
          guardar(data, document.getElementById("imagen").files[0].name);
          evt.target.reset();
        }else {
          setImagenError("Tipo de imagen no correcta, tipos aceptados[image/jpg, image/jpeg, image/png]");
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
          text += '<option value="" label="Selecciona una sección" />';
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
    <div className="container-fuild pb-5" id="register">

    <div class="modal" id="modalCarga" style={{display:"none" , backgroundColor: "rgba(0,0,0, 0.5)"}} >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content py-4 mx-auto w-25 border-0"  style={{backgroundColor: "rgba(0,0,0, 0.5)"}} >
                <div class="d-flex justify-content-center text-white">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      <div className="card mx-auto" style={{ maxWidth: "720px" }}>
        <h1 className="text-center py-3">Ser socio</h1>
        <div className="row no-gutters">
          <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <h2 className="pl-3 textRed">Datos personales</h2>
            <div className="card-body row pb-0">
              <div className="col-6">
                <Form.Group>
                  <Form.Label>
                    Nombre de usuario<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="text"
                    className="form-control mx-auto inputRed"
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
                    className="form-control mx-auto inputRed"
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
                    className="form-control mx-auto inputRed"
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
                    className="form-control mx-auto inputRed"
                    id="telefono"
                    name="telefono"
                    placeholder="Número de teléfono"
                    {...register("telefono")}
                  />
                  <p className="text-danger">{errors.telefono?.message}</p>
                </Form.Group>
                <Form.Label>
                  Cuenta IBAN
                  </Form.Label>
                  <input
                    type="text"
                    className="form-control mx-auto inputRed"
                    id="iban"
                    name="iban"
                    placeholder="Cuenta IBAN"
                    {...register("iban")}
                  />
                  <p className="text-danger">{errorIban}</p>
              </div>
              <div className="col-6">
                <Form.Group>
                  <Form.Label>
                    Nombre<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="text"
                    className="form-control mx-auto inputRed"
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
                    className="form-control mx-auto inputRed"
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
                    className="form-control mx-auto inputRed"
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
                    className="form-control mx-auto inputRed"
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
                      className="form-control-file inputRed"
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
                    Contraseña<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="password"
                    className="form-control mx-auto inputRed"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    {...register("password")}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group>
                  <Form.Label>
                    Repetir Contraseña<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="password"
                    className="form-control mx-auto inputRed"
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
            <Form.Group className="text-center">
              <p className="text-danger mb-1">{errors.politicas?.message}</p>
              <input
                type="checkbox"
                className="mx-auto inputRed"
                id="politicas"
                name="politicas"
                {...register("politicas")}
              />
              <label>
              &nbsp;Aceptar <span>
                  <a href="/politicas-privacidad" target="_blank" className="enlaceEstandar">  Políticas de privacidad <i class="fas fa-external-link-alt"></i> </a>
                </span>
                <span className="obligatorio">*</span>
              </label>
            </Form.Group>
             <Form.Group className="text-center">
              <input
                type="checkbox"
                className="mx-auto inputRed"
                id="envioCorreos"
                name="envioCorreos"
              />
              <label>
              &nbsp;¿Quieres recibir las últimas novedades a tu correo? 
              </label>
            </Form.Group>
            <Form.Group className="text-center">
              <input
                type="submit"
                className="btn btnEstandar3"
                value="Ser socio"
                id="boton_login"
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}
