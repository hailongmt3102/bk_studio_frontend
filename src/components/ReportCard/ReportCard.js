import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

import default_report_img from "../../resources/icons/default_report_img.svg"

import heart_img from "../../resources/icons/heart.svg"
import hearted from "../../resources/icons/hearted.svg"
import { useNavigate } from 'react-router-dom'
import ThreeDotButton from "../ThreeDotButton"
import delete_icon from 'resources/icons/delete.svg'
import download_blue from "resources/icons/download_blue.svg"
import share_blue from "resources/icons/share_blue.svg"
import edit from 'resources/icons/edit.svg'
import three_dot from "resources/icons/three-dot.svg"
import { blue_cloud, deep_blue_primary } from "utils/color"
import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"
import { like, unlike, deleteReport, updateReportInformation, getPermission } from 'api/Report'

import { likeTemplate, unlikeTemplate, deleteTemplate } from 'api/Templates'
import ShareWithPopUp from "pages/AdjustingReport/components/PopUp/ShareWithPopUp"

import ConfirmDialog from "components/ConfirmDialog";


export default function ReportCard(props) {
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const handleCloseYes = () => {
        deleteHandle()
        // console.log("close ne")
    }
    const handleCloseNo = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: false })
    }
    const handleOpen = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: true })
    }
    const option_list = props.type === "Template" ? ["Share", "Download", "Delete"] : ["Share", "Edit information", "Download", "Delete"]
    const icons_list = props.type === "Template" ? [share_blue, download_blue, delete_icon] : [share_blue, edit, download_blue, delete_icon]
    const nav = useNavigate()
    const RId = props.data.Id
    const currentProject = localStorage.getItem("currentProject")
    const [heart, setHeart] = useState(props.data.Favorite)
    const likeSubmit = () => {
        if (currentProject != null) {
            if (props.type === "Template") {
                likeTemplate(RId)
                    .then(res => {
                        setHeart(true)
                    })
                    .catch(err => {
                        Store.addNotification(content("Fail", err.response.data, "danger"))
                        return
                    })
            }
            like(currentProject, RId)
                .then(res => {
                    setHeart(true)
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })
        }
    }
    const unlikeSubmit = () => {
        if (currentProject != null) {
            if (props.type === "Template") {
                unlikeTemplate(RId)
                    .then(res => {
                        setHeart(false)
                    })
                    .catch(err => {
                        Store.addNotification(content("Fail", err.response.data, "danger"))
                        return
                    })
            }
            unlike(currentProject, RId)
                .then(res => {
                    setHeart(false)
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })
        }
    }


    const deleteHandle = () => {
        if (props.type === "Report") {

            deleteReport(currentProject, RId)
                .then(res => {
                    Store.addNotification(content("Success", "Deleted Report", "success"))
                    setTimeout(() => window.location.reload(), 1000);
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })
        }
        else
            deleteTemplate(RId)
                .then(res => {
                    Store.addNotification(content("Success", "Deleted Template", "success"))
                    setTimeout(() => window.location.reload(), 1000);
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })

    }
    const [pressEdit, setPressEdit] = useState(false)
    const [dataToUpdate, setDataToUpdate] = useState({
        "Hastag": props.data.Hastag,
        "Description": "",
        "Name": props.data.Name
    })
    const [showSharePopUp, setshowSharePopUp] = useState(false)
    const updateSubmit = () => {
        updateReportInformation(currentProject, RId, dataToUpdate)
            .then(res => {
                Store.addNotification(content("Success", "Updated Report Information", "success"))
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(err => {
                Store.addNotification(content("Fail", err.response.data, "danger"))
                console.log(err.response.data)

            })
    }


    const ContentComponent = () => {
        return <div>
            {
                pressEdit ?
                    <div>
                        <div className='row pe-4' style={{ maxHeight: "50px" }}>
                            <Form.Control size="sm" type="text" value={dataToUpdate.Name} onChange={(event) => {
                                setDataToUpdate({ ...dataToUpdate, Name: event.target.value })
                            }}
                                className="border-0"
                                style={{
                                    fontSize: "28px",

                                    "color": deep_blue_primary,
                                    "fontWeight": "bold"
                                }}
                            />
                        </div>
                        <div className='row mt-1 pe-4' >
                            <Form.Control size="sm" type="text" value={dataToUpdate.Hastag} onChange={(event) => {
                                setDataToUpdate({ ...dataToUpdate, Hastag: event.target.value })
                            }}
                                placeholder="#hastag"
                                className="border-0"
                                style={{
                                    fontSize: "20px",
                                    "color": blue_cloud,
                                    "fontWeight": "bold"
                                }}
                            />
                        </div>
                    </div> :
                    <div>
                        <div className='row mt-2' style={{ "color": deep_blue_primary, "fontSize": "28px", "fontWeight": "bold" }}>
                            {props.data.Name.slice(0, 20)}
                        </div>


                        {
                            props.data.Hastag === "" ?
                                <div className='row C4FontColor customFontBold size22'>#Hastag</div>
                                :
                                <div className='row SecondFontColor customFontBold  size22'>{props.data.Hastag}</div>
                        }

                        {/* <div className='row mb-2' style={{ "color": blue_cloud, "fontSize": "23px", "fontWeight": "bold" }}>
                            {props.data.Hastag === "" ? "#Hastag" : props.data.Hastag}
                        </div> */}
                    </div>
            }
            <div className='row mt-4'>
                <p className='m-0 p-0'> <span style={{ "color": "#868585" }}>Id:</span> {props.data.Id} </p>
            </div>
            <div className='row mt-2'>
                <p className='m-0 p-0'> <span style={{ "color": "#868585" }}>Created by:</span> {props.data.Author.slice(0, 20)}... </p>
            </div>
            <div className='row mt-2'>
                <p className='m-0 p-0'> <span style={{ "color": "#868585" }}> Created Date: </span>  {props.data.CreateTime} </p>
            </div>
            {
                props.type === "Report" ? <div className='row mt-2'>
                    <p className='m-0 p-0'> <span style={{ "color": "#868585" }}>  Modified Date:  </span>    {props.data.LastModified} </p>
                </div> : null
            }
            {
                pressEdit ?
                    <div className='text-center row me-5  justify-content-center mt-3 mb-4'>
                        <button onClick={() => { updateSubmit() }} type="button" class="btn btn-primary">
                            Save
                        </button>
                    </div>
                    : null
            }
        </div>
    }
    const NavigationHandle = async (Id) => {
        try {
            let permission = (await getPermission(props.data.PId, props.data.RId)).data
            if (permission == 'Edit') {
                nav(`${Id}/edit`, {
                    state: {
                        PId: props.data.PId,
                        Type: props.data.Type,
                        RId: props.data.RId,
                        Permission: permission,
                    }
                })
            }
            else {
                nav(`${Id}/view`, {
                    state: {
                        PId: props.data.PId,
                        Type: props.data.Type,
                        RId: props.data.RId,
                        Permission: permission,
                    }
                })
            }


        } catch (error) {
            alert(error)
        }
    }
    const viewReportNav = (Id) => {
        nav('/project/gallery/' + Id + '/view', {
            state: {
                PId: props.data.PId,
                Type: props.data.Type,
                RId: props.data.Id,
                isEdit: "View"
            }
        })
    }
    return (
        <div>
            <ShareWithPopUp
                type={props.type}
                currentProject={currentProject}
                RId={RId}
                show={showSharePopUp}
                handleOpen={() => {
                    setshowSharePopUp(true)
                }}
                handleClose={() => {
                    setshowSharePopUp(false)
                }}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                title={props.type === "Report" ? "Are you sure you want to delete this report ?" : "Are you sure you want to delete this template ?"}
                handleCloseYes={() => handleCloseYes()}
                handleCloseNo={() => handleCloseNo()}
            />
            <div className="row m-0 p-0  shadow border border-light" style={{ "borderRadius": "20px" }}>
                <div className='col-5 m-0 p-0 m-auto text-center ' onClick={() => {
                    props.type === "Template" ? viewReportNav(props.data.Id) : NavigationHandle(props.data.Id)
                }}>
                    <img src={default_report_img} height="300" width="300" />
                </div>
                <div className='col-7  m-0 p-0'>
                    <div class="d-flex flex-row-reverse me-3">
                        <button type="button" class="btn btn-sm" onClick={() => {
                            if (heart == false) {
                                likeSubmit()
                            }
                            else {
                                unlikeSubmit()
                            }
                        }}>
                            <img src={heart == false ? heart_img : hearted} height="20px" width="20px" />
                        </button>
                        <div>
                            <ThreeDotButton
                                title={'adđ'}
                                items={option_list}
                                icons_list={icons_list}
                                icon={three_dot}
                                onClick={(val) => {
                                    if (val === 'Delete')
                                        handleOpen()
                                    else if (val === "Edit information") {
                                        setPressEdit(true)
                                    }
                                    else if (val === "Share") {
                                        setshowSharePopUp(true)
                                    }
                                }} />
                        </div>
                    </div>
                    <div className='row' >
                    </div>
                    <div className='ms-5 mb-4'>{ContentComponent()}</div>
                </div>
            </div >
        </div>
    )
}
