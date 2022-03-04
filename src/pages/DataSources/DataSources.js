import React from 'react'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import { Form, InputGroup, Col, Row, Container, Button, FormControl } from 'react-bootstrap'
import avt_people from "resources/icons/avt_people.svg"
import excel_icon from "resources/icons/excel_icon.svg"
import search from "resources/icons/search.svg"
import three_dot from "resources/icons/three-dot.svg"
import { orange } from "../../utils/color"


const orangeStyle = {
    color: "#FF7F0D",
}

export default function DataSources() {
    return (
        <div>
            <div className='d-flex' >
                <InputGroup className="mb-3 ms-5 me-5 " style={{ "boder-radius": "40px" }}>
                    <FormControl
                        placeholder="Search"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        <img src={search} />
                    </Button>
                </InputGroup>
            </div>


            <div className='d-flex flex-row pt-2'>

                <h2 class="ms-4 mt-1" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> Data Sources:</h2>
                <button className='btn btn-default shadow bg-body rounded pl-2 pr-2 ms-3'
                    onClick={() => {
                        //setShowPModel(true)
                    }}
                >
                    <h1 className='m-0 pb-1 p-0' style={orangeStyle}>+</h1>
                </button>


            </div>

            <div className='row bg-light'>
                <div className='col-6 m-4 bg-white'>
                    <h1 className='m-2 mt-4' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>User Sources</h1>
                    <div className='col-3 ms-4 mt-3 pt-2  mb-5 justify-content-center' style={{ "height": "170px", width: "370px", "border-radius": "20px", "backgroundColor": "#F7F7F7" }}>
                        <div className='row justify-content-end'>
                            <img src={three_dot} style={{ "max-width": "14%" }} />
                        </div>
                        <div className="row ms-2">

                            <div class="col-2 d-flex me-3 ms-2" style={{ fontFamily: "Roboto" }}>
                                <img src={excel_icon} />
                            </div>
                            <div class="col-4 ms-4 text-center" style={{ fontFamily: "Roboto" }}>
                                <div class="col-4" style={{ fontFamily: "Roboto", color: blue_cloud }}>
                                    <h2>Iris.csv</h2>
                                </div>
                                <div class="col-4 mt-1" style={{ fontFamily: "Roboto" }}>
                                    datecreated:10/10/2021
                                </div>
                                <div class="col-4" style={{ fontFamily: "Roboto" }}>
                                    lastmodified:10/10/2021
                                </div>


                            </div>

                        </div>
                    </div>

                </div>
                <div className='col-5 m-4 bg-white'>

                    <h1 className='m-2 mt-4' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Sample</h1>
                    <div className='col-3 ms-4 mt-3 pt-2  mb-5 justify-content-center' style={{ "height": "170px", width: "370px", "border-radius": "20px", "backgroundColor": "#F7F7F7" }}>
                        <div className='row justify-content-end'>
                            <img src={three_dot} style={{ "max-width": "14%" }} />
                        </div>
                        <div className="row ms-2">

                            <div class="col-2 d-flex me-3 ms-2" style={{ fontFamily: "Roboto" }}>
                                <img src={excel_icon} />
                            </div>
                            <div class="col-4 ms-4 text-center" style={{ fontFamily: "Roboto" }}>
                                <div class="col-4" style={{ fontFamily: "Roboto", color: blue_cloud }}>
                                    <h2>Iris.csv</h2>
                                </div>
                                <div class="col-4 mt-1" style={{ fontFamily: "Roboto" }}>
                                    datecreated:10/10/2021
                                </div>
                                <div class="col-4" style={{ fontFamily: "Roboto" }}>
                                    lastmodified:10/10/2021
                                </div>


                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}
