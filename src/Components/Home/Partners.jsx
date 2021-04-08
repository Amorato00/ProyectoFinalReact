import React from "react";
import {} from "react-bootstrap";

class Partners extends React.Component {
    render() {
        return (
            <div className="card col-12 col-lg-4 border-danger mx-auto mt-5 mt-md-5 mt-lg-0" style={{width: "18rem"}}>
            <div className="card-body text-center">
                <h5 className="card-title pt-4">Partners Oficiales</h5>
                <div className="row justify-content-between py-3">
                    <div className="col-3 p-0">
                        <img src={"./img/logo/PlayStation-Logo.png"} className="partner" alt=""/>
                    </div>
                    <div className="col-3 p-0">
                        <img src={"./img/logo/Nike-Logo-1971.jpg"} className="partner" alt=""/>
                    </div>
                    <div className="col-3 p-0">
                        <img src={"./img/logo/Logo_de_Cola_Cao_opt.jpg"} className="partner" alt=""/>
                    </div>
                </div>
                <button type="button" className="btn btn-outline-danger">Ver Todos</button>
            </div>
        </div>
        )
    }
}

export default Partners;