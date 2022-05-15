import React from 'react'


import '../PeopleCard/peopleCard.css'


import people_default from "resources/icons/people_default.svg"
export default function PeopleCardMini(props) {
    return (
        <div className='row justify-content-center m-auto level1 p-1'>
            <div className='col-2 '>
                {props.avatar === "" ?
                    <img src={people_default} height="50px" width="50px" />
                    : <img src={props.avatar} height="50px" width="50px" style={{ "border-radius": "50%" }} />
                }
            </div>
            <div className='col-10 overflow' >
                <h5 className=' ms-4 customFontRoboto' style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {props.name}
                </h5>
                <h5 className=' ms-4 customFontRoboto ' style={{ fontSize: "16px" }}>
                    {props.email}
                </h5>
            </div>

        </div>
    )
}
