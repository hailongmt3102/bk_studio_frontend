import React, { useState, useEffect } from 'react'
import '../css/TextFont.css'
import './peopleCard.css'
import { Roboto, Poppins } from "../../utils/font"
import { useLocation, useNavigate } from 'react-router-dom'
import people_default from "resources/icons/people_default.svg"
import three_dot from "resources/icons/three-dot.svg"
import ThreeDotButton from 'components/ThreeDotButton'
import delete_icon from 'resources/icons/delete.svg'
import edit from 'resources/icons/edit.svg'
import {  deleteMemberInAProject } from "api/Project"

import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"
import ConfirmDialog from "../ConfirmDialog";
const textStyle = {
    fontFamily: Roboto,
}




export default function PeopleCard(props) {
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const handleCloseYes = () => {
        deleteSubmit()
        console.log("close ne")
    }
    const handleCloseNo = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: false })
    }
    const handleOpen = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: true })
    }
    const option_list = ["Edit role", "Delete People"]
    
    

    const deleteSubmit = () => {
        deleteMemberInAProject(props.project_id, { Email: props.email })
            .then(res => {
                Store.addNotification(content("Success", "Deleted Member", "success"))
                window.location.reload()
            })
            .catch(err => {
                Store.addNotification(content("Warning", "You don't delete member's role because you also are member position", "warning"))
            })
    }
    const icons_list = [edit, delete_icon]

    // const [pressRename, setPressRename] = useState(false)
    // const [newName, setNewName] = useState({
    //     Id: props.data.Id,
    //     Name: props.data.Name,
    // })

    const component = () => {
        return <div className='row  m-0'>
            {!props.isManager ? <div className='d-flex m-0 p-0 justify-content-end'>
                {props.showThreeDotButton ? <ThreeDotButton title={'adđ'} items={option_list} icons_list={icons_list} icon={three_dot} onClick={(val) => {
                    if (val === "Edit role") {
                        if (props.peopleCanEditRoleList == true) {
                            props.getEmail()
                            props.setshowRolePopUp();
                        }
                        else {
                            props.setdontshowRolePopUp()
                        }
                    }
                    else {
                        deleteSubmit()
                    }
                }} /> : <div className='row mt-3'></div>
                }
            </div> :
                <div className='row mt-4'>
                </div>
            }
            <div className='row p-2 m-0 p-0'>
                <div className='col-3 align-items-center'>
                    {props.avatar === "" ?
                        <img src={people_default} height="100px" width="100px" />
                        : <img src={props.avatar} height="100px" width="100px" style={{ "border-radius": "50%" }} />}
                </div>
                <div className='col-9'>
                    <div className='ms-5 mb-3'>
                        <h2 style={{ textStyle, "fontWeight": "bold", fontSize: "30px" }}>
                            {props.name}
                        </h2>
                        <div style={{ textStyle }}>
                            Email: {props.email.substring(0, 18)+"..."}
                        </div>
                        <div style={{ textStyle }}>
                            Rank: {props.rank}
                        </div>
                        <div style={{ textStyle }}>
                            Online: 6 hour later
                        </div>
                        {/* <div style={{ textStyle }}>
                           {props.position}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    }
    return (

        <div>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                title="Are you sure you want to delete this member?"
                handleCloseYes={() => handleCloseYes()}
                handleCloseNo={() => handleCloseNo()}
            />
            {
                props.isMe ? 
                <div className="m-4 peoplecard me" onClick={props.onClick}>
                    {component()}
                </div>
                :
                <div className={props.isManager ? "m-4 peoplecard manager" : "m-4 peoplecard member"} onClick={props.onClick}>
                    {component()}
                </div>
            }

        </div>
    )
}
