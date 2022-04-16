import React from 'react'


import '../PeopleCard/peopleCard.css'


import people_default from "resources/icons/people_default.svg"
export default function PeopleCardMini(props) {
    return (
        <div>
            <div className='d-flex align-items-center'>
                {props.avatar === "" ?
                    <img src={people_default} height="40px" width="40px" />
                    : <img src={props.avatar} height="40px" width="40px" style={{ "border-radius": "50%" }} />}
                <div className='ms-4' >
                    <h5 className='customFontRoboto' style={{  fontSize: "20px", fontWeight: "bold" }}>
                        {props.name}
                    </h5>
                    <h5 className='customFontRoboto' style={{  fontSize: "16px" }}>
                        {props.email}
                    </h5>
                </div>
            </div>
        </div>
    )
}
