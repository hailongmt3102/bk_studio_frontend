import React, { useEffect, useState } from 'react'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import { Form, InputGroup, Col, Row, Container, Button } from 'react-bootstrap'
import avt_people from "resources/icons/avt_people.svg"
import tick from "resources/icons/tick.svg"

import PeopleCard from "components/PeopleCard/PeopleCard"
import {getListPeople} from '../../api/People'
export default function People() {
    const [people, setPeople] = useState([])
    useEffect(() => {
        // get list people
        getListPeople()
        .then(res => {
            setPeople(res.data)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])
    return (
        <div>
            <h2 class="ms-4" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> People:</h2>
            <div className='rounded-5 bg-white'>
                <div className='row bg-light'>
                    <div className='col m-4 bg-white'>
                        <h1 className='m-2' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Manager</h1>
                        {
                            people.map((ele, index) => {
                                if (ele.Position !== "Manager") return null
                                return <PeopleCard
                                    onClick={() => {

                                    }}
                                    name={ele.UserName}
                                    avatar={avt_people}
                                    birthday={ele.Birthday.substring(0,10).split('-').reverse().join('-')}
                                    gender={ele.Gender}
                                    isManager={true}
                                />
                            })
                        }
                    </div>
                    <div className='col m-4 bg-white'>
                        <h1 className='m-2' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Member</h1>
                        {
                            people.map((ele, index) => {
                                if (ele.Position !== "Member") return null
                                return <PeopleCard
                                    onClick={() => {

                                    }}
                                    name={ele.UserName}
                                    avatar={avt_people}
                                    birthday={ele.Birthday.substring(0,10).split('-').reverse().join('-')}
                                    gender={ele.Gender}
                                    isManager={false}
                                />
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
