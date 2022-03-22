import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllReport as getAllReportApi } from 'api/Report'
import ReportCard from "components/ReportCard"
import ReportImg from 'resources/images/report.png'

export default function Gallery(props) {

    const [reports, setReports] = useState([])

    const nav = useNavigate()

    useEffect(() => {
        let currentProject = localStorage.getItem("currentProject")
        if (currentProject != null) {
            getAllReportApi(currentProject)
                .then(res => {
                    console.log(res.data)
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
            <div className='bg-white'>
                <div className='row p-4'>
                    {reports.map(ele =>
                        <div className='col' style={{"minWidth":"600px", "maxWidth": "600px"}} onClick={() => { editReport(ele.Id) }}>
                            <ReportCard data={ele} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
