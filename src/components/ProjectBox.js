import React, { useState } from 'react';
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
import CustomDropdownButton from 'pages/EditReport/components/CustomDropdownButton';
import { Roboto, Poppins } from "utils/font"
import { changeStatus, deleteProject, renameProject } from 'api/Project'


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
    })

    const navigate = useNavigate()
    const ChangeStatatusSubmit = () => {

        changeStatus(newProject)
            .then((res) => {

                // alert('Changed Status');
            })
            .catch((e) => {
                alert(e.response.data);
            })

    }
    const DeleteProjectSubmit = () => {

        deleteProject({
            Id: props.data.Id
        })
            .then((res) => {
                window.location.reload()
                alert('Deleted project ID: ' + props.data.Id);

            })
            .catch((e) => {
                alert(e.response.data);
            })

    }
    // const RenameProjectSubmit = () => {

    //     renameProject(projectInformation)
    //         .then((res) => {
    //         })
    //         .catch((e) => {
    //             alert(e.response.data);
    //         })


    // }
    return (
        <div className='shadow pb-2 pt-1 mb-5 bg-body' style={{ width: "430px", borderRadius: "20px" }}>
            <div className='mt-1 p-2'>
                <div className='d-flex justify-content-between'>
                    <ThreeDotButton title={'adđ'} items={option_list} icons_list={icons_list} icon={three_dot} onClick={(val) => {
                        if (val === 'Delete Project')
                            DeleteProjectSubmit()
                        else {
                            setpressEdit(true)
                            //RenameProjectSubmit()
                        }
                    }} />
                    <DropdownWithIndex0 title={newProject.Status} items={status_list} icons_list={staus_icon_list} onClick={(val) => {
                        setNewProject({
                            ...newProject, Status: val
                        })
                        ChangeStatatusSubmit();
                    }} />

                </div>
                {
                    pressEdit === false ?
                        <h3 className='d-flex justify-content-center' style={{ color: "#0085FF", fontFamily: Poppins, fontSize: "45px" }}>
                            {props.data.Name}
                        </h3>
                        : <div className='text-center  justify-content-center align-item-center d-flex'>
                            <Form.Control type="text" value={projectInformation.Name} onChange={(event) => {
                                setprojectInformation({ ...projectInformation, Name: event.target.value })
                            }}
                                className="text-primary border-0 mb-2"
                                style={{
                                    fontSize: "30px",
                                    fontFamily: Poppins
                                }}
                            />
                            {/* <Form.Group as={Col} md="8" controlId="validationCustomUsername">
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend" onClick={(val) => {
                                        RenameProjectSubmit();
                                    }}><img src={save_icon}></img></InputGroup.Text>
                                    <Form.Control
                                        onChange={(e) => {
                                            setprojectInformation({
                                                ...projectInformation, Name: e.target.value
                                            })
                                        }}
                                        placeholder={props.data.Name}
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                </InputGroup>
                            </Form.Group> */}
                        </div>
                }

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
                                <div style={orangeStyle}>Estimated End Time:</div>
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
        </div>
    );
}
