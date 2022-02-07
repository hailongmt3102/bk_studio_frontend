import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getListProject } from 'api/Project'
import ProjectBox from './components/ProjectBox'

export default function Dashboard() {
    const [projectList, setProjectList] = useState([])
    useEffect(() => {
        // get all project
        getListProject()
            .then(response => {
                setProjectList(response.data)
            })
            .catch(
                error => {
                    console.log(error)
                }
            )
    })
    return (
        <div>
            <div className='m-2 rounded-5 bg-white'>
                <h1 className='m-2'>Project</h1>
                <div className='row'>
                    {
                        projectList.map((project, index) => {
                            return <div id={index}>
                                <ProjectBox
                                    data={project}
                                />
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
