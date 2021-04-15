import React from "react";
import {} from "react-bootstrap";

export default function Password() {
  return (
    <div class="col-12 col-md-6 pt-5 pt-md-0">
      <div class="card border-0 rounded rounded-1">
        <h4 class="card-title bg-secondary py-3 text-white mb-0 pl-3 rounded-top rounded-1">
          <i class="fas fa-shield-alt"></i> Cambiar contraseña
        </h4>
        <div class="p-0">
          <table class="table mb-0">
            <tr>
              <td class="font-weight-bold">Contraseña actual</td>
              <td>
                {" "}
                <input
                  type="password"
                  id="passwordActual"
                  name="passwordActual"
                  placeholder="Password Actual"
                  class="rounded pl-1"
                />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Contraseña Nueva</td>
              <td>
                {" "}
                <input
                  type="password"
                  id="passwordNueva"
                  name="passwordNueva"
                  placeholder="Password Nueva"
                  class="rounded pl-1"
                />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Repetir Contraseña Nueva</td>
              <td>
                {" "}
                <input
                  type="password"
                  id="passwordRepetirNueva"
                  name="passwordRepetirNueva"
                  placeholder="Password Repetir Nueva"
                  class="rounded pl-1"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
