import React, { useState, useEffect } from 'react'
import "@fontsource/roboto";
import { Form, InputGroup, Col, Row, Container, Button } from 'react-bootstrap'
import tick from "resources/icons/tick.svg"
import lock from "resources/icons/lock.svg"
import { Roboto, Poppins } from "../../utils/font"
import { deep_blue_primary } from "../../utils/color"
import "@fontsource/poppins";
import Drop from 'pages/EditReport/components/Drop';
export default function Setting() {
    const [language, setlanguage] = useState("Vietnamese")
    return (
        <div>
            <h2 class="mt-3 mb-3 ms-4" style={{fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold",fontSize:"40px"}}> Setting:</h2>
            <div style={{ backgroundColor: "white", paddingBottom: "25px", height: "700px" }}>
                <Form.Group as={Row} className="mb-3 mt-3 ms-4 align-items-center" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        <h5 className='mt-4' style={{fontFamily: Poppins, "font-weight": "bold", fontSize:16}}>Darkmode </h5>
                    </Form.Label>
                    <Col className='mt-4' sm="5">
                        <Form.Check
                            type="switch"
                            id="custom-switch"

                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-7 ms-4 ms-2 align-items-center" controlId="formPlaintextPassword">
                    <Form.Label column sm="2" >
                        <h5 style={{fontFamily: Poppins, "font-weight": "bold", fontSize:16}}>Language </h5>
                    </Form.Label>
                    <Col sm="2" >
                        <Drop  title={language} items={["French", "American"]} onClick={(val, index) => {
                            setlanguage(val)
                        }} />
                    </Col>
                </Form.Group>

                <Row>
                    <Col className="mt-4 ms-5" md={3} style={{ backgroundColor: "#F7F7F7", borderRadius: "20px", marginRight: "40px" }}>
                        <Col className=" text-center me-2 align-items-end "> <h3 class=" align-self-center mt-3 mb-3" > Free</h3></Col>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" }}>
                                    use tool
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" }}>
                                    create reports
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" }}>
                                    share reports
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto", color:"grey"}}>
                                    multiple projects
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" , color:"grey"}}>
                                    block ads
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" ,color:"grey"}}>
                                    no limit reports
                                </div>
                            </div>
                        </div>
                        <div className="text-center gap-2 mt-4 mb-4 " style={{ fontFamily: "Roboto" }} >
                            <Button variant="success" size="sm" style={{ width: "200px", borderRadius: "20px" }}>
                                Used
                            </Button>
                        </div>

                    </Col>
                    <Col className="mt-4 ms-5" md={3} style={{ backgroundColor: "#F7F7F7", borderRadius: "15px", marginRight: "40px" }}>
                        <Col className=" text-center align-items-end "> <h3 class=" align-self-center mt-3 mb-3"> Premium</h3></Col>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" }}>
                                    use tool
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" }}>
                                    create reports
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" }}>
                                    share reports
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" }}>
                                    multiple projects
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" }}>
                                    block ads
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto" }}>
                                    no limit reports
                                </div>
                            </div>
                        </div>
                        <div className="text-center gap-2 mt-4 mb-4" style={{ fontFamily: "Roboto" }} >
                            <Button variant="warning" size="sm" style={{ width: "200px", borderRadius: "15px" }} >
                                <div className='text-white'> Get Premium </div>
                            </Button>
                        </div>

                    </Col>
                </Row>
            </div>


        </div >
    )
}
