import "@fontsource/poppins"
import Badge from '@mui/material/Badge'
import { GetInformationApi, updateAvatar, updateInformation } from "api/Account"
import { loadingContext } from 'App'
import moment from 'moment'
import { useContext, useEffect, useRef, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Store } from 'react-notifications-component'
import { useNavigate } from 'react-router-dom'
import edit_grey from "resources/icons/edit_grey.svg"
import avatarDefault from "resources/images/avatar_default.png"
import { deep_blue_primary } from "../../utils/color"
import { content } from "../../utils/notification"

export default function Profile() {
    const setIsLoading = useContext(loadingContext)
    const avatarInputRef = useRef()
    const navigate = useNavigate()
    useEffect(() => {
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
        setIsLoading(true)
        let files = e.target.files;
        updateAvatar(e.target.files[0])
            .then((res) => {
                if (res.data.length > 0)
                    setinformation({ ...information, Avatar: res.data[0].url })
                setIsLoading(false)
            })
            .catch((e) => {
                setIsLoading(false)
                Store.addNotification(content("Warning", e.response.data, "danger"))
                return
            })
    }
    return (
        <div>
            <h3 class="mt-3 mb-3 ms-5 PrimaryFontColor" style={{ "fontWeight": "bold", fontSize: "40px" }}> Profile:</h3>
            <div class="row rounded customforeground p-4 m-4" style={{ height: 750 }}>
                <div class="col-5 m-0 p-0 justify-content-center ">
                    <div class="mb-4 ms-5 mt-3" >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <img className='rounded-circle p-2' height="50px" width="50px"
                                    style={{ "backgroundColor": "#E5E5E5" }}
                                    onClick={() => {
                                        if (avatarInputRef.current) avatarInputRef.current.click()
                                    }}
                                    src={edit_grey}
                                />
                            }
                        >
                            <img
                                className='rounded-circle' height="200px" width="200px"
                                src={information.Avatar}
                                onError={(e) => { e.target.onerror = null; e.target.src = avatarDefault }}
                            />
                        </Badge>

                    </div>
                    < div class="mt-2 ms-5 ">
                        <input type={"file"} ref={avatarInputRef} style={{ display: "none" }} onChange={(e) => { onChange(e) }} />
                        <button class=" btn sm mt-2 ms-4 p-3" type="button" style={{ color: "white", backgroundColor: "#FF7F0D", borderRadius: "30px ", fontSize: 14 }} onClick={() => navigate("/account/changePassword")}>
                            Change Password
                        </button>
                    </div>
                </div>
                <div class="col-7 m-0 p-0">
                    <div class=" justify-content-start align-items-center py-2">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontSize: 14 }} >User name</Form.Label>
                            <Col sm="5" onChange={(e) => {
                                setinformation({
                                    ...information, UserName: e.target.value
                                })
                            }}>
                                <Form.Control type="text" value={information.UserName} onChange={() => { }} />
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
                        <div class="mb-0 me-4 customwhitetext" style={{ fontSize: 14 }}>Gender: </div>

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
                            onChange={() => { }}
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
                            onChange={() => { }}
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
                            <Col className='mt-2 ms-4' sm="5" >
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
