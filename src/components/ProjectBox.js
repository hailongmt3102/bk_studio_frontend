import React from 'react';

import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'
import ThreeDotSvg from 'resources/icons/threedot.svg'



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

export default function ProjectBox(props) {
    return (
        <div className='shadow pb-2 pt-1 m-3 mb-5 bg-body' style={{ width: "450px", borderRadius: "20px" }}>
            <div className='m-4'>
                <div className='d-flex flex-row-reverse'>
                    <p className='m-3 mt-0'>{props.data.Status}</p>
                    <div className='bg-success' style={circle}>
                    </div>
                </div>
                <h3 className='d-flex justify-content-center' style={{color: "#0085FF"}}>
                    {props.data.Name}
                </h3>
                <div className='m-2'>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td><img src={ClockSvg} /></td>
                                <td style={orangeStyle}>Create time :</td>
                                <td>{timeCaster(props.data.CreateTime)}</td>
                            </tr>
                            <tr>
                                <td><img src={ClockSvg} /></td>
                                <td style={orangeStyle}>Start time :</td>
                                <td>{timeCaster(props.data.StartTime)}</td>
                            </tr>
                            <tr>
                                <td><img src={ClockSvg} /></td>
                                <td style={orangeStyle}>Predict end time :</td>
                                <td>{timeCaster(props.data.PredictEndtime)}</td>
                            </tr>
                            <tr>
                                <td><img src={MemberSvg} /></td>
                                <td style={orangeStyle}>Joined member :</td>
                                <td>{props.data.NumOfMember}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='d-flex justify-content-end'>
                <img src={ThreeDotSvg}/>
                </div>
            </div>
        </div>
    );
}
