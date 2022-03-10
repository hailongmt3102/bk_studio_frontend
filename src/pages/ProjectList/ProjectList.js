import React, { useState, useEffect } from 'react';
import { getListProject } from 'api/Project'
import ProjectBox from '../../components/ProjectBox'
import NewProjectModel from './components/NewProjectModel'
import { Roboto, Poppins } from "utils/font"
import { deep_blue_primary } from "../../utils/color"
import add_round from "resources/icons/add_round.svg"

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

            <h2 class="ms-4 mt-1" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> Project List</h2>
                <div className='d-flex flex-row pt-1'>

                    <button className='btn btn-default btn-lg ms-3 p-0'
                        onClick={() => {
                            setShowPModel(true)
                        }}
                    >
                        <img src={add_round} width="40px" height="40px" />
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
