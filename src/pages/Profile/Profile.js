import React, { useState, useEffect } from 'react'

import { Form, InputGroup, Col, Row, Container } from 'react-bootstrap'
import visible from "resources/icons/visible.svg"
import eye_black from "resources/icons/eye_black.svg";
import profile from "resources/icons/profile.svg"
import lock from "resources/icons/lock.svg";
export default function Profile() {
    const [isVisible, setisVisible] = useState(false)
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

            <h3 class="mt-3 mb-3"> Position:</h3>

            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        UserName
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" placeholder="Enter your username" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" placeholder="Enter your username" />
                    </Col>
                </Form.Group>

                
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Birthday
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Company
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Position
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Address
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>

            </Form>
        </div>
    )
}
