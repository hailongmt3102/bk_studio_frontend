import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllReport as getAllReportApi } from 'api/Report'
import ReportCard from "components/ReportCard/ReportCard"
import ReportImg from 'resources/images/report.png'

import { deep_blue_primary } from "../../utils/color"
import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"


export default function Gallery(props) {

    const [reports, setReports] = useState([])



    useEffect(() => {
        let currentProject = localStorage.getItem("currentProject")
        if (currentProject != null) {
            getAllReportApi(currentProject)
                .then(res => {
                    console.log(res.data)
                    setReports(res.data)
                })
                .catch(err => {
                    Store.addNotification(content("Warning", err.response.data, "danger"))
                    return
                })
        }
    }, [])



    return (
        <div>
            <h2 class="ms-4 mt-2" style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>
                Gallery:
            </h2>

            <div className='bg-white'>
                <div className='row ps-2 pe-2'>
                    {reports.map(ele =>
                        <div className='col m-0 p-0' style={{ "minWidth": "500px", "maxWidth": "500px" }} >
                            <div className='ms-3 mt-4'>
                                <ReportCard data={ele} type="Gallery" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
