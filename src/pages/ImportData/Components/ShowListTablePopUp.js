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

export default function ShowListTablePopUp(props) {




    const body = () => {
        return (
            <div>
                {
                    // console.log(props.data)
                    Object.keys(props.data).map((schemaName) =>
                    <div className='row ms-2 mt-2'>
                        <p><strong>database: </strong> {schemaName}</p>
                        {
                            props.data[schemaName].map(table =>
                                <div className='row ms-2 mt-2'
                                    onClick={() => {
                                        props.handleClose()
                                        props.onComplete(table, schemaName)
                                    }}
                                >
                                    {table}
                                </div>
                            )
                        }
                    </div>
                    )
                }
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
