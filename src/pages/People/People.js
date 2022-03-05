import React from 'react'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import { Form, InputGroup, Col, Row, Container, Button } from 'react-bootstrap'
import avt_people from "resources/icons/avt_people.svg"
import tick from "resources/icons/tick.svg"

import PeopleCard from "components/PeopleCard/PeopleCard"
export default function People() {
    return (
        <div>
            <h2 class="ms-4" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> People:</h2>
            <div className='rounded-5 bg-white'>
                <div className='row bg-light'>
                    <div className='col m-4 bg-white'>
                        <h1 className='m-2' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Manager</h1>
                        <PeopleCard
                            onClick={() => {
                            }}
                            name="Pixsellz"
                            avatar={avt_people}
                            email="pixsellzproaaaaaa@gmail.com"
                            joiningDate="1/10/2020"
                            phone="0362590315"
                            isManager={true}
                        />
                    </div>
                    <div className='col m-4 bg-white'>
                        <h1 className='m-2' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Member</h1>
                        <PeopleCard
                            onClick={() => {
                            }}
                            name="Pixsellz"
                            avatar={avt_people}
                            email="pixsellzproaaaaaa@gmail.com"
                            joiningDate="1/10/2020"
                            phone="0362590315"
                            isManager={false}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}
