import React, { useState, useEffect } from 'react'

import { Form, InputGroup, Col, Row, Container } from 'react-bootstrap'
import visible from "resources/icons/visible.svg"
import avt from "resources/icons/avt.svg"
import profile from "resources/icons/profile.svg"
import lock from "resources/icons/lock.svg";
import CustomDropdownButton from 'pages/EditReport/components/CustomDropdownButton';
import { GetInformationApi } from "api/Account"
import { useNavigate } from 'react-router-dom'
import { Roboto, Poppins } from "../../utils/font"
import { deep_blue_primary } from "../../utils/color"
import "@fontsource/poppins";
import Drop from 'pages/EditReport/components/Drop';


export default function Profile() {

    const navigate = useNavigate()
    useEffect(() => {
        // get 
        console.log('Chay ham get info ne')
        GetInformationApi()
            .then(response => {
                console.log(response.data)
                setinformation(response.data)
            })
            .catch(
                error => {
                    console.log(error)
                }
            )
    }, [])
    const [isVisible, setisVisible] = useState(false)
    const [date, setDate] = useState(new Date());
    const [information, setinformation] = useState({
        Email: "",
        LastLoginTime: null,
        UserName: "",
        Verification: 1,
        RankAccount: "",
        Avatar: "",
        OverView: "",
        Company: "",
        Gender: "M",
        Address: "",
        Birthday: "",
        Position: ""

    })
    return (
        <div>

            <h3 class="mt-3 mb-3 ms-5" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold" }}> Profile:</h3>
            <div class="row" style={{ height: 750 }}>
                <div class="col-2 me-5 ms-4">
                    <div class="mb-4 ms-2"><img src={avt} /></div>
                    <div class="mt-2 ms-3 text-center">
                        <button class=" btn sm ms-4 p-3  " type="button" style={{ color: "white", backgroundColor: "#FF7F0D", borderRadius: "30px ", fontFamily: Poppins, fontSize: 14 }} onClick={() => navigate("/account/changePassword")}>Change Password</button>
                    </div>
                </div>
                <div class="ms-5 col-8">
                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontFamily: Poppins, fontSize: 14 }} >UserName</Form.Label>
                            <Col sm="5">
                                <Form.Control type="text" placeholder={information.UserName} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontFamily: Poppins, fontSize: 14 }} >Email</Form.Label>
                            <Col sm="5">
                                <Form.Control type="text" placeholder={information.Email} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class="d-md-flex justify-content-start align-items-center py-2 mt-1 mb-1">
                        <div class="mb-0 me-4" style={{ fontFamily: Poppins, fontSize: 14 }}>Gender: </div>

                        <Form.Check
                            onClick={(e) => {
                                setinformation({
                                    ...information, Gender: "Male"
                                })

                                console.log(information);
                            }}
                            inline
                            label="Male"
                            name="group1"
                            type="radio"
                            id="MaleGender"
                        />
                        <Form.Check
                            onClick={(e) => {
                                setinformation({
                                    ...information, Gender: "Female"
                                })

                                console.log(information);
                            }}
                            inline
                            label="Female"
                            name="group1"
                            type="radio"
                            id="FemaleGender"
                        />
                    </div>
                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontFamily: Poppins, fontSize: 14 }} >Birthday</Form.Label>
                            <Col sm="5">
                                <Form.Group controlId="duedate">
                                    <Form.Control
                                        type="date"
                                        name="duedate"
                                        placeholder={information.Birthday}
                                        value={date}
                                        onChange={(e) => {
                                            setDate(e.target.value);
                                            setinformation({
                                                ...information, Birthday: e.target.value
                                            })
                                            console.log(information);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </div>

                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontFamily: Poppins, fontSize: 14 }} >Company</Form.Label>
                            <Col sm="5">
                                <Form.Control type="text" placeholder={information.Company} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontFamily: Poppins, fontSize: 14 }} >Address</Form.Label>
                            <Col sm="5">
                                <Form.Control type="text" placeholder={information.Address} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} c controlId="formPlaintextPassword">
                            <Form.Label column sm="1" style={{ fontFamily: Poppins, fontSize: 14 }}>
                                Position
                            </Form.Label>
                            <Col sm="5" style={{ fontFamily: Poppins, fontSize: 10 }}>
                                <CustomDropdownButton title={information.Position == "" ? "Position" : information.Position} items={["Manager", "Member"]} onClick={(val) => {
                                    setinformation({
                                        ...information, Position: val
                                    })
                                }} />
                            </Col>
                        </Form.Group>
                    </div>
                    <button class=" btn btn-primary  mt-4 ms-5 ms-5     " type="button" style={{ backgroundColor: "#034078", borderRadius: "30px ", fontFamily: Poppins, fontSize: 14 }} onClick={() => { }}>Save Changes</button>


                </div>

            </div>





        </div>
    )
}
