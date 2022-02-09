import React, { useState, useEffect } from 'react'

import { Form, InputGroup, Col, Row, Container } from 'react-bootstrap'
import visible from "resources/icons/visible.svg"
import eye_black from "resources/icons/eye_black.svg";
import profile from "resources/icons/profile.svg"
import lock from "resources/icons/lock.svg";
import CustomDropdownButton from 'pages/EditReport/components/CustomDropdownButton';
import { GetInformationApi } from "api/Account"
export default function Profile() {


    useEffect(() => {
        // get 
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
        Password: "",
        UserName: "",
        RankAccount: "",
        Avatar: "",
        OverView: "",
        Company: "",
        Gender: "",
        Address: "",
        Birthday: "",
        Position: "",
        NewCompany: true,
        Tenant: "",

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
                            <Form.Control type="text" placeholder="Enter your username" />
                        </Col>
                    </Form.Group>
                </div>
                <div class=" justify-content-start align-items-center py-2">
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="password" placeholder="Enter your password" />
                        </Col>
                    </Form.Group>
                </div>

                <div class=" justify-content-start align-items-center py-2">
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="Enter your emaill" />
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
                                    placeholder="Due date"
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
                            <Form.Control type="text" placeholder="Enter your company" />
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
                            <Form.Control type="text" placeholder="Enter your address" />
                        </Col>
                    </Form.Group>
                </div>

            </Form>
        </div>
    )
}
