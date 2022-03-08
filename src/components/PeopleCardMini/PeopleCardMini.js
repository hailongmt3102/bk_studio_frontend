import React from 'react'

import { Roboto, Poppins } from "../../utils/font"
import '../PeopleCard/peopleCard.css'
import avt_people from "resources/icons/avt_people.svg"
export default function PeopleCardMini(props) {
    return (
        <div  onClick={props.onClick}>
            <div className='d-flex align-items-center'>
                <img className='m-2' src={avt_people} width="60px" height="60px" />
                <div className='ms-4' >
                    <h5 style={{ fontFamily: Roboto, fontSize: "20px"}}>
                        {props.name}
                    </h5>
                    <h5 style={{ fontFamily: Roboto, fontSize: "20px"}}>
                        {"@"+props.email}
                    </h5>
                </div>
            </div>
        </div>
    )
}
