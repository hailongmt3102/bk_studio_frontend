import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getListPeopleByProjectID } from '../../api/People'
import { inviteMember } from '../../api/Project'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import avt_people from "resources/icons/avt_people.svg"


import PeopleCard from "components/PeopleCard/PeopleCard"

export default function ProjectDetail() {

    var location = useLocation()
    var navigate = useNavigate()
    const array = location.pathname.split("/");
    var project_id = array[array.length - 1]
    const [peopleInProject, setPeopleListInProject] = useState([])

    

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
    }, [])
    const inviteMemberSubmit = () => {

        inviteMember(project_id)
            .then((res) => {

                // alert('Changed Status');
            })
            .catch((e) => {
                alert(e.response.data);
            })

    }

    return <div>
        <div>
            <h2 class="ms-4" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> People:</h2>
            <button class=" btn sm ms-4 p-3" type="button" style={{ color: "white", backgroundColor: "#FF7F0D", borderRadius: "30px ", fontFamily: Poppins, fontSize: 14 }} onClick={() => {
                //inviteMemberSubmit()
            }}>Invite People</button>
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
                                    isManager={true}
                                />
                            })
                        }
                    </div>

                </div>
            </div>
        </div>

    </div>;
}
