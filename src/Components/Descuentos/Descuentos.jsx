import React from "react";
import {} from "react-bootstrap";

class Descuentos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  sacarDescuentos() {
    fetch("http://api-proyecto-final/api/descuento")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
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

  componentDidMount() {
    this.sacarDescuentos();
  }
  render() {
    const { items, meses } = this.state;
    return (
      <div
        className="container-fluid p-0 pb-5"
        id="contenido"
        style={{ backgroundColor: "rgb(75, 75, 75)" }}
      >
        <h1 className="text-center pb-5 pt-5 text-white"> Descuentos </h1>
        {items.map((item) => (
          <div className="card mb-3 w-50 mx-auto fondo border-white text-white" key={ item.id }>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={ "./img/"+item.imagen } alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{ item.titulo }</h5>
                  <h5>{ item.numDescuento } %</h5>
                  <p className="card-text">
                  { item.texto }
                  </p>
                  <p className="card-text">
                    <small className="text-danger h6">
                      Disponible des de el <strong>{ item.fechaInicio }</strong> hasta el <strong>{ item.fechaFin }</strong>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Descuentos;
