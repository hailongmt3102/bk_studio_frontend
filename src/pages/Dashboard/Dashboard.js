import React, { useContext, useEffect, useState } from 'react'

import { deep_blue_primary } from "../../utils/color"
import { getListProject } from 'api/Project'
import { getListPeople } from 'api/People'
import ProjectBox from '../../components/ProjectCard/ProjectBox'
import PeopleCardMini from "components/PeopleCardMini/PeopleCardMini"
import { localizationContext } from '../../App'
export default function Dashboard() {
        // use localization
    const localization = useContext(localizationContext)
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
        <div className='m-2'>
            <div className='row m-4 m-0 p-0 '>
                <div  className="row p-4 m-0 p-0 bg-white ">
                    <h1 className='ms-3' style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>{localization.Project}</h1>
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
                </div>


                <div className='row bg-light  m-0 p-0 '>
                    <div className='col-7 m-0 p-0'>
                        <div className='me-4 mt-4 p-4 bg-white'>
                            <h1 className='' style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>{localization.Templates}</h1>
                            <p className=''>Variety template for your choice</p>
                        </div>

                    </div>
                    <div className='col-5 m-0 p-0'>
                        <div className=' mt-4 p-4 bg-white'>
                            <h1 style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>{localization.People}</h1>
                            <div className='row'>
                                {
                                    peopleList.slice(0).reverse().map((people, index) => {
                                        return <div id={index} className="col m-2">
                                            <PeopleCardMini
                                                name={people.UserName}
                                                email={people.Email}
                                                avatar={people.Avatar}
                                            />
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
