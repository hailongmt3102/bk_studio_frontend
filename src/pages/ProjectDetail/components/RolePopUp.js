import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { deep_blue_primary } from "../../../utils/color"

import { editPeopleRoleWithProject } from "../../../api/Project"
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
import { getRoleListOfAPeople } from "api/Project"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function RolePopUp(props) {

    const [showList, setShowList] = useState({
        "Change project status": false,
        "Edit project information": false,
        "Delete project": false,
        "Invite": false,
        "Delete member": false,
        "Edit role member": false,
        "Import data to project": false,
    })

    const checked = (value) => () => {
        setShowList({ ...showList, [value]: !showList[value] })
    };

    useEffect(() => {
        getRoleListOfAPeople({
            Email: props.Email,
            Id: props.PId
        })
            .then(res => {
                let updateList = {}
                res.data.map(ele => updateList[ele] = true)
                setShowList({ ...showList, ...updateList })
            })
            .catch(err => {
                Store.addNotification(content("Fail", err.response.data, "danger"))
                props.handleClose()
            })
    }, [props.Email])

    const onsubmit = () => {
        let permissions = Object.keys(showList).filter(ele => showList[ele])
        editPeopleRoleWithProject(props.PId, {
            Email: props.Email,
            Permission: permissions
        })
            .then(response => {
                Store.addNotification(content("Success", "Editted role", "success"))
                props.handleClose()
            })
            .catch(error => {
                Store.addNotification(content("Fail", error.data, "danger"))
                props.handleClose()
            })
    }

    const keyMapping = (key) => {
        switch (key) {
            case "Invite":
                return "Invite people"
            case "Edit role member":
                return "Edit permissions of member"
            default:
                return key
        }
    }

    const body = () => {
        return (
            <div>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {Object.keys(showList).map((key, index) => {
                        const labelId = `checkbox-list-label-${key}`;
                        return (
                            <ListItem
                                key={index}
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={checked(key)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            onChange={() => { }}
                                            edge="start"
                                            checked={showList[key]}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={keyMapping(key)} />
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
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><div className='d-flex align-items-center PrimaryFontColor' style={{ "fontWeight": "bold", fontSize: "30px" }}>Edit Permissions</div></Modal.Title>
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
