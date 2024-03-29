import React, { useState } from 'react'
import { Form, InputGroup, Col, Button, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import login_image from "resources/images/login_image.png"
import { ForgotPasswordAPI } from "api/Account"

import email from "resources/icons/email.svg";

import { Link } from "react-router-dom";
import { deep_blue_primary } from "../../utils/color"

import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"

export default function ForgetPassword() {

    const [Email, setEmail] = useState("")
    const navigate = useNavigate()

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }

        return (false)
    }

    const onSubmitHandler = () => {
        if (Email === "") {
            Store.addNotification(content("Warning", "Please fill in your email", "warning"))
        }
        else if (!ValidateEmail(Email)) {
            Store.addNotification(content("Warning", "Invalid Email", "warning"))
            return
        }
        else {
            ForgotPasswordAPI(Email)
                .then((res) => {
                    Store.addNotification(content("Message", "Please check email to get forgot password code for your account", "info"))
                    navigate("/account/updatePassword")
                })
                .catch((e) => {
                    Store.addNotification(content("Warning", e.reponse.data, "danger"))
                    return
                })
        }



    }
    return (
        <section class="vh-100" style={{ backgroundColor: "#fff" }}>
            <div class="container h-100 w-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-0">
                                <div class="row ">
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex  order-2 order-lg-1">
                                        <img src={login_image} style={{ borderTopLeftRadius: "25px", borderBottomLeftRadius: "25px" }} class="img-fluid" alt="Sample image" />
                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2 mt-5 ">
                                        {/* <div class="text-center"> <img src={logo}></img></div> */}
                                        <p class="h1 fw-bold mb-2 mx-1 mx-md-4 mt-5 PrimaryFontColor">Forget Password</p>


                                        <div class="form-check mb-5">
                                            <div class="form-check-label" >
                                                If you already have an account register
                                            </div>
                                            <label class="form-check-label" for="form2Example3">
                                                You can <Link to="/account/login" class="border-0 PrimaryFontColor" style={{ "fontWeight": "bold" }}>  Login here !
                                                </Link>
                                            </label>

                                        </div>
                                        <form class="mx-1 mx-md-4 mt-2 " style={{ fontSize: 14 }}>

                                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                                <Form.Label>Email</Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend"><img src={email}></img></InputGroup.Text>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            setEmail(e.target.value)
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



                                            <div class="d-grid gap-2  mt-5 " style={{ fontSize: 14 }}>
                                                <a class="btn btn-primary p-2" type="button" style={{ backgroundColor: "#034078", borderRadius: "25px " }} onClick={onSubmitHandler}>Send Email</a>

                                            </div>
                                            {/* <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4 m-2">
                                                <button type="button" class="btn btn-primary btn-lg">Register</button>
                                            </div> */}



                                        </form>




                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: "100px" }}> </div>
        </section>
    )
}
