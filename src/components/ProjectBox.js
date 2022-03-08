import React from 'react';

import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'
import ThreeDotSvg from 'resources/icons/threedot.svg'
import three_dot from "resources/icons/three-dot.svg"
import ThreeDotButton from 'components/ThreeDotButton'
import delete_icon from 'resources/icons/delete.svg'
import edit from 'resources/icons/edit.svg'
const orangeStyle = {
    color: "#FF7F0D",
    fontWeight: "bold"
}

const circle = {
    width: "16px",
    height: "16px",
    borderRadius: "8px"
}


const timeCaster = (time) => {
    return time.substring(0, 19).replace('T', " ")
}

const option_list = ["Rename", "Delete Project"]

const icons_list = [edit, delete_icon]
export default function ProjectBox(props) {
    return (
        <div className='shadow pb-2 pt-1 m-3 mb-5 bg-body' style={{ width: "450px", borderRadius: "20px" }}>
            <div className='m-4'>
                <div className='d-flex flex-row-reverse'>
                    <p className='m-3 mt-0'>{props.data.Status}</p>
                    <div className='bg-success' style={circle}>
                    </div>
                </div>
                <h3 className='d-flex justify-content-center' style={{ color: "#0085FF", fontSize:"36px" }}>
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
                    <ThreeDotButton title={'adđ'} items={option_list} icons_list={icons_list} icon={three_dot} onClick={(val) => { }} />
                </div>
            </div>
        </div>
    );
}
