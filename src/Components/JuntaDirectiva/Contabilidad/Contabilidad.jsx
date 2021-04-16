import React from "react";

export default function Contabilidad() {


    return (
        <div className="col-12 col-md-10 pt-5" id="contenidoJuntaDirectiva">
        <div className="row">
            <div className="col-12 px-5">

                <div className="text-center pb-5">
                    <label><i className="fas fa-search pr-3 text-white h5"></i> </label>
                    <input className="form-control w-50 d-inline inputGreen" type="text" id="search" name="search"
                        placeholder="Buscar"/>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="w-50">
                        <label for="selectyear" class="pr-3 h6 text-white">Selecciona el año:</label>
                        <select name="selecYear" class="inputGreen form-control w-25 d-inline">
                            <option value="2020">2020</option>
                            <option value="2020">2019</option>
                            <option value="2020">2018</option>
                            <option value="2020">2017</option>
                        </select>
                    </div>
                    <div>
                        <a href="#" class="btn btnEstandar2"> <i class="fas fa-plus pr-3"></i> Añadir Concepto</a>
                    </div>
                </div>

                <table className="table table-striped table-dark mt-3">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Concepto</th>
                            <th>D/H</th>
                            <th>Importe</th>
                            <th>Saldo</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Año anterior Concepto</td>
                            <td></td>
                            <td>PDF</td>
                            <td></td>
                            <td>Saldo</td>
                            <td></td>
                            
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    )

}