import React, { useState, useEffect } from 'react'
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
import { like, unlike, deleteReport, updateReportInformation } from 'api/Report'
import ShareWithPopUp from "pages/AdjustingReport/components/PopUp/ShareWithPopUp"

import ConfirmDialog from "components/ConfirmDialog";

export default function TemplateMiniCard(props) {



    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const option_list = ["Share", "Edit information", "Download"]
    const icons_list = [share_blue, edit, download_blue]
    const nav = useNavigate()
    const RId = props.data.Id
    const currentProject = localStorage.getItem("currentProject")
    const [heart, setHeart] = useState(props.data.Favorite)
    const likeSubmit = () => {
        if (currentProject != null) {
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
    const viewReportNav = (Id) => {
        nav(`project/gallery/${Id}/view`, {
            state: {
                PId: props.data.PId,
                Type: props.data.Type,
                RId: props.data.Id,
                isEdit: "View"
            }
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

    const headComponent = () => {
        return <div className='row text-center m-0 p-0'>
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
                    <ThreeDotButton title={'adđ'} items={option_list} icons_list={icons_list} icon={three_dot} onClick={(val) => {

                        if (val === "Edit information") {
                            setPressEdit(true)
                        }
                        else if (val === "Share") {
                            setshowSharePopUp(true)
                        }
                    }} />
                </div>
            </div>
            {
                pressEdit ?
                    <div>
                        {<div className=' m-0 p-0 text-center ms-4 pe-5' style={{ maxHeight: "50px" }}>
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
                        }
                    </div> :

                    <h5 className='text-center mt-3' style={{ "color": deep_blue_primary, "fontSize": "28px", "fontWeight": "bold" }}>
                        {props.data.Name.slice(0, 20)}
                    </h5>

            }
        </div>

    }

    return (

        <div>
            <ShareWithPopUp
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
            <div className="text-center m-0 p-0 ms-4 shadow border border-light" style={{ "borderRadius": "20px" }}>
                {headComponent()}
                <div className='text-center m-0 p-0' onClick={() => { viewReportNav(props.data.Id) }}>
                    <img src={default_report_img} height="200" width="200" />
                </div>
                {
                    pressEdit ?
                        <div className='text-center mb-2'>
                            <button onClick={() => { updateSubmit() }} type="button" class="btn btn-primary">
                                Save
                            </button>
                        </div>
                        : null
                }

            </div >

        </div>
    )
}
