import React from 'react'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import { Form, InputGroup, Col, Row, Container, Button } from 'react-bootstrap'
import avt_people from "resources/icons/avt_people.svg"
import tick from "resources/icons/tick.svg"
export default function People() {
    return (
        <div>
            <h2 class="ms-4" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> People:</h2>
            <div className='rounded-5 bg-white'>
                <div className='row bg-light'>
                    <div className='col-5 m-4 bg-white'>

                        <h1 className='m-2 ' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Member</h1>
                        <div className='col-3 m-2 mt-3 ms-3' style={{ "height": "170px", width: "450px", "border-radius": "20px", "backgroundColor": "#FFC107" }}>
                            <div className="row mt-4 pt-4 px-4 ">
                                <div class="col-2 me-5" style={{ fontFamily: "Roboto" }}>
                                    <img src={avt_people} />
                                </div>
                                <div class="col-4 ms-2 " style={{ fontFamily: "Roboto" }}>
                                    <div class="col-4" style={{ fontFamily: "Roboto" }}>
                                        <h2>Jenifer</h2>
                                    </div>
                                    <div class="col-4" style={{ fontFamily: "Roboto" }}>
                                        email:aaaaaaaaa
                                    </div>
                                    <div class="col-4" style={{ fontFamily: "Roboto" }}>
                                        email:aaaaaaaaa
                                    </div>
                                    <div class="col-4" style={{ fontFamily: "Roboto" }}>
                                        email:aaaaaaaaa
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='col-4 m-4 bg-white'>
                        <h1 className='m-2 ' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Member</h1>

                    </div>

                </div>
            </div>
        </div>
    )
}
