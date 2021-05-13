import React, {useEffect, useState} from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  emailUsername: yup.string().required("El email o nombre de usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

export default function Login(props) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [errorUsuario, setErrorUsuario] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  //Enviar formulario
  const onSubmit = (data, evt) => {
    setErrorUsuario("");
    setErrorPassword("");
    comprobarLogin(data);
    evt.target.reset();
  };

  function comprobarLogin(data) {
    document.getElementById("modalCarga").style.display = "block";
    fetch("http://api-proyecto-final/api/usuario/search/"+data.emailUsername)
    .then((res) => res.json())
    .then(
      (result) => {
            if(result.length > 0) {
            result.forEach((item) => {
              document.getElementById("modalCarga").style.display = "none";
              const bcrypt = require('bcryptjs');
              const doesPasswordMatch = bcrypt.compareSync(data.password, item.password);
          
              if (doesPasswordMatch) {
                localStorage.setItem("sesion", true);
                localStorage.setItem("idUsuario", item.id);
                localStorage.setItem("imagenPerfil", item.fotoPerfil);

                //socio
                if(item.role === 2) {
                  console.log("Hola");
                  localStorage.setItem("tipoUsuario", "2");
                  window.location = "/";
                }
                //colaborador
                if(item.role === 4) {
                  localStorage.setItem("tipoUsuario", "4");
                  window.location = "/colaborador";
                  
                }
                //junta directiva
                if(item.role === 3) {
                  localStorage.setItem("tipoUsuario", "3");
                  window.location = "/junta-directiva";
                  
                }
              } else {
                setErrorPassword("Contraseña incorrecta");
              }
            });
          }else  {
            setErrorUsuario("El nombre de usuario no existe");
          }
          })
          .finally(function () {
            document.getElementById("modalCarga").style.display = "none";
          });
      }

  useEffect(() => {
    if(localStorage.getItem("socioCreado") != null) {
        console.log(localStorage.getItem("socioCreado"));
        document.getElementById("textoAlerta").innerHTML = localStorage.getItem("socioCreado");
        document.getElementById("alerta").style.display = "block";
        localStorage.removeItem("socioCreado");
    }
  });

  return (
    <div>
      <div id="divAlerta">
      <div className="alert alert-info alert-dismissible fade show w-50 mx-auto alertaEstandar" role="alert" id="alerta">
                <p id="textoAlerta" className="mb-0">Ejemplo de alerta.</p>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
      </div>

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
       
    
    <div className="container-fuild" id="login">
       {/*Alerta*/}
      <div className="card mx-auto" style={{ maxWidth: "720px" }}>
        <div className="row no-gutters">
          <div className="col-md-6">
            <div className="card-body px-5">
              <h1 className="card-title text-center pt-5 pb-5">Login</h1>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                <p className="text-danger mb-1">{alert}</p>
                <p className="text-danger mb-1">{errors.emailUsername?.message}</p>
                <p className="text-danger mb-1">{errorUsuario}</p>
                  <Form.Label> Email o Username</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control mx-auto inputRed"
                    id="emailUsername"
                    name="emailUsername"
                    placeholder="Introduce tu Email o Username.."
                    {...register("emailUsername")}
                  />
                </Form.Group>
                <Form.Group>
                <p className="text-danger mb-1">{errors.password?.message}</p>
                <p className="text-danger mb-1">{errorPassword}</p>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control mx-auto inputRed"
                    id="password"
                    name="password"
                    placeholder="Contraseña.."
                    {...register("password")}
                  />
                </Form.Group>
                <Form.Group className="text-center">
                  <input
                    type="submit"
                    className="btn btnEstandar3"
                    value="Login"
                    id="boton_login"
                  />
                </Form.Group>
              </Form>
              <p className="text-center">
                {" "}
                No eres socio, pulsa{" "}
                <span>
                  <a href="/register" className="enlaceEstandar"> aquí </a>
                </span>{" "}
                para ser uno.{" "}
              </p>
            </div>
          </div>
          <div className="col-md-6 p-0 m-0 d-none d-md-block">
            <img
              src={
                "./img/val-gardena-roads-dolomites-italy-picjumbo-com-min-min.jpg"
              }
              alt="..."
              className="w-100"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
