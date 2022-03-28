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

import { Store } from 'react-notifications-component'
import { content } from "utils/notification"

import { getListPeopleByProjectID } from '../../../api/People'
import { getRoleListOfAPeople } from "api/Project"
const orangeStyle = {
    color: "black",
    fontFamily: Poppins
}



export default function RolePopUp(props) {


    const [show_list, setshow_list] = useState([
        "Invite",
        "Import data to project",
        "Edit project information",
        "Delete project",
        "Change project status",
        "Delete member",
        "Edit member information"])


    const [getList, setGetList] = useState([])

    const [sendList, setSendList] = useState([])

    useEffect(() => {
        var array1 = show_list;
        var array2 = getList;

        for (var i = 0; i < array2.length; i++) {
            var arrlen = array1.length;
            for (var j = 0; j < arrlen; j++) {
                if (array2[i] == array1[j]) {
                    array1 = array1.slice(0, j).concat(array1.slice(j + 1, arrlen));
                }
            }
        }
        console.log("show nè", array1)
        setshow_list(array1)
    }, [getList])

    const [dataToSend, setDataToSend] = useState({
        Email: "",
        Permission: []
    })
    useEffect(() => {
        getRoleListOfAPeople({
            Email: props.Email,
            Id: props.PId
        })
            .then(res => {
                setGetList(res.data)
                console.log( res.data)
            })
            .catch(err => {

            })
    }, [props.Email])

    useEffect(() => {

        setDataToSend(
            {
                Email: props.Email,
                Permission: sendList
            }
        )
    }, [sendList,props.Email])





    const onsubmit = () => {
        console.log("gui len", dataToSend)
        editPeopleRoleWithProject(props.PId, dataToSend)
            .then(response => {
                console.log(response.data)
                Store.addNotification(content("Success", "Editted role", "success"))
                props.handleClose()
                window.location.reload()

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
                    show_list.map((ele) => {
                        return <div className='row mt-2'>
                            <div className='col-1'>
                                <input
                                    class="form-check-input me-2"
                                    type="checkbox"
                                    id="form2Example3c"
                                    onClick={(e) => {
                                        if (e.target.checked === true) {
                                            if (!sendList.includes(ele))
                                                sendList.push(ele)
                                            console.log(sendList)
                                        }
                                        else if (e.target.checked === false) {
                                            if (sendList.includes(ele)) {
                                                for (var i = sendList.length - 1; i >= 0; i--) {
                                                    if (sendList[i] === ele) {
                                                        sendList.splice(i, 1);
                                                    }
                                                }
                                            }
                                            console.log(sendList)
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
