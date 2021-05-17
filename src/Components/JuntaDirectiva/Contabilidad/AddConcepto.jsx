import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  concepto: yup.string().required("El concepto esta vacio"),
  d_h: yup.string().required("Debes seleccionar "),
  importe: yup.number().typeError("Debes seleccionar una cantidad"),
});

export default function AddConcepto() {
  function sacarUltimoSaldo(data) {
    fetch("https://api.ccpegoilesvalls.es/api/ultima/contabilidad")
      .then((res) => res.json())
      .then((result) => {
        guardar(data, parseInt(result.saldo));
      });
  }

  //Guardar contabilidilidad
  function guardar(data, ultimoSaldo) {
    var fecha = new Date();
    var saldo = 0;
    var num = 0;
    if (!isNaN(ultimoSaldo)) {
      num = ultimoSaldo;
    }
    if (data.d_h === "D") {
      saldo = num - parseInt(data.importe);
    } else {
      saldo = num + parseInt(data.importe);
    }
    document.getElementById("modalCarga").style.display = "block";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha: fecha,
        concepto: data.concepto,
        d_h: data.d_h,
        importe: data.importe,
        saldo: saldo,
        usuario: localStorage.getItem("idUsuario"),
      }),
    };
    fetch(
      "https://api.ccpegoilesvalls.es/api/add/contabilidad",
      requestOptions
    ).then((response) => {
      if (response.ok) {
        document.getElementById("modalCarga").style.display = "none";
        localStorage.setItem("alerta", "Concepto añadido con exito");
        window.location = "/junta-directiva/contabilidad";
        response.json();
      } else {
        document.getElementById("modalCarga").style.display = "none";
      }
    });
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
    sacarUltimoSaldo(data);
    evt.target.reset();
  };
  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="addConcepto"
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
              Añadir Nuevo Concepto
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
                <p className="text-danger mb-1">{errors.concepto?.message}</p>
                <Form.Label>
                  {" "}
                  Concepto<span className="obligatorio">*</span>{" "}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="form-control"
                  name="concepto"
                  id="concepto"
                  {...register("concepto")}
                />
              </Form.Group>
              <Form.Group>
                <p className="text-danger mb-1">{errors.d_h?.message}</p>
                <Form.Label>
                  D/H<span className="obligatorio">*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="d_h"
                  className="form-control"
                  {...register("d_h")}
                >
                  <option value="">Selecciona</option>
                  <option value="D">D</option>
                  <option value="H">H</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <p className="text-danger mb-1">{errors.importe?.message}</p>
                <Form.Label>
                  Importe<span className="obligatorio">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  id="importe"
                  name="importe"
                  {...register("importe")}
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
                Crear Concepto
              </button>
            </div>
          </Form>
        </div>
      </div>
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
    </div>
  );
}
