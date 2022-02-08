import React, { useState, useEffect } from 'react'

import { Form, InputGroup, Col, Row, Container } from 'react-bootstrap'
import visible from "resources/icons/visible.svg"
import eye_black from "resources/icons/eye_black.svg";
import profile from "resources/icons/profile.svg"
import lock from "resources/icons/lock.svg";
import CustomDropdownButton from 'pages/EditReport/components/CustomDropdownButton';
export default function Setting() {
    return (
        <div>
            <h3 class="mt-3 mb-3"> Setting:</h3>
            <Form.Group as={Row} className="mb-3 align-items-center" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                    Darkmode
                </Form.Label>
                <Col sm="5">
                    <Form.Check
                        type="switch"
                        id="custom-switch"

                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 align-items-center" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                    Language
                </Form.Label>
                <Col sm="5">
                    <CustomDropdownButton title="---" items={["French", "American"]} onClick={(val, index) => {

                    }} />
                </Col>
            </Form.Group>
        </div>
    )
}
