import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Col, Button, FormControl } from 'react-bootstrap'
import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'

import three_dot from "resources/icons/three-dot.svg"
import ThreeDotButton from 'components/ThreeDotButton'
import DropdownWithIndex0 from 'components/DropdownWithIndex0'
import { useNavigate } from 'react-router-dom'
import delete_icon from 'resources/icons/delete.svg'
import save_icon from 'resources/icons/save_icon.svg'
import edit from 'resources/icons/edit.svg'
import active_icon from 'resources/icons/status/active.svg'
import closed_icon from 'resources/icons/status/closed.svg'
import now_icon from 'resources/icons/status/now.svg'

import { Roboto, Poppins } from "utils/font"
import { updateStatus, deleteProject, editProject } from 'api/Project'

import moment from 'moment';

import { Store } from 'react-notifications-component'
import { content } from "../utils/notification"
import ConfirmDialog from "./ConfirmDialog";
const orangeStyle = {
    color: "#FF7F0D",
    fontWeight: "bold",
    fontFamily: Poppins,
    fontSize: "17px"
}


const timeCaster = (time) => {
    return time.substring(0, 19).replace('T', " ")
}


export default function ProjectBox(props) {


    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const option_list = ["Edit Project", "Delete Project"]

    const status_list = ["Draft", "Active", "Closed"]
    const staus_icon_list = [now_icon, active_icon, closed_icon]
    const icons_list = [edit, delete_icon]
    const [newProject, setNewProject] = useState({
        Id: props.data.Id,
        Status: props.data.Status,
    })
    const [pressEdit, setpressEdit] = useState(false)
    const [projectInformation, setprojectInformation] = useState({
        Name: props.data.Name,
        StartTime: props.data.StartTime,
        PredictEndtime: props.data.PredictEndtime,
        NumOfMember: props.data.NumOfMember,
        Description: props.data.Description
    })

    const navigate = useNavigate()

    useEffect(() => {
        //console.log("dô useEffect")
        // get all project
        updateStatus(props.data.Id, { Status: newProject.Status })
            .then((res) => {
            })
            .catch((e) => {
                alert(e.response.data);
            })
    }, [newProject.Status])

    const DeleteProjectSubmit = () => {

        deleteProject(props.data.Id)
            .then((res) => {
                //window.location.reload()
            })
            .catch((e) => {
                Store.addNotification(content("Error", "Delete Fail", "danger"))
                return
            })

    }
    const EditProjectSubmit = () => {
        editProject(props.data.Id, {
            ...projectInformation,
            StartTime: projectInformation.StartTime.substring(0, 10),
            PredictEndtime: projectInformation.PredictEndtime.substring(0, 10)
        })
            .then((res) => {
                window.location.reload()
                alert("Edit thanh cong")
            })
            .catch((e) => {
                console.log(e.response)
                // alert(e.response.data);
            })


    }
    const handleCloseYes = () => {
        DeleteProjectSubmit()
        console.log("close ne")
    }
    const handleCloseNo = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: false })
    }
    const handleOpen = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: true })
    }
    return (
        <div>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                title="Are you sure you want to delete this project?"
                handleCloseYes={() => handleCloseYes()}
                handleCloseNo={() => handleCloseNo()}
            />
            <div className='shadow pb-2 pt-1 mb-5 bg-body' style={{ width: "430px", borderRadius: "20px" }}>
                <div className='mt-1 p-2'  >
                    <div className='d-flex justify-content-between'>
                        <ThreeDotButton items={option_list} icons_list={icons_list} icon={three_dot} onClick={(val) => {
                            if (val === "Edit Project") {
                                setpressEdit(true)
                            }
                            else {
                                handleOpen()
                            }
                        }} />
                        <DropdownWithIndex0 title={newProject.Status} items={status_list} icons_list={staus_icon_list} onClick={(val) => {
                            setNewProject({
                                ...newProject, Status: val
                            })
                            //ChangeStatatusSubmit();
                        }} />
                    </div>
                    {
                        pressEdit === false ?
                            <div onClick={() => { navigate("/pDetail/" + props.data.Id) }}>
                                <h3 className='d-flex justify-content-center' style={{ color: "#0085FF", fontFamily: Poppins, fontSize: "45px" }}>
                                    {props.data.Name}
                                </h3>
                                <div className='m-3 m-0 p-0 mt-3'>
                                    <div class=" row text-center m-0 p-0">
                                        <div className='col-1  m-0 p-0'>
                                            <img src={ClockSvg} height="25px" />
                                        </div>
                                        <div className='col-7 m-0 p-0' style={{ "text-align": "left" }} >
                                            <div className='ms-2'>
                                                <div style={orangeStyle}>  Created at:</div>
                                            </div>
                                        </div>
                                        <div className='col-4  m-0 p-0' >
                                            <div>{timeCaster(props.data.CreateTime).substring(0, 10)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='m-3 m-0 p-0'>
                                    <div class=" row text-center m-0 p-0">
                                        <div className='col-1  m-0 p-0'>
                                            <img src={ClockSvg} height="25px" />
                                        </div>
                                        <div className='col-7 m-0 p-0' style={{ "text-align": "left" }} >
                                            <div className='ms-2'>
                                                <div style={orangeStyle}>Start time :</div>
                                            </div>
                                        </div>
                                        <div className='col-4  m-0 p-0' >
                                            <div>{timeCaster(props.data.StartTime).substring(0, 10)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='m-3 m-0 p-0'>
                                    <div class=" row text-center m-0 p-0">
                                        <div className='col-1  m-0 p-0'>
                                            <img src={ClockSvg} height="25px" />
                                        </div>
                                        <div className='col-7 m-0 p-0' style={{ "text-align": "left" }} >
                                            <div className='ms-2'>
                                                <div style={orangeStyle}>Estimated end time:</div>
                                            </div>
                                        </div>
                                        <div className='col-4  m-0 p-0' >
                                            <div>{timeCaster(props.data.PredictEndtime).substring(0, 10)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='m-3 m-0 p-0'>
                                    <div class=" row text-center m-0 p-0">
                                        <div className='col-1  m-0 p-0'>
                                            <img src={MemberSvg} height="24px" width="22px" />
                                        </div>
                                        <div className='col-7 m-0 p-0' style={{ "text-align": "left" }} >
                                            <div className='ms-2'>
                                                <div style={orangeStyle}>Joined member :</div>
                                            </div>
                                        </div>
                                        <div className='col-4  m-0 p-0' >
                                            <div>{props.data.NumOfMember}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div>
                                <Form.Control type="text" value={projectInformation.Name} onChange={(event) => {
                                    setprojectInformation({ ...projectInformation, Name: event.target.value })
                                }}
                                    className="text-primary border-0 mb-2"
                                    style={{
                                        fontSize: "30px",
                                        fontFamily: Poppins
                                    }}
                                />
                                <div className='m-3 m-0 p-0'>
                                    <div class=" row text-center m-0 p-0">
                                        <div className='col-1  m-0 p-0'>
                                            <img src={ClockSvg} height="25px" />
                                        </div>
                                        <div className='col-6 m-0 p-0' style={{ "text-align": "left" }} >
                                            <div className='ms-2'>
                                                <div style={orangeStyle}>Start time:</div>
                                            </div>
                                        </div>
                                        <div className='col-5  m-0 p-0' >
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
                                        <div className='col-1  m-0 p-0'>
                                            <img src={ClockSvg} height="25px" />
                                        </div>
                                        <div className='col-6 m-0 p-0' style={{ "text-align": "left" }} >
                                            <div className='ms-2'>
                                                <div style={orangeStyle}>Estimated end time:</div>
                                            </div>
                                        </div>
                                        <div className='col-5  m-0 p-0' >
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
                                        <div className='col-1  m-0 p-0'>
                                            <img src={MemberSvg} height="24px" width="22px" />
                                        </div>
                                        <div className='col-6 m-0 p-0' style={{ "text-align": "left" }} >
                                            <div className='ms-2'>
                                                <div style={orangeStyle}>Joined member :</div>
                                            </div>
                                        </div>
                                        <div className='col-5  m-0 p-0' >
                                            <Form.Control type="text" value={projectInformation.NumOfMember} onChange={(event) => {
                                                setprojectInformation({ ...projectInformation, NumOfMember: event.target.value })
                                            }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'><button onClick={() => { EditProjectSubmit() }} type="button" class="btn btn-primary btn-lg">Save</button></div>
                            </div>

                    }
                </div>
            </div>
        </div>
    );
}
