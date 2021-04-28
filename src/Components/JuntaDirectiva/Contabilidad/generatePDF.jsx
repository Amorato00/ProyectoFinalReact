import React from 'react';

export default class generatePDF extends React.Component {
    render() {
    return (
            <table className="table table-striped table-dark mt-3">
            <thead>
                <tr>
                    <th className="border-0">Fecha</th>
                    <th className="border-0">Concepto</th>
                    <th className="border-0">D/H</th>
                    <th className="border-0">Importe</th>
                    <th className="border-0">Saldo</th>
                </tr>
            </thead>
            <tbody>
            {this.props.items.map((item) => (
                <tr key={item.id}>
                    <td>{item.fecha}</td>
                    <td>{item.concepto}</td>
                    <td>{item.d_h}</td>
                    <td>{item.importe} €</td>
                    <td>{item.saldo} €</td>
                </tr>
            ))}
            </tbody>
            <tfoot>
            {(() => {
                        if(this.props.ultimoConcepto !== null) {
                              return (  
                            <tr>
                                <td>{this.props.ultimoConcepto.fecha}</td>
                                <td>{this.props.ultimoConcepto.concepto}</td>
                                <td></td>
                                <td></td>
                                <td>{this.props.ultimoConcepto.saldo} €</td>
                            </tr>)
                        }else {
                            return (  
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>)
                        }
                        
                    })()}
            </tfoot>
          </table>
    )
            }
}