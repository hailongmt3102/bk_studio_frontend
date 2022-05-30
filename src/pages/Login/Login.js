import React, { useContext, useEffect, useState } from 'react'
import { Form, InputGroup, Col } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import login_image from "resources/images/login_image.png"
import { GoogleLoginApi, LoginApi, Verify } from "api/Account"
import lock from "resources/icons/lock.svg";
import google from "resources/icons/google.svg";
import email from "resources/icons/email.svg";
import visible from "resources/icons/visible.svg"
import invisible from "resources/icons/invisible.svg"
import { Link } from "react-router-dom";
import { deep_blue_primary } from "../../utils/color"

import GoogleLogin from 'react-google-login';
import CustomDialog from "components/CustomDialog";
import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"
import { localizationContext } from '../../App'


export default function Login(props) {
    // use localization
    const localization = useContext(localizationContext)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [isVisible, setisVisible] = useState(false)
    const [information, setinformation] = useState({
        Email: "",
        Password: ""
    })
    const [remember, setRemember] = useState(false)
    const navigate = useNavigate()
    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }

        return (false)
    }
    const location = useLocation()
    const onSubmitHandler = () => {
        // check email and password
        if ([information.Email.length, information.Password.length].includes(0)) {
            Store.addNotification(content("Warning", "Please fill in email or password", "danger"))
            return
        }
        if (!ValidateEmail(information.Email)) {
            Store.addNotification(content("Warning", "Invalid Email", "danger"))
            return
        }
        // send information into server
        LoginApi(information)
            .then((res) => {
                localStorage.setItem("token", res.data.AccessToken)
                localStorage.setItem("username", res.data.UserName)
                localStorage.setItem("email", information.Email)
                if (remember) {
                    localStorage.setItem("password", information.Password)
                    localStorage.setItem("remember", true)
                }
                else {
                    localStorage.removeItem("password")
                    localStorage.removeItem("remember")
                }
                props.setCurrentUser({
                    Email: information.Email,
                    UserName: res.data.UserName
                })
                // console.log(navigate.)
                console.log(navigate.length)
                console.log(navigate[0], navigate[-1])

                if (props.havePreRoot) navigate(-1)
                else navigate('/')
            })
            .catch((e) => {
                console.log(e)
                if (e.response.data == "Verify required") {
                    setConfirmDialog({ ...confirmDialog, isOpen: true })
                }
                // Store.addNotification(content("Warning", e.response.data, "danger"))
                // return
                //alert(e.response.data);
            })
    }

    useEffect(() => {
        let getusername = localStorage.getItem("email") || ""
        let getpassword = localStorage.getItem("password") || ""
        let getremember = localStorage.getItem("remember") || false
        setinformation({ Email: getusername, Password: getpassword })
        setRemember(getremember)
    }, [])

    const responseGoogle = (res) => {
        if (res.error) {
            // alert("error")
            console.log("error")
        }
        else {
            console.log("gg response ok")
            GoogleLoginApi({ tokenId: res.tokenId })
                .then((res) => {
                    // login successful
                    localStorage.setItem("token", res.data.AccessToken)
                    localStorage.setItem("username", res.data.UserName)
                    props.setCurrentUser({
                        Email: information.Email,
                        UserName: res.data.UserName
                    })
                    if (props.havePreRoot) navigate(-1)
                    else navigate('/')
                })
                .catch((err) => {
                    // login fail
                    Store.addNotification(content("Warning", "Google Login Fail", "danger"))
                    return
                })
        }
    }

    const handleCloseNo = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false })
        // navigate("/account/login")
    }
    const handleCloseYes = () => {
        Verify({ Email: information.Email })
            .then((res) => {
                Store.addNotification(content("Success", "Please check your email to verify", "success"))
                return
            }
            ).catch((e) => {
                Store.addNotification(content("Success", e.response.data, "success"))
                return
            }
            )
    }

    return (
        <section class="vh-100" style={{ backgroundColor: "#fff" }}>
            <CustomDialog
                style={{ width: "300px" }}
                // haveOK={true}
                haveContent={true}
                content={"Please check your email to verify"}
                confirmDialog={confirmDialog}
                // title="Account successfully created ?"
                handleCloseYes={() => handleCloseYes()}
                handleCloseNo={() => handleCloseNo()}
            />
            <div class="container h-100 w-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-0">
                                <div class="row ">

                                    <div class="col-md-10 col-lg-6 col-xl-7   order-2 order-lg-1">
                                        <img src={login_image} style={{ borderTopLeftRadius: "25px", borderBottomLeftRadius: "25px" }} class="img-fluid" alt="Sample image" />
                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2 mt-5 ">

                                        <h1 class=" mb-2 mx-1 mx-md-4 mt-5 customFontBold PrimaryFontColor " >{localization.signIn}</h1>


                                        <div class="form-check mb-4">
                                            <div class="form-check-label">
                                                {localization.signInIf}
                                            </div>
                                            <label class="form-check-label"  >
                                                {localization.youCan} <Link to="/account/register" class="border-0 PrimaryFontColor" style={{ "font-weight": "bold" }}>{localization.registerHere}
                                                </Link>
                                            </label>


                                        </div>

                                        <form class="mx-1 mx-md-4 PrimaryFontColor">

                                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                                <Form.Label>Email</Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend"><img src={email}></img></InputGroup.Text>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            setinformation({
                                                                ...information, Email: e.target.value
                                                            })
                                                        }}
                                                        type="email"
                                                        placeholder={localization.EnterEmail}
                                                        value={information.Email}
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                    />

                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group md="12">
                                                <Form.Label>{localization.Password}</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text id="inputGroupPrepend "><img src={lock}></img></InputGroup.Text>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            setinformation({
                                                                ...information, Password: e.target.value
                                                            })
                                                        }}
                                                        type={isVisible ? "text" : "password"}
                                                        placeholder={localization.EnterPassword}
                                                        value={information.Password}
                                                    />
                                                    <a class="btn shadow-none border-top border-bottom border-end" onClick={() => { setisVisible(!isVisible) }}><img width="20px" height="20px" src={isVisible ? visible : invisible}></img></a>
                                                </InputGroup>
                                            </Form.Group>
                                        </form>
                                        <div className="row ml-auto ms-4 mt-3 mb-5">
                                            <div class="form-check  col-7">
                                                <input
                                                    class="form-check-input me-2"
                                                    type="checkbox"
                                                    id="form2Example3c"
                                                    onClick={(e) => { setRemember(e.target.checked) }}
                                                    checked={remember}
                                                />
                                                <label class="form-check-label" style={{ fontSize: 14 }}>
                                                    {localization.RememberMe}
                                                </label>
                                            </div>


                                            <div class="col-4 text-end">
                                                <Link to="/account/forgetPassword" class="border-0 PrimaryFontColor" style={{ "font-weight": "bold" }}> {localization.ForgotPass}</Link>
                                            </div>



                                        </div>
                                        <div class="d-grid gap-2 ms-4 me-4 ">
                                            <button class="btn btn-primary p-2 " type="button" style={{ backgroundColor: "#034078", borderRadius: "25px " }} onClick={onSubmitHandler}>{localization.Login}</button>

                                        </div>
                                        <div class="text-center  gap-2 justify-content-center ">
                                            <p class="mx-1 mt-5 me-1 mx-md-4 mt-4" style={{ fontSize: 14 }}>{localization.OrContinue}</p>
                                            <GoogleLogin
                                                clientId={process.env.REACT_APP_GOOGLE_LOGIN}
                                                render={renderProps => (
                                                    <button class="btn shadow-none" onClick={renderProps.onClick}>
                                                        <img src={google} />
                                                    </button>
                                                )}
                                                buttonText="Login"
                                                onSuccess={(res) => { responseGoogle(res) }}
                                                onFailure={(err) => { responseGoogle(err) }}
                                                cookiePolicy={'single_host_origin'}
                                            />,
                                            <p class=" mt-3 mb-2 mx-1 mx-md-4 " style={{ fontSize: 14 }}>{localization.GGAccount}</p>




                                        </div>


                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: "100px" }}>
            </div>
        </section>
    )
}
