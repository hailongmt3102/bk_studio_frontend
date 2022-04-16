import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { blue_cloud, deep_blue_primary } from "../../../../utils/color"
import { Poppins } from "utils/font"
import { editPeopleRoleWithProject } from "../../../../api/Project"
import { getListPeopleByProjectID } from "api/People"

import { shareReport, getShardListPeople } from "api/Report"
import link from "resources/icons/link.svg";
import edit from 'resources/icons/edit.svg'

import eye_bluecloud from 'resources/icons/eye_bluecloud.svg'
import DropdownWithIndex0 from 'components/DropdownWithIndex0'

import { Store } from 'react-notifications-component'
import { content } from "utils/notification"

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
export default function ShareLinkPopUp(props) {


    const status_list = ["View", "Edit"]
    const staus_icon_list = [eye_bluecloud, edit]
    const [listPeopInProject, setListPeopInProject] = useState([])
    const [listSharedPeople, setListSharedPeople] = useState([])

    useEffect(() => {
        getListPeopleByProjectID(props.currentProject)
            .then(res => {
                setListPeopInProject(res.data)
                //console.log(res.data)
            })
            .catch(err => {
                Store.addNotification(content("Warning", "Can't show list people in this project", "danger"))
                console.log(err.response.data)
            })
        getShardListPeople(props.currentProject, props.RId)
            .then(res => {
                setListSharedPeople(res.data)
                //console.log(res.data)
            })
            .catch(err => {
                // Store.addNotification(content("Warning","Can't show list people in this project", "danger"))
                // console.log( err.response.data)
            })


    }, [props.Email])

    const [role, setRole] = useState("View")
    const [selectPeople, setSelectPeople] = useState([])
    const shareSubmit = () => {
        shareReport(props.currentProject, props.RId, {
            Email: selectPeople,
            Permission: role
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


    const selectMailComponent = () => {
        return <div className='text-center row m-auto m-0 p-0 p-4'>
            <Autocomplete
                className='col-10'
                multiple
                id="tags-standard"
                options={listPeopInProject.map((ele) => ele.Email)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        placeholder="Email"
                    />
                )}
                onChange={(e, val) => {
                    setSelectPeople(val)
                    console.log(selectPeople)
                }}
            />
            <div className='col-2 m-auto'>
                <DropdownWithIndex0 title={role} items={status_list} icons_list={staus_icon_list} onClick={(val) => {
                    setRole(val)
                }} />
            </div>
        </div>
    }

    const listSharedPeopleComponent = () => {
        return <div>
            <div className='row'>
                {/* <div className='col ms-5'>
                    {listSharedPeople.map((ele) => ele.Email)}
                </div>
                <div className='col'>
                    {listSharedPeople.map((ele) => ele.Permission)}
                </div> */}
            </div>

        </div>
    }
    const body = () => {
        return (

            <div>
                {/* {selectMailComponent()}


                {listSharedPeopleComponent()} */}
            </div>

        )
    }

    return (
        <Modal
            show={props.show}
            onHide={()=>props.handleClose()}
            backdrop="static"
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div
                        className='d-flex m-auto align-items-center'
                        style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "30px" }}
                    >
                        <div className='m-auto me-2'><img src={link} width="42px" height="42px" /></div>
                        <div className='m-auto ms-2'>Share by link</div>
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
                    shareSubmit()
                }}>
                    Share
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
