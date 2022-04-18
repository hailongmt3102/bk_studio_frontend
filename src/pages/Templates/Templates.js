import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllReport as getAllReportApi } from 'api/Report'
import { deep_blue_primary } from "../../utils/color"
import {Store} from 'react-notifications-component'
import {content} from "../../utils/notification"
import TemplateCard from 'components/TemplateCard/TemplateCard'


export default function Template(props) {

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
            Templates:
            </h2>
           
            <div className='bg-white'>
                <div className='row p-4'>
                    {reports.map(ele =>
                        <div className='col' style={{"Width":"300px", "Height": "300px"}} >
                            <TemplateCard data={ele} type="Galary" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
