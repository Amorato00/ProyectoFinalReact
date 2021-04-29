import React, {useState} from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  titulo: yup.string().required("El titulo esta vacio"),
  texto: yup.string().required("El texto esta vacio "),
  fechaInicio: yup.string().required("La fecha es obligatoria "),
  horaInicio: yup.string().required("La hora es obligatoria "),
});

export default function CrearEvento() {
  //Guardar contabilidilidad
  function guardar(data, imagen) {
    var fechaSubida = new Date();
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: data.titulo,
        texto: data.texto,
        fechaSubida: fechaSubida,
        fechaInicio: data.fechaInicio + " " + data.horaInicio,
        imagen: imagen,
        archivo: null,
        user: localStorage.getItem("idUsuario")
      }),
    };
    fetch("http://api-proyecto-final/api/add/evento", requestOptions).then(
      (response) => {
        if (response.ok) {
          localStorage.setItem("alerta", "Evento añadido con exito");
          window.location = "/junta-directiva/eventos";
          response.json();
        }
      }
    );
  }

  const [imagenError, setImagenError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Enviar formulario
  const onSubmit = (data, evt) => {
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
      setImagenError("La imagen es obligatoria");
    }
    
  };
  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="crearNoticia"
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
              Añadir Nuevo Evento
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <Form.Group>
                <p className="text-danger mb-1">{errors.titulo?.message}</p>
                <Form.Label>
                  Título<span className="obligatorio">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="titulo"
                  name="titulo"
                  {...register("titulo")}
                />
              </Form.Group>
              <Form.Group>
                <p className="text-danger mb-1">{errors.texto?.message}</p>
                <Form.Label>
                  {" "}
                  Texto<span className="obligatorio">*</span>{" "}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  className="form-control"
                  name="texto"
                  id="texto"
                  {...register("texto")}
                />
              </Form.Group>
              <Form.Group>
              <p className="text-danger">{errors.fechaInicio?.message}</p>
                  <Form.Label>
                    Fecha Inicio<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="date"
                    className="form-control mx-auto"
                    id="fechaInicio"
                    name="fechaInicio"
                    {...register("fechaInicio")}
                  />
                </Form.Group>
                <Form.Group>
              <p className="text-danger">{errors.horaInicio?.message}</p>
                  <Form.Label>
                    Hora inicio<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="time"
                    className="form-control mx-auto"
                    id="horaInicio"
                    name="horaInicio"
                    {...register("horaInicio")}
                  />
                </Form.Group>
              <Form.Group>
              <p className="text-danger">{imagenError}</p>
                <Form.Label>Imagen<span className="obligatorio">*</span></Form.Label>
                <input
                  id="imagen"
                  className="form-control-file"
                  type="file"
                  name="imagen"
                />
              </Form.Group>
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
                Guardar cambios
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
