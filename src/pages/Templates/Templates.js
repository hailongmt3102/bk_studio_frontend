import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllReport as getAllReportApi } from 'api/Report'
import ReportCard from "components/ReportCard/ReportCard"
import ReportImg from 'resources/images/report.png'
import { loadingContext } from 'App'
import { deep_blue_primary } from "../../utils/color"
import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"
import { getAllTemplate } from "api/Templates"

export default function Template(props) {
    const [reports, setReports] = useState([])
    const setIsLoading = useContext(loadingContext)
    useEffect(() => {
        setIsLoading(true)
        getAllTemplate()
            .then(res => {
                console.log(res.data)
                setReports(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                Store.addNotification(content("Fail", err.response.data, "danger"))
                return
            })
    }, [])

    return (
        <div>
            <h2 class="ms-4 mt-2" style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>
                Templates:
            </h2>

            <div className='bg-white'>
                <div className='row m-0 p-0 justify-content-center'>
                    {reports.map(ele =>
                        <div className='col m-0 p-0' style={{ "minWidth": "600px", "maxWidth": "600px" }} >
                            <div className='ms-4 mt-5 pe-4'>
                                <ReportCard data={ele} type="Template" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}