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


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

const orangeStyle = {
    color: "black",
    fontFamily: Poppins
}



export default function RolePopUp(props) {

    const [checked, setChecked] = React.useState([0]);

    const newChecked = [...checked];


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        setDataToSend({ ...dataToSend, Permission: newChecked })

    };

    const [getList, setGetList]= useState([])
    const [show_list, setshow_list] = useState([
        "Invite",
        "Import data to project",
        "Edit project information",
        "Delete project",
        "Change project status",
        "Delete member",
        "Edit member information"])

    const [dataToSend, setDataToSend] = useState({
        Email: "",
        Permission: newChecked
    })
    useEffect(() => {
        setDataToSend({...dataToSend, Email: props.Email})
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

    const onsubmit = () => {
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
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {show_list.map((value) => {
                        const labelId = `checkbox-list-label-${value}`;
                        return (
                            <ListItem
                                key={value}
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
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
