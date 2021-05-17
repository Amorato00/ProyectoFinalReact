import React from "react";
import "../../agenda.css";
import { Line, Pie } from "react-chartjs-2";

import {
  ScheduleComponent,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";

export default class Cuerpo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueContabilidad: [],
      fechaContabilidad: [],
      activos: 0,
      pidePago: 0,
      baja: 0,
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  sacarContabilidad() {
    var fecha = new Date();
    var year = fecha.getFullYear();
    fetch("https://api.ccpegoilesvalls.es/api/contabilidad/" + year)
      .then((res) => res.json())
      .then(
        (result) => {
          var resultReverse = result.reverse();
          resultReverse.forEach((element) => {
            this.setState({
              valueContabilidad: [
                ...this.state.valueContabilidad,
                element.saldo,
              ],
              fechaContabilidad: [
                ...this.state.fechaContabilidad,
                element.fecha,
              ],
            });
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

  sacarSocios() {
    fetch("https://api.ccpegoilesvalls.es/api/socio")
      .then((res) => res.json())
      .then(
        (result) => {
          var numActivo = 0;
          var numPidePago = 0;
          var numBaja = 0;

          result.forEach((element) => {
            if(element.estado === "Activo") {
              numActivo++;
            }

            if(element.estado === "Pide Pago") {
             numPidePago++;
            }

            if(element.estado === "Baja") {
             numBaja++;
            }
          });
            this.setState({
              activos: numActivo,
              pidePago: numPidePago,
              baja: numBaja
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

  sacarEventos() {
    fetch("https://api.ccpegoilesvalls.es/api/evento")
      .then((res) => res.json())
      .then(
        (result) => {
          result.forEach(element => {
            var separar = element.fechaInicio.split(" ");
            var fecha = separar[0].split("/");
            var hora = separar[1].split(":");
            this.setState({
              items: [
                ...this.state.items,
                {id: element.id, Subject: element.titulo, StartTime: new Date(fecha[2],fecha[1],fecha[0],hora[0],hora[1]), EndTime: new Date(fecha[2],fecha[1],fecha[0],hora[0],hora[1])} 
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
  }

  componentDidMount() {
    this.sacarContabilidad();
    this.sacarSocios();
    this.sacarEventos();
  }

  render() {
    const data = {
      labels: this.state.fechaContabilidad,
      datasets: [
        {
          label: "Saldo",
          data: this.state.valueContabilidad,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const dataPie = {
      labels: [
        'Activo ('+this.state.activos+')',
        'Pide Pago ('+this.state.pidePago+')',
        'Baja ('+this.state.baja+')'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [this.state.activos, this.state.pidePago, this.state.baja],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

    const LineChart = () => (
      <>
        <Line width={8} height={2} data={data} options={options} />
      </>
    );

    const PieChart = () => (
      <>
        <Pie width={8} height={2} data={dataPie} />
      </>
    );

    return (
      <div className="col-12 col-md-9 col-lg-10 pb-5 " id="contenidoJuntaDirectiva">
        <div className="row mt-5 px-5">
          <div className="col-12 bg-white rounded">
            <h2 className="py-2">
              <a
                href="/junta-directiva/contabilidad"
                className="enlaceEstandar"
              >
                Contabilidad
              </a>
            </h2>
            <div className="py-3 border-top">
              <LineChart />
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-between px-5 mt-5">
          <div className="col-12 col-lg-5 bg-white rounded">
            <h2 className="py-2">
              <a href="/junta-directiva/socios" className="enlaceEstandar">
                Socio
              </a>
              <div className="py-3 border-top ">
              <PieChart />
            </div>
            </h2>
          </div>
          <div className="col-12 col-lg-6 bg-white rounded mt-5 mt-lg-0">
            <h2 className="py-2">
              <a href="/junta-directiva/agenda" className="enlaceEstandar">
                Agenda
              </a>
            </h2>
            <div className="border-top py-3">
              <ScheduleComponent
                width="100%"
                height="550px"
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
          </div>
        </div>
      </div>
    );
  }
}
