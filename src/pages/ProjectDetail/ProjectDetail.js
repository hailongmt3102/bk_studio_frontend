import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Col, Button, FormControl } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { getListPeopleByProjectID } from '../../api/People'
import { inviteMember } from '../../api/Project'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import add_people from "resources/icons/add_people.svg"
import file_orange from "resources/icons/file_orange.svg"
import PeopleCard from "components/PeopleCard/PeopleCard"
import { getInformationByPId } from "api/Project"
import PeoplePopup from './components/PeoplePopup'
import RolePopUp from './components/RolePopUp'
import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'
import moment from 'moment';
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
import { updateStatus, deleteProject, editProject } from 'api/Project'
export default function ProjectDetail() {

    var location = useLocation()
    var navigate = useNavigate()
    const array = location.pathname.split("/");
    var project_id = array[array.length - 1]
    const [peopleInProject, setPeopleListInProject] = useState([])
    const [showPeoplePopUp, setshowPeoplePopUp] = useState(false)
    const [appendPeopleList, setAppendPeopleList] = useState(0)
    const [showRolePopUp, setshowRolePopUp] = useState(false)
    const timeCaster = (time) => {
        return time.substring(0, 19).replace('T', " ")
    }

    const [email, setEmail] = useState("")
    const [projectInformation, setprojectInformation] = useState({
        Name: "",
        StartTime: "",
        PredictEndtime: "",
        NumOfMember: "",
        Description: ""
    })

    useEffect(() => {
        getInformationByPId(project_id)
            .then(response => {
                console.log(response.data)
                setprojectInformation(response.data)
            })
            .catch(
                error => {
                }
            )


    }, [])


    useEffect(() => {
        getListPeopleByProjectID(project_id)
            .then(response => {
                //console.log(response.data)
                setPeopleListInProject(response.data)
            })
            .catch(
                error => {
                }
            )


    }, [appendPeopleList])

    const peopleComponent = () => {
        return <div>
            <div className='rounded-5 bg-white'>
                <div className='row m-0 p-0 bg-light'>
                    <div className='col-4 m-0 p-0 '>
                        <div className='m-4 p-4 bg-white' style={{ height: "100%" }}>
                            <h1 className='row ' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Manager</h1>
                            <div class="p-2"> {
                                peopleInProject.map((ele, index) => {
                                    if (ele.Position !== "Manager") return null
                                    return <div class="d-flex p-2">
                                        <PeopleCard
                                            onClick={() => {
                                            }}
                                            getEmail={() => setEmail(ele.Email)}
                                            setshowRolePopUp={() => setshowRolePopUp(true)}
                                            name={ele.UserName}
                                            email={ele.Email}
                                            avatar={ele.Avatar}
                                            rank={ele.RankAccount}
                                            birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                            gender={ele.Gender}
                                            isManager={true}
                                        />
                                    </div>
                                })
                            }
                            </div>
                        </div>
                    </div>
                    <div className='col-8 m-0 p-0' >
                        <div className='m-4 p-4 bg-white' style={{ height: "100%" }}>
                            <h1 style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Member</h1>
                            <div className='row ms-3'>{
                                peopleInProject.map((ele, index) => {
                                    if (ele.Position !== "Member") return null
                                    return <PeopleCard
                                        className="col"
                                        onClick={() => {
                                        }}
                                        getEmail={() => setEmail(ele.Email)}
                                        setshowRolePopUp={() => setshowRolePopUp(true)}
                                        setdontshowRolePopUp={() => setshowRolePopUp(false)}
                                        name={ele.UserName}
                                        email={ele.Email}
                                        rank={ele.RankAccount}
                                        avatar={ele.Avatar}
                                        birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                        gender={ele.Gender}
                                        isManager={false}
                                    />
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    const orangeStyle = {
        color: "#FF7F0D",
        fontWeight: "bold",
        fontFamily: Poppins,
        fontSize: "17px"
    }
    const EditProjectSubmit = () => {
        editProject(project_id, {
            ...projectInformation,
            StartTime: projectInformation.StartTime.substring(0, 10),
            PredictEndtime: projectInformation.PredictEndtime.substring(0, 10)
        })
            .then((res) => {
                // Store.addNotification(content("Success", "Edited Project successful", "sucess"))
                window.location.reload()
            })
            .catch((e) => {
                //console.log(e.response)
                Store.addNotification(content("Warning", e.response.data, "danger"))
                return
                // alert(e.response.data);
            })


    }
    const aboutComponent = () => {
        return <div><h2 class="col-10  m-0 p-0" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>
            <div className='ms-4'>About:</div>
        </h2>
            <div className='m-3 p-4  bg-white' style={{ height: "300px" }}>
                <div className='row m-0 p-0'>
                    <div className='col-6'>
                        <div className='m-3 m-0 p-0'>
                            <div class=" row text-center m-0 p-0">
                                <div className='col-1 m-auto  m-0 p-0'>
                                    <img src={ClockSvg} height="25px" />
                                </div>
                                <div className='col-3 m-auto m-0 p-0' style={{ "text-align": "left" }} >
                                    <div className='ms-2'>
                                        <div style={orangeStyle}>Start time:</div>
                                    </div>
                                </div>
                                <div className='col-7 m-auto  m-0 p-0' >
                                    <Form.Group controlId="duedate">
                                        <Form.Control
                                            type="date"
                                            name="duedate"
                                            placeholder=""
                                            value={moment(projectInformation.StartTime).format("YYYY-MM-DD")}
                                            onChange={(e) => {
                                                setprojectInformation({ ...projectInformation, StartTime: e.target.value.substring(0, 10) })
                                            }}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div className='m-3 m-0 p-0'>
                            <div class=" row text-center m-0 p-0">
                                <div className='col-1 m-auto  m-0 p-0'>
                                    <img src={ClockSvg} height="25px" />
                                </div>
                                <div className='col-3 m-auto m-0 p-0' style={{ "text-align": "left" }} >
                                    <div className='ms-2'>
                                        <div style={orangeStyle}>Estimated end time:</div>
                                    </div>
                                </div>
                                <div className='col-7 m-auto  m-0 p-0' >
                                    <Form.Group controlId="duedate">
                                        <Form.Control
                                            type="date"
                                            name="duedate"
                                            placeholder=""
                                            value={moment(projectInformation.PredictEndtime).format("YYYY-MM-DD")}
                                            onChange={(e) => {
                                                setprojectInformation({ ...projectInformation, PredictEndtime: e.target.value.substring(0, 10) })
                                            }}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div className='m-3 m-0 p-0'>
                            <div class=" row text-center m-0 p-0">
                                <div className='col-1 m-auto m-0 p-0'>
                                    <img src={MemberSvg} height="24px" width="22px" />
                                </div>
                                <div className='col-3 m-auto m-0 p-0' style={{ "text-align": "left" }} >
                                    <div className='ms-2'>
                                        <div style={orangeStyle}>Joined member :</div>
                                    </div>
                                </div>
                                <div className='col-7 m-auto  m-0 p-0' >
                                    <Form.Control type="text" value={projectInformation.NumOfMember} onChange={(event) => {
                                        setprojectInformation({ ...projectInformation, NumOfMember: event.target.value })
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='m-3 m-0 p-0'>
                            <div class=" row text-center m-0 p-0">
                                <div className='col-1 m-auto m-0 p-0'>
                                    <img src={file_orange} height="24px" width="22px" />
                                </div>
                                <div className='col-2 m-auto m-0 p-0' style={{ "text-align": "left" }} >
                                    <div className='ms-2'>
                                        <div style={orangeStyle}>Description :</div>
                                    </div>
                                </div>
                                <div className='col-8 m-auto m-0 p-0' >
                                    <Form.Control type="text" value={projectInformation.Description} onChange={(event) => {
                                        setprojectInformation({ ...projectInformation, Description: event.target.value })
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center mt-4'><button onClick={() => { EditProjectSubmit() }} type="button" class="btn btn-primary btn-lg">Save</button></div>
                </div>

            </div>



        </div>
    }
    return <div>
        <div>
            <PeoplePopup
                show={showPeoplePopUp}
                handleClose={() => {
                    setshowPeoplePopUp(false)
                }}
                onComplete={() => {
                    setAppendPeopleList(appendPeopleList + 1)
                }}
            />
            <RolePopUp
                PId={project_id}
                show={showRolePopUp}
                Email={email}
                handleClose={() => {
                    setshowRolePopUp(false)
                }}
            />
            <div className='row mt-2 m-0 p-0'>
                {aboutComponent()}
                <h2 class="col-10  m-0 p-0" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>
                    <div className='ms-4'>My team:</div>
                </h2>
                <div className='col-2 ml-auto m-0 p-0 text-right align-self-end'>
                    <button class=" btn p-3 ms-5 " type="button" style={{ color: "white", backgroundColor: deep_blue_primary, borderRadius: "30px ", fontFamily: Poppins, fontSize: 16 }} onClick={() => {
                        setshowPeoplePopUp(true)
                        //inviteMemberSubmit()
                    }}><div className='d-flex'>
                            <div className='d-flex justify-content-center me-2' style={{ color: "white", fontFamily: Poppins, fontSize: 17 }}>Invite People</div>
                            <div className='d-flex justify-content-center'><img src={add_people} height="20px" width="20px" /></div>
                        </div>
                    </button>
                </div>

            </div>
            {peopleComponent()}

        </div>

    </div>;
}
