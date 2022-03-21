import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllReport as getAllReportApi } from 'api/Report'

import ReportImg from 'resources/images/report.png'

export default function Gallery(props) {

    const [reports, setReports] = useState([])

    const nav = useNavigate()

    useEffect(() => {
        let currentProject = localStorage.getItem("currentProject")
        if (currentProject != null) {
            getAllReportApi(currentProject)
                .then(res => {
                    console.log(res)
                    setReports(res.data)
                })
                .catch(res => {
                    alert(res.response.data)
                })
        }
    }, [])

    const editReport = (Id) => {
        nav(`${Id}/edit`)
    }   
    return (
        <div>
            <h1>Report Gallery</h1>
            <div className='bg-white m-2 p-4'>
                <div className='row'>
                    {reports.map(ele =>
                        <div className='col' onClick={() => {editReport(ele.Id)}}> 
                            {ele.Id}
                            <img src={ReportImg} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
