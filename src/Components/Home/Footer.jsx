import React from "react";
import {} from "react-bootstrap";

class Footer extends React.Component {

    render() {
        return(
            <footer className="container-fluid p-0" id="footer">
                <div className="container pt-2">
                    <div className="row flex-column flex-lg-row justify-content-lg-between py-4 text-white">
                    <div className="col-12 col-lg-5  d-none d-lg-block">
                        <small>Copyright © - Todos los derechos reservados Adrián Morató</small>
                    </div>
                    <div className="col-12 col-lg-7 d-flex flex-column flex-lg-row justify-content-between  text-center"
                        id="enlaces-footer">
                        <a href="/politicas-legal">
                            <p className="m-0">Términos Legales</p>
                        </a>
                        <a href="/politicas-privacidad">
                            <p className="m-0">Políticas de privacidad</p>
                        </a>
                        <a href="/politicas-cookies">
                            <p className="m-0">Cookies</p>
                        </a>
                        <a href="/">
                            <p className="m-0">Contactanos</p>
                        </a>
                    </div>
                    <div className="col-12 col-lg-5 d-block d-lg-none text-center pt-4">
                        <small>Copyright © - Todos los derechos reservados Adrián Morató</small>
                    </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;