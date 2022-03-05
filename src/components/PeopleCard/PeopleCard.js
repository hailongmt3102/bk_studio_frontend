import React from 'react'
import '../css/TextFont.css'
import './peopleCard.css'

export default function PeopleCard(props) {
    return (
        <div className={props.isManager? "m-4 peoplecard manager" : "m-4 peoplecard member"} onClick={props.onClick}>
            <div className='d-flex align-items-center'>
                <img className='m-2' src={props.avatar} />
                <div className='ms-4'>
                    <h2>
                        {props.name}
                    </h2>
                    <div>
                        Email: {props.email}
                    </div>
                    <div>
                        Joining date: {props.birthday}
                    </div>
                    <div>
                        Phone number: {props.gender}
                    </div>
                </div>
            </div>
        </div>
    )
}
