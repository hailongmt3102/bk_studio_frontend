import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

import excel_icon from "resources/icons/excel_icon.svg"

import { blue_cloud } from "utils/color"
import { deep_blue_primary } from "utils/color"
import three_dot from "resources/icons/three-dot.svg"
import { orange } from "utils/color"
import ThreeDotButton from 'components/ThreeDotButton'

import { Rename, deleteDatasource, SendToWorkspace, checkPermissionWithDatasource } from 'api/DataSources'

import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
import { useNavigate } from 'react-router-dom'

export default function DataSourceBox(props) {

    const navigate = useNavigate()

    var myEmail = localStorage.getItem("email")

    const [isHost, setIsHost] = useState(false)

    useEffect(() => {
        if (myEmail === props.ele.Email) {
            setIsHost(true)
        }
    }, [])

    const deleteHandle = (id) => {
        deleteDatasource(id)
            .then(res => {
                Store.addNotification(content("Success", "Deleted Datasource", "success"))
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(err => {
                Store.addNotification(content("Fail", "Delete Fail", "danger"))
                console.log(err.response.data)
            })
    }

    const RenameHandle = (id, newname) => {

        console.log("id gui len ne,", id)
        Rename(id, {
            "newName": newname
        })
            .then(res => {
                console.log(res.data)
                Store.addNotification(content("Success", "Renamed", "success"))
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(err => {
                Store.addNotification(content("Fail", "Rename Fail", "danger"))
                console.log(err.response.data)
            })
    }

    const setNewName = (value, index) => {
        let newElement = props.datasourceslist[index]
        newElement.Information = value
        props.setDatasourceslist([...props.datasourceslist.splice(0, index), newElement, ...props.datasourceslist.splice(index + 1)])
    }
    const [pressRename, setPressRename] = useState(false)
    const sendToWorkspaceSubmit = (id) => {
        SendToWorkspace(id, { "Type": "Workspace" })
            .then((res) => {
                Store.addNotification(content("Success", "Edited Project successful", "success"))
                navigate("/datasources")

            })
            .catch((e) => {
                Store.addNotification(content("Failure", "Send failed", "danger"))
                console.log(e.response.data)
                return

            })
    }

    const ClickHandle = (id) => {

        console.log("id gui len ne,", id)
        checkPermissionWithDatasource(id)
            .then(res => {
                console.log("quyen", res.data)
                if (res.data === "View") {
                    navigate(`/datasources/${id}`, {
                        state: {
                            isEdit: false,
                            Did: id
                        }
                    })
                }
                else if (res.data === "Edit") {
                    navigate(`/datasources/${id}`, {
                        state: {
                            isEdit: true,
                            Did: id
                        }
                    })
                }
                else Store.addNotification(content("Access Fail", "You don't have permission with this datasource", "danger"))

            })
            .catch(err => {
                Store.addNotification(content("Fail", "Rename Fail", "danger"))
                console.log(err.response.data)
            })

    }
    const threeDotComponent = () => {
        return <div className="row" style={{ "textAlign": "end" }}>
            <ThreeDotButton title={'adđ'}
                items={props.option_list}
                icon={three_dot}
                icons_list={props.icon_list}
                onClick={(val) => {
                    if (val == "Delete") {
                        deleteHandle(props.ele.Id)
                    }
                    else if (val === "Rename") {
                        setPressRename(true)
                    }
                    else if (val == "Share") {

                        if (isHost === true) {
                            console.log(isHost)
                            props.showSharePopUpHandle(props.ele.Id)
                        }
                        else {
                            Store.addNotification(content("Fail", "You don't have share this data source permission", "danger"))
                        }
                    }
                    else if (val === "Send to Workspace") {
                        sendToWorkspaceSubmit(props.ele.Id)
                    }
                }} />
        </div>
    }

    return (
        <div className='ms-4 row mb-3' style={{ "border-radius": "20px", "backgroundColor": "#F7F7F7" }}>
            <div className="col-3 m-auto text-center m-0 p-0  customFontRoboto" onClick={() => { ClickHandle(props.ele.Id) }}  >
                <div className='ms-4 me-2'><img src={excel_icon} /></div>
            </div>
            <div className="col-9 m-0 p-0" >
                {threeDotComponent()}

                <div className="ms-4 m-0 p-0 SecondFontColor size32 customFontRoboto " >
                    {
                        pressRename == false ?
                            <h4 className=''>{props.ele.Information.substring(0, 15)}</h4>
                            :
                            // <newNameTextField/>
                            <Form.Group className='m-0 p-0  pe-3'>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    value={props.ele.Information}
                                    onChange={(e) => {
                                        setNewName(e.target.value, props.index)
                                    }}
                                />
                            </Form.Group>
                    }
                </div>
                <div class=" ms-4  m-0 p-0 mt-3 me-4" >
                    <div><span style={{ "color": "#868585" }}>date created: </span>{props.ele.CreateTime}</div>
                </div>
                {
                    pressRename == false ?
                        <div class="ms-4 m-0 p-0 mt-1 pb-4 me-4" >
                            <p><span style={{ "color": "#868585" }}>last modified: </span>{props.ele.LastModified}</p>
                        </div> :
                        <div class="ms-4 m-0 p-0 mt-1 me-4" >
                            <p><span style={{ "color": "#868585" }}>last modified: </span>{props.ele.LastModified}</p>
                        </div>
                }
                {/* <div class="ms-4 m-0 p-0 mt-1 pb-2 me-4" >
                    <p><span style={{ "color": "#868585" }}>last modified: </span>{props.ele.LastModified}</p>
                </div> */}
                {
                    pressRename == false ? null :
                        <div className='d-flex justify-content-center'>
                            <button
                                onClick={() => {
                                    RenameHandle(props.ele.Id, props.ele.Information)
                                }} type="button" class="btn btn-primary btn-sm mb-3">
                                Save
                            </button>
                        </div>
                }

            </div>
        </div>
    )
}
