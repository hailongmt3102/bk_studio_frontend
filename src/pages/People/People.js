import React, { useEffect, useState, useContext } from 'react'
import { localizationContext } from '../../App'
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import avt_people from "resources/icons/avt_people.svg"

import PeopleCard from "components/PeopleCard/PeopleCard"
import { getListPeople } from '../../api/People'
import { socketContext } from "App"


export default function People() {
    const localization = useContext(localizationContext)
    let getEmail = localStorage.getItem("email") || ""
    //console.log(getEmail)
    const [people, setPeople] = useState([])

    const { onlineStatus } = useContext(socketContext)

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

    // pass status to people card
    const passStatus = (Email) => {
        if (Object.keys(onlineStatus).includes(Email)) {
            let status = onlineStatus[Email]
            if (status.Status === "online") return "online"
            if (status.Time === "") return "offline"

            // offline some minuted ago
            let second =  Math.floor((Date.now() - status.Time)/1000)
            if (second < 60) return `online ${second} second ago`
            else if (second < 3600) return `online ${Math.floor(second / 60)} minute ago`
            return `online ${Math.floor(second / 3600)} hour ago`
        }
        return "offline"
    }

    return (
        <div>
            <h2 class="ms-4 PrimaryFontColor" style={{ "fontWeight": "bold", fontSize: "40px" }}> {localization.People}</h2>
            <div className='rounded-5'>
                <div className='row m-0 p-0 '>
                    <div className='col-4 m-0 p-0  '>
                        <div className='m-3 p-4 customforeground overflow' style={{ height: "100%" }} >
                            <h1 className='row  m-0 p-0 customFontBold SecondFontColor ' >{localization.manager}</h1>
                            {
                                people.map((ele) => {
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
                                                Status={passStatus(ele.Email)}
                                            />
                                        }
                                    }
                                    else {
                                        if (ele.Position !== "Manager") return null
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
                                            isMe={false}
                                            Status={passStatus(ele.Email)}
                                        />
                                    }
                                })
                            }

                        </div>

                    </div>
                    <div className='col-8  m-0 p-0 ' >
                        <div className='m-3 m-0 p-0 p-4 customforeground overflow' style={{ height: "100%" }}>
                            <h1 className=' m-0 p-0 customFontBold SecondFontColor '>{localization.member}</h1>
                            <div className='row m-0 p-0'>
                                {
                                    people.map((ele) => {
                                        if (ele.Position !== "Member") return null
                                        return <div class="col-4 m-0 p-0" >
                                            {ele.Email !== getEmail ? <PeopleCard
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
                                                Status={passStatus(ele.Email)}
                                            /> : <PeopleCard
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
                                                Status={passStatus(ele.Email)}
                                            />
                                            }
                                        </div>
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