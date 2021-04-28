import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  titulo: yup.string().required("El titulo esta vacio"),
  texto: yup.string().required("El texto esta vacio "),
});

export default function AddConcepto() {
  //Guardar contabilidilidad
  function guardar(data) {
    var fecha = new Date();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: data.titulo,
        texto: data.texto,
        fecha: fecha,
        imagen: "nofoto-min.jpg",
        archivo: null,
        usuario: localStorage.getItem("idUsuario")
      }),
    };
    fetch("http://api-proyecto-final/api/add/noticia", requestOptions).then(
      (response) => {
        if (response.ok) {
          localStorage.setItem("alerta", "Añadido concepto con exito");
          window.location = "/junta-directiva/noticias";
          response.json();
        }
      }
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Enviar formulario
  const onSubmit = (data, evt) => {
    console.log(data);
    guardar(data);
    evt.target.reset();
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
              Añadir Nueva Noticia
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
                <Form.Label>Imagen</Form.Label>
                <input
                  id="icono_perfil"
                  className="form-control-file"
                  type="file"
                  name="icono_perfil"
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
