import React from "react";
import {} from "react-bootstrap";

class Actividad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: [],
      categorias: [],
      fechaFormateada: null,
      dias: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
      ],
      meses: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
    };
  }

  sacarEventos() {
    fetch("https://api.ccpegoilesvalls.es/api/evento")
      .then((res) => res.json())
      .then(
        (result) => {
          var fechaActual = new Date();
          var array = [];
          var fechaFormateada = "";
          var entro = false;
          result.forEach((element) => {
            var fechaElemento = new Date(element.fechaInicio);
            if (fechaElemento > fechaActual && !entro) {
              var fecha = new Date(element.fechaInicio);
              var hora = fecha.getHours();
              hora = ("0" + hora).slice(-2);
              var minutos = fecha.getMinutes();
              minutos = ("0" + minutos).slice(-2);
              fechaFormateada =
                this.state.dias[fecha.getDay()] +
                ", " +
                fecha.getDate() +
                " de " +
                this.state.meses[fecha.getUTCMonth()] +
                " a las " +
                hora +
                ":" +
                minutos;
              array = element;
              entro = true;
            }
          });

          this.setState({
            isLoaded: true,
            item: array,
            fechaFormateada: fechaFormateada,
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
    this.sacarEventos();
  }

  render() {
    const { item, fechaFormateada } = this.state;

    return (
      <div
        className="card col-12 col-lg-7 border-danger mx-auto"
        style={{ width: "18rem" }}
      >
        <div className="card-body text-center">
          <h5 className="card-title pt-4">Evento {fechaFormateada}</h5>
          <h5> {item.titulo}</h5>
          <h2 className="pt-4">10:02:20</h2>
        </div>
      </div>
    );
  }
}

export default Actividad;
