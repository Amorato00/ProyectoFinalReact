import React from "react";
import "../agenda.css";
import {
  ScheduleComponent,
  WorkWeek,
  Week,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";

export default class AgendaSocio extends React.Component {
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
        >
          <ViewsDirective>
            <ViewDirective option="Month" showWeekend={true} />
            <ViewDirective option="Week" startHour="07:00" endHour="20:00" />
          </ViewsDirective>
          <Inject services={[Month, Week]} />
        </ScheduleComponent>
      </div>
      </div>
    );
  }
}
