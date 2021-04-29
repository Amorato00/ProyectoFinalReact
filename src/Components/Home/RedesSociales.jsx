import React from "react";
import { } from "react-bootstrap";

class RedesSociales extends React.Component {

    render() {
        return (
            <div className="container py-5" id="redes-sociales">
                <div className="row ">
                    <div className="col-12">
                    <h1 className="text-center">Redes Sociales</h1>
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col-12 d-flex justify-content-center">
                    <a href="/" className="mr-5 h1">
                    <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href="/" className="mr-5 h1">
                    <i className="fab fa-instagram"></i>
                    </a>
                    <a href="/" className="mr-5 h1">
                    <i className="fab fa-youtube"></i>
                    </a>
                    <a href="/" className="h1">
                    <i className="fab fa-twitter"></i>
                    </a>
                    </div>
                </div>
            </div>
        )
    }

}

export default RedesSociales;