import React, { useState } from 'react'
import { Form, InputGroup, Col, Button, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import login_image from "resources/images/login_image.png"
import { GoogleLoginApi, LoginApi } from "api/Account"
import lock from "resources/icons/lock.svg";
import eye_black from "resources/icons/eye_black.svg";
import google from "resources/icons/google.svg";
import email from "resources/icons/email.svg";
import visible from "resources/icons/visible.svg"
import { Link } from "react-router-dom";
import { deep_blue_primary } from "../../utils/color"
import GoogleLogin from 'react-google-login';

export default function Login() {
    const [isVisible, setisVisible] = useState(false)
    const [information, setinformation] = useState({
        Email: "",
        Password: ""
    })
    const navigate = useNavigate()
    const onSubmitHandler = () => {
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

        //res.data la noi dung trong body tra ve
        //res.status la so 
        LoginApi(information)
            .then((res) => {
                // if (res.data.status === 'error') {

                //     alert(res.data.error)
                // } else {
                //     console.log(res.data)
                //     onLoginSuccess("lecturer", "john", res.data.token, res.data.refreshToken)
                // }
                console.log(res)
                navigate("/")
            })
            .catch((e) => {
                alert("Tài khoản không đúng. Vui lòng nhập lại");
                // navigate("/");
                console.log(e);
            })
    }

    const responseGoogle = (res) => {
        if (res.error) {
            alert("error")
        }
        else {
            GoogleLoginApi({tokenId: res.tokenId})
            .then((res) => {
                // login successful
                console.log(res)
            })
            .catch((err) => {
                // login fail
                console.log(err)
            })
        }
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
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2 mt-5 ">

                                        <p class="h1 fw-bold mb-2 mx-1 mx-md-4 mt-5" style={{ color: deep_blue_primary }}>Sign in</p>


                                        <div class="form-check mb-4">
                                            <div class="form-check-label" for="form2Example3">
                                                If you don’t have an account register
                                            </div>
                                            <label class="form-check-label" for="form2Example3">
                                                You can <Link to="/account/register" class="border-0"> Register here !
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
                                                                ...information, Email: e.target.value
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
                                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                                <Form.Label>Password</Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend "><img src={lock}></img></InputGroup.Text>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            setinformation({
                                                                ...information, Password: e.target.value
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
                                                    {/* <Button ><img src={eye_black}></img></Button> */}
                                                </InputGroup>
                                            </Form.Group>



                                            <div className="row mt-2 mb-5 m-1">
                                                <div class="form-check  col-7">
                                                    <input
                                                        class="form-check-input me-2"
                                                        type="checkbox"
                                                        value=""
                                                        id="form2Example3c"
                                                    />
                                                    <label class="form-check-label" for="form2Example3">
                                                        Remember me
                                                    </label>
                                                </div>

                                                <div className="d-grid  col-5"><Link to="" class="border-0">  Forgot Password !
                                                </Link></div>
                                            </div>
                                            <div class="d-grid gap-2  ">
                                                <button class="btn btn-primary p-2" type="button" style={{ backgroundColor: "#034078", borderRadius: "25px " }} onClick={onSubmitHandler}>Login</button>

                                            </div>
                                            {/* <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4 m-2">
                                                <button type="button" class="btn btn-primary btn-lg">Register</button>
                                            </div> */}



                                        </form>
                                        <div class="d-grid  gap-2 justify-content-center ">
                                            <p class=" mb-2 mx-1 mx-md-4 mt-4">or continue with</p>
                                            <GoogleLogin
                                                clientId={process.env.REACT_APP_GOOGLE_LOGIN}
                                                render={renderProps => (
                                                    <button class="btn shadow-none" onClick={renderProps.onClick}>
                                                        <img src={google}/>
                                                    </button>
                                                )}
                                                buttonText="Login"
                                                onSuccess={responseGoogle}
                                                onFailure={responseGoogle}
                                                cookiePolicy={'single_host_origin'}
                                            />,
                                            <p class=" mb-2 mx-1 mx-md-4 ">Google account</p>




                                        </div>


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
