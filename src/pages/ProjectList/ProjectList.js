import React, { useState, useEffect } from 'react';
import { getListProject } from 'api/Project'
import ProjectBox from '../../components/ProjectBox'
import NewProjectModel from './components/NewProjectModel'

const orangeStyle = {
    color: "#FF7F0D",
}

export default function ProjectList() {

    const [showPModel, setShowPModel] = useState(false)

    const [projectList, setProjectList] = useState([])

    const [appendProject, setAppendProject] = useState(0)

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
    }, [appendProject])

    return <div className='m-2 rounded-5 bg-white'>
        <div className='d-flex flex-row pt-2'>
            <h1 className='m-2 pe-4'>Project</h1>
            <button className='btn btn-default shadow bg-body rounded pl-2 pr-2'
                onClick={() => {
                    setShowPModel(true)
                }}
            >
                <h1 className='m-0 p-0' style={orangeStyle}>+</h1>
            </button>

            <NewProjectModel
                show={showPModel}
                handleClose={() => {
                    setShowPModel(false)
                }}
                onComplete={() => {
                    setAppendProject(appendProject + 1)
                }}
            />
        </div>
        <div className='row'>
            {
                projectList.slice(0).reverse().map((project, index) => {
                    return <div id={index} className="col">
                        <ProjectBox
                            data={project}
                        />
                    </div>
                })
            }
        </div>
    </div>
}
