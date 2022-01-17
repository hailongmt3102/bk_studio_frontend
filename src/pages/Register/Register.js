import React, { useState } from 'react'
import { Form, InputGroup, Col, SplitButton, Dropdown } from 'react-bootstrap'

import login_image from "resources/images/login_image.png"
import lock from "resources/icons/lock.svg";
import eye_black from "resources/icons/eye_black.svg";
import google from "resources/icons/google.svg";
import email from "resources/icons/email.svg";
import visible from "resources/icons/visible.svg"

import profile from "resources/icons/profile.svg"
import { deep_blue_primary } from "../../utils/color"
import { Link } from "react-router-dom";
export default function Register() {

    const [isVisible, setisVisible] = useState(false)
    const [information, setinformation] = useState({
        username: "",
        password: ""
    })
    const [date, setDate] = useState(new Date());
    const onSubmitHandler = (event) => {
        // event.preventDefault()
        // let information = {
        //     email: loginForm.email,
        //     password: loginForm.password
        // }
        // normalLogin(information)
        // .then((res) => {
        //     if (res.data.status === 'error') {
        //         alert(res.data.error)
        //     }else {
        //         console.log(res.data)
        //         onLoginSuccess("lecturer", "john", res.data.token, res.data.refreshToken)
        //     }
        // })

    }
    return (
        <section class="vh-100" style={{ backgroundColor: "#fff" }}>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-12 col-xl-11">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-0">
                                <div class="row ">
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-2 order-lg-1">
                                        <img src={login_image} style={{ borderTopLeftRadius: "25px", borderBottomLeftRadius: "25px" }} class="img-fluid" alt="Sample image" />
                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2 mt-4 ">
                                        <p class="h1 fw-bold  mx-1 mx-md-4" style={{ color: deep_blue_primary }}>
                                            Sign up
                                        </p>
                                        <div class="form-check mb-4">
                                            <div class="form-check-label" for="form2Example3">
                                                If you already have an account register
                                            </div>
                                            <label class="form-check-label" for="form2Example3">
                                                You can <Link to="/account/login" class="border-0">  Login here !
                                                </Link>
                                            </label>

                                        </div>
                                        <form class="mx-1 mx-md-4">

                                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                                <Form.Label>Email</Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend"><img src={email}></img></InputGroup.Text>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            setinformation({
                                                                ...information, username: e.target.value
                                                            })
                                                            console.log(information);
                                                        }}

                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please choose a username.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                            {/* Username */}
                                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                                <Form.Label>Username</Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend"><img src={profile}></img></InputGroup.Text>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            setinformation({
                                                                ...information, username: e.target.value
                                                            })
                                                            console.log(information);
                                                        }}

                                                        type="text"
                                                        placeholder="Enter your User name"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please choose a username.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                            {/* Password */}
                                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                                <Form.Label>Password</Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend "><img src={lock}></img></InputGroup.Text>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            setinformation({
                                                                ...information, password: e.target.value
                                                            })
                                                            console.log(information);
                                                        }}
                                                        type={isVisible ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please choose a username.
                                                    </Form.Control.Feedback>
                                                    <button class="btn shadow-none border-top border-bottom border-end" onClick={() => { setisVisible(!isVisible) }}><img src={isVisible ? visible : eye_black}></img></button>

                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend "><img src={lock}></img></InputGroup.Text>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            setinformation({
                                                                ...information, password: e.target.value
                                                            })
                                                            console.log(information);
                                                        }}
                                                        type={isVisible ? "text" : "password"}
                                                        placeholder="Confirm your Password."
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Confirm your Password.
                                                    </Form.Control.Feedback>
                                                    <button class="btn shadow-none border-top border-bottom border-end" onClick={() => { setisVisible(!isVisible) }}><img src={isVisible ? visible : eye_black}></img></button>

                                                </InputGroup>
                                            </Form.Group>
                                            <div class="mt-2">
                                                <Form.Label>Birthday</Form.Label>
                                                <div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <Form.Group controlId="duedate">
                                                                <Form.Control
                                                                    type="date"
                                                                    name="duedate"
                                                                    placeholder="Due date"
                                                                    value={date}
                                                                    onChange={(e) => setDate(e.target.value)}
                                                                />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="d-md-flex justify-content-start align-items-center py-2">

                                                <h6 class="mb-0 me-4">Gender: </h6>

                                                <div class="form-check form-check-inline mb-0 me-4">
                                                    <input
                                                        class="form-check-input"
                                                        type="radio"
                                                        name="inlineRadioOptions"
                                                        id="femaleGender"
                                                        value="option1"
                                                    />
                                                    <label class="form-check-label" for="femaleGender">Female</label>
                                                </div>

                                                <div class="form-check form-check-inline mb-0 me-4">
                                                    <input
                                                        class="form-check-input"
                                                        type="radio"
                                                        name="inlineRadioOptions"
                                                        id="maleGender"
                                                        value="option2"
                                                    />
                                                    <label class="form-check-label" for="maleGender">Male</label>
                                                </div>
                                            </div>
                                            <div class="d-md-flex justify-content-start    ">
                                                <div class=" justify-content-start me-2 mb-4 ">
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                                            Company
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu variant="dark">
                                                            {/* <Dropdown.Item href="#/action-1" active>
                                                        Action
                                                    </Dropdown.Item> */}
                                                            <Dropdown.Item href="#/action-2">Công ti trách nhiệm hữu hạn Trường Minh Thịnh</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3">Tập đoàn VNG</Dropdown.Item>
                                                            {/* <Dropdown.Divider />
                                                    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item> */}
                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                </div>

                                                <div class="mb-4">
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                                            Position
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu variant="dark">
                                                            {/* <Dropdown.Item href="#/action-1" active>
                                                        Action
                                                    </Dropdown.Item> */}
                                                            <Dropdown.Item href="#/action-2">Manager</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3">Member</Dropdown.Item>
                                                            {/* <Dropdown.Divider />
                                                    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item> */}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>










                                            <div class="d-grid gap-2  ">
                                                <button class="btn btn-primary p-2" type="button" style={{ backgroundColor: "#034078", borderRadius: "25px " }} onClick={onSubmitHandler}>Register</button>

                                            </div>






                                        </form>




                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
