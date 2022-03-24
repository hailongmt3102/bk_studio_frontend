import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllReport as getAllReportApi } from 'api/Report'
import ReportCard from "components/ReportCard"
import ReportImg from 'resources/images/report.png'
import { Roboto, Poppins } from "utils/font"
import { deep_blue_primary } from "../../utils/color"
import {Store} from 'react-notifications-component'
import {content} from "../../utils/notification"

export default function Gallery(props) {

    const [reports, setReports] = useState([])

   

    useEffect(() => {
        let currentProject = localStorage.getItem("currentProject")
        if (currentProject != null) {
            getAllReportApi(currentProject)
                .then(res => {
                    //console.log(res.data)
                    setReports(res.data)
                })
                .catch(res => {
                    Store.addNotification(content("Warning", res.response.data, "danger"))
                    return
                })
        }
    }, [])

  
    return (
        <div>
            <h2 class="ms-4 mt-2" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> 
            Gallery:
            </h2>
           
            <div className='bg-white'>
                <div className='row p-4'>
                    {reports.map(ele =>
                        <div className='col' style={{"minWidth":"600px", "maxWidth": "600px"}} >
                            <ReportCard data={ele} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
