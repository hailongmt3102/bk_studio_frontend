import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'

import { Roboto, Poppins } from "utils/font"
import {createNewProject} from 'api/Project'


const orangeStyle = {
    color: "black",
    fontFamily:Poppins
}

export default function NewProjectModel(props) {


    const [projectInfo, setProjectInfo] = useState({
        Name: "Project name",
        StartTime: "",
        PredictEndtime: "",
        NumOfMember: 1,
        Description: "",
        Status: "Draft"
    })
    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date());


    // when click submit button
    const onsubmit = () => {
        // check input field
        if ([projectInfo.Name, projectInfo.StartTime, projectInfo.PredictEndtime].includes("") || isNaN(projectInfo.NumOfMember)){
            alert("Some field is required")
            return
        }else if (projectInfo.Name === "Project name"){
            alert("Please write new project name")
            return
        }else if (projectInfo.NumOfMember < 0) {
            alert("Num of member must be positive number")
            return
        }

        var info = {
            ...projectInfo, 
            StartTime : projectInfo.StartTime + " 00:00:00",
            PredictEndtime : projectInfo.PredictEndtime + " 00:00:00",
        }

        createNewProject(info)
        .then(res => {
            props.handleClose()
            alert("Successful")
            props.onComplete()
        })
        .catch(err => {
            alert(err.response.data)
        })
        
    }
    const body = () => {
        return (
            <div>
                <Form>
                    <Form.Control type="text" value={projectInfo.Name}  onChange = {(event) => {
                        setProjectInfo({...projectInfo, Name: event.target.value})
                    }}
                    className="text-primary border-0 mb-2"
                    style={{
                        fontSize : "30px",
                        fontFamily: Poppins
                    }}
                    />

                    <Form.Group controlId="duedate" className='mt-4'>
                        <Form.Label> 
                            <div className='d-flex flex-row'>
                                <img src={ClockSvg} width="30px" height="30px" color='black'/>
                                <div style={orangeStyle} className="ms-4">
                                    Start time: <strong className='text-danger'>*</strong>
                                </div>
                            </div>
                        </Form.Label>
                        <Form.Control
                            type="date"
                            name="duedate"
                            placeholder="Due date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                setProjectInfo({
                                    ...projectInfo, StartTime: e.target.value
                                })
                                console.log(projectInfo)
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="duedate" className='mt-4'>
                        <Form.Label> 
                            <div className='d-flex flex-row'>
                                <img src={ClockSvg} width="30px" height="30px"/>
                                <div style={orangeStyle} className="ms-4">
                                    Predict end time: <strong className='text-danger'>*</strong>
                                </div>
                            </div>
                        </Form.Label>
                        <Form.Control
                            type="date"
                            name="duedate"
                            placeholder="Due date"
                            value={date1}
                            onChange={(e) => {
                                setDate1(e.target.value);
                                setProjectInfo({
                                    ...projectInfo, PredictEndtime: e.target.value
                                })
                            }}
                        />
                    </Form.Group>
                    
                    <Form.Group controlId="duedate" className='mt-4'>
                        <Form.Label> 
                            <div className='d-flex flex-row'>
                                <img src={MemberSvg} width="30px" height="20px"/>
                                <div style={orangeStyle} className="ms-4">
                                    Num of member: <strong className='text-danger'>*</strong>
                                </div>
                            </div>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={projectInfo.NumOfMember}   
                            onChange={(e) => {
                                setProjectInfo({
                                    ...projectInfo, NumOfMember: parseInt(e.target.value)   
                                })
                                console.log(projectInfo)
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="duedate" className='mt-4'>
                        <Form.Label> 
                            <div className='d-flex flex-row'>
                                <img src={ClockSvg} width="30px" height="30px"/>
                                <div style={orangeStyle} className="ms-4">
                                    Description:
                                </div>
                            </div>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={projectInfo.Description}
                            onChange={(e) => {
                                setProjectInfo({
                                    ...projectInfo, Description: e.target.value
                                })
                            }}
                        />
                    </Form.Group>
                </Form>
            </div>
        )
    }
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            // fullscreen={true}
            size="lg"
        >
            <Modal.Header closeButton>
                {/* <Modal.Title>Data processing</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                {
                    body()
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    onsubmit()
                }}>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
