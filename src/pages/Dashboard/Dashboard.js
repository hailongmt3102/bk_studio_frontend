import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Roboto, Poppins } from "../../utils/font"
import { deep_blue_primary } from "../../utils/color"
import { getListProject } from 'api/Project'
import { getListPeople } from 'api/People'
import ProjectBox from '../../components/ProjectBox'
import PeopleCardMini from "components/PeopleCardMini/PeopleCardMini"
export default function Dashboard() {
    const navigate = useNavigate()

    const [projectList, setProjectList] = useState([])
    const [peopleList, setPeopleList] = useState([])
    useEffect(() => {
        // get all project
        getListProject()
            .then(response => {
                setProjectList(response.data)
            })
            .catch(
                error => {
                    // if (error.response.status == 403) navigate('/account/login')
                }
            )
        getListPeople()
            .then(response => {
                setPeopleList(response.data)
            })
            .catch(
                error => {
                }
            )
    }, [])
    return (
        <div>
            <div className='row m-4 bg-white'>
                <h1 className='pt-2 ps-5' style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>Project</h1>
                <div className='ms-3 row'>
                    {
                        projectList.slice(0).reverse().map((project, index) => {
                            if (index >= 3) return null
                            return <div id={index} className="col">
                                <ProjectBox
                                    data={project}
                                />
                            </div>
                        })
                    }
                </div>

                <div className='row bg-light'>
                    <div className='col-7 mt-4 bg-white'>
                        <h1 className='m-2 ps-4' style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>Templates</h1>
                        <p className='m-2 ps-4'>Variety template for your choice</p>
                    </div>
                    <div className='col-3 mt-4 ms-4 bg-white' style={{"width":"620px"}}>
                        <h1 className='m-2 ps-4'style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>People</h1>
                        <div className='row p-2'>
                            {
                                peopleList.slice(0).reverse().map((people, index) => {
                                    return <div id={index} className="col m-2">
                                        <PeopleCardMini
                                            name={people.UserName}
                                            email={people.Email}
                                        />
                                    </div>
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
