import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlankReportIcon from 'resources/icons/blankReport.svg'
import { getListProject } from 'api/Project'

import { deep_blue_primary, blue_cloud } from "../../utils/color"
import { createNewReport as CreateReportApi } from 'api/Report'

export default function CreateReport() {
    const nav = useNavigate()
    const newReport = () => {
        let currentProjectId = localStorage.getItem("currentProject")
        if (currentProjectId != null) {
            CreateReportApi(currentProjectId,
                {
                    Hastag: "",
                    Description: "example", 
                    Name : "New Report"
                }
            )
                .then(res => {
                    console.log(res.data.status)
                    nav(`/project/gallery/${res.data.Id}/edit`)
                })
                .catch(err => {
                    alert(err.response.data)
                })
        } else {
            alert("You must create project first")
        }
    }
    return (
        <div>
            <div className='m-2 mt-4 mb-4'>
                <h2 class="ms-4 mt-1" style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>
                    Create a report
                </h2>
            </div>
            <div className='bg-white p-3'>
                <div>
                    <h3 class="ms-4 mt-1" style={{ color: blue_cloud, "font-weight": "bold", fontSize: "40px" }}>
                        From a blank
                    </h3>
                    <button className=' ms-4 btn btn-lg btn-default m-2 p-2 shadow p-3 mb-5 bg-body rounded' onClick={() => {
                        newReport()
                    }}>
                        <img src={BlankReportIcon} />
                    </button>
                </div>
                <div>
                    <h3 class="ms-4 mt-1" style={{ color: blue_cloud, "font-weight": "bold", fontSize: "40px" }}>
                        From a template
                    </h3>

                </div>
            </div>
        </div>
    )
}
