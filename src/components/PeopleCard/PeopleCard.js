import React from 'react'
import '../css/TextFont.css'
import './peopleCard.css'
import { Roboto, Poppins } from "../../utils/font"


const textStyle = {
    fontFamily: Roboto,
}
export default function PeopleCard(props) {
    return (
        <div className={props.isManager? "m-4 peoplecard manager" : "m-4 peoplecard member"} onClick={props.onClick}>
            <div className='d-flex align-items-center'>
                <img className='m-4' src={props.avatar} />
                <div className='ms-4'>
                    <h2 style={{textStyle,"fontWeight":"bold", fontSize:"30px"}}>
                        {props.name}
                    </h2>
                    <div style={{textStyle}}>
                        Email: {props.email}
                    </div>
                    <div style={{textStyle}}>
                        Joining date: {props.birthday}
                    </div>
                    <div style={{textStyle}}>
                        Phone number: {props.gender}
                    </div>
                </div>
            </div>
        </div>
    )
}
