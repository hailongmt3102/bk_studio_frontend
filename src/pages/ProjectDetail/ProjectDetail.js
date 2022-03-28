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
import { updateStatus, deleteProject, editProject, canUpdatePermission } from 'api/Project'


import add_round from "resources/icons/add_round.svg"
import edit from "resources/icons/edit.svg"
import delete_icon from "resources/icons/delete.svg"
import download_blue from "resources/icons/download_blue.svg"
import share_blue from "resources/icons/share_blue.svg"
import excel_icon from "resources/icons/excel_icon.svg"

import three_dot from "resources/icons/three-dot.svg"
import { orange } from "../../utils/color"
import ThreeDotButton from 'components/ThreeDotButton'



import { GetDataSourcesListInformation } from '../../api/DataSources'
export default function ProjectDetail() {
    let getEmail = localStorage.getItem("email") ?? ""
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

    const [peopleCanEditRoleList, setPeopleCanEditRoleList] = useState(false)
    useEffect(() => {
        getInformationByPId(project_id)
            .then(response => {
                //console.log(response.data)
                setprojectInformation(response.data)
            })
            .catch(
                error => {
                }
            )
        canUpdatePermission(project_id)
            .then(res => {
                setPeopleCanEditRoleList(true)
            })
            .catch(err => {
                setPeopleCanEditRoleList(false)
            })
    }, [])

    const [datasourceslist, setDatasourceslist] = useState([])
    const option_list = ["Share", "Edit", "Download", "Delete"]
    useEffect(() => {
        //console.log("Lấy data nè")
        // get list people
        GetDataSourcesListInformation()
            .then(res => {
                setDatasourceslist(res.data)
                //console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

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
                            <div class="p-2 col-1"> {
                                peopleInProject.map((ele, index) => {
                                    if (ele.Email === getEmail) {
                                        if (ele.Position !== "Manager") return null
                                        else {
                                            return <PeopleCard
                                                position={ele.Position}
                                                name={ele.UserName}
                                                email={ele.Email}
                                                avatar={ele.Avatar}
                                                rank={ele.RankAccount}
                                                birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                                gender={ele.Gender}
                                                isManager={true}
                                                showThreeDotButton={false}
                                                isMe={true}
                                                peopleCanEditRoleList={peopleCanEditRoleList}
                                                setshowRolePopUp={() => { setshowRolePopUp(true) }}
                                                setdontshowRolePopUp={() => { setshowRolePopUp(false) }}
                                            />
                                        }
                                    }
                                    else {
                                        if (ele.Position !== "Manager") return null
                                        return <div class="col"> <PeopleCard
                                            position={ele.Position}
                                            name={ele.UserName}
                                            email={ele.Email}
                                            avatar={ele.Avatar}
                                            rank={ele.RankAccount}
                                            birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                            gender={ele.Gender}
                                            isManager={true}
                                            showThreeDotButton={false}
                                            isMe={false}
                                            peopleCanEditRoleList={peopleCanEditRoleList}
                                            setshowRolePopUp={() => { setshowRolePopUp(true) }}
                                            setdontshowRolePopUp={() => { setshowRolePopUp(false) }}
                                        />
                                        </div>

                                    }

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
                                    if (ele.Email === getEmail) {
                                        if (ele.Position !== "Member") return null
                                        else {
                                            return <PeopleCard
                                                project_id={project_id}
                                                position={ele.Position}
                                                name={ele.UserName}
                                                email={ele.Email}
                                                avatar={ele.Avatar}
                                                rank={ele.RankAccount}
                                                birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                                gender={ele.Gender}
                                                isManager={false}
                                                showThreeDotButton={true}
                                                isMe={true}
                                                peopleCanEditRoleList={peopleCanEditRoleList}
                                                setshowRolePopUp={() => {
                                                    setshowRolePopUp(true)
                                                }}
                                                setdontshowRolePopUp={() => {
                                                    setshowRolePopUp(false)
                                                    Store.addNotification(content("Warning", "You don't edit member's role because you also are member position", "warning"))
                                                }}
                                                getEmail = {()=>{setEmail(ele.Email)}}

                                            />
                                        }
                                    }
                                    else {
                                        if (ele.Position !== "Member") return null
                                        return <div class="col"> <PeopleCard
                                            project_id={project_id}
                                            position={ele.Position}
                                            name={ele.UserName}
                                            email={ele.Email}
                                            avatar={ele.Avatar}
                                            rank={ele.RankAccount}
                                            birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                            gender={ele.Gender}
                                            isManager={false}
                                            showThreeDotButton={true}
                                            isMe={false}
                                            peopleCanEditRoleList={peopleCanEditRoleList}
                                            setshowRolePopUp={() => {
                                                setshowRolePopUp(true)
                                            }}
                                            setdontshowRolePopUp={() => {
                                                setshowRolePopUp(false)
                                                Store.addNotification(content("Warning", "You don't edit member's role because you also are member position", "warning"))

                                            }}
                                            getEmail = {()=>{setEmail(ele.Email)}}
                                        />
                                        </div>

                                    }


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
        return <div>
            <div className='row m-0 p-0 mt-3' >
                <div className=' col-10' style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>About:</div>
                <div className='col-2 m-0 p-0 m-auto text-right align-self-end'>
                    <div className='ms-3'>
                        <button class="btn btn-primary btn-lg ms-5 p-3 "
                            onClick={() => { EditProjectSubmit() }}
                            type="button"
                            style={{ backgroundColor: deep_blue_primary, borderRadius: "30px" }}
                        >
                            Save change
                        </button>
                    </div>
                </div>
            </div>
            <div className='m-3 p-4  bg-white' style={{ height: "350px" }}>
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
                                <div className='col-1  m-0 p-0'>
                                    <img src={file_orange} height="24px" width="22px" />
                                </div>
                                <div className='col-2 m-0 p-0' style={{ "text-align": "left" }} >
                                    <div className='ms-2'>
                                        <div style={orangeStyle}>Description :</div>
                                    </div>
                                </div>
                                <div className='col-8  m-0 p-0' >
                                    {/* <Form.Control componentClass="textarea" type="text" 
                                    /> */}
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                        <Form.Control as="textarea" rows={6} value={projectInformation.Description} onChange={(event) => {
                                            setprojectInformation({ ...projectInformation, Description: event.target.value })
                                        }} />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>



        </div>
    }
    const dataSourcesComponent = () => {
        return <div>
            <div className='row m-0 p-0 mt-3' >
                <div className=' col-10' style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>Data Sources:</div>
            </div>
            <div className='m-3 p-4  bg-white' style={{ height: "350px" }}>
                <div className='row'>
                    {
                        datasourceslist.map((ele) => {
                            return <div className='col-3 ms-4 mt-3 pt-2 mb-5' style={{ "height": "200px", width: "400px", "border-radius": "20px", "backgroundColor": "#F7F7F7" }}>
                                <div className='row ms-3' style={{ "paddingLeft": "310px" }}>
                                    <ThreeDotButton title={'adđ'}
                                        items={option_list}
                                        icon={three_dot}
                                        icons_list={[share_blue, edit, download_blue, delete_icon]}
                                        onClick={(val) => { }} />
                                </div>
                                <div className="row m-0 p-0">
                                    <div className="col-2 m-0 p-0 d-flex" style={{ fontFamily: "Roboto" }}>
                                        <img className='ms-4' src={excel_icon} />
                                    </div>
                                    <div class="col-10 m-0 p-0 text-center" style={{ fontFamily: "Roboto" }}>
                                        <div class="row m-0 p-0 ms-2" style={{ fontFamily: "Roboto", color: blue_cloud }}>
                                            <h3>{ele.Information}</h3>
                                        </div>
                                        <div class="row  m-0 p-0 mt-1" style={{ fontFamily: "Roboto" }}>
                                            <p><span style={{ "color": "#868585" }}>date created: </span>{ele.CreateTime}</p>
                                        </div>
                                        <div class="row m-0 p-0" style={{ fontFamily: "Roboto" }}>
                                            <p><span style={{ "color": "#868585" }}>last modified: </span>{ele.LastModified}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })

                    }
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
                {dataSourcesComponent()}
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
