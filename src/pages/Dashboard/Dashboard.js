import { useContext, useEffect, useState } from 'react'

import { getListPeople } from 'api/People'
import { getListProject } from 'api/Project'
import { getAllTemplate } from "api/Templates"
import PeopleCardMini from "components/PeopleCardMini/PeopleCardMini"
import TemplateMiniCard from "components/TemplateCard/TemplateMiniCard"
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { localizationContext } from '../../App'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { deep_blue_primary } from "../../utils/color"
export default function Dashboard() {
    // use localization
    const localization = useContext(localizationContext)
    const [projectList, setProjectList] = useState([])
    const [peopleList, setPeopleList] = useState([])
    const [reports, setReports] = useState([])

    const updateData = (index, newData) => {
        setProjectList([...projectList.slice(0, index), newData, ...projectList.slice(index + 1)])
    }

    const getData = async () => {
        try {
            let projectList = await getListProject()
            let peopleList = await getListPeople()
            let templateList = await getAllTemplate()

            setProjectList(projectList.data)
            setPeopleList(peopleList.data)
            setReports(templateList.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        // get all project
        getData()
    }, [])

    return (
        <div className='m-2'>
            <div className='row m-4 m-0 p-0 bg-white mb-4'>
                <h1 className='ms-4 mt-2' style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>{localization.Project}</h1>
                <div className='row m-0 p-0'>
                    <ScrollMenu>
                        {projectList.map((ele, index) => (
                            <div className='col ms-5 me-5 mb-4 mt-4'>
                                <ProjectCard
                                    data={ele}
                                    updateData={(newData) => updateData(index, newData)}
                                />
                            </div>
                        ))}
                    </ScrollMenu>
                </div>



                <div className='row bg-light' >
                    < div className=' col-7  mt-4  m-0 p-0 bg-light' >
                        <div className=' bg-white me-4  ' style={{ "minHeight": "1000px" }} >
                            <h1 className='m-0 pt-4  ms-4 p-0' style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>{localization.Templates}</h1>
                            <p className='m-0 ms-4 p-0'>Variety template for your choice</p>
                            <div className='row pe-2'>
                                <div class="container m-0 p-0">
                                    <div class="row justify-content-center m-0 p-0">
                                        {reports.map(ele =>
                                            <div
                                                className='col-lg mt-4 m-0 p-0'
                                                style={{ "minWidth": "300px", "maxWidth": "300px" }}
                                            >
                                                <TemplateMiniCard data={ele} type="Templates" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div >
                    <div className='col-5  m-0 mt-4 bg-white p-0 ' style={{ "minHeight": "1000px" }}>

                        <h1 className='m-0 mt-4 ms-4 p-0' style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>{localization.People}</h1>
                        <div className='row ms-2'>
                            <div class="container m-0 p-0">
                                <div class="row ms-5 mt-3   ">
                                    {
                                        peopleList.slice(0).reverse().map((people, index) => {
                                            return <div id={index} className="col-sm mt-4 ms-4" style={{ "minWidth": "300px", "maxWidth": "300px" }}>
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



                </div >
            </div >
        </div >
    )
}
