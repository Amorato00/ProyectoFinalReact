import React from "react";
import "../../../agenda.css";
import {
  ScheduleComponent,
  Week,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";

export default class Agenda extends React.Component {
  render() {
    return (
        <div className="col-12 col-md-9 col-lg-10 pt-4 pb-5" id="contenidoJuntaDirectiva">
        <div className="row">
            <div className="col-12 px-5">
                <h2 className="text-white py-4 text-center">Agenda</h2>
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
      </div>
    );
  }
}
