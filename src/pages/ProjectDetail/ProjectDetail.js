import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getListPeopleByProjectID } from '../../api/People'
import { inviteMember } from '../../api/Project'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import add_people from "resources/icons/add_people.svg"
import PeopleCard from "components/PeopleCard/PeopleCard"

import PeoplePopup from './components/PeoplePopup'

export default function ProjectDetail() {

    var location = useLocation()
    var navigate = useNavigate()
    const array = location.pathname.split("/");
    var project_id = array[array.length - 1]
    const [peopleInProject, setPeopleListInProject] = useState([])
    const [showPeoplePopUp, setshowPeoplePopUp] = useState(false)
    const [appendPeopleList, setAppendPeopleList] = useState(0)
    const [showRolePopUp, setshowRolePopUp] = useState(false)

    useEffect(() => {
        getListPeopleByProjectID(project_id)
            .then(response => {
                console.log(response.data)
                setPeopleListInProject(response.data)
            })
            .catch(
                error => {
                }
            )
    }, [appendPeopleList])


    return <div>
        <div>
            <PeoplePopup
                show={showPeoplePopUp}
                handleClose={() => {
                    setshowPeoplePopUp(false)
                }}
                onComplete={() => {
                    setAppendPeopleList(appendPeopleList + 1)
                }}
            />
            <div className='row mt-2 m-0 p-0'>
                <h2 class="col-10  m-0 p-0" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>
                    <div className='ms-4'>My team:</div>
                </h2>
                <div className='col-2 ml-auto m-0 p-0 text-right align-self-end'>
                    <button class=" btn p-3 ms-5 " type="button" style={{ color: "white", backgroundColor: deep_blue_primary, borderRadius: "30px ", fontFamily: Poppins, fontSize: 16 }} onClick={() => {
                        setshowPeoplePopUp(true)
                        //inviteMemberSubmit()
                    }}><div className='d-flex'>
                            <div className='d-flex justify-content-center me-2' style={{ color: "white", fontFamily: Poppins, fontSize: 17 }}>Invite People</div>
                            <div className='d-flex justify-content-center'><img src={add_people}  height="20px" width="20px"/></div>
                        </div>
                    </button>
                </div>
            </div>

            <div className='rounded-5 bg-white'>
                <div className='row bg-light'>
                    <div className='col m-4 bg-white'>

                        <h1 className='m-2' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Manager</h1>
                        {
                            peopleInProject.map((ele, index) => {
                                if (ele.Position !== "Manager") return null
                                return <PeopleCard
                                    onClick={() => {

                                    }}
                                    name={ele.UserName}
                                    email={ele.Email}
                                    avatar={ele.Avatar}
                                    rank={ele.RankAccount}
                                    birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                    gender={ele.Gender}
                                    isManager={true}
                                />
                            })
                        }
                    </div>
                    <div className='col m-4 bg-white'>
                        <h1 className='m-2' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Member</h1>
                        {
                            peopleInProject.map((ele, index) => {
                                if (ele.Position !== "Member") return null
                                return <PeopleCard
                                    onClick={() => {


                                    }}
                                    name={ele.UserName}
                                    email={ele.Email}
                                    avatar={ele.Avatar}
                                    rank={ele.RankAccount}
                                    birthday={ele.Birthday.substring(0, 10).split('-').reverse().join('-')}
                                    gender={ele.Gender}
                                    isManager={false}
                                />
                            })
                        }
                    </div>

                </div>
            </div>
        </div>

    </div>;
}
