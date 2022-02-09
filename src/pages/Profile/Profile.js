import React, { useState, useEffect } from 'react'

import { Form, InputGroup, Col, Row, Container } from 'react-bootstrap'
import visible from "resources/icons/visible.svg"
import eye_black from "resources/icons/eye_black.svg";
import profile from "resources/icons/profile.svg"
import lock from "resources/icons/lock.svg";
import CustomDropdownButton from 'pages/EditReport/components/CustomDropdownButton';
import { GetInformationApi } from "api/Account"
import { useNavigate } from 'react-router-dom'
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

            <h3 class="mt-3 mb-3"> Profile:</h3>

            <Form>
                <div class=" justify-content-start align-items-center py-2">
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Username
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder={information.UserName} />
                        </Col>
                    </Form.Group>
                </div>


                <div class=" justify-content-start align-items-center py-2">
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder={information.Email} />
                        </Col>
                    </Form.Group>
                </div>
                <div class=" justify-content-start align-items-center py-2">

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Birthday
                        </Form.Label>
                        <Col sm="4">
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
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Company
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder={information.Company} />
                        </Col>
                    </Form.Group>
                </div>
                <div class=" justify-content-start align-items-center py-2">
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Position
                        </Form.Label>
                        <Col sm="4">
                            <CustomDropdownButton title={information.Position == "" ? "Position" : information.Position} items={["Manager", "Member"]} onClick={(val) => {
                                setinformation({
                                    ...information, Position: val
                                })
                            }} />
                        </Col>
                    </Form.Group>
                </div>
                <div class=" justify-content-start align-items-center py-2">
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Address
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder={information.Address} />
                        </Col>
                    </Form.Group>
                </div>

            </Form>

            <button class="btn btn-primary btn-lg p-3 " type="button" style={{ backgroundColor: "#034078", borderRadius: "30px " }} onClick={() => navigate("/account/changePassword")}>Change Password
            </button>


        </div>
    )
}
