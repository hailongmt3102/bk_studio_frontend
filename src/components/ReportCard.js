import React, { useState, useEffect } from 'react'
import default_report_img from "../resources/icons/default_report_img.svg"
import heart_img from "../resources/icons/heart.svg"
import hearted from "../resources/icons/hearted.svg"
import { useNavigate } from 'react-router-dom'
import ThreeDotButton from "../components/ThreeDotButton"
import delete_icon from 'resources/icons/delete.svg'
import download_blue from "resources/icons/download_blue.svg"
import share_blue from "resources/icons/share_blue.svg"
import edit from 'resources/icons/edit.svg'
import three_dot from "resources/icons/three-dot.svg"
import { blue_cloud, deep_blue_primary } from "../utils/color"
import { Store } from 'react-notifications-component'
import { content } from "../utils/notification"
import { like, unlike } from 'api/Report'



export default function ReportCard(props) {
    const nav = useNavigate()
    const RId = props.data.Id
    const currentProject = localStorage.getItem("currentProject")
    useEffect(() => {

    }, [])

    const [heart, setHeart] = useState(false)
    const likeSubmit = () => {
        if (currentProject != null) {
            like(currentProject, RId)
                .then(res => {
                    setHeart(true)
                })
                .catch(err => {
                    Store.addNotification(content("Warning", err.response.data, "danger"))
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
                    Store.addNotification(content("Warning", err.response.data, "danger"))
                    return
                })
        }
    }
    const editReport = (Id) => {
        nav(`${Id}/edit`)
    }
    const option_list = ["Share", "Edit information", "Download", "Delete"]

  

    const icons_list = [share_blue, edit, download_blue, delete_icon]
    return (

        <div className="row m-0 p-0 mt-4 mb-4  shadow border border-light" style={{ "borderRadius": "20px" }}>
            <div className='col m-0 p-0' onClick={() => { editReport(props.data.Id) }}>
                <img src={default_report_img} height="300" width="300" />
            </div>
            <div className='col  m-0 p-0'>
                <div class="d-flex flex-row-reverse me-3">
                    <button type="button" class="btn btn-sm" onClick={()=> {
                        if (heart === false) {
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
                            // if (val === 'Delete Project')
                            //     DeleteProjectSubmit()
                            // else {
                            //     setPressRename(true)
                            //     RenameProjectSubmit()
                            //}
                        }} />
                    </div>
                </div>
                <div className='row ' >

                </div>
                <div className='row mt-2' style={{ "color": deep_blue_primary, "fontSize": "28px", "fontWeight": "bold" }}>
                    {props.data.Name}
                </div>
                <div className='row mb-2' style={{ "color": blue_cloud, "fontSize": "23px", "fontWeight": "bold" }}>
                    {props.data.Hastag}
                </div>
                <div className='row mt-4'>
                    <p className='m-0 p-0'> <span style={{ "color": "#868585" }}>Id:</span> {props.data.Id} </p>
                </div>
                <div className='row mt-2'>
                    <p className='m-0 p-0'> <span style={{ "color": "#868585" }}>Created by:</span> {props.data.Author.slice(0, 20)}... </p>
                </div>
                <div className='row mt-2'>
                    <p className='m-0 p-0'> <span style={{ "color": "#868585" }}> Created Date: </span>  {props.data.CreateTime} </p>
                </div>
                <div className='row mt-2'>
                    <p className='m-0 p-0'> <span style={{ "color": "#868585" }}>  Modified Date:  </span>    {props.data.LastModified} </p>

                </div>
            </div>
        </div >
    )
}
