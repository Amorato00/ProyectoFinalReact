import React from "react";
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
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Correo electronico invalido"),
  dni: yup
    .string()
    .required("El dni es obligatorio")
    .matches(
      /^[0-9]{8,8}[A-Za-z]$/,
      "El dni introducido no tiene el formato correcto"
    ),
  fecha: yup.string().required("La fecha de nacimiento es obligatoria"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "Mínimo 8 caracteres"),
  repetirPassword: yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("password")],
      "La contraseña no coincide"
    )
  }),
  politicas: yup.boolean().oneOf([true],'Campo requerido'),
});

//Guardar sosio
function guardar(data) {
    var fecha = new Date(data.fecha);
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: data.username,
            nombre:  data.nombre,
            apellidos: data.apellidos,
            fechaNacimiento: fecha,
            email: data.correo,
            dni: data.dni,
            telefono: data.telefono,
            fotoPerfil: null,
            role: 2,
            estado: null,
            password: data.password
        }),
    };
    fetch(
        "http://api-proyecto-final/api/add/usuario",
        requestOptions
    ).then((response) => { 
      if(response.ok) { 
        localStorage.setItem("socioCreado", "Ahora eres socio de BicyRide, Inicia sesion para ver todas las novedades");
        window.location = "/login";
        response.json();
      }
     });
}

export default function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Enviar formulario
  const onSubmit = (data, evt) => {
    guardar(data);
    evt.target.reset();
  };

  return (
    <div className="container-fuild pb-5" id="register">
      <div className="card mx-auto" style={{ maxWidth: "720px" }}>
        <h1 className="text-center py-3">Ser socio</h1>
        <div className="row no-gutters">
          <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <h2 className="pl-3 textRed">Datos personales</h2>
            <div className="card-body row pb-0">
              <div className="col-6">
                <Form.Group>
                  <Form.Label>
                    Username<span className="obligatorio">*</span>
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
                    type="number"
                    className="form-control mx-auto inputRed"
                    id="telefono"
                    name="telefono"
                    placeholder="Numero de telefono"
                    {...register("telefono")}
                  />
                  <p className="text-danger">{errors.telefono?.message}</p>
                </Form.Group>
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
              </div>
            </div>
            <div className="card-body row pt-0">
              <div className="col-12">
                <Form.Group>
                  <Form.Label>Foto Perfil</Form.Label>
                  <div>
                    <input
                      id="icono_perfil"
                      className="form-control-file inputRed"
                      type="file"
                      name="icono_perfil"
                      {...register("icono_perfil")}
                    />
                  </div>
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
                    className="form-control mx-auto inputRed"
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
                    className="form-control mx-auto inputRed"
                    id="repetirPassword"
                    name="repetirPassword"
                    placeholder="Repetir Contraseña"
                    {...register("repetirPassword")}
                  />
                  <p className="text-danger">{errors.repetirPassword?.message}</p>
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
                    Aceptar Políticas de privacidad<span className="obligatorio">*</span>
                  </label>
            </Form.Group>
            <Form.Group className="text-center">
              <input
                type="submit"
                className="btn"
                value="Registrarse"
                id="boton_login"
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}
