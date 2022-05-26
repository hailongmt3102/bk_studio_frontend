import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, InputGroup } from 'react-bootstrap'
import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'
import { getListProject } from 'api/Project'

import { createNewProject } from 'api/Project'
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
import visible from "resources/icons/visible.svg"
import invisible from "resources/icons/invisible.svg"

import lock from "resources/icons/lock.svg";
import DropdownWithIndex0 from 'components/DropdownWithIndex0'

const orangeStyle = {
    color: "black",
}

export default function NewUserPopup(props) {

    const [newUserInfo, setNewUserInfo] = useState({
        Email: "",
        Password: "",
        UserName: "",
        Position: "Member"
    })
    const [isVisible, setisVisible] = useState(false)
    // useEffect(() => {
    //     setProjectInfo({ ...projectInfo, Name: `Project ${props.newProjectId}` })
    // }, [props.newProjectId])
    const onsubmit = () => {
        props.onComplete(newUserInfo)
    }


    const body = () => {
        return (
            <div>
                <Form>
                    <Form.Group controlId="duedate" className='mt-4'>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="duedate"
                            placeholder="Enter Email"
                            value={newUserInfo.Email}
                            onChange={(e) => {
                                setNewUserInfo({ ...newUserInfo, Email: e.target.value })
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="duedate" className='mt-4'>
                        <Form.Label>
                            UserName
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="duedate"
                            onChange={(e) => {
                                setNewUserInfo({ ...newUserInfo, UserName: e.target.value })
                            }}
                            value={newUserInfo.UserName}
                            placeholder="Enter Username"
                        />
                    </Form.Group>
                    <Form.Group controlId="duedate" className='mt-4'>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                placeholder="Enter Password"
                                value={newUserInfo.Password}
                                onChange={(e) => {
                                    setNewUserInfo({ ...newUserInfo, Password: e.target.value })
                                }}
                                type={isVisible ? "text" : "password"}
                            />
                            <a class="btn shadow-none border-top border-bottom border-end" onClick={() => { setisVisible(!isVisible) }}><img width="20px" height="20px" src={isVisible ? visible : invisible}></img></a>
                        </InputGroup>

                        {/* <Form.Control
                            type="text"
                            name="duedate"

                        /> */}
                    </Form.Group>



                    <div className='row mt-4'>
                        <div className='col-2'>Position</div>
                        <div className='col'>
                            <DropdownWithIndex0 title={newUserInfo.Position} items={["Manager", "Member"]} icons_list={["", ""]}
                                onClick={(val) => {
                                    setNewUserInfo({ ...newUserInfo, Position: val })
                                }} />
                        </div>
                    </div>

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
                <Modal.Title><div className='size24 customFontBold PrimaryFontColor'> Add a new user</div></Modal.Title>
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
