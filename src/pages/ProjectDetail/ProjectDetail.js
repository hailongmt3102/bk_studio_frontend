import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { getListPeopleByProjectID } from '../../api/People'

import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import add_people from "resources/icons/add_people.svg"
import sendTo from "resources/icons/sendto.svg"
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
import { editProject, canUpdatePermission } from 'api/Project'
import DataSourceBox from '../../pages/DataSources/component/DataSourceBox'
import { Rename, SendToWorkspace, deleteDatasource, GetDataSourcesListInformationInProject } from 'api/DataSources'
import edit from "resources/icons/edit.svg"
import delete_icon from "resources/icons/delete.svg"
import download_blue from "resources/icons/download_blue.svg"
import share_blue from "resources/icons/share_blue.svg"
import excel_icon from "resources/icons/excel_icon.svg"
import ShareDataSourcesPopUp from "../DataSources/component/ShareDataSourcesPopUp"
import three_dot from "resources/icons/three-dot.svg"
import ThreeDotButton from 'components/ThreeDotButton'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';


export default function ProjectDetail() {
    let getEmail = localStorage.getItem("email") ?? ""
    var location = useLocation()
    var navigate = useNavigate()

    const currentProject = localStorage.getItem("currentProject")
    const [showSharePopUp, setshowSharePopUp] = useState(false)
    const [DId, setDId] = useState(-1)
    const showSharePopUpHandle = (DId) => {
        setshowSharePopUp(true)
        setDId(DId)
    }
    const array = location.pathname.split("/");
    var project_id = array[array.length - 1]
    const [peopleInProject, setPeopleListInProject] = useState([])
    const [showPeoplePopUp, setshowPeoplePopUp] = useState(false)
    const orangeStyle = {
        color: "#FF7F0D",
        fontWeight: "bold",
        fontSize: "17px"
    }
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

    useEffect(() => {
        GetDataSourcesListInformationInProject({ PId: project_id })
            .then(res => {
                let result = res.data.filter(d => d.Type != "Workspace")
                setDatasourceslist(result)
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


    }, [])
    const option_list = ["Send to Workspace", "Rename", "Share", "Download", "Delete"]
    const icon_list = [sendTo, edit, share_blue, download_blue, delete_icon]
    const dataSourcesComponent = () => {
        return <div>
            <ShareDataSourcesPopUp
                type="ProjectDetail"
                currentProject={currentProject}
                show={showSharePopUp}
                handleOpen={() => {
                    setshowSharePopUp(true)
                }}
                handleClose={() => {
                    setshowSharePopUp(false)
                }}
                DId={DId}

            />

            <div className='row m-0 p-0 mt-3' >
                <div className=' col-10' style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>Data Sources:</div>
                <div className='m-3 p-4 bg-white' style={{ minheight: "300px" }}>
                    <ScrollMenu>
                        {datasourceslist.map((ele, index) => (
                            <DataSourceBox
                                option_list={option_list}
                                icon_list={icon_list}
                                setDatasourceslist={setDatasourceslist}
                                datasourceslist={datasourceslist}
                                ele={ele}
                                index={index}
                                showSharePopUpHandle={showSharePopUpHandle} />
                        ))}
                    </ScrollMenu>
                </div>
            </div>





        </div >
    }

    const peopleComponent = () => {
        return <div>
            <div className='rounded-5 bg-white'>
                <div className='row m-0 p-0 bg-light'>
                    <div className='col-4 m-0 p-0 '>
                        <div className='m-4 p-4 bg-white' style={{ height: "100%" }}>
                            <h1 className='row ' style={{ color: blue_cloud, "font-weight": "bold" }}>Manager</h1>
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
                            <h1 style={{ color: blue_cloud, "font-weight": "bold" }}>Member</h1>
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
                                                getEmail={() => {
                                                    setEmail(ele.Email)
                                                }}

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
                                            getEmail={() => {
                                                setEmail(ele.Email)
                                            }}
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

    const EditProjectSubmit = () => {
        editProject(project_id, {
            ...projectInformation,
            StartTime: projectInformation.StartTime.substring(0, 10),
            PredictEndtime: projectInformation.PredictEndtime.substring(0, 10)
        })
            .then((res) => {
                Store.addNotification(content("Success", "Edited Project successful", "success"))
                setTimeout(() => window.location.reload(), 1000);
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
                <div className=' col-10' style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>About:</div>
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
            <div className='m-3 p-4  bg-white' style={{ height: "250px" }}>
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
                                <div className='col-1 m-auto  m-0 p-0'>
                                    <img src={MemberSvg} height="25px" />
                                </div>
                                <div className='col-3 m-auto m-0 p-0' style={{ "text-align": "left" }} >
                                    <div className='ms-2'>
                                        <div style={orangeStyle}>Joined member :</div>
                                    </div>
                                </div>
                                <div className='col-7 m-auto  m-0 p-0 text-start'  >
                                    <div>{projectInformation.NumOfMember}</div>
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
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                        <Form.Control as="textarea" rows={6} style={{ "overflow": "auto", "resize": "none" }} value={projectInformation.Description} onChange={(event) => {
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
    return <div>
        <div>
            <PeoplePopup
                show={showPeoplePopUp}
                handleClose={() => {
                    setshowPeoplePopUp(false)
                }}
                onComplete={() => {
                    //setAppendPeopleList(appendPeopleList + 1)
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
                <h2 class="col-10  m-0 p-0" style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>
                    <div className='ms-4'>My team:</div>
                </h2>
                <div className='col-2 ml-auto m-0 p-0 text-right align-self-end'>
                    <button class=" btn p-3 ms-5 " type="button" style={{ color: "white", backgroundColor: deep_blue_primary, borderRadius: "30px ", fontSize: 16 }} onClick={() => {
                        setshowPeoplePopUp(true)
                        //inviteMemberSubmit()
                    }}><div className='d-flex'>
                            <div className='d-flex justify-content-center me-2' style={{ color: "white", fontSize: 17 }}>Invite People</div>
                            <div className='d-flex justify-content-center'><img src={add_people} height="20px" width="20px" /></div>
                        </div>
                    </button>
                </div>

            </div>
            {peopleComponent()}

        </div>

    </div>;
}
