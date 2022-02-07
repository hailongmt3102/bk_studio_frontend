import React from 'react';

import ClockSvg from 'resources/icons/clock.svg'
import MemberSvg from 'resources/icons/two_people.svg'


const orangeStyle = {
    color: "#FF7F0D",
    fontWeight: "bold"
}

const timeCaster = (time) => {
    return time.substring(0, 19).replace('T', " ")
}

export default function ProjectBox(props) {
    return (
        <div className='rounded-5 border border-dark' style={{ maxWidth: "450px" }}>
            <div className='m-4'>
                <h3>
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
            </div>
        </div>
    );
}
