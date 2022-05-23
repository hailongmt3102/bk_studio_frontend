import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'
import { getListProject } from 'api/Project'

import { createNewProject } from 'api/Project'
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"



const orangeStyle = {
    color: "black",
}

export default function NewUserPopup(props) {

    const [newUserInfo, setNewUserInfo] = useState({
        Email: "",
        Password: "",
        UserName: "",
        Position: ""
    })

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
                            placeholder="Type new user email"
                            value={newUserInfo.Email}
                            onChange={(e) => {
                                setNewUserInfo({ ...newUserInfo, Email: e.target.value })
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="duedate" className='mt-4'>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="duedate"
                            placeholder="Type new user Password"
                            value={newUserInfo.Password}
                            onChange={(e) => {
                                setNewUserInfo({ ...newUserInfo, Password: e.target.value })
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
                            placeholder="Type new user UserName"
                            value={newUserInfo.UserName}
                            onChange={(e) => {
                                setNewUserInfo({ ...newUserInfo, UserName: e.target.value })
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="duedate" className='mt-4'>
                        <Form.Label>
                            Position
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="duedate"
                            placeholder="Type new user Postion"
                            value={newUserInfo.Position}
                            onChange={(e) => {
                                setNewUserInfo({ ...newUserInfo, Position: e.target.value })
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
