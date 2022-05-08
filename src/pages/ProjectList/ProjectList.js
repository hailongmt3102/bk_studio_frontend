import React, { useState, useEffect, useContext } from 'react';
import { getListProject } from 'api/Project'
import ProjectBox from '../../components/ProjectCard/ProjectCard'
import NewProjectModel from './components/NewProjectModel'
import { loadingContext } from 'App'
import { deep_blue_primary } from "../../utils/color"
import add_round from "resources/icons/add_round.svg"
import { useNavigate } from 'react-router-dom'
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
const orangeStyle = {
    color: "#FF7F0D",
}

export default function ProjectList() {
    const setIsLoading = useContext(loadingContext)
    const [showPModel, setShowPModel] = useState(false)

    const [projectList, setProjectList] = useState([])

    const [appendProject, setAppendProject] = useState(0)

    const [lastProjectId, setLastProjectId] = useState(0)

    const navigate = useNavigate()
    useEffect(() => {
        setIsLoading(true)
        // get all project
        getListProject()
            .then(response => {

                setProjectList(response.data)
                //console.log(response.data.length)
                setLastProjectId(response.data.length !== 0 ? response.data.length : 0)
                setIsLoading(false)
                //console.log(lastProjectId)
            })
            .catch(
                error => {
                    setIsLoading(false)
                    Store.addNotification(content("Fail", error.response.data, "danger"))
                    return
                }
            )
    }, [appendProject])

    return (
        <div>
            <div className='d-flex flex-row pt-2'>

                <h2 class="ms-4 mt-1" style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>
                    Project list
                </h2>
                <div className='d-flex flex-row pt-1'>

                    <button className='btn btn-default btn-lg ms-3 p-0'
                        onClick={() => {
                            setShowPModel(true)
                        }}
                    >
                        <img src={add_round} width="40px" height="40px" />
                    </button>

                    <NewProjectModel
                        newProjectId={lastProjectId + 1}
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

                <div className='row'  >
                    {
                        projectList.slice(0).reverse().map((project, index) => {
                            return <div id={index} className="col mt-4" style={{ maxWidth: "450px" }}>
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
