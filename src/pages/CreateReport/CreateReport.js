import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlankReportIcon from 'resources/icons/blankReport.svg'

import { createNewReport as CreateReportApi } from 'api/Report'

export default function CreateReport() {
    const nav = useNavigate()
    const newReport = () => {
        let currentProjectId = localStorage.getItem("currentProject")
        if (currentProjectId != null) {
            CreateReportApi(currentProjectId,
                {
                    Hastag: "2022",
                    Description: "example"
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
                <h1>Create a report</h1>
            </div>
            <div className='bg-white p-3'>
                <div>
                    <h2>From a blank</h2>
                    <button className='btn btn-default m-2 p-2 shadow p-3 mb-5 bg-body rounded' onClick={() => {
                        newReport()
                    }}>
                        <img src={BlankReportIcon} />
                    </button>
                </div>
                <div>
                    <h2>From a template</h2>
                </div>
            </div>
        </div>
    )
}
