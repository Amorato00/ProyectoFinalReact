import React from "react";
import "../agenda.css";
import {
  ScheduleComponent,
  Week,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";

export default class AgendaSocio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
    
}

sacarEventos() {
  document.getElementById("modalCarga").style.display = "block";
  fetch("https://api.ccpegoilesvalls.es/api/evento")
    .then((res) => res.json())
    .then(
      (result) => {
        result.forEach(element => {
          var separar = element.fechaInicio.split(" ");
          var fecha = separar[0].split("/");
          var hora = separar[1].split(":");
          var mes = fecha[1] - 1;
          this.setState({
            items: [
              ...this.state.items,
              {id: element.id, Subject: element.titulo, StartTime: new Date(fecha[2],mes,fecha[0],hora[0],hora[1]), EndTime: new Date(fecha[2],mes,fecha[0],hora[0],hora[1])} 
            ]
            });
          })
          
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
    )
    .finally(function () {
      document.getElementById("modalCarga").style.display = "none";
    });
}


componentDidMount() {
  this.sacarEventos();
}


  render() {
    return (
      <div
        className="container-fluid p-0 pb-5"
        id="contenido"
        style={{ backgroundColor: "rgb(75, 75, 75)" }}
      >
          <div className="container">

        <h1 className="text-center pb-5 pt-5 text-white"> Agenda </h1>
        <ScheduleComponent
          width="100%"
          height="650px"
          selectedDate={new Date()}
          eventSettings={{ dataSource: this.state.items }}
          readonly
        >
          <ViewsDirective>
            <ViewDirective option="Month" showWeekend={true} />
          </ViewsDirective>
          <Inject services={[Month]} />
        </ScheduleComponent>
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
}
