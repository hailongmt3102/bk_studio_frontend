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

export default function AddPopUp(props) {

    const [connection, setConnection] = useState({
        host: "",
        port: "",
        user: "",
        password: ""
    })
    // useEffect(() => {
    //     setProjectInfo({ ...projectInfo, Name: `Project ${props.newProjectId}` })
    // }, [props.newProjectId])
    const onsubmit = () => {
        props.onComplete(connection)
    }
    const body = () => {
        return (
            <div>
                <Form>
                    <Form.Group controlId="duedate" className='mt-4'>

                        <Form.Control
                            type="text"
                            placeholder="URL"
                            // value={name}
                            onChange={(e) => {
                                setConnection({ ...connection, host: e.target.value })
                                // setName(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="duedate" className='mt-4'>

                        <Form.Control
                            type="text"
                            placeholder="Port"
                            // value={url}
                            onChange={(e) => {
                                setConnection({ ...connection, port: e.target.value })
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="duedate" className='mt-4'>

                        <Form.Control
                            type="text"
                            placeholder="User"
                            // value={url}
                            onChange={(e) => {
                                setConnection({ ...connection, user: e.target.value })
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="duedate" className='mt-4'>

                        <Form.Control
                            type="text"
                            placeholder="Password"
                            // value={url}
                            onChange={(e) => {
                                setConnection({ ...connection, password: e.target.value })
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
                Database connection:
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
