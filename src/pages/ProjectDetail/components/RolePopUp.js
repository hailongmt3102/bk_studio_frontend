import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'
import PeopleCard from "components/PeopleCard/PeopleCard"
import { getListPeople } from '../../../api/People'
import { inviteMember } from '../../../api/Project'
import { deep_blue_primary } from "../../../utils/color"
import { Roboto, Poppins } from "utils/font"
import { createNewProject } from 'api/Project'
import PeopleCardMini from 'components/PeopleCardMini/PeopleCardMini'

import { editPeopleRoleWithProject } from "../../../api/Project"

import {Store} from 'react-notifications-component'
import {content} from "utils/notification"

import { getListPeopleByProjectID } from '../../../api/People'
const orangeStyle = {
    color: "black",
    fontFamily: Poppins
}

export default function RolePopUp(props) {


    const [role_list, setRole_list] = useState(["Invite",
        "Import data to project",
        "Edit project information",
        "Delete project",
        "Change project status",
        "Delete member",
        "Edit member information"])

    const [data, setData] = useState({
        Email: "",
        Permission: []
    })

    useEffect(() => {
         setData({
            Email: props.Email, 
            Permission: tmp_list
        })
    },[props.Email])
    

    const [tmp_list, setTmp_list] = useState([])


    const onsubmit = () => {
        console.log(data)
        editPeopleRoleWithProject(props.PId, data)
            .then(response => {
                console.log(response.data)
                Store.addNotification(content("Success", "Editted role", "success"))
                props.handleClose()
                
            })
            .catch(
                error => {
                    Store.addNotification(content("Warning", error.data, "danger"))
                    props.handleClose()
                }
            )
        
    }
    const body = () => {
        return (
            <div>
                {
                    role_list.map((ele) => {
                        return <div className='row mt-2'>
                            <div className='col-1'>
                                <input
                                    class="form-check-input me-2"
                                    type="checkbox"
                                    id="form2Example3c"
                                    onClick={(e) => {
                                        if (e.target.checked === true) {
                                            if (!tmp_list.includes(ele))
                                                tmp_list.push(ele)
                                            console.log(tmp_list)
                                        }
                                        else if (e.target.checked === false) {
                                            if (tmp_list.includes(ele)) {
                                                for (var i = tmp_list.length - 1; i >= 0; i--) {
                                                    if (tmp_list[i] === ele) {
                                                        tmp_list.splice(i, 1);
                                                    }
                                                }
                                            }
                                            console.log(tmp_list)
                                        }
                                    }}
                                />
                            </div>
                            <div className='col-11'>{ele}</div>
                        </div>
                    })
                }
            </div>
        )
    }

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            // fullscreen={true}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><div className='d-flex align-items-center' style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "30px" }}>Edit Role</div></Modal.Title>
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
