import React from "react";
import {} from "react-bootstrap";

class Noticias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
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
    this.sacarNoticias();
  }

  render() {
    const { items, meses } = this.state;

    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" id="sectionNocias">
        {items.map((item) => (
          <div className="col mb-4 cardNoticias" key={item.id}>
            <div className="card fondoRojo border-white text-white">
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
              <div className="card-footer text-right border-white">
                <small className="text-white">
                  <i className="far fa-clock"></i>
                  {(() => {
                    var fechaActual = new Date();
                    var fechaArray = item.fecha.split("/");
                    var fecha = new Date(
                      fechaArray[2] + "/" + fechaArray[1] + "/" + fechaArray[0]
                    );
                    if (
                      fechaActual.getMonth() === fecha.getMonth() &&
                      fechaActual.getDate() === fecha.getDate() &&
                      fechaActual.getFullYear() === fecha.getFullYear()
                    ) {
                      return " Hoy";
                    } else {
                      return (
                        " " + fechaArray[0] + " " + meses[parseInt(fechaArray[1]) - 1]
                      );
                    }
                  })()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Noticias;
