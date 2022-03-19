import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function SqlPopUp(props) {
    const [step, setStep] = useState(1)
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            // fullscreen={true}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className='d-flex align-items-center' >
                        Invite member to project
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                body
            </Modal.Body>
            <Modal.Footer>
                {
                    step == 1 ?
                    <Button onClick={() => {
                        setStep(2)
                    }}>
                        NExt
                    </Button>
                     :
                    <Button onClick={() => {
                        props.onComplete("query")
                    }}>
                        Done
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}
