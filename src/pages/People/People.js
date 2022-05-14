import React, { useEffect, useState, useContext } from 'react'
import { localizationContext } from '../../App'
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import avt_people from "resources/icons/avt_people.svg"


import PeopleCard from "components/PeopleCard/PeopleCard"


import { getListPeople } from '../../api/People'


export default function People() {
    const localization = useContext(localizationContext)
    let getEmail = localStorage.getItem("email") || ""
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
            <h2 class="ms-4 PrimaryFontColor" style={{"fontWeight": "bold", fontSize: "40px" }}> {localization.People}</h2>
            <div className='rounded-5'>
                <div className='row m-0 p-0 customforeground'>
                    <div className='col-4 m-0 p-0 '>
                        <div className='m-3 p-4 overflow' style={{ height: "100%" }} >
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
                                        />
                                    }
                                })
                            }

                        </div>

                    </div>
                    <div className='col-8  m-0 p-0' >
                        <div className='m-3 m-0 p-0 p-4 overflow' style={{ height: "100%" }}>
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