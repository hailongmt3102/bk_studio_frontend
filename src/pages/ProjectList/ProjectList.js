import { getListProject } from 'api/Project';
import { loadingContext } from 'App';
import { useContext, useEffect, useState } from 'react';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import add_round from "resources/icons/add_round.svg";
import { content } from "utils/notification";
import ProjectBox from '../../components/ProjectCard/ProjectCard';
import { deep_blue_primary } from "../../utils/color";
import NewProjectModel from './components/NewProjectModel';
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

                setProjectList(response.data.reverse())
                //console.log(response.data.length)
                setLastProjectId(response.data.length)
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

    const updateData = (index, newData) => {
        try {
            setProjectList([...projectList.slice(0, index), newData, ...projectList.slice(index + 1)])
        } catch (error) {

        }
    }

    return (
        <div>
            <div className='d-flex flex-row pt-2'>

                <h2 class="ms-4 mt-1" style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>
                    Your projects:
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

            <div className='p-4 m-4 rounded-5 customforeground'>

                <div className='row'  >
                    {
                        projectList.map((project, index) => {
                            return <div id={index} className="col mt-4" style={{ maxWidth: "450px" }}>
                                <ProjectBox
                                    data={project}
                                    updateData={(newData) => updateData(index, newData)}
                                />
                            </div>
                        })
                    }
                </div>
            </div>
        </div>

    )
}
