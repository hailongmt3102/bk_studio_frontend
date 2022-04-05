import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

import excel_icon from "resources/icons/excel_icon.svg"
import { Roboto, Poppins } from "utils/font"
import { blue_cloud } from "utils/color"
import { deep_blue_primary } from "utils/color"
import three_dot from "resources/icons/three-dot.svg"
import { orange } from "utils/color"
import ThreeDotButton from 'components/ThreeDotButton'
import CustomDropdownButton from 'pages/EditReport/components/CustomDropdownButton'
import { Rename, deleteDatasource, SendToWorkspace } from '../../../api/DataSources'

import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
import { useNavigate } from 'react-router-dom'

export default function DataSourceBox(props) {

    const navigate = useNavigate()



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

    return (
        <div className='col-3 ms-4 mt-3 pt-2 mb-5' style={{ "height": "200px", width: "400px", "border-radius": "20px", "backgroundColor": "#F7F7F7" }}>
            <div className='row ms-3' style={{ "paddingLeft": "310px" }}>
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
                        else if (val === "Send to Workspace") {
                            sendToWorkspaceSubmit(props.ele.Id)
                        }
                    }} />
            </div>
            <div className="row m-0 p-0">
                <div className="col-4 m-0 p-0" style={{ fontFamily: "Roboto" }}>
                    <img src={excel_icon} height="120px" width="100%" />
                </div>
                <div class="col-8 m-0 p-0" style={{ fontFamily: "Roboto" }}>
                    <div class="row m-0 p-0" style={{ fontFamily: "Roboto", color: blue_cloud, fontSize: "28px" }}>
                        {
                            pressRename == false ? <p><span>{props.ele.Information}</span></p> :
                                // <newNameTextField/>
                                <Form.Group className='m-0 p-0 ms-2 pe-2'>
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
                    <div class="row  m-0 p-0 mt-1" style={{ fontFamily: "Roboto" }}>
                        <p><span style={{ "color": "#868585" }}>date created: </span>{props.ele.CreateTime}</p>
                    </div>
                    <div class="row m-0 p-0" style={{ fontFamily: "Roboto" }}>
                        <p><span style={{ "color": "#868585" }}>last modified: </span>{props.ele.LastModified}</p>
                    </div>
                    {
                        pressRename == false ? null :
                            <div className='d-flex justify-content-center'>
                                <button
                                    onClick={() => {
                                        RenameHandle(props.ele.Id, props.ele.Information)
                                    }} type="button" class="btn btn-primary btn-sm">
                                    Save
                                </button>
                            </div>
                    }

                </div>

            </div>
        </div>
    )
}
