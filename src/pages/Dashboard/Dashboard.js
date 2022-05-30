import { useContext, useEffect, useState } from 'react'
import { loadingContext } from 'App'
import { getListPeople } from 'api/People'
import { getListProject } from 'api/Project'
import { getAllTemplate } from "api/Templates"
import PeopleCardMini from "components/PeopleCardMini/PeopleCardMini"
import TemplateMiniCard from "components/TemplateCard/TemplateMiniCard"
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { localizationContext, socketContext } from '../../App'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { deep_blue_primary } from "../../utils/color"
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
export default function Dashboard() {
    const socket = useContext(socketContext)
    // use localization.
    const setIsLoading = useContext(loadingContext)
    const localization = useContext(localizationContext)
    const [projectList, setProjectList] = useState([])
    const [peopleList, setPeopleList] = useState([])
    const [reports, setReports] = useState([])

    const updateData = (index, newData) => {
        setProjectList([...projectList.slice(0, index), newData, ...projectList.slice(index + 1)])
    }

    const getData = async () => {
        try {
            setIsLoading(true)
            let projectList = await getListProject()
            let peopleList = await getListPeople()
            let templateList = await getAllTemplate()

            setProjectList(projectList.data.reverse())
            setPeopleList(peopleList.data)
            console.log(peopleList)
            setReports(templateList.data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            Store.addNotification(content("Fail", error.response.data, "danger"))
            return
        }
    }

    useEffect(() => {
        // get all project
        getData()
    }, [])

    return (
        <div className='m-0 ps-4 pe-4'>
            <div className='mt-2 mb-2 customforeground'>
                <h1 className='ms-4 mt-2 PrimaryFontColor' style={{ "fontWeight": "bold", fontSize: "40px" }}>{localization.Project}</h1>
                <ScrollMenu>
                    {projectList.map((ele, index) => (
                        <div className='col ms-5 mb-4 mt-4'>
                            <ProjectCard
                                data={ele}
                                updateData={(newData) => updateData(index, newData)}
                            />
                        </div>
                    ))}
                </ScrollMenu>
            </div>
            <div className='mt-2 mb-2  row' >
                <div className='col-7 m-0' style={{ height: "100%" }} >
                    <div className='m-2 ms-1 customforeground pb-5'>
                        <h1 className='m-0 pt-4 ms-4 p-0 PrimaryFontColor' style={{ "fontWeight": "bold", fontSize: "40px" }}>{localization.Templates}</h1>
                        <p className='m-0 ms-4 p-0'>Variety template for your choice</p>

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
                </div >
                <div className='col-5 m-0 p-0 '>
                    <div className='m-2 ms-1 pt-4 customforeground'>
                        <h1 className='m-0 ms-4 p-0 PrimaryFontColor' style={{ "fontWeight": "bold", fontSize: "40px" }}>{localization.People}</h1>
                        <div className='row ms-2'>
                            <div class="container m-0 p-0">
                                <div class="row mt-3 ">
                                    {
                                        peopleList.slice(0).reverse().map((people, index) => {
                                            return <div id={index} className="col-sm mt-4 ms-4" style={{ "minWidth": "300px", "maxWidth": "300px" }}>
                                                <PeopleCardMini
                                                    name={people.UserName}
                                                    email={people.Email}
                                                    avatar={people.Avatar}
                                                    Status={people.Status}
                                                />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div >
        </div >
    )
}
