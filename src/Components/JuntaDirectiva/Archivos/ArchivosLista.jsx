import React from "react";

export default class ArchivosLista extends React.Component {
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
    };
  }

  sacarArchivos() {
    document.getElementById("modalCarga").style.display = "block";
    fetch("http://api-proyecto-final/api/archivo")
      .then((res) => res.json())
      .then(
        (result) => {
          var total = Math.ceil(result.length / 5);
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
      )
      .finally(function () {
        document.getElementById("modalCarga").style.display = "none";
      });
  }

  sacarArchivoSearch(search) {
    fetch("http://api-proyecto-final/api/archivo/search/" + search)
      .then((res) => res.json())
      .then(
        (result) => {
          var total = Math.ceil(result.length / 5);
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
    var variacion = pagina * 5;

    if (variacion > items.length) {
      variacion = items.length;
    }

    for (var i = (pagina - 1) * 5; i < variacion; i++) {
      arrayPaginacion.push(items[i]);
    }

    this.setState({
      itemsPaginacion: arrayPaginacion,
      paginaActual: pagina,
    });
  }

  eliminar(id) {
    fetch('http://api-proyecto-final/api/archivo/' + id, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => {
      this.sacarArchivos();
      console.log(res);
    })
    
  }

  componentDidMount() {
    this.sacarArchivos();
  }

  render() {
    const { totalPaginas, paginaActual, itemsPaginacion } = this.state;
    return (
      <>
        <table class="table table-striped table-dark mt-3 tableResponsive mt-5">
          <thead>
            <tr>
              <th>Descargar</th>
              <th>Nombre</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {itemsPaginacion.map((item) => (
              <tr>
                <td data-label="Descargar"><button className="btn btnEstandar2"><i class="fas fa-download"></i></button></td>
                <td data-label="Nombre">{item.name}</td>
                <td data-label="Eliminar"><button className="btn btnEstandar2" onClick={() => this.eliminar(item.id)}><i class="fas fa-trash"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center mt-5">
          <nav aria-label="Page navigation example">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                {[...Array(totalPaginas)].map((x, i) => {
                  if (i + 1 === paginaActual) {
                    return (
                      <li key={i + 1} class="page-item">
                        <button
                          class="page-link paginador paginadorActivo"
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
                          class="page-link paginador"
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
      </>
    );
  }
}
