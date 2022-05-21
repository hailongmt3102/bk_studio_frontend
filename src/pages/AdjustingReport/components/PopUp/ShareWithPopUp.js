import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { blue_cloud, deep_blue_primary } from "../../../../utils/color"

import { editPeopleRoleWithProject } from "../../../../api/Project"
import { getListPeopleByProjectID } from "api/People"

import { shareReport, getSharedListPeople, updateSharePermission, unshareReport } from "api/Report"
import shareWith from "resources/icons/share_with_primary.svg";
import edit from 'resources/icons/edit.svg'

import eye_bluecloud from 'resources/icons/eye_bluecloud.svg'
import DropdownWithIndex0 from 'components/DropdownWithIndex0'

import { Store } from 'react-notifications-component'
import { content } from "utils/notification"

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export default function ShareWithPopUp(props) {



    var myEmail = localStorage.getItem("email")
    // console.log("email",myEmail)

    const roleList = ["View", "Edit"]
    const staus_icon_list = [eye_bluecloud, edit]
    const [listShowPeople, setListShowPeople] = useState([])
    const [listSharedPeople, setListSharedPeople] = useState([])
    const [listSharedName, setListSharedName] = useState([])
    useEffect(() => {
        getSharedListPeople(props.currentProject, props.RId)
            .then(res => {
                setListSharedPeople(res.data)
                setListSharedName(res.data.map((e) => e.Email))
                //console.log("list share", res.data)
                //console.log("list share", res.data.map((e) => e.Email))
            })
            .catch(err => {
                // Store.addNotification(content("Fail", "Can't show list shared people in this project", "danger"))
                // console.log( err.response.data)
            })
    }, [])
    useEffect(() => {
        getListPeopleByProjectID(props.currentProject)
            .then(res => {
                setListShowPeople(res.data.map((e) => e.Email).filter(item => (!listSharedName.includes(item) && item !== myEmail)))
                //console.log("list show",res.data.map((e)=>e.Email).filter(item => !listSharedName.includes(item)))
            })
            .catch(err => {
                // Store.addNotification(content("Fail", "Can't show list people in this project", "danger"))
                //console.log(err.response.data)
            })
    }, [listSharedName])

    const [role, setRole] = useState("View")
    const [selectPeople, setSelectPeople] = useState([])
    const shareHandle = () => {
        shareReport(props.currentProject, props.RId, {
            Emails: selectPeople,
            Permission: role
        })
            .then(response => {
                //Store.addNotification(content("Success", "Editted role", "success"))
                props.handleClose()
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(error => {
                Store.addNotification(content("Fail", error.response.data, "danger"))
                props.handleClose()
            })
    }
    const unshareHandle = (email, index) => {
        unshareReport(props.currentProject, props.RId, {
            Email: email,
        })
            .then(response => {
                setListSharedPeople([...listSharedPeople.slice(0, index), ...listSharedPeople.slice(index + 1)])
                Store.addNotification(content("Success", "Deleted share permission", "success"))
            })
            .catch(error => {
                Store.addNotification(content("Fail", error.response.data, "danger"))

            })
    }


    const selectMailComponent = () => {
        return <div className='text-center row m-auto m-0 p-0 p-4'>
            <Autocomplete
                className='col-10'
                multiple
                id="tags-standard"
                options={listShowPeople}
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
                {
                    props.type === "Template" ? <DropdownWithIndex0 title={role} items={["View"]} icons_list={[eye_bluecloud]} onClick={(val) => {
                        setRole(val)
                    }} /> : <DropdownWithIndex0 title={role} items={roleList} icons_list={staus_icon_list} onClick={(val) => {
                        setRole(val)
                    }} />

                }

            </div>
        </div>
    }


    const updateShareHandle = async () => {
        try {
            for (let i = 0; i < listSharedPeople.length; i++) {
                await updateSharePermission(props.currentProject, props.RId, {
                    Email: listSharedPeople[i].Email,
                    Permission: listSharedPeople[i].Permission
                })
            }
            Store.addNotification(content("Success", "Shared with member", "success"))
            props.handleClose()

        } catch (err) {
            Store.addNotification(content("Fail", err, "danger"))

        }
    }


    const listSharedPeopleComponent = () => {
        return <div>
            <div className='row'>
                {

                    listSharedPeople.map((e, index) => {
                        return <div className='row m-0 p-0 mt-4'>
                            <div className='col-6 '>
                                <div className='ms-5'>{e.Email}</div>
                            </div>
                            <div className='col-2'>
                                <DropdownWithIndex0 title={e.Permission} items={[e.Permission, e.Permission == "View" ? "Edit" : "View"]} icons_list={e.Permission === "View" ? [eye_bluecloud, edit] : [edit, eye_bluecloud]}
                                    onClick={(val) => {
                                        setListSharedPeople([...listSharedPeople.slice(0, index), { ...listSharedPeople[index], Permission: val }, ...listSharedPeople.slice(index + 1)])
                                    }} />
                            </div>
                            <div className='col-2'>
                                <Button onClick={() => {
                                    unshareHandle(e.Email, index)
                                }} autoFocus>
                                    Clear
                                </Button>
                            </div>
                            <div className='col-2'>

                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    }
    const body = () => {
        return (

            <div>
                {selectMailComponent()}


                {listSharedPeopleComponent()}
            </div>

        )
    }

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
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
                        <div className='m-auto me-2'><img src={shareWith} width="42px" height="42px" /></div>
                        <div className='m-auto ms-2'>Share with</div>
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
                    shareHandle()
                    updateShareHandle()
                }}>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
