import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { blue_cloud, deep_blue_primary } from "utils/color"

import { editPeopleRoleWithProject } from "api/Project"
import { getListPeopleByProjectID, getListPeople } from "api/People"

import { shareReport, getSharedListPeople, updateSharePermission } from "api/Report"
import shareWith from "resources/icons/share_with_primary.svg";
import edit from 'resources/icons/edit.svg'
import { getDataSourcesSharedListPeople, shareDataSources } from "api/DataSources"
import eye_bluecloud from 'resources/icons/eye_bluecloud.svg'
import DropdownWithIndex0 from 'components/DropdownWithIndex0'

import { Store } from 'react-notifications-component'
import { content } from "utils/notification"

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
export default function ShareDataSourcesPopUp(props) {
    var myEmail = localStorage.getItem("email")

    const roleList = ["View", "Edit"]
    const staus_icon_list = [eye_bluecloud, edit]
    const [listShowPeople, setListShowPeople] = useState([])
    const [listSharedPeople, setListSharedPeople] = useState([])
    const [listSharedName, setListSharedName] = useState([])
    useEffect(() => {
        if (props.DId != -1)
            getDataSourcesSharedListPeople(props.DId)
                .then(res => {
                    setListSharedPeople(res.data)
                    setListSharedName(res.data.map((e) => e.Email))
                    //console.log("list share", res.data)
                    // console.log("list share", res.data.map((e) => e.Email))
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    // console.log( err.response.data)
                })
    }, [props.DId])
    useEffect(() => {
        if (props.type == "ProjectDetail") {
            getListPeopleByProjectID(props.currentProject)
                .then(res => {
                    setListShowPeople(res.data.map((e) => e.Email).filter(item => !listSharedName.includes(item)))
                    console.log("list show Detail", res.data.map((e) => e.Email).filter(item => !listSharedName.includes(item) && item !== myEmail))
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    //console.log(err.response.data)
                })
        }
        else {
            //People In workspacr
            getListPeople()
                .then(res => {
                    setListShowPeople(res.data.map((e) => e.Email).filter(item => !listSharedName.includes(item) && item !== myEmail))
                    //console.log("list show workspace", res.data.map((e) => e.Email).filter(item => !listSharedName.includes(item)))
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    //console.log(err.response.data)
                })

        }

    }, [listSharedName])

    const [role, setRole] = useState("View")
    const [selectPeople, setSelectPeople] = useState([])
    const shareSubmit = () => {
        shareDataSources(props.DId, {
            Emails: selectPeople,
            Permission: role
        })
            .then(response => {
                console.log(response)
                //Store.addNotification(content("Success", "Editted role", "success"))
                //setTimeout(() => window.location.reload(), 1000);
                // props.handleClose()
            })
            .catch(error => {
                // props.handleClose()
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
                <DropdownWithIndex0 title={role} items={roleList} icons_list={staus_icon_list} onClick={(val) => {
                    setRole(val)
                }} />
            </div>
        </div>
    }


    const updateShareHandle = async () => {
        try {
            for (let i = 0; i < listSharedPeople.length; i++) {
                // await updateSharePermission(props.currentProject, props.RId, {
                //     Email: listSharedPeople[i].Email,
                //     Permission: listSharedPeople[i].Permission
                // })
            }
            Store.addNotification(content("Success", "Shared with member", "success"))
            props.handleClose()

        } catch (err) {
            console.log(err)
        }
    }

    const listSharedPeopleComponent = () => {
        return <div>
            <div className='row'>
                {

                    listSharedPeople.map((e, index) => {
                        return <div className='row'>
                            <div className='col ms-5'>
                                {e.Email}
                            </div>
                            <div className='col'>
                                <DropdownWithIndex0 title={e.Permission} items={[e.Permission, e.Permission == "View" ? "Edit" : "View"]} icons_list={e.Permission === "View" ? [eye_bluecloud, edit] : [edit, eye_bluecloud]}
                                    onClick={(val) => {
                                        setListSharedPeople([...listSharedPeople.slice(0, index), { ...listSharedPeople[index], Permission: val }, ...listSharedPeople.slice(index + 1)])
                                    }} />
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
                    shareSubmit()
                    updateShareHandle()
                }}>
                    Share
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
