import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  texto: yup.string().required("El texto esta vacio "),
  fecha: yup.date().required("La fecha es obligatoria ").nullable().transform ( ( curr ,  orig )  =>  orig  ===  '' ? null : curr ),
});

export default function CrearEvento() {
  //Guardar contabilidilidad
  function guardar(data) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        texto: data.texto,
        fecha: data.fecha,
        archivo: null,
        usuario: localStorage.getItem("idUsuario")
      }),
    };
    fetch("https://api.ccpegoilesvalls.es/api/add/acta", requestOptions).then(
      (response) => {
        if (response.ok) {
          localStorage.setItem("alerta", "Añadido concepto con exito");
          //window.location = "/junta-directiva/noticias";
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
      id="crearActa"
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
              Añadir Nueva Acta
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
              <p className="text-danger">{errors.fecha?.message}</p>
                  <Form.Label>
                    Fecha Inicio<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="date"
                    className="form-control mx-auto"
                    id="fecha"
                    name="fecha"
                    {...register("fecha")}
                  />
                </Form.Group>
              <Form.Group>
                <Form.Label>Archivo</Form.Label>
                <input
                  id="archivo"
                  className="form-control-file"
                  type="file"
                  name="archivo"
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
