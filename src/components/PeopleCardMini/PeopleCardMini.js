import React from 'react'


import '../PeopleCard/peopleCard.css'


import people_default from "resources/icons/people_default.svg"
export default function PeopleCardMini(props) {
    return (
        <div className='row'>
            <div className='col-1'>
                {props.avatar === "" ?
                    <img  src={people_default} height="40px" width="40px" />
                    : <img  src={props.avatar} height="40px" width="40px" style={{ "border-radius": "50%" }} />
                }
            </div>
            <div className='col-11' >
                <h5 className=' ms-4 customFontRoboto' style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {props.name}
                </h5>
                <h5 className=' ms-4 customFontRoboto' style={{ fontSize: "16px" }}>
                    {props.email.substring(1,25)}
                </h5>
            </div>

        </div>
    )
}
