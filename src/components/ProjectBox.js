import React, { useState } from 'react';

import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'
import ThreeDotSvg from 'resources/icons/threedot.svg'
import three_dot from "resources/icons/three-dot.svg"
import ThreeDotButton from 'components/ThreeDotButton'
import DropdownWithIndex0 from 'components/DropdownWithIndex0'
import { useNavigate } from 'react-router-dom'
import delete_icon from 'resources/icons/delete.svg'
import edit from 'resources/icons/edit.svg'
import active_icon from 'resources/icons/status/active.svg'
import closed_icon from 'resources/icons/status/closed.svg'
import now_icon from 'resources/icons/status/now.svg'
import CustomDropdownButton from 'pages/EditReport/components/CustomDropdownButton';

import {changeStatus, deleteProject} from 'api/Project'


const orangeStyle = {
    color: "#FF7F0D",
    fontWeight: "bold"
}






const timeCaster = (time) => {
    return time.substring(0, 19).replace('T', " ")
}


export default function ProjectBox(props) {
    const option_list = ["Rename", "Delete Project"]

    const status_list = ["Active", "Now", "Closed"]
    const staus_icon_list = [active_icon, now_icon, closed_icon]
    const icons_list = [edit, delete_icon]
    const [newProject, setNewProject] = useState({
        Id: props.data.Id,
        Status: props.data.Status,
    })
    const navigate = useNavigate()
    const ChangeStatatusSubmit = () => {
     
        changeStatus(newProject)
            .then((res) => {

                // alert('Changed Status');
            })
            .catch((e) => {
                alert(e.response.data);
            })

    }
    const DeleteProjectSubmit = () => {
     
        deleteProject({
            Id: props.data.Id
        })
            .then((res) => {
                
                alert('Deleted project ID: ' +props.data.Id );
            
            })
            .catch((e) => {
                alert(e.response.data);
            })

    }
    return (
        <div className='shadow pb-2 pt-1 m-3 mb-5 bg-body' style={{ width: "450px", borderRadius: "20px" }}>
            <div className='mt-1 p-2'>
                <div className='row justify-content-end pe-3'>
                    <div className='col-2'>     
                        <DropdownWithIndex0 title={newProject.Status} items={status_list} icons_list={staus_icon_list} onClick={(val) => {
                            setNewProject({
                                ...newProject, Status: val
                            })
                            ChangeStatatusSubmit();
                        }} />
                    </div>
                </div>
                <h3 className='d-flex justify-content-center' style={{ color: "#0085FF", fontSize: "36px" }}>
                    {props.data.Name}
                </h3>
                <div className='m-2'>
                    <div class="row mt-3">
                        <div className='col-1'>
                            <img src={ClockSvg} />
                        </div>
                        <div className='col-5'>
                            <div style={orangeStyle}>Created at:</div>
                        </div>
                        <div className='col'>
                            <div>{timeCaster(props.data.CreateTime)}</div>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div className='col-1'>
                            <img src={ClockSvg} />
                        </div>
                        <div className='col-5'>
                            <div style={orangeStyle}>Start time :</div>
                        </div>
                        <div className='col'>
                            <div>{timeCaster(props.data.StartTime)}</div>
                        </div>
                    </div>
                    <div class="row  mt-2">
                        <div className='col-1'>
                            <img src={ClockSvg} />
                        </div>
                        <div className='col-5'>
                            <div style={orangeStyle}>Estimated End Time:</div>
                        </div>
                        <div className='col'>
                            <div>{timeCaster(props.data.PredictEndtime)}</div>
                        </div>
                    </div>
                    <div class="row  mt-2">
                        <div className='col-1'>
                            <img src={MemberSvg} />
                        </div>
                        <div className='col-5'>
                            <div style={orangeStyle}>Joined member :</div>
                        </div>
                        <div className='col'>
                            <div>{props.data.NumOfMember}</div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <ThreeDotButton title={'adđ'} items={option_list} icons_list={icons_list} icon={three_dot} onClick={(val) => { 
                        if (val == 'delete') 
                            DeleteProjectSubmit()
                        
                    }} />
                </div>
            </div>
        </div>
    );
}
