import React from "react";
import {} from "react-bootstrap";

class Noticias extends React.Component {
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
      meses: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
    };
  }

  sacarNoticias() {
    fetch("https://api.ccpegoilesvalls.es/api/noticia")
      .then((res) => res.json())
      .then(
        (result) => {
          var total = Math.ceil(result.length / 8);
          console.log(total);
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
    var variacion = pagina * 8;

    if (variacion > items.length) {
      variacion = items.length;
    }

    for (var i = (pagina - 1) * 8; i < variacion; i++) {
      arrayPaginacion.push(items[i]);
    }

    this.setState({
      itemsPaginacion: arrayPaginacion,
      paginaActual: pagina,
    });
  }

  componentDidMount() {
    this.sacarNoticias();
  }
  render() {
    const { itemsPaginacion, meses, totalPaginas, paginaActual } = this.state;

    return (
      <div
        className="container-fluid p-0 pb-5"
        id="contenido"
        style={{ backgroundColor: "rgb(75, 75, 75)" }}
      >
        <h1 className="text-center pb-5 pt-5 text-white"> Noticias </h1>
        <div className="row">

       <div className="col-sm-10 col-md-10 col-lg-7 mx-auto">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 px-5 mx-auto">
          {itemsPaginacion.map((item) => (
            <div className="col mb-4 cardNoticias" key={item.id}>
              <div className="card fondo text-white border-white">
                <img
                  src={"https://api.ccpegoilesvalls.es/img/" + item.imagen}
                  className="card-img-top imagenNoticiaHome"
                  alt={item.imagen}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.titulo}</h5>
                  <p className="card-text">
                    {" "}
                    {item.texto.substr(0, 100) + "..."}{" "}
                  </p>
                </div>
                <div className="card-footer text-right">
                  <small className="text-white">
                    <i className="far fa-clock"></i>
                    {(() => {
                      var fechaActual = new Date();
                      var fechaArray = item.fecha.split("/");
                      var fecha = new Date(
                        fechaArray[2] +
                          "/" +
                          fechaArray[1] +
                          "/" +
                          fechaArray[0]
                      );
                      if (
                        fechaActual.getMonth() === fecha.getMonth() &&
                        fechaActual.getDate() === fecha.getDate() &&
                        fechaActual.getFullYear() === fecha.getFullYear()
                      ) {
                        return " Hoy";
                      } else {
                        return (
                          " " +
                          fechaArray[0] +
                          " " +
                          meses[parseInt(fechaArray[1]) - 1]
                        );
                      }
                    })()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center pt-5">
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
        </div>
      </div>
    );
  }
}

export default Noticias;
