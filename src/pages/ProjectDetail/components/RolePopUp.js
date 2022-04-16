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
        "Invite": false,
        "Import data to project": false,
        "Edit project information": false,
        "Delete project": false,
        "Change project status": false,
        "Delete member": false,
        "Edit member information": false
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
                Store.addNotification(content("Warning", err.response.data, "danger"))
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
                Store.addNotification(content("Warning", error.data, "danger"))
                props.handleClose()
            })
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
                                            edge="start"
                                            checked={showList[key]}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={key} />
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
                <Modal.Title><div className='d-flex align-items-center' style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "30px" }}>Edit Role</div></Modal.Title>
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
