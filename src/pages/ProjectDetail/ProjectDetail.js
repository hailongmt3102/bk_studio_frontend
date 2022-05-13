import { useEffect, useState, useContext } from 'react'
import { Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { getListPeopleByProjectID } from '../../api/People'

import { GetDataSourcesListInformationInProject } from 'api/DataSources'
import { canUpdatePermission, editProject, getInformationByPId } from "api/Project"
import PeopleCard from "components/PeopleCard/PeopleCard"
import moment from 'moment'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { Store } from 'react-notifications-component'
import add_people from "resources/icons/add_people.svg"
import ClockSvg from 'resources/icons/clock.svg'
import delete_icon from "resources/icons/delete.svg"
import download_blue from "resources/icons/download_blue.svg"
import edit from "resources/icons/edit.svg"
import file_orange from "resources/icons/file_orange.svg"
import sendTo from "resources/icons/sendto.svg"
import share_blue from "resources/icons/share_blue.svg"
import MemberSvg from 'resources/icons/two_people.svg'
import { content } from "utils/notification"
import DataSourceBox from '../../pages/DataSources/component/DataSourceBox'
import { deep_blue_primary } from "../../utils/color"
import ShareDataSourcesPopUp from "../DataSources/component/ShareDataSourcesPopUp"
import PeoplePopup from './components/PeoplePopup'
import RolePopUp from './components/RolePopUp'

import { loadingContext } from 'App'

export default function ProjectDetail() {
    const setIsLoading = useContext(loadingContext)
    let getEmail = localStorage.getItem("email") || ""
    var location = useLocation()

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
        setIsLoading(true)
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
                Store.addNotification(content("Fail", err.response.data, "danger"))
                return
            })
        GetDataSourcesListInformationInProject({ PId: project_id })
            .then(res => {
                let result = res.data.filter(d => d.Type != "Workspace")
                setDatasourceslist(result)
                console.log(result)
            })
            .catch(err => {
                console.log(err)
                Store.addNotification(content("Fail", err.response.data, "danger"))
                return
            })
        getListPeopleByProjectID(project_id)
            .then(response => {
                //console.log(response.data)
                setPeopleListInProject(response.data)
                setIsLoading(false)
            })
            .catch(
                error => {
                    setIsLoading(false)
                    Store.addNotification(content("Fail", error.response.data, "danger"))
                    return

                }
            )
    }, [project_id])



    const [datasourceslist, setDatasourceslist] = useState([])

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
            {
                datasourceslist.length === 0 ?
                    <div className='row m-0 p-0 mt-3' >
                        <div className=' col-10' style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>Data Sources:</div>
                        <div className='bg-white' style={{ height: "300px" }}>
                        </div>
                    </div>
                    :
                    <div className='row m-0 p-0 mt-3' >
                        <div className=' col-10' style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>Data Sources:</div>
                        <div className='bg-white' style={{ minheight: "300px" }}>
                            <ScrollMenu>
                                {datasourceslist.map((ele, index) => (
                                    <div className='ms-4 mt-5 mb-5' style={{ minWidth: "400px" }}>
                                        <div className='pb-2'>
                                            <DataSourceBox
                                                option_list={option_list}
                                                icon_list={icon_list}
                                                setDatasourceslist={setDatasourceslist}
                                                datasourceslist={datasourceslist}
                                                showSharePopUpHandle={showSharePopUpHandle}
                                                ele={ele}
                                                index={index}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </ScrollMenu>
                        </div>
                    </div>

            }







        </div >
    }

    const peopleComponent = () => {
        return <div>
            <div className='rounded-5 bg-white'>
                <div className='row m-0 p-0 bg-light'>
                    <div className='col-4 m-0 p-0 '>
                        <div className='m-2 p-2 bg-white' style={{ height: "100%" }}>
                            <h1 className='row customFontBold SecondFontColor m-0 p-2'>Manager</h1>
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
                        <div className='m-2 p-2 bg-white' style={{ height: "100%" }}>
                            <h1 className=' m-0 p-2 customFontBold SecondFontColor'>Member</h1>
                            <div className='row m-0 p-0'>{
                                peopleInProject.map((ele) => {
                                    if (ele.Position !== "Member") return null
                                    return <div class="col-4 m-0 p-0" >
                                        {ele.Email !== getEmail ?
                                            <PeopleCard
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
                                                    Store.addNotification(content("Fail", "You can't edit member's role because you also are member position", "danger"))

                                                }}
                                                getEmail={() => {
                                                    setEmail(ele.Email)
                                                }}
                                            /> : <PeopleCard
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
                                                    Store.addNotification(content("Fail", "You can't edit member's role because you also are member position", "danger"))
                                                }}
                                                getEmail={() => {
                                                    setEmail(ele.Email)
                                                }}

                                            />
                                        }
                                    </div>
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
                Store.addNotification(content("Fail", e.response.data, "danger"))
                return

            })


    }
    const aboutComponent = () => {
        return <div>
            <div className='row m-0 p-0 mt-3' >
                <div className=' col-10' style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>About:</div>
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
                <h2 class="col-10  m-0 p-0" style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>
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
