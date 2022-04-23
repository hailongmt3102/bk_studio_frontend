import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Form, InputGroup, Col, Row, Container } from 'react-bootstrap'
import visible from "resources/icons/visible.svg"
import avt from "resources/icons/avt.svg"
import profile from "resources/icons/profile.svg"
import lock from "resources/icons/lock.svg";
import CustomDropdownButton from 'pages/EditReport/components/CustomDropdownButton';
import { GetInformationApi, updateInformation } from "api/Account"
import { useNavigate } from 'react-router-dom'

import { deep_blue_primary } from "../../utils/color"
import "@fontsource/poppins";
import Drop from 'pages/EditReport/components/Drop';
import moment from 'moment';
import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"
import people_default from "resources/icons/people_default.svg"
import edit_grey from "resources/icons/edit_grey.svg";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

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

    const submitUpdate = () => {
        console.log("chạy hàm update")
        // console.log(
        //     {
        //         "UserName": information.UserName,
        //         "RankAccount": information.RankAccount,
        //         "Avatar": "",
        //         "OverView": information.OverView,
        //         "Company": information.Company,
        //         "Gender": information.Gender,
        //         "Address": information.Address,
        //         "Birthday": "2000-12-04"
        //     })
        updateInformation(
            {
                "UserName": information.UserName,
                "RankAccount": information.RankAccount,
                "Avatar": information.Avatar,
                "OverView": information.OverView,
                "Company": information.Company,
                "Gender": information.Gender,
                "Address": information.Address,
                "Birthday": moment(information.Birthday).format("YYYY-MM-DD")
            }
        )
            .then((res) => {
                console.log(res.data)

                localStorage.setItem("username", information.UserName)
                Store.addNotification(content("Success", "Updated information", "success"))
                setTimeout(() => window.location.reload(), 1000);
                return
            })
            .catch((e) => {
                Store.addNotification(content("Fail", e.response.data, "danger"))
                return
            })

    }


    const onChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            setinformation({
                ...information, Avatar: e.target.result
            })
            //console.log("img data", e.target.result)
        }
    }

    const [pressEdit, setPressEdit] = useState(false)

    //}
    return (
        <div>
            <h3 class="mt-3 mb-3 ms-5" style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> Profile:</h3>
            <div class="row rounded bg-white p-4 m-4" style={{ height: 750 }}>
                <div class="col-2 me-5 ms-4 justify-content-center ">

                    <div class="mb-4 ms-5 mt-3" >
                        {/* <img src={information.Avatar}  style={{ "border-radius": "50%" }} alt={avt} /> */}
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <img className='rounded-circle p-2' height="50px" width="50px"
                                    style={{ "backgroundColor": "#E5E5E5" }}
                                    onClick={() => { setPressEdit(true) }} src={edit_grey}
                                />
                            }
                        >
                            <img className='rounded-circle' height="200px" width="200px" src={information.Avatar} />
                        </Badge>

                    </div>
                    {pressEdit === true ?
                        <div>
                            <Form.Group controlId="formFile" className="ms-3" onChange={(e) => onChange(e)}>
                                {/* <Form.Label>Default file input example</Form.Label> */}
                                <Form.Control type="file" />
                            </Form.Group>
                            {/* <input type="file" name="file"  /> */}

                        </div>
                        : < div class="mt-2 ms-5 ">
                            <button class=" btn sm mt-2 ms-4 p-3" type="button" style={{ color: "white", backgroundColor: "#FF7F0D", borderRadius: "30px ", fontSize: 14 }} onClick={() => navigate("/account/changePassword")}>
                                Change Password
                            </button>
                        </div>
                    }

                </div>
                <div class="ms-5 col-8">
                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontSize: 14 }} >User name</Form.Label>
                            <Col sm="5" onChange={(e) => {
                                setinformation({
                                    ...information, UserName: e.target.value
                                })
                            }}>
                                <Form.Control type="text" value={information.UserName} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontSize: 14 }} >Email</Form.Label>
                            <Col sm="5" onChange={(e) => {
                                setinformation({
                                    ...information, Email: e.target.value
                                })
                            }}>
                                <Form.Control type="text" value={information.Email} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class="d-md-flex justify-content-start align-items-center py-2 mt-1 mb-1">
                        <div class="mb-0 me-4" style={{ fontSize: 14 }}>Gender: </div>

                        <Form.Check
                            onClick={(e) => {
                                setinformation({
                                    ...information, Gender: "Male"
                                })

                                console.log(information);
                            }}
                            inline
                            label="Male"
                            checked={information.Gender === "Male" ? true : false}
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
                            checked={information.Gender === "Female" ? true : false}
                        />
                    </div>
                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontSize: 14 }} >Birthday</Form.Label>
                            <Col sm="5">
                                <Form.Group controlId="duedate">
                                    <Form.Control
                                        type="date"
                                        name="duedate"
                                        value={moment(information.Birthday).format("YYYY-MM-DD")}
                                        onChange={(e) => {
                                            setinformation({
                                                ...information, Birthday: e.target.value
                                            })
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </div>

                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontSize: 14 }} >Company</Form.Label>
                            <Col sm="5" onChange={(e) => {
                                setinformation({
                                    ...information, Company: e.target.value
                                })
                            }}>
                                <Form.Control type="text" value={information.Company} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontSize: 14 }} >Address</Form.Label>
                            <Col sm="5" onChange={(e) => {
                                setinformation({
                                    ...information, Address: e.target.value
                                })
                            }}>
                                <Form.Control type="text" value={information.Address} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class=" justify-content-start align-content-center py-2">
                        <Form.Group as={Row} c controlId="formPlaintextPassword">
                            <Form.Label column sm="1" style={{ fontSize: 14 }}>
                                Position:
                            </Form.Label>
                            <Col className='mt-2' sm="5" >
                                <h5 style={{ fontSize: "15px" }}>{information.Position}</h5>
                            </Col>
                        </Form.Group>
                    </div>
                    <div className='d-flex align-items-center justify-content-between ms-5'>
                        <button class=" btn btn-primary p- btn-lg mt-4 ms-5 ms-5" type="button" style={{ backgroundColor: "#034078", borderRadius: "30px ", fontSize: 14 }} onClick={() => {
                            submitUpdate()
                        }}>Save Changes</button>
                    </div>



                </div>

            </div>





        </div >
    )
}
