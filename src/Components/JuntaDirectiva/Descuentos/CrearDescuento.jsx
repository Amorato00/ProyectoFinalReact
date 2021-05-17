import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  titulo: yup.string().required("El titulo esta vacio"),
  texto: yup.string().required("El texto esta vacio "),
  fechaInicio: yup.string().required("La fecha de inicio es obligatoria ").nullable().transform ( ( curr ,  orig )  =>  orig  ===  '' ? null : curr ),
  fechaFin: yup.string().required("La fecha de fin es obligatoria ").nullable().transform ( ( curr ,  orig )  =>  orig  ===  '' ? null : curr ),
  numDescuento: yup.number().typeError("El descuento es oblibatorio").min(1, "El minimo no puede ser 0").max(100, "El maximo no puede ser mayor de 100"),
  colaboradorSelect: yup.string().required("Debes seleccionar un colaboradro")
});

export default function CrearDescuento() {

  const [imagenError, setImagenError] = useState("");
  subirImagen();
  //Guardar contabilidilidad
  function guardar(data, imagen) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: data.titulo,
        texto: data.texto,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        numDescuento: data.numDescuento,
        imagen: imagen,
        usuario: localStorage.getItem("idUsuario"),
        colaborador: data.colaboradorSelect
      }),
    };
    fetch("https://api.ccpegoilesvalls.es/api/add/descuento", requestOptions).then(
      (response) => {
        if (response.ok) {
          localStorage.setItem("alerta", "Descuento añadido con exito");
          window.location = "/junta-directiva/descuentos";
          response.json();
        }
      }
    );
  }

  useEffect(() => {
    sacarColaboradores();
  }, []);

  function sacarColaboradores() {
    fetch("https://api.ccpegoilesvalls.es/api/colaborador")
      .then((res) => res.json())
      .then(
        (result) => {
          var text = "";
          text += '<option value="" label="Selecciona una seccion" />';
          result.forEach((item) => {
              text += '<option value="'+item.id+'" label="'+item.username+'" />';
          });
          document.getElementById('colaboradorSelect').innerHTML = text;
        
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  function subirImagen() {
    var inputFile = document.getElementById("imagen");
    let formData = new FormData();
    formData.append("archivo", inputFile.files[0]);
    fetch("https://api.ccpegoilesvalls.es/upload/img", {
      method: 'POST',
      body: formData,
        })
    .then(respuesta => respuesta.text())
    .then(decodificado => {
        console.log(decodificado);
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
    <>
    <div
      className="modal fade bd-example-modal-lg"
      id="crearDescuento"
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
              Añadir Nuevo Descuento
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
                <p className="text-danger mb-1">{errors.numDescuento?.message}</p>
                <Form.Label>
                  {" "}
                  Descuento<span className="obligatorio">*</span>{" "}
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  className="form-control"
                  name="descuento"
                  id="descuento"
                  max="100"
                  {...register("numDescuento")}
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
              <p className="text-danger">{errors.fechaFin?.message}</p>
                  <Form.Label>
                    Fecha Fin<span className="obligatorio">*</span>
                  </Form.Label>
                  <input
                    type="date"
                    className="form-control mx-auto"
                    id="fechaFin"
                    name="fechaFin"
                    {...register("fechaFin")}
                  />
                </Form.Group>
                <Form.Group>
                <p className="text-danger">{errors.colaboradorSelect?.message}</p>
                  <Form.Label>
                    Colaborador<span className="obligatorio">*</span>
                  </Form.Label>
                  <Form.Control as="select" name="colaboradorSelect" id="colaboradorSelect" {...register("colaboradorSelect")}>
                    <option value="" label="Selecciona un colaborador" />

                  </Form.Control>
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
                Crear Descuento
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
    </>
  );
}
