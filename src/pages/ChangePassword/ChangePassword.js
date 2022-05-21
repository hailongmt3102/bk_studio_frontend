import React, { useState } from 'react'
import { Form, InputGroup, Col, Button, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import login_image from "resources/images/login_image.png"
import { SetNewPasswordAPI } from "api/Account"
import lock from "resources/icons/lock.svg";
import visible from "resources/icons/visible.svg"
import invisible from "resources/icons/invisible.svg"
import { Link } from "react-router-dom";
import { deep_blue_primary } from "../../utils/color"
import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"

export default function ChangePassword() {
    const [isVisible, setisVisible] = useState(false)
    const [information, setinformation] = useState({
        NewPassword: ""
    })
    const navigate = useNavigate()
    const onSubmitHandler = () => {
        //console.log("da nhan Change")
        if (information.NewPassword === "") {
            Store.addNotification(content("Warning", "Please fill in your password", "warning"))
            return
        }
        else if (information.NewPassword.length < 8) {
            Store.addNotification(content("Warning", "Password have to more than 8 digit", "warning"))
            return
        }
        else {
            SetNewPasswordAPI({...information, Password: "asdf"})
                .then((res) => {
                    Store.addNotification(content("Success", "Changed Password", "success", {
                        duration: 5000
                    }))
                    navigate("/account/login")
                })
                .catch((e) => {
                    Store.addNotification(content("Warning", "Change password fail", "danger"))
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

                                        <p class="h1 fw-bold mb-2 mx-1 mx-md-4 mt-5" style={{ color: deep_blue_primary }}>Change Password</p>


                                        <div class="form-check mb-5">
                                            <div class="form-check-label" >
                                                If you already have an account register
                                            </div>
                                            <label class="form-check-label" >
                                                You can <Link to="/account/login" class="border-0" style={{ color: deep_blue_primary, "fontWeight": "bold" }}>  Login here !
                                                </Link>
                                            </label>

                                        </div>
                                        <form class="mx-1 mx-md-4 mt-2 " >
                                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                                <Form.Label>New Password</Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend "><img src={lock}></img></InputGroup.Text>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            setinformation({
                                                                ...information, NewPassword: e.target.value
                                                            })
                                                            console.log(information);
                                                        }}
                                                        type={isVisible ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                    />

                                                    <a class="btn shadow-none border-top border-bottom border-end" onClick={() => { setisVisible(!isVisible) }}><img width="20px" height="20px" src={isVisible ? visible : invisible}></img></a>
                                                    {/* <Button ><img src={eye_black}></img></Button> */}
                                                </InputGroup>
                                            </Form.Group>



                                            <div class="d-grid gap-2  mt-5">
                                                <button class="btn btn-primary p-2" type="button" style={{ backgroundColor: "#034078", borderRadius: "25px" }} onClick={onSubmitHandler}>Send</button>

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
