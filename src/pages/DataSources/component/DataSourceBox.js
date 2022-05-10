import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

import excel_icon from "resources/icons/excel_icon.svg"

import ThreeDotButton from 'components/ThreeDotButton'
import three_dot from "resources/icons/three-dot.svg"

import { checkPermissionWithDatasource, deleteDatasource, Rename, SendToWorkspace, showDataSourceContent } from 'api/DataSources'

import { Store } from 'react-notifications-component'
import { useNavigate } from 'react-router-dom'
import { content } from "utils/notification"

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
        checkPermissionWithDatasource(id)
            .then(res => {

                // navigate to machine learning model
                if (props.isModel && (res.data === "View" || res.data === "Edit")) {
                    // get data from server
                    showDataSourceContent(id)
                        .then(res => {
                            // set rows and columns
                            if (res.data.length == 0) {
                                // nothing to compute
                                alert("Your data source has not content")
                                return
                            }
                            const keys = Object.keys(res.data[0])

                            // parse keys to columns data
                            let columns = keys.map(key => {
                                if (key == "DataSource_Id")
                                    return {
                                        field: 'id',
                                        headerName: key,
                                        editable: false,
                                    }
                                return {
                                    field: key,
                                    headerName: key,
                                    editable: false,
                                }
                            })

                            // set row data
                            let rows = res.data.map(row => {
                                row.id = row.DataSource_Id
                                delete row.DataSource_Id
                                return row
                            })
                            if (props.modelState.isEditModel) {
                                // navigate to edit model page
                                let edited = props.modelState.isEditInput ? {input : JSON.stringify(rows.slice(0,50))} : {output : JSON.stringify(rows.slice(0,50))}
                                navigate("/machinelearning/modelDetail/" + props.modelState.MId + "/edit", {
                                    state: {
                                        ...props.modelState,
                                        ...edited
                                    }
                                })
                            }else {
                                navigate("/machinelearning/predict", {
                                    state: {
                                        rows: rows,
                                        columns: columns
                                    }
                                })
                            }

                     

                        })
                        .catch(err => {
                            console.log(err)
                        })
                    return
                }


                // navigate to view datasource page
                if (res.data === "View") {
                    navigate(`/datasources/${id}`, {
                        state: {
                            isEdit: false,
                            Did: id
                        }
                    })
                }
                // navigate to view datasource page with edit permission
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
                            //console.log(isHost)
                            props.showSharePopUpHandle(props.ele.Id)
                        }
                        else {
                            Store.addNotification(content("Fail", "You can't share this data source", "danger"))
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

                <div className="ms-4 m-0 p-0 mt-4 pb-4 me-4" >
                    <div className='mt-1'><span style={{ "color": "#868585" }}>Date created: </span>{props.ele.CreateTime.slice(0, 10)}</div>
                    <div className='mt-1'><span style={{ "color": "#868585" }}>Last modified: </span>{props.ele.LastModified.slice(0, 10)}</div>
                    <div className='mt-1 mb-3'> <span style={{ "color": "#868585" }}>Created by: </span>{props.ele.Email.slice(0, 15)}...</div>
                </div>

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
