import React, { useContext, useEffect, useState } from 'react'

import { deep_blue_primary } from "../../utils/color"
import { getListProject } from 'api/Project'
import { getListPeople } from 'api/People'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import PeopleCardMini from "components/PeopleCardMini/PeopleCardMini"
import { localizationContext } from '../../App'
import { getAllTemplate } from "api/Templates"
import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"
import ReportCard from "components/ReportCard/ReportCard"
import TemplateMiniCard from "components/TemplateCard/TemplateMiniCard"
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
export default function Dashboard() {
    // use localization
    const localization = useContext(localizationContext)
    const [projectList, setProjectList] = useState([])
    const [peopleList, setPeopleList] = useState([])
    const [reports, setReports] = useState([])
    useEffect(() => {
        // get all project
        getListProject()
            .then(response => {
                setProjectList(response.data)
            })
            .catch(
                error => {
                    Store.addNotification(content("Warning", error.response.data, "danger"))
                    return
                }
            )
        getListPeople()
            .then(response => {
                setPeopleList(response.data)
            })
            .catch(
                error => {
                    Store.addNotification(content("Warning", error.response.data, "danger"))
                    return
                }
            )
        getAllTemplate()
            .then(res => {
                console.log(res.data)
                setReports(res.data)
            })
            .catch(err => {
                Store.addNotification(content("Warning", err.response.data, "danger"))
                return
            })
    }, [])

    return (
        <div className='m-2'>
            <div className='row m-4 m-0 p-0 '>
                <div className="rowm-0 p-0 bg-white ">
                    <h1 className='ms-4  mt-4' style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>{localization.Project}</h1>
                    <div className='row m-0 p-0'>
                        <ScrollMenu>
                            {projectList.map((ele, index) => (
                                <div className='col ms-5'>
                                    <ProjectCard
                                        data={ele}
                                    />
                                </div>
                            ))}
                        </ScrollMenu>
                    </div>
                </div>


                <div className='row bg-light  m-0 p-0'>
                    <div className='col-7 m-0 p-0'>
                        <div className=' me-4 mt-4  bg-white' style={{ "minHeight": "1000px" }}>
                            <h1 className='m-0 ms-4 p-0' style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>{localization.Templates}</h1>
                            <p className='m-0 ms-4 p-0'>Variety template for your choice</p>
                            <div className='row m-0 p-0'>
                                {reports.map(ele =>
                                    <div className='col mt-4 m-0 p-0' style={{ "minWidth": "300px", "minHeight": "300px", "maxWidth": "400px", maxHeight: "300px" }} >
                                        <TemplateMiniCard data={ele} type="Templates" />
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className='col-5 m-0 p-0'>
                        <div className=' mt-4  bg-white' style={{ "minHeight": "1000px" }}>
                            <h1 style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>{localization.People}</h1>
                            <div className='row ms-2'>
                                <div class="container">
                                    <div class="row">
                                    {
                                    peopleList.slice(0).reverse().map((people, index) => {
                                        return <div id={index} className="col-sm mt-4" style={{"minWidth": "300px"}}>
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
            </div>
        </div>
    )
}
