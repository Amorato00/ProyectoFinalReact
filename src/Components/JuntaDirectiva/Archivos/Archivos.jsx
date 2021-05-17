import React from "react";
import ArchivosLista from "./ArchivosLista";

export default class Acta extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
          search: ""
        };
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(event) {
        if(event.target.value === "") {
          this.archivoLista.sacarArchivos();
          this.setState({
            search: event.target.value,
          });
        } else {
          this.archivoLista.sacarArchivoSearch(event.target.value);
          this.setState({
            search: event.target.value,
          });
        }
      }

    render()  {
        const { search } = this.state;
		return (
            <div className="col-12 col-md-9 col-lg-10 pt-5 pb-5" id="contenidoJuntaDirectiva">
                <div className="row">
                    <div className="col-12 px-5">
                        <div className="text-center pb-5">
                            <label><i className="fas fa-search pr-3 text-white h5"></i> </label>
                            <input className="form-control w-50 d-inline inputGreen" type="text" id="search" name="search"
                                placeholder="Buscar archivo" value={this.state.search}
                                onChange={this.handleChange}/>
                        </div>
                       
                        <ArchivosLista search={search}
                        ref={element => {
                            this.archivoLista = element;
                        }}/>
                    </div>
                </div>
            </div>
        )
	}

}