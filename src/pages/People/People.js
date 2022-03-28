import React, { useEffect, useState } from 'react'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import { Form, InputGroup, Col, Row, Container, Button } from 'react-bootstrap'
import avt_people from "resources/icons/avt_people.svg"
import tick from "resources/icons/tick.svg"

import PeopleCard from "components/PeopleCard/PeopleCard"


import { getListPeople } from '../../api/People'

const textStyle = {
    fontFamily: Roboto,
}
export default function People() {

    let getEmail = localStorage.getItem("email") ?? ""
    //console.log(getEmail)
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
                <div className='row m-0 p-0 bg-light'>
                    <div className='col-4 m-0 p-0 '>
                        <div className='m-4 p-4 bg-white' style={{ height: "100%" }}>
                            <h1 className='row ' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Manager</h1>
                            <div class="p-2"> {
                                people.map((ele, index) => {
                                    if (ele.Email === getEmail) {
                                        if (ele.Position !== "Manager") return null
                                        else {
                                            return <PeopleCard
                                                position={ele.Position}
                                                name={ele.UserName}
                                                email={ele.Email}
                                                avatar={ele.Avatar}
                                                rank={ele.RankAccount}
                                                birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                                gender={ele.Gender}
                                                isManager={true}
                                                showThreeDotButton={false}
                                                isMe={true}
                                            />
                                        }
                                    }
                                    else {
                                        if (ele.Position !== "Manager") return null
                                        return <div class="d-flex p-2"> <PeopleCard
                                        position={ele.Position}
                                            name={ele.UserName}
                                            email={ele.Email}
                                            avatar={ele.Avatar}
                                            rank={ele.RankAccount}
                                            birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                            gender={ele.Gender}
                                            isManager={true}
                                            showThreeDotButton={false}
                                            isMe={false}
                                        />
                                        </div>

                                    }

                                })
                            }
                            </div>
                        </div>

                    </div>
                    <div className='col-8 m-0 p-0' >
                        <div className='m-4 p-4 bg-white' style={{ height: "100%" }}>
                            <h1 style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Member</h1>
                            <div className='row ms-3'>{
                                people.map((ele, index) => {
                                    if (ele.Email === getEmail) {
                                        if (ele.Position !== "Member") return null
                                        else {
                                            return <PeopleCard
                                            position={ele.Position}
                                                name={ele.UserName}
                                                email={ele.Email}
                                                avatar={ele.Avatar}
                                                rank={ele.RankAccount}
                                                birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                                gender={ele.Gender}
                                                isManager={false}
                                                showThreeDotButton={false}
                                                isMe={true}

                                            />
                                        }
                                    }
                                    else {
                                        if (ele.Position !== "Member") return null
                                        return <div class="d-flex p-2"> <PeopleCard
                                        position={ele.Position}
                                            name={ele.UserName}
                                            email={ele.Email}
                                            avatar={ele.Avatar}
                                            rank={ele.RankAccount}
                                            birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                            gender={ele.Gender}
                                            isManager={false}
                                            showThreeDotButton={false}
                                            isMe={false}
                                        />
                                        </div>

                                    }


                                })
                            }
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}