import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { blue_cloud, deep_blue_primary } from "../../../../utils/color"
import { Poppins } from "utils/font"
import { editPeopleRoleWithProject } from "../../../../api/Project"
import { getListPeopleByProjectID } from "api/People"
import shareWith from "resources/icons/share_with_primary.svg";
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
import { getRoleListOfAPeople } from "api/Project"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function SharePopUp(props) {

    const [listPeopInProject, setListPeopInProject] = useState([])
    const listRoleVsProject = ["View", "Edit"]
    const [listRoleToSend, setListRoleToSend] = useState([])
    useEffect(() => {
        getListPeopleByProjectID(props.currentProject)
            .then(res => {
                setListPeopInProject(res.data)
                console.log(res.data)
            })
            .catch(err => {
                // Store.addNotification(content("Warning", err.response.data, "danger"))
                // props.handleClose()
            })
    }, [props.Email])

    const onsubmit = () => {
        // let permissions = Object.keys(showList).filter(ele => showList[ele])
        // editPeopleRoleWithProject(props.PId, {
        //     Email: props.Email,
        //     Permission: permissions
        // })
        //     .then(response => {
        //         Store.addNotification(content("Success", "Editted role", "success"))
        //         props.handleClose()
        //     })
        //     .catch(error => {
        //         Store.addNotification(content("Warning", error.data, "danger"))
        //         props.handleClose()
        //     })
    }

    const body = () => {
        return (
            <div>
                {
                    listPeopInProject.map((ele) =>{
                        return <div>{ele.UserName}</div>
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
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div
                        className='d-flex align-items-center'
                        style={{ fontFamily: Poppins, color: deep_blue_primary, "fontWeight": "bold", fontSize: "30px" }}
                    >
                        <div className='m-auto me-2'><img src={shareWith} width="30px" height="30px"/></div>
                        <div className='m-auto'>Share with</div>
                    </div>
                </Modal.Title>
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
