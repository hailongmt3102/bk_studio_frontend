import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
            <div className='m-2 rounded-5 bg-white'>
                <h1 className='m-2 '>Project</h1>
                <div className='row'>
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
                    <div className='col-7 m-4 bg-white'>
                        <h1 className='m-2 '>Templates</h1>
                        <p className='m-2'>Variety template for your choice</p>
                    </div>
                    <div className='col-4 m-4 bg-white'>
                        <h1 className='m-2 '>People</h1>
                        <div className='row'>
                            {
                                peopleList.slice(0).reverse().map((people, index) => {
                                    return <div id={index} className="col">
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
