import React, { useState, useEffect } from 'react';
import { getListProject } from 'api/Project'
import ProjectBox from '../../components/ProjectBox'
import NewProjectModel from './components/NewProjectModel'
import { Roboto, Poppins } from "utils/font"
import { deep_blue_primary } from "../../utils/color"
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

    return (
        <div>
            <div className='d-flex flex-row pt-2'>

                <h1 className='m-2 ps-4 pe-3 mt-3' style={{ fontFamily: Poppins, color: deep_blue_primary, fontWeight: "bold", fontSize: "40px" }}>Project</h1>
                <div className='d-flex flex-row pt-1'>

                    <button className='btn btn-default shadow bg-body rounded pl-2 pr-2 mt-1'
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

            </div>

            <div className='p-4 m-4 rounded-5 bg-white'>

                <div className='row m-4'>
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
        </div>

    )
}
