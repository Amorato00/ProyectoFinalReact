import React from "react";
import {} from "react-bootstrap";

class Partners extends React.Component {
    render() {
        return (
            <div className="card col-12 col-lg-10 border-0 mx-auto mt-md-5 mt-lg-0 " style={{width: "18rem"}}>
            <div className="card-body text-center">
                <h3 className="card-title pb-4">Partners Oficiales</h3>
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
            </div>
        </div>
        )
    }
}

export default Partners;