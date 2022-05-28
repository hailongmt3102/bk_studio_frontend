import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'
import PeopleCard from "components/PeopleCard/PeopleCard"
import { getListPeople } from '../../../api/People'
import { inviteMember } from '../../../api/Project'
import { deep_blue_primary } from "../../../utils/color"

import { createNewProject } from 'api/Project'
import PeopleCardMini from 'components/PeopleCardMini/PeopleCardMini'

import { Store } from 'react-notifications-component'
import { content } from "../../../utils/notification"

import { getListPeopleByProjectID } from '../../../api/People'
const orangeStyle = {
    color: "black",
}

export default function PeoplePopup(props) {
    const [listpeopleToAdd, setPeopleListToAdd] = useState([])
    const [people, setPeople] = useState([])
    var location = useLocation()
    const array = location.pathname.split("/");
    const [peopleInProject, setPeopleListInProject] = useState([])
    var project_id = array[array.length - 1]

    const [filterPeople, setFilterPeople] = useState([])
    useEffect(() => {

        getListPeople()
            .then(res => {
                setPeople(res.data)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        getListPeopleByProjectID(project_id)
            .then(response => {
                // console.log(response.data)
                setPeopleListInProject(response.data)
            })
            .catch(
                error => {
                }
            )
        //if email trong people thuộc email trong project thì people loại thằng đó ra 

        //list People 
        //List People trong project 
        // cần lọc lại cái list people 

    }, [])

    useEffect(() => {
        //console.log(peopleInProject)
        let EmailInPro = peopleInProject.map(ele => ele.Email)
        let fittedpeople = people.filter(
            (ele) => EmailInPro.includes(ele.Email) ? false : true
        )
        //console.log(fittedpeople)
        setFilterPeople(fittedpeople)
    }, [people, peopleInProject])
    // when click submit button
    const onsubmit = () => {


        //console.log(listpeopleToAdd)
        inviteMember(project_id, { "NewUsers": listpeopleToAdd })
            .then(res => {
                props.handleClose()
                Store.addNotification(content("Success", "Added member", "success", { duration: 100000 }))
                setTimeout(() => window.location.reload(), 1000);
                setPeopleListToAdd([])
                props.onComplete()
            })
            .catch(err => {
                alert(err.response.data)
            })

    }
    const body = () => {
        return (
            <div>
                {
                    filterPeople.map((ele, index) => {
                        return <div className='d-flex align-items-center mb-3'>
                            <input
                                class="form-check-input me-2"
                                type="checkbox"
                                id="form2Example3c"
                                onClick={(e) => {
                                    if (e.target.checked === true) {
                                        console.log("true nè")
                                        if (!listpeopleToAdd.includes(ele.Email)) {
                                            listpeopleToAdd.push(ele.Email)
                                            // console.log(ele.name)
                                            // console.log(listpeopleToAdd)
                                        }
                                    }
                                    else if (e.target.checked === false) {

                                        if (listpeopleToAdd.includes(ele.Email)) {
                                            console.log("false nè xóa nó nha")
                                            for (var i = listpeopleToAdd.length - 1; i >= 0; i--) {
                                                if (listpeopleToAdd[i] === ele.Email) {
                                                    listpeopleToAdd.splice(i, 1);
                                                }
                                            }
                                            // console.log(listpeopleToAdd)
                                        }
                                    }
                                    // console.log(ele.name)
                                }}
                            />
                            <div className='mt-3'><PeopleCardMini
                                onClick={() => {

                                }}
                                name={ele.UserName}
                                email={ele.Email}
                                avatar={ele.Avatar}
                                haveRadioCheck={true}
                                isManager={true}
                            /></div>
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
                <Modal.Title><div className='d-flex align-items-center' style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "30px" }}>Invite people to project</div></Modal.Title>
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
