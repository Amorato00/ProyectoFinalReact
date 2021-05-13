import React from "react";
import {} from "react-bootstrap";

class Descuentos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      itemsPaginacion: [],
      size: 0,
      totalPaginas: 0,
      paginaActual: 0,
    };
  }

  sacarDescuentos() {
    fetch("http://api-proyecto-final/api/descuento")
      .then((res) => res.json())
      .then(
        (result) => {
          var total = Math.ceil(result.length / 4);
          this.setState({
            isLoaded: true,
            items: result,
            size: result.length,
            totalPaginas: total,
          });
          this.paginacion(1);
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

  paginacion(pagina) {
    var arrayPaginacion = [];

    const { items } = this.state;
    var variacion = pagina * 4;

    if (variacion > items.length) {
      variacion = items.length;
    }

    for (var i = (pagina - 1) * 4; i < variacion; i++) {
      arrayPaginacion.push(items[i]);
    }

    this.setState({
      itemsPaginacion: arrayPaginacion,
      paginaActual: pagina,
    });
  }

  componentDidMount() {
    this.sacarDescuentos();
  }
  render() {
    const { totalPaginas, paginaActual, itemsPaginacion } = this.state;
    return (
      <div
        className="container-fluid p-0 pb-5"
        id="contenido"
        style={{ backgroundColor: "rgb(75, 75, 75)" }}
      >
        <h1 className="text-center pb-5 pt-5 text-white"> Descuentos </h1>
        {itemsPaginacion.map((item) => (
          <div className="card mb-3 w-50 mx-auto fondo border-white text-white" key={ item.id }>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img className="imagenDescuentoSocio" src={ "./img/"+item.imagen } alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{ item.titulo }</h5>
                  <h5>{ item.numDescuento } %</h5>
                  <p className="card-text">
                  { item.texto }
                  </p>
                  <p className="card-text">
                    <small className="text-danger h6 border rounded bg-white p-1">
                      Disponible des de el <strong>{ item.fechaInicio }</strong> hasta el <strong>{ item.fechaFin }</strong>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
         <div className="d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                {[...Array(totalPaginas)].map((x, i) => {
                  if (i+1 === paginaActual) {
                    return (
                      <li key={i + 1} class="page-item">
                        <button
                          class="page-link text-danger paginador paginadorActivo"
                          disabled
                          onClick={() => this.paginacion(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    );
                  } else {
                    return (
                      <li key={i + 1} class="page-item">
                        <button
                          class="page-link text-danger paginador"
                          onClick={() => this.paginacion(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    );
                  }
                })}
              </ul>
            </nav>
          </nav>
        </div>
      </div>
    );
  }
}

export default Descuentos;
