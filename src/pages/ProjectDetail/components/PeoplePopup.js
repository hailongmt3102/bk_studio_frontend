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


const orangeStyle = {
    color: "black",
    fontFamily: Poppins
}

export default function PeoplePopup(props) {
    const [listpeopleToAdd, setPeopleListToAdd] = useState([])
    const [people, setPeople] = useState([])
    var location = useLocation()
    const array = location.pathname.split("/");
    const [check, setCheck] = useState(false)
    var project_id = array[array.length - 1]
    useEffect(() => {

        getListPeople()
            .then(res => {
                setPeople(res.data)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    // when click submit button
    const onsubmit = () => {
      
       
        //console.log(listpeopleToAdd)
        inviteMember(project_id,{"NewUsers":listpeopleToAdd})
            .then(res => {
                props.handleClose()
                alert("Đã thêm member thành công")
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
                    people.map((ele, index) => {
                        return <div className='d-flex align-items-center mb-3'>
                            <input
                                class="form-check-input me-2"
                                type="checkbox"
                                id="form2Example3c"
                                onClick={(e) => {
                                    if (e.target.checked == true) {
                                        console.log("true nè")
                                        if (!listpeopleToAdd.includes(ele.UserName)) {
                                            listpeopleToAdd.push(ele.UserName)
                                            console.log(ele.name)
                                            console.log(listpeopleToAdd)
                                        }
                                    }
                                    else if (e.target.checked == false) {
                                       
                                        if (listpeopleToAdd.includes(ele.UserName)) {
                                            console.log("false nè xóa nó nha")
                                            for (var i = listpeopleToAdd.length - 1; i >= 0; i--) {
                                                if (listpeopleToAdd[i] === ele.UserName) {
                                                    listpeopleToAdd.splice(i, 1);
                                                }
                                               }
                                            console.log(listpeopleToAdd)
                                        }
                                    }
                                    // console.log(ele.name)
                                }}
                            />
                            <div><PeopleCardMini
                                onClick={() => {

                                }}
                                name={ele.UserName}
                                email={ele.Email}
                                avatar={ele.Avatar}
                                haveRadioCheck={true}
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
            // fullscreen={true}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><div className='d-flex align-items-center' style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "30px" }}>Invite member to project</div></Modal.Title>
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
