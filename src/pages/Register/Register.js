import React, { useState , useEffect} from 'react'
import { Form, InputGroup, Col, SplitButton, Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import login_image from "resources/images/login_image.png"
import lock from "resources/icons/lock.svg";
import eye_black from "resources/icons/eye_black.svg";
import google from "resources/icons/google.svg";
import email from "resources/icons/email.svg";
import visible from "resources/icons/visible.svg"
import { RegisterApi } from "api/Account"
import profile from "resources/icons/profile.svg"
import { deep_blue_primary } from "../../utils/color"
import { Link } from "react-router-dom";
import CustomDropdownButton from 'pages/EditReport/components/CustomDropdownButton';
import {getListCompanies} from "api/ListCompanies"
export default function Register() {

    const navigate = useNavigate()
    const [newCompany, setNewCompany] = useState(false)
    const [listCompany, setlistCompany] = useState(["TMT", "UEH"])
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
        Tenant: "newnewt",

    })
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        // get all project
        getListCompanies()
            .then(response => {
                setlistCompany(response.data.map(ele=>ele.Company))
                console.log(listCompany)
               
            })
            .catch(
                error => {
                    console.log(error)
                }
            )
    })

    const onSubmitHandler = () => {
        console.log(information);

        RegisterApi(information)
        .then((res) => {

            navigate("/account/login")
        })
        .catch((e) => {
            alert(e.response.data);
        })

    }
    return (
        <section class="vh-100" style={{ backgroundColor: "#fff" }}>
            <div class="container h-100 ">
                <div class="row justify-content-center align-items-center h-100">
                    <div class="">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-0">
                                <div class="row ">
                                    <div class="col-md-10 col-lg-6 col-xl-7 order-2 order-lg-1">
                                        <img src={login_image} style={{ borderTopLeftRadius: "25px", borderBottomLeftRadius: "25px" }} class="img-fluid" alt="Sample image" />
                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2 mt-4 ">
                                        <p class="h1 fw-bold  mx-1 mx-md-4" style={{ color: deep_blue_primary }}>
                                            Sign up
                                        </p>
                                        <div class="form-check mb-2">
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
                                                        Please choose a email.
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
                                                                ...information, UserName: e.target.value
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

                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                                <Form.Label>Confirm Password</Form.Label>
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
                                                                    onChange={(e) => {
                                                                        setDate(e.target.value);
                                                                        setinformation({
                                                                            ...information, Birthday: e.target.value
                                                                        })
                                                                        console.log(information);
                                                                    }}
                                                                />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="d-md-flex justify-content-start align-items-center py-2">
                                                <h6 class="mb-0 me-4">Gender: </h6>

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
                                            <div class="d-md-flex justify-content-start align-items-center py-2">

                                                <Form.Check
                                                    onClick={(e) => {
                                                        setinformation({
                                                            ...information, NewCompany: true
                                                        })
                                                        setNewCompany(true)
                                                        console.log(newCompany);
                                                    }}
                                                    inline
                                                    label="New Company"
                                                    name="group1"
                                                    type="radio"
                                                    id="Company"
                                                />
                                                <Form.Check
                                                    onClick={(e) => {
                                                        setinformation({
                                                            ...information, NewCompany: false
                                                        })
                                                        setNewCompany(false)
                                                        console.log(newCompany);
                                                    }}

                                                    inline
                                                    label="Create Company"
                                                    name="group1"
                                                    type="radio"
                                                    id="Company" F
                                                />

                                            </div>




                                            {newCompany ?
                                                <div><div class="d-md-flex mt-1 ">
                                                    <h6 class="  me-2 mt-2">Company name: </h6>
                                                    <div class="  me-2  ">
                                                        <CustomDropdownButton title={information.Company == "" ? "Company" : information.Company} items={listCompany} onClick={(val) => {
                                                            setinformation({
                                                                ...information, Company: val
                                                            })
                                                            // console.log(information);
                                                        }} />

                                                    </div>

                                                    <h6 class=" me-2 mt-2">Position: </h6>
                                                    <CustomDropdownButton title={information.Position == "" ? "Position" : information.Position} items={["Manager", "Member"]} onClick={(val) => {
                                                        setinformation({
                                                            ...information, Position: val
                                                        })
                                                        // console.log(information);
                                                    }} />

                                                </div>

                                                </div>
                                                : <div>
                                                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">

                                                        <InputGroup hasValidation>
                                                            <InputGroup.Text id="inputGroupPrepend">Company name</InputGroup.Text>
                                                            <Form.Control
                                                                onChange={(e) => {
                                                                    setinformation({
                                                                        ...information, Company: e.target.value
                                                                    })
                                                                    console.log(information);
                                                                }}

                                                                type="text"
                                                                placeholder="Enter new company name"
                                                                aria-describedby="inputGroupPrepend"
                                                                required
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please choose a username.
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <div class="d-md-flex mt-1 ">
                                                        <h6 class=" me-2 mt-2">Position: </h6>
                                                        <CustomDropdownButton title={information.Position == "" ? "Position" : information.Position} items={["Manager", "Member"]} onClick={(val) => {
                                                            setinformation({
                                                                ...information, Position: val
                                                            })
                                                            // console.log(information);
                                                        }} />

                                                    </div>

                                                </div>
                                            }
                                            <div class="d-grid gap-2  mt-2">
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
            <div style={{height: "100px"}}> </div>
        </section>
    )
}
