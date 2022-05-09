import React, { useContext, useState } from 'react'

import { Form, Col, Row, Button } from 'react-bootstrap'
import tick from "resources/icons/tick.svg"
import { localizationContext } from '../../App'
import { deep_blue_primary } from "../../utils/color"

import Drop from 'pages/AdjustingReport/components/Drop';
export default function Setting(props) {
    const localization = useContext(localizationContext)
    const languageSaved = localStorage.getItem('language') ?? 'English'
    const [language, setlanguage] = useState(languageSaved)
    return (
        <div>
            <h2 class="mt-3 mb-3 ms-4" style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>{localization.Setting} </h2>
            <div style={{ backgroundColor: "white", paddingBottom: "25px", height: "700px" }}>
                <Form.Group as={Row} className="mb-3 mt-3 ms-4 align-items-center" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        <h5 className='mt-4' style={{ "fontWeight": "bold", fontSize: 16 }}>{localization.DarkMode}  </h5>
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
                        <h5 style={{ "fontWeight": "bold", fontSize: 16 }}>{localization.Language} </h5>
                    </Form.Label>
                    <Col sm="2" >
                        <Drop title={language} items={["English", "Vietnamese"]} onClick={(val, index) => {
                            setlanguage(val)
                            props.setLanguage(val)
                            window.location.reload()
                        }} />
                    </Col>
                </Form.Group>

                <Row>
                    <Col className="mt-4 ms-5" md={3} style={{ backgroundColor: "#F7F7F7", borderRadius: "20px", marginRight: "40px" }}>
                        <Col className=" text-center me-2 align-items-end "> <h3 class="customFontBold SecondFontColor align-self-center mt-3 mb-3" > {localization.Free}</h3></Col>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto">
                                    {localization.usetool}
                                </div>
                            </div>
                        </div>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto">
                                    {localization.createreports}
                                </div>
                            </div>
                        </div>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px", color: "grey" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto">
                                    {localization.addData}
                                </div>
                            </div>
                        </div>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto" style={{ color: "grey" }}>
                                    {localization.limitPro}
                                </div>
                            </div>
                        </div>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7" style={{ fontFamily: "Roboto", color: "grey" }}>
                                    {localization.invite}
                                </div>
                            </div>
                        </div>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto" style={{ color: "grey" }}>
                                    {localization.nolimitreports}
                                </div>
                            </div>
                        </div>
                        <div className="text-center gap-2 mt-4 mb-4  customFontRoboto" >
                            <Button variant="success" size="sm" style={{ width: "200px", borderRadius: "20px" }}>
                                {localization.used}
                            </Button>
                        </div>

                    </Col>
                    <Col className="mt-4 ms-5" md={3} style={{ backgroundColor: "#F7F7F7", borderRadius: "15px", marginRight: "40px" }}>
                        <Col className=" text-center align-items-end "> <h3 class=" align-self-center mt-3 mb-3 SecondFontColor customFontBold"> {localization.VIP}</h3></Col>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto" >
                                    {localization.usetool}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto" >
                                    {localization.createreports}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto" >
                                    {localization.addData}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto" >
                                    {localization.limitPro}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto" >
                                    {localization.invite}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto">
                                    {localization.nolimitreports}
                                </div>
                            </div>
                        </div>
                        <div className="text-center gap-2 mt-4 mb-4 customFontRoboto"   >
                            <Button variant="warning" size="sm" style={{ width: "200px", borderRadius: "15px" }} >
                                <div className='text-white'>{localization.getPremiun} </div>
                            </Button>
                        </div>

                    </Col>
                </Row>
            </div>


        </div >
    )
}
