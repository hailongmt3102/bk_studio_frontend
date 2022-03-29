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

import { useChecklist } from 'react-checklist';
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

    const data = [
        { _id: 1, label: 'item 1' },
        { _id: 2, label: 'item 2' },
        { _id: 3, label: 'item 3' },
    ]

    const { handleCheck, checkedItems } = useChecklist(data, {
        key: '_id',
        keyType: 'number',
    });

     // Set(0) - handling with Set
    console.log([...checkedItems]);

    const [getList, setGetList] = useState([])

    const [sendList, setSendList] = useState([])

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
                console.log("get List", res.data)
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
    }, [sendList, props.Email])





    const onsubmit = () => {
        console.log("gui len", dataToSend)
        editPeopleRoleWithProject(props.PId, dataToSend)
            .then(response => {
                console.log(response.data)
                Store.addNotification(content("Success", "Editted role", "success"))
                props.handleClose()
                //window.location.reload()

            })
            .catch(
                error => {
                    Store.addNotification(content("Warning", error.data, "danger"))
                    props.handleClose()
                }
            )

    }

    const handleChange = (e) => {
        if (e.target.checked === true) {
            setDataToSend(
                ...dataToSend, e
            )
        }
    };

    const body = () => {
        return (
            <div>
                {/* {
                    show_list.map((ele) => {
                        return <div className='row mt-2'>
                            <div className='col-1'>
                                <input
                                    class="form-check-input me-2"
                                    type="checkbox"
                                    id="form2Example3c"
                                    defaultChecked={getList.includes(ele) ? true : false}
                                    onChange={() => handleChange(ele)}
                                    onClick={() => {
                                        // if (e.target.checked === true) {
                                        //     if (!sendList.includes(ele))
                                        //         sendList.push(ele)
                                        //     console.log(sendList)
                                        // }
                                        // else if (e.target.checked === false) {
                                        //     if (sendList.includes(ele)) {
                                        //         for (var i = sendList.length - 1; i >= 0; i--) {
                                        //             if (sendList[i] === ele) {
                                        //                 sendList.splice(i, 1);
                                        //             }
                                        //         }
                                        //     }
                                        //     console.log(sendList)
                                        // }
                                    }}
                                />
                            </div>
                            <div className='col-11'>{ele}</div>
                        </div>
                    })
                } */}
                <ul>
                    {data.map((v) => (
                            <div>
                                <input
                                    defaultChecked={true}
                                    type="checkbox"
                                    data-key={v._id}                  // 3
                                    onChange={handleCheck}            // 4
                                    checked={checkedItems.has(v._id)} // 5
                                />
                                <label>{v.label}</label>
                            </div>
                        
                    ))}

                </ul>
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
